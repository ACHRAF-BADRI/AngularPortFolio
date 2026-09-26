import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { API_URL } from '../api';

type Status = 'idle' | 'sending' | 'success' | 'invalid' | 'tooMany' | 'error';

// Messages are sent to the API server (api/ folder, on Render), which emails them to the owner.
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  translation = inject(TranslationService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  contact = {
    name: '',
    email: '',
    message: '',
    website: '' // honeypot: hidden from people, bots fill it in and get silently ignored
  };

  status = signal<Status>('idle');
  slow = signal(false);

  ngOnInit(): void {
    // The free Render server sleeps when idle: wake it up while the visitor is typing
    if (this.isBrowser && API_URL) {
      fetch(`${API_URL}/health`).catch(() => {});
    }
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      this.status.set('invalid');
      return;
    }
    this.status.set('sending');
    const slowTimer = setTimeout(() => this.slow.set(true), 5000);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...this.contact, lang: this.translation.lang() }),
        signal: AbortSignal.timeout(90_000),
      });
      if (res.ok) {
        form.resetForm({ name: '', email: '', message: '', website: '' });
        this.status.set('success');
      } else {
        this.status.set(res.status === 400 ? 'invalid' : res.status === 429 ? 'tooMany' : 'error');
      }
    } catch {
      this.status.set('error');
    } finally {
      clearTimeout(slowTimer);
      this.slow.set(false);
    }
  }
}

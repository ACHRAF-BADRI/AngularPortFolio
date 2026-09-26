import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { ToastService } from '../services/toast.service';
import { API_URL } from '../api';

// Messages are sent to the API server (api/ folder, on Render), which emails them to the owner.
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  translation = inject(TranslationService);
  private toasts = inject(ToastService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  contact = {
    name: '',
    email: '',
    message: '',
    website: '' // honeypot: hidden from people, bots fill it in and get silently ignored
  };

  sending = signal(false);
  slow = signal(false);

  ngOnInit(): void {
    // The free Render server sleeps when idle: wake it up while the visitor is typing
    if (this.isBrowser && API_URL) {
      fetch(`${API_URL}/health`).catch(() => {});
    }
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.toasts.show('error', 'contact.invalid');
      return;
    }
    this.sending.set(true);
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
        this.toasts.show('success', 'contact.success');
      } else {
        this.toasts.show('error', res.status === 400 ? 'contact.invalid' : res.status === 429 ? 'contact.tooMany' : 'contact.error');
      }
    } catch {
      this.toasts.show('error', 'contact.error');
    } finally {
      clearTimeout(slowTimer);
      this.sending.set(false);
      this.slow.set(false);
    }
  }
}

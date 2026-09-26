import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { VisitService } from '../services/visit.service';
import { API_URL } from '../api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  translation = inject(TranslationService);
  private visit = inject(VisitService);

  /** sendBeacon: fire-and-forget, the CV download itself is never delayed. */
  notifyDownload(): void {
    if (!API_URL) return;
    const payload = JSON.stringify({ lang: this.translation.lang(), ...this.visit.details() });
    try {
      if (!navigator.sendBeacon(`${API_URL}/track/download`, payload)) throw new Error('beacon refused');
    } catch {
      fetch(`${API_URL}/track/download`, { method: 'POST', body: payload, mode: 'no-cors', keepalive: true }).catch(() => {});
    }
  }
}

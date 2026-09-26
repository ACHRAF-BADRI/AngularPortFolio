import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

// API server on Render (api/ folder): each click on the download button is emailed to the owner.
// Leave empty to disable. Example: "https://portfolio-api.onrender.com"
const API_URL = 'https://portfolio-api-yinb.onrender.com';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  translation = inject(TranslationService);

  /** sendBeacon: fire-and-forget, the CV download itself is never delayed. */
  notifyDownload(): void {
    if (!API_URL) return;
    const payload = JSON.stringify({ lang: this.translation.lang() });
    try {
      if (!navigator.sendBeacon(`${API_URL}/track/download`, payload)) throw new Error('beacon refused');
    } catch {
      fetch(`${API_URL}/track/download`, { method: 'POST', body: payload, mode: 'no-cors', keepalive: true }).catch(() => {});
    }
  }
}

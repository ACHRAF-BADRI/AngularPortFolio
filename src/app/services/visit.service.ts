import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** Remembers how the current visit went (only in memory, in the visitor's browser),
 *  so the CV download email can say where the visitor came from and what they looked at. */
@Injectable({ providedIn: 'root' })
export class VisitService {
  private startedAt = Date.now();
  private pages: string[] = [];
  private referrer = '';
  private source = '';

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }
    // Only an external referrer is interesting (LinkedIn, Google...), not a page of the portfolio itself
    if (document.referrer && new URL(document.referrer).host !== location.host) {
      this.referrer = document.referrer;
    }
    // Tracking links: share ".../AngularPortFolio/?src=linkedin" to know which link was used
    this.source = new URLSearchParams(location.search).get('src') || '';
    inject(Router).events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const page = (e as NavigationEnd).urlAfterRedirects.split(/[?#]/)[0];
      if (this.pages[this.pages.length - 1] !== page) {
        this.pages.push(page);
      }
    });
  }

  details(): Record<string, string | number> {
    const width = screen.width;
    return {
      source: this.source.slice(0, 60),
      referrer: this.referrer.slice(0, 200),
      pages: this.pages.slice(-15).join(' → '),
      seconds: Math.round((Date.now() - this.startedAt) / 1000),
      device: width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop',
      screen: `${width}×${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    };
  }
}

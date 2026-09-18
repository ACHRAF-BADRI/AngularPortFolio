import { Injectable, PLATFORM_ID, Inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'theme-preference';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isBrowser: boolean;
  isDark = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const initial = this.getInitialPreference();
      this.isDark.set(initial);
      this.applyTheme(initial);
    }
  }

  toggle(): void {
    if (!this.isBrowser) {
      return;
    }
    const next = !this.isDark();
    this.isDark.set(next);
    this.applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  }

  private getInitialPreference(): boolean {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return saved === 'dark';
    }
    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.classList.toggle('dark-theme', dark);
  }
}

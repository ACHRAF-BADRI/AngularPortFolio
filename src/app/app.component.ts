import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DarkModeService } from './services/dark-mode.service';
import { TranslationService } from './services/translation.service';
import { VisitService } from './services/visit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-portfolio';

  private darkModeService = inject(DarkModeService);
  isDark = this.darkModeService.isDark;

  translation = inject(TranslationService);

  // Started with the app so it sees every page of the visit (used by the CV download email)
  private visit = inject(VisitService);

  isMenuOpen = false;

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleTheme(): void {
    this.darkModeService.toggle();
  }

  toggleLang(): void {
    this.translation.toggle();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.syncBodyScrollLock();
  }

  closeMenu(): void {
    if (!this.isMenuOpen) {
      return;
    }
    this.isMenuOpen = false;
    this.syncBodyScrollLock();
  }

  private syncBodyScrollLock(): void {
    if (this.isBrowser) {
      document.body.classList.toggle('modal-open', this.isMenuOpen);
    }
  }
}

import { Component, HostListener, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

/** "Top" button shown on every page once the visitor has scrolled down. */
@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrl: './scroll-top.component.css'
})
export class ScrollTopComponent {
  translation = inject(TranslationService);

  isVisible = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isVisible = window.scrollY > 100;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

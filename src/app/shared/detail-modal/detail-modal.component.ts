import { Component, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.css'
})
export class DetailModalComponent {
  translation = inject(TranslationService);

  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = '';
  @Input() description = '';
  @Input() details: string[] = [];
  @Input() tech: string[] = [];
  @Input() link = '';
  @Input() githubLink = '';
  @Output() closeModal = new EventEmitter<void>();

  private isBrowser: boolean;
  private _isOpen = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @Input()
  set isOpen(value: boolean) {
    this._isOpen = value;
    if (this.isBrowser) {
      document.body.classList.toggle('modal-open', value);
    }
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this._isOpen) {
      this.onClose();
    }
  }
}

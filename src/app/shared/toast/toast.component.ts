import { Component, inject, signal } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { TranslationService } from '../../services/translation.service';

const SWIPE_DISTANCE = 40; // px dragged upwards that closes the toast
const SWIPE_SPEED = 0.5;   // px/ms: a quick flick upwards closes it too

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  toasts = inject(ToastService);
  translation = inject(TranslationService);

  /** Vertical offset while the toast is dragged (only upwards). */
  dragY = signal(0);
  dragging = signal(false);
  private startY = 0;
  private startTime = 0;

  onPointerDown(event: PointerEvent): void {
    if ((event.target as HTMLElement).closest('.toast-close')) return;
    this.dragging.set(true);
    this.startY = event.clientY;
    this.startTime = Date.now();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.toasts.pause();
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.dragging()) return;
    const dy = event.clientY - this.startY;
    // Upwards follows the finger; downwards only moves a little, as if held by a spring
    this.dragY.set(dy < 0 ? dy : dy / 6);
  }

  onPointerUp(): void {
    if (!this.dragging()) return;
    this.dragging.set(false);
    const dy = this.dragY();
    const speed = -dy / Math.max(Date.now() - this.startTime, 1);
    if (dy < -SWIPE_DISTANCE || (dy < 0 && speed > SWIPE_SPEED)) {
      this.dragY.set(-120);
      this.toasts.dismiss();
      setTimeout(() => this.dragY.set(0), 300);
    } else {
      this.dragY.set(0);
      this.toasts.resume();
    }
  }

  /** Fades out as the toast is dragged up, and when it leaves. */
  opacity(): number {
    return this.toasts.leaving() ? 0 : 1 + Math.min(this.dragY(), 0) / 120;
  }

  close(): void {
    this.toasts.dismiss();
  }
}

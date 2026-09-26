import { Injectable, computed, signal } from '@angular/core';

export interface Toast {
  id: number;
  type: 'success' | 'error';
  /** Translation key of the message (see TranslationService). */
  key: string;
  durationMs: number;
}

/** One toast at a time, shown under the header by <app-toast>. It hides itself after a few seconds;
 *  the countdown pauses while the visitor hovers or drags it. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  current = signal<Toast | null>(null);
  /** As a list, so a new toast replaces the old one's element and restarts its animations. */
  list = computed(() => {
    const toast = this.current();
    return toast ? [toast] : [];
  });
  paused = signal(false);
  leaving = signal(false);

  private nextId = 0;
  private timer?: ReturnType<typeof setTimeout>;
  private remainingMs = 0;
  private startedAt = 0;

  show(type: Toast['type'], key: string, durationMs = 4000): void {
    clearTimeout(this.timer);
    this.current.set({ id: ++this.nextId, type, key, durationMs });
    this.leaving.set(false);
    this.paused.set(false);
    this.remainingMs = durationMs;
    this.startCountdown();
  }

  pause(): void {
    if (!this.current() || this.paused()) return;
    clearTimeout(this.timer);
    this.remainingMs -= Date.now() - this.startedAt;
    this.paused.set(true);
  }

  resume(): void {
    if (!this.current() || !this.paused() || this.leaving()) return;
    this.paused.set(false);
    this.startCountdown();
  }

  /** Plays the exit animation, then removes the toast. */
  dismiss(): void {
    if (!this.current() || this.leaving()) return;
    clearTimeout(this.timer);
    this.leaving.set(true);
    const id = this.current()!.id;
    setTimeout(() => {
      if (this.current()?.id === id) {
        this.current.set(null);
        this.leaving.set(false);
      }
    }, 250);
  }

  private startCountdown(): void {
    this.startedAt = Date.now();
    this.timer = setTimeout(() => this.dismiss(), Math.max(this.remainingMs, 0));
  }
}

import { Injectable } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: Toast[] = [];
  private nextId = 0;

  getToasts(): Toast[] {
    return this.toasts;
  }

  show(message: string, type: Toast['type'] = 'info', duration = 4000) {
    const id = this.nextId++;
    this.toasts.push({ id, message, type });
    setTimeout(() => this.remove(id), duration);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}

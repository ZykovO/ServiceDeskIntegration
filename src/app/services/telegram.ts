import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private window: any;
  tg: any;

  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.window = this._document.defaultView;
    console.log('TelegramService constructor - window available:', !!this.window);
    console.log('Telegram object available:', !!this.window?.Telegram);
    console.log('WebApp available:', !!this.window?.Telegram?.WebApp);

    if (this.window?.Telegram?.WebApp) {
      this.tg = this.window.Telegram.WebApp;
      console.log('Telegram WebApp initialized');
    } else {
      console.warn('Telegram WebApp not available');
    }
  }

  get MainButton(): TgButton {
    return this.tg?.MainButton;
  }

  get BackButton(): TgButton {
    return this.tg?.BackButton;
  }

  get initData(): string {
    const data = this.tg?.initData || '';
    console.log('initData:', data ? 'available' : 'empty');
    return data;
  }

  get initDataUnsafe(): any {
    const data = this.tg?.initDataUnsafe;
    console.log('initDataUnsafe:', data ? 'available' : 'empty');
    console.log('initDataUnsafe content:', data);
    return data;
  }

  sendData(data: object) {
    if (this.tg) {
      this.tg.sendData(JSON.stringify(data));
    }
  }

  ready() {
    if (this.tg) {
      console.log('Calling Telegram WebApp ready()');
      this.tg.ready();
    } else {
      console.warn('Cannot call ready() - Telegram WebApp not available');
    }
  }

  // Дополнительный метод для проверки доступности
  isAvailable(): boolean {
    return !!this.tg;
  }
}

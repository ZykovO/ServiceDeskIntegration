import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

// интерфейс для функционала кнопок
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
  private window;
  tg;

  // @ts-ignore
  constructor(@Inject(DOCUMENT) private _document) {
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram.WebApp;
  }

  get MainButton(): TgButton {
    return this.tg.MainButton;
  }

  get BackButton(): TgButton {
    return this.tg.BackButton;
  }

  get initData(): string {
    return this.tg.initData;
  }

  get initDataUnsafe(): any {
    return this.tg.initDataUnsafe; // объект с user, chat, etc
  }

  sendData(data: object) {
    this.tg.sendData(JSON.stringify(data));
  }

  ready() {
    this.tg.ready();
  }
}

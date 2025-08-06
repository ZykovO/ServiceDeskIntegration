import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PrepareNewRequest } from '../interfaces/prepare-new-request';

@Injectable({
  providedIn: 'root'
})
export class TicketFormService {
  private readonly _formData = new BehaviorSubject<PrepareNewRequest | null>(null);

  // Публичный Observable для подписки компонентов
  public readonly formData$: Observable<PrepareNewRequest | null> = this._formData.asObservable();

  constructor() {}

  /**
   * Устанавливает данные формы
   */
  setFormData(data: PrepareNewRequest): void {
    this._formData.next(data);
  }

  /**
   * Получает текущие данные формы
   */
  getFormData(): PrepareNewRequest | null {
    return this._formData.value;
  }

  /**
   * Обновляет данные формы (частично)
   */
  updateFormData(partialData: Partial<PrepareNewRequest>): void {
    const currentData = this._formData.value;
    if (currentData) {
      this._formData.next({ ...currentData, ...partialData });
    }
  }

  /**
   * Очищает данные формы
   */
  clearFormData(): void {
    this._formData.next(null);
  }

  /**
   * Проверяет есть ли данные в сервисе
   */
  hasFormData(): boolean {
    return this._formData.value !== null;
  }
}

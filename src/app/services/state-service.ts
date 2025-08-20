import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingCountSubject = new BehaviorSubject<number>(0);

  constructor() {}

  // Observable для подписки на изменения состояния загрузки
  get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  // Текущее состояние загрузки
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  // Показать загрузку
  show(): void {
    const currentCount = this.loadingCountSubject.value;
    this.loadingCountSubject.next(currentCount + 1);
    this.loadingSubject.next(true);
  }

  // Скрыть загрузку
  hide(): void {
    const currentCount = this.loadingCountSubject.value;
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      this.loadingCountSubject.next(newCount);

      // Скрываем загрузку только когда счетчик достигнет 0
      if (newCount === 0) {
        this.loadingSubject.next(false);
      }
    }
  }

  // Принудительно скрыть загрузку (сбросить счетчик)
  forceHide(): void {
    this.loadingCountSubject.next(0);
    this.loadingSubject.next(false);
  }

  // Обертка для выполнения асинхронных операций с автоматическим управлением загрузкой
  async withLoading<T>(operation: Promise<T>): Promise<T> {
    this.show();
    try {
      const result = await operation;
      return result;
    } finally {
      this.hide();
    }
  }
}

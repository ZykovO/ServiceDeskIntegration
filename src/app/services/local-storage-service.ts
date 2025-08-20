import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Сохранить данные в localStorage
   * @param key - ключ для хранения
   * @param data - данные для сохранения
   */
  set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Ошибка сохранения данных для ключа "${key}":`, error);
    }
  }

  /**
   * Получить данные из localStorage
   * @param key - ключ для получения данных
   * @returns данные или null
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Ошибка получения данных для ключа "${key}":`, error);
      return null;
    }
  }

  /**
   * Удалить данные по ключу
   * @param key - ключ для удаления
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Очистить все данные
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * Проверить существование ключа
   * @param key - ключ для проверки
   * @returns true если ключ существует
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Получить все ключи
   * @returns массив ключей
   */
  keys(): string[] {
    return Object.keys(localStorage);
  }
}

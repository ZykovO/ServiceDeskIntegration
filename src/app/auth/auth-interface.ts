// auth-interface.ts
export interface UserResponse {
  id: number
  first_name: string
  last_name: string
  username: string
  language_code: string
  allows_write_to_pm: boolean
  photo_url: string
}

export interface TokenResponse {
  refresh: string;
  access: string;
  user: UserResponse;
}

export interface RefreshTokenResponse {
  access: string;
}

// Новые интерфейсы для Telegram авторизации
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
}

export interface TelegramAuthRequest {
  initData: string;
  user: TelegramUser;
}

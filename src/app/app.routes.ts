import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { AppLogin } from './pages/app-login/app-login';
import {canActivateAuth} from './auth/access.guard';


export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [canActivateAuth] // добавляем guard для защиты главной страницы
  },
  {
    path: 'login',
    component: AppLogin
    // для страницы логина guard НЕ нужен
  },
  // можно добавить редирект по умолчанию
  {
    path: '**',
    redirectTo: ''
  }
];

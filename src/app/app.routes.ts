import {Routes} from '@angular/router';
import {HomePage} from './home-page/home-page';
import {AppLogin} from './pages/app-login/app-login';
import {canActivateAuth} from './auth/access.guard';
import {CloseTicketPage} from './pages/close-ticket-page/close-ticket-page';
import {AppLayout} from './app-layout/app-layout';
import {CloseTicketFormPage} from './pages/close-ticket-form-page/close-ticket-form-page';


export const routes: Routes = [
  {
    path: '', component: AppLayout, canActivate: [canActivateAuth], children: [


    ]
  },

  {path: 'ticket/:id', component: CloseTicketPage},
  {path: 'ticket/:id/close', component: CloseTicketFormPage},



  {
    path: 'login',
    component: AppLogin
    // для страницы логина guard НЕ нужен
  },


  // {
  //   path: '',
  //   component: HomePage,
  //   canActivate: [canActivateAuth] // добавляем guard для защиты главной страницы
  // },


  // можно добавить редирект по умолчанию
  {
    path: '**',
    redirectTo: ''
  }
];

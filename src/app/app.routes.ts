import {Routes} from '@angular/router';
import {AppLogin} from './pages/app-login/app-login';
import {canActivateAuth} from './auth/access.guard';
import {AppLayout} from './app-layout/app-layout';
import {CloseTicketFormPage} from './pages/close-ticket-form-page/close-ticket-form-page';
import {TicketViewPage} from './pages/ticket/ticket-view-page/ticket-view-page';
import {TicketClosePage} from './pages/ticket/ticket-close-page/ticket-close-page';


export const routes: Routes = [
  {
    path: '', component: AppLayout, children: [ // , canActivate: [canActivateAuth]

      {path: 'ticket/:id', component: TicketViewPage},
      {path: 'ticket/:id/close', component: TicketClosePage},
    ]
  },




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

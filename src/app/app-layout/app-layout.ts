import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutHeader} from './layout-header/layout-header';
import {LayoutSidebar} from './layout-sidebar/layout-sidebar';
import {LayoutFooter} from './layout-footer/layout-footer';
import {Skeleton} from 'primeng/skeleton';
import {AsyncPipe, NgIf} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterOutlet,
  ],
  standalone:true,
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
  providers: [MessageService]
})
export class AppLayout {

}

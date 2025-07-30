import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutHeader} from './layout-header/layout-header';
import {LayoutSidebar} from './layout-sidebar/layout-sidebar';
import {LayoutFooter} from './layout-footer/layout-footer';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterOutlet,
    LayoutHeader,
    LayoutSidebar,
    LayoutFooter
  ],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css'
})
export class AppLayout {

}

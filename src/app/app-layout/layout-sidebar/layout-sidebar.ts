import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-layout-sidebar',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './layout-sidebar.html',
  styleUrl: './layout-sidebar.css'
})
export class LayoutSidebar {
  menuItems = [
    // { icon: '🏠', text: 'Home', link: '/' },
    // { icon: '📊', text: 'Dashboard', link: '/dashboard' },
    // { icon: '⚙️', text: 'Settings', link: '/settings' },
    // { icon: 'ℹ️', text: 'About', link: '/about' }
  ];
}

import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-layout-footer',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './layout-footer.html',
  styleUrl: './layout-footer.css'
})
export class LayoutFooter {
  footerItems = [
    { icon: '🏠', text: 'Home', link: '/' },
    { icon: '🔍', text: 'Search', link: '/search' },
    { icon: '🛒', text: 'Cart', link: '/cart' },
    { icon: '👤', text: 'Profile', link: '/profile' }
  ];
}

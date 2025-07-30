import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-layout-header',
  imports: [],
  templateUrl: './layout-header.html',
  styleUrl: './layout-header.css'
})
export class LayoutHeader {
  title = 'My App';
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
}

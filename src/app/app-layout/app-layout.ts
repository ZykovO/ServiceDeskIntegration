import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LayoutHeader} from './layout-header/layout-header';
import {LayoutSidebar} from './layout-sidebar/layout-sidebar';
import {LayoutFooter} from './layout-footer/layout-footer';
import {Skeleton} from 'primeng/skeleton';
import {StateService} from '../services/state-service';
import {AsyncPipe, NgIf} from '@angular/common';
import {Subject, takeUntil} from 'rxjs';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterOutlet,
    Skeleton,
    NgIf
  ],
  standalone:true,
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
  providers: [MessageService]
})
export class AppLayout {
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(public isLoadingState: StateService) {
  }

  ngOnInit(): void {
    this.isLoadingState.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}

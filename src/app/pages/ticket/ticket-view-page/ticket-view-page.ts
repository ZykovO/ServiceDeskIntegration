import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../../services/ticket-service';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketFormService} from '../../../services/ticket-form-service';
import {Ticket} from '../../../interfaces/ticket.interface';
import {Skeleton} from 'primeng/skeleton';
import {StateService} from '../../../services/state-service';
import {finalize} from 'rxjs';
import {DatePipe, JsonPipe, NgForOf, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {IftaLabel} from 'primeng/iftalabel';
import {PrimeTemplate} from 'primeng/api';
import {Chip} from 'primeng/chip';
import {Accordion} from 'primeng/accordion';
import {Timeline} from 'primeng/timeline';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-ticket-view-page',
  imports: [
    Card,
    PrimeTemplate,
    Chip,
    NgIf,
    DatePipe,
    Accordion,
    NgForOf,
    Timeline,
    Button
  ],
  templateUrl: './ticket-view-page.html',
  styleUrl: './ticket-view-page.css'
})
export class TicketViewPage implements OnInit {
  ticket?: Ticket;
  error?: string;


  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private ticketFormService: TicketFormService,
    private isLoadingState: StateService
  ) {}

  ngOnInit(): void {
    this.isLoadingState.show();
    const ticketId = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketService.get_ticket(ticketId)
      .pipe(
        finalize(() => this.isLoadingState.hide()) // Всегда выполнится в конце
      )
      .subscribe({
        next: (data) => {
          this.ticket = data;
        },
        error: (err) => {
          this.error = 'Помилка при отриманні даних';
          console.error(err);
        }
      });
  }



  isDeadlineExpired(deadline: string | null): boolean {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  }

  getFileName(attachment: string): string {
    return attachment.split('/').pop() || attachment;
  }

  openAttachment(attachment: string): void {
    window.open(attachment, '_blank');
  }

  getActionButtons(): any[] {
    if (!this.ticket?.ActionsButtons) return [];

    const buttons = [];


    if (this.ticket.ActionsButtons) {
      buttons.push({
        label: 'Закрыть',
        icon: 'pi pi-times',
        styleClass: 'p-button-outlined p-button-danger',
        action: 'close',
        disabled: false
      });
    }


    return buttons;
  }

  executeAction(action: string): void {
    console.log('Выполняется действие:', action);
    // Здесь реализуйте логику действий
  }
}

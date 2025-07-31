import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../services/ticket-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Ticket} from '../../interfaces/ticket.interface';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-close-ticket-form-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './close-ticket-form-page.html',
  styleUrl: './close-ticket-form-page.css'
})
export class CloseTicketFormPage implements OnInit {
  ticket?: Ticket; // или ticket: Ticket | null = null;


  constructor(  private ticketService: TicketService,
                private route: ActivatedRoute,
                private router: Router) {
  }

  ngOnInit(): void {
    const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.ticketService.get_ticket(ticketId).subscribe({
      next: (data) => this.ticket = data,
      error: (err) => console.error('Помилка:', err)
    });
  }

}

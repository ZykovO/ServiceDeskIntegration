import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Ticket} from '../../interfaces/ticket.interface';
import {TicketService} from '../../services/ticket-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-close-ticket-page',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './close-ticket-page.html',
  styleUrl: './close-ticket-page.css'
})
export class CloseTicketPage implements OnInit {
  ticket?: Ticket; // или ticket: Ticket | null = null;
  isLoading = true;
  error?: string;

  constructor(private ticketService: TicketService,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // const ticketId = Number(this.route.snapshot.paramMap.get('id'));
    const ticketId = 1267032; // Получи ID динамически (например, из route)
    this.ticketService.get_ticket(ticketId).subscribe({
      next: (data) => {
        this.ticket = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Помилка при отриманні даних';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

}

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Ticket} from '../interfaces/ticket.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  get_ticket(ticket_id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.API_URL}/tickets/${ticket_id}`);
  }


}

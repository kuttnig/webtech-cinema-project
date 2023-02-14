import { Component, OnInit } from '@angular/core';

import { Ticket } from '../interfaces/ticket';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private movieService: MovieService) { };

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    const authDat = localStorage.getItem('authDat');

    if (authDat !== null) {
      const username = JSON.parse(authDat).username;
      this.movieService.getTickets(username)
        .subscribe(tickets => this.tickets = tickets)
    }
  }

  returnTicket(ticket_id: number): void {
    this.movieService.deleteTicket(ticket_id)
      .subscribe(response => {
        this.getTickets(); // refresh tickets
      });
  }

  // just log msg.
  requestQRCode(): void {
    console.log('QR-Code requested!');
  }
}

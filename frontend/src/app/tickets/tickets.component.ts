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
    this.movieService.getTickets()
      .subscribe(tickets => this.tickets = tickets)
  }

  returnTicket(): void {
    // TODO
    console.log('Return ticket clicked!');
  }

  requestQRCode(): void {
    // TODO
    console.log('QR-Code requested!');
  }
}

import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Schedule } from '../interfaces/schedule';
import { Seat } from '../interfaces/seat';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-seat',
  templateUrl: './movie-seat.component.html',
  styleUrls: ['./movie-seat.component.css']
})
export class MovieSeatComponent {
  @Input() schedule?: Schedule;

  allSeats?: Seat[];;
  availableSeats?: Seat[];

  selectedSeat?: Seat;

  constructor(private router: Router, private movieService: MovieService) { }

  // called when prop. schedule changes
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];

      this.getAllSeats();
      this.getAvailableSeats();

      // unselect seat
      this.selectedSeat = undefined;
    }
  }

  getAllSeats(): void {
    if (this.schedule !== undefined) {
      const theatre_id = this.schedule.theatre_id;
      this.movieService.getAllSeats(theatre_id)
        .subscribe(allSeats => this.allSeats = allSeats)
    } else {
      this.allSeats = undefined;
    }
  }

  getAvailableSeats(): void {
    if (this.schedule !== undefined) {
      const schedule_id = this.schedule.schedule_id;
      this.movieService.getAvailableSeats(schedule_id)
        .subscribe(availableSeats => this.availableSeats = availableSeats);
    }
  }

  selectSeat(seat: Seat): void {
    // unselect seat if already selected
    if (this.selectedSeat === seat) {
      this.selectedSeat = undefined;
    } else if (this.isAvailable(seat)) {
      this.selectedSeat = seat;
    }
  }

  // dirty hack
  isAvailable(seat: Seat) {
    return this.availableSeats?.find(avSeat => avSeat.seat_id === seat.seat_id) !== undefined; // could be much easier...
  }

  goToCheckout(): void {
    // normally we would have another comp. which summarizes the order 
    const authDat = localStorage.getItem('authDat');

    if (authDat !== null) {
      const username = JSON.parse(authDat).username;

      if (this.schedule?.schedule_id !== undefined && this.selectedSeat !== undefined) {
        this.movieService.buyTicket(username, this.schedule.schedule_id, this.selectedSeat.seat_id)
          .subscribe(result => {
            this.getAvailableSeats(); // refresh seats
          }); // nonsense
      }
    }
    this.router.navigate(['movies']);
  }
}

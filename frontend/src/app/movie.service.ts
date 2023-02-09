import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Movie } from './interfaces/movie';
import { Detail } from './interfaces/detail';
import { Review } from './interfaces/review';
import { Schedule } from './interfaces/schedule';
import { Seat } from './interfaces/seat';

// TODO: remove mocks (if not needed anymore)
import { MOVIES } from './mocks/mock-movies';
import { DETAILS } from './mocks/mock-details';
import { REVIEWS } from './mocks/mock-reviews';
import { SCHEDULES } from './mocks/mock-schedules';
import { SEATS } from './mocks/mock-seats';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(): Observable<Movie[]> {
    const movies = of(MOVIES);
    return movies;
  }

  getMovieDetails(movie_id: number): Observable<Detail> {
    const movieDetails = DETAILS.find(movie => movie.movie_id === movie_id);

    // assume movie_id is always found (the if is only used to prev. errors)
    if (movieDetails === undefined) {
      return of(DETAILS[0]);
    }
    return of(movieDetails);
  }

  getMovieReviews(movie_id: number): Observable<Review[]> {
    const movieReviews = REVIEWS.filter(review => review.movie_id === movie_id);
    return of(movieReviews);
  }

  getMovieSchedules(movie_id: number): Observable<Schedule[]> {
    const movieSchedules = SCHEDULES.filter(schedule => schedule.movie_id === movie_id);
    return of(movieSchedules);
  }

  // return all seats of Cinema1 for now
  getTheatreSeats(theatre_id: number): Observable<Seat[]> {
    const theatreSeats = SEATS.filter(seat => seat.seat_id <= 100);
    return of(theatreSeats);
  }

  // return every even seat of Cinema1 for now
  getScheduleSeats(schedule_id: number): Observable<Seat[]> {
    const scheduleSeats = SEATS.filter(seat => seat.seat_id <= 100 && (seat.seat_id % 2) === 0);
    return of(scheduleSeats);
  }
}

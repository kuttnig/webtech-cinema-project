import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { Movie } from './interfaces/movie';
import { Detail } from './interfaces/detail';
import { Review } from './interfaces/review';
import { Schedule } from './interfaces/schedule';
import { Seat } from './interfaces/seat';
import { Ticket } from './interfaces/ticket';

// TODO: remove mocks (if not needed anymore)
import { TICKETS } from './mocks/mock-tickets';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  // TODO: add auth token - WORKS
  getMovies(): Observable<Movie[]> {
    const url = `${this.baseUrl}/movies`;

    return this.http.get<Movie[]>(url)
      .pipe(
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }

  // TODO: add current user + auth token
  getTickets(): Observable<Ticket[]> {
    const tickets = of(TICKETS.filter(ticket => ticket.username === 'user1'));
    return tickets;
  }

  // TODO: add auth token - WORKS
  getMovieDetails(movie_id: number): Observable<Detail> {
    const url = `${this.baseUrl}/movies/details/${movie_id}`;

    return this.http.get<Detail>(url)
      .pipe(
        catchError(this.handleError<Detail>(`getMovieDetails(${movie_id})`))
      );
  }

  // TODO: add auth token - WORKS
  getMovieReviews(movie_id: number): Observable<Review[]> {
    const url = `${this.baseUrl}/movies/reviews/${movie_id}`;

    return this.http.get<Review[]>(url)
      .pipe(
        catchError(this.handleError<Review[]>(`getMovieReviews(${movie_id})`, []))
      );
  }

  // TODO: add auth token - WORKS
  getMovieSchedules(movie_id: number): Observable<Schedule[]> {
    const url = `${this.baseUrl}/movies/schedules/${movie_id}`;

    return this.http.get<Schedule[]>(url)
      .pipe(
        catchError(this.handleError<Schedule[]>(`getMovieSchedules(${movie_id})`, []))
      );
  }

  // TODO: add auth token - WORKS
  getAllSeats(theatre_id: number): Observable<Seat[]> {
    const url = `${this.baseUrl}/theatres/seats/${theatre_id}`;

    return this.http.get<Seat[]>(url)
      .pipe(
        catchError(this.handleError<Seat[]>(`getAllSeats(${theatre_id})`, []))
      );
  }

  // TODO: add auth token - WORKS
  getAvailableSeats(schedule_id: number): Observable<Seat[]> {
    const url = `${this.baseUrl}/theatres/seats/${schedule_id}`;

    return this.http.get<Seat[]>(url)
      .pipe(
        catchError(this.handleError<Seat[]>(`getAvailableSeats(${schedule_id})`, []))
      );
  }

  // TODO: add current user + auth token
  buyTicket(schedule_id: number, seat_id: number): void {
    // TODO: send HTTP-POST using route /tickets

    // TODO: remove
    console.log('Ticket bought!');
  }

  // TODO: add auth token - WORKS
  deleteTicket(ticket_id: number): void {
    // TODO
  }

  // TODO: add current user + auth token
  submitReview(movie_id: number, text: string, stars: number): void {
    // TODO: send HTTP-POST using route /movies/reviews

    // TODO: remove
    console.log('Review submitted!');
  }
}

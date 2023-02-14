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

  // TODO: add  auth token - WORKS
  getTickets(username: string): Observable<Ticket[]> {
    const url = `${this.baseUrl}/tickets/${username}`;

    return this.http.get<Ticket[]>(url)
      .pipe(
        catchError(this.handleError<Ticket[]>(`getTickets(${username})`))
      );
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

  // NOTE: returns some nonsense (hack to get the function to work)
  // TODO: add auth token - WORKS
  buyTicket(username: string, schedule_id: number, seat_id: number): Observable<any> {
    const url = `${this.baseUrl}/tickets`

    let reqBody = { username, schedule_id, seat_id };
    return this.http.post(url, reqBody, this.httpOptions)
      .pipe(
        catchError(this.handleError(`buyTicket(${username}, ${schedule_id}, ${seat_id})`))
      );
  }

  // NOTE: returns some nonsense (hack to get the function to work)
  // TODO: add auth token - WORKS
  deleteTicket(ticket_id: number): Observable<any> {
    const url = `${this.baseUrl}/tickets/${ticket_id}`;

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError(`deleteTicket(${ticket_id})`))
      );
  }

  // NOTE: returns some nonsense (hack to get the function to work)
  // TODO: auth token
  submitReview(username: string, movie_id: number, text: string, stars: number): Observable<any> {
    const url = `${this.baseUrl}/movies/reviews`;

    let reqBody = { username, movie_id, text, stars };
    return this.http.post(url, reqBody, this.httpOptions)
      .pipe(
        catchError(this.handleError(`submitReview(${username}, ${movie_id}, ${text}, ${stars})`))
      );
  }
}

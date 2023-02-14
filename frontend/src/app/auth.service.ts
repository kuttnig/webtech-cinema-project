import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { User } from './interfaces/auth/user';
import { Token } from './interfaces/auth/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  // return true if the login was successful
  processLogin(userDat: User): Observable<Token> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<Token>(url, userDat, this.httpOptions)
      .pipe(
        catchError(this.handleError<Token>('processLogin'))
      );
  }
}

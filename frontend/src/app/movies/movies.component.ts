import { Component } from '@angular/core';

import { Movie } from '../interfaces/movie';
import { MOVIES } from '../mocks/mock-movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent {
  movies = MOVIES;
  selectedMovie?: Movie;

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }
}

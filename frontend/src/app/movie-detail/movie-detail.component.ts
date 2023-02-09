import { Component, Input } from '@angular/core';

import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  @Input() movie?: Movie;
}

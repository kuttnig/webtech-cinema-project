import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Detail } from '../interfaces/detail';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  details: Detail | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService,
    private location: Location) { }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    const movie_id = Number(this.route.snapshot.paramMap.get('movie_id'));
    this.movieService.getMovieDetails(movie_id)
      .subscribe(details => this.details = details);
  }

  goBack(): void {
    this.location.back();
  }
}

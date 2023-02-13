import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Review } from '../interfaces/review';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit {
  reviews: Review[] = [];

  movie_id: number = Number(this.route.snapshot.paramMap.get('movie_id'));
  text?: string;
  stars?: number;

  availableStars: number[] = [5, 4, 3, 2, 1];
  averageStars: number | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService,
    private location: Location) { }

  ngOnInit(): void {
    this.getMovieReviews();
  }

  onSubmit(): void {
    // TODO: remove
    console.log(`movie_id = ${this.movie_id}`);
    console.log(`text = ${this.text}`);
    console.log(`stars = ${this.stars}`);

    if (this.text !== undefined && this.stars !== undefined) {
      this.movieService.submitReview(this.movie_id, this.text, this.stars);
    }
  }

  getMovieReviews(): void {
    const movie_id = Number(this.route.snapshot.paramMap.get('movie_id'));
    this.movieService.getMovieReviews(movie_id)
      .subscribe(reviews => {
        this.reviews = reviews;
        this.averageStars = this.computeAverageStars();
      });
  }

  computeAverageStars(): number | undefined {
    if (this.reviews.length === 0) {
      return undefined;
    }

    let sum = 0;
    for (let review of this.reviews) {
      sum += review.stars;
    }
    return Number((sum / this.reviews.length).toFixed(1));
  }

}

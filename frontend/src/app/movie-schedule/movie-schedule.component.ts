import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Schedule } from '../interfaces/schedule';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-schedule',
  templateUrl: './movie-schedule.component.html',
  styleUrls: ['./movie-schedule.component.css']
})
export class MovieScheduleComponent implements OnInit {
  schedules: Schedule[] = [];

  selectedSchedule: Schedule | undefined;

  selectedCinema: string | undefined;
  selectedDate: string | undefined;
  selectedTime: string | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService,
    private location: Location) { }

  ngOnInit(): void {
    this.getMovieSchedules();
  }

  getMovieSchedules(): void {
    const movie_id = Number(this.route.snapshot.paramMap.get('movie_id'));
    this.movieService.getMovieSchedules(movie_id)
      .subscribe(schedules => {
        this.schedules = schedules;
      });
  }

  setSchedule(): void {
    if (this.selectedCinema !== undefined && this.selectedDate !== undefined && this.selectedTime !== undefined) {
      this.selectedSchedule = this.schedules.find(schedule => {
        return schedule.name === this.selectedCinema && schedule.date === this.selectedDate && schedule.time === this.selectedTime;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  resetScheduleSelection(): void {
    this.selectedCinema = undefined;
    this.selectedDate = undefined;
    this.selectedTime = undefined;

    this.selectedSchedule = undefined;
  }

  // schedules are usually small (-> call 3x filter back to back if necessary)
  filterSchedule(name: String | undefined, date: string | undefined,
    time: string | undefined): Schedule[] {
    let resultSchedules = this.schedules;
    if (name !== undefined) {
      resultSchedules = resultSchedules.filter(schedule => schedule.name === name);
    }
    if (date !== undefined) {
      resultSchedules = resultSchedules.filter(schedule => schedule.date === date);
    }
    if (time !== undefined) {
      resultSchedules = resultSchedules.filter(schedule => schedule.time === time);
    }
    return resultSchedules;
  }

  // TODO: sort schedules ascending by 1.Cinema Name, 2. Date, 3. Time if time is left
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieScheduleComponent } from './movie-schedule/movie-schedule.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'movie/:movie_id', component: MovieDetailComponent, canActivate: [AuthGuard] },
  { path: 'ticket/:movie_id', component: MovieScheduleComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

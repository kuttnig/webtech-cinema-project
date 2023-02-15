import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  jwtHelper = new JwtHelperService(); // normally this should be injected in the constructor - WORKAROUND 

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let authDat = localStorage.getItem('authDat');
    if (authDat !== null) {
      let token = JSON.parse(authDat).token;
      return !(this.jwtHelper.isTokenExpired(token));
    }
    this.router.navigate(['login']);
    return false;
  }

}

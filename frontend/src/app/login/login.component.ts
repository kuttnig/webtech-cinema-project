import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../interfaces/auth/user';
import { Token } from '../interfaces/auth/token';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userDat: User = {
    username: '',
    password: ''
  };
  tokenDat?: Token;

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(): void {
    this.authService.processLogin(this.userDat)
      .subscribe(tokenDat => {
        this.tokenDat = tokenDat; // undefined if unauthorized

        if (this.tokenDat !== undefined) {
          localStorage.setItem('authDat', JSON.stringify(this.tokenDat));
          this.router.navigate(['movies']);
        }
      });
  }
}

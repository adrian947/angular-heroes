import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(private router: Router, private authService: AuthService) {}

  public handleEnter() {
    this.authService.login('Juan', '123456').subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/heroes/list');
      }
    });
  }
}

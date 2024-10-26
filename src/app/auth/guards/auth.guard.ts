import { Injectable } from '@angular/core';
import { CanActivateFn, CanMatchFn,  Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  public canMatch: CanMatchFn = (route, segments): boolean | Observable<boolean> => {
    return this.authService.checkAuth().pipe(
      tap(isAuth => {
        if(!isAuth){
          this.router.navigateByUrl('/auth/login')
        }
      })
    );
  };

  public canActivate: CanActivateFn = (route, state): boolean | Observable<boolean> => {
    return this.authService.checkAuth().pipe(
      tap(isAuth => {
        if(!isAuth){
          this.router.navigateByUrl('/auth/login')
        }
      })
    );
  };
}

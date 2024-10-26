import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate: CanActivateFn = (
    route,
    state
  ): boolean | Observable<boolean> => {
    return this.authService.checkAuth().pipe(
      tap((isAuth) => {
        if (isAuth) {
          this.router.navigateByUrl('/heroes/list');
        }
      }),
      map((isAuth) => !isAuth)
    );
  };
}

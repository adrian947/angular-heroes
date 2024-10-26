import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { envs } from '../../../environments/env';
import { IUser } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = envs.baseUrl;
  private user: IUser | null = null;

  constructor(private httpClient: HttpClient) {}

  get currentUser(): IUser | null {
    if (!this.user) return null;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseUrl}/users/1`).pipe(
      tap((resp) => {
        this.user = resp;
        localStorage.setItem('user', JSON.stringify(resp));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user = null;
  }

  checkAuth(): Observable<boolean> {
    if(!localStorage.getItem('user')) return of(false);

    return this.httpClient.get<IUser>(`${this.baseUrl}/users/1`).pipe(
      tap((resp) => {
        this.user = resp;
        return of(true)
      }),
      map((user) => !!user),
      catchError(() => of(false))
    );


  }
}

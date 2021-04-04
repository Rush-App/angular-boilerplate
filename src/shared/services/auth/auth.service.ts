import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';
import {User} from '../../models/components/user.class';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {BrowserLocalStorageService} from '../../ssr-services/browser-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    protected browserLocalStorage: BrowserLocalStorageService,
    protected apiService: ApiService,
    protected router: Router
  ) { }

  register(user: User): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('register'), user)
      .pipe(
        catchError((err) => this.apiService.handleError(err))
      );
  }
  login(user: User): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('login'), user)
      .pipe(
        catchError((err) => this.apiService.handleError(err))
      );
  }
  refreshToken(): Observable<any> {
    return this.apiService.sendPost(this.apiService.getEndpoint('refresh-token'));
  }
  setToken(token): void {
    this.browserLocalStorage.setItem('token', token);
  }
  getToken(): string | null {
    return this.browserLocalStorage.getItem('token');
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  backendLogout(): void {
    this.apiService.sendPost(this.apiService.getEndpoint('logout'))
      .pipe(
        catchError((err) => this.apiService.handleError(err))
      )
      .subscribe(
        () => {
          this.frontendLogout();
        },
        (err) => {
          return throwError(err);
        }
      );
  }
  frontendLogout(): void {
    this.browserLocalStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

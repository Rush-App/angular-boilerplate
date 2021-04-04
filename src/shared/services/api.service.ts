import {Injectable} from '@angular/core';
import {NotificationService} from './notification.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {IOptions} from '../interfaces/crud.interface';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isRequestCompleted = true;

  constructor(
    protected http: HttpClient,
    protected notificationService: NotificationService,
    protected router: Router
  ) { }

  public getEndpoint(route: string): string {
    return environment.API + route;
  }

  public sendPost(url: string, data: any = {}, options: IOptions = {}): Observable<any> {
    return this.http.post(url, data, options);
  }

  public sendPut(url: string, data: any = {}, options: IOptions = {}): Observable<any> {
    return this.http.put(url, data, options);
  }

  public sendGet(url: string, options: any = {}): Observable<any> {
    return this.http.get(url, options);
  }

  public sendDelete(url: string, options: any = {}): Observable<any> {
    return this.http.delete(url, options);
  }

  public setRequestCompleted(): void {
    this.isRequestCompleted = true;
  }
  public setRequestInProgress(): void {
    this.isRequestCompleted = false;
  }

  public getRequestCompleted(): boolean {
    return this.isRequestCompleted;
  }

  public handleError(response: Response | any): Observable<never> {
    this.setRequestCompleted();

    if (response.status !== 422 && response.status > 400) {
      // TODO: Check error response body
      const message = response.error;

      this.notificationService.error(
        `${response.status} - ${message}`,
        null,
        true
      );
    } else {
      this.notificationService.error(
        'Unknown error from server',
        null,
        true
      );
    }

    return throwError(response);
  }
}

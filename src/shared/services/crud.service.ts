import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {ICrud, IGetPaginate} from '../interfaces/crud.interface';
import {map, catchError} from 'rxjs/operators';
import * as _ from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService extends ApiService implements ICrud {
  protected abstract namespace: string;
  protected abstract ModelClass: any;

  public index<T>(parameters?: any): Observable<any> {
    this.setRequestInProgress();

    return this
      .sendGet(this.getEndpoint(this.namespace), {params: parameters})
      .pipe(
        map((res: Response | any) => this.buildModelFromArray(res)),
        catchError((err) => this.handleError(err))
      );
  }

  public indexPaginate<T>(parameters?: any): Observable<any> {
    this.setRequestInProgress();

    return this
      .sendGet(this.getEndpoint(this.namespace), {params: parameters})
      .pipe(
        map((res: Response | any) => this.buildModelFromPaginateData(res)),
        catchError((err) => this.handleError(err))
      );
  }

  public show<T>(id: number, parameters?: any): Observable<any> {
    this.setRequestInProgress();

    return this
      .sendGet(this.getEndpoint(this.namespace + '/' + id), {params: parameters})
      .pipe(
        map((res: Response |any) => this.buildModelFromObject(res)),
        catchError((err) => this.handleError(err))
      );
  }

  public store<T>(data: T, options?: T): Observable<any> {
    this.setRequestInProgress();

    return this
      .sendPost(this.getEndpoint(this.namespace), data, options)
      .pipe(
        map((res: Response) => this.buildModelFromObject(res)),
        catchError((err) => this.handleError(err))
      );
  }

  public update<T>(id: number, data: T, options?: T): Observable<any> {
    this.setRequestInProgress();

    return this
      .sendPut(this.getEndpoint(this.namespace + '/' + id), data, options)
      .pipe(
        map((res: Response) => this.buildModelFromObject(res)),
        catchError((err) => this.handleError(err))
      );
  }

  public destroy<T>(id: number): Observable<any> {
    this.setRequestInProgress();

    return this
      .sendDelete(this.getEndpoint(this.namespace + '/' + id))
      .pipe(
        map((res: Response | any) => this.responseWithoutBuildModel(res)),
        catchError((err) => this.handleError(err))
      );
  }

  public buildModelFromArray<T>(res): any {
    this.setRequestCompleted();
    return res.map((item) => {
      return Array.isArray(item) === true
        ? this.buildModelFromArray(item)
        : this.buildModel<T>(_.omitBy(item, _.isNil));
    });
  }

  public buildModelFromPaginateData<T>(res): any {
    this.setRequestCompleted();
    const paginatedData: IGetPaginate = res.data.map((item: T) => this.buildModel<T>(item));
    return {...res, data: paginatedData};
  }

  public buildModelFromObject<T>(res): any {
    this.setRequestCompleted();
    return this.buildModel<T>(res);
  }

  public responseWithoutBuildModel(res): any {
    this.setRequestCompleted();
    return res;
  }

  public buildModel<T>(data: any): T {
    return new this.ModelClass(data);
  }
}

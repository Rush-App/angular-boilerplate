import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Injectable} from '@angular/core';
import {LanguageService} from '../services/language.service';
import {SERVICE_LANGUAGES} from '../constants/service-languages.const';
import {IServiceLanguage} from '../interfaces/service-languages.interface';

@Injectable()
export class HeaderRequestInterceptor implements HttpInterceptor {
  private serviceLanguages: IServiceLanguage = SERVICE_LANGUAGES;
  constructor(
    public languageService: LanguageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Language: this.languageService.currentLanguage || this.serviceLanguages.en,
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });
    return next.handle(request);
  }
}

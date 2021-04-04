import {EventEmitter, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SERVICE_LANGUAGES} from '../constants/service-languages.const';
import {isPlatformBrowser} from '@angular/common';
import {BrowserLocalStorageService} from '../ssr-services/browser-local-storage.service';
import {IServiceLanguage} from '../interfaces/service-languages.interface';

@Injectable()
export class LanguageService {
  private serviceLanguages: IServiceLanguage = SERVICE_LANGUAGES;
  public currentLangEmit = new EventEmitter();

  constructor(
    private translateService: TranslateService,
    protected browserLocalStorage: BrowserLocalStorageService,
    @Inject(PLATFORM_ID) private platformId,
  ) { }

  setAvailableLanguages(): void {
    this.translateService.addLangs(Object.keys(this.serviceLanguages));

    if (isPlatformBrowser(this.platformId) && this.serviceLanguages.hasOwnProperty(navigator.language)) {
      this.translateService.setDefaultLang(navigator.language);
    } else if (this.serviceLanguages.hasOwnProperty(this.translateService.getBrowserLang())) {
      this.translateService.setDefaultLang(this.translateService.getBrowserLang());
    } else {
      this.translateService.setDefaultLang(this.serviceLanguages.en);
    }
  }
  getInitialLanguage(): string {
    const langInLocalStorage = this.browserLocalStorage.getItem('language');
    return this.translateService.getLangs().includes(langInLocalStorage)
      ? langInLocalStorage
      : this.translateService.getDefaultLang();
  }
  setInitialLanguage(lang?: string): void {
    this.currentLanguage = this.serviceLanguages.hasOwnProperty(lang) ? lang : this.getInitialLanguage();
  }
  get currentLanguage(): string {
    return this.translateService.currentLang;
  }
  set currentLanguage(lang: string) {
    const language = this.serviceLanguages.hasOwnProperty(lang) ? lang : this.serviceLanguages.en;

    this.translateService.use(language);
    this.browserLocalStorage.setItem('language', language);
  }
}

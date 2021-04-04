import {Component, Input} from '@angular/core';
import {SERVICE_LANGUAGES} from '../../shared/constants/service-languages.const';
import {IServiceLanguage} from '../../shared/interfaces/service-languages.interface';
import {LanguageService} from '../../shared/services/language.service';

@Component({
  selector: 'app-language-switching',
  templateUrl: './language-switching.component.html',
  styleUrls: ['./language-switching.component.scss']
})
export class LanguageSwitchingComponent {
  @Input() classDecorator: string;
  private serviceLanguages: IServiceLanguage = SERVICE_LANGUAGES;

  constructor(private languageService: LanguageService) { }

  getServiceLanguage(): string {
    return this.languageService.currentLanguage;
  }
  setServiceLanguage(lang: string): void {
    const oldLanguage = this.getServiceLanguage();
    this.languageService.currentLanguage = lang;
    this.languageService.currentLangEmit.emit(oldLanguage);
  }
  getMenuItems(): string[] {
    return Object.values(this.serviceLanguages);
  }
  isMenuItemActive(lang: string): boolean {
    return this.getServiceLanguage() === lang;
  }
}

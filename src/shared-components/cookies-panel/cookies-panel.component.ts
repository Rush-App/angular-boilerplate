import {Component} from '@angular/core';
import {BrowserLocalStorageService} from '../../shared/ssr-services/browser-local-storage.service';

@Component({
  selector: 'app-cookies-panel',
  templateUrl: './cookies-panel.component.html',
  styleUrls: ['./cookies-panel.component.scss']
})
export class CookiesPanelComponent {
  public privacyPolicy = ''; // TODO: Set link from backend.

  constructor(protected browserLocalStorage: BrowserLocalStorageService) { }

  acceptCookies(): void {
    this.browserLocalStorage.setItem('is_accepted_cookies', 'true');
  }
  isAcceptedCookies(): boolean {
    return !!this.browserLocalStorage.getItem('is_accepted_cookies');
  }
}

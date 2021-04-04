import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {I18nModule} from '../shared/ssr-services/i18n/i18n.module';
// MAIN_COMPONENTS
import {AppComponent} from './app.component';
// SHARED_COMPONENTS
import {CookiesPanelComponent} from '../shared-components/cookies-panel/cookies-panel.component';
import {LanguageSwitchingComponent} from '../shared-components/navbar/language-switching/language-switching.component';
// SHARED_SERVICES
import {NotificationService} from '../shared/services/notification.service';
import {TokenInterceptor} from '../shared/interceptors/token.interceptor';
import {HeaderRequestInterceptor} from '../shared/interceptors/header-request.interceptor';
import {LanguageService} from '../shared/services/language.service';
import {ServerValidationFormService} from '../shared/services/server-validation-form.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// ANGULAR_MATERIAL_MODULES
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const MAIN_COMPONENTS = [
  AppComponent,
];
const SHARED_COMPONENTS = [
  CookiesPanelComponent,
  LanguageSwitchingComponent
];
const SHARED_SERVICES = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderRequestInterceptor,
    multi : true
  },
  LanguageService,
  NotificationService,
  ServerValidationFormService,
];
const ANGULAR_MATERIAL_MODULES = [
  MatButtonModule,
  MatMenuModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...MAIN_COMPONENTS,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    I18nModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ...ANGULAR_MATERIAL_MODULES
  ],
  providers: [
    ...SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

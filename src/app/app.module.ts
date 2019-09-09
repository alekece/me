import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocalizeRouterModule, LocalizeParser, LocalizeRouterSettings } from 'localize-router';
import { LocalizeRouterHttpLoader } from 'localize-router-http-loader'
import { Location } from '@angular/common';
import { RouterModule} from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

export function createLocalizeParser(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
  return new LocalizeRouterHttpLoader(translate, location, settings, http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (createLocalizeParser),
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      }
    }),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

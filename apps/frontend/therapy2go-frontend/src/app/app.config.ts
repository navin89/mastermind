import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { environment } from '../environments/environment.uat';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    DatePipe,
    importProvidersFrom(
      BrowserAnimationsModule,
      BrowserModule,
      // Angular Material
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatDividerModule,
      MatListModule,
      // Bootstrap
      NgbCollapseModule,
      LoggerModule.forRoot({
        serverLoggingUrl: `${environment.domain}/log`,
        level: environment.isProduction ? NgxLoggerLevel.ERROR : NgxLoggerLevel.DEBUG,
        serverLogLevel: NgxLoggerLevel.INFO,
        httpResponseType: 'json',
        timestampFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
        enableSourceMaps: true
      })
    )
  ],
};

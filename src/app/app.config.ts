import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes), provideHttpClient(withInterceptors([baseUrlInterceptor]))],
};

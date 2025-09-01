import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimations } from '@angular/platform-browser/animations';
import { userReducer } from './state/user/user.reducer';
import { httpInterceptorProviders } from './core/interceptor';// ⬅️ Import here
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
 provideStore({ user: userReducer }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
      provideCharts(withDefaultRegisterables()),
    provideClientHydration(withEventReplay()),
   provideAnimations(),
    ...httpInterceptorProviders // ⬅️ Spread here
  ]
};



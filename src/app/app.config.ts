import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

class MockSpendingService {
  createDb() {
    return {};
  }
}

export const appConfig = {
  providers: [
    provideHttpClient(),             // <-- must include HttpClient
    provideRouter(routes),           // optional if you have routing
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(MockSpendingService, {
        passThruUnknownUrl: true,   // allows other API calls to go through
        delay: 500                   // optional, simulate network latency
      })
    )
  ]
};


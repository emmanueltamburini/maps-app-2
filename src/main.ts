import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYW51ZWx0YW1idXJpbmkiLCJhIjoiY2xhaWMwaDFyMDEzYzNvcG4zanlpajlnYyJ9.R_S_tgWq1-YwfIXf2JY5pQ';

if (!navigator.geolocation) {
  alert('Gelocation is not supported');
  throw new Error('Gelocation is not supported');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesApiClient extends HttpClient {

  public baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public override get<T> (url: string, options: {
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
  }) {

    url = this.baseUrl + url;

    const params: HttpParams = new HttpParams()
      .set('limit', 5)
      .set('language', 'es')
      .set('access_token', environment.apiKey)
      .appendAll({...options.params});

    return super.get<T>(url, {params});
  }
}

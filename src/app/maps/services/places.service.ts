import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = []

  public get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private placesApiClient: PlacesApiClient) {
    this.getUserLocation();
  }

  public getUserLocation(): Promise<[number,number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('It could not get the current geolocation');
          console.log(err);
          reject();
        }
      )
    });
  }

  public getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.userLocation) {
      throw Error('There is not location user');
    }

    this.isLoadingPlaces = true;

    this.placesApiClient.get<PlacesResponse>(`/${query}.json`, {params: {'proximity': this.userLocation.join(',')}})
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
  }
}

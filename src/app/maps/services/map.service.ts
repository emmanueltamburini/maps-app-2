import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;

  private markers: Marker[] = [];

  public get isMapReady(): boolean {
    return !!this.map;
  }

  public setMap(map: Map): void {
    this.map = map;
  }

  public flyTo (coords: LngLatLike) {
    if (!this.isMapReady) {
      throw Error('The map is not load');
    }

    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  public createMarkersFromPlaces (places: Feature[]): void {
    if (!this.map) throw Error('The map is not load');

    this.markers.forEach(marker => marker.remove());

    this.markers = places.map(place => {
      const [lng, lat] = place.center as [number, number];

      const popup = new Popup()
        .setHTML(`
          <h6>${place.text}</h6>
          <h6>${place.place_name}</h6>
        `);

      return new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map!)
    })
  }
}

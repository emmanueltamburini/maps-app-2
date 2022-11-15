import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map;

  public get isMapReady(): boolean {
    return !!this.map;
  }

  public setMap(map: Map): void {
    this.map = map;
  }

  public flyTo (coords: LngLatLike) {
    if (!this.isMapReady) {
      throw Error('The map is not load')
    }

    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }
}

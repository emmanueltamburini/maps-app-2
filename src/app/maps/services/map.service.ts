import { Injectable } from '@angular/core';
import { AnyLayer, AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions.interfaces';
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

  constructor(private directionsApiClient: DirectionsApiClient) {}

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

  public createMarkersFromPlaces (places: Feature[], userLocation: [number, number]): void {
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
    });

    if (places.length === 0) return;

    const bounds = new LngLatBounds();

    this.markers.forEach(marker => bounds.extend(marker.getLngLat()));

    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {padding:  200});
  }

  public getRouteBetweenPoints(start: [number, number], end: [number, number]): void {
    this.directionsApiClient.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(response => this.drawLineString(response.routes[0]));
  }

  private drawLineString(route: Route): void {
    console.log({km: route.distance/1000, duration: route.duration/60});

    if (!this.map) throw Error('The map is not load');

    const {coordinates} = route.geometry;

    const bounds = new LngLatBounds();

    coordinates.forEach(coordinate => bounds.extend(coordinate as [number, number]));

    this.map.fitBounds(bounds, {padding:  200});

    if(this.map.getSource('RouteString') || this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coordinates
            }
          }
        ]
      }
    };

    const sourceLayer: AnyLayer = {
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    };


    this.map.addSource('RouteString', sourceData);
    this.map.addLayer(sourceLayer)
  }
}

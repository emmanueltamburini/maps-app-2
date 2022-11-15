import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') public mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService, private mapService: MapService) { }

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) {
      throw Error('There is not user location');
    }

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placesService.userLocation,
      zoom: 14,
      projection: {name: 'globe'}
      });

    map.on('style.load', () => {
      map.setFog({});
    });

    const popup = new Popup()
      .setHTML(`
        <h6>I am here</h6>
        <span>This is my point in the world</span>
    `);

    new Marker({color: 'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapService.setMap(map);
  }

}

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') public mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService) { }

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
  }

}

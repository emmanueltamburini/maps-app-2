import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(private mapService: MapService, private placesService: PlacesService) {}

  public getMyLocation(): void {
    if (!this.placesService.isUserLocationReady) {
      throw Error('There is not location user');
    }

    if (!this.mapService.isMapReady) {
      throw Error('The map is not load');
    }

    this.mapService.flyTo(this.placesService.userLocation!);
    console.log('My location');
  }

}

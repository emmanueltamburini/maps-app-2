import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places.interfaces';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  public selectedId: string = '';

  constructor(private placesService: PlacesService, private mapService: MapService) {}

  public get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  public get places(): Feature[] {
    return this.placesService.places;
  }

  public flyTo(place: Feature): void {
    const [lng, lat] = place.center;
    this.selectedId = place.id;

    this.mapService.flyTo([lng, lat]);
  }

  public getDirections(place: Feature): void {
    if (!this.placesService.userLocation) throw Error ('There is not user location');

    const start = this.placesService.userLocation;
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }
}

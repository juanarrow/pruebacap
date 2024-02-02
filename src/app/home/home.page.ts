import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{

  constructor() {}

  printCurrentPosition = () => {
    return Geolocation.getCurrentPosition();
  }

  ngAfterViewInit(): void {
    this.printCurrentPosition().then(pos=>{
      this.createMap(pos).then(map=>this.newMap = map);
    });
    
  }

  @ViewChild('map') mapRef: ElementRef<HTMLElement>|undefined=undefined;
  newMap: GoogleMap|undefined = undefined;

  
  createMap(position:Position):Promise<GoogleMap> {
    
    return GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef!.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        zoom: 18,
      },
    });
  }

}

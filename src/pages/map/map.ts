import { NavController, Platform, ViewController, NavParams, AlertController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { Plan2Page} from '../plan2/plan2';
import { PenggunaPage } from '../pengguna/pengguna';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage{

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

    latitude: number;
    longitude: number;
    autocompleteService: any;
    placesService: any;
    query: string = '';
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    drawingManager:any;
    location: any;
    nama:any = {};

    constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public maps: GoogleMaps, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController, private alertCtrl: AlertController) {
        this.searchDisabled = true;
        this.saveDisabled = true;

    }

    ionViewDidLoad(): void {

        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;

        });

    }

    selectPlace(place){

        this.places = [];


        let location = {
            lat: null,
            lng: null,
            name: place.name
        };

        this.placesService.getDetails({placeId: place.place_id}, (details) => {

            this.zone.run(() => {

                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;

                this.maps.map.setCenter({lat: location.lat, lng: location.lng});

                this.location = location;

            });

        });

    }

    searchPlace(){
        this.saveDisabled = true;

        if(this.query.length > 0 && !this.searchDisabled) {

            let config = {
                types: ['geocode'],
                input: this.query,
                componentRestrictions: {country: "id"}
            }

            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

                if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

                    this.places = [];

                    predictions.forEach((prediction) => {
                        this.places.push(prediction);

                    });
                }

            });

        } else {
            this.places = [];
        }

    }

    save(){
        this.viewCtrl.dismiss(this.location);
    }

    close(){
        this.viewCtrl.dismiss();
    }
    createPlan(){
      if (this.maps.pathstr == undefined) {
          this.presentAlert()
      }else{
      this.nama.latlng = this.maps.pathstr;
      this.navCtrl.push(Plan2Page, {
        latlng : this.nama.latlng
      }); }
        //console.log(latlng);
    }
presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Note',
    subTitle: 'Buat polygon dahulu',
    buttons: ['Ok']
  });
  alert.present();
}


}

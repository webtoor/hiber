import { NavController, Platform, ViewController, NavParams, AlertController, ModalController,FabContainer, ToastController  } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { StatusBar } from '@ionic-native/status-bar';
import { WelcomePage} from '../welcome/welcome';
import { PenggunaPage } from '../pengguna/pengguna';
import { AutoCompletePage} from '../auto-complete/auto-complete';
import introJs from 'intro.js/intro.js';
import { isRightSide } from 'ionic-angular/umd/util/util';
import { map } from 'rxjs/operator/map';



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage{

    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
    @ViewChild('fab')fab : FabContainer;

      address;
      marker: any;
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
    placedetails: any;



    constructor(public statusBar: StatusBar, public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public maps: GoogleMaps, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController, public alertCtrl: AlertController, private modalCtrl: ModalController, public toastCtrl: ToastController) {
        //console.log(JSON.parse(localStorage.getItem('userHiber')))
     
        this.searchDisabled = true;
        this.saveDisabled = true;
        this.address = {
          place: ''
        };


    }
      
    intro() {
        let intro = introJs.introJs();
        intro.setOptions({
        steps: [
          {
            intro: "PANDUAN",
            position : 'left',
          },
          {
            element: '#step1',
            intro: "Klik tombol ini untuk memilih menu membuat area atau hapus area.",
            position: 'left'
      
          },
          {
            element: '#create-button',
            intro: "Ini adalah tombol untuk membuat area",
            position: 'left'
          },
          {
            element: '#delete-button',
            intro: "Ini adalah tombol untuk menghapus area",
            position: 'left'
          },
          {
            element: '#navs',
            intro: "Klik tombol ini setelah membuat area",
            position: 'left'
          },
          {
            intro: "BAIK. SAYA MENGERTI",
          },
        ],
        nextLabel : 'Next',
        prevLabel : 'Back',
        exitOnOverlayClick : false, 
        showProgress :false,
        showBullets : true,
        showStepNumbers : false,
        highlightClass: 'customHighlightClass',
        });
        intro.start();
      }
    ionViewDidEnter() {
        if(!localStorage.getItem('userHiber')){
            this.navCtrl.setRoot(WelcomePage);
          }else if(localStorage.getItem('userHiber')){
                if(localStorage.getItem('Intro') != '1'){
                  this.intro(); 
                  this.fab.toggleList();
                  localStorage.setItem('Intro', '1');
              }  
          } 
      
      
      }
    ionViewDidLoad(): void {
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            this.searchDisabled = false;
            this.maps.pathstr = null;
     

        });
        this.initPlacedetails();
    }

    /*selectPlace(place){

        this.address.place = [];


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

    }*/

    close(){
        this.viewCtrl.dismiss();
    }
   /*  createPlan(){
       // console.log(this.maps.pathstr)
      if (this.maps.pathstr == "" || this.maps.pathstr == undefined) {
          this.presentToast()
      }else{
      this.nama.latlng = this.maps.pathstr;
      console.log(this.nama.latlng)
      this.navCtrl.push(Plan2Page, {
        latlng : this.nama.latlng
      }); }
        //console.log(latlng);
    } */

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Anda harus membuat polygon dahulu',
    duration: 3000,
    position: 'middle'
  });

  toast.onDidDismiss(() => {
    //console.log('Dismissed toast');
  });

  toast.present();
}

showAddressModal () {
  let modal = this.modalCtrl.create(AutoCompletePage);
  let self = this;
  modal.onDidDismiss(data => {
    if(data){
        this.address.place = data.description;
        // get details
        this.getPlaceDetail(data.place_id);

    }
  });
  modal.present();
}

private initPlacedetails() {
    this.placedetails = {
        address: '',
        lat: '',
        lng: '',
        components: {
            route: { set: false, short:'', long:'' },                           // calle
            street_number: { set: false, short:'', long:'' },                   // numero
            sublocality_level_1: { set: false, short:'', long:'' },             // barrio
            locality: { set: false, short:'', long:'' },                        // localidad, ciudad
            administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido
            administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia
            country: { set: false, short:'', long:'' },                         // pais
            postal_code: { set: false, short:'', long:'' },                     // codigo postal
            postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
        }
    };
}

private getPlaceDetail(place_id:string):void {
   
    var self = this;
    var request = {
        placeId: place_id
    };
    this.placesService.getDetails(request, (details) => {

        this.zone.run(() => {

            self.placedetails.name = details.name;
            self.placedetails.lat = details.geometry.location.lat();
            self.placedetails.lng = details.geometry.location.lng();
            this.saveDisabled = false;
            
        // Clear Marker
        if(this.marker){
        this.marker.setMap(null);
        }

            // MARKER START
        this.marker = new google.maps.Marker({
            map: this.maps.map,
            animation: google.maps.Animation.DROP,
            position: {lat: self.placedetails.lat, lng: self.placedetails.lng}

        });
        //marker.setMap(this.maps.map)

            // Marker END
        this.maps.map.setCenter({lat: self.placedetails.lat, lng: self.placedetails.lng})

            this.location = location;


        });

    });
}

}

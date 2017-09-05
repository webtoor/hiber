import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'



/**
 * Generated class for the PolygonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-polygon',
  templateUrl: 'polygon.html',
})
export class PolygonPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  map:any;
  polygonData = {"username" : "", "id_order" : "", "token" : ""};
  public userDetails : any;
  responseData:any;
  polyData:any = {};
  public dataSet : any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public maps: GoogleMaps, public authService: AuthServiceProvider) {
    var id_order = navParams.get('id_order');
    this.polygonData.id_order = id_order;
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.polygonData.username = this.userDetails.username;
    this.polygonData.token = this.userDetails.token;
    /*this.authService.postData(this.polygonData, "polygon").then((result) => {
    this.responseData = result;
    var poly = this.responseData;
    var laty = poly["latitude"];
    var long = poly["longitude"];
    this.polyData.lat  = laty.split(',').map(Number);
    this.polyData.lng = long.split(',').map(Number);
    console.log(this.responseData)

    });*/

    //console.log(this.polygonData)

    /*this.authService.postData(this.polygonData, "polygon").then((result) => {
      this.responseData = result;
      //console.log(this.responseData)
      var datas = this.responseData;
      var lati= datas["latitude"];
      var lati2= datas["longitude"];
      this.dam  = lati.split(',').map(Number);
      this.polyData.lng= lati2.split(',').map(Number);
      //console.log(this.polyData.lat)

      var haha = this.dam;
      console.log(haha)
    });*/
  }

  ionViewDidLoad(): void {

      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
        this.loadMap()
      });

  }
  loadMap(){
    this.authService.postData(this.polygonData, "polygon").then((result) => {
      this.responseData = result;
      this.dataSet = this.responseData.output
      //console.log(this.responseData)
      var datas = this.responseData;
      var lati= datas["latitude"];
      var lati2= datas["longitude"];
      this.polyData.lat  = lati.split(',').map(Number);
      this.polyData.lng = lati2.split(',').map(Number);
    //  console.log(this.polyData.lat)



    let LatLng = new google.maps.LatLng(-6.925960, 107.60529);

    let mapOptions = {
      center:LatLng,
      zoom:15,
      MapTypeID: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Ini Buat nampilin polygon ( Masih data statis )
    var lat =   this.polyData.lat ;
    var lng=  this.polyData.lng ;
    var polygon = [];
    for(var x = 0; x < lat.length ; x++) {
      polygon.push( {lat: lat[x], lng:lng[x]} ) ;
    }

    /*var triangleCoords = [
          {lat: -6.925064, lng: 107.60529},
          {lat: -6.92042, lng: 107.601728},
          {lat: -6.919823, lng: 107.610612},
        ];*/

        var bermudaTriangle = new google.maps.Polygon({
           paths: polygon,
           strokeColor: '#FF0000',
           strokeOpacity: 0.8,
           strokeWeight: 2,
           fillColor: '#FF0000',
           fillOpacity: 0.35
         });
         bermudaTriangle.setMap(this.map);
       });
    }

  }

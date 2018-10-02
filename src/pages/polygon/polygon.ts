import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'



/**
 * Generated class for the PolygonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-polygon',
  templateUrl: 'polygon.html',
})
export class PolygonPage {
  @ViewChild('map') mapElement: ElementRef;
  map:any;
  public userDetails : any;
  responseData:any;
  polyData:any = {};
  public dataSet : any;
  order_id : any;

  constructor( public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
    this.order_id = navParams.get('order_id');
    console.log(this.order_id) 
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data;
   
  }

  ionViewDidLoad(): void {
    this.loadMap();

}
  loadMap(){
       this.authService.getData("api/user/polygon/"+ this.order_id, this.userDetails['access_token']).then((result) => {
      this.responseData = result;
      //this.dataSet = this.responseData.output
      console.log(this.responseData[0]['latitude'])
     



    let LatLng = new google.maps.LatLng(this.responseData[0]['latitude'], this.responseData[0]['longitude']);

    let mapOptions = {
      center:LatLng,
      zoom:17,
      MapTypeID: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      var arr = this.responseData;
      var cords = []
      for (var i = 0; i < arr.length; i++) {
        cords.push(new google.maps.LatLng(parseFloat(this.responseData[i]['latitude']), parseFloat(this.responseData[i]['longitude'])));
      }
      console.log(cords)
        new google.maps.Polygon({
           paths: cords,
           map: this.map,
           strokeColor: '#000',
           strokeOpacity: 0.8,
           strokeWeight: 6,
           fillColor: 'green',
           fillOpacity: 0.35,
         });
         this.map.getBounds(cords);
         cords = []
       });  
    }   

  }

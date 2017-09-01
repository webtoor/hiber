import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { MapPage} from '../map/map';


/**
 * Generated class for the Plan2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-plan2',
  templateUrl: 'plan2.html',
})
export class Plan2Page {
  public userDetails : any;
  responseData:any;
  planData:any = {"subject":"", "mulai":"","akhir":"","kegunaan":"", "comment":""};
  today
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public menu: MenuController, public authService: AuthServiceProvider ) {
  this.menu.swipeEnable(false);
  var latlng = navParams.get('latlng');
  console.log(latlng)
  var split = latlng.split(",");
  var convert = split.join(", ");
  var polygon_lenght = convert.length - 2 ;
  var hasil_polygon = convert.slice(0, polygon_lenght)
  var polygon_string = hasil_polygon.toString();
  this.planData.latlng = polygon_string;
  //string jadi array
  /*var huruf = "a,b,c";
  var konversi = huruf.split(",");
  var dasi = konversi.pop();
  console.log( konversi );*/


 // Ambil nilai genap & ganjil
  /*var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      b = [],
      c = [];

for (var i = 0; i < a.length; ++i) {
    if ((a[i] % 2) === 0) {
        b.push(a[i]);
    }
    else {
        c.push(a[i]);
    }
  }
  console.log( b );
  console.log( c );*/


  const data = JSON.parse(localStorage.getItem('userData'));
  //this.responseData = data.userData;

  //console.log(this.responseData);
  this.userDetails = data.userData;
  this.planData.username = this.userDetails.username;
  this.planData.token = this.userDetails.token;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanDuaPage');
    //console.log(this.latlng);
  }
  /*logForm() {
    console.log(this.todo);
  }*/
  planForm() {
    console.log(this.planData);
  }
  mulai() {
    this.today = new Date().toISOString();
  }
  akhir() {
    this.today = new Date().toISOString();
  }
  cari() {
    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Informasi, this.planData yang telah di unggah dan diterima oleh Penyedia Jasa, tidak bisa dirubah, kecuali atas persetujuan Kedua belah pihak. Pastikan informasi yang anda masukan telah benar',
      buttons: [
        {
          text: 'Oke',
          handler: () => {
            this.authService.postData(this.planData, "project").then((result) => {
              this.responseData = result;
              console.log(this.responseData);
            });
            console.log(this.planData);
          }
        },
        {
          text: 'Kembali',
          handler: () => {
            console.log('Kembali clicked');
          }
        }
      ]
    });
    confirm.present();
  }
  aturArea(){
    this.navCtrl.setRoot(MapPage);
  }

  dada(){


      }
}

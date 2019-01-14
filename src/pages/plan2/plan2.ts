import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { MapPage} from '../map/map';
import 'rxjs/add/operator/map';
import { Proyek1Page } from '../proyek1/proyek1'
import { WelcomePage } from '../welcome/welcome'


/**
 * Generated class for the Plan2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-plan2',
  templateUrl: 'plan2.html',
})
export class Plan2Page {
  posts: any;
  public userDetails : any;
  responseData:any;
  area:any;
  planData:any = {
    "subject" : "",
    "createdby_id": "",
    "mulai":"",
    "akhir":"",
    "kegunaan":"",
    "comment":"",
    "hasil" : [], 
    "latlng" : []
};
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public menu: MenuController, public authService: AuthServiceProvider ) {
  this.menu.swipeEnable(false);
  var latlng = navParams.get('latlng');
  this.area = navParams.get('area');
  console.log(this.area)
  var split1 = latlng.split(",");
  var convert = split1.join(", ");
  var polygon_lenght = convert.length - 2 ;
  var hasil_polygon = convert.slice(0, polygon_lenght)
  this.planData.latlng = hasil_polygon.split(", ");
  /* var lati = split1[0];
  var long = split1[1];
  var apiurl = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
  var url2 = "&sensor=true"
  this.http.get(apiurl+lati+','+long+url2).map(res => res.json()).subscribe(data => {
        this.posts = data.results[0];
        var city = this.posts.formatted_address
        var city2 = city.split(",");
        //console.log(city2["3"])
        //console.log(this.posts.lenght)
        //var kota = this.posts.address_components
        //console.log(kota.length)
        this.planData.city = city2["3"];
    }); */

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


  const data = JSON.parse(localStorage.getItem('userHiber'));
  this.userDetails = data;
  this.planData.createdby_id = this.userDetails['id'];

  //console.log(this.responseData);
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanDuaPage');

  }
  planForm() {
    console.log(this.planData);
  }
  backToWelcome(){
    this.navCtrl.setRoot(WelcomePage);
   }
  startDate(mulai){
    //console.log(mulai)
    this.planData.akhir = mulai;
  }
  cari() {
    if ((this.planData.mulai == "") || (this.planData.akhir == "") || (this.planData.kegunaan == "") || (this.planData.hasil == "")   ) {
        this.presentAlert()
    } else{
    console.log(this.planData);

    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Informasi, yang telah di unggah dan diterima oleh Penyedia Jasa, tidak bisa dirubah, kecuali atas persetujuan Kedua belah pihak. Pastikan informasi yang anda masukan telah benar',
      buttons: [
        {
          text: 'Oke',
          handler: () => {
              this.authService.postData(this.planData, "api/user/order", this.userDetails['access_token']).then((result) => {
              this.responseData = result;
              console.log(this.responseData);
              if(this.responseData['success'] == true){
                this.navCtrl.push(Proyek1Page, {
                  plan2 : '1',
                });      
              }else{
                 localStorage.clear();
                setTimeout(()=> this.backToWelcome(), 1000);  
              }
            });  
            //this.navCtrl.push(Proyek1Page)      
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
  }
  aturArea(){
    this.navCtrl.setRoot(MapPage);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Harus diisi!',
      subTitle: '- Mulai<br/>- Akhir<br/>- Kegunaan dan hasil',
      buttons: ['Ok']
    });
    alert.present();
  }
}

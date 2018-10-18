import { Component } from '@angular/core';
import { App, MenuController, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RatingPage } from '../rating/rating';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { WelcomePage } from '../welcome/welcome'



/**
 * Generated class for the Proyek1berjalanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-proyek1berjalan',
  templateUrl: 'proyek1berjalan.html',
})
export class Proyek1berjalanPage {
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any
  finish :any =  { "status" : "3", "provider_id" : ""}
  status : any
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public menu: MenuController, public app: App, public authService:AuthServiceProvider) {
     this.menu.swipeEnable(false);
     const data = JSON.parse(localStorage.getItem('order_show'));
     this.items = data;
     const user = JSON.parse(localStorage.getItem('userHiber'));
     this.userDetails = user;
     //console.log(this.items)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyek1berjalanPage');
    for(var index in this.items) { 
      if(this.items[index]['status_id'] == '2')
        this.status = this.items[index]['status_id'];
      //console.log(status);
  }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Loading..',
    });

    this.loading.present();
  }

  backToWelcome(){
    let nav = this.app.getRootNav();
    nav.setRoot(WelcomePage);
   }
  konfirmasi(subject : any, order_id:any) {
    let confirm = this.alertCtrl.create({
      title: 'Informasi',
      message: 'Anda akan mengkonfirmasi proyek '+  subject +' telah selesai dikerjakan dengan baik. Pilih "Selesai" jika benar. "Belum" untuk menghubungi pekerja proyek',
      buttons: [
        {
          text: 'Selesai',
          handler: () => {
            this.authService.putData(this.finish, "api/user/order_status/" + order_id, this.userDetails['access_token']).then((result) => {
              this.responseData = result;
              console.log(this.responseData);
              if(this.responseData['success'] == true){
                let nav = this.app.getRootNav();
                nav.push(RatingPage, {
                  order_ids : order_id
                });
              }else{
                 localStorage.clear();
                setTimeout(()=> this.backToWelcome(), 1000);  
              }
            });  
          }
        },
        {
          text: 'Belum',
          handler: () => {
            console.log('Kembali clicked');
          }
        }
      ]
    });
    confirm.present();
  }

}

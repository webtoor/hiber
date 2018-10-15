import { Component, ElementRef, ViewChild, } from '@angular/core';
import { App, MenuController, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { PolygonPage } from '../polygon/polygon'
import { StatusPage } from '../status/status'
import { WelcomePage } from '../welcome/welcome'




/**
 * Generated class for the Proyek1baruPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-proyek1baru',
  templateUrl: 'proyek1baru.html',
})
export class Proyek1baruPage {
  proyekData : any
  public userDetails : any;
  public responseData: any;
  public items : any;
  loading:any
  cancels : { "status" : "4"}

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public authService:AuthServiceProvider, public app: App) {
    this.menu.swipeEnable(false);
    const data = JSON.parse(localStorage.getItem('userHiber'));
    this.userDetails = data;
    this.getProject();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyek1baruPage');
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
  getProject(){
    this.showLoader()
    this.authService.getData('api/user/order_show/' + this.userDetails['id'], this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        localStorage.setItem('order_show', JSON.stringify(this.responseData['order']));
        this.items = this.responseData['order'];
        this.loading.dismiss()
      }else{
        this.loading.dismiss()
        localStorage.clear();
        setTimeout(()=> this.backToWelcome(), 1000);  
      }
    }, (err) => {
      this.loading.dismiss()
    });
}
      polygon(order_id:any, subject:any){
          //console.log(order_id)

          let nav = this.app.getRootNav();
          nav.push(PolygonPage, {
          order_id : order_id,
          subject : subject
        });
      }

    status(order_id:any, subject:any){
      //console.log(order_id)
      //console.log(subject)
      let nav = this.app.getRootNav();
      nav.push(StatusPage, {
      order_id : order_id,
      subject : subject
    });
    }

    cancel(order_id:any){
    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Informasi, yang telah di unggah dan diterima oleh Penyedia Jasa, tidak bisa dirubah, kecuali atas persetujuan Kedua belah pihak. Pastikan informasi yang anda masukan telah benar',
      buttons: [
        {
          text: 'Oke',
          handler: () => {
              this.authService.putData(this.cancels, "api/user/order_status/" + order_id, this.userDetails['access_token']).then((result) => {
              this.responseData = result;
              console.log(this.responseData);
              if(this.responseData['success'] == true){
                   
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

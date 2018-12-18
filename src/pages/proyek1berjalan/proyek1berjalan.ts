import { Component } from '@angular/core';
import { App, MenuController, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { RatingPage } from '../rating/rating';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { WelcomePage } from '../welcome/welcome'
import { ProfilproviderPage } from '../profilprovider/profilprovider'



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
  cancels :any =  { "status" : "4", "provider_id" : ""}

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public menu: MenuController, public app: App, public authService:AuthServiceProvider) {
     this.menu.swipeEnable(false);
  /*    const data = JSON.parse(localStorage.getItem('order_show'));
     this.items = data;
     console.log(this.items) */
     const user = JSON.parse(localStorage.getItem('userHiber'));
     this.userDetails = user;
     

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyek1berjalanPage');
  /*   for(var index in this.items) { 
      if(this.items[index]['status_id'] == '2')
        this.status = this.items[index]['status_id'];
      //console.log(this.items);
  } */
  this.getProjectBerjalan();
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

   getProjectBerjalan(){
    this.showLoader()
    this.authService.getData('api/user/order_berjalan/' + this.userDetails['id'], this.userDetails['access_token']).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData['success'] == true){
        this.items = this.responseData['order_berjalan'];
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
  konfirmasi(subject : any, order_id:any) {
    let confirm = this.alertCtrl.create({
      title: 'Informasi',
      message: 'Anda akan mengkonfirmasi proyek '+  subject +' telah selesai dikerjakan dengan baik. Pilih "Selesai" jika benar. "Belum" jika belum selesai',
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

  cancel(subject:any,order_id:any, ){
    console.log(this.cancels)
  let confirm = this.alertCtrl.create({
    title: 'Konfirmasi',
    message: 'Apakah anda yakin untuk membatalkan order ' + subject + '?',
    buttons: [
      {
        text: 'Oke',
        handler: () => {
            this.authService.putData(this.cancels, "api/user/order_status/" + order_id, this.userDetails['access_token']).then((result) => {
            this.responseData = result;
            console.log(this.responseData);
            if(this.responseData['success'] == true){
              this.showLoader()
              localStorage.removeItem('order_show');
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
              this.loading.dismiss()

            }else{
               localStorage.clear();
              setTimeout(()=> this.backToWelcome(), 1000);  
            }
          });  
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

provider_id(id_provider:any){
  console.log(id_provider)
  let nav = this.app.getRootNav();
  nav.push(ProfilproviderPage, {
  id : id_provider,
});
}
}

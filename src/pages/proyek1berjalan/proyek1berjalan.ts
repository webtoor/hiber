import { Component } from '@angular/core';
import { App, MenuController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RatingPage } from '../rating/rating';



/**
 * Generated class for the Proyek1berjalanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-proyek1berjalan',
  templateUrl: 'proyek1berjalan.html',
})
export class Proyek1berjalanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public menu: MenuController, public app: App) {
     this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Proyek1berjalanPage');
  }
  konfirmasi() {
    let confirm = this.alertCtrl.create({
      title: 'Konfirmasi',
      message: 'Informasi, Anda akan mengkonfirmasi proyek "1082017_1" telah selesai dikerjakan dengan baik. Pilih "Selesai" jika benar. "Belum" untuk menghubungi pekerja proyek',
      buttons: [
        {
          text: 'Selesai',
          handler: () => {
            /*console.log('Oke clicked');*/
            let nav = this.app.getRootNav();
            nav.push(RatingPage);
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

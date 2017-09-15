import { Component, NgZone, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Searchbar   } from 'ionic-angular';

/**
 * Generated class for the AutoCompletePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auto-complete',
  templateUrl: 'auto-complete.html',
})
export class AutoCompletePage {
    autocompleteItems: any;
    autocomplete: any;
    acService = new google.maps.places.AutocompleteService();
    placesService: any;
    @ViewChild('searchbar') searchbar:Searchbar;


    constructor(public viewCtrl: ViewController,  private zone: NgZone) {
      this.autocompleteItems = [];
      this.autocomplete = {
          query: ''
      };
      this.ionViewDidEnter()
    }
  ionViewDidEnter() {
       setTimeout(() => {
         this.searchbar.setFocus()
        });

  }
    dismiss() {
        this.viewCtrl.dismiss();
    }

    chooseItem(item: any) {
      this.viewCtrl.dismiss(item);
    }

    updateSearch() {
      if (this.autocomplete.query.length > 0) {
        let self = this;
        let config = {
            types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input: this.autocomplete.query,
            componentRestrictions: { country: 'ID' }
        }
        this.acService.getPlacePredictions(config, (predictions, status) => {
            if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
              predictions.forEach((prediction) => {
              self.autocompleteItems.push(prediction);
              });
            }
            });
          } else {
            this.autocompleteItems = [];
          }
}
  }

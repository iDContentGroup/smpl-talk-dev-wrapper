import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	constructor(public navCtrl: NavController, private iab: InAppBrowser) {
  		const url = 'https://smpl-talk-develop.firebaseapp.com';
  		const target = '_blank';
  		let options = 'location=yes,toolbar=yes';
		const browser = this.iab.create(url, target, options);

		// browser.executeScript(...);
		// browser.insertCSS(...);
		// browser.close();
		// browser.show();
  	}

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	constructor(public navCtrl: NavController, private iab: InAppBrowser) {

		const browser = this.iab.create('https://smpl-talk-develop.firebaseapp.com');

		// browser.executeScript(...);
		// browser.insertCSS(...);
		// browser.close();
		// browser.show();
  	}

}

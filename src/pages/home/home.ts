import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    options: string;
  	cow: string;

    loadstopEvents: any;

    JSON: any;
    browser: any;

    constructor(public navCtrl: NavController, private iab: InAppBrowser) {
      this.JSON = JSON;

  		this.options = '';

      var optionAry = [];

      optionAry.push("disallowoverscroll=yes");//(iOS) Turns on/off the UIWebViewBounce property.
      optionAry.push("keyboardDisplayRequiresUserAction=no");// (iOS) Should take care of ios not allowing focus on inputs
      // optionAry.push("hidden=yes");

      optionAry.push("toolbar=yes");// (iOS) Should be testing only
      optionAry.push("location=yes"); // Should be testing only
      // optionAry.push("clearcache=yes");// Should be testing only
      // optionAry.push("clearsessioncache=yes");// Should be testing only

      for (var i = 0; i < optionAry.length; i++) {
        this.options += optionAry[i];
        if (i !== optionAry.length - 1) {
         this.options += ",";
        }
      }

      this.cow = 'cow';


  	}

  	moo() {
  		const url = 'https://smpl-talk-develop.firebaseapp.com/#/';
  		const target = '_blank';

  		this.browser = this.iab.create(url, target, this.options);

      this.browser.on("loadstop").subscribe(event => {
        console.log(event);
        this.loadstopEvents.push(event);
        this.browser.show();

        this.browser.executeScript({
          code: "alert('loadstop')"
        });
      });

  		// browser.executeScript(...);
  		// browser.insertCSS(...);
  		// browser.close();
  		// browser.show();
  	}
}

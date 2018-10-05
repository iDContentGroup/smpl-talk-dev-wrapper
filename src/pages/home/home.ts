import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';

import 'rxjs/add/operator/map';

import { Device } from '@ionic-native/device';

import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Push, PushObject } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	options: any;

	doDebug: boolean;

	browser: any;

  platform: Platform;

  constructor(public navCtrl: NavController, public platform: Platform, public iab: InAppBrowser) {
    this.platform = platform;
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      console.log(this.platform);
      this.startBrowser();
    });
  }

  startBrowser() {
    const target = '_blank';
  	this.options = '';

    var optionAry = [];

    optionAry.push("disallowoverscroll=yes");//(iOS) Turns on/off the UIWebViewBounce property.
    optionAry.push("keyboardDisplayRequiresUserAction=no");// (iOS) Should take care of ios not allowing focus on inputs
    // optionAry.push("hidden=yes");
    
    if (this.doDebug) {
      // optionAry.push("toolbar=yes");// (iOS) Should be testing only
      optionAry.push("location=yes"); // Should be testing only
      optionAry.push("clearcache=yes");// Should be testing only
      optionAry.push("clearsessioncache=yes");// Should be testing only
    } else {
      optionAry.push("toolbar=no");// (iOS) Should be testing only
      optionAry.push("location=no"); // Should be testing only
    }

    for (var i = 0; i < optionAry.length; i++) {
      this.options += optionAry[i];
      if (i !== optionAry.length - 1) {
       this.options += ",";
      }
    }

    if (this.platform.is('cordova')) {
      this.browser = this.browser || this.iab.create("https://ah.smpltalk.com/#/", target, this.options);
  	}
  }
}

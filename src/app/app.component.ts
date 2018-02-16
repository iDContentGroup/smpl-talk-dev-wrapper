import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FirebaseTestPage } from '../pages/firebaseTest/firebaseTest';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private push: Push) {
    this.initializeApp();

    this.setupPush();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Firebase Test', component: FirebaseTestPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setupPush() {
    // source: https://www.youtube.com/watch?v=sUjQ3G17T80

    // to check if we have permission
      this.push.hasPermission().then((res: any) => {
        if (res.isEnabled) {
          alert('We have permission to send push notifications');
        } else {
          alert('We do not have permission to send push notifications');
        }
      });

      // to initialize push notifications
      // const options: PushOptions = {
      const options: any = {
         android: {
           //senderID: XXXX
           //icon: ?
           //iconColor: ?
           //vibrate: 'true',
           //clearBadge: 'true',
           //clearNotifications: 'true',
           //forceShow: 'true',
           //messageKey: '',
           //titleKey: '',
           alert: 'true',
           badge: true,
           sound: 'true'
         },
         ios: {
             alert: 'true',
             badge: true,
             sound: 'true'
             //clearBadge: 'true'
         },
         windows: {},
         browser: {
             pushServiceURL: 'http://push.api.phonegap.com/v1/push'
         }
      };
      
      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification').subscribe((notification: any) => {
        alert('Received a notification' + JSON.stringify(notification));
        // foreground

        if (notification.additionalData.foreground) {
          
        } else {
          
        }

        //collapse_key  string  (optional)
        //coldstart  boolean  (optional)
        //from  string  (optional)
        //notId
      });

      pushObject.on('registration').subscribe((registration: any) => {
        alert('Device registered' + JSON.stringify(registration));
        // TODO: Save deviceID to user's account
      });

      pushObject.on('error').subscribe(error => {
        alert('Error with Push plugin' + JSON.stringify(error));
        // TODO: log error
      });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

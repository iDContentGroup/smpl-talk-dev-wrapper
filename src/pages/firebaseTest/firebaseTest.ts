import { Component, ChangeDetectorRef } from '@angular/core';
// import { Component, Input, Output, EventEmitter, ElementRef, ViewChild,  } from '@angular/core';

import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import firebase from 'firebase';

@Component({
  selector: 'page-firebase-test',
  templateUrl: 'firebaseTest.html'
})
export class FirebaseTestPage {
    options: string;

    loadstopEvents: any;

    JSON: any;
    browser: any;

    doDebug: boolean;

    unsubscribeOnAuthStateChanged: any;
    user: any;

    messageLogs: string[];

    constructor(public navCtrl: NavController, private iab: InAppBrowser, private ref: ChangeDetectorRef, private push: Push) {
      this.JSON = JSON;
      this.loadstopEvents = [];
  	}

    ngOnInit() {
      console.log("firebaseTest on init");

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
           alert: 'true',
           badge: true,
           sound: 'true'
         },
         ios: {
             alert: 'true',
             badge: true,
             sound: 'true'
         },
         windows: {},
         browser: {
             pushServiceURL: 'http://push.api.phonegap.com/v1/push'
         }
      };

      const pushObject: PushObject = this.push.init(options);


      pushObject.on('notification').subscribe((notification: any) => alert('Received a notification' + notification));

      pushObject.on('registration').subscribe((registration: any) => alert('Device registered' + registration));

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

      this.unsubscribeOnAuthStateChanged = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
    }

    firebaseSignInEmailAndPassword() {
      var email = 'sean@smpl.company';
      var password = 'password@123';

      if (!email) {
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
        if (error) {
          console.log(error)
        }
      }).then(user => {
        console.log(user);
      });
    }

    firebaseSignOut() {
      firebase.auth().signOut().then(() => {
        // this.user = null;
      }, error => {
        console.log(error);
      });
    }
}

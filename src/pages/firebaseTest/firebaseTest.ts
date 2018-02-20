import { Component, ChangeDetectorRef } from '@angular/core';
// import { Component, Input, Output, EventEmitter, ElementRef, ViewChild,  } from '@angular/core';

import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

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

    idToken: string;

    constructor(public navCtrl: NavController, private iab: InAppBrowser, private ref: ChangeDetectorRef) {
      this.JSON = JSON;
      this.loadstopEvents = [];
  	}

    ngOnInit() {
      console.log("firebaseTest on init");
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
        // get iDToken to pass to web app
        user.getIdToken(true).then(idToken => {

          console.log('firebase idToken:');
          console.log(idToken);
          this.idToken = idToken;
        });
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

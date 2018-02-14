import { Component, ChangeDetectorRef } from '@angular/core';
// import { Component, Input, Output, EventEmitter, ElementRef, ViewChild,  } from '@angular/core';

import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { ImagePicker } from '@ionic-native/image-picker';

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

    constructor(public navCtrl: NavController, private iab: InAppBrowser, private ref: ChangeDetectorRef) {
      this.JSON = JSON;
      this.loadstopEvents = [];
  	}

    ngOnInit() {
      console.log("moo on init");

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

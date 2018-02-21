import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
// import { Component, Input, Output, EventEmitter, ElementRef, ViewChild,  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NavController, Platform } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

import firebase from 'firebase';

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

    showIFrame: boolean;

    doDebug: boolean;

    showCamera: boolean;

    img: any;
    imgError: any;

    browserLoopSetTimeout: any;

    loggingIn: boolean;
    unsubscribeOnAuthStateChanged: any;
    user: any;

    constructor(public platform: Platform, public navCtrl: NavController, private iab: InAppBrowser, 
      private camera: Camera, private imagePicker: ImagePicker, private ref: ChangeDetectorRef, 
      private http: Http, private ngZone: NgZone) {
      this.JSON = JSON;
      this.http = http;

      this.loadstopEvents = [];
  	}

    ngOnInit() {
      
      this.unsubscribeOnAuthStateChanged = firebase.auth().onAuthStateChanged(user => {
        this.ngZone.run(() => {
          if (user) {
            this.user = user;
            alert(this.user.uid);
          } else {
            alert("logged out");
            this.user = null;
          }
        });
      });
    }

    toggleDebug() {
      this.doDebug = !this.doDebug;
    }

  	startBrowser() {
      if (!this.browser) {
        const url = 'https://smpl-talk-develop.firebaseapp.com/#/';
        const target = '_blank';

        this.options = '';

        var optionAry = [];

        optionAry.push("disallowoverscroll=yes");//(iOS) Turns on/off the UIWebViewBounce property.
        optionAry.push("keyboardDisplayRequiresUserAction=no");// (iOS) Should take care of ios not allowing focus on inputs
        // optionAry.push("hidden=yes");
        if (this.doDebug) {
          optionAry.push("toolbar=yes");// (iOS) Should be testing only
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
          this.browser = this.iab.create(url, target, this.options);

          this.browser.on("loadstart").subscribe(event => {
            this.browser.executeScript({ code: "localStorage.setItem('nativeAppMode', 'moo');" });
            this.browser.executeScript({code: 'window.my.activateAppMode.publicActivateAppModeFunc();'});

            clearTimeout(this.browserLoopSetTimeout);
          });

          this.browser.on("loadstop").subscribe(event => {
            // this.browser.executeScript({ code: "localStorage.setItem('nativeAppMode', 'moo');" });
            // this.browser.executeScript({ code: 'window.my.activateAppMode.publicActivateAppModeFunc();'});
            this.browser.executeScript({
              code: "localStorage.setItem('nativeAppTime', 'moo');"
            });
            this.browser.executeScript({
              code: "localStorage.setItem('nativeAppTime', '" + Date.now() + "');"
            }, values => {
              this.ngZone.run(() => {
                var hideWebWrapper = values[0];

                if (hideWebWrapper) {
                  this.browser.executeScript({ code: "localStorage.setItem('hideWebApp', '');" });
                  this.browser.hide();
                  this.ref.detectChanges();
                }
              });
            });

            this.loadstopEvents.push(event);
            clearTimeout(this.browserLoopSetTimeout);
            this.browserLoopSetTimeout = this.browserLoopFunction(100);
          });
        }
      } else {
        this.browser && this.browser.show && this.browser.show();
      }
  	}

    browserLoopFunction(delay: number) {
      if (this.browser) {
        this.browser.executeScript({
          code: "localStorage.getItem('hideWebApp')"
        }, values => {
          this.ngZone.run(() => {
            var hideWebWrapper = values[0];

            if (hideWebWrapper) {
              this.browser.executeScript({ code: "localStorage.setItem('hideWebApp', '');" });
              this.browser.hide();
              this.ref.detectChanges();
            }
          });
        });

        this.browser.executeScript({
          code: "localStorage.getItem('firebase_id_token_output')"
        }, values => {
          var firebase_id_token = values[0];

          if (firebase_id_token) {
            if (this.loggingIn) {
              this.logUserOutOfBrowser();
            } else {
              this.loggingIn = true;

              this.browser.executeScript({ code: "localStorage.setItem('firebase_id_token_output', '');" });
              
              alert('firebase_id_token: ' + firebase_id_token);
              
              var exchangeIDTokenForCustTokenSubscription = this.exchangeIDTokenForCustToken(firebase_id_token).subscribe(data => {
                this.ngZone.run(() => {
                  this.signInWithCustomToken(data);
                });
                // localStorage.setItem("firebase_id_token", "");
              }, error => {
                this.ngZone.run(() => {
                  alert("Error occurred when attempting to exchange firebase ID token for custom auth token.");
                  exchangeIDTokenForCustTokenSubscription.unsubscribe();
                  // localStorage.setItem("firebase_id_token", "");
                  this.loggingIn = false;
                });
              }, () => {
                this.ngZone.run(() => {
                  // console.log("Token exchange completed.");
                  exchangeIDTokenForCustTokenSubscription.unsubscribe();
                  this.loggingIn = false;
                  // localStorage.setItem("firebase_id_token", "");
                });
              });

              // this.ref.detectChanges();
            }
            
            // please update..
          }
        });

        this.browser.executeScript({
          code: "localStorage.getItem('logoutOfNativeApp')"
        }, values => {
          this.ngZone.run(() => {
            var shouldLogout = values[0];

            if (shouldLogout) {
              this.browser.executeScript({ code: "localStorage.setItem('logoutOfNativeApp', '');" });
              // this.browser.hide();
              // this.ref.detectChanges();
              // alert(shouldLogout);
              this.logUserOutOfBrowser();
              // please update..
            }
          });
        });
      }

      this.browserLoopSetTimeout = setTimeout(this.browserLoopFunction, delay);
    }

    logUserOutOfBrowser() {
      if (this.browser) {
        this.browser.executeScript({ code: "localStorage.setItem('shouldLogout', 'moo');" });
        this.browser.executeScript({ code: 'window.my.activateAppMode.publicShouldLogoutFunc();'});
      }
    }

    exchangeIDTokenForCustToken(iDToken: any) {
      var url = "https://us-central1-ourg-2c585.cloudfunctions.net/g41-app/exchangeIDTokenForCustToken";
      let headers = new Headers();

      headers.append('Authorization', 'Bearer ' + iDToken);

      return this.http.get(url, {headers: headers}).map((res: Response) => res.text());
    }

    signInWithCustomToken(token: any) {
      return firebase.auth().signInWithCustomToken(token).then(user => {
        // console.log("User with user id: " + user.uid + " created/logged in.");
      }).catch(error => {
        // Handle Errors here.
        var errorMessage: string;

        if (error.code) {
          if (error.code === 'auth/custom-token-mismatch') {
            errorMessage = "Token is for a different App";
          } else if (error.code === 'auth/invalid-custom-token') {
            errorMessage = "Token format is incorrect";
          }
        }

        errorMessage = errorMessage || error.message || error;

        // console.log(errorMessage);
        this.loggingIn = false;
        this.logUserOutOfBrowser();

        alert(errorMessage);
      });
    }

    firebaseSignOut() {
      firebase.auth().signOut().then(() => {
        // this.user = null;
      }, error => {
        // console.log(error);
        alert(error);
      });
    }

    // this.showCamera = false;

    // // Execute JavaScript to check for the existence of a showCamera in the
    // // child browser's localStorage.
    // this.browser.executeScript({
    //   code: "localStorage.getItem( 'showCamera' )"
    // }, values => {
    //   var showCamera = values[ 0 ];

    //   // If a showCamera was set, clear the interval and close the InAppBrowser.
    //   if ( showCamera ) {
    //       // clearInterval( loop );
    //       // TODO: i can't edit the image because onClick expects another upload :3
    //       // oops
    //       this.browser.executeScript({ code: "localStorage.setItem( 'showCamera', '' );" });

    //       this.browser.hide();
    //       this.showCamera = true;
    //       this.ref.detectChanges();
    //   }
    // });

    getImageFromCamera() {
      const options: CameraOptions = {
        quality: 50,//50 is default
        destinationType: this.camera.DestinationType.DATA_URL,
        // destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true
      }

      this.camera.getPicture(options).then(imageData => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       // let base64Image = imageData;
       this.img = base64Image;
       if (this.browser) {
         this.browser.show();
         this.browser.executeScript({code: 'window.my.namespace.publicFunc("' + this.img + '");'});
       }
      }, (err) => {
       // Handle error
       this.imgError = err;
      });
    }

    getImageFromGallery(): void {
      let options = {
        maximumImagesCount: 1,
        quality: 100,
        width: 500,
        height: 500,
        outputType: 1
      }

      this.imagePicker.getPictures(options).then(file_uris => {
        // Gettin base64
        // source: https://forum.ionicframework.com/t/image-picker-give-base64-of-image-or-not/93571/8
        this.img = 'data:image/jpeg;base64,' + file_uris[0];

        // for (var i = 0; i < file_uris.length; i++) {
        //     // console.log('Image URI: ' + file_uris[i]);
        // }
      }, err => {
        this.imgError = err;
      });
    }

    iframeTest() {
      this.showIFrame = !this.showIFrame;
    }
}

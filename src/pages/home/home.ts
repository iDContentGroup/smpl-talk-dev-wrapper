import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
// import { Component, Input, Output, EventEmitter, ElementRef, ViewChild,  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { NavController, Platform, ToastController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { ImagePicker } from '@ionic-native/image-picker';

import { Push, PushObject, PushOptions } from '@ionic-native/push';


import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    options: string;

    loadstopEvents: any;

    JSON: any;
    browser: any;

    doDebug: boolean;

    browserLoopSetTimeout: any;
    browserLoopIsActive: boolean;

    webTimestamp: number;
    nativeTimestamp: number;

    loggingIn: boolean;
    unsubscribeOnAuthStateChanged: any;

    users: any;
    fbUser: any;
    usersInitalized: boolean;

    device: any;

    webNav: any;
    nativeAppModeActivated: boolean;

    test: any;
    test2: any;

    promiseTest: any;

    error: any;

    constructor(public platform: Platform, public navCtrl: NavController, public iab: InAppBrowser, private ref: ChangeDetectorRef, 
      private http: Http, private ngZone: NgZone, public push: Push, public toastCtrl: ToastController) {
      this.JSON = JSON;
      this.http = http;

      this.loadstopEvents = [];
  	}

    ngOnInit() {
      // this.toast('ngOnInit');
      this.platform.ready().then(() => {
        // this.toast('platform is ready');

        this.webNav = {postKey: 'postKey', groupKey: 'groupKey', networkKey: 'networkKey', data: {'action': 'liked'}};

        if (this.platform.is('cordova')) {
          // this.setupPush();

          // this.platform.resume.subscribe(event => {
          //   this.ngZone.run(() => {
          //     this.toast("resumed: " + Date.now());
          //   });
          // });

          // this.platform.pause.subscribe(event => {
          //   this.ngZone.run(() => {
          //     this.toast("paused:" + Date.now());
          //   });
          // });
        }

        this.startBrowser();

        
        // this.unsubscribeOnAuthStateChanged = firebase.auth().onAuthStateChanged(user => {
        //   this.ngZone.run(() => {
        //     if (user) {
        //       this.users = [];

        //       this.fbUser = user;
        //       this.toast('native logged in: ' + this.fbUser.uid + " | " + this.fbUser.email);
        //       firebase.database().ref("UsersRef/").orderByChild('email').equalTo(this.fbUser.email).once('value').then(usersRef => {
        //         usersRef.forEach(userRef => {
        //           var user = userRef.val();
        //           user['key'] = userRef.key;

        //           this.users.push(user);
        //         })
        //       }).then(() => {
        //         this.usersInitalized = true;
        //         this.toast(this.users);
        //         this.setDeviceUserPairing();
        //       });
        //       // TODO: do some stuff with push notifications
        //     } else {
        //       this.toast("native logged out");
        //       this.fbUser = null;
        //       this.users = [];
        //       this.usersInitalized = true;

        //       this.setDeviceUserPairing();
        //     }
            
        //     this.startBrowser();
        //   });
        // });
      });
    }

    toggleDebug() {
      this.doDebug = !this.doDebug;
    }

  	startBrowser() {
      // this.toast("startBrowser");
      if (!this.browser) {
        const url = 'https://smpl-talk-develop.firebaseapp.com/#/';
        const target = '_blank';

        this.options = '';

        var optionAry = [];

        optionAry.push("disallowoverscroll=yes");//(iOS) Turns on/off the UIWebViewBounce property.
        optionAry.push("keyboardDisplayRequiresUserAction=no");// (iOS) Should take care of ios not allowing focus on inputs
        optionAry.push("hidden=yes");
        this.doDebug = true;
        
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

          // this.browser.on("loadstart").subscribe(event => {
          //   this.browser.executeScript({ code: "alert('loadstart');" });
          // });

          // this.browser.on("loadstop").subscribe(event => {
          //   this.browser.executeScript({ code: "alert('loadstop');" });
          // });

          // this.browser.on("loaderror").subscribe(event => {
          //   this.browser.executeScript({ code: "alert('loaderror');" });
          // });

          // loadstop doesn't seem to work on 
          this.browser.on("loadstart").subscribe(event => {
            this.ngZone.run(() => {
              // this.browser.executeScript({ code: "localStorage.setItem('nativeAppMode', 'moo');" });
              // this.browser.executeScript({code: 'window.my.activateAppMode.publicActivateAppModeFunc();'});

              // this.clearBrowserLoop();

              // this.loadstopEvents.push(event);
              if (!this.browserLoopIsActive) {
                this.browserLoopIsActive = true;
                this.browserLoopFunction(6000);
              }
            });
          });

          // this.browser.on("loadstop").subscribe(event => {
            
          //   this.browser.executeScript({
          //     code: "localStorage.setItem('nativeAppTime', '" + Date.now() + "');"
          //   }, values => {
          //     this.ngZone.run(() => {
          //       var hideWebWrapper = values[0];

          //       if (hideWebWrapper) {
          //         this.browser.executeScript({ code: "localStorage.setItem('hideWebApp', '');" });
          //         this.browser.hide();
          //         this.ref.detectChanges();
          //       }
          //     });
          //   });
          // });
        }
      }
  	}

    browserLoopFunction(delay?: number) {
      // alert("started browser loop");


      // this.browser.executeScript({ code: "localStorage.setItem('nativeAppMode', 'moo');" });
            
      function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      }

      this.ngZone.run(() => {
        this.nativeTimestamp = Date.now();

        return this.browserTest().then(values => {
          if (values && values.length && values[0]) {
            return this.browser.executeScript({
              code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'test2', value: 'test2 ' + Date.now()}) + ");"   
            });
          }
        }).then(() => {
          // alert("got to the last then");
          if (delay) {
            this.browserLoopSetTimeout = setTimeout(() => {
              this.ngZone.run(() => {
                // alert("should start browser loop");
                this.browserLoopFunction(delay);
              });
            }, delay);
          }
        }).catch(error => {
          this.error = error;
        });
      });
    }

    clearBrowserLoop() {
      if (this.browserLoopIsActive) {
        this.browserLoopIsActive = false;
        clearTimeout(this.browserLoopSetTimeout);
      }
    }

    browserTest() {
      // alert('started browserTest');
      if (this.browser) {
        return this.browser.executeScript({
          // code: "window.my.activateAppMode.publicDebugFunc("");"
          code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'test', value: 'test ' + Date.now()}) + ");"
          // code: "1 + 1"
        }).then(values => {
          this.webTimestamp = Date.now();
          return values;
        }).catch(error => {
          this.error = error;
          // alert(error);
          return null;
        });
      } else {
        // alert('no browser');
        return Promise.resolve(null);
      }
    }

    browserActivateNativeAppMode() {
      if (this.browser && !this.nativeAppModeActivated) {
        return this.browser.executeScript({
          code: "window.my.activateAppMode.publicActivateAppModeFunc();"
        }, values => {
          return this.ngZone.run(() => {
            if (values && values.length && values[0]) {
              this.nativeAppModeActivated = true;
              return this.browser.executeScript({
                code: "window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'nativeAppMode', value: 'nativeAppMode was activiated by native app ' + Date.now()}) + ");"
              });
            }
          });
        });
      } else {
        return Promise.resolve(null);
      }
    }

    

    browserNav() {
      if (this.webNav) {
        return this.browser.executeScript({
          code: "window.my.activateAppMode.publicWebNavFunc("+ JSON.stringify(this.webNav) + ");"
        }, values => {
          this.ngZone.run(() => {
            var navStatus = values[0];

            if (navStatus) {
              this.toast("Native navStatus: " + navStatus);
              this.webNav = null;
            }

            if (values[0]) {
              this.webNav = null;

              return this.browser.executeScript({
                code: "window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'webNavStatus', value: 'nav by native app happened: ' + Date.now()}) + ");"
              });
            }
          });
        });
      } else {
        return Promise.resolve(null);
      }
    }

    logUserOutOfBrowser() {
      if (this.browser) {
        this.browser.executeScript({ code: "localStorage.setItem('shouldLogout', 'moo');" });
        this.browser.executeScript({ code: 'window.my.activateAppMode.publicShouldLogoutFunc();' });
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

        this.toast(errorMessage);
      });
    }

    firebaseSignOut() {
      firebase.auth().signOut().then(() => {
        // this.fbUser = null;
      }, error => {
        // console.log(error);
        this.toast(error);
      });
    }

    setupPush() {
      // this.toast("setupPush");
      // source: https://www.youtube.com/watch?v=sUjQ3G17T80

      // to check if we have permission
      this.push.hasPermission().then((res: any) => {
        if (res.isEnabled) {
          this.toast('We have permission to send push notifications');
        } else {
          this.toast('We do not have permission to send push notifications');
        }
      });

      // to initialize push notifications
      // const options: PushOptions = {
      const options: any = {
         android: {
           //senderID: XXXX
           //icon: ?
           //iconColor: ?
           vibrate: 'true',
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
             // badge: true,
             sound: 'true'
             //clearBadge: 'true'
         },
         windows: {},
         browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
         }
      };
      
      const pushObject: PushObject = this.push.init(options);
      // this.toast(JSON.stringify(pushObject));

      pushObject.on('notification').subscribe((notification: any) => {
        this.ngZone.run(() => {
          this.toast('Received a notification' + JSON.stringify(notification));
          // foreground

          if (notification.additionalData.foreground) {
            
          } else {
            
          }

          //collapse_key  string  (optional)
          //coldstart  boolean  (optional)
          //from  string  (optional)
          //notId
        });
      });

      pushObject.on('registration').subscribe((registration: any) => {
        this.ngZone.run(() => {
          this.toast('Device registered' + JSON.stringify(registration));

          // TODO: Save deviceID to user's account
          this.device = registration;

          this.setDeviceUserPairing();
        });
      });

      pushObject.on('error').subscribe(error => {
        this.ngZone.run(() => {
          this.toast('Error with Push plugin' + JSON.stringify(error));
          // TODO: log error
        });
      });
    }

    setDeviceUserPairing() {
      if (!this.usersInitalized || !this.device || !this.device.registrationId) {
        return null;
      }

      this.toast("pair device and user");
      
      var updates = {};

      var pushUserPath = 'Users';
      var pushDevicePath = 'Devices';

      firebase.database().ref('PushNotifications/Devices/' + this.device.registrationId + '/Users').once('value').then(users => {
        users.forEach(userSnapshot => {
          var match = false;

          this.toast(userSnapshot.key);

          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].key === userSnapshot.key) {
              match = true;
              break;
            }
          }

          if (!match) {
            // removeUserKeys.push(userSnapshot.key);
            updates[pushUserPath + '/' + userSnapshot.key + '/Devices/' + this.device.registrationId] = null;
            updates[pushDevicePath + '/' + this.device.registrationId + '/Users/' + userSnapshot.key] = null;
          }
        })
      }).then(() => {
        for (var i = 0; i < this.users.length; i++) {
          var user = this.users[i];
          var now = Date.now();

          updates[pushUserPath + '/' + user.key + '/Devices/' + this.device.registrationId] = now;
          updates[pushDevicePath + '/' + this.device.registrationId + '/Users/' + user.key] = now;
        }

        this.toast(JSON.stringify(updates));

        firebase.database().ref('PushNotifications/').update(updates, error => {
          if (error) {
            this.toast(error);
          } else {
            this.toast("updated pushNotifications in database");
          }
        });
      });
    }

    toast(message: any) {

      if (this.browser) {
        this.browser.executeScript({ code: 'alert(`Native: ' + JSON.stringify(message) + '`);' });
      } else {
        message = JSON.stringify(message);

        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top'
        });

        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });

        toast.present();
      }
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

    // getImageFromCamera() {
    //   const options: CameraOptions = {
    //     quality: 50,//50 is default
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     // destinationType: this.camera.DestinationType.FILE_URI,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //     allowEdit: true
    //   }

    //   this.camera.getPicture(options).then(imageData => {
    //    // imageData is either a base64 encoded string or a file URI
    //    // If it's base64:
    //    let base64Image = 'data:image/jpeg;base64,' + imageData;
    //    // let base64Image = imageData;
    //    this.img = base64Image;
    //    if (this.browser) {
    //      this.browser.show();
    //      this.browser.executeScript({code: 'window.my.namespace.publicFunc("' + this.img + '");'});
    //    }
    //   }, (err) => {
    //    // Handle error
    //    this.imgError = err;
    //   });
    // }

    // getImageFromGallery(): void {
    //   let options = {
    //     maximumImagesCount: 1,
    //     quality: 100,
    //     width: 500,
    //     height: 500,
    //     outputType: 1
    //   }

    //   this.imagePicker.getPictures(options).then(file_uris => {
    //     // Gettin base64
    //     // source: https://forum.ionicframework.com/t/image-picker-give-base64-of-image-or-not/93571/8
    //     this.img = 'data:image/jpeg;base64,' + file_uris[0];

    //     // for (var i = 0; i < file_uris.length; i++) {
    //     //     // console.log('Image URI: ' + file_uris[i]);
    //     // }
    //   }, err => {
    //     this.imgError = err;
    //   });
    // }
}

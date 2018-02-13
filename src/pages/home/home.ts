import { Component, ChangeDetectorRef } from '@angular/core';
// import { Component, Input, Output, EventEmitter, ElementRef, ViewChild,  } from '@angular/core';

import { NavController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

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

    constructor(public navCtrl: NavController, private iab: InAppBrowser, private camera: Camera, private imagePicker: ImagePicker, private ref: ChangeDetectorRef) {
      this.JSON = JSON;
      this.loadstopEvents = [];
  	}

    toggleDebug() {
      this.doDebug = !this.doDebug;
    }

  	moo() {
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

  		this.browser = this.iab.create(url, target, this.options);

      this.browser.on("loadstop").subscribe(event => {
        // console.log(event);
        this.loadstopEvents.push(event);
        this.browser.show();

        // this.browser.executeScript({
        //   code: "alert('loadstop'); alert(" + event + ")"
        // });

        // Clear out the name in localStorage for subsequent opens.
        this.browser.executeScript({ code: "localStorage.setItem( 'showCamera', '' );" });
        
        this.showCamera = false;

        // Start an interval
        var loop = setInterval(() => {
          // Execute JavaScript to check for the existence of a showCamera in the
          // child browser's localStorage.
          this.browser.executeScript({
            code: "localStorage.getItem( 'showCamera' )"
          }, values => {
            var showCamera = values[ 0 ];

            // If a showCamera was set, clear the interval and close the InAppBrowser.
            if ( showCamera ) {
                // clearInterval( loop );
                this.browser.executeScript({ code: "localStorage.setItem( 'showCamera', '' );" });

                this.browser.hide();
                this.showCamera = true;
                this.ref.detectChanges();
            }
          });
        });
      });

  		// browser.executeScript(...);
  		// browser.insertCSS(...);
  		// browser.close();
  		// browser.show();
  	}

    getImageFromCamera() {
      const options: CameraOptions = {
        quality: 90,
        // destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true
      }

      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       // let base64Image = 'data:image/jpeg;base64,' + imageData;
       let base64Image = imageData;
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

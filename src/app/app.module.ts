import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FirebaseTestPage } from '../pages/firebaseTest/firebaseTest';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { ImagePicker } from '@ionic-native/image-picker';

import { Push, PushObject, PushOptions } from '@ionic-native/push';

import firebase from 'firebase';

// Initialize Firebase Server
// import { firebaseConfig } from './firebaseConfig.ts';

const firebaseConfig = {
    apiKey: "AIzaSyDF1rX-QzDFUTYDvOp7Q-ZJMlY58eRCAPs",
    authDomain: "ourg-2c585.firebaseapp.com",
    databaseURL: "https://ourg-2c585.firebaseio.com",
    projectId: "ourg-2c585",
    storageBucket: "ourg-2c585.appspot.com",
    messagingSenderId: "599715636396"
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FirebaseTestPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FirebaseTestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    // Camera,
    // ImagePicker,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

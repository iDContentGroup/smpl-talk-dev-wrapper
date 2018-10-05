import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { InAppBrowser } from '@ionic-native/in-app-browser';

// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Push } from '@ionic-native/push';

import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.component';

import firebase from 'firebase';
// import * as firebase from 'firebase';

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
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Push,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

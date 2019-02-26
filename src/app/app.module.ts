import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Push } from '@ionic-native/push/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from "firebase/app";

import 'firebase/auth';
import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/storage';
import 'firebase/messaging';
// import 'firebase/functions';

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
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,

        InAppBrowser,
        Push,

        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

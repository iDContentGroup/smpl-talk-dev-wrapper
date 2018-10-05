import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { InAppBrowser } from '@ionic-native/in-app-browser';

// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Push } from '@ionic-native/push';

import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import { SmplTalk } from '../pages/smplTalk/smplTalk';

@NgModule({
  declarations: [
    MyApp,
    SmplTalk
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SmplTalk
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

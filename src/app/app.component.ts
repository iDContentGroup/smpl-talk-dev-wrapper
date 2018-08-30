import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SmplTalkPage } from '../pages/smplTalk/smplTalk';

// import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SmplTalkPage;

  pages: Array<{title: string, component: any}>;

  unsubscribeOnAuthStateChanged: any;
  user: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Smpl Talk', component: SmplTalkPage }
    ];
  }

  ngOnInit() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

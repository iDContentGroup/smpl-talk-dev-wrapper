import { Component } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(private iab: InAppBrowser) {
    }

    systemTest() {
        // const browser = this.iab.create('https://ionicframework.com/');
        var ref = this.iab.create('https://google.com', '_system', 'location=yes');
    }

    blankTest() {
        // const browser = this.iab.create('https://ionicframework.com/');
        var ref = this.iab.create('https://google.com', '_blank', 'location=yes');
    }
}

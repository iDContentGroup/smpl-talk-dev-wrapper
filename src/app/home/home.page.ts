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

    systemTest(url: string) {
        if (!url) {
            console.error("Unexpected missing url");
            return;
        }
        // const browser = this.iab.create('https://ionicframework.com/');
        var ref = this.iab.create(url, '_system', 'location=yes');
    }

    blankTest(url: string) {
        if (!url) {
            console.error("Unexpected missing url");
            return;
        }
        // const browser = this.iab.create('https://ionicframework.com/');
        var ref = this.iab.create(url, '_blank', 'location=yes');
    }
}

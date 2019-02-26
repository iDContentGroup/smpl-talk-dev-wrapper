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

    test() {
        // const browser = this.iab.create('https://ionicframework.com/');
        var ref = this.iab.create('https://google.com', 'system', 'location=yes');
    }
}

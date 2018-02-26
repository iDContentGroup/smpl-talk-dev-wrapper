var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
// import { Component, Input, Output, EventEmitter, ElementRef, ViewChild,  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import firebase from 'firebase';
var FirebaseTestPage = /** @class */ (function () {
    function FirebaseTestPage(navCtrl, iab, ref) {
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.ref = ref;
        this.JSON = JSON;
        this.loadstopEvents = [];
    }
    FirebaseTestPage.prototype.ngOnInit = function () {
        console.log("firebaseTest on init");
    };
    FirebaseTestPage.prototype.firebaseSignInEmailAndPassword = function () {
        var _this = this;
        var email = 'sean@smpl.company';
        var password = 'password@123';
        if (!email) {
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            if (error) {
                console.log(error);
            }
        }).then(function (user) {
            console.log(user);
            // get iDToken to pass to web app
            user.getIdToken(true).then(function (idToken) {
                console.log('firebase idToken:');
                console.log(idToken);
                _this.idToken = idToken;
            });
        });
    };
    FirebaseTestPage.prototype.firebaseSignOut = function () {
        firebase.auth().signOut().then(function () {
            // this.user = null;
        }, function (error) {
            console.log(error);
        });
    };
    FirebaseTestPage = __decorate([
        Component({
            selector: 'page-firebase-test',
            templateUrl: 'firebaseTest.html'
        }),
        __metadata("design:paramtypes", [NavController, InAppBrowser, ChangeDetectorRef])
    ], FirebaseTestPage);
    return FirebaseTestPage;
}());
export { FirebaseTestPage };
//# sourceMappingURL=firebaseTest.js.map
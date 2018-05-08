var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
// import { Component, Input, Output, EventEmitter, ElementRef, ViewChild,  } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { ImagePicker } from '@ionic-native/image-picker';
import { Push } from '@ionic-native/push';
import firebase from 'firebase';
var HomePage = /** @class */ (function () {
    function HomePage(platform, navCtrl, iab, ref, http, ngZone, push, toastCtrl) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.ref = ref;
        this.http = http;
        this.ngZone = ngZone;
        this.push = push;
        this.toastCtrl = toastCtrl;
        this.JSON = JSON;
        this.http = http;
        this.loadstopEvents = [];
    }
    HomePage.prototype.ngOnInit = function () {
        // this.doDebug = true;
        var _this = this;
        this.errors = [];
        this.fbUpdates = [];
        this.users = [];
        this.loginCount = 0;
        // this.toast('ngOnInit');
        this.platform.ready().then(function () {
            // this.toast('platform is ready');
            _this.webNav = { navType: 'post', postKey: 'postKey', groupKey: 'groupKey', networkKey: '-moo', data: { 'action': 'liked' } };
            if (_this.platform.is('cordova')) {
                _this.setupPush();
                // this.platform.resume.subscribe(event => {
                //   this.ngZone.run(() => {
                //     this.toast("resumed: " + this.getDateString());
                //   });
                // });
                // this.platform.pause.subscribe(event => {
                //   this.ngZone.run(() => {
                //     this.toast("paused:" + this.getDateString());
                //   });
                // });
            }
            _this.unsubscribeOnAuthStateChanged = firebase.auth().onAuthStateChanged(function (user) {
                _this.ngZone.run(function () {
                    if (user) {
                        _this.loginCount += 1;
                        _this.users = [];
                        _this.fbUser = user;
                        _this.toast('native logged in: ' + _this.fbUser.uid + " | " + _this.fbUser.email);
                        firebase.database().ref("UsersRef/").orderByChild('email').equalTo(_this.fbUser.email).once('value').then(function (usersRef) {
                            _this.users = [];
                            usersRef.forEach(function (userRef) {
                                var user = userRef.val();
                                user['key'] = userRef.key;
                                _this.users.push(user);
                            });
                        }).then(function () {
                            _this.usersInitalized = true;
                            _this.toast(_this.users);
                            _this.setDeviceUserPairing();
                        });
                        // TODO: do some stuff with push notifications
                    }
                    else {
                        _this.toast("native logged out");
                        _this.fbUser = null;
                        _this.users = [];
                        _this.usersInitalized = true;
                        // this.setDeviceUserPairing();
                    }
                    _this.startBrowser();
                });
            });
        });
    };
    HomePage.prototype.toggleDebug = function () {
        this.doDebug = !this.doDebug;
    };
    HomePage.prototype.startBrowser = function () {
        var _this = this;
        // this.toast("startBrowser");
        if (!this.browser) {
            var url = 'https://smpl-talk-develop.firebaseapp.com/#/';
            var target = '_blank';
            this.options = '';
            var optionAry = [];
            optionAry.push("disallowoverscroll=yes"); //(iOS) Turns on/off the UIWebViewBounce property.
            optionAry.push("keyboardDisplayRequiresUserAction=no"); // (iOS) Should take care of ios not allowing focus on inputs
            // optionAry.push("hidden=yes");
            if (this.doDebug) {
                // optionAry.push("toolbar=yes");// (iOS) Should be testing only
                optionAry.push("location=yes"); // Should be testing only
                optionAry.push("clearcache=yes"); // Should be testing only
                optionAry.push("clearsessioncache=yes"); // Should be testing only
            }
            else {
                optionAry.push("toolbar=no"); // (iOS) Should be testing only
                optionAry.push("location=no"); // Should be testing only
            }
            for (var i = 0; i < optionAry.length; i++) {
                this.options += optionAry[i];
                if (i !== optionAry.length - 1) {
                    this.options += ",";
                }
            }
            if (this.platform.is('cordova')) {
                this.browser = this.browser || this.iab.create(url, target, this.options);
                // this.browser.on("loadstart").subscribe(event => {
                //   this.browser.executeScript({ code: "alert('loadstart');" });
                // });
                // this.browser.on("loadstop").subscribe(event => {
                //   this.browser.executeScript({ code: "alert('loadstop');" });
                // });
                // this.browser.on("loaderror").subscribe(event => {
                //   this.browser.executeScript({ code: "alert('loaderror');" });
                // });
                this.browser.on("exit").subscribe(function (event) {
                    _this.browser = null;
                });
                this.browser.on("loadstart").subscribe(function (event) {
                    // this.ngZone.run(() => {
                    //   // this.browser.executeScript({ code: "localStorage.setItem('nativeAppMode', 'moo');" });
                    //   // this.browser.executeScript({code: 'window.my.activateAppMode.publicActivateAppModeFunc();'});
                    //   // this.clearBrowserLoop();
                    //   // this.loadstopEvents.push(event);
                    //   if (!this.browserLoopIsActive) {
                    //     this.browserLoopIsActive = true;
                    //     this.browserLoopFunction(6000);
                    //   }
                    // });
                });
                this.browser.on("loadstop").subscribe(function (event) {
                    _this.toast("loadstop worked", "bottom");
                    _this.ngZone.run(function () {
                        // this.browser.executeScript({ code: "localStorage.setItem('nativeAppMode', 'moo');" });
                        // this.browser.executeScript({code: 'window.my.activateAppMode.publicActivateAppModeFunc();'});
                        // this.clearBrowserLoop();
                        // this.loadstopEvents.push(event);
                        if (!_this.browserLoopIsActive) {
                            _this.browserLoopIsActive = true;
                            _this.browserLoopFunction(6000);
                        }
                    });
                    // this.browser.executeScript({
                    //   code: "localStorage.setItem('nativeAppTime', '" + this.getDateString() + "');"
                    // }, values => {
                    //   this.ngZone.run(() => {
                    //     var hideWebWrapper = values[0];
                    //     if (hideWebWrapper) {
                    //       this.browser.executeScript({ code: "localStorage.setItem('hideWebApp', '');" });
                    //       this.browser.hide();
                    //       this.ref.detectChanges();
                    //     }
                    //   });
                    // });
                });
            }
        }
    };
    HomePage.prototype.showBrowser = function () {
        this.browser && this.browser.show();
    };
    HomePage.prototype.browserLoopFunction = function (delay) {
        var _this = this;
        // this.toast("toast worked");
        this.ngZone.run(function () {
            _this.toast('browserLoopFunction');
            _this.nativeTimestamp = _this.getDateString();
            return _this.browserActivateNativeAppMode().then(function (values) {
                // nothing
            }).then(function () {
                return _this.browserLogoutOfNativeApp().then(function (values) {
                    // nothing
                });
            }).then(function () {
                return _this.browserGetFirebaseIdToken().then(function (values) {
                    // nothing
                });
            }).then(function () {
                return _this.browserSetNav().then(function (values) {
                    // nothing
                });
            }).then(function () {
                return _this.browserTest().then(function (values) {
                    if (values && values.length && values[0]) {
                        return _this.browser.executeScript({
                            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'test2', value: _this.getDateString() + ' test2' }) + ");"
                        });
                    }
                });
            }).then(function () {
                // this.toast("got to the last then");
                if (delay) {
                    _this.browserLoopSetTimeout = setTimeout(function () {
                        _this.ngZone.run(function () {
                            // this.toast("should start browser loop");
                            _this.browserLoopFunction(delay);
                        });
                    }, delay);
                }
            }).catch(function (error) {
                _this.toast('Unexpected error during browser loop');
                _this.errors.push(error);
                if (delay) {
                    _this.browserLoopSetTimeout = setTimeout(function () {
                        _this.ngZone.run(function () {
                            // this.toast("should start browser loop");
                            _this.browserLoopFunction(delay);
                        });
                    }, delay);
                }
            });
        });
    };
    HomePage.prototype.clearBrowserLoop = function () {
        if (this.browserLoopIsActive) {
            this.browserLoopIsActive = false;
            clearTimeout(this.browserLoopSetTimeout);
        }
    };
    HomePage.prototype.browserTest = function () {
        var _this = this;
        // this.toast('started browserTest');
        if (this.browser) {
            return this.browser.executeScript({
                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'test', value: this.getDateString() + ' test' }) + ");"
            }).then(function (values) {
                _this.webTimestamp = _this.getDateString();
                return values;
            }).catch(function (error) {
                _this.errors.push(error);
                // this.toast(error);
                return null;
            });
        }
        else {
            // alert('no browser');
            return Promise.resolve(null);
        }
    };
    HomePage.prototype.browserActivateNativeAppMode = function () {
        var _this = this;
        this.debug && this.toast('browserActivateNativeAppMode');
        if (this.browser && !this.nativeAppModeActivated) {
            return this.browser.executeScript({
                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicActivateAppModeFunc && window.my.activateAppMode.publicActivateAppModeFunc();"
            }).then(function (values) {
                _this.toast("native app mode activated");
                _this.nativeAppModeActivated = true;
            }).catch(function (error) {
                _this.errors.push(error);
                // this.toast(error);
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    HomePage.prototype.browserLogoutOfNativeApp = function () {
        var _this = this;
        if (this.browser && this.nativeAppModeActivated) {
            return this.browser.executeScript({
                code: "localStorage.getItem('logoutOfNativeApp')"
            }).then(function (values) {
                if (values && values.length && values[0]) {
                    return _this.browser.executeScript({ code: "localStorage.setItem('logoutOfNativeApp', '');" }).then(function () {
                        _this.users = [];
                        return _this.setDeviceUserPairing().then(function (result) {
                            // handle firebaseSignOut here
                        }).then(function () {
                            return _this.firebaseSignOut().then(function (result) {
                                // handle firebaseSignOut here
                            });
                        }).then(function () {
                            return _this.browser.executeScript({
                                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'nativeAuthOut', value: _this.getDateString() + ' native signed out at' }) + ");"
                            });
                        });
                        ;
                    });
                }
            }).catch(function (error) {
                _this.errors.push(error);
                // this.toast(error);
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    HomePage.prototype.browserGetFirebaseIdToken = function () {
        var _this = this;
        function b64DecodeUnicode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
        if (this.browser && this.nativeAppModeActivated) {
            return this.browser.executeScript({
                code: "localStorage.getItem('firebase_id_token_output')"
            }).then(function (values) {
                var firebase_id_token = values && values.length && values[0];
                if (firebase_id_token) {
                    if (_this.loggingIn) {
                        return _this.logUserOutOfBrowser();
                    }
                    else {
                        // Parse the ID token.
                        var payload = JSON.parse(b64DecodeUnicode(firebase_id_token.split('.')[1]));
                        // this.toast(payload);
                        if (_this.fbUser && _this.fbUser.email && _this.fbUser.email === payload.email) {
                            // The current user is the same user that just logged in, so no need to reauth
                            _this.toast("user was already logged in native");
                        }
                        else {
                            _this.loggingIn = true;
                            var exchangeIDTokenForCustTokenSubscription = _this.exchangeIDTokenForCustToken(firebase_id_token).subscribe(function (data) {
                                _this.ngZone.run(function () {
                                    _this.signInWithCustomToken(data);
                                });
                            }, function (error) {
                                _this.ngZone.run(function () {
                                    _this.toast("Error occurred when attempting to exchange firebase ID token for custom auth token.");
                                    exchangeIDTokenForCustTokenSubscription.unsubscribe();
                                    _this.loggingIn = false;
                                });
                            }, function () {
                                _this.ngZone.run(function () {
                                    // console.log("Token exchange completed.");
                                    exchangeIDTokenForCustTokenSubscription.unsubscribe();
                                    _this.loggingIn = false;
                                });
                            });
                        }
                        return _this.browser.executeScript({ code: "localStorage.setItem('firebase_id_token_output', '');" }).then(function () {
                            return _this.browser.executeScript({
                                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'nativeAuthIn', value: _this.getDateString() + ' native signed in at' }) + ");"
                            });
                        });
                    }
                }
            }).catch(function (error) {
                _this.errors.push(error);
                // this.toast(error);
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    HomePage.prototype.browserSetNav = function () {
        var _this = this;
        this.toast('browserSetNav');
        if (this.browser && this.webNav) {
            return this.browser.executeScript({
                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicWebNavFunc && window.my.activateAppMode.publicWebNavFunc(" + JSON.stringify(this.webNav) + ");"
            }).then(function (values) {
                _this.toast("native app mode activated");
                _this.webNav = null;
            }).catch(function (error) {
                _this.errors.push(error);
                // this.toast(error);
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    HomePage.prototype.logUserOutOfBrowser = function () {
        var _this = this;
        if (this.browser) {
            return this.browser.executeScript({
                code: "localStorage.setItem('shouldLogout', 'moo');"
            }).then(function () {
                return _this.browser.executeScript({
                    code: 'window.my && window.my.activateAppMode && window.my.activateAppMode.publicShouldLogoutFunc && window.my.activateAppMode.publicShouldLogoutFunc();'
                });
            }).catch(function (error) {
                _this.errors.push(error);
                // this.toast(error);
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    HomePage.prototype.exchangeIDTokenForCustToken = function (iDToken) {
        var url = "https://us-central1-ourg-2c585.cloudfunctions.net/g41-app/exchangeIDTokenForCustToken";
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + iDToken);
        return this.http.get(url, { headers: headers }).map(function (res) { return res.text(); });
    };
    HomePage.prototype.signInWithCustomToken = function (token) {
        var _this = this;
        return firebase.auth().signInWithCustomToken(token).then(function (user) {
            // console.log("User with user id: " + user.uid + " created/logged in.");
        }).catch(function (error) {
            // Handle Errors here.
            var errorMessage;
            if (error.code) {
                if (error.code === 'auth/custom-token-mismatch') {
                    errorMessage = "Token is for a different App";
                }
                else if (error.code === 'auth/invalid-custom-token') {
                    errorMessage = "Token format is incorrect";
                }
            }
            errorMessage = errorMessage || error.message || error;
            // console.log(errorMessage);
            _this.loggingIn = false;
            _this.toast(errorMessage);
            _this.errors.push(error);
            return _this.logUserOutOfBrowser();
        });
    };
    HomePage.prototype.firebaseSignOut = function () {
        var _this = this;
        return firebase.auth().signOut().then(function () {
            // this.fbUser = null;
        }, function (error) {
            // console.log(error);
            // this.toast(error);
            _this.errors.push(error);
        });
    };
    HomePage.prototype.setupPush = function () {
        var _this = this;
        this.toast("setupPush");
        // source: https://www.youtube.com/watch?v=sUjQ3G17T80
        // to check if we have permission
        this.push.hasPermission().then(function (res) {
            if (res.isEnabled) {
                _this.toast('We have permission to send push notifications');
            }
            else {
                _this.toast('We do not have permission to send push notifications');
            }
        });
        // to initialize push notifications
        // const options: PushOptions = {
        var options = {
            android: {
                //senderID: XXXX
                //icon: ?
                //iconColor: ?
                vibrate: 'true',
                //clearBadge: 'true',
                //clearNotifications: 'true',
                //forceShow: 'true',
                //messageKey: '',
                //titleKey: '',
                alert: 'true',
                badge: true,
                sound: 'true'
            },
            ios: {
                alert: 'true',
                // badge: true,
                sound: 'true'
                //clearBadge: 'true'
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };
        var pushObject = this.push.init(options);
        // this.toast(JSON.stringify(pushObject));
        pushObject.on('notification').subscribe(function (notification) {
            _this.ngZone.run(function () {
                _this.toast('Received a notification' + JSON.stringify(notification));
                // foreground
                if (notification.additionalData.foreground) {
                }
                else {
                }
                //collapse_key  string  (optional)
                //coldstart  boolean  (optional)
                //from  string  (optional)
                //notId
            });
        });
        pushObject.on('registration').subscribe(function (registration) {
            _this.ngZone.run(function () {
                _this.toast('Device registered' + JSON.stringify(registration));
                // TODO: Save deviceID to user's account
                _this.device = registration;
                _this.setDeviceUserPairing();
            });
        });
        pushObject.on('error').subscribe(function (error) {
            _this.ngZone.run(function () {
                _this.toast('Error with Push plugin' + JSON.stringify(error));
                // TODO: log error
                _this.errors.push(error);
            });
        });
    };
    HomePage.prototype.setDeviceUserPairing = function () {
        var _this = this;
        if (!this.usersInitalized || !this.device || !this.device.registrationId) {
            return Promise.resolve(null);
        }
        this.toast("pair device and user");
        var updates = {};
        var pushUserPath = 'Users';
        var pushDevicePath = 'Devices';
        return firebase.database().ref('PushNotifications/Devices/' + this.device.registrationId + '/Users').once('value').then(function (userSnapshots) {
            userSnapshots.forEach(function (userSnapshot) {
                var match = false;
                _this.toast(userSnapshot.key);
                if (_this.users) {
                    for (var i = 0; i < _this.users.length; i++) {
                        if (_this.users[i].key === userSnapshot.key) {
                            match = true;
                            break;
                        }
                    }
                }
                if (!match) {
                    // removeUserKeys.push(userSnapshot.key);
                    updates[pushUserPath + '/' + userSnapshot.key + '/Devices/' + _this.device.registrationId] = null;
                    updates[pushDevicePath + '/' + _this.device.registrationId + '/Users/' + userSnapshot.key] = null;
                }
            });
        }).then(function () {
            for (var i = 0; i < _this.users.length; i++) {
                var user = _this.users[i];
                var now = Date.now();
                updates[pushUserPath + '/' + user.key + '/Devices/' + _this.device.registrationId] = now;
                updates[pushDevicePath + '/' + _this.device.registrationId + '/Users/' + user.key] = now;
            }
            _this.toast(JSON.stringify(updates));
            _this.fbUpdates.push(updates);
            return firebase.database().ref('PushNotifications/').update(updates, function (error) {
                if (error) {
                    _this.toast(error);
                    _this.errors.push(error);
                }
                else {
                    _this.toast("updated pushNotifications in database");
                }
            });
        }).then(function () {
            return _this.browser.executeScript({
                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'setDeviceUserPairing', value: _this.getDateString() + ' device user pairing' }) + ");"
            });
        }).catch(function (error) {
            _this.errors.push(error);
            // this.toast(error);
            return null;
        });
    };
    HomePage.prototype.toast = function (message, position) {
        message = JSON.stringify(message);
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: position || 'top'
        });
        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });
        toast.present();
    };
    HomePage.prototype.getDateString = function (timestamp) {
        var u;
        if (timestamp) {
            u = new Date(timestamp);
        }
        else {
            u = new Date();
        }
        // source: https://stackoverflow.com/questions/19485353/function-to-convert-timestamp-to-human-date-in-javascript
        // ex: 2016-04-30 08:36:26.000
        return u.getUTCFullYear() +
            '-' + ('0' + u.getUTCMonth()).slice(-2) +
            '-' + ('0' + u.getUTCDate()).slice(-2) +
            ' ' + ('0' + u.getUTCHours()).slice(-2) +
            ':' + ('0' + u.getUTCMinutes()).slice(-2) +
            ':' + ('0' + u.getUTCSeconds()).slice(-2) +
            '.' + (u.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [Platform, NavController, InAppBrowser, ChangeDetectorRef,
            Http, NgZone, Push, ToastController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map
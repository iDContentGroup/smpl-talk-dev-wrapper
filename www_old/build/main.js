webpackJsonp([0],{

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 193;

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmplTalkPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

 //RequestOptions





// import { Push } from '@ionic-native/push';

var SmplTalkPage = (function () {
    function SmplTalkPage(platform, navCtrl, iab, ref, http, ngZone, push, toastCtrl, splashScreen) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.ref = ref;
        this.http = http;
        this.ngZone = ngZone;
        this.push = push;
        this.toastCtrl = toastCtrl;
        this.splashScreen = splashScreen;
        this.JSON = JSON;
        this.http = http;
        this.loadstopEvents = [];
    }
    SmplTalkPage.prototype.toggleDropdown = function () {
        if (this.showDropdown) {
            this.showDropdown = false;
        }
        else if (!this.showDropdown) {
            this.showDropdown = true;
        }
    };
    SmplTalkPage.prototype.ngOnInit = function () {
        var _this = this;
        this.showDropdown = false;
        this.errorTitle = 'Error -1200';
        this.errorDescription = "Please check your internet connection";
        this.devDetails = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu pulvinar lorem. Sed mi elit, bibendum vel ullamcorper in, bibendum eget sem.";
        this.doDebug = true;
        this.errors = [];
        this.fbUpdates = [];
        this.users = [];
        this.loginCount = 0;
        this.platform.ready().then(function () {
            if (_this.platform.is('cordova')) {
                _this.setupPush();
            }
            _this.unsubscribeOnAuthStateChanged = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().onAuthStateChanged(function (user) {
                _this.ngZone.run(function () {
                    if (user) {
                        _this.loginCount += 1;
                        _this.users = [];
                        _this.fbUser = user;
                        _this.doDebug && _this.toast('native logged in: ' + _this.fbUser.uid + " | " + _this.fbUser.email);
                        // firebase.database().ref("UsersRef/").orderByChild('email').equalTo(this.fbUser.email).once('value').then(usersRef => {
                        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database().ref("EmailsRef/" + _this.encodeKey(_this.fbUser.email)).once('value').then(function (emailsRef) {
                            _this.users = [];
                            if (emailsRef.exists() && emailsRef.val().Networks) {
                                for (var key in emailsRef.val().Networks) {
                                    if (emailsRef.val().Networks.hasOwnProperty(key)) {
                                        // do stuff
                                        _this.users.push({ key: emailsRef.val().Networks[key], networkKey: key });
                                    }
                                }
                            }
                            // usersRef.forEach(userRef => {
                            //   var user = userRef.val();
                            //   user.key = userRef.key;
                            //   this.users.push(user);
                            // })
                        }).then(function () {
                            _this.doDebug && _this.toast(_this.users);
                            _this.setDeviceUserPairing();
                        });
                        // TODO: do some stuff with push notifications
                    }
                    else {
                        _this.doDebug && _this.toast("native logged out");
                        _this.fbUser = null;
                        _this.users = [];
                    }
                    _this.startBrowser();
                });
            });
        });
    };
    SmplTalkPage.prototype.toggleDebug = function () {
        this.doDebug = !this.doDebug;
    };
    SmplTalkPage.prototype.startBrowser = function () {
        var _this = this;
        if (!this.browser) {
            this.browserUrl = 'https://smpltalk.com/#/';
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
                this.browser = this.browser || this.iab.create(this.browserUrl, target, this.options);
                // this.browser.on("loadstart").subscribe(event => {
                //   this.browser.executeScript({ code: "alert('loadstart');" });
                // });
                // this.browser.on("loadstop").subscribe(event => {
                //   this.browser.executeScript({ code: "alert('loadstop');" });
                // });
                this.browser.on("loaderror").subscribe(function (event) {
                    _this.ngZone.run(function () {
                        _this.doDebug = true;
                        _this.browser.hide();
                        // this.errors.push(event);
                        _this.errors.push({ key: 'browser loaderror event', error: event });
                    });
                });
                this.browser.on("exit").subscribe(function (event) {
                    _this.ngZone.run(function () {
                        // this.errors.push(event);
                        _this.errors.push({ key: 'browser exit event', error: event });
                        _this.browser = null;
                    });
                });
                this.browser.on("loadstart").subscribe(function (event) {
                    // this.ngZone.run(() => {
                    //   // this.browser.executeScript({ code: "localStorage.setItem('nativeAppMode', 'moo');" });
                    //   // this.browser.executeScript({code: 'window.my.activateAppMode.publicActivateAppModeFunc();'});
                    //   // this.clearBrowserLoop();
                    //   // this.loadstopEvents.push(event);
                    //   if (!this.browserLoopIsActive) {
                    //     this.browserLoopIsActive = true;
                    //     this.browserLoopFunction(100);
                    //   }
                    // });
                });
                this.browser.on("loadstop").subscribe(function (event) {
                    _this.doDebug && _this.toast("loadstop worked", "bottom");
                    _this.ngZone.run(function () {
                        // this.splashScreen.hide();
                        // this.browser.show();
                        if (!_this.browserLoopIsActive) {
                            _this.browserLoopIsActive = true;
                            _this.browserLoopFunction(100);
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
    SmplTalkPage.prototype.showBrowser = function () {
        this.browser && this.browser.show();
    };
    SmplTalkPage.prototype.browserLoopFunction = function (delay) {
        var _this = this;
        this.ngZone.run(function () {
            _this.doDebug && _this.toast('browserLoopFunction');
            _this.browserLoopCount = (_this.browserLoopCount || 0) + 1;
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
                if (delay) {
                    _this.browserLoopSetTimeout = setTimeout(function () {
                        _this.ngZone.run(function () {
                            _this.browserLoopFunction(delay);
                        });
                    }, delay);
                }
            }).catch(function (error) {
                _this.doDebug && _this.toast('Unexpected error during browser loop');
                // this.errors.push(error);
                _this.errors.push({ key: 'browser loop error', error: error });
                if (delay) {
                    _this.browserLoopSetTimeout = setTimeout(function () {
                        _this.ngZone.run(function () {
                            _this.browserLoopFunction(delay);
                        });
                    }, delay);
                }
            });
        });
    };
    SmplTalkPage.prototype.clearBrowserLoop = function () {
        if (this.browserLoopIsActive) {
            this.browserLoopIsActive = false;
            clearTimeout(this.browserLoopSetTimeout);
        }
    };
    SmplTalkPage.prototype.browserTest = function () {
        var _this = this;
        if (this.doDebug && this.browser) {
            return this.browser.executeScript({
                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'test', value: this.getDateString() + ' test' }) + ");"
            }).then(function (values) {
                _this.webTimestamp = _this.getDateString();
                return values;
            }).catch(function (error) {
                // this.errors.push(error);
                _this.errors.push({ key: 'browser test', error: error });
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    SmplTalkPage.prototype.browserActivateNativeAppMode = function () {
        var _this = this;
        this.doDebug && this.toast('browserActivateNativeAppMode');
        if (this.browser && !this.nativeAppModeActivated) {
            return this.browser.executeScript({
                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicActivateAppModeFunc && window.my.activateAppMode.publicActivateAppModeFunc();"
            }).then(function (values) {
                _this.doDebug && _this.toast("native app mode activated");
                _this.nativeAppModeActivated = true;
            }).catch(function (error) {
                // this.errors.push(error);
                _this.errors.push({ key: 'browser active native app mode', error: error });
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    SmplTalkPage.prototype.browserLogoutOfNativeApp = function () {
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
                            if (_this.doDebug) {
                                return _this.browser.executeScript({
                                    code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'nativeAuthOut', value: _this.getDateString() + ' native signed out at' }) + ");"
                                });
                            }
                            else {
                                return null;
                            }
                        });
                        ;
                    });
                }
            }).catch(function (error) {
                // this.errors.push(error);
                _this.errors.push({ key: 'browser log out', error: error });
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    SmplTalkPage.prototype.browserGetFirebaseIdToken = function () {
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
                        if (_this.fbUser && _this.fbUser.email && _this.fbUser.email === payload.email) {
                            // The current user is the same user that just logged in, so no need to reauth
                            _this.doDebug && _this.toast("user was already logged in native");
                        }
                        else {
                            _this.loggingIn = true;
                            // TODO: rewrite subscriptions to promises instead
                            var exchangeIDTokenForCustTokenSubscription = _this.exchangeIDTokenForCustToken(firebase_id_token).subscribe(function (data) {
                                _this.ngZone.run(function () {
                                    _this.signInWithCustomToken(data);
                                });
                            }, function (error) {
                                _this.ngZone.run(function () {
                                    _this.doDebug && _this.toast("Error occurred when attempting to exchange firebase ID token for custom auth token.");
                                    exchangeIDTokenForCustTokenSubscription.unsubscribe();
                                    _this.loggingIn = false;
                                });
                            }, function () {
                                _this.ngZone.run(function () {
                                    exchangeIDTokenForCustTokenSubscription.unsubscribe();
                                    _this.loggingIn = false;
                                });
                            });
                        }
                        return _this.browser.executeScript({ code: "localStorage.setItem('firebase_id_token_output', '');" }).then(function () {
                            if (_this.doDebug) {
                                return _this.browser.executeScript({
                                    code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'nativeAuthIn', value: _this.getDateString() + ' native signed in at' }) + ");"
                                });
                            }
                            else {
                                return null;
                            }
                        });
                    }
                }
            }).catch(function (error) {
                // this.errors.push(error);
                _this.errors.push({ key: 'get firebase id token', error: error });
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    SmplTalkPage.prototype.browserSetNav = function () {
        var _this = this;
        this.doDebug && this.toast('browserSetNav');
        if (this.browser && this.webNav) {
            return this.browser.executeScript({
                code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicWebNavFunc && window.my.activateAppMode.publicWebNavFunc(" + JSON.stringify(this.webNav) + ");"
            }).then(function (values) {
                if (_this.webNav.navTye === 'post') {
                    if (_this.webNav.postKey && _this.webNav.groupKey) {
                        _this.browserUrl = 'https://smpltalk.com/#/content/post/' + _this.webNav.groupkey + '/' + _this.webNav.postKey;
                    }
                    else {
                        _this.browserUrl = 'https://smpltalk.com/';
                    }
                }
                _this.doDebug && _this.toast("native app mode activated");
                _this.webNav = null;
            }).catch(function (error) {
                // this.errors.push(error);
                _this.errors.push({ key: 'browser set nav', error: error });
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    SmplTalkPage.prototype.logUserOutOfBrowser = function () {
        var _this = this;
        if (this.browser) {
            return this.browser.executeScript({
                code: "localStorage.setItem('shouldLogout', 'moo');"
            }).then(function () {
                if (_this.doDebug) {
                    return _this.browser.executeScript({
                        code: 'window.my && window.my.activateAppMode && window.my.activateAppMode.publicShouldLogoutFunc && window.my.activateAppMode.publicShouldLogoutFunc();'
                    });
                }
                else {
                    return null;
                }
            }).catch(function (error) {
                // this.errors.push(error);
                _this.errors.push({ key: 'log user out of browser', error: error });
                return null;
            });
        }
        else {
            return Promise.resolve(null);
        }
    };
    SmplTalkPage.prototype.exchangeIDTokenForCustToken = function (iDToken) {
        var url = "https://us-central1-ourg-2c585.cloudfunctions.net/g41-app/exchangeIDTokenForCustToken";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + iDToken);
        return this.http.get(url, { headers: headers }).map(function (res) { return res.text(); });
    };
    SmplTalkPage.prototype.signInWithCustomToken = function (token) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().signInWithCustomToken(token).then(function (user) {
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
            _this.doDebug && _this.toast(errorMessage);
            // this.errors.push(error);
            _this.errors.push({ key: 'use custom token', error: error });
            return _this.logUserOutOfBrowser();
        });
    };
    SmplTalkPage.prototype.firebaseSignOut = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().signOut().then(function () {
        }, function (error) {
            // this.errors.push(error);
            _this.errors.push({ key: 'firebase sign out', error: error });
        });
    };
    SmplTalkPage.prototype.setupPush = function () {
        var _this = this;
        this.doDebug && this.toast("setupPush");
        // source: https://www.youtube.com/watch?v=sUjQ3G17T80
        // to check if we have permission
        this.push.hasPermission().then(function (res) {
            if (res.isEnabled) {
                _this.doDebug && _this.toast('We have permission to send push notifications');
            }
            else {
                _this.doDebug && _this.toast('We do not have permission to send push notifications');
            }
        }).catch(function (error) {
            _this.errors.push({ key: 'setupPush', error: error });
        });
        // to initialize push notifications
        // const options: PushOptions = {
        var options = {
            android: {
                //senderID: XXXX
                icon: 'ic_android_generated',
                iconColor: '#1DAED9',
                vibrate: 'true',
                // clearBadge: 'true',
                //clearNotifications: 'true',
                //forceShow: 'true',
                //messageKey: '',
                //titleKey: '',
                alert: 'true',
                // badge: true,
                sound: 'true'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'true',
                clearBadge: true
            },
            windows: {},
            browser: {
                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
            }
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            _this.ngZone.run(function () {
                _this.doDebug && _this.toast('Received a notification' + JSON.stringify(notification));
                // foreground
                // TODO: handle notification
                if (notification.additionalData.foreground) {
                }
                else {
                    var navType = notification.additionalData.navType;
                    var postKey = notification.additionalData.postKey;
                    var groupKey = notification.additionalData.groupKey;
                    var networkKey = notification.additionalData.networkKey;
                    _this.webNav = { navType: navType, postKey: postKey, groupKey: groupKey, networkKey: networkKey };
                    _this.doDebug && _this.browser && _this.browser.executeScript({
                        code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'notification', value: notification }) + ");"
                    });
                }
                //collapse_key  string  (optional)
                //coldstart  boolean  (optional)
                //from  string  (optional)
                //notId
            });
        });
        pushObject.on('registration').subscribe(function (registration) {
            _this.ngZone.run(function () {
                _this.doDebug && _this.toast('Device registered' + JSON.stringify(registration));
                // TODO: Save deviceID to user's account
                _this.device = registration;
                _this.setDeviceUserPairing();
            });
        });
        pushObject.on('error').subscribe(function (error) {
            _this.ngZone.run(function () {
                _this.doDebug && _this.toast('Error with Push plugin' + JSON.stringify(error));
                // TODO: log error
                _this.errors.push({ key: 'push subscribe', error: error });
            });
        });
    };
    SmplTalkPage.prototype.setDeviceUserPairing = function () {
        var _this = this;
        if (!this.fbUser || !this.device || !this.device.registrationId) {
            return Promise.resolve(null);
        }
        this.doDebug && this.toast("pair device and user");
        var updates = {};
        var pushUserPath = 'Users';
        var pushDevicePath = 'Devices';
        return __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database().ref('PushNotifications/Devices/' + this.device.registrationId + '/Users').once('value').then(function (userSnapshots) {
            userSnapshots.forEach(function (userSnapshot) {
                var match = false;
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
            _this.doDebug && _this.toast(JSON.stringify(updates));
            _this.fbUpdates.push(updates);
            return __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database().ref('PushNotifications/').update(updates).then(function () {
                _this.doDebug && _this.toast("updated pushNotifications in database");
            }).catch(function (error) {
                _this.doDebug && _this.toast(error);
                _this.errors.push({ key: 'fb notifications update', error: error });
            }).then(function () {
                if (_this.doDebug) {
                    return _this.browser.executeScript({
                        code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({ key: 'setDeviceUserPairing', value: _this.getDateString() + ' device user pairing' }) + ");"
                    });
                }
                else {
                    return null;
                }
            });
        }).catch(function (error) {
            _this.doDebug && _this.toast(error);
            _this.errors.push({ key: 'push devices update', error: error });
            return null;
        });
    };
    SmplTalkPage.prototype.toast = function (message, position) {
        // TODO: add messages to an array?
        return;
        // message = JSON.stringify(message);
        // let toast = this.toastCtrl.create({
        //   message: message,
        //   duration: 3000,
        //   position: position || 'top'
        // });
        // // toast.onDidDismiss(() => {
        // //   console.log('Dismissed toast');
        // // });
        // toast.present();
    };
    SmplTalkPage.prototype.getDateString = function (timestamp) {
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
    // encodeKey(str: string) {
    //  return str.replace(/\_/g, '_U').replace(/\./g, '_P').replace(/\$/g, '_D').replace(/\[/g, '_O').replace(/\]/g, '_C').replace(/\#/g, '_H').replace(/\//g, '_S');
    // }
    // decodeKey(str: string) {
    //  return str.replace(/\_P/g, '.').replace(/\_D/g, '$').replace(/\_O/g, '[').replace(/\_C/g, ']').replace(/\_H/g, '#').replace(/\_S/g, '/').replace(/\_\U/g, '_');
    // }
    SmplTalkPage.prototype.encodeKey = function (str) {
        return str.replace(/\%/g, '%25').replace(/\./g, '%2E').replace(/\$/g, '%24').replace(/\[/g, '%5B').replace(/\]/g, '%5D').replace(/\#/g, '%23').replace(/\//g, '%2F');
    };
    SmplTalkPage.prototype.decodeKey = function (str) {
        return str.replace(/\%2E/g, '.').replace(/\%24/g, '$').replace(/\%5B/g, '[').replace(/\%5D/g, ']').replace(/\%23/g, '#').replace(/\%2F/g, '/').replace(/\%25/g, '%');
    };
    SmplTalkPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-smpl-talk',template:/*ion-inline-start:"C:\Users\Dell IDCG\Documents\github\smpl-talk-dev-wrapper\src\pages\smplTalk\smplTalk.html"*/'<div class="container">\n\n  <svg class="svg-icon block-icon">\n\n    <use xlink:href="#block"></use>\n\n  </svg>\n\n  <div class="logo">\n\n    <img src="https://firebasestorage.googleapis.com/v0/b/ourg-2c585.appspot.com/o/Networks%2FSMPL%2FOrgs%2FSMPL%20Headquarters%2Fcropped%2F-L83sRJBxYDYc-3YIQ_U%2F180118_smpl_talk_app_bannerlogo_black.png?alt=media&token=c11b7068-1dfc-4b08-a982-dd160420da3a">\n\n  </div>\n\n  <div class="error-content">\n\n    <p class="error-description">{{errorDescription}}</p>\n\n    <p class="error-type">{{errorTitle}}</p>\n\n    <div class="more-details">\n\n      <p class="error-options">Still having trouble?</p>\n\n      <ul>\n\n        <li><span>+</span> Clear your cache</li>\n\n        <li><span>+</span> Close and reopen the app</li>\n\n        <li><span>+</span> Click <a [href]="browserUrl || \'https://smpltalk.com/\'" target="_blank">here</a> to use the browser version</li>\n\n      </ul>\n\n    </div>\n\n  </div>\n\n  <div class="error-dropdown" (click)=\'toggleDropdown()\'>\n\n    <p>View Advanced Diagnostics</p>\n\n    <svg class="svg-icon normal large arrow">\n\n      <use xlink:href="#arrow_drop_up"></use>\n\n    </svg>\n\n  </div>\n\n  <div *ngIf="this.showDropdown" class="dev-details">\n\n    \n\n    <svg class="svg-icon large escape" (click)=\'toggleDropdown()\'>\n\n      <use xlink:href="#cancel"></use>\n\n    </svg>\n\n\n\n    <!-- Error listing -->\n\n    <div class="dev-details-container">\n\n      <!-- Debug mode -->\n\n      <ng-container *ngIf="doDebug">\n\n        <p>Test 53: Error/debug</p>\n\n        <p class="keep-white-space">Options: {{ options }}</p>\n\n\n\n        <button ion-button secondary (click)="showBrowser()">show browser</button>\n\n        <button ion-button secondary (click)="toggleDebug()">toggleDebug status: {{!doDebug ? \'On\' : \'Off\'}}</button>\n\n\n\n        <p class="keep-white-space" *ngIf="browser" [style.background]="\'grey\'">{{ JSON.stringify(browser) }}</p>\n\n        \n\n        <p class="keep-white-space">nativeAppModeActivated: {{nativeAppModeActivated ? \'yup\' : \'nope\'}}</p>\n\n\n\n        <p class="keep-white-space">browserLoopActive: {{ browserLoopIsActive ? \'yup\' : \'nope\' }} {{ browserLoopCount }} | web: {{ webTimestamp }} | native: {{ nativeTimestamp }}</p>\n\n        <p class="keep-white-space">{{ loggingIn ? \'logging in..\' : \'not logging in\'}} | {{ loginCount }}</p>\n\n        <p class="keep-white-space">fbUser: {{ fbUser ? (fbUser.email + \' | \' + fbUser.uid) : \'no fbUser found\' }}</p>\n\n        <p class="keep-white-space">users: {{ !users.length ? \' (none)\' : users.length}}</p>\n\n        <p class="keep-white-space" *ngFor="let user of users">{{ user.key }} | {{ user.email }}</p>\n\n        <p class="keep-white-space">device: {{ device ? JSON.stringify(device) : "(No device)" }}</p>\n\n\n\n        <p class="keep-white-space">fbUpdates: {{ !fbUpdates.length ? \' (none)\' : fbUpdates.length}}</p>\n\n        <p class="keep-white-space" *ngFor="let fbUpdate of fbUpdates">{{JSON.stringify(fbUpdate)}}</p>\n\n\n\n        <!-- <button ion-button (click)="browserTest()">browserTest</button> -->\n\n        <button ion-button (click)="browserLoopFunction()">Browser Loop 0ms</button>\n\n        <button ion-button (click)="browserLoopFunction(6000)">Browser Loop 6000ms</button>\n\n      </ng-container>\n\n\n\n      <p>errors: {{ !errors.length ? \' (none)\' : errors.length}}</p>\n\n      <p *ngFor="let error of errors">{{JSON.stringify(error)}}</p>\n\n  </div>\n\n  \n\n  <!-- <p class="keep-white-space">{{devDetails}}</p> -->\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"C:\Users\Dell IDCG\Documents\github\smpl-talk-dev-wrapper\src\pages\smplTalk\smplTalk.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], SmplTalkPage);
    return SmplTalkPage;
}());

//# sourceMappingURL=smplTalk.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(302);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_smplTalk_smplTalk__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_push__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_firebase__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









// import { Push, PushObject, PushOptions } from '@ionic-native/push';


// import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDF1rX-QzDFUTYDvOp7Q-ZJMlY58eRCAPs",
    authDomain: "ourg-2c585.firebaseapp.com",
    databaseURL: "https://ourg-2c585.firebaseio.com",
    projectId: "ourg-2c585",
    storageBucket: "ourg-2c585.appspot.com",
    messagingSenderId: "599715636396"
};
__WEBPACK_IMPORTED_MODULE_10_firebase___default.a.initializeApp(firebaseConfig);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_smplTalk_smplTalk__["a" /* SmplTalkPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_smplTalk_smplTalk__["a" /* SmplTalkPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_push__["a" /* Push */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_smplTalk_smplTalk__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_smplTalk_smplTalk__["a" /* SmplTalkPage */];
        this.initializeApp();
        this.pages = [
            { title: 'Smpl Talk', component: __WEBPACK_IMPORTED_MODULE_4__pages_smplTalk_smplTalk__["a" /* SmplTalkPage */] }
        ];
    }
    MyApp.prototype.ngOnInit = function () {
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Dell IDCG\Documents\github\smpl-talk-dev-wrapper\src\app\app.html"*/'<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Dell IDCG\Documents\github\smpl-talk-dev-wrapper\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[278]);
//# sourceMappingURL=main.js.map
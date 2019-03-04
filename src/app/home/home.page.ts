import { Component, ChangeDetectorRef, NgZone } from '@angular/core';

// import { Http, Response, Headers } from '@angular/http';//RequestOptions
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import 'rxjs/add/operator/map';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Push } from '@ionic-native/push/ngx';

import * as firebase from "firebase/app";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    options: string;

    loadstopEvents: any;

    JSON: any;
    browser: any;

    doDebug: boolean;//for debug

    browserLoopSetTimeout: any;
    browserLoopIsActive: boolean;

    browserLoopTimestamp: string;//for debug
    browserLoopDelay: number;

    loggingIn: boolean;
    loginCount: number;//for debug
    unsubscribeOnAuthStateChanged: any;

    users: any;
    fbUser: any;

    device: any;

    webNav: any;
    webNavSnapshot: any;
    notifications: any[];

    nativeAppModeActivated: boolean;

    errors: any[];

    fbUpdates: any[];

    browserLoopCount: number;

    showDropdown: boolean;
    arrowDirection: string;
    errorTitle: string;
    errorDescription: string;

    browserUrl: string;

    debugLog: any;
    debugLogNames: string[];

    currentLoopTime: number;
    maxLoopTime: number;
    backupLoopCount: number;
    backupBrowserLoopSetTimeout: any;

    browserLoopFunctionID: number;
    activeBrowserLoopCount: number;
    maxBrowserLoopCount: number;

    firebase_id_token: string;

    constructor(public platform: Platform, private iab: InAppBrowser, private ref: ChangeDetectorRef, 
        private http: HttpClient, private ngZone: NgZone, public push: Push) {
        this.JSON = JSON;
        this.http = http;

        this.loadstopEvents = [];
    }

    toggleDropdown(){
        this.showDropdown = !this.showDropdown;
    }

    clearDebug() {
        this.errors = [];
        this.debugLog = null;
        this.debugLogNames = null;

        this.currentLoopTime = 0;
        this.maxLoopTime = 0;
        this.backupLoopCount = 0;

        this.browserLoopFunctionID = 0;
        this.activeBrowserLoopCount = 0;
        this.maxBrowserLoopCount = 0;
    }

    ngOnInit() {
        this.currentLoopTime = 0;
        this.maxLoopTime = 0;
        this.backupLoopCount = 0;

        this.browserLoopFunctionID = 0;
        this.activeBrowserLoopCount = 0;
        this.maxBrowserLoopCount = 0;

        this.showDropdown = false;
        this.errorTitle = 'Unexpected error';
        this.errorDescription = "Please check your internet connection";

        this.doDebug = true;
        this.browserLoopDelay = 200;

        this.errors = [];
        this.fbUpdates = [];
        this.users = [];
        this.loginCount = 0;

        this.platform.ready().then(() => {
            // if (this.platform.is('cordova')) {
                this.setupPush();
            // }

            this.unsubscribeOnAuthStateChanged = firebase.auth().onAuthStateChanged(user => {
                this.ngZone.run(() => {
                    if (user) {
                        this.loginCount += 1;
                        this.users = [];

                        this.fbUser = user;

                        firebase.database().ref("EmailsRef/" + this.encodeKey(this.fbUser.email)).once('value').then(emailsRef => {
                            this.users = [];
                            if (emailsRef.exists() && emailsRef.val().Networks) {
                                for (var key in emailsRef.val().Networks) {
                                    if (emailsRef.val().Networks.hasOwnProperty(key)) {
                                        // do stuff
                                        this.users.push({key: emailsRef.val().Networks[key], networkKey: key});
                                    }
                                }
                            }
                        }).then(() => {
                            this.setDeviceUserPairing();
                        });
                    } else {
                        this.fbUser = null;
                        this.users = [];
                    }
                
                    this.startBrowser();
                });
            });
        });
    }

    toggleDebug() {
        this.doDebug = !this.doDebug;
    }

    startBrowser(hidden?: boolean) {
        if (!this.browser) {
            this.browserUrl = 'https://smpltalkdev.com/#/';

            this.options = '';

            var optionAry = [];

            optionAry.push("disallowoverscroll=yes");//(iOS) Turns on/off the UIWebViewBounce property.
            optionAry.push("keyboardDisplayRequiresUserAction=no");// (iOS) Should take care of ios not allowing focus on inputs
            optionAry.push("hidespinner=yes");// (iOS) Hide the loader (it shows up at the beginning when starting the app)
            optionAry.push("usewkwebview=yes");// (iOS) Should attempt to use wkwebview (the better of the two)

            if (hidden) {
                optionAry.push("hidden=yes");
            }

            if (this.doDebug) {
                optionAry.push("toolbar=yes");// Should be testing only
                optionAry.push("location=yes"); // Should be testing only
                optionAry.push("clearcache=yes");// Should be testing only
                optionAry.push("clearsessioncache=yes");// Should be testing only
                optionAry.push("cleardata=yes");// Should be testing only
            } else {
                optionAry.push("toolbar=no");// Don't show the browser navigation stuff
                optionAry.push("location=no"); // Don't show the url bar
            }

            for (var i = 0; i < optionAry.length; i++) {
                this.options += optionAry[i];

                if (i !== optionAry.length - 1) {
                    this.options += ",";
                }
            }

            if (this.platform.is('cordova')) {
                this.browser = this.browser || this.iab.create(this.browserUrl, '_blank', this.options);

                if (!this.browser) {
                    this.pushError({key: 'startBrowser', error: {message: "browser didn't initalize"}});
                }

                try {
                    // this.browser.on("loadstart").subscribe(event => {
                    //   this.browser.executeScript({ code: "alert('loadstart');" });
                    // });

                    // this.browser.on("loadstop").subscribe(event => {
                    //   this.browser.executeScript({ code: "alert('loadstop');" });
                    // });

                    this.browser.on("loaderror").subscribe(event => {
                        this.ngZone.run(() => {
                            this.browser.hide();
                            this.pushError({key: 'browser loaderror event', error: event});
                        });
                    });

                    // Note for iOS, this event sometimes never gets called
                    // Instead, it silently errors (browser loop will silently error too and never get fulfilled)
                    this.browser.on("exit").subscribe(event => {
                        this.ngZone.run(() => {
                            this.pushError({key: 'browser exit event', error: event});
                            this.closeBrowser();
                        });
                    });

                    this.browser.on("loadstop").subscribe(event => {
                        // Start browser loop when a web page has loaded successfully to avoid running into errors before a page has loaded
                        if (!this.browserLoopIsActive) {
                            this.startBrowserLoop(this.browserLoopDelay);
                        }
                    });
                }catch(error) {
                    if (!error || !error.message) {
                        this.pushError({key: 'startBrowser', error: error || {message: 'unknown browser on subscriptions error'}});
                    }
                    this.pushError({key: 'startBrowser', error: error});
                };
            }
        }
    }

    closeBrowser() {
        if (this.browser) {
            this.browser.close();
        }

        this.browser = null;
        // TODO: unsubscribe events
        // Clean up stuff
    }

    showBrowser() {
        this.browser && this.browser.show();
    }

    startBrowserLoop(delay?: number) {
        this.clearBrowserLoop();
        this.browserLoopIsActive = true;
        return this.browserLoopFunction(delay);
    }

    getBrowserLoopFunctionID() {
        this.browserLoopFunctionID += 1;
        return  this.browserLoopFunctionID;
    }

    setBackupBrowserLoop(loopID, delay?: number) {
        // Because of how inappbrowser errors silently, we don't have a good way to handle if this browserLoop ever stops unexpectedly
        // The work around is to reset the loop if enough time has past
        if (delay) {
            clearTimeout(this.backupBrowserLoopSetTimeout);
            this.backupBrowserLoopSetTimeout = setTimeout(() => {
                // Loop again if there's delay (set delay to 0 to make the loop work once, use something like 1 to not do this)
                if (loopID === this.browserLoopFunctionID) {
                    this.startBrowserLoop(delay);
                    this.backupLoopCount += 1;
                }
            }, 1300);
        }
    }

    // Note that if there's an error for inappbrowser, it can likely error silently and its methods that return promises will never get fulfilled or rejected
    // This leads to the loop never finishing and there's no way to detect it
    // Current workaround is to have a timer that starts another browser loop if a loop takes too long to cycle
    browserLoopFunction(delay?: number) {
        this.ngZone.run(() => {
            let loopID = this.getBrowserLoopFunctionID();

            let start = Date.now();

            this.browserLoopIsActive = true;

            this.activeBrowserLoopCount += 1;
            this.handleMaxBrowserLoopCount();

            // // Because of how inappbrowser errors silently, we don't have a good way to handle if this browserLoop ever stops unexpectedly
            // // The work around is to reset the loop if enough time has past
            // if (delay) {
            //     clearTimeout(this.backupBrowserLoopSetTimeout);
            //     this.backupBrowserLoopSetTimeout = setTimeout(() => {
            //         // Loop again if there's delay (set delay to 0 to make the loop work once, use something like 1 to not do this)
            //         if (loopID === this.browserLoopFunctionID) {
            //             this.startBrowserLoop(delay);
            //             this.backupLoopCount += 1;
            //         }
            //     }, 600);
            // }

            if (this.doDebug) {
                this.browserLoopCount = (this.browserLoopCount || 0) + 1;
                this.browserLoopTimestamp = this.getDateString();
            }

            var delayPromise = function(t, v) {
               return new Promise(function(resolve) { 
                   setTimeout(resolve.bind(null, v), t)
               });
            };

            // var delayTime = 100;//Math.floor((Math.random() * 601) + 1);
            var delayTime = 300 + Math.floor((Math.random() * 601) + 1);

            // Activate making web go into nativeAppMode
            return this.browserActivateNativeAppMode().then(() => {
                if (loopID !== this.browserLoopFunctionID) {
                    throw {message: 'browserLoopSetTimeout overrided (0)'};
                }

                this.test(start);
                start = Date.now();

                this.setBackupBrowserLoop(loopID, delay);

                // Handle if user has logged out of web app
                return delayPromise(delayTime, null).then(() => {return this.browserLogoutOfNativeApp();});
            }).then(() => {
                if (loopID !== this.browserLoopFunctionID) {
                    throw {message: 'browserLoopSetTimeout overrided (1)'};
                }

                this.test(start);
                start = Date.now();

                this.setBackupBrowserLoop(loopID, delay);
                
                // Handle if browser is passing idToken to native (user has logged in web)
                return delayPromise(delayTime, null).then(() => {return this.browserGetFirebaseIdToken();});
            }).then(() => {
                if (loopID !== this.browserLoopFunctionID) {
                    throw {message: 'browserLoopSetTimeout overrided (2)'};
                }

                this.test(start);
                start = Date.now();

                this.setBackupBrowserLoop(loopID, delay);
                
                // Handle setting web app navigation (to the feed, to a post, to a survey result, etc)
                return delayPromise(delayTime, null).then(() => {return this.browserSetNav();});
            }).then(() => {
                if (loopID !== this.browserLoopFunctionID) {
                    throw {message: 'browserLoopSetTimeout overrided (3)'};
                }

                this.test(start);
                start = Date.now();

                this.setBackupBrowserLoop(loopID, delay);

                // Handle if web is passing native an href (should open in system instead of native app)
                return delayPromise(delayTime, null).then(() => {return this.browserHandleHref();});
            }).then(() => {
                if (loopID !== this.browserLoopFunctionID) {
                    throw {message: 'browserLoopSetTimeout overrided (4)'};
                }

                this.test(start);
                start = Date.now();

                this.setBackupBrowserLoop(loopID, delay);
                
                // Test if communication between native -> web (send) and web -> native (recieve)
                return delayPromise(delayTime, null).then(() => {return this.browserTestCommunication();});
            }).catch(error => {
                // Log unexpected errors
                this.pushError({key: 'browserLoopFunction', error: error});
            }).then(() => {
                this.activeBrowserLoopCount -= 1;
                this.handleMaxBrowserLoopCount();

                this.test(start);

                // Loop again if there's delay (set delay to 0 to make the loop work once, use something like 1 to not do this)
                if (delay && loopID === this.browserLoopFunctionID) {
                    this.browserLoopSetTimeout = setTimeout(() => {
                        this.ngZone.run(() => {
                            this.startBrowserLoop(delay);
                        });
                    }, delay);
                }
            });
        });
    }

    test(start) {
        this.currentLoopTime = Date.now() - start;
        if (this.currentLoopTime > this.maxLoopTime) {
            this.maxLoopTime = this.currentLoopTime;
        }
    }

    handleMaxBrowserLoopCount() {
        if (this.activeBrowserLoopCount > this.maxBrowserLoopCount) {
            this.maxBrowserLoopCount = this.activeBrowserLoopCount;
        }
    }

    clearBrowserLoop() {
        if (this.browserLoopIsActive) {
            clearTimeout(this.browserLoopSetTimeout);
            clearTimeout(this.backupBrowserLoopSetTimeout);
            this.browserLoopIsActive = false;
        }
    }

    browserTestCommunication() {
        if (!this.browser || !this.doDebug) {
            this.storeDebugLog('browserTestCommunication', 'Exit early', 0);
            return Promise.resolve(null);
        }

        this.storeDebugLog('browserTestCommunication', 'Executed', 1);

        return this.browser.executeScript({
            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'test_send', value: this.getDateString() + ' send'}) + ");"
        }).then(values => {
            if (values && values.length && values[0]) {
                this.storeDebugLog('browserTestCommunication', 'SENT + RECIEVED', 2);

                return this.browser.executeScript({
                    code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'test_recieved', value: this.getDateString() + ' recieved' }) + ");"
                });
            } else {
                this.storeDebugLog('browserTestCommunication', 'SENT ONLY', 2);
            }

            return values;
        }).catch(error => {
            this.storeDebugLog('browserTestCommunication', 'Error', 2);
            this.pushError({key: 'browserTestCommunication', error: error});
        });
    }

    browserActivateNativeAppMode() {
        if (!this.browser || this.nativeAppModeActivated) {
            this.storeDebugLog('browserActivateNativeAppMode', 'Exit early', 0);

            return Promise.resolve(null);
        }

        this.storeDebugLog('browserActivateNativeAppMode', 'Executed', 1);

        return this.browser.executeScript({
            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicActivateAppModeFunc && window.my.activateAppMode.publicActivateAppModeFunc();"
        }).then(values => {
            if (values && values.length && values[0]) {
                this.nativeAppModeActivated = true;
                this.storeDebugLog('browserActivateNativeAppMode', 'GOOD', 2);
            } else {
                this.storeDebugLog('browserActivateNativeAppMode', 'BAD', 2);
            }

            return values;
        }).catch(error => {
            this.storeDebugLog('browserActivateNativeAppMode', 'Error', 2);
            this.pushError({key: 'browserActivateNativeAppMode', error: error});
        });
    }

    browserLogoutOfNativeApp() {
        if (!this.browser || !this.nativeAppModeActivated) {
            this.storeDebugLog('browserLogoutOfNativeApp', 'Exit early', 0);
            return Promise.resolve(null);
        }

        this.storeDebugLog('browserLogoutOfNativeApp', 'Executed', 1);

        // window.my && window.my.activateAppMode && window.my.activateAppMode.publicShouldLogoutOfNativeApp && window.my.activateAppMode.publicShouldLogoutOfNativeApp();

        return this.browser.executeScript({
            // code: "localStorage.getItem('logoutOfNativeApp')"
            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicShouldLogoutOfNativeApp && window.my.activateAppMode.publicShouldLogoutOfNativeApp();"
        }).then(values => {
            if (values && values.length && values[0]) {
                this.storeDebugLog('browserLogoutOfNativeApp', 'Should log out: YES', 2);

                // return this.browser.executeScript({ code: "localStorage.setItem('logoutOfNativeApp', '');" }).then(() => {
                this.users = [];

                return this.setDeviceUserPairing().then(() => {
                    return this.firebaseSignOut();
                }).then(() => {
                    if (this.doDebug) {
                        return this.browser.executeScript({
                            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'browserLogoutOfNativeApp', value: this.getDateString() + ' native signed out at' }) + ");"
                        });
                    }
                });
            } else {
                this.storeDebugLog('browserLogoutOfNativeApp', 'Should log out: NO', 1);
            }

            return values;
        }).catch(error => {
            this.storeDebugLog('browserLogoutOfNativeApp', 'Error', 2);
            this.pushError({key: 'browserLogoutOfNativeApp', error: error});
        });
    }

    browserGetFirebaseIdToken() {
        if (!this.browser || !this.nativeAppModeActivated) {
            this.storeDebugLog('browserGetFirebaseIdToken', 'Exit early', 0);
            return Promise.resolve(null);
        }

        this.storeDebugLog('browserGetFirebaseIdToken', 'Executed', 1);

        function b64DecodeUnicode(str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }

        // publicPopFirebaseIdTokenOutput
        // window.my && window.my.activateAppMode && window.my.activateAppMode.publicPopFirebaseIdTokenOutput && window.my.activateAppMode.publicPopFirebaseIdTokenOutput();

        return this.browser.executeScript({
            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicPopFirebaseIdTokenOutput && window.my.activateAppMode.publicPopFirebaseIdTokenOutput();"
            // code: "localStorage.getItem('firebase_id_token_output')"
        }).then(values => {
            this.firebase_id_token = values && values.length && values[0] || this.firebase_id_token;

            if (this.firebase_id_token) {
                if (this.loggingIn) {
                    this.storeDebugLog('browserGetFirebaseIdToken', 'IdToken: YES (already loggingIn)', 2);
                    // Exit early and wait until the next browser loop to handle the incoming firebaseIdToken

                    // // First log current user out and on the next browser loop, use the stored firebase_id_token (if it doesn't get overrided)
                    // return this.logUserOutOfBrowser();
                    this.pushError({key: 'browserGetFirebaseIdToken', error: {message: 'Overlapping logging in'}});
                } else {
                    // Parse the ID token.
                    const payload = JSON.parse(b64DecodeUnicode(this.firebase_id_token.split('.')[1]));

                    var promises = [];

                    if (this.fbUser && this.fbUser.email && this.fbUser.email === payload.email) {
                        // The current user is the same user that just logged in, so no need to reauth
                        this.storeDebugLog('browserGetFirebaseIdToken', 'IdToken: YES (same user, skip auth)', 2);
                    } else {
                        this.storeDebugLog('browserGetFirebaseIdToken', 'IdToken: YES (start auth)', 2);

                        this.loggingIn = true;

                        promises.push(this.exchangeIDTokenForCustToken(this.firebase_id_token).then(custToken => {
                            this.firebase_id_token = null;
                            return this.signInWithCustomToken(custToken).then(() => {
                                this.loggingIn = false;
                            });
                        }));
                    }

                    return Promise.all(promises).then(() => {
                        // return this.browser.executeScript({ code: "localStorage.setItem('firebase_id_token_output', '');" }).then(() => {
                            if (this.doDebug) {
                                return this.browser.executeScript({
                                    code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'nativeAuthIn', value: this.getDateString() + ' native signed in at'}) + ");"
                                });
                            }
                        // });
                    });
                }
            } else {
                this.storeDebugLog('browserGetFirebaseIdToken', 'IdToken: NO', 1);
            }
        }).catch(error => {
            this.storeDebugLog('browserGetFirebaseIdToken', 'Error', 2);
            this.pushError({key: 'browserGetFirebaseIdToken', error: error});
        });
    }

    browserSetNav() {
        if (!this.browser || !this.webNav) {
            this.storeDebugLog('browserSetNav', 'Exit early', 0);
            return Promise.resolve(null);
        }

        this.storeDebugLog('browserSetNav', 'Executed', 1);

        return this.browser.executeScript({
            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicWebNavFunc && window.my.activateAppMode.publicWebNavFunc(" + JSON.stringify(this.webNav) + ");"
        }).then(values => {
            if (values && values.length && values[0]) {
                this.storeDebugLog('browserSetNav', 'Can Web Nav: YES', 2);
            } else {
                this.storeDebugLog('browserSetNav', 'Can Web Nav: NO', 2);
                // TODO: throw error?
            }
        }).catch(error => {
            this.storeDebugLog('browserSetNav', 'Error', 2);
            this.pushError({key: 'browserSetNav', error: error});
        }).then(() => {
            this.webNav = null;
        });
    }

    browserHandleHref() {
        if (!this.browser) {
            this.storeDebugLog('browserHandleHref', 'Exit early', 0);
            return Promise.resolve(null);
        }

        this.storeDebugLog('browserHandleHref', 'Executed', 1);

        return this.browser.executeScript({
            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicHandleHref && window.my.activateAppMode.publicHandleHref();"
        }).then(values => {
            var href = values && values.length && values[0];
            if (href) {
                this.storeDebugLog('browserHandleHref', href, 2);
                this.iab.create(href, '_system', "location=yes");
            } else {
                this.storeDebugLog('browserHandleHref', 'No href', 1);
            }
        }).catch(error => {
            this.storeDebugLog('browserHandleHref', 'Error', 2);
            this.pushError({key: 'browserHandleHref', error: error});
        });
    }

    logUserOutOfBrowser() {
        if (!this.browser) {
            this.storeDebugLog('logUserOutOfBrowser', 'Exit early', 0);
            return Promise.resolve(null);
        }

        this.storeDebugLog('logUserOutOfBrowser', 'Executed', 1);

        return this.browser.executeScript({
            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicShouldLogoutFunc && window.my.activateAppMode.publicShouldLogoutFunc();"
        }).then(values => {
            if (values && values.length && values[0]) {
                this.storeDebugLog('logUserOutOfBrowser', 'Can log out: YES', 2);
            } else {
                this.storeDebugLog('logUserOutOfBrowser', 'Can log out: NO', 2);
                // TODO: throw error?
            }

            if (this.doDebug) {
                return this.browser.executeScript({
                    code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'logUserOutOfBrowser', value: this.getDateString() + ' native said log out'}) + ");"
                });
            }
        }).catch(error => {
            this.pushError({key: 'logUserOutOfBrowser', error: error});
        });
    }

    exchangeIDTokenForCustToken(iDToken: any) {
        if (!iDToken) {
            console.error("Unexpected missing iDToken");
            return Promise.resolve(null);
        }

        var url = "https://us-central1-ourg-2c585.cloudfunctions.net/g41-app/exchangeIDTokenForCustToken";
        var headers = new HttpHeaders();

        headers = headers.append('Authorization', 'Bearer ' + iDToken);

        return this.http.get(url, {headers: headers, responseType: 'text'}).toPromise().then(res => {
            var custToken = res as any;
            return custToken;
        }).catch(error => {
            console.error(error);
            throw error;
        });
    }

    signInWithCustomToken(token: any) {
        this.loggingIn = true;

        return firebase.auth().signInWithCustomToken(token).then(user => {
            // console.log("User with user id: " + user.uid + " created/logged in.");
        }).catch(error => {
            this.pushError({key: 'signInWithCustomToken', error: error});

            return this.logUserOutOfBrowser();
        }).then(() => {
            this.loggingIn = false;
        });
    }

    firebaseSignOut() {
        if (this.fbUser) {
            this.storeDebugLog('firebaseSignOut', 'fbUser: ' + this.fbUser.email, 2);
        } else {
            this.storeDebugLog('firebaseSignOut', 'fbUser: NONE', 1);
        }

        return firebase.auth().signOut().then(() => {
            // pass
        }).catch(error => {
            this.pushError({key: 'firebaseSignOut', error: error});
        });
    }

    generateWebNav(webNavType?: string) {
        if (!webNavType || (webNavType !== 'post' && webNavType !== 'surveyResult')) {
            this.webNav = {};
        } else if (webNavType === 'post') {
            this.webNav = {
                groupKey: 'groupKey',
                postKey: 'postKey'
            };
        } else if (webNavType === 'surveyResult') {
            this.webNav = {
                groupKey: 'groupKey',
                surveyKey: 'surveyKey',
                surveyResultKey: 'surveyResultKey'
            };
        }
    }

    setupPush() {
        this.storeDebugLog('setupPush', 'Executed', 2);

        // source: https://www.youtube.com/watch?v=sUjQ3G17T80

        // to check if we have permission
        this.push.hasPermission().then((res: any) => {
            if (res.isEnabled) {
                this.storeDebugLog('setupPush', 'Permission: YES', 2);
            } else {
                this.storeDebugLog('setupPush', 'Permission: NO', 2);
            }
        }).catch(error => {
            this.storeDebugLog('setupPush', 'Error (0)', 2);
            this.pushError({key: 'setupPush', error: error});
        });

        // to initialize push notifications
        // const options: PushOptions = {
        const options: any = {
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
      
        // const pushObject: PushObject = this.push.init(options);
        const pushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) => {
            this.ngZone.run(() => {     

                if (this.doDebug) {
                    this.notifications = this.notifications || [];
                    this.notifications.push(notification);
                }

                let webNav = null;//notification.additionalData;

                try {
                    // foreground
                    // TODO: handle foreground notification
                    if (notification.additionalData.foreground) {
                        this.storeDebugLog('setupPush', 'foreground', 1);
                    } else {
                        this.storeDebugLog('setupPush', 'webNav ' + notification.additionalData.navType, 2);

                        webNav = notification.additionalData;

                        if (this.doDebug) {
                            this.webNavSnapshot = webNav;
                        }

                        this.storeDebugLog('setupPush', 'background', 1);

                        if (webNav) {
                            // Update the browserUrl for the error page
                            // TODO: handle subdomains
                            if (webNav.navType === 'post') {
                                this.storeDebugLog('setupPush', 'webNav post ' + webNav.groupKey + ' ' + webNav.postKey, 2);

                                if (webNav.postKey && webNav.groupKey) {
                                    this.browserUrl = 'https://smpltalk.com/#/content/post/' + webNav.groupKey + '/' + webNav.postKey;
                                } else {
                                    this.browserUrl = 'https://smpltalk.com/';
                                }
                            } else if (webNav.navType === 'surveyResult') {
                                this.storeDebugLog('setupPush', 'webNav surveyResult ' + webNav.groupKey + ' ' + webNav.surveyKey + ' ' + webNav.surveyResultKey, 2);
                                
                                if (webNav.surveyResultKey && webNav.surveyKey && webNav.groupKey) {
                                    this.browserUrl = 'https://smpltalk.com/#/result/survey/' + webNav.groupKey + '/' + webNav.surveyKey + '/' + webNav.surveyResultKey;
                                } else {
                                    this.browserUrl = 'https://smpltalk.com/';
                                }
                            } else {
                                this.browserUrl = 'https://smpltalk.com/';
                            }
                        }
                    }

                    var promises = [];

                    if (this.doDebug && this.browser) {
                        promises.push(this.browser.executeScript({
                            code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'notification', value: notification}) + ");"
                        }));
                    }
                    
                    Promise.all(promises).then(() => {
                        if (!notification.additionalData.foreground) {
                            this.webNav = webNav;
                        }
                    });
                }catch(error) {
                    this.storeDebugLog('setupPush', 'Error', 2);
                    this.pushError({key: 'setupPush', error: {message: "Unexpected error on notification"}});
                    this.pushError({key: 'setupPush', error: error});
                }
            });
        });

        pushObject.on('registration').subscribe((registration: any) => {
            this.ngZone.run(() => {
                this.storeDebugLog('setupPush', 'registeration', 1);
                this.device = registration;
                this.setDeviceUserPairing();
            });
        });

        pushObject.on('error').subscribe(error => {
            this.ngZone.run(() => {
                this.storeDebugLog('setupPush', 'Error (1)', 2);
                this.pushError({key: 'push subscribe', error: error});
            });
        });
    }

    setDeviceUserPairing() {
        if (!this.fbUser || !this.device || !this.device.registrationId) {
            return Promise.resolve(null);
        }

        var updates = {};

        var pushUserPath = 'Users';
        var pushDevicePath = 'Devices';

        return firebase.database().ref('PushNotifications/Devices/' + this.device.registrationId + '/Users').once('value').then(userSnapshots => {
            userSnapshots.forEach(userSnapshot => {
                var match = false;

                if (this.users) {
                    for (var i = 0; i < this.users.length; i++) {
                        if (this.users[i].key === userSnapshot.key) {
                            match = true;
                            break;
                        }
                    }
                }

                if (!match) {
                    // removeUserKeys.push(userSnapshot.key);
                    updates[pushUserPath + '/' + userSnapshot.key + '/Devices/' + this.device.registrationId] = null;
                    updates[pushDevicePath + '/' + this.device.registrationId + '/Users/' + userSnapshot.key] = null;
                }
            });
        }).then(() => {
            for (var i = 0; i < this.users.length; i++) {
                var user = this.users[i];
                var now = Date.now();

                updates[pushUserPath + '/' + user.key + '/Devices/' + this.device.registrationId] = now;
                updates[pushDevicePath + '/' + this.device.registrationId + '/Users/' + user.key] = now;
            }

            if (this.doDebug) {
                this.fbUpdates.push(updates);
            }

            return firebase.database().ref('PushNotifications/').update(updates).then(() => {
                // pass
            }).catch(error => {
                this.pushError({key: 'fb notifications update', error: error});
            }).then(() => {
                if (this.doDebug) {
                    return this.browser.executeScript({
                        code: "window.my && window.my.activateAppMode && window.my.activateAppMode.publicDebugFunc && window.my.activateAppMode.publicDebugFunc(" + JSON.stringify({key: 'setDeviceUserPairing', value: this.getDateString() + ' device user pairing'}) + ");"
                    });
                }
            });
        }).catch(error => {
            this.pushError({key: 'setDeviceUserPairing', error: error});
        });
    }

    // Helper functions
    getDateString(timestamp?: number) {
        var u;

        if (timestamp) {
            u = new Date(timestamp);
        } else {
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
    }

    encodeKey(str: string) {
        return str.replace(/\%/g, '%25').replace(/\./g, '%2E').replace(/\$/g, '%24').replace(/\[/g, '%5B').replace(/\]/g, '%5D').replace(/\#/g, '%23').replace(/\//g, '%2F');
    }

    decodeKey(str: string) {
        return str.replace(/\%2E/g, '.').replace(/\%24/g, '$').replace(/\%5B/g, '[').replace(/\%5D/g, ']').replace(/\%23/g, '#').replace(/\%2F/g, '/').replace(/\%25/g, '%');
    }
    // End Helper functions

    pushError(error) {
        try {
            if (error === -1200 || (error && error.code === -1200) || (error && error.error && error.error.code === -1200)) {
                this.errorTitle = 'Error -1200';
            }

            console.error(error);

            this.errors.push(error);
        }catch(error) {
            console.error(error);

            this.errors.push({message: 'pushError errored trying to log error'});

            this.errors.push(error);
        }
    }

    storeDebugLog(key, message, importance) {
        try {
            if (!this.doDebug) {
                // skip anything logs if we are not in debug mode
                return;
            }

            if (!key) {
                this.pushError({key: 'storeDebugLog', error: {message: "Unexpected missing key"}});
                return;
            }

            var now = Date.now();

            if (!this.debugLog) {
                this.debugLog = {};

                // Set all expected keys
                var expectedBrowserLoopNames = [
                    'browserActivateNativeAppMode',
                    'browserLogoutOfNativeApp',
                    'browserGetFirebaseIdToken',
                    'browserSetNav',
                    'browserHandleHref',
                    'browserTestCommunication',

                    'setupPush'
                ];

                this.debugLogNames = this.debugLogNames || [];

                for (var i = 0; i < expectedBrowserLoopNames.length; i++) {
                    var expectedBrowserLoopName = expectedBrowserLoopNames[i];

                    this.debugLog[expectedBrowserLoopName] = null;
                    this.debugLogNames.push(expectedBrowserLoopName);
                }
            }

            if (!this.debugLog[key] && this.debugLogNames.indexOf(key) === -1) {
                this.debugLogNames = this.debugLogNames || [];
                this.debugLogNames.push(key);
            }

            this.debugLog[key] = this.debugLog[key] || {};

            for (var i = 0; i < importance + 1; i++) {
                this.debugLog[key][i] = {
                    message: message,
                    timestamp: now
                }
            }
        }catch(error) {
            this.pushError({key: 'storeDebugLog', error: error});
        }
    }
}

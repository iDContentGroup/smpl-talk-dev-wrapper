/**
 * sources:
 *	https://gist.github.com/joeljeske/68121fa6d643e0937f50458d0172e16e
 *	https://stackoverflow.com/questions/48006196/ionic-build-androids-error-copyfilesync-could-not-write-to-dest-file/49770295#49770295
 *
 *  Hooks to add in config.xml:
 *
 *  <hook src="scripts/patch-android-studio-check.js" type="before_plugin_install" />
 *  <hook src="scripts/patch-android-studio-check.js" type="before_plugin_add" />
 *  <hook src="scripts/patch-android-studio-check.js" type="before_build" />
 *  <hook src="scripts/patch-android-studio-check.js" type="before_run" />
 *  <hook src="scripts/patch-android-studio-check.js" type="before_plugin_rm" />
 *
 *
 * This hook overrides a function check at runtime. Currently, cordova-android 7+ incorrectly detects that we are using
 * an eclipse style project. This causes a lot of plugins to fail at install time due to paths actually being setup
 * for an Android Studio project. Some plugins choose to install things into 'platforms/android/libs' which makes
 * this original function assume it is an ecplise project.
 */
module.exports = function(context) {
  if (context.opts.cordova.platforms.indexOf('android') < 0) {
    return;
  }

  const path = context.requireCordovaModule('path');
  const androidStudioPath = path.join(context.opts.projectRoot, 'platforms/android/cordova/lib/AndroidStudio');
  const androidStudio = context.requireCordovaModule(androidStudioPath);
  androidStudio.isAndroidStudioProject = function() {  return true; };
};
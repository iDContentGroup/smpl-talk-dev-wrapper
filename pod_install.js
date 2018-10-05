const { exec } = require('child_process');

module.exports = function(context) {
    console.log("Running pod install");
    exec('cd ' + context.opts.projectRoot + '/platforms/ios && pod install');
    console.log("Done");
}
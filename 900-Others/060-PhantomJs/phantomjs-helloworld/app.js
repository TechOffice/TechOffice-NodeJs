const phantom = require('phantom');

(function() {
    const instance = phantom.create();

    instance.exit();
}());

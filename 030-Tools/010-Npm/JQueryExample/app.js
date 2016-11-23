var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
$("<h1>JQuery Example</h1>").appendTo("body");
console.log($("body").html());


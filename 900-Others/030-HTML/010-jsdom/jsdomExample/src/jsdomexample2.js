var jsdom = require("jsdom");

// jsdom.env(string, callback)
// callback takes two arguments: err, window
console.log("jsdom Example: URL and JQuery");
jsdom.env(
  "<h1>jsdom Example</h1>",
  ["http://code.jquery.com/jquery.js"],
  function(err, window){
    var $ = window.$;
    console.log($("body").html());
  }
);





var jsdom = require("jsdom");

// jsdom.env(string, callback)
// callback takes two arguments: err, window
console.log("jsdom Example: URL and JQuery");
jsdom.env(
  "https://iojs.org/dist/",
  ["http://code.jquery.com/jquery.js"],
  function(err, window){
    var $ = window.$;
    $("a").each(function(){
      console.log($(this).text());
    });
  }
);





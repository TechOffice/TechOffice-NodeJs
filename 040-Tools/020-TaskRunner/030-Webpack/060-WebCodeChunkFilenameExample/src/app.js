console.log("app.js: inline testing");

import("./test").then(function(Test){
    var test = new Test.default();
    test.doSomething();
 })
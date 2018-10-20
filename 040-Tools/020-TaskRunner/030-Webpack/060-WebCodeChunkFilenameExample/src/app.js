console.log("app.js: inline testing");

import(/* webpackChunkName: "test" */ "./test").then(function(Test){
    var test = new Test.default();
    test.doSomething();
 })


import('./test').then(function(modeule){
    var Test = modeule.default;
    var test = new Test();
    test.doSomething();
});

console.log("app.js: inline testing");


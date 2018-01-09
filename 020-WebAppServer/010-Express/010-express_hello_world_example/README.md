# ExpressJS Hello World Example

Steps to create Hello World Example

1. Init a Express Project
```
npm init
npm install express --save
```

2. Create an App.js Program
```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

```

3. Run the app
```
node app.js
```

4. visit the page http://localhost:3000
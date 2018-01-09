# Express Template Engine Example
Express support various Template Engine for view. 
* Pug
* Mustache
* EJS
Express uses Jade as default template engine.

The config would be found in app.js 
```
app.set('view engine', 'jade');
```

## Example of using Template Engine
1. Create a new Template in views/hello.jade
```
extends layout

block content
  h1= title
  p #{content}

```

2. Alter routes/index.js
```
/* GET home page. */
router.get('/', function(req, res, next) {
	var content = "This example show you how to use Template engine to render a web page.";
	res.render('hello', { title: 'Express Template Example', content: content });
});
```

3. Start App and visit web page, http://localhost:3000
```
npm start
```

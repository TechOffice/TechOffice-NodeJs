# Bower Example

## Bower 
Bower is a package manager for the web. 

```
bower init
```
it would create a bower.json. 

```
{
  "name": "BowerExample",
  "homepage": "http://localhost/",
  "description": "",
  "main": "",
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "jquery": "3.1.0"
  }
}
```

```
bower install
```
The dependency would download and install in the folder of bower_components.

```
<script src="bower_components/jquery/dist/jquery.min.js"></script>
```


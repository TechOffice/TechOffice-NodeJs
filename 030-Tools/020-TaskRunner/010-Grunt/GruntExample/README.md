# Grunt Example
It is a Javascript Task Runner for repetitive tasks such as
* minification
* compilation
* unit testing

## Grunt Uglify
###Grunt Command Line
It requires you to install command line utility in order to execute the specied task.

Use NPM to install Grunt Command line
```
npm install -g grunt-cli
```

It requires to specify the Grunt Modules in the package.json. Beside, this example use grunt to minify javascript files into a single js files. Therefore, grunt-contrib-uglify is also specified. 
```
  "devDependencies": {
    "grunt": "~0.4.5",,
    "grunt-contrib-uglify": "~0.5.0"
  }
```

The configuration of Grunt is in gruntFile.js.

gruntFile.js
```
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
```

Then, you can execute grunt to run the task.
```
grunt
```

##Example 
In this example, there are two javascript files, src1.js and src2.js. This example would be minify these two files into a single file.

Folder Organization
```
|---src
    |---src1.js
    |---src2.js
```
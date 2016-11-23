# Lite Server Example

## Lite Server
It is static server in NodeJs.

package.json
```
{
  "name": "lite-server-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "lite-server"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "lite-server": "*"
  }
}
```
It should specify the dev in scripts and lite-server in devDependencies.

Use npm to install required dependencies.
```
npn install
```

create the home page of this project. index.html
```
<html>
    <head></head>
    <body>
        <h1>Lite Server Example</h1>
    </body>
</html>
```

Then could execute the below command to start lite-server.
```
npm run dev
```
The lite-server would automatically use index.html as home page.

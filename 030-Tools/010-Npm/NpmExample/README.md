# NPM Example

## NPM
NPM is NodeJs Package Manager. It is used to manage different package in NodeJs environment or NodeJs Project. 
For global NodeJs environment, npm install command could be used to install specified package.
```
npn install <Package Name>
```

### package.json
For a NodeJs Project, the required NodeJs package coulde be defined individually. The configuration is specified in package.json file. 

```
{
  "name": "npm_example",
  "version": "1.0.0",
  "dependencies": {
  }
}
```

With the below command, NPM would help to solve the dependency as specified in package.json. The required dependencies would be saved in the folder node_modules.
```
npm install
```
Then, NodeJs Application would require the module using the method require.


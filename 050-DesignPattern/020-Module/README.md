## Module Pattern 

**Example**
```
var module = (function(){
	var name;
	var age;
	return {
		getName: function(){
			return name;
		},
		setName: function(lName){
			name = lName;
		},
		getAge: function(){
			return age;
		},
		setAge: function(lAge){
			age = lAge;
		}
	}
})();

module.setName("Testing");
console.log(module.getName());

```

**Advantage**
* True Encapsulation
* Private Data
* Improve Structure of Application



module.exports = (str) => {
	console.log("Loging in moduleExportModule1.js");
	return {
		doSomething: () => {
			console.log("	Executing moduleExportModule1.doSomething(): " + str);
		}
	};
}
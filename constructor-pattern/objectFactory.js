function objectFactory() {
	var obj = new Object(),
		Constructor = [].shift.call(arguments);
	obj.__proto__ = Constructor.prototype;
	var ret = Constructor.apply(obj, arguments);
	return typeof ret === "object" ? ret : obj;
}

// test

function Person(name, age, gender) {
	this.name = name;
	this.age = age;
	this.gender = gender;
}

var bjiang = objectFactory(Person, "bjiang", "26", "male");

console.log(bjiang);
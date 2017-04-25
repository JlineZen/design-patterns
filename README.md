# Javascript 设计模式

## 构造器模式(constructor)

在经典的面向对象编程中，Constructor是一种在内存已分配给该对象的情况下，用于初始化新创建对象的特殊方法。

在Object构造器为特定的值创建对象封装，或者没有传递值时，它将创建一个空对象并返回它。有四种方法可以将键值赋给一个对象。

* 1、“点”语法  
	
```javascript
	// 设置属性
	newObject.someKey = "Hello World";
	// 获取属性
	var key = newObject.someKey;
```

* 2、中括号语法

```javascript
	// 设置属性
	newObject['someKey'] = "Hello World";
	// 获取属性
	var key = newObject['someKey'];
```

* 3、Object.defineProperty

```javascript
	// 设置属性
	Object.defineProperty(newObject, 'someKey', {
		value: "for more control of the property's behavior",
		writable: true,
		enumerable: true,
		configurable: true
	});

	// 函数方法来重构
	var defineProp = function(obj, key, value) {
		config.value = value;
		Object.defineProperty(obj, key, config);
	};

	// 使用上述方式创建一个空的person对象
	var person = Object.create(null);

	var driver = Object.create(person); // drive继承person

	// 设置属性
	defineProp(person, "name", "zhangsan");
```

* 4、Object.defineProperties

```javascript
	Object.defineProperties(newObject, {
		"someKey": {
			value: "Hello World",
			writable: true
		},
		"anotherKey": {
			value: "Foo bar",
			writable: false
		}
	});
```

### 简单的构造器

正如前面所看到的，Javascript不支持类的概念，但它确实支持与对象一起用的特殊constructor函数。通过在构造器前面加一个new关键字，告诉Javascript像使用构造器一样来实例化一个新对象。  

在构造器内，关键字this指向新创建的对象，可能如下：

```javascript
	function Car(model, year, miles) {
		this.model = model;
		this.year = year;
		this.miles = miles;
		this.toString = function() {
			return this.model + "has done " + this.miles + " miles";
		};
	}

	// 用法
	var civic = new Car("Honda Civic", 2009, 20000);
	console.log(civic.toString());
```

上述是一个简单的构造器模式版本。但它存在一些问题。其中一个问题是，他使继承变得困难，另一个问题是，toString()这样的函数为每个使用Car构造器创建的对象而分别重新定义。这不是最理想的，因为这样的函数应该是所有Car类型实例之间共享。

### 带原型的Constructor（构造器）

Javascript中有一个名为prototype的属性。调用Javascript构造器创建一个对象后，新对象就会有具有构造器原型的所有属性。这样，我们就可以把共享的实例属性写在prototype上。

```javascript
	function Car(model, year, miles) {
		this.model = model;
		this.year = year;
		this.miles = miles;
	}

	Car.prototype.toString = function() {
		return this.model + "has done " + this.miles + " miles";
	};

	// 用法
	var civic = new Car("Honda Civic", 2009, 20000);
	console.log(civic.toString());
```
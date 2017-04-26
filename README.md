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

## 模块模式(Module)

Javscript是一种弱类型、动态语言，没有静态语言那么严格的语法规则。静态语言对变量的类型是非常严格的，在编译期间就要进行严格的变量类型检测。而Javascript是在运行期间对变量类型进行动态赋值的。并且Javascript也不支持静态语言的那些面向对象、多态及封装。但是在Javascript里面可以通过作用域及原型prototype来实现静态语言的特性。

模块模式其实就是一种封装。在模块模式中，我们希望对一些数据进行保护或者说对外不可见，但提供方法来对我们封装的私有数据进行一些操作，这就是模块模式。一般，我们通过闭包来实现。比如： 

```javascript
	
	var someModule = (function() {
			var _count = 0;  // 代表私有
			var _privateMethod = function() { //私有方法
					_count ++;
					console.log(_count);
				};

			return {
				publicMethod: function() {
					console.log("调用方法");
					_privateMethod();
				}
			};	 

		})();

	// 使用
	someModule.publicMethod(); // 1
	someModule._count;  // undefined

```

模块模式的优缺点：通过模块化的编程，将应用分成多个模块、灵活架构及焦点分离，从而实现高内聚、低耦合；模块间的组合及分解利于维护。当然这样会造成性能消耗、导致调用链会很长，模块间的通信及发送消息会很耗性能。
/**
 * @desc 构造模式创建一个弹窗组件
 */

function Dialog(options) {
	this.$$uuid = Date.now().toString(16);
	this.title = options.title;
	this.content = options.content;
	this.buttons = options.buttons;
	this.okFn = options.okFn;
	this.cancelFn = options.cancelFn;
}

Dialog.prototype.constructor = Dialog;

Dialog.prototype.eventBind = function() {
	var targetEle = document.getElementById(this.$$uuid),
		buttons = targetEle.getElementsByTagName('button'),
		_this = this;
	buttons[0].addEventListener('click', function() {
		_this.okFn.call(this);
		_this.close();
	}, false);
	buttons[1].addEventListener('click', function() {
		_this.cancelFn.call(this);
		_this.close();
	}, false)
};

Dialog.prototype.render = function() {
	var document = window.document,
		body = document.body,
		str = '',
		element = document.createElement('div');
	element.id = this.$$uuid;
	element.classList.add('dialog');
	str += '<h3 class="dialog-title">' + this.title + '</h3>';
	str += '<p class="dialog-content"> ' + this.content + ' </p>';
	str += '<div class="dialog-btns">'
	str += '   	<button class="btn">' + this.buttons.okBtn + '</button>';
	str += '   	<button class="btn">' + this.buttons.canelBtn + '</button>';
	str += '</div>'
	element.innerHTML = str;
	element.style.display = 'block';
	body.appendChild(element);
	this.eventBind();
};

Dialog.prototype.close = function() {
	var targetEle = document.getElementById(this.$$uuid);
	document.body.removeChild(targetEle);
};
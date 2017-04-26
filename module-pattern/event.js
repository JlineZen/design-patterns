/**
 * 模块模式 事件系统
 */
var Event = (function() {

		var _bindOnce = false;

		// 私有方法
		var addEvent = function(elem, type, fn) {
				if(window.addEventListener) {
					elem.addEventListener(type, fn, false);
				} else if (window.attachEvent) {
					elem.attachEvent("on" + type, fn);
				} else {
					elem["on" + type] = fn;
				}
			};

		var removeEvent = function(elem, type, fn) {
				if (window.removeEventListener) {
					elem.removeEventListener(type, fn, false);
				} else if (window.detachEvent) {
					elem.detachEvent("on" + type, fn);
				} else {
					elem["on" + type] = null;
				}
			};

		var once = function(elem, type, fn) {
				addEvent(elem, type, function() {
					if (!_bindOnce) {
						fn();
						_bindOnce = true;
					}
				});
			};
		return {
			on: addEvent,
			off: removeEvent,
			once: once
		}
	})();
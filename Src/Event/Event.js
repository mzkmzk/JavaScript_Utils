/**
 * 事件处理
 * 待优化: 1. 如何对浏览器检查只需要一次
 */
var Event = {
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarger: function(event) {
		return event.target || event.srcElement;
	},
	preventDefault: function(event){
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		}else {
			event.cancelBubble = true;
		}
	},
	getRelatedTarget: function(event) {
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement){
			return event.fromElement;
		}else {
			return null;
		}
	},
	getWheelDelta: function(event){
		if (event.whellDelta) {
			return (client.engine.opera && client.engine.opera < 9.5 ?
				-event.whellDelta : event.whellDelta);
		} else {
			return -event.detail * 40; //FireFox
		}
	},
	getCharCode: function(event) {
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},
}

export default Event

 
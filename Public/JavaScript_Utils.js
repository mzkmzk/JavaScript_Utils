/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Ajax = __webpack_require__(1);

	var _Brower = __webpack_require__(2);

	var _Cookie = __webpack_require__(3);

	var _Event = __webpack_require__(4);

	exports.default = JavaScript_Utils = {
		Ajax: _Ajax.Ajax,
		Brower: _Brower.Brower,
		Cookie: _Cookie.Cookie,
		Event: _Event.Event
		};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var Ajax = {
		useImg: function useImg(url, data, callback) {
			var img = new Image();
			img.onload = img.onerror = function () {
				callback && callback();
			};
			url += '?';
			var params = Object.keys(data);
			for (var i = params.length - 1; i >= 0; i--) {
				url += params[i];
			}
			img.src = url;
		}
	};

		module.exports = Ajax;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Brower = {
		hasPlugin: function hasPlugin(name) {
			var plugins = window.navigator.plugins;
			name = name.toLowerCase();
			for (var i = plugins.length - 1; i >= 0; i--) {
				if (plugins[i].name.toLowerCase().indexOf(name) > -1) {
					return true;
				}
			}
			return false;
		},
		hasIEPlugin: function hasIEPlugin(name) {
			try {
				new ActiveXObject(name);
				return true;
			} catch (ex) {
				return false;
			}
		},
		hasFlash: function hasFlash() {
			var result = Brower.hasPlugin('flash');
			if (!result) {
				result = Brower.hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
			}
			return result;
		},
		getBaseBrowerInfo: function getBaseBrowerInfo() {
			var params = {
				'user_agent': window.navigator.userAgent,
				'url': window.location.href,
				'referer': document.referrer
			};
			return params;
		}
		};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * IE8暂不支持 trim方法
	 */
	var Cookie = function () {
	    function Cookie() {
	        _classCallCheck(this, Cookie);

	        this.cookie = this._getCookie();
	    }

	    _createClass(Cookie, [{
	        key: '_getCookie',
	        value: function _getCookie() {
	            var cookie = {};
	            var all = document.cookie;
	            if (all === '') return cookie;
	            var list = all.split('; ');
	            for (var i = list.length - 1; i >= 0; i--) {
	                var pos = list[i].indexOf("=");
	                var key = list[i].substring(0, pos);
	                var value = list[i].substring(pos + 1);
	                cookie[key] = value;
	            }
	            return cookie;
	        }
	    }, {
	        key: 'setItem',
	        value: function setItem(key, value, maxAge, domain) {
	            this.cookie[key] = value;
	            var cookie = key + '=' + encodeURIComponent(value);
	            if (maxAge) cookie += '; max-age=' + maxAge;
	            if (domain) cookie += '; domain=' + domain;
	            document.cookie = cookie;
	        }
	    }, {
	        key: 'getItem',
	        value: function getItem(key) {
	            return this.cookie[key] || null;
	        }
	    }, {
	        key: 'removeItem',
	        value: function removeItem(key, domain) {
	            if (!key in this.cookie) return;
	            delete cookie[key];
	            var cookie = key + '=; max-age=0';
	            if (domain) cookie += '; domain=' + domain;
	            document.cookie = cookie;
	        }
	    }, {
	        key: 'clear',
	        value: function clear(domain) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(this.cookie)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    document.cookie = this.cookie[key] + "=; max-age=0";
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            this.cookie = {};
	        }
	    }]);

	    return Cookie;
	}();

		exports.default = Cookie;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * 事件处理
	 * 待优化: 1. 如何对浏览器检查只需要一次
	 */
	exports.default = Event = {
		getEvent: function getEvent(event) {
			return event ? event : window.event;
		},
		getTarger: function getTarger(event) {
			return event.target || event.srcElement;
		},
		preventDefault: function preventDefault(event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		addHandler: function addHandler(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent('on' + type, handler);
			} else {
				element['on' + type] = handler;
			}
		},
		removeHandler: function removeHandler(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent('on' + type, handler);
			} else {
				element['on' + type] = handler;
			}
		},
		stopPropagation: function stopPropagation(event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		},
		getRelatedTarget: function getRelatedTarget(event) {
			if (event.relatedTarget) {
				return event.relatedTarget;
			} else if (event.toElement) {
				return event.toElement;
			} else if (event.fromElement) {
				return event.fromElement;
			} else {
				return null;
			}
		},
		getWheelDelta: function getWheelDelta(event) {
			if (event.whellDelta) {
				return client.engine.opera && client.engine.opera < 9.5 ? -event.whellDelta : event.whellDelta;
			} else {
				return -event.detail * 40; //FireFox
			}
		},
		getCharCode: function getCharCode(event) {
			if (typeof event.charCode == "number") {
				return event.charCode;
			} else {
				return event.keyCode;
			}
		}
		};

/***/ }
/******/ ]);
//# sourceMappingURL=JavaScript_Utils.js.map
export default Brower = {
	hasPlugin: function(name) {
		var plugins = window.navigator.plugins;
		name = name.toLowerCase();
		for (var i = plugins.length - 1; i >= 0; i--) {
			if (plugins[i].name.toLowerCase().indexOf(name) > -1) {
				return true;
			}
		}
		return false;
	},
	hasIEPlugin: function(name) {
		try {
			new ActiveXObject(name);
			return true;
		} catch(ex) {
			return false;	
		}
	},
	hasFlash: function() {
		var result = Brower.hasPlugin('flash');
		if (!result) {
			result = Brower.hasIEPlugin('ShockwaveFlash.ShockwaveFlash');
		}
		return result;
	},
	getBaseBrowerInfo: function() {
		var params = {
			'user_agent': window.navigator.userAgent,
			'url': window.location.href,
			'referer': document.referrer,
		}
		return params;
	},
}
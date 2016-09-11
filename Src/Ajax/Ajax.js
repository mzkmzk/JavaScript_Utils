var Ajax = {
	useImg: function(url, data, callback) {
		var img = new Image();
		img.onload = img.onerror = function() {
			callback && callback();
		}
		url += '?';
		var params = Object.keys(data);
		for (var i = params.length - 1; i >= 0; i--) {
			url += params[i];
		}
		img.src = url;
	}
}

module.exports = Ajax;
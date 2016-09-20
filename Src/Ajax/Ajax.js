var Ajax = {
	JSONPcounter: 0,
	useImg: function(url, data, callback) {
		var img = new Image();
		img.onload = img.onerror = function() {
			callback && callback();
		}
		url += '?';
		var params = Object.keys(data);
		for (var i = params.length - 1; i >= 0; i--) {
			//当有多层对象,估计有问题
			if (i !== params.length - 1) url += '&';
			url += encodeURIComponent(params[i]) + "=" +  encodeURIComponent(data[params[i]]) ;
		}
		img.src = url;
	},
	submitForm: function(fromSelect) {
		//577 高级
		
	},
	createCORSRequest: function(method, url) {
		var xhr = new XMLHttpRequest();
		if ('withCredentials' in xhr) {
			xhr.open(method,url, true);
		} else if (typeof XDomainRequest != "undefiend") {
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			xhr = null;
		}
	},
	getJSON: function(url, data, callback) {
		var request = new XMLHttpRequest();
		request.open('GET',Ajax.urlAppendData(url,data));
		request.onreadystatechange = function(){
			if (request.readyState === 4  && callback) {
				callback(request);
			}
		};
		request.send(null);
	},
	getJSONP: function(url, data, callback) {
		var cbnum = "cb" + Ajax.JSONPcounter++;
		var cbname = 'getJSONP' + cbnum;
		url = Ajax.urlAppendData(url,data);
		url = Ajax.urlAppendData(url,{'callback': cbname});//这样添加回调方法应该会有问题,当原本的data就有callback这个key的时候
		var script = document.createElement('script');
		//这里回调时的执行函数作用域应该有问题
		Ajax.getJSONP[cbname] = function(response) {
			try {
				callback(response);
			}finally {
				delete Ajax.getJSONP[cbname];
				script.parentNode.removeChild(script);
			}
		};
		script.src = url;
		document.body.appendChild(script);
	},
	post: function(url, data, callback) {
		if (typeof FormData === "undefiend") throw new Error('FormData is not implemented');
		var request = new XMLHttpRequest();
		request.open('POST',url);
		request.onreadystatechange = function() {
			if(request.readyState === 4 && callback){
				callback(request);
			}
		}
		var formdata = new FormData();
		for (var name in data ) {
			if (!data.hasOwnProperty(name)) continue;
			var value = data[name];
			if (typeof value === 'function') continue;
			formdata.append(name, value);
		}
		//当传入FormData时, Content-TYpe会自动设置为multipart/form-data;
		request.send(formdata);
	},
	urlAppendData: function(url, data) {
		if (url.indexOf('?') === -1) {
			url += "?";
		}else {
			url += "&";
		}
		return url + Ajax.encodeFormData(data);
	},
	encodeFormData: function(data) {
		if (!data) return "";
		var pairs = [];
		for(var name in data) {
			if(!data.hasOwnProperty(name)) continue;
			if(typeof data[name] === 'function') continue;
			var value =data[name].toString();
			name = encodeURIComponent(name.replace("%20","+"));
			value = encodeURIComponent(value,replace("%20","+"));
			pairs.push(name + "=" + value);
		}
		return pairs.join('&');
	},
}

module.exports = Ajax;
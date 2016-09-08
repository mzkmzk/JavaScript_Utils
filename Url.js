/**
 * Created by maizhikun on 16/2/16.
 */
function urlArgs() {
	var args = {};
	var query = location.search.substring(1);
	var pairs = query.split('&');
	for (var i =  pairs.length - 1; i >= 0; i--) {
		var pos = pairs[i].indexOf('=');
		if ( pos === -1 ) continue;
		var name = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos,pairs[i].length);
		args[name] = value;
			
	}
	return args;
}
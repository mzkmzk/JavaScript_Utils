/**
 * IE8暂不支持 trim方法
 */
export default class Cookie {

    constructor() {
        this.cookie = this._getCookie();

    }

    _getCookie() {
        var cookie = {};
        var all = document.cookie;
        if (all === '') return cookie;
        var list = all.split('; ');
        for (var i = list.length - 1; i >= 0; i--) {
            var pos = list[i].indexOf("=");
            var key = list[i].substring(0,pos);
            var value = list[i].substring( pos + 1);
            cookie[key] = value;
        }
        return cookie;
    }

    setItem(key, value, maxAge, domain) {
        this.cookie[key] = value ;
        var cookie = `${key}=${encodeURIComponent(value)}`;
        if (maxAge) cookie += `; max-age=${maxAge}`;
        if (domain) cookie += `; domain=${domain}`;
        document.cookie = cookie;

    }

    getItem(key) {
        return this.cookie[key] || null;
    }

    removeItem(key, domain) {
        if (! key in this.cookie ) return ;
        delete cookie[key];
        var cookie = `${key}=; max-age=0`;
        if (domain) cookie += `; domain=${domain}`;
        document.cookie = cookie;
    }

    clear(domain) {
        for (let key of Object.keys(this.cookie)) {
            document.cookie = this.cookie[key] + "=; max-age=0";
        }
        this.cookie = {};
    }
}

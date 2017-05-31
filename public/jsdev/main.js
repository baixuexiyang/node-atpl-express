function require(p) {
    if ('fs' == p) return {};
    if ('path' == p) return {};
    var path = require.resolve(p),
        mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
        mod.exports = {};
        mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
}

require.modules = {};

require.resolve = function(path) {
    var orig = path,
        reg = path + '.js',
        index = path + '/index.js';
    return require.modules[reg] && reg || require.modules[index] && index || orig;
};

require.register = function(path, fn) {
    require.modules[path] = fn;
};

require.relative = function(parent) {
    return function(p) {
        if ('.' != p.substr(0, 1)) return require(p);

        var path = parent.split('/'),
            segs = p.split('/');
        path.pop();

        for (var i = 0; i < segs.length; i++) {
            var seg = segs[i];
            if ('..' == seg) path.pop();
            else if ('.' != seg) path.push(seg);
        }

        return require(path.join('/'));
    };
};

require.load = function(scripts, callback) {
    if(typeof(scripts) != "object") var scripts = [scripts];
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    var s = new Array(), last = scripts.length - 1,
    doload = function(i) {
        s[i] = document.createElement("script");
        s[i].setAttribute("type","text/javascript");
        s[i].onload = s[i].onreadystatechange = function() {
            if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
                if(i != last) {
                    doload(i + 1);
                } else {
                    if(typeof(callback) == "function") callback();
                }
            }
        }
        s[i].setAttribute("src",scripts[i]);
        HEAD.appendChild(s[i]);
    };
    doload(0);
};

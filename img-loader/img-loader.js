function t(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function t(t, a) {
        for (var i = 0; i < a.length; i++) {
            var e = a[i];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), 
            Object.defineProperty(t, e.key, e);
        }
    }
    return function(a, i, e) {
        return i && t(a.prototype, i), e && t(a, e), a;
    };
}(), i = function() {
    function i(a, e) {
        t(this, i), this.page = a, this.defaultCallback = e || function() {}, this.callbacks = {}, 
        this.imgInfo = {}, this.page.data.imgLoadList = [], this.page._imgOnLoad = this._imgOnLoad.bind(this), 
        this.page._imgOnLoadError = this._imgOnLoadError.bind(this);
    }
    return a(i, [ {
        key: "load",
        value: function(t, a) {
            if (t) {
                var i = this.page.data.imgLoadList, e = this.imgInfo[t];
                a && (this.callbacks[t] = a), e ? this._runCallback(null, {
                    src: t,
                    width: e.width,
                    height: e.height
                }) : -1 == i.indexOf(t) && (i.push(t), this.page.setData({
                    imgLoadList: i
                }));
            }
        }
    }, {
        key: "_imgOnLoad",
        value: function(t) {
            var a = t.currentTarget.dataset.src, i = t.detail.width, e = t.detail.height;
            this.imgInfo[a] = {
                width: i,
                height: e
            }, this._removeFromLoadList(a), this._runCallback(null, {
                src: a,
                width: i,
                height: e
            });
        }
    }, {
        key: "_imgOnLoadError",
        value: function(t) {
            var a = t.currentTarget.dataset.src;
            this._removeFromLoadList(a), this._runCallback("Loading failed", {
                src: a
            });
        }
    }, {
        key: "_removeFromLoadList",
        value: function(t) {
            var a = this.page.data.imgLoadList;
            a.splice(a.indexOf(t), 1), this.page.setData({
                imgLoadList: a
            });
        }
    }, {
        key: "_runCallback",
        value: function(t, a) {
            (this.callbacks[a.src] || this.defaultCallback)(t, a), delete this.callbacks[a.src];
        }
    } ]), i;
}();

module.exports = i;
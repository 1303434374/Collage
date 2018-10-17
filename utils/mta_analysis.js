function t(t) {
    wx.getNetworkType({
        success: function(n) {
            t(n.networkType);
        }
    });
}

function n() {
    var t = wx.getSystemInfoSync();
    return {
        adt: encodeURIComponent(t.model),
        scl: t.pixelRatio,
        scr: t.windowWidth + "x" + t.windowHeight,
        lg: t.language,
        fl: t.version,
        jv: encodeURIComponent(t.system),
        tz: encodeURIComponent(t.platform)
    };
}

function a() {
    try {
        return wx.getStorageSync(h.prefix + "auid");
    } catch (t) {}
}

function e() {
    try {
        var t = i();
        return wx.setStorageSync(h.prefix + "auid", t), t;
    } catch (t) {}
}

function r() {
    try {
        return wx.getStorageSync(h.prefix + "ssid");
    } catch (t) {}
}

function o() {
    try {
        var t = "s" + i();
        return wx.setStorageSync(h.prefix + "ssid", t), t;
    } catch (t) {}
}

function i(t) {
    return (t || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date() % 1e10;
}

function s() {
    try {
        var t = getCurrentPages(), n = "/";
        return 0 < t.length && (n = t.pop().__route__), n;
    } catch (t) {
        console.log("get current page path error:" + t);
    }
}

function u() {
    var t = {
        dm: "wechat.apps.xx",
        url: s(),
        pvi: "",
        si: "",
        ty: 0
    };
    return t.pvi = function() {
        var n = a();
        return n || (n = e(), t.ty = 1), n;
    }(), t.si = function() {
        var t = r();
        return t || (t = o()), t;
    }(), t;
}

function c() {
    var a = n();
    return t(function(t) {
        wx.setStorageSync(h.prefix + "ntdata", t);
    }), a.ct = wx.getStorageSync(h.prefix + "ntdata") || "4g", a;
}

function p() {
    return {
        r2: h.app_id,
        r4: "wx",
        ext: "v=" + h.version + (null !== l.Data.userInfo ? ";ui=" + JSON.stringify(l.Data.userInfo) : "")
    };
}

var h = {
    app_id: "",
    event_id: "",
    api_base: "https://pingtas.qq.com/pingd",
    prefix: "_mta_",
    version: "1.3.3",
    stat_share_app: !1,
    stat_pull_down_fresh: !1,
    stat_reach_bottom: !1
}, l = {
    App: {
        init: function(t) {
            "appID" in t && (h.app_id = t.appID), "eventID" in t && (h.event_id = t.eventID), 
            "statShareApp" in t && (h.stat_share_app = t.statShareApp), "statPullDownFresh" in t && (h.stat_pull_down_fresh = t.statPullDownFresh), 
            "statReachBottom" in t && (h.stat_reach_bottom = t.statReachBottom), o(), "lauchOpts" in t && (l.Data.lanchInfo = t.lauchOpts, 
            l.Data.lanchInfo.landing = 1);
        }
    },
    Page: {
        init: function() {
            var t = getCurrentPages()[getCurrentPages().length - 1];
            t.onShow && function() {
                var n = t.onShow;
                t.onShow = function() {
                    l.Page.stat(), n.call(this, arguments);
                };
            }(), h.stat_pull_down_fresh && t.onPullDownRefresh && function() {
                var n = t.onPullDownRefresh;
                t.onPullDownRefresh = function() {
                    l.Event.stat(h.prefix + "pulldownfresh", {
                        url: t.__route__
                    }), n.call(this, arguments);
                };
            }(), h.stat_reach_bottom && t.onReachBottom && function() {
                var n = t.onReachBottom;
                t.onReachBottom = function() {
                    l.Event.stat(h.prefix + "reachbottom", {
                        url: t.__route__
                    }), n.call(this, arguments);
                };
            }(), h.stat_share_app && t.onShareAppMessage && function() {
                var n = t.onShareAppMessage;
                t.onShareAppMessage = function() {
                    return l.Event.stat(h.prefix + "shareapp", {
                        url: t.__route__
                    }), n.call(this, arguments);
                };
            }();
        },
        stat: function() {
            if ("" != h.app_id) {
                var t = [], n = p(), a = [ u(), n, c() ];
                l.Data.lanchInfo && (a.push({
                    ht: l.Data.lanchInfo.scene,
                    rdm: "/",
                    rurl: l.Data.lanchInfo.path
                }), l.Data.lanchInfo.query && l.Data.lanchInfo.query._mta_ref_id && a.push({
                    rarg: l.Data.lanchInfo.query._mta_ref_id
                }), l.Data.lanchInfo.landing && (n.ext += ";lp=1", delete l.Data.lanchInfo.landing)), 
                a.push({
                    rand: +new Date()
                });
                for (var n = 0, e = a.length; n < e; n++) for (var r in a[n]) a[n].hasOwnProperty(r) && t.push(r + "=" + (void 0 === a[n][r] ? "" : a[n][r]));
                wx.request({
                    url: h.api_base + "?" + t.join("&").toLowerCase()
                });
            }
        }
    },
    Event: {
        stat: function(t, n) {
            if ("" != h.event_id) {
                var a = [], e = u(), r = p();
                e.dm = "wxapps.click", e.url = t, r.r2 = h.event_id;
                var o;
                o = void 0 === n ? {} : n;
                var i, s = [];
                for (i in o) o.hasOwnProperty(i) && s.push(i + "=" + o[i]);
                for (o = s.join(";"), r.r5 = o, o = 0, r = (e = [ e, r, c(), {
                    rand: +new Date()
                } ]).length; o < r; o++) for (var l in e[o]) e[o].hasOwnProperty(l) && a.push(l + "=" + (void 0 === e[o][l] ? "" : e[o][l]));
                wx.request({
                    url: h.api_base + "?" + a.join("&").toLowerCase()
                });
            }
        }
    },
    Data: {
        userInfo: null,
        lanchInfo: null
    }
};

module.exports = l;
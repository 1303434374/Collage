var t = "https://api2.nahuo.com/";

let u = 'https://pj.dede1.com/app/index.php'
let b = {
    i: '119',
    m: 'pintuan',
    c: 'entry',
    a: 'wxapp'
}

module.exports = {

    httppost: function(a, e, o, s) {
        var n = (t = "user" == a.substring(0, 4) ? "https://api2.nahuo.com/v4/" : "https://api2.nahuo.com/v3/") + a;
        wx.request({
            url: n,
            header: {
                "Content-Type": "application/json",
                Authorization: wx.getStorageSync("token")
            },
            data: e,
            method: s,
            success: function(t) {
                if (wx.canIUse("hideLoading") ? wx.hideLoading() : wx.hideToast(), t.data.Result) "function" == typeof o && o(t.data); else if ("401" == t.data.Code) wx.showToast({
                    title: t.data.Message,
                    icon: "success",
                    duration: 1e3
                }), wx.reLaunch({
                    url: "/pages/login/login"
                }); else {
                    if (500 != t.statusCode) return "answer_not_match" == t.data.Code || "not_enouth_stock" == t.data.Code || "password_error" == t.data.Code || "登录过于频繁，请稍后再试" == t.data.Message || "user_no_exist" == t.data.Code || "unknow_error" == t.data.Code || "10001" == t.data.Code ? (wx.hideToast(), 
                    // wx.showModal({
                    //     title: "提示",
                    //     content: t.data.Message,
                    //     showCancel: !1
                    // }), 
                    !1) : (wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            wx.switchTab({
                                url: "/pages/nahuomain/main"
                            });
                        }
                    }), !1);
                    wx.showToast({
                        title: "获取数据失败",
                        icon: "none"
                    });
                }
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络超时请重试",
                    icon: "none",
                    mask: !0
                });
            },
            complete: function(t) {}
        });
    },

    httppostmore: function(a, e, o, s) {
        var n = (t = "user" == a.substring(0, 4) ? "https://api2.nahuo.com/v4/" : "https://api2.nahuo.com/v3/") + a;
        wx.request({
            url: n,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: wx.getStorageSync("token")
            },
            data: e,
            method: s,
            success: function(t) {
                if (wx.canIUse("hideLoading") ? wx.hideLoading() : wx.hideToast(), t.data.Result) "function" == typeof o && o(t.data); else if ("401" == t.data.Code) wx.showToast({
                    title: t.data.Message,
                    icon: "success",
                    duration: 1e3
                }), wx.reLaunch({
                    url: "/pages/login/login"
                }); else {
                    if (500 != t.statusCode) return "answer_not_match" == t.data.Code || "not_enouth_stock" == t.data.Code || "password_error" == t.data.Code || "登录过于频繁，请稍后再试" == t.data.Message || "user_no_exist" == t.data.Code || "unknow_error" == t.data.Code || "10001" == t.data.Code ? (wx.hideToast(), 
                    // wx.showModal({
                    //     title: "提示",
                    //     content: t.data.Message,
                    //     showCancel: !1
                    // }), 
                    !1) : (wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1,
                        success: function(t) {
                            wx.switchTab({
                                url: "/pages/nahuomain/main"
                            });
                        }
                    }), !1);
                    wx.showToast({
                        title: "获取数据失败",
                        icon: "none"
                    });
                }
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络超时请重试",
                    icon: "none",
                    mask: !0
                });
            },
            complete: function(t) {}
        });
    },

    http_post: function(a, e, o) {
        wx.request({
            url: u,
            data: this.merge({do: a}, this.merge(b, e)),
            success: function(t) {
                wx.hideLoading()
                "function" == typeof o && o(t.data)
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },

    merge: function (target, source) {
        for (var obj in source) {
            target[obj] = source[obj]
        }
        return target
    }
};

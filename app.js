var we7 = !0
var e = require("utils/httputil.js");

require("utils/mta_analysis.js"), require("utils/ald-stat.js");

App(function(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}({
    onLaunch: function(t) {
        wx.showShareMenu || wx.getStorageSync("version") || wx.showModal({
            title: "提示",
            content: "当前微信版本过低，部分功能无法实现，请升级到最新微信版本后重试。",
            showCancel: !1,
            success: function(e) {
                wx.setStorageSync("version", !0);
            }
        }), wx.login({
            success: function(t) {
                e.httppost("user/user/GetTokenByThirdUserOpenID", {
                    typeID: 1,
                    regfrom: 4,
                    code: t.code
                }, function(t) {
                    t.Result && ("no_user" == t.Code ? (wx.setStorageSync("wxkey", t.Data.Key), wx.removeStorageSync("token")) : (wx.setStorageSync("token", "Bearer " + t.Data.Token), 
                    wx.setStorageSync("account", t.Data.UserName), wx.setStorageSync("userid", t.Data.UserID), 
                    wx.setStorageSync("wxkey", t.Data.unionId), wx.getStorageSync("loginflag") || e.httppost("buyertool/eccbuyer/assigneccbuyer", {}, function(e) {
                        wx.setStorageSync("loginflag", !0);
                    })), wx.setStorageSync("openid", t.Data.OpenID));
                }, "POST");
            }
        }), wx.getStorageSync("TopicID") || wx.setStorageSync("TopicID", 0);
    },
    onShow: function(e) {},
    globalData: {
        userInfo: null,
        flag1: !1,
        flag2: !1,
        flag3: !0,
        arrNav: [ "登录", "注册" ],
        curNav: 0,
        mobile: "",
        cont: 60,
        disabled: !0,
        status: 2,
        disabled2: !0,
        we7: we7
    },
    getUserInfo: function(e) {
        this.globalData.userInfo && "function" == typeof e && e(this.globalData.userInfo);
    },
    isLogin: function (event) {
        let uid = wx.getStorageSync("u_id")
        let oid = wx.getStorageSync("openid")
        if (uid && uid != '' && oid && oid != '') {
            return true
        } else {
            return false
        }
    },
    showToast: function(e) {
        wx.showToast({
            title: e,
            icon: "success",
            duration: 2e3
        });
    },
    setTitle: function(e) {
        wx.setNavigationBarTitle({
            title: e,
            success: function(e) {}
        });
    },
    showLoading: function(e) {
        wx.canIUse("hideLoading") ? wx.showLoading({
            title: e,
            mask: !0
        }) : wx.showToast({
            title: e,
            icon: "loading",
            duration: 6e4,
            mask: !0
        });
    },
    hideLoading: function() {
        wx.canIUse("hideLoading") ? wx.hideLoading() : wx.hideToast();
    }
}, "onShow", function(t) {
    t && 1044 == t.scene && t.query.id && (wx.getStorageSync("wxkey") ? wx.login({
        success: function(n) {
            wx.getShareInfo({
                shareTicket: t.shareTicket,
                success: function(o) {
                    var i = {
                        iv: o.iv,
                        encryptedData: o.encryptedData,
                        code: n.code,
                        unionid: wx.getStorageSync("wxkey"),
                        itemid: t.query.id
                    };
                    e.httppost("user/user/RegWXUserGroupV1", i, function(e) {
                        if (e.Result) {
                            var n = wx.getStorageSync("items") || [], o = {
                                itemid: t.query.id,
                                gopenid: e.Data.GopenId
                            };
                            -1 == n.indexOf(JSON.stringify(o)) && (n.push(JSON.stringify(o)), wx.setStorageSync("items", n));
                        }
                    }, "POST");
                }
            });
        }
    }) : wx.login({
        success: function(n) {
            e.httppost("user/user/GetTokenByThirdUserOpenID", {
                typeID: 1,
                regfrom: 4,
                code: n.code
            }, function(n) {
                wx.login({
                    success: function(o) {
                        wx.getShareInfo({
                            shareTicket: t.shareTicket,
                            success: function(i) {
                                var s = {
                                    iv: i.iv,
                                    encryptedData: i.encryptedData,
                                    code: o.code,
                                    unionid: n.Data.unionId || n.Data.Key,
                                    itemid: t.query.id
                                };
                                e.httppost("user/user/RegWXUserGroupV1", s, function(e) {
                                    if (e.Result) {
                                        var n = wx.getStorageSync("items") || [], o = {
                                            itemid: t.query.id,
                                            gopenid: e.Data.GopenId
                                        };
                                        -1 == n.indexOf(JSON.stringify(o)) && (n.push(JSON.stringify(o)), wx.setStorageSync("items", n));
                                    }
                                }, "POST");
                            }
                        });
                    }
                });
            }, "POST");
        }
    }));
}));
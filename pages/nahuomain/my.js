var t = require("../../utils/httputil.js"), o = getApp(), we7 = o.globalData.we7;

Page({
    data: {
        CarNum: 0
    },
    onLoad: function() {
        var a = this;
        if (we7) {
            o.isLogin() ? (o.showLoading("数据加载中"), t.http_post("UserInfo", {
                uid: wx.getStorageSync('u_id')
            }, (n) => {
                if (n) {
                    console.log('微擎个人信息=')
                    console.log(n)
                    a.setData({
                        nickName: n.username,
                        url: "/Image/my/shoplogo.jpg"
                    });
                }
            })) : wx.showModal({
                title: "提示",
                content: '请先登录',
                showCancel: !1,
                success: function(t) {
                    wx.reLaunch({
                        url: "/pages/login/login"
                    });
                }
            })
        } else {
            o.showLoading("页面加载中..."), t.httppost("user/user/getmyuserinfo", {}, function(n) {
                console.log('个人信息=')
                console.log(n)
                o.showLoading("页面加载中..."), t.httppost("pinhuobuyer/GetOrderStatuAmount2", {}, function(t) {
                    a.setData({
                        point: n.Data.Point,
                        PointName: n.Data.PointName,
                        nickName: n.Data.UserName,
                        url: "https://api2.nahuo.com/v3/shop/logo/uid/" + wx.getStorageSync("userid"),
                        Total: t.Data.AvailableCouponInfo.Total > 0 ? t.Data.AvailableCouponInfo.Total + "张可用" : "",
                        MaxID: t.Data.AvailableCouponInfo.MaxID,
                        newbool: t.Data.AvailableCouponInfo.MaxID > wx.getStorageSync("MaxID")
                    });
                });
            }, "GET");
        }
    },
    onShow: function() {
        !we7 && this.GetQty();
    },
    login_out: function() {
        wx.showModal({
            title: "提示",
            content: "确定要退出登录吗？",
            success: function(t) {
                if (we7) {
                    t.confirm && (wx.removeStorageSync("u_id"), wx.removeStorageSync("openid"), wx.reLaunch({
                        url: "/pages/login/login"
                    }));
                } else {
                    t.confirm && (wx.removeStorageSync("token"), wx.removeStorageSync("MaxID"), wx.reLaunch({
                        url: "/pages/login/login"
                    }));
                }
            }
        });
    },
    gotodownload: function() {
        wx.navigateTo({
            url: "/pages/my/download"
        });
    },
    withdraw: function() {
        wx.navigateTo({
            url: "/pages/withdraw/withdraw"
        });
    },
    liked: function() {
        wx.navigateTo({
            url: "/pages/liked/index"
        });
    },
    coupon: function() {
        wx.setStorageSync("MaxID", this.data.MaxID), wx.navigateTo({
            url: "/pages/coupon/coupon"
        });
    },
    sealed: function() {
        wx.navigateTo({
            url: "/pages/order/sealed"
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    GetQty: function(o) {
        wx.getStorageSync("token") && t.httppost("pinhuocart/GetMenuRedPoint", {}, function(t) {
            t.Result && (t.Data.CartItemQty > 0 && (t.Data.CartItemQty = t.Data.CartItemQty + "", 
            wx.setTabBarBadge({
                index: 2,
                text: t.Data.CartItemQty
            })), wx.getStorageSync("TopicID") == t.Data.TopicID || wx.showTabBarRedDot({
                index: 9
            }));
        }, "GET");
    },
    Alert: function() {
        wx.showModal({
            title: "提示",
            content: "请下载【天天拼货团】APP，专属客服一对一为您解决问题。",
            cancelText: "不了",
            confirmText: "立即下载",
            confirmColor: "#fc3f39",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/my/download"
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    launchAppError: function(t) {
        console.log(t.detail.errMsg);
    }
});
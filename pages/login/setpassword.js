var o = require("../../utils/httputil.js"), t = getApp(), we7 = t.globalData.we7;

Page({
    data: {},
    onLoad: function(o) {
        this.setData({
            code: o.code,
            mobile: o.mobile
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    submit: function(e) {
        if (e.detail.value.password1.length <= 5) return wx.showToast({
            title: "密码不小于6位",
            mask: !0
        }), !1;
        if (e.detail.value.password1 !== e.detail.value.password2) return wx.showToast({
            title: "两次密码不一样",
            mask: !0
        }), !1;
        if (we7) {
            o.http_post("RegorFind", {
                phone: this.data.mobile,
                psw: e.detail.value.password1
            }, (e) => {
                console.log('修改信息=')
                console.log(e)
                if (e.code) {
                    wx.redirectTo({
                        url: "/pages/login/findsuccess"
                    });
                }
            })
        } else {
            var s = {
                mobile: this.data.mobile,
                code: this.data.code,
                isEncode: !1,
                password: e.detail.value.password1
            };
            t.showLoading(""), o.httppost("user/user/resetPassword", s, function(o) {
                wx.redirectTo({
                    url: "/pages/login/findsuccess"
                });
            }, "POST");
        }
    }
});
var o = require("../../utils/httputil.js"), t = getApp();

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
            title: "密码必须大于或等于6位",
            mask: !0
        }), !1;
        if (e.detail.value.password1 !== e.detail.value.password2) return wx.showToast({
            title: "两次密码不一样，请重新设置",
            mask: !0
        }), !1;
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
});
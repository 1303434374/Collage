var e = require("../../utils/httputil.js"), t = getApp();

Page({
    data: {
        disabled: !0
    },
    onLoad: function(e) {
        var t = e.mobile.substring(0, 3) + "****" + e.mobile.substring(8, 11);
        this.setData({
            mobile2: t,
            mobile1: e.mobile,
            codetime: 59
        });
    },
    onReady: function() {
        var e = this, t = setInterval(function() {
            e.data.codetime = e.data.codetime - 1, e.data.codetime <= 0 ? (clearInterval(t), 
            e.setData({
                codetime: 60,
                disabled: !1
            })) : e.setData({
                disabled: !0,
                codetime: e.data.codetime
            });
        }, 1e3);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    sendtall: function() {
        var o = this;
        t.showLoading("发送成功");
        var a = {
            mobile: o.data.mobile1,
            useFor: "findLoginPassword",
            messageFrom: "天天拼货团",
            smstype: 2
        };
        e.httppostmore("user/user/GetMobileVerifyCode2", a, function(e) {
            e.Result ? wx.showToast({
                title: e.Message,
                mask: !0
            }) : wx.showModal({
                title: "",
                content: e.Message,
                showCancel: !1
            });
        }, "POST");
    },
    getcode: function() {
        var o = this;
        t.showLoading("正在发送验证码");
        var a = {
            mobile: o.data.mobile1,
            useFor: "findLoginPassword",
            messageFrom: "天天拼货团"
        };
        e.httppost("user/user/GetMobileVerifyCode2", a, function(e) {
            wx.showToast({
                title: e.Message,
                mask: !0
            }), o.setData({
                codetime: 59,
                disabled: !0
            }), o.onReady();
        }, "POST");
    },
    submit: function(e) {
        "" == e.detail.value.code ? wx.showToast({
            title: "请输入验证码"
        }) : wx.redirectTo({
            url: "/pages/login/setpassword?code=" + e.detail.value.code + "&mobile=" + this.data.mobile1
        });
    }
});
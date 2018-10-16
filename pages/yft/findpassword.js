var t = getApp(), e = require("../../utils/httputil.js");

Page({
    data: {
        cont: 59,
        disabled: !1,
        mobile: ""
    },
    onLoad: function(t) {
        this.setData({
            mobile: wx.getStorageSync("paymobile")
        });
    },
    onReady: function() {},
    onShow: function() {},
    mobile: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    getcode: function(o) {
        var a = this;
        if (!/^1\d{10}$/.test(this.data.mobile)) return wx.showToast({
            title: "请输入正确格式手机号",
            icon: "success"
        }), !1;
        t.showLoading("正在发送验证码");
        var i = {
            mobile: a.data.mobile,
            useFor: "findpassword",
            smstype: "1",
            username: "",
            messageFrom: "天天拼货团"
        };
        e.httppost("user/user/getMobileVerifyCode2", i, function(t) {
            a.setData({
                disabled: !0
            });
            var e = setInterval(function() {
                a.data.cont = a.data.cont - 1, a.data.cont <= 0 ? (clearInterval(e), a.setData({
                    cont: 59,
                    disabled: !1
                })) : a.setData({
                    disabled: !0,
                    cont: a.data.cont
                });
            }, 1e3);
        }, "POST");
    },
    next: function(t) {
        if (!/^1\d{10}$/.test(t.detail.value.mobile)) return wx.showToast({
            title: "请输入正确格式手机号",
            icon: "success"
        }), !1;
        "" == t.detail.value.code ? wx.showToast({
            title: "请输入收到的验证码",
            icon: "success"
        }) : wx.redirectTo({
            url: "/pages/yft/resetpassword?mobile=" + t.detail.value.mobile + "&code=" + t.detail.value.code
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
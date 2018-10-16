var t = getApp(), e = require("../../utils/httputil.js");

Page({
    data: {
        cont: 59,
        disabled: !1
    },
    onLoad: function(e) {
        t.setTitle("绑定手机");
    },
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
            useFor: "bind",
            messageFrom: "衣付通"
        };
        e.httppost("pay/Common/GetMobileValidateCode", i, function(t) {
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
    formBindsubmit: function(t) {
        if (!/^1\d{10}$/.test(t.detail.value.mobile)) return wx.showToast({
            title: "请输入正确格式手机号",
            icon: "success",
            mask: !0
        }), !1;
        if ("" == t.detail.value.code) return wx.showToast({
            title: "请输入验证码",
            icon: "success",
            mask: !0
        }), !1;
        var e = {
            mobile: t.detail.value.mobile,
            code: t.detail.value.code
        };
        wx.request({
            url: "https://api2.nahuo.com/v3/pay/Account/BindMPhone",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: wx.getStorageSync("token")
            },
            data: e,
            method: "POST",
            success: function(e) {
                e.data.Result ? wx.redirectTo({
                    url: "/pages/yft/setpassword?mobile=" + t.detail.value.mobile
                }) : wx.showToast({
                    title: e.data.Message,
                    icon: "success",
                    duration: 1e3
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "网络超时，请重试",
                    icon: "success",
                    mask: !0
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
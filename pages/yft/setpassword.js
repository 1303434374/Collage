var t = getApp();

require("../../utils/httputil.js");

Page({
    data: {
        mobile: ""
    },
    onLoad: function(o) {
        t.setTitle("设置支付密码"), this.data.mobile = o.mobile;
    },
    formBindsubmit: function(t) {
        if ("" == t.detail.value.code) return wx.showToast({
            title: "请输支付密码",
            icon: "success",
            mask: !0
        }), !1;
        var o = {
            mobile: this.data.mobile,
            pay_password: t.detail.value.code
        };
        wx.request({
            url: "https://api2.nahuo.com/v3/pay/Account/SetPassword",
            header: {
                "Content-Type": "application/json",
                Authorization: wx.getStorageSync("token")
            },
            data: o,
            method: "POST",
            success: function(t) {
                console.log(t), t.data.Result ? wx.redirectTo({
                    url: "/pages/yft/answer"
                }) : wx.showToast({
                    title: t.data.Message,
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
var e = require("../../utils/httputil.js"), o = getApp();

Page({
    data: {},
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    submit: function(t) {
        if (!/^1\d{10}$/.test(t.detail.value.mobile)) return wx.showToast({
            title: "请输入正确格式手机号"
        }), !1;
        o.showLoading("正在发送验证码");
        var n = {
            mobile: t.detail.value.mobile,
            useFor: "findLoginPassword",
            messageFrom: "天天拼货团"
        };
        e.httppostmore("user/user/GetMobileVerifyCode2", n, function(e) {
            e.Result ? (wx.showToast({
                title: e.Message,
                mask: !0
            }), wx.redirectTo({
                url: "/pages/login/getcode?mobile=" + t.detail.value.mobile
            })) : wx.showModal({
                title: "",
                content: e.Message,
                showCancel: !1
            });
        }, "POST");
    }
});
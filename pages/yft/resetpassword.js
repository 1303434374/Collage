var o = getApp();

Page({
    data: {
        mobile: "",
        code: ""
    },
    onLoad: function(o) {
        this.setData({
            mobile: o.mobile,
            code: o.code
        });
    },
    onReady: function() {},
    resetpassword: function(t) {
        var e = {
            password: t.detail.value.code,
            code: this.data.code,
            mobile: this.data.mobile
        };
        wx.request({
            url: "https://api2.nahuo.com/v3/pay/account/ReSetPassword",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: wx.getStorageSync("token")
            },
            data: e,
            success: function(t) {
                o.showToast(t.data.Message), t.data.Result && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
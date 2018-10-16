var t = require("../../utils/httputil.js");

Page({
    data: {},
    onLoad: function(a) {
        var n = this;
        t.httppost("pay/Account/GetBalance4PinHuo", {}, function(t) {
            n.setData({
                balance: t.Data.balance
            });
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});
Page({
    data: {},
    onLoad: function(n) {
        n.money && this.setData({
            money: n.money,
            payway: n.payway
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});
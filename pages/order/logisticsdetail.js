Page({
    data: {},
    onLoad: function(n) {
        this.setData({
            detail: JSON.parse(n.detail)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
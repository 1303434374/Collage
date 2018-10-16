Page({
    data: {
        detail: []
    },
    onLoad: function(o) {
        this.data.detail = JSON.parse(o.item), this.data.detail.map(function(o) {
            o.colorArr = [], o.colorList = [], o.Products.map(function(t) {
                t.msg = t.Size + "/" + t.Qty + "件", o.colorArr.push(t.Color);
            }), o.colorArr = Array.from(new Set(o.colorArr)), o.colorArr.map(function(t) {
                var n = {
                    color: t,
                    SizeList: []
                };
                o.Products.map(function(o) {
                    o.Color == t && n.SizeList.push(o.msg);
                }), n.msg = n.SizeList.join("，"), o.colorList.push(n);
            });
        }), this.setData({
            detail: this.data.detail
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
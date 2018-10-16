var t = require("../../utils/httputil.js"), n = require("../../utils/imgutil.js"), i = getApp();

Page({
    data: {
        list: []
    },
    onLoad: function(t) {
        this.data.id = t.id, this.init();
    },
    init: function() {
        var a = this;
        i.showLoading("正在获取物流信息"), t.httppost("pinhuobuyer/GetPackageInfov2", {
            shipid: a.data.id
        }, function(t) {
            t.Result && (t.Data.Orders.map(function(t) {
                t.Cover = n.getUrl(t.Cover, 400);
            }), a.setData({
                ExpressInfoList: t.Data.ExpressInfoList,
                Info: t.Data.Info,
                Orders: t.Data.Orders
            }));
        }, "POST");
    },
    copy: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.code,
            success: function(t) {
                wx.showModal({
                    title: "",
                    content: "已复制内容到剪切板",
                    showCancel: !1
                });
            }
        });
    },
    detail: function(t) {
        wx.navigateTo({
            url: "/pages/order/logisticsdetail?detail=" + JSON.stringify(t.currentTarget.dataset.detail)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
var t = require("../../utils/httputil.js"), a = getApp(), e = require("../../utils/imgutil.js");

Page({
    data: {
        statuID: -1,
        keyword: "",
        pageIndex: 1,
        pageSize: 20,
        list: [],
        flag: !0
    },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    height: t.windowHeight - 42
                });
            }
        }), a.showLoading(""), e.init();
    },
    init: function() {
        var a = this, i = {
            statuID: a.data.statuID,
            keyword: a.data.keyword,
            pageIndex: a.data.pageIndex,
            pageSize: a.data.pageSize
        };
        t.httppost("pinhuobuyer/GetCSOrderList", i, function(t) {
            t.Result && (t.Data.OrderList.map(function(t) {
                t.Cover = e.getUrl(t.Cover, 200);
            }), 20 == t.Data.OrderList.length ? (a.data.pageIndex++, a.data.flag = !0) : a.data.flag = !1, 
            a.setData({
                list: t.Data.OrderList
            }));
        }, "GET");
    },
    checkmeu: function(t) {
        if (t.currentTarget.dataset.status == this.data.statuID) return !1;
        this.setData({
            statuID: t.currentTarget.dataset.status,
            pageIndex: 1,
            list: [],
            flag: !0
        }), a.showLoading("数据加载中"), this.init();
    },
    detail: function() {
        wx.showModal({
            title: "",
            content: "查看售后单详情，请下载天天拼货团APP，到APP上查看详情",
            showCancel: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.flag && this.init();
    }
});
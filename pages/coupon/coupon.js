var t = require("../../utils/httputil.js"), a = getApp();

Page({
    data: {
        list: [],
        height: "",
        statuid: 0,
        pageIndex: 1,
        flag: !1,
        pageSize: 20
    },
    onLoad: function(t) {
        a.showLoading("数据加载中");
        var i = this;
        wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    height: t.windowHeight
                });
            }
        }), this.init();
    },
    init: function() {
        var a = this;
        t.httppost("pinhuobuyer/GetCouponList", {
            statuid: a.data.statuid,
            pageIndex: a.data.pageIndex,
            pageSize: a.data.pageSize
        }, function(t) {
            t.Data.length >= a.data.pageSize ? a.data.flag = !0 : a.data.flag = !1, t.Data.length > 0 && t.Data.map(function(t) {
                t.ToTime = t.ToTime.substring(5, 10), t.FromTime = t.FromTime.substring(5, 10);
            }), a.setData({
                list: a.data.list.concat(t.Data),
                flag: a.data.flag
            });
        }, "GET");
    },
    checkmeu: function(t) {
        if (t.currentTarget.dataset.status == this.data.statuid) return !1;
        this.setData({
            statuid: t.currentTarget.dataset.status,
            pageIndex: 1,
            list: []
        }), a.showLoading("数据加载中"), this.init();
    },
    loadMore: function() {
        this.data.flag && (a.showLoading("数据加载中"), this.data.pageIndex++, this.setData({
            pageIndex: this.data.pageIndex
        }), this.init());
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});
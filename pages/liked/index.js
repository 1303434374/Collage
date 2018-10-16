var t = require("../../utils/imgutil.js"), a = require("../../utils/httputil.js"), e = require("../../utils/messageutil.js"), s = getApp();

Page({
    data: {
        status: 1,
        statusList: [ {
            name: "收藏",
            status: 1
        }, {
            name: "足迹",
            status: 2
        } ],
        list: [],
        hasmore: !0,
        pageindex: 1
    },
    onLoad: function(t) {
        this.init();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.init();
    },
    onShareAppMessage: function() {},
    checkmeu: function(t) {
        if (this.data.status == t.currentTarget.dataset.status) return !1;
        this.data.hasmore = !0, this.data.pageindex = 1, this.data.status = t.currentTarget.dataset.status, 
        this.data.list = [], this.init();
    },
    init: function() {
        var i = this;
        i.data.hasmore ? (s.showLoading("数据加载中"), 1 == i.data.status ? a.httppost("pinhuobuyer/item/GetFavoriteItem", {
            pageindex: i.data.pageindex,
            pagesize: 20
        }, function(a) {
            a.Result && (a.Data.map(function(a) {
                a.itemcover = t.getUrl(a.Cover, 300), a.tips = e.showtips(a.DealCount, a.ChengTuanCount);
            }), a.Data.length > 19 ? (i.data.hasmore = !0, i.data.pageindex++) : i.data.hasmore = !1, 
            i.setData({
                list: i.data.list.concat(a.Data),
                status: i.data.status
            }));
        }, "GET") : 2 == i.data.status && a.httppost("pinhuoitem/item/GetItemVisitList", {
            pageindex: i.data.pageindex,
            pagesize: 20
        }, function(a) {
            console.log(a), a.Result && (a.Data.Items.map(function(a) {
                a.itemcover = t.getUrl(a.Cover, 300), a.tips = e.showtips(a.DealCount, a.ChengTuanCount);
            }), a.Data.Items.length > 19 ? (i.data.hasmore = !0, i.data.pageindex++) : i.data.hasmore = !1, 
            i.setData({
                list: i.data.list.concat(a.Data.Items),
                status: i.data.status
            }));
        }, "GET")) : wx.showToast({
            title: "没有更多数据了",
            duration: 1500
        });
    },
    imagenavigator: function(t) {
        wx.navigateTo({
            url: "../pinhuo/itemdetail?id=" + t.currentTarget.dataset.testid
        });
    },
    cannelliked: function(t) {
        var e = this;
        s.showLoading(""), a.httppost("shop/agent/RemoveItemFromMyFavorite", {
            id: t.currentTarget.dataset.id
        }, function(a) {
            a.Result && (e.data.list.splice(t.currentTarget.dataset.index, 1), e.setData({
                list: e.data.list
            }));
        }, "GET");
    }
});
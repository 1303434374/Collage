var t = require("../../utils/httputil.js"), i = getApp();

Page({
    data: {
        List: [],
        width: 0,
        IsMember: !1
    },
    onLoad: function(i) {
        var a = this;
        a.data.width = wx.getSystemInfoSync().windowWidth, a.GetQty(), a.init(), wx.getStorageSync("token") && t.httppost("xiaozu/group/60033", {}, function(t) {
            t.Result && (t.Data.IsMember ? a.data.IsMember = !0 : a.JoinTeam());
        }, "GET");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        i.showLoading(""), setTimeout(function() {
            t.init();
        }, 1e3);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    GetQty: function(i) {
        wx.getStorageSync("token") && t.httppost("pinhuocart/GetMenuRedPoint", {}, function(t) {
            t.Result && (t.Data.CartItemQty > 0 && (t.Data.CartItemQty = t.Data.CartItemQty + "", 
            wx.setTabBarBadge({
                index: 2,
                text: t.Data.CartItemQty
            })), wx.hideTabBarRedDot({
                index: 9
            }), wx.setStorageSync("TopicID", t.Data.TopicID));
        }, "GET");
    },
    init: function() {
        var a = this;
        i.showLoading(""), t.httppost("xiaozu/topic/list_v2/60033", {}, function(t) {
            t.Result && (a.setData({
                List: t.Data
            }), wx.stopPullDownRefresh());
        }, "GET");
    },
    imageLoad: function(t) {
        var i = t.currentTarget.dataset.idx;
        t.detail.width >= this.data.width ? (this.data.List[i].Auto = !0, this.data.List[i].width = this.data.width, 
        this.data.List[i].height = 210) : (this.data.List[i].Auto = !1, this.data.List[i].width = t.detail.width, 
        this.data.List[i].height = t.detail.height), this.setData({
            List: this.data.List
        });
    },
    GoDetail: function(t) {
        var i = t.currentTarget.dataset;
        wx.navigateTo({
            url: "/pages/xiaozu/Detail?type=" + i.type + "&id=" + i.id
        });
    },
    JoinTeam: function() {
        var i = this;
        t.httppostmore("xiaozu/group/join", {
            gid: 60033
        }, function(t) {
            t.Result && (i.data.IsMember = !0);
        }, "POST");
    }
});
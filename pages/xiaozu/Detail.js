var t = require("../../utils/httputil.js"), a = getApp(), e = require("../../wxParse/wxParse.js");

Page({
    data: {
        ID: 0,
        Title: "",
        UserID: 0,
        UserName: "",
        TimeTips: "",
        pageIndex: 1,
        pageSize: 20,
        talkList: [],
        ShowTalk: !1,
        postcontent: "",
        NickName: "",
        PostConten: {
            rootID: 0,
            pid: 0,
            content: ""
        },
        loadmore: !0,
        firstLoad: !0
    },
    onLoad: function(t) {
        1 == t.type ? wx.setNavigationBarTitle({
            title: "活动详情"
        }) : 0 == t.type && wx.setNavigationBarTitle({
            title: "帖子"
        }), this.data.pageIndex = 1, this.data.ID = t.id, this.data.type = t.type, this.init(t.type, t.id), 
        this.GetTalk();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        a.showLoading(""), setTimeout(function() {
            t.data.loadmore = !0, t.data.firstLoad = !0, t.data.talkList.length = 0, t.init(t.data.type, t.data.ID), 
            t.GetTalk();
        }, 1e3);
    },
    onReachBottom: function() {
        this.GetTalk();
    },
    onShareAppMessage: function() {},
    init: function(a, o) {
        var n = this;
        0 == a ? t.httppost("xiaozu/topic/" + o, {}, function(t) {
            t.Data && (n.setData({
                Title: t.Data.Title,
                UserID: t.Data.UserID,
                UserName: t.Data.UserName,
                TimeTips: t.Data.TimeTips
            }), e.wxParse("Content", "html", t.Data.Content, n), wx.stopPullDownRefresh());
        }, "GET") : 1 == a && t.httppost("xiaozu/activity/" + o, {}, function(t) {
            t.Data && (n.setData({
                Title: t.Data.Title,
                UserID: t.Data.UserID,
                UserName: t.Data.UserName,
                TimeTips: t.Data.TimeTips
            }), e.wxParse("Content", "html", t.Data.Content, n), wx.stopPullDownRefresh());
        }, "GET");
    },
    GetTalk: function() {
        var a = this, e = "";
        0 == a.data.type ? e = "xiaozu/topic/posts/list/" : 1 == a.data.type && (e = "xiaozu/activity/posts/list/"), 
        a.data.loadmore ? t.httppost(e + a.data.ID + "/" + a.data.pageIndex, {}, function(t) {
            t.Data.map(function(t) {
                t.Content = t.Content.replace(/<[^>]+>/g, ""), t.Childs.map(function(t) {
                    t.Content = t.Content.replace(/<[^>]+>/g, "");
                });
            }), t.Data.length >= 20 ? (a.data.pageIndex++, a.data.loadmore = !0) : a.data.loadmore = !1, 
            a.setData({
                talkList: a.data.talkList.concat(t.Data)
            });
        }, "GET") : a.data.firstLoad && (wx.showToast({
            title: "没有更多数据"
        }), a.data.firstLoad = !1);
    },
    Confire2: function() {
        "" == this.data.PostConten.content ? this.CanCle() : (a.showLoading("提交中"), this.PostContent(this.data.PostConten.rootID, this.data.PostConten.pid, this.data.PostConten.content));
    },
    Confire: function(t) {
        "" == t.detail.value ? this.CanCle() : (a.showLoading("提交中"), this.PostContent(this.data.PostConten.rootID, this.data.PostConten.pid, t.detail.value));
    },
    CanCle: function() {
        this.setData({
            postcontent: "",
            ShowTalk: !1
        });
    },
    ReplyName: function(t) {
        this.setData({
            postcontent: "",
            ShowTalk: !0,
            NickName: t.currentTarget.dataset.name
        }), this.data.PostConten.rootID = t.currentTarget.dataset.rootid, this.data.PostConten.pid = t.currentTarget.dataset.pid, 
        this.data.PostConten.content = "";
    },
    PostContent: function(a, e, o) {
        var n = this, i = "", s = {};
        0 == n.data.type ? (i = "xiaozu/topic/SavePost", s = {
            tid: n.data.ID,
            rootID: a,
            pid: e,
            content: o
        }) : 1 == n.data.type && (i = "xiaozu/activity/SavePost", s = {
            aid: n.data.ID,
            rootID: a,
            pid: e,
            content: o
        }), t.httppost(i, s, function(t) {
            t.Result && (n.CanCle(), wx.showToast({
                title: t.Message
            }));
        }, "POST");
    },
    ValueChange: function(t) {
        this.data.PostConten.content = t.detail.value;
    }
});
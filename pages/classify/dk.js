var a = getApp(), t = (require("../../utils/timeutil.js"), require("../../utils/httputil.js")), e = require("../../utils/imgutil.js"), i = require("../../utils/messageutil.js");

Page({
    data: {
        pageindex: 1,
        displayMode: 0,
        filterValues: {},
        sort: 0,
        newlist: [],
        passlist: [],
        sid: 0,
        templist: [],
        Cover: "",
        Summary: "",
        Title: "",
        hasmore: !0,
        SortMenus: [],
        gofirst: !0,
        MinPrice: "",
        MaxPrice: "",
        grid: [],
        mask: !1,
        shino: !1,
        fiter_fixed: !1
    },
    onLoad: function(t) {
        var e = this;
        e.data.sid = t.sid, wx.getSystemInfo({
            success: function(a) {
                e.data.stop = a.windowHeight, e.data.width = a.windowWidth, e.setData({
                    stop: e.data.stop
                });
            }
        }), a.showLoading("数据加载中"), e.init(!0);
    },
    init: function(a) {
        var s = this, d = {
            displayMode: s.data.displayMode,
            pageindex: s.data.pageindex,
            pagesize: 20,
            sid: s.data.sid,
            filterValues: JSON.stringify(s.data.filterValues),
            sort: s.data.sort
        };
        t.httppost("pinhuoitem/GetItem4StallID", d, function(t) {
            t.Result && (t.Data.NewItems.map(function(a) {
                a.itemcover = e.getUrl(a.Cover, 300), a.tips = i.showtips(a.DealCount, a.ChengTuanCount);
            }), t.Data.PassItems.map(function(a) {
                a.itemcover = e.getUrl(a.Cover, 300), a.tips = i.showtips(a.DealCount, a.ChengTuanCount);
            }), a && (t.Data.SortMenus.map(function(a) {
                5 == a.Value ? a.selected = !1 : a.selected = !0;
            }), s.data.SortMenus = t.Data.SortMenus), 0 == s.data.displayMode ? (s.data.templist = t.Data.PassItems, 
            20 == t.Data.NewItems.length ? (s.data.displayMode = 1, s.data.pageindex = 2, s.data.hasmore = !0, 
            s.data.newlist = t.Data.NewItems) : t.Data.NewItems.length < 20 && 20 == t.Data.PassItems.length ? (s.data.displayMode = 2, 
            s.data.pageindex = 2, s.data.hasmore = !0, s.data.newlist = t.Data.NewItems, s.data.passlist = s.data.templist) : t.Data.NewItems.length < 20 && t.Data.PassItems.length < 20 && (s.data.displayMode = 2, 
            s.data.pageindex = 2, s.data.hasmore = !1, s.data.newlist = t.Data.NewItems, s.data.passlist = s.data.templist)) : 1 == s.data.displayMode ? 20 == t.Data.NewItems.length ? (s.data.displayMode = 1, 
            s.data.pageindex++, s.data.newlist = s.data.newlist.concat(t.Data.NewItems), s.data.hasmore = !0) : 20 == s.data.templist.length ? (s.data.displayMode = 2, 
            s.data.pageindex = 2, s.data.newlist = s.data.newlist.concat(t.Data.NewItems), s.data.passlist = s.data.templist, 
            s.data.hasmore = !0) : s.data.templist.length < 20 && (s.data.displayMode = 2, s.data.pageindex = 2, 
            s.data.newlist = s.data.newlist.concat(t.Data.NewItems), s.data.passlist = s.data.templist, 
            s.data.hasmore = !1) : 2 == s.data.displayMode && (20 == t.Data.PassItems.length ? (s.data.pageindex++, 
            s.data.hasmore = !0) : s.data.hasmore = !1, s.data.passlist = s.data.passlist.concat(t.Data.PassItems)), 
            s.setData({
                sort: t.Data.CurrentMenuID,
                Cover: t.Data.Cover,
                Summary: t.Data.Summary,
                Title: t.Data.Title,
                SortMenus: s.data.SortMenus,
                newlist: s.data.newlist,
                passlist: s.data.passlist,
                hasmore: s.data.hasmore,
                shino: s.data.shino
            }));
        }, "GET");
    },
    bindsearch: function(e) {
        var i = this;
        20 == e.currentTarget.dataset.id ? i.data.gofirst ? (a.showLoading("获取数组中"), t.httppost("pinhuoitem/GetSearchPanel", {
            AreaID: 4,
            Datas: JSON.stringify({
                ID: i.data.sid,
                Keyword: "",
                Values: ""
            })
        }, function(a) {
            a.Result && (i.data.gofirst = !1, a.Data.Panels.map(function(a) {
                a.choose = !1, 1 == a.TypeID || 2 == a.TypeID ? a.selected = !0 : a.selected = !1, 
                a.Panels.map(function(a) {
                    a.selected = !1;
                });
            }), i.setData({
                grid: a.Data.Panels
            }), i.animation(!0));
        }, "POST")) : i.animation(!0) : (i.data.displayMode = 0, i.data.pageindex = 1, i.data.newlist = [], 
        i.data.passlist = [], i.data.templist = [], 5 == e.currentTarget.dataset.id && 5 == i.data.sort ? (i.data.sort = 4, 
        i.data.SortMenus.map(function(a) {
            5 == a.Value && (a.selected = !1), 4 == a.Value && (a.selected = !0);
        }), a.showLoading("数据加载中")) : 4 == e.currentTarget.dataset.id && 4 == i.data.sort ? (i.data.sort = 5, 
        i.data.SortMenus.map(function(a) {
            4 == a.Value && (a.selected = !1), 5 == a.Value && (a.selected = !0);
        }), a.showLoading("数据加载中")) : e.currentTarget.dataset.id !== i.data.sort && (i.data.sort = e.currentTarget.dataset.id, 
        a.showLoading("数据加载中")), i.init(!1));
    },
    animation: function(a) {
        var t = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animation1 = t, a ? (t.translateX(.8 * -this.data.width).step(), this.data.mask = !0) : (t.translateX(.8 * this.data.width).step(), 
        this.data.mask = !1), this.setData({
            animationData1: t.export(),
            grid: this.data.grid,
            mask: this.data.mask
        });
    },
    canneled: function() {
        this.animation(!1);
    },
    selected: function(a) {
        var t = a.currentTarget.dataset;
        if (t.parent) this.data.grid[t.pindex].Panels[t.sindex].selected = !this.data.grid[t.pindex].Panels[t.sindex].selected; else if (this.data.grid[t.pindex].Panels[t.sindex].selected) this.data.grid[t.pindex].Panels.map(function(a) {
            a.selected = !1;
        }), 3 == this.data.grid[t.pindex].TypeID && (this.data.MinPrice = "", this.data.MaxPrice = ""); else if (this.data.grid[t.pindex].Panels.map(function(a) {
            a.selected = !1;
        }), this.data.grid[t.pindex].Panels[t.sindex].selected = !0, 3 == this.data.grid[t.pindex].TypeID) {
            var e = this.data.grid[t.pindex].Panels[t.sindex].Name.split("-");
            this.data.MinPrice = Number(e[0]), this.data.MaxPrice = Number(e[1]);
        }
        this.setData({
            grid: this.data.grid,
            MinPrice: this.data.MinPrice,
            MaxPrice: this.data.MaxPrice
        });
    },
    choose: function(a) {
        this.data.grid[a.currentTarget.dataset.index].choose = !this.data.grid[a.currentTarget.dataset.index].choose, 
        this.setData({
            grid: this.data.grid
        });
    },
    comfire: function(t) {
        var e = this, i = this;
        i.data.filterValues.MaxPrice = "" == i.data.MaxPrice ? 1e5 : i.data.MaxPrice, i.data.filterValues.MinPrice = "" == i.data.MinPrice ? 0 : i.data.MinPrice, 
        i.data.filterValues.Params = [], i.data.grid.map(function(a) {
            if (3 !== a.TypeID) {
                var t = {}, i = [];
                a.Panels.map(function(a) {
                    a.selected && i.push(a.ID);
                }), i.length > 0 && (t.TypeID = a.TypeID, t.Values = i.join(","), e.data.filterValues.Params.push(t));
            }
        }), i.canneled(), "" == i.data.MaxPrice && "" == i.data.MinPrice && 0 == this.data.filterValues.Params.length ? this.data.shino = !1 : this.data.shino = !0, 
        i.data.displayMode = 0, i.data.pageindex = 1, i.data.newlist = [], i.data.passlist = [], 
        i.data.templist = [], a.showLoading("数据加载中"), i.init(!1);
    },
    loadMore: function() {
        this.data.hasmore ? this.init(!1) : wx.showToast({
            title: "没有跟多数据了"
        });
    },
    imagenavigator: function(a) {
        wx.navigateTo({
            url: "../pinhuo/itemdetail?id=" + a.currentTarget.dataset.testid
        });
    },
    canneled1: function() {
        this.data.grid.map(function(a) {
            a.Panels.map(function(a) {
                a.selected = !1;
            });
        }), this.setData({
            grid: this.data.grid,
            MinPrice: "",
            MaxPrice: ""
        });
    },
    MinPrice: function(a) {
        this.data.MinPrice = a.detail.value;
    },
    MaxPrice: function(a) {
        this.data.MaxPrice = a.detail.value;
    },
    onReady: function() {
        var a = this;
        wx.canIUse("createSelectorQuery") && setTimeout(function() {
            wx.createSelectorQuery().select("#header").boundingClientRect(function(t) {
                a.data.height = t.height - 44, console.log(t.height);
            }).exec();
        }, 500);
    },
    bindscroll: function(a) {
        wx.canIUse("createSelectorQuery") && (a.detail.scrollTop >= this.data.height ? this.setData({
            fiter_fixed: !0
        }) : this.setData({
            fiter_fixed: !1
        }));
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
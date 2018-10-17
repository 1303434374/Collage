var a = require("../../utils/imgutil.js"), t = require("../../utils/httputil.js"), e = getApp();

Page({
    data: {
        displaymode: 0,
        pageIndex: 1,
        loadflage: !0,
        List: [],
        empty: "",
        rid: -1,
        valueIDS: "",
        sort: 0,
        filterValues: {},
        SortMenus: [],
        mask: !1,
        grid: [],
        firsted: !0,
        shino: !1,
        MinPrice: "",
        MaxPrice: "",
        firstEmpty: !1,
        scroll: 0,
        partList: !0
    },
    onLoad: function(a) {
        var t = this;
        "" == a.key ? (e.setTitle(a.title), t.data.AreaID = 3) : (e.setTitle(a.key), t.data.AreaID = 2, 
        a.rid = -1, a.ValueIDS = ""), t.data.Datas = {
            ID: a.rid,
            Keyword: a.key,
            Values: a.ValueIDS
        }, t.data.keyword = a.key, t.data.rid = a.rid, t.data.valueIDS = a.ValueIDS, wx.getSystemInfo({
            success: function(a) {
                t.data.width = a.windowWidth;
            }
        }), this.init(!0);
    },
    init: function(i) {
        var s = this;
        e.showLoading("搜索中"), s.data.NewItems = [], s.data.PassItems = [], s.data.pageIndex = 1;
        var d = {
            keyword: s.data.keyword,
            pageIndex: s.data.pageIndex,
            pageSize: 20,
            rid: this.data.rid,
            valueIDS: this.data.valueIDS,
            sort: this.data.sort,
            displaymode: this.data.displaymode,
            filterValues: JSON.stringify(s.data.filterValues)
        };
        t.httppost("pinhuoitem/SearchV2", d, function(t) {
            if (0 == t.Data.PassItems.length && 0 == t.Data.NewItems.length && i) return s.setData({
                empty: "亲，没有该类的商品哟",
                firstEmpty: !0
            }), !1;
            if (0 == t.Data.PassItems.length && 0 == t.Data.NewItems.length && (s.data.empty = "没有符合筛选条件的商品", 
            wx.showModal({
                title: "",
                content: "没有符合筛选条件的商品",
                showCancel: !1
            })), t.Data.NewItems.map(function(t) {
                t.Cover = a.getUrl(t.Cover, 300);
            }), t.Data.PassItems.map(function(t) {
                t.Cover = a.getUrl(t.Cover, 300);
            }), i && (t.Data.SortMenus.map(function(a) {
                5 == a.Value ? a.selected = !1 : a.selected = !0;
            }), s.data.SortMenus = t.Data.SortMenus), i) {
                var e = [ {
                    PartTitleText: t.Data.Part1Title,
                    displaymode: 1,
                    istrue: !0
                }, {
                    PartTitleText: t.Data.Part2Title,
                    displaymode: 2,
                    istrue: !0
                } ];
                0 == t.Data.NewItems.length && (e[0].istrue = !1, s.data.partList = !1), 0 == t.Data.PassItems.length && (e[1].istrue = !1, 
                s.data.partList = !1), t.Data.NewItems.length > 19 ? (s.data.pageIndex++, s.data.loadflage = !0, 
                s.data.List = t.Data.NewItems, s.data.displaymode = 1) : t.Data.NewItems.length > 0 ? (s.data.loadflage = !1, 
                s.data.List = t.Data.NewItems, s.data.displaymode = 1) : t.Data.PassItems.length > 19 ? (s.data.pageIndex++, 
                s.data.loadflage = !0, s.data.displaymode = 2, s.data.List = t.Data.PassItems) : t.Data.PassItems.length > 0 ? (s.data.loadflage = !1, 
                s.data.displaymode = 2, s.data.List = t.Data.PassItems) : (s.data.loadflage = !1, 
                s.data.List = []), s.setData({
                    PartTitle: e,
                    partList: s.data.partList
                });
            } else 1 == s.data.displaymode ? t.Data.NewItems.length > 19 ? (s.data.pageIndex++, 
            s.data.loadflage = !0, s.data.List = t.Data.NewItems) : (s.data.loadflage = !1, 
            s.data.List = t.Data.NewItems) : 2 == s.data.displaymode && (t.Data.PassItems.length > 19 ? (s.data.pageIndex++, 
            s.data.loadflage = !0, s.data.List = t.Data.PassItems) : (s.data.loadflage = !1, 
            s.data.List = t.Data.PassItems));
            s.setData({
                List: s.data.List,
                displaymode: s.data.displaymode,
                SortMenus: s.data.SortMenus,
                sort: t.Data.CurrentMenuID,
                shino: s.data.shino,
                empty: s.data.empty
            });
        }, "GET");
    },
    loadMore: function() {
        if (!this.data.loadflage) return wx.showToast({
            title: "没有更多数据",
            icon: "success",
            mask: !0
        }), !1;
        e.showLoading("数据加载中");
        var i = this, s = {
            keyword: i.data.keyword,
            pageIndex: i.data.pageIndex,
            pageSize: 20,
            displaymode: i.data.displaymode,
            rid: i.data.rid,
            valueIDS: i.data.valueIDS,
            sort: i.data.sort,
            filterValues: JSON.stringify(i.data.filterValues)
        };
        t.httppost("pinhuoitem/SearchV2", s, function(t) {
            t.Data.NewItems.map(function(t) {
                t.Cover = a.getUrl(t.Cover, 300);
            }), t.Data.PassItems.map(function(t) {
                t.Cover = a.getUrl(t.Cover, 300);
            }), 1 == i.data.displaymode ? (i.data.List = i.data.List.concat(t.Data.NewItems), 
            t.Data.NewItems.length > 19 ? (i.data.pageIndex++, i.data.loadflage = !0) : i.data.loadflage = !1) : 2 == i.data.displaymode && (i.data.List = i.data.List.concat(t.Data.PassItems), 
            t.Data.PassItems.length > 19 ? (i.data.pageIndex++, i.data.loadflage = !0) : i.data.loadflage = !1), 
            i.setData({
                List: i.data.List
            });
        }, "GET");
    },
    skip: function(a) {
        wx.navigateTo({
            url: "../pinhuo/itemdetail?id=" + a.currentTarget.dataset.id
        });
    },
    unique: function(a) {
        for (var t = [], e = 0; e < a.length; e++) -1 == t.indexOf(a[e]) && t.push(a[e]);
        return t;
    },
    bindscrollx: function(a) {
        this.data.partList && (this.animation2(this.data.scroll > a.detail.scrollTop), this.data.scroll = a.detail.scrollTop);
    },
    gotop: function() {
        this.setData({
            scroll_top: 0
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
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
    animation2: function(a) {
        var t = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animationx = t, a ? t.translateY(0).step() : t.translateY(-44).step(), this.setData({
            animationData2: t.export()
        });
    },
    canneled: function() {
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
    bindsearch: function(a) {
        var i = this;
        if (20 != a.currentTarget.dataset.id) return i.data.pageIndex = 1, 5 == a.currentTarget.dataset.id && 5 == i.data.sort ? (i.data.sort = 4, 
        i.data.SortMenus.map(function(a) {
            5 == a.Value && (a.selected = !1), 4 == a.Value && (a.selected = !0);
        })) : 4 == a.currentTarget.dataset.id && 4 == i.data.sort ? (i.data.sort = 5, i.data.SortMenus.map(function(a) {
            4 == a.Value && (a.selected = !1), 5 == a.Value && (a.selected = !0);
        })) : a.currentTarget.dataset.id !== i.data.sort && (i.data.sort = a.currentTarget.dataset.id), 
        i.init(!1), i.setData({
            scroll_top: 0
        }), !1;
        i.data.firsted ? (e.showLoading("数据加载中"), t.httppost("pinhuoitem/GetSearchPanel", {
            areaid: i.data.AreaID,
            datas: JSON.stringify(i.data.Datas)
        }, function(a) {
            a.Result && (a.Data.Panels.map(function(a) {
                a.choose = !1, 1 == a.TypeID || 2 == a.TypeID ? a.selected = !0 : a.selected = !1, 
                a.Panels.map(function(a) {
                    a.selected = !1;
                });
            }), i.setData({
                grid: a.Data.Panels,
                firsted: !1
            }), i.animation(!0));
        }, "POST")) : i.animation(!0);
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
    comfire: function(a) {
        var t = this;
        return this.data.filterValues.MaxPrice = "" == this.data.MaxPrice ? 1e5 : this.data.MaxPrice, 
        this.data.filterValues.MinPrice = "" == this.data.MinPrice ? 0 : this.data.MinPrice, 
        this.data.filterValues.Params = [], this.data.grid.map(function(a) {
            if (3 !== a.TypeID) {
                var e = {}, i = [];
                a.Panels.map(function(a) {
                    a.selected && i.push(a.ID);
                }), i.length > 0 && (e.TypeID = a.TypeID, e.Values = i.join(","), t.data.filterValues.Params.push(e));
            }
        }), this.canneled1(), "" == this.data.MaxPrice && "" == this.data.MinPrice && 0 == this.data.filterValues.Params.length ? this.data.shino = !1 : this.data.shino = !0, 
        this.init(!1), this.setData({
            scroll_top: 0
        }), !1;
    },
    canneled1: function(a) {
        this.animation(!1);
    },
    MinPrice: function(a) {
        this.data.MinPrice = a.detail.value;
    },
    MaxPrice: function(a) {
        this.data.MaxPrice = a.detail.value;
    },
    checkpart: function(a) {
        if (this.data.displaymode == a.currentTarget.dataset.id) return !1;
        this.data.displaymode = a.currentTarget.dataset.id, this.data.List = [], this.data.pageIndex = 1, 
        this.data.loadflage = !0, this.init(!1), this.setData({
            scroll_top: 0
        });
    }
});
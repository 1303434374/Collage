var t = getApp(), a = require("../../utils/timeutil.js"), e = require("../../utils/httputil.js"), i = require("../../utils/imgutil.js"), s = require("../../utils/messageutil.js");

Page({
    data: {
        List: [],
        hasMore: !0,
        pageIndex: 1,
        displaymode: 0,
        pagesize: 20,
        listPass: [],
        templist: [],
        flag: !0,
        flagrefsh: !0,
        fixed: !1,
        height: 300,
        grid: [],
        mask: !1,
        sort: 0,
        MinPrice: "",
        MaxPrice: "",
        tick: "00时00分00秒",
        filterValues: {},
        firstgo: !0,
        shino: !1,
        partList: !0,
        partTop: 0,
        ShowCoinPayIcon: !0
    },
    onLoad: function(a) {
        console.log(a)
        var i = decodeURIComponent(a.scene);
        i && i.split("&").map(function(t) {
            "i" == t.slice(0, 1) ? a.qsid = t.slice(1) : "k" == t.slice(0, 1) ? a.key = t.slice(1) : "t" == t.slice(0, 1) && (a.tag = t.slice(1));
        }), wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0
        });
        var s = this;
        s.time = null, wx.getSystemInfo({
            success: function(t) {
                s.data.stop = t.windowHeight, s.data.width = t.windowWidth;
            }
        }), a.title && (t.setTitle(a.title), s.data.share_title = a.title), s.data.share_qsid = a.qsid, 
        t.showLoading("数据加载中"), s.init(!0), a.key && e.httppostmore("shop/wx/SaveWxQsStatistics", {
            Key: a.key,
            OpenID: wx.getStorageSync("openid"),
            QsID: a.qsid,
            tag: a.tag
        }, function(t) {}, "POST");
    },
    init: function(a) {
        var d = this;
        d.data.flag = !1;
        var n = {
            pageIndex: d.data.pageIndex,
            pagesize: d.data.pagesize,
            qsid: d.data.share_qsid,
            sort: d.data.sort,
            displaymode: d.data.displaymode,
            filterValues: JSON.stringify(d.data.filterValues)
        };
        e.httppost("pinhuoitem/getitemsv2", n, function(e) {
            console.log('专场详情+商品列表=')
            console.log(e)
            if (e.Result) {
                if (t.setTitle(e.Data.Info.Name), !e.Data.Info.VisitResult.CanVisit) return wx.showModal({
                    title: "提示",
                    content: e.Data.Info.VisitResult.Message,
                    showCancel: !1,
                    success: function(t) {
                        wx.getStorageSync("token") ? wx.switchTab({
                            url: "/pages/nahuomain/main"
                        }) : wx.reLaunch({
                            url: "/pages/login/login?qsid=" + n.qsid
                        });
                    }
                }), !1;
                d.data.flag = !0;
                var o = e.Data.Info.ToTime.split(/[^0-9]/), r = new Date(o[0], o[1] - 1, o[2], o[3], o[4], o[5]).getTime() - new Date().getTime();
                if (e.Data.NewItems.map(function(t) {
                    t.itemcover = i.getUrl(t.Cover, 300), t.tips = s.showtips(t.DealCount, t.ChengTuanCount);
                }), e.Data.PassItems.map(function(t) {
                    t.itemcover = i.getUrl(t.Cover, 300), t.tips = s.showtips(t.DealCount, t.ChengTuanCount);
                }), 0 == d.data.displaymode ? e.Data.NewItems.length >= d.data.pagesize ? (d.data.List = e.Data.NewItems, 
                d.data.displaymode = 1, d.data.hasMore = !0, d.data.pageIndex = 2) : e.Data.NewItems.length > 0 ? (d.data.List = e.Data.NewItems, 
                d.data.displaymode = 1, d.data.hasMore = !1) : e.Data.PassItems.length >= d.data.pagesize ? (d.data.List = e.Data.PassItems, 
                d.data.hasMore = !0, d.data.pageIndex = 2, d.data.displaymode = 2) : e.Data.PassItems.length > 0 ? (d.data.List = e.Data.PassItems, 
                d.data.hasMore = !1, d.data.pageIndex = 2) : (d.data.List = e.Data.NewItems, d.data.hasMore = !1, 
                d.data.pageIndex = 2, d.data.displaymode = 1) : 1 == d.data.displaymode ? e.Data.NewItems.length == d.data.pagesize ? (d.data.List = d.data.List.concat(e.Data.NewItems), 
                d.data.hasMore = !0, d.data.pageIndex++) : e.Data.NewItems.length < d.data.pagesize && (d.data.List = d.data.List.concat(e.Data.NewItems), 
                d.data.hasMore = !1) : 2 == d.data.displaymode && (e.Data.PassItems.length == d.data.pagesize ? (d.data.List = d.data.List.concat(e.Data.PassItems), 
                d.data.hasMore = !0, d.data.pageIndex++) : (d.data.List = d.data.List.concat(e.Data.PassItems), 
                d.data.hasMore = !1)), a) {
                    d.data.SortMenus = e.Data.Info.SortMenus, d.data.ShowCoinPayIcon = e.Data.Info.ShowCoinPayIcon, 
                    d.timeOut(r), e.Data.Info.SortMenus.map(function(t) {
                        t.selected = !0, 4 == d.data.sort && 5 == t.Value || 5 == d.data.sort && 4 == t.Value ? t.selected = !1 : 4 !== d.data.sort && 5 !== d.data.sort && 5 == t.Value && (t.selected = !1);
                    });
                    var h = [ {
                        PartTitleText: e.Data.Info.Part1Title,
                        displaymode: 1,
                        istrue: !0
                    }, {
                        PartTitleText: e.Data.Info.Part2Title,
                        displaymode: 2,
                        istrue: !0
                    } ];
                    0 == e.Data.NewItems.length && (h[0].istrue = !1, d.data.partList = !1), 0 == e.Data.PassItems.length && (h[1].istrue = !1, 
                    d.data.partList = !1), d.setData({
                        UserCover: "https://api2.nahuo.com/v3/shop/userlogo/" + e.Data.Info.ShopUserID,
                        ShopUserName: e.Data.Info.ShopUserName,
                        AppCover: e.Data.Info.AppCover,
                        Description: e.Data.Info.Description,
                        OpenStatu: e.Data.Info.OpenStatu,
                        Summary: e.Data.Info.Summary,
                        stop: d.data.stop,
                        SortMenus: d.data.SortMenus,
                        List: d.data.List,
                        sort: e.Data.Info.CurrentMenuID,
                        hasMore: d.data.hasMore,
                        shino: d.data.shino,
                        Cover: e.Data.Info.Cover,
                        displaymode: d.data.displaymode,
                        PartTitle: h,
                        partList: d.data.partList,
                        ShowCoinPayIcon: d.data.ShowCoinPayIcon
                    });
                } else d.setData({
                    List: d.data.List,
                    SortMenus: d.data.SortMenus,
                    sort: e.Data.Info.CurrentMenuID,
                    hasMore: d.data.hasMore,
                    shino: d.data.shino,
                    displaymode: d.data.displaymode
                });
                return d;
            }
        }, "GET");
    },
    onReady: function() {
        var t = this;
        wx.canIUse("createSelectorQuery") && setTimeout(function() {
            wx.createSelectorQuery().select("#ids").boundingClientRect(function(a) {
                t.data.height = a.height - 88 - 30;
            }).exec();
        }, 500);
    },
    timeOut: function(t) {
        var e = this;
        e.time = setInterval(function() {
            t -= 1e3, e.setData({
                tick: a.date_format(t)
            });
        }, 1e3);
    },
    refesh: function(t) {
        var a = this;
        a.data.flag && (a.data.hasMore ? (a.data.List = [], a.data.pageIndex = 1, a.data.listPass = [], 
        a.data.templist = [], a.data.displaymode = 0, a.data.sort = 0, a.data.filterValues = {}, 
        a.init(!1)) : wx.showToast({
            title: "没有更多数据了"
        }));
    },
    loadMore: function(t) {
        this.data.hasMore && this.data.flag ? this.init(!1) : this.data.flag ? wx.showToast({
            title: "没有更多数据咯"
        }) : wx.showToast({
            title: "亲，您太快了"
        });
    },
    imagenavigator: function(t) {
        var a = t.currentTarget.dataset.testid;
        wx.navigateTo({
            url: "../pinhuo/itemdetail?id=" + a + "&qsid=" + this.data.share_qsid
        });
    },
    bindscroll: function(t) {
        wx.canIUse("createSelectorQuery") && (this.data.fixed = t.detail.scrollTop >= this.data.height, 
        this.setData({
            fixed: this.data.fixed
        }), this.data.partList && this.data.fixed && (this.animation2(this.data.partTop > t.detail.scrollTop), 
        this.data.partTop = t.detail.scrollTop));
    },
    animation2: function(t) {
        var a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animationx = a, t ? a.translateY(0).step() : a.translateY(-44).step(), this.setData({
            animationData2: a.export()
        });
    },
    gotop: function() {
        this.setData({
            scroll_top: 0
        });
    },
    onShareAppMessage: function() {
        return wx.getStorageSync("userid") ? {
            title: this.data.share_title,
            path: "/pages/pinhuo/pinhuodetail?title=" + this.data.share_title + "&qsid=" + this.data.share_qsid + "&key=" + wx.getStorageSync("userid") + "&tag=swx",
            imageUrl: this.data.Cover
        } : {
            title: this.data.share_title,
            path: "/pages/pinhuo/pinhuodetail?title=" + this.data.share_title + "&qsid=" + this.data.share_qsid,
            imageUrl: this.data.Cover
        };
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    bindsearch: function(a) {
        var i = this;
        if (20 == a.currentTarget.dataset.id) i.data.firstgo ? (t.showLoading("数据加载中"), 
        e.httppost("pinhuoitem/GetSearchPanel", {
            areaid: 1,
            datas: JSON.stringify({
                ID: i.data.share_qsid
            })
        }, function(t) {
            t.Result && (t.Data.Panels.map(function(t) {
                t.choose = !1, 1 == t.TypeID || 2 == t.TypeID ? t.selected = !0 : t.selected = !1, 
                t.Panels.map(function(t) {
                    t.selected = !1;
                });
            }), i.setData({
                grid: t.Data.Panels,
                firstgo: !1
            }), i.animation(!0));
        }, "GET")) : i.animation(!0); else if (i.data.List = [], i.data.pageIndex = 1, i.data.listPass = [], 
        i.data.templist = [], t.showLoading("数据加载中"), 5 == a.currentTarget.dataset.id && 5 == i.data.sort ? (i.data.sort = 4, 
        i.data.SortMenus.map(function(t) {
            5 == t.Value && (t.selected = !1), 4 == t.Value && (t.selected = !0);
        })) : 4 == a.currentTarget.dataset.id && 4 == i.data.sort ? (i.data.sort = 5, i.data.SortMenus.map(function(t) {
            4 == t.Value && (t.selected = !1), 5 == t.Value && (t.selected = !0);
        })) : a.currentTarget.dataset.id !== i.data.sort && (i.data.sort = a.currentTarget.dataset.id), 
        i.init(!1), i.data.fixed) return i.data.partList ? i.setData({
            scroll_top: i.data.height + 30
        }) : i.setData({
            scroll_top: i.data.height + 80
        }), !1;
    },
    animation: function(t) {
        var a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animation1 = a, t ? (a.translateX(.8 * -this.data.width).step(), this.data.mask = !0) : (a.translateX(.8 * this.data.width).step(), 
        this.data.mask = !1), this.setData({
            animationData1: a.export(),
            mask: this.data.mask
        });
    },
    canneled: function() {
        this.animation(!1);
    },
    selected: function(t) {
        var a = t.currentTarget.dataset;
        if (a.parent) this.data.grid[a.pindex].Panels[a.sindex].selected = !this.data.grid[a.pindex].Panels[a.sindex].selected; else if (this.data.grid[a.pindex].Panels[a.sindex].selected) this.data.grid[a.pindex].Panels.map(function(t) {
            t.selected = !1;
        }), 3 == this.data.grid[a.pindex].TypeID && (this.data.MinPrice = "", this.data.MaxPrice = ""); else if (this.data.grid[a.pindex].Panels.map(function(t) {
            t.selected = !1;
        }), this.data.grid[a.pindex].Panels[a.sindex].selected = !0, 3 == this.data.grid[a.pindex].TypeID) {
            var e = this.data.grid[a.pindex].Panels[a.sindex].Name.split("-");
            this.data.MinPrice = Number(e[0]), this.data.MaxPrice = Number(e[1]);
        }
        this.setData({
            grid: this.data.grid,
            MinPrice: this.data.MinPrice,
            MaxPrice: this.data.MaxPrice
        });
    },
    choose: function(t) {
        this.data.grid[t.currentTarget.dataset.index].choose = !this.data.grid[t.currentTarget.dataset.index].choose, 
        this.setData({
            grid: this.data.grid
        });
    },
    comfire: function(a) {
        var e = this;
        if (this.data.filterValues.MaxPrice = "" == this.data.MaxPrice ? 1e5 : this.data.MaxPrice, 
        this.data.filterValues.MinPrice = "" == this.data.MinPrice ? 0 : this.data.MinPrice, 
        this.data.filterValues.Params = [], this.data.grid.map(function(t) {
            if (3 !== t.TypeID) {
                var a = {}, i = [];
                t.Panels.map(function(t) {
                    t.selected && i.push(t.ID);
                }), i.length > 0 && (a.TypeID = t.TypeID, a.Values = i.join(","), e.data.filterValues.Params.push(a));
            }
        }), this.canneled(), this.data.List = [], this.data.pageIndex = 1, this.data.listPass = [], 
        this.data.templist = [], "" == this.data.MaxPrice && "" == this.data.MinPrice && 0 == this.data.filterValues.Params.length ? this.data.shino = !1 : this.data.shino = !0, 
        t.showLoading("数据加载中"), this.init(!1), this.data.fixed) return this.data.partList ? this.setData({
            scroll_top: this.data.height + 30
        }) : this.setData({
            scroll_top: this.data.height + 80
        }), !1;
    },
    clear: function() {
        this.data.grid.map(function(t) {
            t.Panels.map(function(t) {
                t.selected = !1;
            });
        }), this.setData({
            grid: this.data.grid,
            MinPrice: "",
            MaxPrice: ""
        });
    },
    MinPrice: function(t) {
        this.data.MinPrice = t.detail.value;
    },
    MaxPrice: function(t) {
        this.data.MaxPrice = t.detail.value;
    },
    TabIndex: function(t) {
        wx.switchTab({
            url: "/pages/nahuomain/main"
        });
    },
    GoHome: function() {
        wx.switchTab({
            url: "/pages/nahuomain/main"
        });
    },
    checkpart: function(t) {
        return this.data.displaymode != t.currentTarget.dataset.id && (this.data.displaymode = t.currentTarget.dataset.id, 
        this.data.List = [], this.data.pageIndex = 1, this.data.hasMore = !0, this.init(!1), 
        this.data.fixed ? (this.data.partList ? this.setData({
            scroll_top: this.data.height + 30
        }) : this.setData({
            scroll_top: this.data.height + 80
        }), !1) : void 0);
    },
    GoSearch: function() {
        wx.navigateTo({
            url: "/pages/search/search"
        });
    }
});
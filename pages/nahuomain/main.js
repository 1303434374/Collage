function t(t) {
    var a = [], i = t.data.clocklist;
    for (var n in i) i[n].tick <= 0 ? a.push({
        tick: "0:00:00"
    }) : a.push({
        tick: e.date_format(i[n].tick)
    });
    t.data.timelist = a;
}

var a = getApp(), e = require("../../utils/timeutil.js"), i = require("../../utils/httputil.js"), n = (require("../../utils/md5util.js"), 
require("../../utils/imgutil.js")),we7 = a.globalData.we7;

Page({
    data: {
        list: [],
        pageIndex: 1,
        hidden: !1,
        page: 1,
        size: 20,
        hasMore: !0,
        menu_static: 1,
        cid: 0,
        debug: 0,
        scroll_top: 0,
        clocklist: [],
        videoId: -1,
        CarNum: 0
    },
    onLoad: function(t) {
        this.setData({
            we7: we7
        })
        if (!we7) {
            var a = decodeURIComponent(t.scene);
            a && a.split("&").map(function(a) {
                "k" == a.slice(0, 1) ? t.key = a.slice(1) : "t" == a.slice(0, 1) && (t.tag = a.slice(1));
            }), wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            });
            if (t.key) {
                var e = {
                    Key: t.key,
                    OpenID: wx.getStorageSync("openid"),
                    tag: t.tag
                };
                i.httppostmore("shop/wx/SaveWxIndexStatistics", e, function(t) {}, "POST");
            }
        }
        this.ajax();
    },
    onShow: function() {
        this.GetQty();
    },
    onShareAppMessage: function() {
        return wx.getStorageSync("userid") ? {
            title: "天天拼货团",
            path: "/pages/nahuomain/main?key=" + wx.getStorageSync("userid") + "&tag=swx",
            success: function(t) {
                console.log(t.shareTickets);
            }
        } : {
            title: "天天拼货团",
            path: "/pages/nahuomain/main",
            success: function(t) {
                console.log(t.shareTickets);
            }
        };
    },
    onPullDownRefresh: function() {
        var t = this;
        wx.stopPullDownRefresh(), a.showLoading("页面加载中..."), setTimeout(function() {
            t.ajax();
        }, 2e3);
    },
    //获取首页数据
    ajax: function() {
        var e = this;
        if (we7) {
            a.showLoading("");
            i.http_post("getareaorlanmu", {
                cid: this.data.menu_static
            }, (a) => {
                if (a.Data) {
                    console.log('微擎分类+列表=')
                    console.log(a)
                    e.data.clocklist = [], a.Data.ActivityList.map(function(t) {
                        var a = t.ToTime.split(/[^0-9]/), i = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]).getTime() - new Date().getTime();
                        e.data.clocklist.push({
                            tick: i
                        }), t.Description = t.Description.replace(/(^\s*)|(\s*$)/g, "");
                    }), t(e), e.setData({
                        videoId: -1,
                        list: a.Data.ActivityList,
                        hidden: !0,
                        menu: a.Data.CategoryList,
                        menuStatic: e.data.menu_static,
                        hasMore: a.Data.ActivityList.length >= 20,
                        timelist: e.data.timelist
                    });
                    e.adsMeus();
                }
            });
        } else {
            a.showLoading(""), i.httppost("pinhuoitem/GetHomeActivityList2?from=4&cid=" + this.data.menu_static + "&debug=" + e.data.debug, {}, function(a) {
                console.log('分类+列表=')
                console.log(a)
                e.data.clocklist = [], a.Data.ActivityList.map(function(t) {
                    var a = t.ToTime.split(/[^0-9]/), i = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]).getTime() - new Date().getTime();
                    e.data.clocklist.push({
                        tick: i
                    }), t.Description = t.Description.replace(/(^\s*)|(\s*$)/g, "");
                }), t(e), e.setData({
                    videoId: -1,
                    list: a.Data.ActivityList,
                    hidden: !0,
                    menu: a.Data.CategoryList,
                    menuStatic: e.data.menu_static,
                    hasMore: a.Data.ActivityList.length >= 20,
                    timelist: e.data.timelist
                });
            }), e.adsMeus();
        }
    },
   //获取轮播图数据
    adsMeus: function() {
        var t = this;
        if (we7) {
            i.http_post("getbanner", {
                valueID: this.data.menu_static
            }, (a) => {
                if (a.Data) {
                    console.log('微擎轮播图=')
                    console.log(a)
                    // var e = [];
                    // a.Data.ADList.map(function(t) {
                    //     0 == t.ImageUrl.indexOf("http://common-img-server.b0.upaiyun.com") ? t.ImageUrl = t.ImageUrl + "!thum.800" : t.ImageUrl = n.getUrl(t.ImageUrl, 400), 
                    //     -1 == t.Content.indexOf("www.nahuo.com") && e.push(t);
                    // }), 
                    t.setData({
                        ADList: a.Data.ADList
                    });
                }
            });
        } else {
            i.httppost("ads/GetBannersFormTypeV2", {
                AreaTypeID: 1,
                valueID: t.data.menu_static,
                from: 4,
                verid: 2
            }, function(a) {
                console.log('轮播图=')
                console.log(a)
                var e = [];
                a.Data.ADList.map(function(t) {
                    0 == t.ImageUrl.indexOf("http://common-img-server.b0.upaiyun.com") ? t.ImageUrl = t.ImageUrl + "!thum.800" : t.ImageUrl = n.getUrl(t.ImageUrl, 400), 
                    -1 == t.Content.indexOf("www.nahuo.com") && e.push(t);
                }), t.setData({
                    ADList: e
                });
            }, "GET");
        }
    },
    //获取红点
    GetQty: function(t) {
        if (we7) {
            wx.getStorageSync("u_id") && i.http_post("getTotalCount", {
                uid: wx.getStorageSync('u_id')
            }, function(t) {
                let num = t.Data.CartItemQty
                if (num > 0) {
                    wx.setTabBarBadge({
                        index: 2,
                        text: num
                    })
                } else {
                    wx.removeTabBarBadge({
                        index: 2
                    })
                }
            }, "GET");
        } else {
            wx.getStorageSync("token") && i.httppost("pinhuocart/GetMenuRedPoint", {}, function(t) {
                console.log('底部工具栏红点=')
                console.log(t)
                t.Result && (t.Data.CartItemQty > 0 && (t.Data.CartItemQty = t.Data.CartItemQty + "", 
                wx.setTabBarBadge({
                    index: 2,
                    text: t.Data.CartItemQty
                })), wx.getStorageSync("TopicID") == t.Data.TopicID || wx.showTabBarRedDot({
                    index: 9
                }));
            }, "GET");
        }
    },
    //点击菜单
    click_menu: function(t) {
        this.data.menu_static = t.currentTarget.id, this.ajax();
    },
    //点击专场
    navclick: function(t) {
        // var a = t.currentTarget.dataset.visit;
        // if (!a.CanVisit) return wx.showModal({
        //     title: "提示",
        //     content: a.Message,
        //     showCancel: !1
        // }), !1;
        wx.navigateTo({
            url: "../pinhuo/pinhuodetail?title=" + t.currentTarget.dataset.name + "&qsid=" + t.currentTarget.dataset.qid
        });
    },
    //点击轮播图
    GoToContent: function(t) {
        -1 == t.currentTarget.dataset.content.indexOf("www.nahuo.com") && wx.navigateTo({
            url: "/pages/pinhuo/pinhuodetail?qsid=" + t.currentTarget.dataset.content + "&title="
        });
    },
    loadMore: function(t) {
        var a = this, e = a.data.menu_static;
        a.data.hasMore && i.httppost("pinhuoitem/GetHomeActivityList2?cid=" + e + "&debug=" + a.data.debug + "&pageindex=" + ++a.data.pageIndex, {}, function(t) {
            a.setData({
                list: a.data.list.concat(t.Data.ActivityList),
                hidden: !0,
                page: 1,
                hasMore: t.Data.ActivityList.length >= 20,
                menuStatic: e
            });
        });
    },
    bindscroll: function(t) {
        var a = !0;
        a = t.detail.scrollTop >= 800, this.util(a);
    },
    util: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, t ? a.opacity(.8).translateY(-70).step() : a.opacity(0).translateY(0).step(), 
        this.setData({
            animationData: a.export()
        });
    },
    gotop: function() {
        this.setData({
            scroll_top: 0
        });
    },
    play: function(t) {
        this.setData({
            videoId: t.currentTarget.dataset.index
        });
    },
    playend: function() {
        this.setData({
            videoId: -1
        });
    },
    adanimation: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, t ? a.opacity(1).step() : a.opacity(0).step(), this.setData({
            adsanimationData: a.export(),
            ad_cont: this.data.ad_cont || ""
        });
    },
    GoSearch: function() {
        wx.navigateTo({
            url: "/pages/search/search"
        });
    },
    GoTop: function() {
        wx.pageScrollTo({
            scrollTop: 0
        });
    }
});
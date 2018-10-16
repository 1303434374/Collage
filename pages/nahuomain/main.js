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
require("../../utils/imgutil.js"));

Page({
    data: {
        //专场列表
        list: [
            {
                QsID: 1,//id
                Times: 0,//期数
                Name: '第136期 新手专享 - 热卖好货推荐',//名称
                VisitResult: 1000,//看货分
                AppCover: 'http://pj.dede1.com/attachment/images/116/2018/10/K7HI3nViAanhP8Aq8ix67QNVI68H6e.jpg',//图片
                Video: '', //视频
                HasNewItems: true, //是否有倒计时
                ActivityType: '拼货', //类型
                OpenStatu: {
                    Content: '永久不截单' //无倒计时时显示的文字
                },
                Description: '不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场'
            },
            {
                QsID: 1,//id
                Times: 0,//期数
                Name: '第136期 新手专享 - 热卖好货推荐',//名称
                VisitResult: 1000,//看货分
                AppCover: 'http://pj.dede1.com/attachment/images/116/2018/10/K7HI3nViAanhP8Aq8ix67QNVI68H6e.jpg',//图片
                Video: 'http://pj.dede1.com/attachment/images/116/2018/10/K7HI3nViAanhP8Aq8ix67QNVI68H6e.jpg', //视频
                HasNewItems: true, //是否有倒计时
                ActivityType: '拼货', //类型
                OpenStatu: {
                    Content: '永久不截单' //无倒计时时显示的文字
                },
                Description: '不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场不熟批发市场'
            }
        ],
        //倒计时
        timelist: [
            {
                tick: '12时46分46秒'
            },
            {
                tick: '12时46分46秒'
            }
        ],
        pageIndex: 1,
        hidden: !1,
        page: 1,
        size: 20,
        hasMore: !0,
        menu_static: 1,//顶部分类状态
        cid: 0,
        debug: 0,
        scroll_top: 0,
        clocklist: [],
        videoId: -1,
        CarNum: 0,
        //顶部分类
        menu: [
            {
                Cid: 0,
                Name: '广州货'
            },
            {
                Cid: 1,
                Name: '杭州货'
            },
            {
                Cid: 2,
                Name: '深圳货'
            },
            {
                Cid: 3,
                Name: '鞋包配饰'
            },
            {
                Cid: 4,
                Name: '品牌馆'
            }
        ],
        //轮播图
        ADList: [
            {
                ImageUrl: 'http://pj.dede1.com/attachment/images/99/2018/07/GiPW61id1f49GYvC6l9GYiYiyIVWU5.jpg',
                Content: 'www.nahuo.com'
            },
            {
                ImageUrl: 'http://pj.dede1.com/attachment/images/99/2018/07/GiPW61id1f49GYvC6l9GYiYiyIVWU5.jpg',
                Content: 'www.nahuo.com'
            }
        ]
    },
    onLoad: function(t) {
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
        this.ajax();
    },
    //获取分类跟列表
    ajax: function() {
        var e = this;
        a.showLoading(""), i.httppost("pinhuoitem/GetHomeActivityList2?from=4&cid=" + this.data.menu_static + "&debug=" + e.data.debug, {}, function(a) {
            e.data.clocklist = [], a.Data.ActivityList.map(function(t) {
                var a = t.ToTime.split(/[^0-9]/), i = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]).getTime() - new Date().getTime();
                e.data.clocklist.push({
                    tick: i
                }), t.Description = t.Description.replace(/(^\s*)|(\s*$)/g, "");
            }), t(e), e.setData({
                videoId: -1,
                hidden: !0,
                // list: a.Data.ActivityList,
                // menu: a.Data.CategoryList,
                // menuStatic: e.data.menu_static,
                list: e.data.list,
                menu: e.data.menu,
                menu_static: e.data.menu_static,
                hasMore: a.Data.ActivityList.length >= 20,
                timelist: e.data.timelist
            });
        }), e.adsMeus();
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
    click_menu: function(t) {
        // this.data.menu_static = t.currentTarget.id, this.ajax();
        this.setData({
            menu_static: t.currentTarget.id
        }),this.ajax()
    },
    navclick: function(t) {
        var a = t.currentTarget.dataset.visit;
        if (!a.CanVisit) return wx.showModal({
            title: "提示",
            content: a.Message,
            showCancel: !1
        }), !1;
        wx.navigateTo({
            url: "../pinhuo/pinhuodetail?title=" + t.currentTarget.dataset.name + "&qsid=" + t.currentTarget.dataset.qid
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
    onShow: function() {
        this.GetQty();
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
    //获取轮播图
    adsMeus: function() {
        var t = this;
        i.httppost("ads/GetBannersFormTypeV2", {
            AreaTypeID: 1,
            valueID: t.data.menu_static,
            from: 4,
            verid: 2
        }, function(a) {
            var e = [];
            a.Data.ADList.map(function(t) {
                0 == t.ImageUrl.indexOf("http://common-img-server.b0.upaiyun.com") ? t.ImageUrl = t.ImageUrl + "!thum.800" : t.ImageUrl = n.getUrl(t.ImageUrl, 400), 
                -1 == t.Content.indexOf("www.nahuo.com") && e.push(t);
            }), t.setData({
                // ADList: e
                ADList: t.data.ADList
            });
        }, "GET");
    },
    //轮播图跳转
    GoToContent: function(t) {
        -1 == t.currentTarget.dataset.content.indexOf("www.nahuo.com") && wx.navigateTo({
            url: "/pages/pinhuo/pinhuodetail?qsid=" + t.currentTarget.dataset.content + "&title="
        });
    },
    GetQty: function(t) {
        wx.getStorageSync("token") && i.httppost("pinhuocart/GetMenuRedPoint", {}, function(t) {
            t.Result && (t.Data.CartItemQty > 0 && (t.Data.CartItemQty = t.Data.CartItemQty + "", 
            wx.setTabBarBadge({
                index: 3,
                text: t.Data.CartItemQty
            })), wx.getStorageSync("TopicID") == t.Data.TopicID || wx.showTabBarRedDot({
                index: 2
            }));
        }, "GET");
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
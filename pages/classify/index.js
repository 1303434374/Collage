var t = require("../../utils/imgutil.js"), a = require("../../utils/httputil.js"), e = getApp();

Page({
    data: {
        clid: 0,
        CarNum: 0,
        list: [
            {   
                Name: '批发市场',
                Cover: 'http://pj.dede1.com/attachment/images/116/2018/10/YojPoTou0g2pp2OO7wVtPg2O6WtG26.png',//未选中的图标
                Cover2: 'http://pj.dede1.com/attachment/images/116/2018/10/hlfG7vVoqdrgVkg6XvLkXg1jJGv1o1.png',//已选中的图标
                Datas: [
                    {
                        Name: '全部商品',
                        ID: '1',
                        ValueIDS: '1',
                        Cover: 'http://pj.dede1.com/attachment/images/116/2018/10/YlPGllh7grRBwggPg22yhGR2gegiW2.png',
                    },
                    {
                        Name: '深圳南油',
                        ID: '2',
                        ValueIDS: '2',
                        Cover: 'http://pj.dede1.com/attachment/images/116/2018/10/YlPGllh7grRBwggPg22yhGR2gegiW2.png',
                    },
                ]
            },
            {   
                Name: '批发市场2',
                Cover: 'http://pj.dede1.com/attachment/images/116/2018/10/YojPoTou0g2pp2OO7wVtPg2O6WtG26.png',//未选中的图标
                Cover2: 'http://pj.dede1.com/attachment/images/116/2018/10/hlfG7vVoqdrgVkg6XvLkXg1jJGv1o1.png',//已选中的图标
                Datas: [
                    // {
                    //     Name: '全部商品',
                    //     ID: '1',
                    //     ValueIDS: '1',
                    //     Cover: 'http://pj.dede1.com/attachment/images/116/2018/10/YlPGllh7grRBwggPg22yhGR2gegiW2.png',
                    // },
                    // {
                    //     Name: '深圳南油',
                    //     ID: '2',
                    //     ValueIDS: '2',
                    //     Cover: 'http://pj.dede1.com/attachment/images/116/2018/10/YlPGllh7grRBwggPg22yhGR2gegiW2.png',
                    // },
                ]
            },
        ]
    },
    onLoad: function(n) {
        var i = this;
        e.showLoading("页面加载中"), a.httppost("pinhuoitem/activity/GetRecommendList", {}, function(a) {
            a.Data.List.map(function(a) {
                a.Datas.map(function(a) {
                    a.Cover && (a.Cover = t.getUrl(a.Cover, 200));
                });
            }), i.setData({
                // list: a.Data.List
                list: i.data.list
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        this.GetQty();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    click_menu: function(t) {
        this.setData({
            clid: t.currentTarget.dataset.clid
        });
    },
    goto: function(t) {
        wx.navigateTo({
            url: "/pages/search/list?key=&status=1&rid=" + t.currentTarget.dataset.rid + "&ValueIDS=" + t.currentTarget.dataset.valueid + "&title=" + t.currentTarget.dataset.key
        });
    },
    GetQty: function(t) {
        wx.getStorageSync("token") && a.httppost("pinhuocart/GetMenuRedPoint", {}, function(t) {
            t.Result && (t.Data.CartItemQty > 0 && (t.Data.CartItemQty = t.Data.CartItemQty + "", 
            wx.setTabBarBadge({
                index: 3,
                text: t.Data.CartItemQty
            })), wx.getStorageSync("TopicID") == t.Data.TopicID || wx.showTabBarRedDot({
                index: 2
            }));
        }, "GET");
    }
});
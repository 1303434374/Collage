var t = require("../../utils/imgutil.js"), a = require("../../utils/httputil.js"), e = getApp(), we7 = e.globalData.we7;

Page({
    data: {
        clid: 0,
        CarNum: 0
    },
    onLoad: function(n) {
        var i = this;
        this.setData({
            we7: we7
        })
        if (we7) {
            e.showLoading("页面加载中"), a.http_post('AllType', {}, (a) => {
                console.log('微擎分类=')
                console.log(a)
                i.setData({
                    list: a.Data.List
                });
            })
        } else {
            e.showLoading("页面加载中"), a.httppost("pinhuoitem/activity/GetRecommendList", {}, function(a) {
                console.log('商品分类=')
                console.log(a)
                a.Data.List.map(function(a) {
                    a.Datas.map(function(a) {
                        a.Cover && (a.Cover = t.getUrl(a.Cover, 200));
                    });
                }), i.setData({
                    list: a.Data.List
                });
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        we7 && this.GetQty();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    //点击菜单
    click_menu: function(t) {
        this.setData({
            clid: t.currentTarget.dataset.clid
        });
    },
    //菜单跳转
    goto: function(t) {
        wx.navigateTo({
            url: "/pages/search/list?key=&status=1&rid=" + t.currentTarget.dataset.rid + "&ValueIDS=" + t.currentTarget.dataset.valueid + "&title=" + t.currentTarget.dataset.key
        });
    },
    //获取底部工具栏红点
    GetQty: function(t) {
        wx.getStorageSync("token") && a.httppost("pinhuocart/GetMenuRedPoint", {}, function(t) {
            t.Result && (t.Data.CartItemQty > 0 && (t.Data.CartItemQty = t.Data.CartItemQty + "", 
            wx.setTabBarBadge({
                index: 2,
                text: t.Data.CartItemQty
            })), wx.getStorageSync("TopicID") == t.Data.TopicID || wx.showTabBarRedDot({
                index: 9
            }));
        }, "GET");
    }
});
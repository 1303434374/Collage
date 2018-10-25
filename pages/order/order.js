var t = require("../../utils/imgutil.js"), a = require("../../utils/httputil.js"), e = (require("../../utils/common.js"), 
getApp());

Page({
    data: {
        items: [ {
            item: "全部",
            id: 0
        }, {
            item: "待支付",
            id: 1
        }, {
            item: "待发货",
            id: 2
        }, {
            item: "待收货",
            id: 3
        }, {
            item: "已完成",
            id: 4
        }, {
            item: "取消/关闭",
            id: 5
        } ],
        lists: [],
        currNav: 1,
        pageIndex: 1,
        scrollLeft: 0,
        flag: !0,
        keyword: ""
    },
    onLoad: function(t) {
        var a = this;
        t.id && (this.data.currNav = t.id), 4 == this.data.currNav ? this.data.scrollLeft = 178 : 5 == this.data.currNav ? this.data.scrollLeft = 265 : 6 == this.data.currNav || -1 == this.data.currNav ? this.data.scrollLeft = 277 : this.data.scrollLeft = 0, 
        a.setData({
            scrollLeft: this.data.scrollLeft,
            currNav: this.data.currNav
        }), a.init();
    },
    changetitle: function(t) {
        t.target.dataset.id !== this.data.currNav && (4 == t.target.dataset.id ? this.data.scrollLeft = 178 : 5 == t.target.dataset.id ? this.data.scrollLeft = 265 : 6 == t.target.dataset.id || -1 == t.target.dataset.id ? this.data.scrollLeft = 277 : this.data.scrollLeft = 0, 
        this.setData({
            currNav: t.target.dataset.id,
            pageIndex: 1,
            lists: [],
            scrollLeft: this.data.scrollLeft
        }), this.init());
    },
    init: function() {
        var i = this, s = {
            StatuID: i.data.currNav,
            pageIndex: i.data.pageIndex,
            pageSize: 20,
            keyword: i.data.keyword
        };
        i.data.flag = !1, e.showLoading("数据请求中"), a.httppost("pinhuoBuyer/GetOrderListV5", s, function(a) {
            console.log('订单列表=')
            console.log(a)
            i.data.notice = a.Data.Notice, a.Data.OrderList.map(function(a) {
                a.imglist = [], a.Images.map(function(e) {
                    a.imglist.push(t.getUrl(e, 300));
                });
            }), 20 == a.Data.OrderList.length ? (i.data.pageIndex++, i.data.flag = !0) : i.data.flag = !1, 
            i.data.lists = i.data.lists.concat(a.Data.OrderList), i.setData({
                lists: i.data.lists,
                notice: i.data.notice
            });
        }, "GET");
    },
    detail: function(t) {
        wx.navigateTo({
            url: "/pages/order/orderdetail?id=" + t.currentTarget.dataset.item
        });
    },
    payment: function(t) {
        var i = this, s = i.data.lists[t.currentTarget.dataset.idx];
        "买家支付" == t.currentTarget.dataset.action ? wx.navigateTo({
            url: "/pages/order/orderpay?money=" + s.PayableAmount + "&orderids=" + s.OrderIDS + "&itemids="
        }) : "买家取消" == t.currentTarget.dataset.action ? wx.showModal({
            title: "",
            content: "是否确认取消订单",
            success: function(t) {
                t.confirm && (e.showLoading(""), a.httppostmore("pinhuoBuyer/orderv2/Cancel", {
                    id: s.ID
                }, function(t) {
                    t.Result ? wx.showModal({
                        title: "",
                        content: "成功取消订单",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && (i.data.pageIndex = 1, i.data.notice = "", i.data.lists = [], i.init());
                        }
                    }) : wx.showModal({
                        title: "",
                        content: t.Message,
                        showCancel: !1
                    });
                }, "POST"));
            }
        }) : "一键加入购物车" == t.currentTarget.dataset.action ? (e.showLoading(""), a.httppostmore("pinhuocart/AddItemFromOrder", {
            id: s.ID
        }, function(t) {
            t.Result ? wx.showModal({
                title: "已经添加成功啦！",
                content: "此笔订单的商品已经全部添加到拿货车了。您可以在拿货车对商品编辑后重新下单",
                cancelText: "关闭",
                confirmText: "拿货车",
                success: function(t) {
                    t.confirm && wx.switchTab({
                        url: "/pages/car/car"
                    });
                }
            }) : wx.showModal({
                title: "",
                content: t.Message,
                showCancel: !1,
                success: function(t) {}
            });
        }, "POST")) : "买家确认收货" == t.currentTarget.dataset.action && wx.showModal({
            title: "",
            content: "确认已收齐发货的商品了，确认后状态将变成“已完结”",
            cancelText: "取消",
            confirmText: "确认签收",
            success: function(t) {
                t.confirm && (e.showLoading("签收中"), a.httppostmore("pinhuoBuyer/orderv2/ComfirmReceipt", {
                    id: s.ID
                }, function(t) {
                    wx.showModal({
                        title: "",
                        content: t.Message,
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && t.Result && (i.data.pageIndex = 1, i.data.notice = "", i.data.lists = [], 
                            i.init());
                        }
                    });
                }, "POST"));
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), e.showLoading("");
        var t = this;
        setTimeout(function() {
            t.data.pageIndex = 1, t.data.notice = "", t.data.lists = [], t.init();
        }, 2e3);
    },
    onReachBottom: function() {
        this.data.flag && this.init();
    },
    search: function(t) {
        this.data.keyword = t.detail.value.key, this.setData({
            pageIndex: 1,
            lists: []
        }), this.init();
    }
});
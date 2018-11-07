var a = require("../../utils/httputil.js"), t = getApp(), we7 = t.globalData.we7;

Page({
    data: {
        arrlist: [],
        url: "",
        dataurl: "",
        urldata: ""
    },
    onLoad: function(a) {
        this.setData({
            we7: we7 
        })
        a && this.setData({
            url: a.url,
            dataurl: a.url,
            urldata: a.data,
            quickPay: a.quickPay
        }), this.init();
    },
    init: function() {
        var r = this;
        if (we7) {
            t.showLoading("加载中"), a.http_post("MyAddress", {
                uid: wx.getStorageSync('u_id')
            }, function(a) {
                console.log('微擎获取收货地址列表=')
                console.log(a)
                r.setData({
                    arrlist: a.Data
                });
            });
        } else {
            t.showLoading("加载中"), a.httppost("shop/address/GetAddresses", {}, function(a) {
                console.log('获取收货地址列表=')
                console.log(a)
                r.setData({
                    arrlist: a.Data
                });
            }, "GET");
        }
    },
    navclick: function(t) {
        if (we7) {
            var r = this, d = {
                uid: wx.getStorageSync('u_id'),
                ID: t.currentTarget.dataset.id,
                realName: t.currentTarget.dataset.realname,
                mobile: t.currentTarget.dataset.mobile,
                areaId: t.currentTarget.dataset.areaid,
                address: t.currentTarget.dataset.address,
                isDefault: !0
            };
            a.http_post("UpdAddress", d, function(a) {
                console.log('微擎更新收货地址=')
                console.log(a)
                console.log(r.data.url), console.log(r.data.urldata), r.data.url && r.data.urldata ? wx.redirectTo({
                    url: r.data.dataurl + "?data=" + r.data.urldata + "&quickPay=" + r.data.quickPay
                }) : wx.navigateTo({
                    url: "/pages/address/addresslist"
                });
            });
        } else {
            var r = this, d = {
                ID: t.currentTarget.dataset.id,
                realName: t.currentTarget.dataset.realname,
                mobile: t.currentTarget.dataset.mobile,
                areaId: t.currentTarget.dataset.areaid,
                address: t.currentTarget.dataset.address,
                isDefault: !0
            };
            a.httppost("shop/address/update", d, function(a) {
                console.log(r.data.url), console.log(r.data.urldata), r.data.url && r.data.urldata ? wx.redirectTo({
                    url: r.data.dataurl + "?data=" + r.data.urldata + "&quickPay=" + r.data.quickPay
                }) : wx.navigateTo({
                    url: "/pages/address/addresslist"
                });
            }, "GET");
        }
    },
    navadd: function() {
        var a = this;
        wx.redirectTo({
            url: "/pages/address/addressAdd?data=" + a.data.urldata + "&url=" + a.data.url + "&flagadd=true&quickPay=" + a.data.quickPay
        });
    },
    revamp: function(a) {
        var t = a.currentTarget.dataset;
        if (we7) {
            wx.redirectTo({
                url: "/pages/address/addressAdd?id=" + t.id + "&areaid=" + t.areaid + "&mobile=" + t.mobile + "&realname=" + t.realname + "&address=" + t.address + "&isdefault=" + t.isdefault + "&url=" + this.data.dataurl + "&data=" + this.data.urldata
            });
        } else {
            wx.redirectTo({
                url: "/pages/address/addressAdd?id=" + t.id + "&area=" + t.area + "&areaid=" + t.areaid + "&mobile=" + t.mobile + "&realname=" + t.realname + "&address=" + t.address + "&url=" + this.data.dataurl + "&data=" + this.data.urldata
            });
        }
    },
    del: function(r) {
        if (we7) {
            var d = this;
            var e = r.currentTarget.dataset;
            wx.showModal({
                title: "",
                content: "确定要删除这个收货地址吗？",
                confirmText: "再想想",
                cancelText: "确定",
                success: function(s) {
                    if (!s.confirm) {
                        t.showLoading("删除中");
                        a.http_post("DelAdd", {
                            ID: e.id,
                            uid: wx.getStorageSync('u_id')
                        }, function(a) {
                            console.log('微擎删除收货地址=')
                            console.log(a)
                            d.init();
                        }, "GET");
                    }
                }
            });
        } else {
            var d = this;
            t.showLoading("删除中");
            var e = r.currentTarget.dataset;
            a.httppost("shop/address/delete", {
                ID: e.id
            }, function(a) {
                d.init();
            }, "GET");
        }
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});
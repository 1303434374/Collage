var a = require("../../utils/httputil.js"), t = getApp();

Page({
    data: {
        arrlist: [],
        url: "",
        dataurl: "",
        urldata: ""
    },
    onLoad: function(a) {
        a && this.setData({
            url: a.url,
            dataurl: a.url,
            urldata: a.data,
            quickPay: a.quickPay
        }), this.init();
    },
    init: function() {
        var r = this;
        t.showLoading("加载中"), a.httppost("shop/address/GetAddresses", {}, function(a) {
            r.setData({
                arrlist: a.Data
            });
        }, "GET");
    },
    navclick: function(t) {
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
    },
    navadd: function() {
        var a = this;
        wx.redirectTo({
            url: "/pages/address/addressAdd?data=" + a.data.urldata + "&url=" + a.data.url + "&flagadd=true&quickPay=" + a.data.quickPay
        });
    },
    revamp: function(a) {
        var t = a.currentTarget.dataset;
        wx.redirectTo({
            url: "/pages/address/addressAdd?id=" + t.id + "&area=" + t.area + "&areaid=" + t.areaid + "&mobile=" + t.mobile + "&realname=" + t.realname + "&address=" + t.address + "&url=" + this.data.dataurl + "&data=" + this.data.urldata
        });
    },
    del: function(r) {
        var d = this;
        t.showLoading("删除中");
        var e = r.currentTarget.dataset;
        a.httppost("shop/address/delete", {
            ID: e.id
        }, function(a) {
            d.init();
        }, "GET");
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});
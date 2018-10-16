var e = getApp(), t = require("../../utils/httputil.js");

Page({
    data: {
        classfity: [ {
            id: 1,
            item: "档口/品牌"
        }, {
            id: 2,
            item: "类目"
        } ],
        curNav: 1,
        HotBrands: [],
        HotKeywords: [],
        keyarr: [],
        SearchKeywords: [],
        HotCategroys: [],
        key: "",
        keyvalue: "",
        listkey: [],
        placehoder: "档口/品牌"
    },
    onLoad: function() {
        var e = wx.getStorageSync("keyword");
        e ? this.data.keyarr = e.key : wx.setStorageSync("keyword", {
            key: []
        });
        var a = this;
        t.httppost("shop/agent/getitemhotkeyword", {
            userIDs: -1,
            fromType: 3,
            version: 2
        }, function(e) {
            a.setData({
                HotBrands: e.Data.HotBrands,
                HotKeywords: e.Data.HotKeyWords,
                SearchKeywords: e.Data.SearchKeywords,
                HotCategroys: e.Data.HotCategroys,
                keyarr: a.data.keyarr
            });
        }, "GET");
    },
    change: function(e) {
        this.setData({
            curNav: e.target.dataset.id,
            placehoder: e.target.dataset.item
        });
    },
    submit: function(t) {
        if ("" == t.detail.value.key) return e.showToast("搜索内容不能为空"), !1;
        var a = wx.getStorageSync("keyword");
        a.key.unshift(t.detail.value.key), a.key = this.unique(a.key), wx.setStorageSync("keyword", a), 
        this.setData({
            keyarr: a.key
        }), wx.navigateTo({
            url: "/pages/search/list?key=" + t.detail.value.key + "&status=0"
        });
    },
    clear: function() {
        wx.setStorageSync("keyword", {
            key: []
        }), this.setData({
            keyarr: []
        });
    },
    select: function(e) {
        var t = wx.getStorageSync("keyword");
        t.key.unshift(e.target.dataset.id), t.key = this.unique(t.key), wx.setStorageSync("keyword", t), 
        this.setData({
            keyarr: t.key
        }), wx.navigateTo({
            url: "/pages/search/list?key=" + e.target.dataset.id
        });
    },
    unique: function(e) {
        for (var t = [], a = 0; a < e.length; a++) -1 == t.indexOf(e[a]) && t.push(e[a]);
        return t;
    },
    searchKey: function(e) {
        var t = this;
        if (this.data.listkey.length = 0, "" != e.detail.value) {
            var a = new RegExp(e.detail.value, "i");
            this.data.SearchKeywords.map(function(e) {
                -1 !== e.search(a) && t.data.listkey.push(e);
            }), this.setData({
                listkey: this.data.listkey
            });
        }
    },
    choosekey: function(e) {
        this.setData({
            keyvalue: e.currentTarget.dataset.key,
            listkey: []
        });
    }
});
var a = getApp(), e = (require("../../utils/timeutil.js"), require("../../utils/httputil.js")), t = (require("../../utils/md5util.js"), 
require("../../utils/common.js"));

Page({
    data: {
        orderids: "",
        money: 0,
        itemids: "",
        ispayflag: !0,
        isopenyue: 1,
        enough: !0,
        isbindcellphone: 1,
        mobile: "",
        isanswer: 1
    },
    onLoad: function(t) {
        var i = this;
        a.setTitle("提交成功"), wx.getSystemInfo({
            success: function(a) {
                i.data.money = t.money, i.data.orderids = t.orderids, i.data.itemids = t.itemids;
            }
        }), a.showLoading("数据加载中"), e.httppost("pay/Account/GetBalance4PinHuo", {}, function(a) {
            i.data.isopenyue = a.Data.userpaymentstatus, i.data.enough = a.Data.balance - i.data.money >= 0, 
            i.data.isbindcellphone = a.Data.userpaymentbindcellphone, i.data.mobile = a.Data.mobile, 
            wx.setStorageSync("paymobile", i.data.mobile), i.data.isanswer = a.Data.isanswer, 
            i.setData({
                balance: a.Data.balance,
                IsweixinCheck: !0,
                money: i.data.money,
                isshowyue: a.Data.balance > 0,
                restmoney: (a.Data.balance - i.data.money).toFixed(2),
                restmoney1: (i.data.money - a.Data.balance).toFixed(2),
                isshowdialog: !1,
                enough: i.data.enough
            });
        });
    },
    checkboxChange: function(a) {
        var e = this;
        0 == a.detail.value.length ? e.data.ispayflag = !0 : e.data.ispayflag = !1;
    },
    settlesubmit: function() {
        var e = this;
        e.data.ispayflag ? (a.showLoading("支付加载中"), e.paysumbit(e.data.orderids, e.data.money)) : e.data.enough ? 1 != e.data.isopenyue ? wx.showModal({
            title: "",
            content: "为了您的资金安全，使用余额全额支付前需要先设置支付密码，是否现在开通衣付通余额付款功能？",
            confirmText: "开通",
            success: function(a) {
                a.confirm && (1 != e.data.isbindcellphone ? wx.redirectTo({
                    url: "/pages/yft/open"
                }) : wx.redirectTo({
                    url: "/pages/yft/setpassword?mobile=" + e.data.mobile
                }));
            }
        }) : e.setData({
            isshowdialog: !0
        }) : (a.showToast("支付加载中"), e.paysumbit(e.data.orderids, e.data.restmoney1));
    },
    inputpasswold: function(e) {
        var i = this, o = e.detail.value.code;
        a.showLoading("支付加载中"), t.payment4yue(i.data.orderids, i.data.money, o, i.data.itemids);
    },
    setpassword: function() {
        1 == this.data.isanswer ? wx.redirectTo({
            url: "/pages/pinhuo/reply"
        }) : wx.redirectTo({
            url: "/pages/yft/answer"
        });
    },
    cancle: function() {
        this.setData({
            isshowdialog: !1
        });
    },
    paysumbit: function(a, e) {
        t.payment(a, e, this.data.itemids);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
var a = getApp(), e = (require("../../utils/timeutil.js"), require("../../utils/httputil.js")), t = (require("../../utils/md5util.js"), 
require("../../utils/common.js")), we7 = a.globalData.we7;

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
        this.setData({
            we7: we7 
        })
        console.log('传给支付=')
        console.log(t)
        if (we7) {
            this.setData({
                IsweixinCheck: !0,
                money: t.money,
                orderid: t.orderid
            })
        } else {
            var i = this;
            a.setTitle("提交成功"), wx.getSystemInfo({
                success: function(a) {
                    i.data.money = t.money, i.data.orderids = t.orderids, i.data.itemids = t.itemids;
                }
            })
            a.showLoading("数据加载中")
            e.httppost("pay/Account/GetBalance4PinHuo", {}, function(a) {
                console.log('获取余额=')
                console.log(a)
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
        }
    },
    checkboxChange: function(a) {
        var e = this;
        0 == a.detail.value.length ? s.ispayflag = !0 : s.ispayflag = !1;
    },
    settlesubmit: function() {
        if (we7) {
            var e = this;
            a.showLoading("支付加载中"), e.we7_pay()
        } else {
            var e = this;
            s.ispayflag ? (a.showLoading("支付加载中"), e.paysumbit(s.orderids, s.money)) : s.enough ? 1 != s.isopenyue ? wx.showModal({
                title: "",
                content: "为了您的资金安全，使用余额全额支付前需要先设置支付密码，是否现在开通衣付通余额付款功能？",
                confirmText: "开通",
                success: function(a) {
                    a.confirm && (1 != s.isbindcellphone ? wx.redirectTo({
                        url: "/pages/yft/open"
                    }) : wx.redirectTo({
                        url: "/pages/yft/setpassword?mobile=" + s.mobile
                    }));
                }
            }) : e.setData({
                isshowdialog: !0
            }) : (a.showToast("支付加载中"), e.paysumbit(s.orderids, s.restmoney1));
        }
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
    we7_pay: function (orderid,money) {
        let n = {
            openid: wx.getStorageSync('openid'),
            orderid: this.data.orderid,
            money: this.data.money
        }
        console.log('微擎支付提交=')
        console.log(n)
        e.http_post('doPay', n , (s) => {
            console.log('微擎支付返回=')
            console.log(s)
            wx.requestPayment({
                timeStamp: s.timeStamp,
                nonceStr: s.nonceStr,
                package: s.package,
                signType: s.signType,
                paySign: s.paySign,
                success: function(r) {
                    console.log('支付成功=')
                    console.log(r)
                    wx.redirectTo({
                        url: "/pages/success/success?money=" + n.money + "&payway=微信支付"
                    });
                },
                fail: function(e) {
                    console.log('支付失败=')
                    console.log(e)
                    wx.redirectTo({
                        url: "/pages/order/order?id=0"
                    });
                }
            });
        })
    },
    saveFormId: function (v) {
        if (v.detail.formId != 'the formId is a mock one') {
            e.http_post('AddFormId', {
                user_id: wx.getStorageSync('u_id'),
                form_id: v.detail.formId
            }, (s) => {
                console.log(s)
            })
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
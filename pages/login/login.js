var t = require("../../utils/httputil.js"), e = getApp();

Page({
    data: {
        cont: 59,
        disabled: !1,
        status: 2
    },
    onLoad: function(t) {
        t.itemdetail ? this.data.itemdetail = t.itemdetail : t.qsid && (this.data.qsid = t.qsid);
    },
    formBindsubmit: function(a) {
        if (1 == this.data.status) {
            if ("" == a.detail.value.account.length) return void e.showToast("用户名不为空！");
            if ("" == a.detail.value.password.length) return void e.showToast("密码不为空！");
        } else {
            if ("" == a.detail.value.account.length) return void e.showToast("手机号不能为空");
            if ("" == a.detail.value.mobileCode) return void e.showToast("验证码不能为空");
        }
        e.showLoading("登陆中");
        var i = {
            account: a.detail.value.account,
            password: a.detail.value.password || "",
            mobileCode: a.detail.value.mobileCode || "",
            typeID: 1,
            key: wx.getStorageSync("wxkey"),
            loginFrom: 4
        }, o = this;
        t.httppostmore("user/user/login", i, function(e) {
            console.log('登录信息=')
            console.log(e)
            if (e.Result) {
                if (wx.setStorageSync("token", "Bearer " + e.Data.Token), wx.setStorageSync("account", e.Data.UserName), 
                wx.setStorageSync("userid", e.Data.UserID), wx.getStorageSync("loginflag") || t.httppost("buyertool/eccbuyer/assigneccbuyer", {}, function(t) {
                    wx.setStorageSync("loginflag", !0);
                }), o.data.itemdetail) return wx.redirectTo({
                    url: "/pages/pinhuo/itemdetail?id=" + o.data.itemdetail
                }), !1;
                if (o.data.qsid) return wx.redirectTo({
                    url: "/pages/pinhuo/pinhuodetail?qsid=" + o.data.qsid
                }), !1;
                wx.switchTab({
                    url: "/pages/nahuomain/main"
                });
            } else wx.showModal({
                title: "",
                content: e.Message,
                showCancel: !1
            });
        }, "POST");
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    forget: function() {
        wx.navigateTo({
            url: "/pages/login/forget"
        });
    },
    goindex: function() {
        wx.switchTab({
            url: "/pages/nahuomain/main"
        });
    },
    mobile: function(t) {
        this.data.mobile = t.detail.value;
    },
    getcode: function() {
        this.getcodeM(1);
    },
    getyuyin: function() {
        this.getcodeM(2);
    },
    getcodeM: function(a) {
        var i = this;
        if (!/^1\d{10}$/.test(this.data.mobile)) return wx.showToast({
            title: "请输入正确格式手机号",
            icon: "success"
        }), !1;
        e.showLoading("正在发送验证码");
        var o = {
            mobile: i.data.mobile,
            useFor: "loginOrRegister",
            messageFrom: "天天拼货团",
            smsType: a
        };
        t.httppost("user/user/GetMobileVerifyCode2", o, function(t) {
            if (1 == a) {
                i.setData({
                    disabled: !0
                });
                var e = setInterval(function() {
                    i.data.cont = i.data.cont - 1, i.data.cont <= 0 ? (clearInterval(e), i.setData({
                        cont: 59,
                        disabled: !1
                    })) : i.setData({
                        disabled: !0,
                        cont: i.data.cont
                    });
                }, 1e3);
            }
        }, "POST");
    },
    onReachBottom: function() {},
    changeStatus: function(t) {
        1 == this.data.status ? this.setData({
            status: 2
        }) : this.setData({
            status: 1
        });
    }
});
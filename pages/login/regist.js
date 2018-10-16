var e = require("../../utils/httputil.js"), t = getApp();

Page({
    data: {
        cont: 59,
        disabled: !1
    },
    onLoad: function(e) {},
    mobile: function(e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    getcode: function(a) {
        var o = this;
        if (!/^1\d{10}$/.test(this.data.mobile)) return wx.showToast({
            title: "请输入正确格式手机号",
            icon: "success"
        }), !1;
        t.showLoading("正在发送验证码");
        var s = {
            mobile: o.data.mobile,
            useFor: "register",
            messageFrom: "天天拼货团"
        };
        e.httppost("user/user/GetMobileVerifyCode2", s, function(e) {
            wx.showToast({
                title: e.Message,
                mask: !0
            }), o.setData({
                disabled: !0
            });
            var t = setInterval(function() {
                o.data.cont = o.data.cont - 1, o.data.cont <= 0 ? (clearInterval(t), o.setData({
                    cont: 59,
                    disabled: !1
                })) : o.setData({
                    disabled: !0,
                    cont: o.data.cont
                });
            }, 1e3);
        }, "POST");
    },
    formBindsubmit: function(a) {
        if (!/^1\d{10}$/.test(a.detail.value.account)) return wx.showToast({
            title: "请输入正确格式手机号",
            icon: "success",
            mask: !0
        }), !1;
        if ("" == a.detail.value.code) return wx.showToast({
            title: "请输入验证码",
            icon: "success",
            mask: !0
        }), !1;
        if (a.detail.value.password.length < 5) return wx.showToast({
            title: "密码长度最少6位",
            icon: "success",
            mask: !0
        }), !1;
        var o = {
            mobile: a.detail.value.account,
            password: a.detail.value.password,
            code: a.detail.value.code,
            regFrom: 4,
            typeID: 1,
            key: wx.getStorageSync("wxkey")
        };
        t.showLoading("注册中"), e.httppost("user/user/Register2", o, function(e) {
            wx.setStorageSync("token", "Bearer " + e.Data.Token), wx.setStorageSync("account", e.Data.UserName), 
            wx.setStorageSync("userid", e.Data.UserID), wx.request({
                url: "https://api2.nahuo.com/v3/shop/shop/register",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: e.Data.Token
                },
                data: {
                    name: e.Data.UserName,
                    code: "",
                    mobile: a.detail.value.account,
                    qq: "",
                    qq_name: "",
                    wx: "",
                    wx_name: ""
                },
                success: function(e) {
                    console.log(e);
                },
                fail: function(e) {
                    console.log(e);
                },
                complete: function(e) {
                    if (wx.showToast({
                        title: "注册成功",
                        icon: "success"
                    }), wx.getStorageSync("itemdetail")) {
                        var t = wx.getStorageSync("itemdetail");
                        return wx.removeStorageSync("itemdetail"), wx.redirectTo({
                            url: "/pages/pinhuo/itemdetail?id=" + t
                        }), !1;
                    }
                    wx.switchTab({
                        url: "/pages/nahuomain/main"
                    });
                }
            });
        }, "POST");
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});
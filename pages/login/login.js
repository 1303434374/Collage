var t = require("../../utils/httputil.js"), e = getApp(), we7 = e.globalData.we7;

Page({
    data: {
        cont: 59,
        disabled: !1,
        status: 2,
        we7: !1,
        mobile: '',
        smsmobile: '',
        smscode: ''
    },
    onLoad: function(t) {
        if (we7) {
            this.setData({
                we7: !0,
                status: 1 
            })
        }
        t.itemdetail ? this.data.itemdetail = t.itemdetail : t.qsid && (this.data.qsid = t.qsid);
    },
    formBindsubmit: function(a) {
        if (1 == this.data.status) {
            if ("" == a.detail.value.account.length) return void e.showToast("用户名不为空！");
            if ("" == a.detail.value.password.length) return void e.showToast("密码不为空！");
        } else {
            if(we7){
                if ("" == a.detail.value.account.length) return void e.showToast("手机不能为空");
                if ("" == a.detail.value.password.length) return void e.showToast("密码不能为空！");
                if (6 > a.detail.value.password.length) return void e.showToast("密码不小于6位！");
                if ("" == a.detail.value.mobileCode) return void e.showToast("验证码不能为空");
                if (this.data.smsmobile != a.detail.value.account) return void e.showToast("验证码不符！");
                if (this.data.smscode != a.detail.value.mobileCode) return void e.showToast("验证码错误！");
            }else{
                if ("" == a.detail.value.account.length) return void e.showToast("手机号不能为空");
                if ("" == a.detail.value.mobileCode) return void e.showToast("验证码不能为空");
            }
        }
        if (we7) {
            if (1 == this.data.status) {
                this.we7_login(a.detail.value.account,a.detail.value.password)
            } else {
                t.http_post("RegorFind", {
                    phone: a.detail.value.account,
                    psw: a.detail.value.password
                }, (e) => {
                    console.log('注册信息=')
                    console.log(e)
                    if (e.code) {
                        this.we7_login(a.detail.value.account,a.detail.value.password)
                    } else {
                        wx.showToast({
                            title: "注册失败",
                            icon: "none"
                        })
                    }
                })
            }
        } else {
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
        }
    },
    we7_login: function (phone,psw) {
        wx.showLoading()
        t.http_post("Login", {
            phone: phone,
            psw: psw
        }, (e) => {
            console.log('登录信息=')
            console.log(e)
            if (e.code) {
                wx.login({
                    success(s) {
                        console.log(s)
                        t.http_post("Openid", {
                            code: s.code
                        }, (ss) => {
                            console.log(ss)
                            t.http_post("Savaopenid", {
                                openid: ss.openid,
                                uid: e.info.u_id
                            }, (sss) => {
                                console.log(sss)
                                wx.setStorageSync("u_id", e.info.u_id) 
                                wx.setStorageSync("openid", e.info.openid) 
                                wx.switchTab({
                                    url: "/pages/nahuomain/main"
                                }); 
                            });
                        });
                    }
                })  
            } else {
                wx.showToast({
                    title: "登录失败",
                    icon: "none"
                })
            }                             
        })
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
        if (we7) {
            t.http_post("Smscode", {
                tel: i.data.mobile
            }, (e) => {
                console.log('验证码信息=')
                console.log(e)
                i.setData({
                    disabled: !0,
                    smsmobile: i.data.mobile,
                    smscode: e.data.code
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
            })
        } else {
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
        }
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
var t = getApp(), a = (require("../../utils/timeutil.js"), require("../../utils/httputil.js")), e = require("../../utils/imgutil.js"), s = require("../../utils/messageutil.js"), i = (require("../../utils/common.js"), 
require("../../wxParse/wxParse.js")), we7 = t.globalData.we7;

Page({
    data: {
        actionSheetHidden: !0,
        isEnabled: !0,
        IsFavorite: !1,
        carflag: !0,
        flagdrag: !0,
        fristindex: 0,
        newtips: "立即拼了",
        numflag: !1,
        StallID: 0,
        globalData: {
            flag1: !1
        },
        choose: [],
        CarNum: 0
    },
    onLoad: function(t) {
        console.log(t)
        this.setData({
            we7: we7
        })
        var a = decodeURIComponent(t.scene);
        a && a.split("&").map(function(a) {
            "i" == a.slice(0, 1) ? t.id = a.slice(1) : "k" == a.slice(0, 1) ? t.key = a.slice(1) : "t" == a.slice(0, 1) && (t.tag = a.slice(1));
        });
        var e = this, s = {
            from: 4
        };
        e.data.ItemId = t.id, wx.showShareMenu && wx.showShareMenu({
            withShareTicket: !0
        }), wx.getSystemInfo({
            success: function(t) {
                e.data.height = t.windowHeight;
            }
        }), wx.getStorageSync("token") && (e.data.flagdrag = !0), t.qsid ? (s.qsid = t.qsid, 
        s.id = t.id) : s.id = t.id, e.data.options = t, e.data.obj = s;
    },
    onShow: function() {},
    onReady: function() {
        console.log(this.data.obj)
        this.init(this.data.options, this.data.obj);
    },
    //获取商品详情
    init: function(o, n) {
        var l = this;
        t.showLoading("页面加载中...")
        if (we7) {
            a.http_post("getdetailgood", {
                gID: o.id,
                uid: wx.getStorageSync('u_id')
            }, (n) => {
                if (n.Data) {
                    console.log('微擎商品详情=')
                    console.log(n)
                    var d = 0;
                    n.Data.DisplayStatu, n.Data.ItemStatu;
                    n.Data.Products.map(function(t) {
                        t.SizeList.map(function(t) {
                            t.qty = 0, d += t.Stock;
                        });
                    }), l.data.ButtomSmallButtons = [ {
                        title: "首页",
                        action: "首页",
                        isPoint: !1,
                        isEnable: !0,
                        type: "button"
                    } ], n.Data.ButtomSmallButtons.map(function(t) {
                        "分享" == t.action ? t.isEnable = !1 : l.data.ButtomSmallButtons.push(t);
                    }),
                    //  n.Data.coverurl = e.getUrl(n.Data.Cover, 200), 
                    l.data.newimages = n.Data.Images.slice(0, 5)
                     t.setTitle(n.Data.Name), l.setData({
                        coverurl: n.Data.Cover,
                        IsFavorite: n.Data.IsFavorite,
                        height: l.data.height,
                        ItemId: l.data.ItemId,
                        // StallID: n.Data.StallID,
                        newimages: l.data.newimages,
                        name: n.Data.Name,
                        Tags: n.Data.Tags,
                        Price: n.Data.Price,
                        Discount: n.Data.Discount,
                        OriPrice: n.Data.OriPrice,
                        // BuyerShopUrl: 0 == n.Data.BuyerShopID ? "" : "https://api2.nahuo.com/v3/shop/logo/uid/" + n.Data.BuyerShopID,
                        // BuyerShopID: n.Data.BuyerShopID,
                        // BuyerShopName: n.Data.BuyerShopName,
                        Activity: n.Data.Activity,
                        message: s.showtips(n.Data.Activity.TransCount, n.Data.Activity.ChengTuanCount),
                        message1: s.showchengtuantiops(n.Data.Activity.TransCount, n.Data.Activity.ChengTuanCount),
                        Products: n.Data.Products,
                        // StallsName: n.Data.StallsName,
                        // Propertys: n.Data.Propertys,
                        detailImages: n.Data.Images,
                        Videos: n.Data.Videos,
                        stopheight: .8 * Number(l.data.height) - 210,
                        newtips: "",
                        globalData: t.globalData,
                        ButtomBigButtons: n.Data.ButtomBigButtons,
                        ButtomSmallButtons: l.data.ButtomSmallButtons,
                        Color: n.Data.Color,
                        Size: n.Data.Size,
                        endmsg: n.Data.endmsg,
                        preendmsg: n.Data.preendmsg,
                        sendaddress: n.Data.sendaddress
                    })
                }
            })
        } else {
            a.httppost("pinhuoitem/detail2", n, function(n) {
                console.log('商品详情=')
                console.log(n)
                o.key && a.httppostmore("shop/wx/SaveWxItemStatistics", {
                    Key: o.key,
                    OpenID: wx.getStorageSync("openid"),
                    QsID: n.Data.Activity.QsID,
                    ItemID: o.id,
                    tag: o.tag
                }, function(t) {}, "POST"), l.data.newimages = n.Data.Images.slice(0, 5).map(function(t) {
                    return {
                        url: e.getUrl(t, 1e3)
                    };
                }), l.data.detailImages = n.Data.Images.map(function(t) {
                    return {
                        url: e.getUrl(t, 1e3)
                    };
                }), n.Data.Products.map(function(t) {
                    t.ColorPic = e.getUrl(t.ColorPic, 200);
                });
                var d = 0;
                n.Data.DisplayStatu, n.Data.ItemStatu;
                n.Data.Products.map(function(t) {
                    t.SizeList.map(function(t) {
                        t.qty = 0, d += t.Stock;
                    });
                }), l.data.ButtomSmallButtons = [ {
                    title: "首页",
                    action: "首页",
                    isPoint: !1,
                    isEnable: !0,
                    type: "button"
                } ], n.Data.ButtomSmallButtons.map(function(t) {
                    "分享" == t.action ? t.isEnable = !1 : l.data.ButtomSmallButtons.push(t);
                }), n.Data.coverurl = e.getUrl(n.Data.Cover, 200), t.setTitle(n.Data.Name), l.setData({
                    coverurl: n.Data.coverurl,
                    IsFavorite: n.Data.IsFavorite,
                    height: l.data.height,
                    ItemId: l.data.ItemId,
                    StallID: n.Data.StallID,
                    newimages: l.data.newimages,
                    name: n.Data.Name,
                    Tags: n.Data.Tags,
                    Price: n.Data.Price,
                    Discount: n.Data.Discount,
                    OriPrice: n.Data.OriPrice,
                    BuyerShopUrl: 0 == n.Data.BuyerShopID ? "" : "https://api2.nahuo.com/v3/shop/logo/uid/" + n.Data.BuyerShopID,
                    BuyerShopID: n.Data.BuyerShopID,
                    BuyerShopName: n.Data.BuyerShopName,
                    Activity: n.Data.Activity,
                    message: s.showtips(n.Data.Activity.TransCount, n.Data.Activity.ChengTuanCount),
                    message1: s.showchengtuantiops(n.Data.Activity.TransCount, n.Data.Activity.ChengTuanCount),
                    Products: n.Data.Products,
                    StallsName: n.Data.StallsName,
                    Propertys: n.Data.Propertys,
                    detailImages: l.data.detailImages,
                    Videos: n.Data.Videos,
                    stopheight: .8 * Number(l.data.height) - 210,
                    newtips: "",
                    globalData: t.globalData,
                    ButtomBigButtons: n.Data.ButtomBigButtons,
                    ButtomSmallButtons: l.data.ButtomSmallButtons
                }), i.wxParse("DescriptionHead", "html", n.Data.DescriptionHead, l);
            }, "GET"), wx.getStorageSync("token") && a.httppost("pinhuocart/GetTotalQty", {}, function(t) {
                l.setData({
                    CarNum: t.Data.TotalQty
                });
            }, "GET");
        }
    },
    //收藏功能
    collect: function() {
        var e = this;
        if (we7) {
          this.data.flagdrag ? this.data.IsFavorite ? (t.showLoading("取消收藏"), a.http_post("Dolike", {
                id: e.data.ItemId,
                uid: wx.getStorageSync('u_id')
            }, function(t) {
                e.setData({
                    IsFavorite: !1
                }), wx.showToast({
                    title: "取消收藏成功",
                    icon: "success",
                    mask: !0
                });
            })) : (t.showLoading("收藏中..."), a.http_post("Dolike", {
                id: e.data.ItemId,
                uid: wx.getStorageSync('u_id')
            }, function(t) {
                e.setData({
                    IsFavorite: !0
                }), wx.showToast({
                    title: "收藏成功",
                    icon: "success",
                    mask: !0
                });
            })) : (this.data.globalData.flag1 = !0, this.setData({
                globalData: this.data.globalData
            }));
        } else {
            this.data.flagdrag ? this.data.IsFavorite ? (t.showLoading("取消收藏"), a.httppost("shop/agent/RemoveItemFromMyFavorite", {
                id: e.data.ItemId
            }, function(t) {
                e.setData({
                    IsFavorite: !1
                }), wx.showToast({
                    title: "取消收藏成功",
                    icon: "success",
                    mask: !0
                });
            })) : (t.showLoading("收藏中..."), a.httppost("shop/agent/AddItemToMyFavorite", {
                id: e.data.ItemId
            }, function(t) {
                e.setData({
                    IsFavorite: !0
                }), wx.showToast({
                    title: "收藏成功",
                    icon: "success",
                    mask: !0
                });
            })) : (this.data.globalData.flag1 = !0, this.setData({
                globalData: this.data.globalData
            }));
        }
    },
    //预览图片
    loadimg: function(t) {
        var a = t.target.dataset.src, e = [];
        this.data.newimages.map(function(t) {
            we7 ? e.push(t) : e.push(t.url)
        }), wx.previewImage({
            current: a,
            urls: e
        });
    },
    //点击左下图标
    itemPick: function(t) {
        "收藏" == t.currentTarget.dataset.action ? this.collect() : "拿货车" == t.currentTarget.dataset.action ? wx.switchTab({
            url: "/pages/car/car"
        }) : "首页" == t.currentTarget.dataset.action && this.home();
    },

    addcar: function(t) {
        this.data.flagdrag ? this.setData({
            actionSheetHidden: !this.data.actionSheetHidden,
            carflag: !1
        }) : (this.data.globalData.flag1 = !0, this.setData({
            globalData: this.data.globalData
        }));
    },
    //点击我要拿货
    actionSheetTap: function(t) {
        var a = this;
        if (we7) {
            return "已下架" != t.currentTarget.dataset.action && (getApp().isLogin() ? void (t.currentTarget.dataset.my && (a.data.flagdrag ? a.setData({
                actionSheetHidden: !a.data.actionSheetHidden,
                carflag: !0
            }) : (a.data.globalData.flag1 = !0, a.setData({
                globalData: a.data.globalData
            })))) : (wx.showToast({
                title: "请先登录",
                duration: 500,
                mask: !0,
                success: function(t) {
                    setTimeout(function() {
                        wx.reLaunch({
                            url: "/pages/login/login"
                        });
                    }, 500);
                }
            }), !1));
        } else {
            return "已下架" != t.currentTarget.dataset.action && (wx.getStorageSync("token") ? void (t.currentTarget.dataset.my && (a.data.flagdrag ? a.setData({
                actionSheetHidden: !a.data.actionSheetHidden,
                carflag: !0
            }) : (a.data.globalData.flag1 = !0, a.setData({
                globalData: a.data.globalData
            })))) : (wx.showToast({
                title: "请先登录",
                duration: 2e3,
                mask: !0,
                success: function(t) {
                    setTimeout(function() {
                        wx.reLaunch({
                            url: "/pages/login/login?itemdetail=" + a.data.obj.id
                        });
                    }, 2e3);
                }
            }), !1));
        }
    },
    selectAttrValue: function(t) {
        this.setData({
            fristindex: t.currentTarget.dataset.index
        });
    },
    bindMinus: function(a) {
        var e = a.currentTarget.dataset.index, s = a.currentTarget.dataset.itemindex;
        0 == this.data.Products[e].SizeList[s].qty ? t.showToast("至少来一件吧") : this.data.Products[e].SizeList[s].qty--, 
        this.choosegoods(), this.setData({
            Products: this.data.Products,
            choose: this.data.choose,
            IsJiesuan: this.data.choose.length > 0
        });
    },
    bindPlus: function(a) {
        var e = a.currentTarget.dataset.index, s = a.currentTarget.dataset.itemindex;
        this.data.Products[e].SizeList[s].qty == this.data.Products[e].SizeList[s].Stock ? t.showToast("库存为" + this.data.Products[e].SizeList[s].Stock + "件") : this.data.Products[e].SizeList[s].qty++, 
        this.choosegoods(), this.setData({
            Products: this.data.Products,
            choose: this.data.choose,
            IsJiesuan: this.data.choose.length > 0
        });
    },
    choosegoods: function(t) {
        var a = this;
        this.data.choose = [], this.data.Products.map(function(t) {
            var e = {
                color: t.Color,
                list: [],
                selected: !1,
                listArr: "",
                listAll: []
            };
            t.SizeList.map(function(t) {
                if (t.qty > 0) {
                    e.selected = !0;
                    var a = t.Size + "/" + t.qty + "件", s = {
                        size: t.Size,
                        qty: t.qty
                    };
                    e.list.push(a), e.listAll.push(s);
                }
            }), e.selected && (e.listArr = e.list.join(","), a.data.choose.push(e));
        });
    },
    settlesubmit: function(t) {
        var a = this;
        if (a.data.IsJiesuan) {
            var e = [];
            a.data.choose.map(function(t) {
                t.listAll.map(function(s) {
                    e.push({
                        Color: t.color,
                        Size: s.size,
                        Qty: s.qty,
                        AgentItemID: a.data.ItemId
                    });
                });
            }), wx.navigateTo({
                url: "/pages/pinhuo/settlement?quickPay=true&data=" + JSON.stringify(e)
            });
        }
    },
    //加入拿货车
    addcarnext: function(e) {
        var s = this;
        if (s.data.IsJiesuan) {
            var i = {
                itemId: s.data.ItemId,
                Products: []
            };
            s.data.choose.map(function(t) {
                t.listAll.map(function(a) {
                    i.Products.push({
                        color: t.color,
                        size: a.size,
                        qty: a.qty
                    });
                });
            }), t.showLoading("加入购物车中"), 
            console.log('加入购物车=')
            console.log(i)
            a.httppost("pinhuocart/addFromJson", i, function(t) {
                i.Products.map(function(t) {
                    s.data.CarNum += t.qty;
                }), s.setData({
                    actionSheetHidden: !s.data.actionSheetHidden,
                    CarNum: s.data.CarNum
                }), wx.showModal({
                    content: "是否马上结算？",
                    confirmText: "立即结算",
                    cancelText: "继续逛逛",
                    success: function(t) {
                        t.confirm ? wx.switchTab({
                            url: "/pages/car/car"
                        }) : 1 == getCurrentPages().length ? wx.switchTab({
                            url: "/pages/nahuomain/main"
                        }) : wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }, "POST");
        }
    },
    actionSheetbindchange: function() {
        this.setData({
            actionSheetHidden: !this.data.actionSheetHidden
        });
    },
    closelogin: function() {
        this.data.globalData.flag1 = !1, this.setData({
            globalData: this.data.globalData
        });
    },
    changetitle: function(t) {
        this.data.globalData.curNav = t.currentTarget.dataset.id, 0 == this.data.globalData.curNav ? this.data.globalData.flag2 = !1 : this.data.globalData.flag2 = !0, 
        this.setData({
            globalData: this.data.globalData
        });
    },
    eyecheck: function() {
        this.data.globalData.flag3 = !this.data.globalData.flag3, this.setData({
            globalData: this.data.globalData
        });
    },
    login_code: function(e) {
        var s = this;
        if (s.data.globalData.cont = 59, s.setData({
            globalData: this.data.globalData
        }), !/^1\d{10}$/.test(this.data.globalData.mobile)) return wx.showToast({
            title: "请输入正确格式手机号",
            icon: "success"
        }), !1;
        t.showLoading("获取验证码中");
        var i = {
            mobile: s.data.globalData.mobile,
            useFor: "register",
            messageFrom: "天天拼货团"
        };
        a.httppost("user/user/GetMobileVerifyCode2", i, function(t) {
            wx.showToast({
                title: t.Message,
                mask: !0
            }), s.data.globalData.cont = 59, s.data.globalData.disabled = !1, s.setData({
                globalData: s.data.globalData
            });
            var a = setInterval(function() {
                s.data.globalData.cont = s.data.globalData.cont - 1, s.data.globalData.cont <= 0 ? (clearInterval(a), 
                s.data.globalData.cont = 59, s.data.globalData.disabled = !0, s.setData({
                    globalData: s.data.globalData
                })) : (s.data.globalData.disabled = !1, s.setData({
                    globalData: s.data.globalData
                }));
            }, 1e3);
        }, "POST");
    },
    key_mobile: function(t) {
        this.data.globalData.mobile = t.detail.value, this.setData({
            globalData: this.data.globalData
        });
    },
    login_submit: function(e) {
        var s = this;
        if (0 == this.data.globalData.curNav) {
            if ("" == e.detail.value.phone) return wx.showToast({
                title: "请输入手机号或用户名",
                icon: "success",
                duration: 2e3
            }), !1;
            if ("" == e.detail.value.password) return wx.showToast({
                title: "请输入密码",
                icon: "success",
                duration: 2e3
            }), !1;
            t.showLoading("登陆中");
            var i = {
                account: e.detail.value.phone,
                password: e.detail.value.password,
                typeID: 1,
                key: wx.getStorageSync("wxkey")
            };
            a.httppost("user/user/login", i, function(t) {
                wx.setStorageSync("token", "Bearer " + t.Data.Token), wx.setStorageSync("account", t.Data.UserName), 
                wx.setStorageSync("userid", t.Data.UserID), wx.showToast({
                    title: "登录成功",
                    icon: "success",
                    mask: !0
                }), s.closelogin(), wx.getSystemInfo({
                    success: function(t) {
                        s.setData({
                            stop: t.windowHeight
                        });
                    }
                }), s.setData({
                    actionSheetHidden: !s.data.actionSheetHidden,
                    flagdrag: !0
                });
            }, "POST");
        } else if (1 == this.data.globalData.curNav) {
            if ("" == e.detail.value.phone) return wx.showToast({
                title: "请输入手机号或用户名",
                icon: "success",
                duration: 2e3
            }), !1;
            if ("" == e.detail.value.password) return wx.showToast({
                title: "请输入密码",
                icon: "success",
                duration: 2e3
            }), !1;
            if ("" == e.detail.value.code) return wx.showToast({
                title: "请输入验证码",
                icon: "success",
                duration: 2e3
            }), !1;
            if (e.detail.value.password < 5) return wx.showToast({
                title: "密码长度最少6位",
                icon: "success",
                duration: 2e3
            }), !1;
            var o = {
                mobile: e.detail.value.phone,
                password: e.detail.value.password,
                code: e.detail.value.code,
                regFrom: 1,
                typeID: 1,
                key: wx.getStorageSync("wxkey")
            };
            t.showLoading("注册中"), a.httppost("user/user/Register2", o, function(t) {
                wx.setStorageSync("token", "Bearer " + t.Data.Token), wx.setStorageSync("account", t.Data.UserName), 
                wx.setStorageSync("userid", t.Data.UserID), wx.showToast({
                    title: "注册成功",
                    icon: "success",
                    mask: !0
                }), s.closelogin(), wx.getSystemInfo({
                    success: function(t) {
                        s.setData({
                            stop: t.windowHeight
                        });
                    }
                }), s.setData({
                    actionSheetHidden: !s.data.actionSheetHidden,
                    flagdrag: !0
                });
            }, "POST");
        }
    },
    changeNum: function(a) {
        var e = a.currentTarget.dataset.index, s = a.currentTarget.dataset.itemindex, i = a.detail.value;
        i < 0 ? t.showToast("件数不能为负数") : i > this.data.Products[e].SizeList[s].Stock ? t.showToast("库存为" + this.data.Products[e].SizeList[s].Stock + "件") : this.data.Products[e].SizeList[s].qty = i, 
        this.choosegoods(), this.setData({
            Products: this.data.Products,
            choose: this.data.choose,
            IsJiesuan: this.data.choose.length > 0
        });
    },
    close: function() {
        this.setData({
            numflag: !1
        });
    },
    bindinput: function(a) {
        var e = this.data.Products[this.data.fristindex].SizeList[this.data.lastindex].Stock;
        a.detail.value >= e ? t.showToast("商品剩余库存" + e + "件") : a.detail.value < 1 ? t.showToast("至少来一件吧!") : this.data.tempNum = a.detail.value;
    },
    sub: function(a) {
        if (this.data.tempNum <= 0) return t.showToast("至少来一件吧"), !1;
        this.data.tempNum--, this.setData({
            tempNum: this.data.tempNum
        });
    },
    plus: function(a) {
        if (this.data.tempNum >= this.data.Products[this.data.fristindex].SizeList[this.data.lastindex].Stock) return t.showToast("商品库存为" + this.data.Products[this.data.fristindex].SizeList[this.data.lastindex].Stock + "件"), 
        !1;
        this.data.tempNum++, this.setData({
            tempNum: this.data.tempNum
        });
    },
    comfirm: function(t) {
        this.data.Products[this.data.fristindex].SizeList[this.data.lastindex].qty = this.data.tempNum, 
        this.choosegoods(), this.setData({
            Products: this.data.Products,
            numflag: !1,
            choose: this.data.choose,
            IsJiesuan: this.data.choose.length > 0
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        return wx.getStorageSync("userid") ? {
            title: this.data.name,
            path: "/pages/pinhuo/itemdetail?flag=1&id=" + this.data.ItemId + "&key=" + wx.getStorageSync("userid") + "&tag=swx",
            imageUrl: this.data.detailImages[0].url
        } : {
            title: this.data.name,
            path: "/pages/pinhuo/itemdetail?flag=1&id=" + this.data.ItemId,
            imageUrl: this.data.detailImages[0].url
        };
    },
    home: function() {
        wx.reLaunch ? wx.switchTab({
            url: "/pages/nahuomain/main"
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    dk: function(t) {
        wx.reLaunch({
            url: "/pages/classify/dk?sid=" + this.data.StallID
        });
    },
    ChangeStatus: function() {
        1 == this.data.globalData.status ? this.data.globalData.status = 2 : this.data.globalData.status = 1, 
        this.setData({
            globalData: this.data.globalData
        });
    },
    GetCode: function(e) {
        var s = this;
        if (s.data.globalData.cont2 = 59, !/^1\d{10}$/.test(this.data.globalData.mobile)) return wx.showToast({
            title: "请输入正确格式手机号",
            icon: "success"
        }), !1;
        t.showLoading("获取验证码中");
        var i = {
            mobile: s.data.globalData.mobile,
            useFor: "loginOrRegister",
            messageFrom: "天天拼货团",
            smsType: e.currentTarget.dataset.id
        };
        a.httppostmore("user/user/GetMobileVerifyCode2", i, function(a) {
            if (t.hideLoading(), a.Result) {
                if (t.showToast(a.Message), s.data.globalData.cont2 = 59, s.data.globalData.disabled2 = !1, 
                s.setData({
                    globalData: s.data.globalData
                }), 1 == e.currentTarget.dataset.id) var i = setInterval(function() {
                    s.data.globalData.cont2 = s.data.globalData.cont2 - 1, s.data.globalData.cont2 <= 0 ? (clearInterval(i), 
                    s.data.globalData.cont2 = 59, s.data.globalData.disabled2 = !0, s.setData({
                        globalData: s.data.globalData
                    })) : (s.data.globalData.disabled2 = !1, s.setData({
                        globalData: s.data.globalData
                    }));
                }, 1e3);
            } else wx.showModal({
                title: "",
                content: a.Message,
                showCancel: !1
            });
        }, "POST");
    },
    fast_submit: function(e) {
        var s = this;
        if ("" == e.detail.value.phone) return wx.showToast({
            title: "请输入手机号或用户名",
            icon: "success",
            duration: 2e3
        }), !1;
        if ("" == e.detail.value.code) return wx.showToast({
            title: "请输入验证码",
            icon: "success",
            duration: 2e3
        }), !1;
        var i = {
            account: e.detail.value.phone,
            mobileCode: e.detail.value.code,
            typeID: 1,
            key: wx.getStorageSync("wxkey"),
            loginFrom: 4
        };
        t.showLoading("登录中..."), a.httppost("user/user/login", i, function(a) {
            t.hideLoading(), wx.setStorageSync("token", "Bearer " + a.Data.Token), wx.setStorageSync("account", a.Data.UserName), 
            wx.setStorageSync("userid", a.Data.UserID), t.showToast("登录成功"), s.closelogin(), 
            wx.getSystemInfo({
                success: function(t) {
                    s.setData({
                        stop: t.windowHeight
                    });
                }
            }), s.setData({
                actionSheetHidden: !s.data.actionSheetHidden,
                flagdrag: !0
            });
        }, "POST");
    },
    search: function() {
        wx.redirectTo({
            url: "/pages/search/search"
        });
    },
    IndexTab: function(t) {
        wx.switchTab({
            url: "/pages/nahuomain/main"
        });
    }
});
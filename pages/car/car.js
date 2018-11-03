var t = require("../../utils/imgutil.js"), e = require("../../utils/httputil.js"), i = getApp(), we7 = i.globalData.we7;

Page({
    data: {
        selected: !0,
        timeoutselected: !0,
        TotalAmount: 0,
        PayableAmount: 0,
        Discount: 0,
        Content: "",
        tempbool: !1,
        itemInfos: [],
        timeOutList: [],
        list: [],
        ischoose: !1,
        info: {
            fristindex: 0
        },
        totalqty: 0
    },
    onLoad: function(t) {
        this.setData({
            we7: we7
        })
        var e = this;
        e.time = null, wx.getSystemInfo({
            success: function(t) {
                e.data.height1 = t.windowHeight;
            }
        });
    },
    onShow: function() {
        if (we7) {

        } else {
            this.init(),this.GetQty();
        }
    },
    init: function() {
        var a = this;
        i.showLoading("页面加载中..."), e.httppost("pinhuocart/GetItems3", {}, function(e) {
            console.log('获取购物车=')
            console.log(e)
            e.Result && (e.Data.Items.map(function(e) {
                e.selected = !0, e.TimeList.map(function(e) {
                    e.ToTime = e.ToTime.replace(/-/g, "/");
                    var i = new Date(), a = new Date(e.ToTime);
                    a > i && (e.hours = parseInt((a - i) / 1e3 / 60 / 60), e.minutes = parseInt((a - i) / 1e3 / 60) - 60 * e.hours, 
                    e.seconds = parseInt((a - i) / 1e3) - 60 * e.hours * 60 - 60 * e.minutes), e.Items.map(function(e) {
                        e.colorList = [], e.selected = !0, e.Cover = t.getUrl(e.Cover, 400);
                        var i = [];
                        e.Products.map(function(t) {
                            t.msg = t.Size + "/" + t.Qty + "件", i.push(t.Color);
                        }), (i = Array.from(new Set(i))).map(function(t) {
                            var i = {
                                color: t,
                                SizeList: []
                            };
                            e.Products.map(function(e) {
                                e.Color == t && i.SizeList.push(e.msg);
                            }), i.msg = i.SizeList.join("，"), e.colorList.push(i);
                        });
                    });
                });
            }), e.Data.DisableItems.map(function(e) {
                e.selected = !0, e.TimeList.map(function(e) {
                    e.Items.map(function(e) {
                        e.colorList = [], e.selected = !0, e.Cover = t.getUrl(e.Cover, 400);
                        var i = [];
                        e.Products.map(function(t) {
                            t.msg = t.Size + "/" + t.Qty + "件", i.push(t.Color);
                        }), (i = Array.from(new Set(i))).map(function(t) {
                            var i = {
                                color: t,
                                SizeList: []
                            };
                            e.Products.map(function(e) {
                                e.Color == t && i.SizeList.push(e.msg);
                            }), i.msg = i.SizeList.join("，"), e.colorList.push(i);
                        });
                    });
                });
            }), a.setData({
                selected: !0,
                list: e.Data.Items,
                timeOutList: e.Data.DisableItems,
                height: .8 * Number(a.data.height1),
                stopheight: .8 * Number(a.data.height1) - 210
            }), a.data.list.length > 0 && (clearInterval(a.time), a.time = setInterval(function() {
                a.data.list.map(function(t) {
                    t.TimeList.map(function(t) {
                        t.IsStart && (0 == t.seconds && 0 == t.minutes && 0 == t.hours ? t.IsStart = !1 : t.seconds > 0 ? (t.seconds--, 
                        a.data.tempbool = !0) : 0 == t.seconds && t.minutes > 0 ? (t.seconds = 59, t.minutes--, 
                        a.data.tempbool = !0) : 0 == t.seconds && 0 == t.minutes && t.hours > 0 && (t.seconds = 59, 
                        t.minutes = 59, t.hours--, a.data.tempbool = !0));
                    });
                }), a.data.tempbool || clearInterval(a.time), a.setData({
                    list: a.data.list
                });
            }, 1e3)), a.totlePrice());
        });                                                                                                                                                      
    },
    //设置选中的商品id数组
    itemInfos: function() {
        var t = this;
        this.data.itemInfos = [], this.data.totalqty = 0, this.data.list.map(function(e) {
            e.TimeList.map(function(e) {
                e.Items.map(function(e) {
                    if (e.selected) {
                        var i = {};
                        i.AgentItemID = e.AgentItemID, t.data.itemInfos.push(i), t.data.totalqty += e.TotalQty;
                    }
                });
            });
        });
    },
    //计算选中商品的总价
    totlePrice: function() {
        var t = this;
        this.itemInfos(), i.showLoading(""), e.httppost("pinhuocart/GetItemDiscount", {
            itemInfos: JSON.stringify(t.data.itemInfos)
        }, function(e) {
            console.log('购物车算钱=')
            console.log(e)
            e.Result && t.setData({
                TotalAmount: e.Data.TotalAmount,
                PayableAmount: e.Data.PayableAmount,
                Discount: e.Data.Discount,
                Content: e.Data.Content,
                list: t.data.list,
                timeOutList: t.data.timeOutList,
                selected: t.data.selected,
                totalqty: t.data.totalqty
            });
        }, "POST");
    },
    checkAll: function(t) {
        var e = this;
        this.data.list[t.currentTarget.dataset.idx].selected = !this.data.list[t.currentTarget.dataset.idx].selected, 
        this.data.list[t.currentTarget.dataset.idx].TimeList.map(function(i) {
            i.Items.map(function(i) {
                i.selected = e.data.list[t.currentTarget.dataset.idx].selected;
            });
        });
        for (var i = 0; i < this.data.list.length; i++) {
            if (!this.data.list[i].selected) {
                this.data.selected = !1;
                break;
            }
            this.data.selected = !0;
        }
        this.totlePrice();
    },
    check: function(t) {
        var e = t.currentTarget.dataset.ida, i = t.currentTarget.dataset.idb, a = t.currentTarget.dataset.idc;
        this.data.list[e].TimeList[i].Items[a].selected = !this.data.list[e].TimeList[i].Items[a].selected;
        for (var s = 0; s < this.data.list[e].TimeList[i].Items.length; s++) {
            if (!this.data.list[e].TimeList[i].Items[s].selected) {
                this.data.list[e].selected = !1, this.data.selected = !1;
                break;
            }
            this.data.list[e].selected = !0, this.data.selected = !0;
        }
        this.totlePrice();
    },
    checkAllLimt: function(t) {
        var e = this;
        this.data.timeoutselected = !this.data.timeoutselected, this.data.timeOutList.map(function(t) {
            t.TimeList.map(function(t) {
                t.Items.map(function(t) {
                    t.selected = e.data.timeoutselected;
                });
            });
        }), this.setData({
            timeoutselected: this.data.timeoutselected,
            timeOutList: this.data.timeOutList
        });
    },
    checkLimt: function(t) {
        var e = t.currentTarget.dataset.ida, i = t.currentTarget.dataset.idb, a = t.currentTarget.dataset.idc;
        this.data.timeOutList[e].TimeList[i].Items[a].selected = !this.data.timeOutList[e].TimeList[i].Items[a].selected;
        for (var s = 0; s < this.data.timeOutList[e].TimeList[i].Items.length; s++) {
            if (!this.data.timeOutList[e].TimeList[i].Items[s].selected) {
                this.data.timeOutList[e].selected = !1, this.data.timeoutselected = !1;
                break;
            }
            this.data.timeOutList[e].selected = !0, this.data.timeoutselected = !0;
        }
        this.setData({
            timeoutselected: this.data.timeoutselected,
            timeOutList: this.data.timeOutList
        });
    },
    total_all: function(t) {
        var e = this;
        this.data.selected = !this.data.selected, this.data.timeoutselected = this.data.selected, 
        this.data.list.map(function(t) {
            t.selected = e.data.selected, t.TimeList.map(function(t) {
                t.Items.map(function(t) {
                    t.selected = e.data.selected;
                });
            });
        }), this.data.timeOutList.map(function(t) {
            t.selected = e.data.selected, t.TimeList.map(function(t) {
                t.Items.map(function(t) {
                    t.selected = e.data.selected;
                });
            });
        }), this.totlePrice();
    },
    //点击结算
    account: function(t) {
        this.itemInfos(), 0 == this.data.itemInfos.length ? wx.showToast({
            title: "请选择要结算的商品",
            mask: !0,
            icon: "success"
        }) : wx.navigateTo({
            url: "/pages/pinhuo/settlement?quickPay=false&data=" + JSON.stringify(this.data.itemInfos)
        });
    },
    //点击删除
    deleteGoods: function(t) {
        var a = [], s = this;
        wx.showModal({
            title: "",
            content: "确定要删除选中的商品吗",
            confirmText: "再想想",
            cancelText: "确定",
            success: function(t) {
                if (t.confirm) ; else {
                    s.data.list.map(function(t) {
                        t.TimeList.map(function(t) {
                            t.Items.map(function(t) {
                                t.selected && a.push(t.AgentItemID);
                            });
                        });
                    }), s.data.timeOutList.map(function(t) {
                        t.TimeList.map(function(t) {
                            t.Items.map(function(t) {
                                t.selected && a.push(t.AgentItemID);
                            });
                        });
                    });
                    var o = a.join(",");
                    console.log('购物车删除=')
                    console.log(o)
                    i.showLoading("页面加载中..."), e.httppost("pinhuocart/delete", {
                        ids: o
                    }, function(t) {
                        t.Result && (i.showToast(t.Message), s.init());
                    }, "POST");
                }
            }
        });
    },
    //点击编辑
    changeGoods: function(t) {
        this.getItemDetail(t.currentTarget.dataset.agentitemid, t.currentTarget.dataset.products, t.currentTarget.dataset.title, t.currentTarget.dataset.price), 
        this.animation(!0);
    },
    animation: function(t) {
        var e = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animation1 = e, t ? (e.translateY(-this.data.height).step(), this.data.ischoose = !0) : (e.translateY(this.data.height).step(), 
        this.data.ischoose = !1), this.setData({
            animationData1: e.export(),
            ischoose: this.data.ischoose
        });
    },
    closeDrag: function(t) {
        this.animation(!1);
    },
    getItemDetail: function(a, s, o, n) {
        var c = this;
        i.showLoading(""), e.httppost("pinhuoitem/getinfo", {
            id: a,
            typeid: 1
        }, function(e) {
            console.log('购物车编辑=')
            console.log(e)
            e.Result && (c.data.info.name = o, c.data.info.MainColorPic = t.getUrl(e.Data.MainColorPic, 200), 
            c.data.info.itemId = e.Data.ID, c.data.info.Price = n, e.Data.Products.map(function(e, i) {
                e.ColorPic = t.getUrl(e.ColorPic, 200), e.Color == s[s.length - 1].Color && (c.data.info.fristindex = i), 
                e.SizeList.map(function(t) {
                    t.qty = 0;
                }), s.map(function(t) {
                    t.Color == e.Color && e.SizeList.map(function(e) {
                        e.Size == t.Size && (e.qty = t.Qty);
                    });
                });
            }), c.data.info.Products = e.Data.Products, c.chooseGoods(), c.setData({
                info: c.data.info
            }));
        }, "GET");
    },
    selectAttrValue: function(t) {
        this.data.info.fristindex = t.currentTarget.dataset.index, this.setData({
            info: this.data.info
        });
    },
    chooseGoods: function() {
        var t = this;
        this.data.info.choose = [], this.data.info.Products.map(function(e) {
            var i = {
                color: e.Color,
                list: [],
                selected: !1,
                listArr: "",
                listAll: []
            };
            e.SizeList.map(function(t) {
                if (t.qty > 0) {
                    i.selected = !0;
                    var e = t.Size + "/" + t.qty + "件", a = {
                        size: t.Size,
                        qty: t.qty
                    };
                    i.list.push(e), i.listAll.push(a);
                }
            }), i.selected && (i.listArr = i.list.join(","), t.data.info.choose.push(i));
        });
    },
    bindMinus: function(t) {
        var e = t.currentTarget.dataset.index, a = t.currentTarget.dataset.itemindex;
        0 == this.data.info.Products[e].SizeList[a].qty ? i.showToast("至少来一件吧") : this.data.info.Products[e].SizeList[a].qty--, 
        this.chooseGoods(), this.setData({
            info: this.data.info
        });
    },
    bindPlus: function(t) {
        var e = t.currentTarget.dataset.index, a = t.currentTarget.dataset.itemindex;
        this.data.info.Products[e].SizeList[a].qty == this.data.info.Products[e].SizeList[a].Stock ? i.showToast("库存为" + this.data.info.Products[e].SizeList[a].Stock + "件") : this.data.info.Products[e].SizeList[a].qty++, 
        this.chooseGoods(), this.setData({
            info: this.data.info
        });
    },
    //点击保存
    update: function(t) {
        var a = this, s = {
            itemId: a.data.info.itemId,
            Products: []
        };
        a.data.info.choose.map(function(t) {
            t.listAll.map(function(e) {
                s.Products.push({
                    color: t.color,
                    size: e.size,
                    qty: e.qty
                });
            });
        }), console.log('购物车更新='), console.log(s), s.Products.length > 0 ? (i.showLoading("修改商品"), e.httppost("pinhuocart/update", s, function(t) {
            t.Result && (a.init(), a.closeDrag());
        }, "POST")) : wx.showModal({
            title: "",
            content: "确认删除已选商品",
            success: function(t) {
                t.confirm && e.httppost("pinhuocart/delete", {
                    ids: a.data.info.itemId
                }, function(t) {
                    t.Result && (i.showToast(t.Message), a.init(), a.closeDrag());
                }, "POST");
            }
        });
    },
    detail: function(t) {
        wx.navigateTo({
            url: "/pages/pinhuo/itemdetail?id=" + t.currentTarget.dataset.id
        });
    },
    GetQty: function(t) {
        wx.getStorageSync("token") && e.httppost("pinhuocart/GetMenuRedPoint", {}, function(t) {
            t.Result && (t.Data.CartItemQty > 0 && (t.Data.CartItemQty = t.Data.CartItemQty + "", 
            wx.setTabBarBadge({
                index: 2,
                text: t.Data.CartItemQty
            })), wx.getStorageSync("TopicID") == t.Data.TopicID || wx.showTabBarRedDot({
                index: 9
            }));
        }, "GET");
    }
});
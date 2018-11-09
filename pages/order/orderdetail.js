var t = require("../../utils/httputil.js"), a = require("../../utils/imgutil.js"), e = (require("../../utils/common.js"), getApp()), we7 = e.globalData.we7;

Page({
    data: {
        info: {},
        id: "",
        numflag: !1
    },
    onLoad: function(t) {
        this.setData({
            we7: we7
        })
        this.data.id = t.id, this.init();
    },
    //获取数据
    init: function(n) {
        var o = this;
        if (we7) {
            o.data.info = {}, e.showLoading(""), t.http_post("GetDetailOrder", {
                orderid: o.data.id,
                uid: wx.getStorageSync('u_id')
            }, function(t) {
                console.log('微擎订单详情=')
                console.log(t)
                // var e = 0;
                // t.Data.Buttons.map(function(t) {
                //     "联系客服" != t.action && "发货方式" != t.action || (t.isEnable = !1), t.isEnable && e++;
                // }), t.Data.Buttonbool = 0 != e, t.Data.SenderList.map(function(t) {
                //     t.ChildOrders.map(function(t) {
                //         t.Cover = a.getUrl(t.Cover, 200), t.Buttons.map(function(t) {
                //             "一键下图" == t.action && (t.isEnable = !1);
                //         });
                //     });
                // }), 
                o.setData({
                    info: t.Data
                });
            });
        } else {
            o.data.info = {}, e.showLoading(""), t.httppost("pinhuobuyer/OrderDetailV2?orderid=" + o.data.id, {}, function(t) {
                console.log('订单详情=')
                console.log(t)
                var e = 0;
                t.Data.Buttons.map(function(t) {
                    "联系客服" != t.action && "发货方式" != t.action || (t.isEnable = !1), t.isEnable && e++;
                }), t.Data.Buttonbool = 0 != e, t.Data.SenderList.map(function(t) {
                    t.ChildOrders.map(function(t) {
                        t.Cover = a.getUrl(t.Cover, 200), t.Buttons.map(function(t) {
                            "一键下图" == t.action && (t.isEnable = !1);
                        });
                    });
                }), o.setData({
                    info: t.Data
                });
            }); 
        }
    },
    //订单按钮
    payorder: function(a) {
        var n = this, o = this.data.info;
        "买家支付" == a.currentTarget.dataset.action ? wx.redirectTo({
            url: "/pages/order/orderpay?money=" + o.PayableAmount + "&orderids=" + o.OrderIDS + "&itemids="
        }) : "买家取消" == a.currentTarget.dataset.action ? wx.showModal({
            title: "",
            content: "是否确认取消订单",
            success: function(a) {
                if (a.confirm) {
                    if (we7) {
                        e.showLoading("")
                        t.http_post("CancelMyOrder", {
                            uid: wx.getStorageSync('u_id'),
                            id: n.data.id
                        }, function(t) {
                            t.Result ? wx.showModal({
                                title: "",
                                content: "成功取消订单",
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && n.init();
                                }
                            }) : wx.showModal({
                                title: "",
                                content: t.Message,
                                showCancel: !1
                            });
                        })
                    } else {
                        e.showLoading("")
                        t.httppostmore("pinhuoBuyer/orderv2/Cancel", {
                            id: n.data.id
                        }, function(t) {
                            t.Result ? wx.showModal({
                                title: "",
                                content: "成功取消订单",
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && n.init();
                                }
                            }) : wx.showModal({
                                title: "",
                                content: t.Message,
                                showCancel: !1
                            });
                        }, "POST")
                    }
                }
            }
        }) : "一键加入购物车" == a.currentTarget.dataset.action ? (e.showLoading(""), t.httppostmore("pinhuocart/AddItemFromOrder", {
            id: n.data.id
        }, function(t) {
            t.Result ? wx.showModal({
                title: "已经添加成功啦！",
                content: "此笔订单的商品已经全部添加到拿货车了。您可以在拿货车对商品编辑后重新下单",
                cancelText: "关闭",
                confirmText: "拿货车",
                success: function(t) {
                    t.confirm && wx.switchTab({
                        url: "/pages/car/car"
                    });
                }
            }) : wx.showModal({
                title: "",
                content: t.Message,
                showCancel: !1
            });
        }, "GET")) : "买家确认收货" == a.currentTarget.dataset.action && wx.showModal({
            title: "",
            content: "确认已收齐发货的商品了，确认后状态将变成“已完结”",
            cancelText: "取消",
            confirmText: "确认签收",
            success: function(a) {
                a.confirm && (e.showLoading("签收中"), t.httppostmore("pinhuoBuyer/orderv2/ComfirmReceipt", {
                    id: n.data.id
                }, function(t) {
                    wx.showModal({
                        title: "",
                        content: t.Message,
                        showCancel: !1,
                        success: function(a) {
                            a.confirm && t.Result && (n.data.pageIndex = 1, n.data.notice = "", n.data.lists = [], 
                            n.init());
                        }
                    });
                }, "POST"));
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    copy: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.copy,
            success: function(t) {
                wx.showModal({
                    title: "",
                    content: "已复制内容到剪切板",
                    showCancel: !1
                });
            }
        });
    },
    //点击商品
    goitem: function(n) {
        var o = this, i = n.currentTarget.dataset;
        "补货" == i.action ? wx.navigateTo({
            url: "/pages/pinhuo/itemdetail?id=" + i.itemid
        }) : "场次" == i.action ? wx.navigateTo({
            url: "/pages/pinhuo/pinhuodetail?qsid=" + i.qsid
        }) : "买家申请退款" == i.action ? (e.showLoading(""), t.httppost("shop/agent/refund/GetOrderItemForRefund?oid=" + i.orderid, {}, function(t) {
            t.Result && (o.data.arrayreson = [], o.data.arrayresonids = [], t.Data.refundType.map(function(t) {
                o.data.arrayreson.push(t.name), o.data.arrayresonids.push(t.id);
            }), o.data.CanRefundMaxAmount = t.Data.CanRefundMaxAmount, o.data.refundWithProduct = t.Data.refundWithProduct, 
            o.setData({
                numflag: !o.data.numflag,
                MyPayableAmount: t.Data.orderPrice,
                Summary: t.Data.totalPrice,
                MyPost: t.Data.expressFee,
                array: o.data.arrayreson,
                index: 0,
                oid: i.orderid
            }));
        }, "GET")) : "一键下图" == i.action ? t.httppost("pinhuoitem/getinfo", {
            typeid: 2,
            id: i.itemid
        }, function(t) {
            var n = [];
            t.Data.Images.map(function(t) {
                n.push(a.getUrl(t, 1e3));
            });
            e.showLoading("图片下载中..."), function a(o) {
                wx.downloadFile({
                    url: n[o],
                    success: function(i) {
                        if (wx.saveFile({
                            tempFilePath: i.tempFilePath,
                            success: function(t) {
                                console.log(t);
                            }
                        }), o == n.length - 1) return e.hideLoading(), wx.showModal({
                            title: "",
                            content: "已下载完成",
                            showCancel: !1
                        }), !1;
                        200 == i.statusCode && ++o < t.Data.Images.length && a(o);
                    }
                });
            }(0);
        }, "GET") : "买家取消" == i.action && wx.showModal({
            title: "",
            content: "是否确定取消订单",
            success: function(a) {
                if (a.confirm) {
                    if (we7) {
                        e.showLoading("")
                        t.http_post("CancelChildOrder", {
                            uid: wx.getStorageSync('u_id'),
                            childId: i.orderid
                        }, function(t) {
                            t.Result && o.init();
                        }, "POST")  
                    } else {
                        e.showLoading("")
                        t.httppost("pinhuobuyer/orderv2/CancelOrder", {
                            orderId: i.orderid
                        }, function(t) {
                            t.Result && o.init();
                        }, "POST")  
                    }                 
                }
            }
        });
    },
    close: function() {
        this.setData({
            numflag: !1
        });
    },
    bindPickerChange: function(t) {
        this.data.checkindex = t.detail.value, this.setData({
            index: t.detail.value
        });
    },
    comfirm: function(a) {
        var n = this, o = a.target.dataset.oid, i = n.data.refundWithProduct, r = n.data.CanRefundMaxAmount;
        e.showLoading(""), t.httppost("shop/agent/refund/BuyerApplyRefund?orderID=" + o + "&refundType=1&refundAmount=" + r + "&refundWithProduct=" + i, {}, function(t) {
            t.Result && (n.setData({
                numflag: !1
            }), n.init());
        });
    },
    logistics: function(t) {
        wx.navigateTo({
            url: "/pages/order/logistics?id=" + t.currentTarget.dataset.shopid
        });
    }
});
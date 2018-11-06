var t = getApp(), a = require("../../utils/httputil.js"), o = require("../../utils/imgutil.js"), e = require("../../utils/common.js");

Page({
    data: {
        AddressID: 0,
        typeid: 1,
        index: 0,
        str: "",
        coupon_flag: !1,
        couponID: "",
        coupon_obj: {},
        use_coupon_obj: {},
        totalmoney: 0,
        Coupons: [],
        status: !0,
        fhbool: !1,
        gofirst: !0,
        showhide: !0
    },
    onLoad: function(e) {
        console.log(e)
        wx.setStorageSync("flag", !0);
        var i = this, s = e.data, n = [];
        JSON.parse(e.data).map(function(t) {
            -1 == n.indexOf(t.AgentItemID) && n.push(t.AgentItemID);
        }), i.data.str = s, i.data.quickPay = e.quickPay, t.showLoading("数据加载中"), wx.request({
            url: "https://api2.nahuo.com/v3/shop/address/GetDefaultAddress",
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: wx.getStorageSync("token")
            },
            success: function(e) {
                console.log('获取默认收货地址=')
                console.log(e)
                if (e.data.Result) {
                    i.data.AddressID = e.data.Data.ID, i.data.postinfo = e.data.Data;
                    var u = {
                        version: 3,
                        itemInfos: s,
                        quickPay: i.data.quickPay,
                        AddressID: i.data.AddressID
                    };
                    t.showLoading("数据加载中"), a.httppost("pinhuo/order/CreateTempOrder", u, function(t) {
                        console.log('生成订单=')
                        console.log(t)
                        for (var a = t.Data.Orders, e = 0; e < a.length; e++) for (var s = 0; s < a[e].Items.length; s++) a[e].Items[s].Cover = o.getUrl(a[e].Items[s].Cover, 300);
                        t.Data.ShipSetting.map(function(t) {
                            t.IsDefault && i.setData({
                                typeid: t.ID
                            });
                        }), t.Data.Coupons.length > 0 && t.Data.AutoUseCoupon ? (t.Data.Coupons.map(function(t) {
                            t.ToTime = t.ToTime.substring(5, 10), t.FromTime = t.FromTime.substring(5, 10), 
                            t.seclted = !1;
                        }), i.data.couponID = t.Data.Coupons[0].ID, i.data.coupon_obj = t.Data.Coupons[0], 
                        i.setData({
                            couponID: i.data.couponID,
                            coupon_obj: i.data.coupon_obj,
                            info: a,
                            CouponAmount: t.Data.CouponAmount,
                            DiscountAmount: t.Data.DiscountAmount,
                            ShipSetting: t.Data.ShipSetting,
                            Coupons: t.Data.Coupons,
                            ids: n.join(","),
                            postinfo: i.data.postinfo,
                            CouponsNotice: t.Data.CouponsNotice,
                            ShipSettingNotice: t.Data.ShipSettingNotice,
                            ShipApplyNotice: t.Data.ShipApplyNotice,
                            ShipApply: t.Data.ShipApply,
                            WareHouseIDS: t.Data.WareHouseIDS,
                            TotalProductAmount: t.Data.TotalProductAmount,
                            ProductDiscount: t.Data.ProductDiscount,
                            PostfeeDiscount: t.Data.PostfeeDiscount,
                            TotalWeight: t.Data.TotalWeight
                        }), i.comfirm()) : i.setData({
                            money: t.Data.TotalPayableAmount,
                            postfee: t.Data.TotalPostFeeAmount,
                            TotalOriPostFeeAmount: t.Data.TotalOriPostFeeAmount,
                            TotalPayableAmount: t.Data.TotalPayableAmount,
                            info: a,
                            CouponAmount: t.Data.CouponAmount,
                            DiscountAmount: t.Data.DiscountAmount,
                            ShipSetting: t.Data.ShipSetting,
                            Coupons: t.Data.Coupons,
                            ids: n.join(","),
                            postinfo: i.data.postinfo,
                            CouponsNotice: t.Data.CouponsNotice,
                            ShipSettingNotice: t.Data.ShipSettingNotice,
                            ShipApplyNotice: t.Data.ShipApplyNotice,
                            ShipApply: t.Data.ShipApply,
                            WareHouseIDS: t.Data.WareHouseIDS,
                            TotalProductAmount: t.Data.TotalProductAmount,
                            ProductDiscount: t.Data.ProductDiscount,
                            PostfeeDiscount: t.Data.PostfeeDiscount,
                            TotalWeight: t.Data.TotalWeight
                        });
                    }, "POST");
                } else t.hideLoading(), wx.showModal({
                    title: "",
                    content: "您还没有收货地址，现在去添加一个？",
                    showCancel: !1,
                    confirmText: "确定",
                    success: function(t) {
                        t.confirm && wx.redirectTo({
                            url: "/pages/address/addressAdd?data=" + s + "&url=/pages/pinhuo/settlement&quickPay=" + i.data.quickPay,
                            success: function(t) {},
                            fail: function(t) {},
                            complete: function(t) {}
                        });
                    }
                });
            }
        });
    },
    orderSubmit: function() {
        var o = this;
        if (0 == o.data.AddressID) t.showToast("请先选择收货地址"); else if (wx.getStorageSync("flag")) {
            if (wx.setStorageSync("flag", !1), 0 == o.data.money) return void t.showToast("金额不准确");
            if (o.data.OrderId) wx.redirectTo({
                url: "/pages/order/orderpay?money=" + o.data.money + "&&orderids=" + o.data.OrderId + "&&itemids=" + o.data.ids
            }); else {
                var e = {
                    couponID: o.data.couponID,
                    addressID: o.data.AddressID,
                    quickpay: o.data.quickPay,
                    shipTypeID: o.data.typeid
                };
                a.httppost("pinhuo/order/submit?from=mina", e, function(t) {
                    console.log('提交订单=')
                    console.log(e)
                    console.log('订单返回=')
                    console.log(t)
                    wx.redirectTo({
                        url: "/pages/order/orderpay?money=" + o.data.money + "&&orderids=" + t.Data.OrderIds + "&&itemids=" + o.data.ids
                    });
                }, "POST");
            }
        }
    },
    paysumbit: function(t) {
        var a = this.data.money, o = this.data.ids;
        e.payment(t, a, o);
    },
    navaddress: function() {
        var t = this;
        wx.redirectTo({
            url: "/pages/address/addresslist?data=" + t.data.str + "&url=/pages/pinhuo/settlement&quickPay=" + t.data.quickPay,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    checkcoupon: function(t) {
        this.data.Coupons.map(function(a) {
            a.ID == t.currentTarget.dataset.id ? a.seclted = !a.seclted : a.seclted = !1;
        }), this.data.Coupons[t.currentTarget.dataset.index].seclted ? (this.data.couponID = t.currentTarget.dataset.id, 
        this.data.coupon_obj = this.data.Coupons[t.currentTarget.dataset.index]) : (this.data.couponID = "", 
        this.data.coupon_obj = {}), this.setData({
            Coupons: this.data.Coupons,
            coupon_obj: this.data.coupon_obj
        });
    },
    cannel: function() {
        this.animation(!1);
    },
    comfirm: function() {
        var o = this;
        if (o.data.status) {
            t.showLoading("优惠卷计算中"), o.animation(!1);
            var e = {
                version: 2,
                couponID: o.data.couponID,
                itemInfos: o.data.str,
                quickPay: o.data.quickPay
            };
            a.httppost("pinhuo/order/CreateTempOrder", e, function(t) {
                o.setData({
                    couponID: o.data.couponID,
                    money: t.Data.TotalPayableAmount,
                    postfee: t.Data.TotalPostFeeAmount,
                    TotalOriPostFeeAmount: t.Data.TotalOriPostFeeAmount,
                    use_coupon_obj: o.data.coupon_obj,
                    CouponAmount: t.Data.CouponAmount,
                    ProductDiscount: t.Data.ProductDiscount,
                    PostfeeDiscount: t.Data.PostfeeDiscount,
                    TotalWeight: t.Data.TotalWeight
                });
            }, "POST");
        } else o.data.typeid = this.data.temptypeid || o.data.typeid, o.animation(!1);
    },
    usedcoupon: function() {
        if (this.data.status = !0, 0 == this.data.Coupons.length) return !1;
        this.animation(!this.data.coupon_flag);
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    animation: function(t) {
        var a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animation1 = a, t ? (a.translateY(-320).step(), this.data.coupon_flag = !0) : (a.translateY(320).step(), 
        this.data.coupon_flag = !1), this.setData({
            animationData: a.export(),
            coupon_flag: this.data.coupon_flag,
            status: this.data.status,
            typeid: this.data.typeid
        });
    },
    animationshow: function(t) {
        var a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animation2 = a, t ? (a.translateY(150).step(), this.data.showhide = !1) : (a.translateY(0).step(), 
        this.data.showhide = !0), this.setData({
            animationData1: a.export(),
            showhide: this.data.showhide
        });
    },
    showhide: function(t) {
        this.animationshow(this.data.showhide);
    },
    ShowInfo: function(t) {
        wx.showModal({
            title: t.currentTarget.dataset.title,
            content: t.currentTarget.dataset.content,
            showCancel: !1
        });
    },
    logistics: function(t) {
        if (t.currentTarget.dataset.isdefault) return !1;
        this.data.ShipSetting.map(function(t) {
            t.IsDefault = !1;
        }), this.data.ShipSetting[t.currentTarget.dataset.index].IsDefault = !0, this.data.temptypeid = this.data.ShipSetting[t.currentTarget.dataset.index].ID, 
        this.setData({
            ShipSetting: this.data.ShipSetting
        });
    },
    kdway: function(t) {
        this.data.status = !1, this.animation(!0);
    },
    fhway: function(o) {
        var e = this;
        e.data.gofirst ? (t.showLoading(""), a.httppost("pinhuobuyer/GetApplyList", {
            warehouseid: e.data.ShipApply.WareHouseID
        }, function(t) {
            t.Result && (t.Data.ApplyTypeList.map(function(t) {
                if (t.IsSelected && (e.data.selecteData = t), t.Desc.indexOf("#") > -1) {
                    t.split = !1;
                    var a = t.Desc.split("#");
                    t.firstText = a[0], t.lasttText = a[1];
                } else t.split = !0, t.firstText = "", t.lasttText = "";
            }), e.setData({
                ApplyTypeList: t.Data.ApplyTypeList,
                fhbool: !0,
                coupon_flag: !0,
                gofirst: !1,
                selecteData: e.data.selecteData
            }));
        }, "POST")) : e.setData({
            fhbool: !0,
            coupon_flag: !0
        });
    },
    close: function() {
        this.setData({
            fhbool: !1,
            coupon_flag: !1
        });
    },
    changeData: function(t) {
        var a = this;
        this.data.ApplyTypeList.map(function(o) {
            o.TypeID == t.detail.value && (a.data.selecteData = o);
        }), this.setData({
            selecteData: this.data.selecteData
        });
    },
    subData: function(t) {
        var o = 0, e = this;
        if (0 == this.data.selecteData.Min && 0 == this.data.selecteData.Max) o = 0; else {
            if ("" == (o = Number(t.detail.value["type" + this.data.selecteData.TypeID]))) return wx.showToast({
                title: "请填写件数或者天数"
            }), !1;
            if (o < this.data.selecteData.Min || o > this.data.selecteData.Max) return wx.showModal({
                title: "数量提示",
                content: "填写件数字需大于或等于" + this.data.selecteData.Min + "，并且小于或者等于" + this.data.selecteData.Max,
                showCancel: !1
            }), !1;
        }
        var i = {
            wareHouseIDS: e.data.WareHouseIDS,
            typeID: e.data.selecteData.TypeID,
            value: o
        };
        a.httppostmore("pinhuobuyer/SaveApplyInfo4Order", i, function(t) {
            console.log(t), t.Result ? (e.data.ShipApply.Desc = t.Data.ApplyInfo.Desc, e.setData({
                fhbool: !1,
                coupon_flag: !1,
                ShipApply: e.data.ShipApply
            })) : (e.setData({
                fhbool: !1,
                coupon_flag: !1
            }), wx.showModal({
                title: "提示",
                content: t.Message,
                showCancel: !1
            }));
        }, "POST");
    },
    detail: function(t) {
        wx.navigateTo({
            url: "/pages/pinhuo/detail?item=" + JSON.stringify(t.currentTarget.dataset.item)
        });
    }
});
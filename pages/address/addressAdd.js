var a = require("../../utils/httputil.js");

Page({
    data: {
        province: "",
        city: "",
        county: "",
        areaId: "",
        arrvalue: [ 0, 0, 0 ],
        area: "",
        dataurl: "",
        url: "",
        flag: !1,
        flagadd: !1,
        regionVal: ''
    },
    changeRegion: function(e) {
        this.setData({
            regionVal: e.detail.value
        });
    },    
    onLoad: function(t) {
        t.url && this.setData({
            url: t.url,
            quickPay: t.quickPay || !1
        }), t.flagadd && this.setData({
            flagadd: !0
        }), t.data && this.setData({
            dataurl: t.data,
            quickPay: t.quickPay || !1
        });
        var e = this;
        if (t.id) {
            var r = t.areaid.substring(0, 2), d = t.areaid.substring(0, 4);
            wx.setNavigationBarTitle({
                title: "编辑收货地址"
            }), this.setData({
                id: t.id,
                realname: t.realname,
                areaId: t.areaid,
                mobile: t.mobile,
                Address: t.address,
                area: t.area
            }), a.httppost("shop/area/Get?pid=0", {}, function(a) {
                for (var t = 0; t < a.Data.length; t++) {
                    if (r + "0000000" == a.Data[t].AreaID) {
                        e.data.arrvalue[0] = t;
                        break;
                    }
                    e.data.arrvalue[0] = 0;
                }
                e.setData({
                    provinces: a.Data,
                    arrvalue: e.data.arrvalue
                });
            }, "GET"), a.httppost("shop/area/Get?pid=" + r + "0000000", {}, function(a) {
                for (var t = 0; t < a.Data.length; t++) {
                    if (d + "00000" == a.Data[t].AreaID) {
                        e.data.arrvalue[1] = t;
                        break;
                    }
                    e.data.arrvalue[1] = 0;
                }
                e.setData({
                    citys: a.Data,
                    arrvalue: e.data.arrvalue
                });
            }, "GET"), a.httppost("shop/area/Get?pid=" + d + "00000", {}, function(a) {
                for (var r = 0; r < a.Data.length; r++) {
                    if (t.areaid == a.Data[r].AreaID) {
                        e.data.arrvalue[2] = r;
                        break;
                    }
                    e.data.arrvalue[2] = 0;
                }
                e.setData({
                    countys: a.Data,
                    arrvalue: e.data.arrvalue
                });
            }, "GET");
        } else wx.setNavigationBarTitle({
            title: "添加收货地址"
        }), a.httppost("shop/area/Get?pid=0", {}, function(a) {
            e.setData({
                provinces: a.Data
            });
        }, "GET"), a.httppost("shop/area/Get?pid=110000000", {}, function(a) {
            e.setData({
                citys: a.Data
            });
        }, "GET"), a.httppost("shop/area/Get?pid=110100000", {}, function(a) {
            e.setData({
                countys: a.Data
            });
        }, "GET");
    },
    bindChange: function(t) {
        var e = this;
        t.detail.value[0] !== e.data.arrvalue[0] ? (e.data.arrvalue[0] = t.detail.value[0], 
        e.data.arrvalue[1] = 0, e.data.arrvalue[2] = 0, this.setData({
            arrvalue: e.data.arrvalue
        }), a.httppost("shop/area/Get", {
            pid: e.data.provinces[e.data.arrvalue[0]].AreaID
        }, function(t) {
            0 !== t.Data.length ? (e.setData({
                citys: t.Data
            }), a.httppost("shop/area/Get", {
                pid: e.data.citys[e.data.arrvalue[1]].AreaID
            }, function(a) {
                e.setData({
                    countys: a.Data
                });
            }, "GET")) : e.setData({
                citys: [],
                countys: []
            });
        }, "GET")) : t.detail.value[1] !== e.data.arrvalue[1] ? (e.data.arrvalue[0] = t.detail.value[0], 
        e.data.arrvalue[1] = t.detail.value[1], e.data.arrvalue[2] = 0, this.setData({
            arrvalue: e.data.arrvalue
        }), 0 != e.data.citys.length && a.httppost("shop/area/Get", {
            pid: e.data.citys[e.data.arrvalue[1]].AreaID
        }, function(a) {
            e.setData({
                countys: a.Data
            });
        }, "GET")) : this.setData({
            arrvalue: t.detail.value
        });
    },
    selectaddress: function(a) {
        this.setData({
            flag: !this.data.flag
        });
    },
    open: function() {
        console.log('open')
        0 == this.data.citys.length ? (this.data.area = this.data.provinces[this.data.arrvalue[0]].Name, 
        this.setData({
            flag: !1,
            province: this.data.provinces[this.data.arrvalue[0]].Name,
            city: "",
            county: "",
            area: this.data.area,
            areaId: this.data.provinces[this.data.arrvalue[0]].AreaID
        })) : 0 == this.data.countys.length ? (this.data.area = this.data.provinces[this.data.arrvalue[0]].Name + " " + this.data.citys[this.data.arrvalue[1]].Name, 
        this.setData({
            flag: !1,
            province: this.data.provinces[this.data.arrvalue[0]].Name,
            city: this.data.citys[this.data.arrvalue[1]].Name,
            county: "",
            area: this.data.area,
            areaId: this.data.citys[this.data.arrvalue[1]].AreaID
        })) : (this.data.area = this.data.provinces[this.data.arrvalue[0]].Name + " " + this.data.citys[this.data.arrvalue[1]].Name + " " + this.data.countys[this.data.arrvalue[2]].Name, 
        this.setData({
            flag: !1,
            province: this.data.provinces[this.data.arrvalue[0]].Name,
            city: this.data.citys[this.data.arrvalue[1]].Name,
            county: this.data.countys[this.data.arrvalue[2]].Name,
            area: this.data.area,
            areaId: this.data.countys[this.data.arrvalue[2]].AreaID
        }));
    },
    add_submit: function(t) {
        var e = this;
        if ("" == t.detail.value.user) return wx.showToast({
            title: "请输入用户名",
            icon: "success",
            duration: 2e3
        }), !1;
        if ("" == this.data.areaId) return wx.showToast({
            title: "请选择地区",
            icon: "success",
            duration: 2e3
        }), !1;
        if ("" == t.detail.value.address) return wx.showToast({
            title: "请填写详细地址",
            icon: "success",
            duration: 2e3
        }), !1;
        if (!/^1\d{10}$/.test(t.detail.value.mobile)) return wx.showToast({
            title: "请填写正确手机号",
            icon: "success",
            duration: 2e3
        }), !1;
        if (this.data.id) {
            var r = {
                ID: e.data.id,
                realName: t.detail.value.user,
                mobile: t.detail.value.mobile,
                areaId: e.data.areaId,
                address: t.detail.value.address,
                isDefault: !0
            };
            a.httppost("shop/address/update", r, function(a) {
                "undefined" == e.data.url && "undefined" == e.data.dataurl ? wx.navigateTo({
                    url: "/pages/address/addresslist"
                }) : wx.redirectTo({
                    url: e.data.url + "?data=" + e.data.dataurl + "&quickPay=" + e.data.quickPay
                });
            }, "GET");
        } else {
            var d = {
                realName: t.detail.value.user,
                mobile: t.detail.value.mobile,
                areaId: e.data.areaId,
                address: t.detail.value.address,
                isDefault: !0
            };
            a.httppost("shop/address/add", d, function(a) {
                "undefined" == e.data.url && "undefined" != e.data.dataurl && e.data.flagadd ? wx.redirectTo({
                    url: "/pages/address/addresslist?data" + e.data.dataurl + "&url=" + e.data.url
                }) : "undefined" == e.data.url && "undefined" == e.data.dataurl ? wx.redirectTo({
                    url: "/pages/address/addresslist?data" + e.data.dataurl
                }) : wx.redirectTo({
                    url: e.data.url + "?data=" + e.data.dataurl + "&quickPay=" + e.data.quickPay
                });
            }, "GET");
        }
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});
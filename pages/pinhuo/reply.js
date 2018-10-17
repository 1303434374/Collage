var t = require("../../utils/httputil.js");

Page({
    data: {
        list: [],
        answer: "",
        idx: 0,
        obj: {},
        flag: !0
    },
    onLoad: function(a) {
        var i = this;
        t.httppost("pay/Security/GetMySecurityQstList", {}, function(t) {
            t.Data.length > 1 ? i.data.flag = !0 : i.data.flag = !1, i.setData({
                list: t.Data,
                obj: t.Data[i.data.idx],
                flag: i.data.flag
            });
        }, "GET");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    postanswer: function(a) {
        var i = this;
        "" == a.detail.value.question ? wx.showModal({
            title: "",
            content: "答案不能为空！",
            showCancel: !1,
            confirmText: "OK",
            confirmColor: "#3fa1f5"
        }) : (console.log(a.detail.value.question), t.httppost("pay/Security/CheckSecurityQstInfo", {
            Answer: a.detail.value.question,
            Qid: i.data.obj.ID,
            partner: 85419541,
            sign: "03ba219723089a9c26dd5acbaa48ce38"
        }, function(t) {
            wx.redirectTo({
                url: "/pages/yft/findpassword"
            });
        }, "GET"));
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    changeanswer: function() {
        var t = this.data.list.length;
        this.data.idx == t - 1 ? this.data.idx = 0 : this.data.idx = this.data.idx + 1, 
        this.setData({
            idx: this.data.idx,
            obj: this.data.list[this.data.idx],
            answer: ""
        });
    }
});
getApp();

var t = require("../../utils/httputil.js");

Page({
    data: {
        list: [],
        questions: [],
        idx: 0
    },
    onLoad: function(a) {
        var n = this;
        t.httppost("pay/Security/GetAllSecurityQstList", {}, function(t) {
            n.data.list = n.data.list.concat(t.Data.QuestionList1).concat(t.Data.QuestionList2).concat(t.Data.QuestionList3), 
            n.data.list.map(function(t) {
                n.data.questions.push(t.Name);
            }), n.setData({
                list: n.data.list,
                questions: n.data.questions
            });
        }, "GET");
    },
    onReady: function() {},
    changequestion: function(t) {
        this.setData({
            idx: t.detail.value
        });
    },
    setanswer: function(a) {
        if ("" == a.detail.value.answer) return wx.showModal({
            title: "",
            content: "请填写问题答案",
            showCancel: !1
        }), !1;
        var n = [], i = {};
        i.QuestionID = this.data.list[a.detail.value.question].ID, i.Answer = a.detail.value.answer, 
        n.push(i), t.httppost("pay/Security/SaveSecurityQstInfo", {
            info: JSON.stringify(n)
        }, function(t) {
            wx.navigateBack({
                delta: 1
            });
        }, "GET");
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
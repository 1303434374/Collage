getApp();

Page({
    data: {},
    gotodownload: function() {
        var t = new Array();
        t[0] = "http://item-img.b0.upaiyun.com/pinhuo/items/dfa9d63ac07752f6ed0b0a3ea3a10405.png", 
        wx.previewImage({
            current: "http://item-img.b0.upaiyun.com/pinhuo/items/dfa9d63ac07752f6ed0b0a3ea3a10405.png",
            urls: t
        });
    },
    setClipboard: function() {
        wx.setClipboardData({
            data: "http://www.nahuo.com/service/DownLoadpinhuoApp",
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "复制成功，记得打开浏览器粘贴到地址栏哦！",
                            icon: "success",
                            duration: 3e3
                        });
                    }
                });
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});
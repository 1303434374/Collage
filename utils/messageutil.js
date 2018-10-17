module.exports = {
    showtips: function(o, t) {
        return 0 == o ? "已拼" + o + "件,拼购" + t + "件成团！" : o < t ? "已拼" + o + "件,差" + (t - o) + "件成团！" : o >= t ? "已拼" + o + "件,我也要拼！" : void console.log(o);
    },
    showchengtuantiops: function(o, t) {
        return 0 == o ? "成团后即向档口报单发货，不成团退款！" : o < t ? "快成团了，约熟悉的店主一起拼～" : o >= t ? "已成团，即将向档口报单，想拼的赶紧下单哈！" : void 0;
    }
};
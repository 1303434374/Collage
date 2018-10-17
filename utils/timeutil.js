function t(t) {
    return t < 10 ? "0" + t : t;
}

module.exports = {
    date_format: function(o) {
        var r = Math.floor(o / 1e3), e = Math.floor(r / 3600), a = t(Math.floor((r - 3600 * e) / 60)), f = t(r - 3600 * e - 60 * a);
        return e < 10 && (e = "0" + e), e + "时" + a + "分" + f + "秒";
    }
};
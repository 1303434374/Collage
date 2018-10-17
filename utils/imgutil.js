var t = function(t, u) {
    return new RegExp("^" + t).test(u);
};

module.exports = {
    getImgUrl: function(u) {
        if ("" == u) return "";
        if (t("/u", u)) return "http://img4.nahuo.com" + u;
        if (t("http", u)) return u;
        var n = u.split(":");
        return "https://" + n[1] + ".b0.upaiyun.com" + n[2];
    },
    getUrl: function(t, u) {
        switch (0 == t.indexOf("upyun:") ? "upyun" : "nahuo") {
          case "upyun":
            return function(t, u) {
                if (!t) return "";
                if (0 != t.indexOf("upyun:")) return "";
                var n = t.split(":");
                if (3 != n.length) return t;
                if ("nahuo-img-server" == n[1]) return "http://" + n[1] + ".b0.upaiyun.com" + n[2] + "!thum." + u;
                var a = "http://" + n[1] + ".b0.upaiyun.com" + n[2];
                if (u && u > 0) {
                    var r = "";
                    return u <= 60 ? r = "a1" : 60 < u && u <= 80 ? r = "a2" : 80 < u && u <= 100 ? r = "a3" : 100 < u && u <= 120 ? r = "a4" : 120 < u && u <= 140 ? r = "a5" : 140 < u && u <= 160 ? r = "a6" : 160 < u && u <= 180 ? r = "a7" : 180 < u && u <= 200 ? r = "a8" : 200 < u && u <= 240 ? r = "a9" : 240 < u && u <= 280 ? r = "a10" : 280 < u && u <= 320 ? r = "a11" : 320 < u && u <= 360 ? r = "a12" : 360 < u && u <= 400 ? r = "a13" : 400 < u && u <= 440 ? r = "a14" : 440 < u && u <= 480 ? r = "a15" : 480 < u && u <= 520 ? r = "a16" : 520 < u && u <= 580 ? r = "a17" : 580 < u && u <= 600 ? r = "a18" : 600 < u && u <= 700 ? r = "a19" : 700 < u && u <= 800 ? r = "a20" : 800 < u && u <= 900 ? r = "a21" : 900 < u && u <= 1e3 ? r = "a22" : 1e3 < u && u <= 1100 ? r = "a23" : 1100 < u && u <= 1200 && (r = "a24"), 
                    a + "!" + r;
                }
                return a;
            }(t, u);

          case "nahuo":
            return function(t, u) {
                return t ? 0 == t.indexOf("http://") ? t : 0 == t.indexOf("/u") ? u && u > 0 ? "http://img4.nahuo.com" + t + "!thum." + u : "http://img4.nahuo.com" + t : u && u > 0 ? "https://img3.nahuo.com/" + t + "-" + u + "-" + u + ".jpg" : "https://img3.nahuo.com/" + t : "";
            }(t, u);

          default:
            return t;
        }
    }
};
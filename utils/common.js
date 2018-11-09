function t(t) {
    return t < 10 ? "0" + t : t;
}

function e(t, e) {
    var n = (65535 & t) + (65535 & e);
    return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n;
}

function n(t, e) {
    return t << e | t >>> 32 - e;
}

function a(t, a, r, o, u, c) {
    return e(n(e(e(a, t), e(o, c)), u), r);
}

function r(t, e, n, r, o, u, c) {
    return a(e & n | ~e & r, t, e, o, u, c);
}

function o(t, e, n, r, o, u, c) {
    return a(e & r | n & ~r, t, e, o, u, c);
}

function u(t, e, n, r, o, u, c) {
    return a(e ^ n ^ r, t, e, o, u, c);
}

function c(t, e, n, r, o, u, c) {
    return a(n ^ (e | ~r), t, e, o, u, c);
}

function i(t, n) {
    t[n >> 5] |= 128 << n % 32, t[14 + (n + 64 >>> 9 << 4)] = n;
    var a, i, s, p, g, f = 1732584193, d = -271733879, y = -1732584194, h = 271733878;
    for (a = 0; a < t.length; a += 16) i = f, s = d, p = y, g = h, d = c(d = c(d = c(d = c(d = u(d = u(d = u(d = u(d = o(d = o(d = o(d = o(d = r(d = r(d = r(d = r(d, y = r(y, h = r(h, f = r(f, d, y, h, t[a], 7, -680876936), d, y, t[a + 1], 12, -389564586), f, d, t[a + 2], 17, 606105819), h, f, t[a + 3], 22, -1044525330), y = r(y, h = r(h, f = r(f, d, y, h, t[a + 4], 7, -176418897), d, y, t[a + 5], 12, 1200080426), f, d, t[a + 6], 17, -1473231341), h, f, t[a + 7], 22, -45705983), y = r(y, h = r(h, f = r(f, d, y, h, t[a + 8], 7, 1770035416), d, y, t[a + 9], 12, -1958414417), f, d, t[a + 10], 17, -42063), h, f, t[a + 11], 22, -1990404162), y = r(y, h = r(h, f = r(f, d, y, h, t[a + 12], 7, 1804603682), d, y, t[a + 13], 12, -40341101), f, d, t[a + 14], 17, -1502002290), h, f, t[a + 15], 22, 1236535329), y = o(y, h = o(h, f = o(f, d, y, h, t[a + 1], 5, -165796510), d, y, t[a + 6], 9, -1069501632), f, d, t[a + 11], 14, 643717713), h, f, t[a], 20, -373897302), y = o(y, h = o(h, f = o(f, d, y, h, t[a + 5], 5, -701558691), d, y, t[a + 10], 9, 38016083), f, d, t[a + 15], 14, -660478335), h, f, t[a + 4], 20, -405537848), y = o(y, h = o(h, f = o(f, d, y, h, t[a + 9], 5, 568446438), d, y, t[a + 14], 9, -1019803690), f, d, t[a + 3], 14, -187363961), h, f, t[a + 8], 20, 1163531501), y = o(y, h = o(h, f = o(f, d, y, h, t[a + 13], 5, -1444681467), d, y, t[a + 2], 9, -51403784), f, d, t[a + 7], 14, 1735328473), h, f, t[a + 12], 20, -1926607734), y = u(y, h = u(h, f = u(f, d, y, h, t[a + 5], 4, -378558), d, y, t[a + 8], 11, -2022574463), f, d, t[a + 11], 16, 1839030562), h, f, t[a + 14], 23, -35309556), y = u(y, h = u(h, f = u(f, d, y, h, t[a + 1], 4, -1530992060), d, y, t[a + 4], 11, 1272893353), f, d, t[a + 7], 16, -155497632), h, f, t[a + 10], 23, -1094730640), y = u(y, h = u(h, f = u(f, d, y, h, t[a + 13], 4, 681279174), d, y, t[a], 11, -358537222), f, d, t[a + 3], 16, -722521979), h, f, t[a + 6], 23, 76029189), y = u(y, h = u(h, f = u(f, d, y, h, t[a + 9], 4, -640364487), d, y, t[a + 12], 11, -421815835), f, d, t[a + 15], 16, 530742520), h, f, t[a + 2], 23, -995338651), y = c(y, h = c(h, f = c(f, d, y, h, t[a], 6, -198630844), d, y, t[a + 7], 10, 1126891415), f, d, t[a + 14], 15, -1416354905), h, f, t[a + 5], 21, -57434055), y = c(y, h = c(h, f = c(f, d, y, h, t[a + 12], 6, 1700485571), d, y, t[a + 3], 10, -1894986606), f, d, t[a + 10], 15, -1051523), h, f, t[a + 1], 21, -2054922799), y = c(y, h = c(h, f = c(f, d, y, h, t[a + 8], 6, 1873313359), d, y, t[a + 15], 10, -30611744), f, d, t[a + 6], 15, -1560198380), h, f, t[a + 13], 21, 1309151649), y = c(y, h = c(h, f = c(f, d, y, h, t[a + 4], 6, -145523070), d, y, t[a + 11], 10, -1120210379), f, d, t[a + 2], 15, 718787259), h, f, t[a + 9], 21, -343485551), 
    f = e(f, i), d = e(d, s), y = e(y, p), h = e(h, g);
    return [ f, d, y, h ];
}

function s(t) {
    var e, n = "";
    for (e = 0; e < 32 * t.length; e += 8) n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
    return n;
}

function p(t) {
    var e, n = [];
    for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0;
    for (e = 0; e < 8 * t.length; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
    return n;
}

function g(t) {
    return s(i(p(t), 8 * t.length));
}

function f(t, e) {
    var n, a, r = p(t), o = [], u = [];
    for (o[15] = u[15] = void 0, r.length > 16 && (r = i(r, 8 * t.length)), n = 0; n < 16; n += 1) o[n] = 909522486 ^ r[n], 
    u[n] = 1549556828 ^ r[n];
    return a = i(o.concat(p(e)), 512 + 8 * e.length), s(i(u.concat(a), 640));
}

function d(t) {
    var e, n, a = "";
    for (n = 0; n < t.length; n += 1) e = t.charCodeAt(n), a += "0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(15 & e);
    return a;
}

function y(t) {
    return unescape(encodeURIComponent(t));
}

function h(t) {
    return g(y(t));
}

function l(t) {
    return d(h(t));
}

function w(t, e) {
    return f(y(t), y(e));
}

function m(t, e) {
    return d(w(t, e));
}

function S(t, e, n) {
    return e ? n ? w(e, t) : m(e, t) : n ? h(t) : l(t);
}

function P(t, e, n, a, r) {
    var o = {
        recharge_code: t.rechargecode,
        partner: "85419541",
        sign: t.sign,
        time_stamp: t.timestamp,
        nonce: t.noncestr
    };
    T.httppostmore("pay/Funds/GetRechargeInfo", o, function(o) {
        o.Result && ("3" == o.Data.status ? e = 5 : e++, e >= 5 ? v(n, a, r) : (D.showLoading("请稍等，正在同步付款状态" + e), 
        setTimeout(function() {
            P(t, e, n, a, r);
        }, 3e3)));
    }, "GET");
}

function v(t, e, n) {
    D.showLoading(""), T.httppost("pay/trade/QuickPayForPinhuoTrade", {
        payGuid: t,
        AppPayKey: S(e),
        payFrom: "mina"
    }, function(t) {
        wx.redirectTo({
            url: "/pages/success/success?money=" + n + "&payway=微信支付"
        });
    }, "POST");
}

var D = getApp(), T = require("./httputil.js"), x = function() {
    var e = new Date();
    return e.getFullYear().toString() + t(e.getMonth() + 1) + t(e.getDate()) + t(e.getHours()) + t(e.getMinutes()) + t(e.getSeconds());
};

module.exports = {
    unique: function(t) {
        for (var e = [], n = {}, a = 0; a < this.length; a++) n[t[a]] || (e.push(t[a]), 
        n[t[a]] = 1);
        return e;
    },
    datatranf: x,
    md5: S,
    payment: function(t, e, n) {
        return function() {
            var n = wx.getStorageSync("account"), a = S("nonce" + x()), r = {
                app: "SWXPinHuo",
                buyer_user_name: n,
                nonce: a,
                partner: "85419541",
                pay_code: "WeiXin",
                sign: a,
                time_stamp: x(),
                tag: "pinhuotrade",
                create_type: "In",
                client_type: "App",
                OrderIDS: t,
                money: e,
                openid: wx.getStorageSync("openid")
            };
            console.log('支付提交=')
            console.log(r)
            T.httppost("pay/Trade/CreateRecharge", r, function(n) {
                console.log('支付返回=')
                console.log(n)
                if (n.Result) {
                    wx.setStorageSync("flag", !0);
                    var a = t + n.Data.payGuid.toLowerCase() + wx.getStorageSync("userid"), r = n.Data.payGuid;
                    wx.requestPayment({
                        appId: n.Data.appid,
                        timeStamp: n.Data.timestamp,
                        nonceStr: n.Data.noncestr,
                        package: n.Data.package,
                        signType: "MD5",
                        paySign: n.Data.paysign,
                        success: function(t) {
                            D.showLoading("请稍等，支付马上完成"), P(n.Data, 0, r, a, e);
                        },
                        fail: function(t) {
                            "requestPayment:fail cancel" == t.errMsg ? wx.showToast({
                                title: "用户取消支付",
                                icon: "success",
                                duration: 2e3
                            }) : wx.showToast({
                                title: "支付失败",
                                icon: "success",
                                duration: 2e3
                            });
                        }
                    });
                } else wx.showModal({
                    title: "",
                    content: n.Message
                });
            }, "GET");
        }();
    },
    payment4yue: function(t, e, n, a) {
        var r = {
            orderIDS: t
        };
        T.httppostmore("pay/Account/ValidPaymentPassword?password=" + n, {}, function(a) {
            a.Result ? (D.showLoading("正在支付中"), T.httppost("pinhuo/order/GetPayInfo", r, function(a) {
                wx.setStorageSync("flag", !0);
                var r = t + a.Data.PayGuid.toLowerCase() + wx.getStorageSync("userid"), o = a.Data.PayGuid.toLowerCase();
                D.showLoading("正在支付中"), T.httppost("pay/trade/CreateTradeForPinHuo", {
                    PayGuid: o,
                    AppPayKey: S(r),
                    payPassword: S(n)
                }, function(t) {
                    wx.redirectTo({
                        url: "/pages/success/success?money=" + e + "&payway=余额支付"
                    });
                }, "POST");
            }, "POST")) : D.showToast(a.Message);
        });
    }
};
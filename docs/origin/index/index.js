var t = require("../../api.js"), a = getApp(), e = 0, o = 0, i = !0, r = 1, s = "", n = !1;

Page({
    data: {
        x: wx.getSystemInfoSync().windowWidth,
        y: wx.getSystemInfoSync().windowHeight,
        left: 0,
        show_notice: !1,
        animationData: {},
        play: -1,
        time: 0,
        buy_user: "",
        buy_address: "",
        buy_time: 0,
        buy_type: "",
        setNoticeInter:0
    },
    onLoad: function(t) {
        a.pageOnLoad(this);
        var e = 0, o = t.user_id, i = decodeURIComponent(t.scene);
        void 0 != o ? e = o : void 0 != i && (e = i), a.loginBindParent({
            parent_id: e
        });
    },
    suspension: function() {
        var e = this;
        o = setInterval(function() {
            a.request({
                url: t.default.buy_data,
                data: {
                    time: e.data.time
                },
                method: "POST",
                success: function(t) {
                    if (0 == t.code) {
                        var a = !1;
                        s == t.md5 && (a = !0);
                        var o = "", i = t.cha_time, r = Math.floor(i / 60 - 60 * Math.floor(i / 3600));
                        o = 0 == r ? i % 60 + "秒" : r + "分" + i % 60 + "秒";
                        var n = "购买了", d = "/pages/goods/goods?id=" + t.data.goods;
                        2 === t.data.type ? (n = "预约了", d = "/pages/book/details/details?id=" + t.data.goods) : 3 === t.data.type ? (n = "秒杀了", 
                        d = "/pages/miaosha/details/details?id=" + t.data.goods) : 4 === t.data.type && (n = "拼团了", 
                        d = "/pages/pt/details/details?gid=" + t.data.goods), !a && t.cha_time <= 300 ? (e.setData({
                            buy_time: o,
                            buy_type: n,
                            buy_url: d,
                            buy_user: t.data.user.length >= 5 ? t.data.user.slice(0, 4) + "..." : t.data.user,
                            buy_avatar_url: t.data.avatar_url,
                            buy_address: t.data.address.length >= 8 ? t.data.address.slice(0, 7) + "..." : t.data.address
                        }), s = t.md5) : e.setData({
                            buy_user: "",
                            buy_type: "",
                            buy_url: d,
                            buy_address: "",
                            buy_avatar_url: "",
                            buy_time: ""
                        });
                    }
                }
            });
        }, 1e4);
    },
    loadData: function(e) {
        console.log('loadData',this.data.setNoticeInter);
        var o = this, r = wx.getStorageSync("pages_index_index");
        r && (r.act_modal_list = [], o.setData(r)), a.request({
            url: t.default.index,
            success: function(t) {
                if (0 == t.code) {
                    i ? i = !1 : t.data.act_modal_list = [];
                    var a = t.data.topic_list, e = new Array();
                    if (a && 1 != t.data.update_list.topic.count) {
                        if (1 == a.length) e[0] = new Array(), e[0] = a; else for (var r = 0, s = 0; r < a.length; r += 2, 
                        s++) void 0 != a[r + 1] && (e[s] = new Array(), e[s][0] = a[r], e[s][1] = a[r + 1]);
                        t.data.topic_list = e;
                    }
                    o.setData(t.data), wx.setStorageSync("store", t.data.store), wx.setStorageSync("pages_index_index", t.data);
                    var n = wx.getStorageSync("user_info");
                    n && o.setData({
                        _user_info: n
                    }), o.miaoshaTimer();
                }
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    onShow: function() {
        a.pageOnShow(this), e = 0;
        this.loadData();
        var t = wx.getStorageSync("store");
        t && t.name && wx.setNavigationBarTitle({
            title: t.name
        }), 1 === t.purchase_frame ? this.suspension(this.data.time) : this.setData({
            buy_user: ""
        }), clearInterval(1), this.notice();
        console.log('onShow', this.data.setNoticeInter);
        this.getHeight();
        console.log('afterOnShowGetHeight', this.data.setNoticeInter);
    },
    onPullDownRefresh: function() {
        clearInterval(r), this.endSetInter(),this.loadData();
        console.log('onShow', this.data.setNoticeInter);
        this.getHeight();
        console.log('afterOnShowGetHeight', this.data.setNoticeInter);
    },
    onShareAppMessage: function(t) {
        var o = this;
        return {
            path: "/pages/index/index?user_id=" + wx.getStorageSync("user_info").id,
            success: function(t) {
                1 == ++e && a.shareSendCoupon(o);
            },
            title: o.data.store.name
        };
    },
    showshop: function(e) {
        var o = this, i = e.currentTarget.dataset.id, r = e.currentTarget.dataset;
        a.request({
            url: t.default.goods,
            data: {
                id: i
            },
            success: function(t) {
                0 == t.code && o.setData({
                    data: r,
                    attr_group_list: t.data.attr_group_list,
                    goods: t.data,
                    showModal: !0
                });
            }
        });
    },
    close_box: function(t) {
        this.setData({
            showModal: !1
        });
    },
    attrClick: function(t) {
        var a = this, e = t.target.dataset.groupId, o = t.target.dataset.id, i = a.data.attr_group_list;
        for (var r in i) if (i[r].attr_group_id == e) for (var s in i[r].attr_list) i[r].attr_list[s].attr_id == o ? i[r].attr_list[s].checked = !0 : i[r].attr_list[s].checked = !1;
        for (var n = i.length, d = 0; d < n; d++) u = (c = i[d].attr_list).length;
        for (var l = [], d = 0; d < n; d++) for (var c = i[d].attr_list, u = c.length, r = 0; r < u; r++) if (1 == c[r].checked) {
            var _ = {
                attr_id: c[r].attr_id,
                attr_name: c[r].attr_name
            };
            l.push(_);
        }
        for (var g = JSON.parse(a.data.goods.attr), h = g.length, p = 0; p < h; p++) if (JSON.stringify(g[p].attr_list) == JSON.stringify(l)) var f = g[p].price;
        a.setData({
            attr_group_list: i,
            check_goods_price: f,
            check_attr_list: l
        }), a.setData({
            attr_group_list: i
        });
    },
    onConfirm: function(t) {
        var a = this, e = a.data.attr_group_list, o = JSON.parse(a.data.goods.attr), i = [];
        for (var r in e) {
            o = !1;
            for (var s in e[r].attr_list) if (e[r].attr_list[s].checked) {
                o = {
                    attr_id: e[r].attr_list[s].attr_id,
                    attr_name: e[r].attr_list[s].attr_name
                };
                break;
            }
            if (!o) return wx.showToast({
                title: "请选择" + e[r].attr_group_name,
                image: "/images/icon-warning.png"
            }), !0;
            i.push({
                attr_group_id: e[r].attr_group_id,
                attr_group_name: e[r].attr_group_name,
                attr_id: o.attr_id,
                attr_name: o.attr_name
            });
        }
        a.setData({
            attr_group_list: e
        });
        for (var n = a.data.check_attr_list, d = o.length, l = 0; l < d; l++) if (JSON.stringify(o[l].attr_list) == JSON.stringify(n)) var c = o[l].num;
        var u = wx.getStorageSync("item").quick_list, _ = a.data.goods;
        console.log(_.id, u, 323);
        for (var g = u.length, h = [], r = 0; r < g; r++) for (var p = u[r].goods, f = p.length, m = 0; m < f; m++) h.push(p[m]);
        for (var v = h.length, y = [], l = 0; l < v; l++) console.log(h[l].id, 111), h[l].id == _.id && y.push(h[l]);
        a.setData({
            checked_attr_list: i
        });
        for (var d = i.length, w = [], m = 0; m < d; m++) w.push(i[m].attr_id);
        console.log(y, 1111);
        var x = a.data.carGoods, S = a.data.check_goods_price;
        if (0 == S) D = parseFloat(y[0].price); else var D = parseFloat(S);
        y[0].id, y[0].name;
        var b = 0;
        if (b > c) {
            wx.showToast({
                title: "商品库存不足",
                image: "/images/icon-warning.png"
            }), b = c;
            for (var f = y.length, k = 0; k < f; k++) y[k].num += 1;
            var I = a.data.total;
            I.total_num += 1, I.total_price = parseFloat(I.total_price), I.total_price += D, 
            I.total_price = I.total_price.toFixed(2);
            var T = a.data.quick_hot_goods_lists;
            T.find(function(t) {
                return t.id == _.id;
            });
            a.setData({
                quick_hot_goods_lists: T,
                quick_list: u,
                carGoods: x,
                total: I,
                check_num: b
            });
        }
    },
    receive: function(e) {
        var o = this, i = e.currentTarget.dataset.index;
        wx.showLoading({
            title: "领取中",
            mask: !0
        }), o.hideGetCoupon || (o.hideGetCoupon = function(t) {
            var a = t.currentTarget.dataset.url || !1;
            o.setData({
                get_coupon_list: null
            }), a && wx.navigateTo({
                url: a
            });
        }), a.request({
            url: t.coupon.receive,
            data: {
                id: i
            },
            success: function(t) {
                wx.hideLoading(), 0 == t.code ? o.setData({
                    get_coupon_list: t.data.list,
                    coupon_list: t.data.coupon_list
                }) : (wx.showToast({
                    title: t.msg,
                    duration: 2e3
                }), o.setData({
                    coupon_list: t.data.coupon_list
                }));
            }
        });
    },
    navigatorClick: function(t) {
        var a = t.currentTarget.dataset.open_type, e = t.currentTarget.dataset.url;
        return "wxapp" != a || (e = function(t) {
            var a = /([^&=]+)=([\w\W]*?)(&|$|#)/g, e = /^[^\?]+\?([\w\W]+)$/.exec(t), o = {};
            if (e && e[1]) for (var i, r = e[1]; null != (i = a.exec(r)); ) o[i[1]] = i[2];
            return o;
        }(e), e.path = e.path ? decodeURIComponent(e.path) : "", console.log("Open New App"),
        wx.navigateToMiniProgram({
            appId: e.appId,
            path: e.path,
            complete: function(t) {
                console.log(t);
            }
        }), !1);
    },
    checkShare:function(mobile){
        a.request({
            url: t.order.check_share,
            data: {
                mobile: mobile
            },
            success: function (t) {
                if (0 == t.code){
                    return true;
                }else{
                    return false;
                }
            }
        });
    },
    closeCouponBox: function(t) {
        this.setData({
            get_coupon_list: ""
        });
    },
    notice: function() {
        var t = this.data.notice;
        if (void 0 != t) t.length;
    },
    miaoshaTimer: function() {
        var t = this;
        t.data.miaosha && t.data.miaosha.rest_time && (r = setInterval(function() {
            t.data.miaosha.rest_time > 0 ? (t.data.miaosha.rest_time = t.data.miaosha.rest_time - 1, 
            t.data.miaosha.times = t.getTimesBySecond(t.data.miaosha.rest_time), t.setData({
                miaosha: t.data.miaosha
            })) : clearInterval(r);
        }, 1e3));
    },
    onHide: function() {
        a.pageOnHide(this), this.setData({
            play: -1
        }), clearInterval(1), clearInterval(o), console.log("hide"),this.endSetInter();
    },
    onUnload: function() {
        a.pageOnUnload(this), this.setData({
            play: -1
        }), clearInterval(r), clearInterval(1), clearInterval(o),console.log("unload"),this.endSetInter();
    },
    showNotice: function(e) {
        console.log(e);
        var articleCat = e.currentTarget.dataset.articleCat;
        wx.navigateTo({
            url:"/pages/article-list/article-list?articleCat="+articleCat
        });
    },
    closeNotice: function() {
        this.setData({
            show_notice: !1
        });
    },
    getTimesBySecond: function(t) {
        if (t = parseInt(t), isNaN(t)) return {
            h: "00",
            m: "00",
            s: "00"
        };
        var a = parseInt(t / 3600), e = parseInt(t % 3600 / 60), o = t % 60;
        return a >= 1 && (a -= 1), {
            h: a < 10 ? "0" + a : "" + a,
            m: e < 10 ? "0" + e : "" + e,
            s: o < 10 ? "0" + o : "" + o
        };
    },
    to_dial: function() {
        var t = this.data.store.contact_tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    closeActModal: function() {
        var t, a = this, e = a.data.act_modal_list, o = !0;
        for (var i in e) {
            var r = parseInt(i);
            e[r].show && (e[r].show = !1, void 0 !== e[t = r + 1] && o && (o = !1, setTimeout(function() {
                a.data.act_modal_list[t].show = !0, a.setData({
                    act_modal_list: a.data.act_modal_list
                });
            }, 500)));
        }
        a.setData({
            act_modal_list: e
        });
    },
    naveClick: function(t) {
        var e = this;
        a.navigatorClick(t, e);
    },
    play: function(t) {
        this.setData({
            play: t.currentTarget.dataset.index
        });
    },
    onPageScroll: function(t) {
        var a = this;
        n || -1 != a.data.play && wx.createSelectorQuery().select(".video").fields({
            rect: !0
        }, function(t) {
            var e = wx.getSystemInfoSync().windowHeight;
            (t.top <= -200 || t.top >= e - 57) && a.setData({
                play: -1
            });
        }).exec();
    },
    fullscreenchange: function(t) {
        n = !!t.detail.fullScreen;
    },
    util: function (obj) {
        if (this.data.setNoticeInter !== 0) {
            return;
        }
        var continueTime = (parseInt(obj.list / obj.container) + 1) * 1500;
        var setIntervalTime = 50 + continueTime;
        var animation = wx.createAnimation({
            duration: 400,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = animation;
        animation.translateY(obj.container).step({ duration: 5, timingFunction: 'step-start' }).translateY(-obj.list).step({ duration: continueTime });
        this.setData({
            animationData: animation.export()
        })
        this.data.setNoticeInter = setInterval(() => {
            animation.translateY(obj.container).step({ duration: 5, timingFunction: 'step-start' }).translateY(-obj.list).step({ duration: continueTime });
            this.setData({
                animationData: animation.export()
            })
        }, setIntervalTime)
        console.log(this.data.setNoticeInter, 'setInterVal', this);
    },
    getHeight() {
        console.log('getHeight:', this);
        this.endSetInter();
        var obj = new Object();
        var query = wx.createSelectorQuery();
        query.select('.notice-box').boundingClientRect()
        query.select('.list').boundingClientRect()
        query.exec((res) => {
            obj.container = res[0].height;
            obj.list = res[1].height;
            this.util(obj);
        })
    },
    endSetInter: function(){
        console.log('endSetInter:', this);
        clearInterval(this.data.setNoticeInter);
        this.data.setNoticeInter = 0;
    },
});
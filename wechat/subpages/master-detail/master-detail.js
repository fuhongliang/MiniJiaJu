var t = require("../../api.js"), a = getApp(), e = require("../../wxParse/wxParse.js");

Page({
  data: {},
  onLoad: function (i) {
    a.pageOnLoad(this);
    var n = this;
    a.request({
      url: t.default.master,
      data: {
        id: i.id
      },
      success: function (t) {
        0 == t.code ? (n.setData(t.data), e.wxParse("content", "html", t.data.info, n)) : wx.showModal({
          title: "提示",
          content: t.msg,
          showCancel: !1,
          success: function (t) {
            t.confirm && wx.redirectTo({
              url: "/pages/index/index"
            });
          }
        });
      }
    });
    var o = i.user_id;
    o && a.loginBindParent({
      parent_id: o
    });
  },
  wxParseTagATap: function (t) {
    if (console.log(t), t.currentTarget.dataset.goods) {
      var a = t.currentTarget.dataset.src || !1;
      if (!a) return;
      wx.navigateTo({
        url: a
      });
    }
  },
  favoriteClick: function (e) {
    var i = this, n = e.currentTarget.dataset.action;
    a.request({
      url: t.user.topic_favorite,
      data: {
        topic_id: i.data.id,
        action: n
      },
      success: function (t) {
        wx.showToast({
          title: t.msg
        }), 0 == t.code && i.setData({
          is_favorite: n
        });
      }
    });
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  phoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.replyPhone,
      success: function () {
        console.log("成功拨打电话")
      },
    })
  },
  onShareAppMessage: function () {
    var t = this, a = wx.getStorageSync("user_info"), e = t.data.id;
    return {
      title: t.data.title,
      path: "/pages/master-detail/master-detail?id=" + e + "&user_id=" + a.id
    };
  }
});
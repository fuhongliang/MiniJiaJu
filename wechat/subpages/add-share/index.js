var e = require("../../api.js"),
  a = getApp(),host = require('../../config.js');

Page({
  data: {
    img_url:host.hostUrl,
    form: {
      name: "",
      mobile: "",
      gongzhong: '0',
      case: "",
      icdimg: '',
      cdimg2: '',
    },
    img: "/images/img-share-un.png",
    agree: 0,
    show_modal: !1,
    work_type: [],
    search_finish:0,
    index: 0,
    icdimg: '/images/img-icd-01.jpg',
    icdimg2: '/images/img-icd-02.jpg'
  },
  onLoad: function(es) {
    console.log('route:', es);
    var t = this;
    a.request({
      url: e.share.index,
      success: function(r) {
        if (0 == r.code) {
          t.setData({
            work_type: r.data.work_type
          });
          wx.setStorageSync("share_setting", r.data);
        }
      }
    });
    a.pageOnLoad(this);
  },
  onReady: function() {},
  onShow: function() {
    var t = this;
    a.request({
      url: e.user.index,
      success: function(r) {
        if (0 == r.code) {
          t.setData({
            user_info: r.data.user_info
          });
          wx.setStorageSync("share_setting", r.data.share_setting), wx.setStorageSync("user_info", r.data.user_info), console.log('user_info:', r.data);
        }
      }
    });
    var o = wx.getStorageSync("user_info"),
        i = wx.getStorageSync("store"),
        n = wx.getStorageSync("share_setting");
    wx.showLoading({
      title: "加载中"
    }), a.pageOnShow(t), t.setData({
      user_info: o,
      store: i,
      share_setting: n,
    }), a.request({
      url: e.share.check,
      method: "POST",
      success: function(e) {
        0 == e.code && (o.is_distributor = e.data, wx.setStorageSync("user_info", o), 1 == e.data && wx.redirectTo({
          url: "/pages/share/index"
        })), t.setData({
          user_info: o
        });
      },
      complete: function() {
        wx.hideLoading();
        t.setData({
          search_finish:1
        });
      }
    });
  },
  onHide: function() {},
  onUnload: function(e) {
    console.log(e);
  },
  formSubmit: function(t) {
    var o = this,
      i = wx.getStorageSync("user_info");

    if (o.data.form = t.detail.value, void 0 != o.data.form.name && "" != o.data.form.name)
      if (void 0 != o.data.form.mobile && "" != o.data.form.mobile)
        if (/^\+?\d[\d -]{8,12}\d/.test(o.data.form.mobile)) {
          if (void 0 != o.data.form.gongzhong && "" != o.data.form.gongzhong)
          {
            o.data.form.worktype = o.data.work_type[o.data.index];
            if (void 0 == o.data.form.case || "" == o.data.form.case){
              wx.showModal({
                title: "提示",
                content: "请填写装修案例",
                showCancel: !1
              });
              return false;
            }
            if (void 0 == o.data.form.icdimg || "" == o.data.form.icdimg) {
              wx.showModal({
                title: "提示",
                content: "请上传身份证正面",
                showCancel: !1
              });
              return false;
            }
            if (void 0 == o.data.form.icdimg2 || "" == o.data.form.icdimg2) {
              wx.showModal({
                title: "提示",
                content: "请上传身份证反面",
                showCancel: !1
              });
              return false;
            }
            var n = t.detail.value;
            n.form_id = t.detail.formId, 0 != o.data.agree ? (console.log(o.data.agree), wx.showLoading({
              title: "正在提交",
              mask: !0
            }), a.request({
              url: e.share.join,
              method: "POST",
              data: n,
              success: function (e) {
                0 == e.code ? (i.is_distributor = 2, wx.setStorageSync("user_info", i), wx.redirectTo({
                  url: "/pages/add-share/index"
                })) : wx.showToast({
                  title: e.msg,
                  image: "/images/icon-warning.png"
                });
              }
            })) : wx.showToast({
              title: "请先阅读并确认土专家申请协议！！",
              image: "/images/icon-warning.png"
            });
          }else{
            wx.showModal({
              title: "提示",
              content: "请选择工种",
              showCancel: !1
            });
          }
        } else wx.showModal({
          title: "提示",
          content: "手机号格式不正确",
          showCancel: !1
        });
      else wx.showToast({
        title: "请填写手机号码！",
        image: "/images/icon-warning.png"
      });
    else wx.showToast({
      title: "请填写姓名！",
      image: "/images/icon-warning.png"
    });
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  agreement: function() {
    wx.getStorageSync("share_setting");
    this.setData({
      show_modal: !0
    });
  },
  agree: function() {
    var e = this,
      a = e.data.agree;
    0 == a ? (a = 1, e.setData({
      img: "/images/img-share-agree.png",
      agree: a
    })) : 1 == a && (a = 0, e.setData({
      img: "/images/img-share-un.png",
      agree: a
    }));
  },
  close: function() {
    this.setData({
      show_modal: !1,
      img: "/images/img-share-agree.png",
      agree: 1
    });
  },
  bindSelectParentUser: function(e) {
    wx.navigateTo({
      url:"/pages/share-search/index"
    });
  },
  bindWorkTypeChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var t = this;
    t.setData({
      index: e.detail.value
    })
  },
  bindUploadImg: function() {
    var t = this;
    a.uploader.upload({
      start: function (r) {
        wx.showLoading({
          title: "正在上传",
          mask: !0
        })
      },
      success: function (r) {
        0 == r.code ? (t.data.form.icdimg = r.data.url, t.setData({
          icdimg: r.data.url
        })) : t.showToast({
            title: r.msg
        })
      },
      error: function (r) {
        console.log(r), t.showToast({
          title: r
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  bindUploadImg2: function () {
    var t = this;
    a.uploader.upload({
      start: function (r) {
        wx.showLoading({
          title: "正在上传",
          mask: !0
        })
      },
      success: function (r) {
        0 == r.code ? (t.data.form.icdimg2 = r.data.url, t.setData({
          icdimg2: r.data.url
        })) : t.showToast({
          title: r.msg
        })
      },
      error: function (r) {
        console.log(r), t.showToast({
          title: r
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  }
});

var t = require("../../api.js"), a = getApp(), e = !1, i = !1;

Page({
  data: {
    page: 1,
    list:[],
    work_type:[],
    index:0,
    show_work_type:!1,
    select_type:'请选择工种',
    keyword:'',
    search_finish:0
  },
  onLoad: function (t) {
    var n = wx.getStorageSync("share_setting");
    var all = n.work_type;
    this.data.select_type = t.select_type || '请选择工种';
    var tmp = t.select_type || '请选择工种';
    this.setData({
      work_type: all,
      select_type: tmp
    });
    a.pageOnLoad(this), this.loadData();
  },
  loadData: function () {
    var s = this;
    s.setData({
      show_loading_bar: !0
    });
    wx.showLoading({
      title: "加载中"
    });
    var d = s.data.page || 2;
    a.request({
      url: t.default.master_list,
      data: {
        page: d,
        keyword: s.data.keyword,
        select_type: s.data.select_type
      },
      success: function (t) {
        0 == t.data.list.length && (i = !0);
        var a = s.data.list.concat(t.data.list);
        s.setData({
          list: a,
          page: d + 1
        });
      },
      complete: function () {
        e = !1, s.setData({
          show_loading_bar: !1,
          search_finish:1
        });
        wx.hideLoading();
      }
    });
  },
  search: function() {
    var o = this;
    wx.showLoading({
      title: "搜索中"
    }), a.request({
      url: t.default.master_list,
      method: "GET",
      data: {
        page: 1,
        keyword: o.data.keyword,
        select_type: o.data.select_type
      },
      success: function (t) {
        0 == t.code &&
        o.setData({
          list: t.data.list,
        });
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  },
  inputFocus: function(t) {
    this.setData({
      show: !0
    });
  },
  inputBlur: function(t) {
    this.setData({
      show: !1
    });
  },
  inputConfirm: function(t) {
    this.search();
  },
  input: function(t) {
    this.setData({
      keyword: t.detail.value
    });
  },
  payPicker: function(t) {
    var a = t.currentTarget.dataset.index;
    console.log(t);
    this.setData({
      select_type: a,
      show_work_type: !1
    });
  },
  showWorkType: function() {
    this.setData({
      show_work_type: !0
    });
  },
  payClose: function() {
    this.setData({
      show_work_type: !1
    });
  },
  onShow: function () {
    a.pageOnShow(this);
  },
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {
    var t = this;
    i || t.loadData();
  },
});

var s = require("../../api.js"), a = getApp();

Page({
    data: {
        mode:0,//0是图文  1是装修方案
        height:800,
        image_text:[
            {
                pic_url:"/images/total/dingdan_beijing@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            },
                        {
                pic_url:"/images/total/dingdan_beijing@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            },
            {
                pic_url:"/images/total/home_bnt_banner@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            },
                                    {
                pic_url:"/images/total/dingdan_beijing@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            },
            {
                pic_url:"/images/total/home_bnt_banner@2x.png",
                content:"这里还差一副电表箱的画",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            }
        ],
        cases:[
            {
                pic_url:"/images/total/home_bnt_banner@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            },
                        {
                pic_url:"/images/total/home_bnt_banner@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            },
                        {
                pic_url:"/images/total/home_bnt_banner@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            },
            {
                pic_url:"/images/total/home_bnt_banner@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨这里还差一副电表箱的画，晚上开灯会很温馨",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            },
            {
                pic_url:"/images/total/home_bnt_banner@2x.png",
                content:"这里还差一副电表箱的画，晚上开灯会很温馨",
                person_img:"/images/total/home_bnt_banner@2x.png",
                person_name:"Stephine",
                time:"10分钟前"
            }
        ]
    },
    onLoad: function(s) {
        
    },
    onReady: function() {
        var h1 = this.data.image_text.length;
        var h2 = this.data.cases.length;
        if(this.data.mode == 0){
            this.setData({
                height:h1*300
            })
        }else{
            this.setData({
                height:h2*500
            })
        }
    },
    onShow: function() {

    },
    toggleTypes:function(e) {
        var h1 = this.data.image_text.length;
        var h2 = this.data.cases.length;
        if(this.data.mode == 0){
            this.setData({
                height:h1*500,
                mode:e.detail.current
            })
        }else{
            this.setData({
                height:h2*300,
                mode:e.detail.current
            })
        }
    },
    toggleBar:function(e){
        if(this.data.mode == 0){
            this.setData({
                mode:1
            })
        }else{
            this.setData({
                mode:0
            })
        }
        console.log(this.data.mode);
    }
});
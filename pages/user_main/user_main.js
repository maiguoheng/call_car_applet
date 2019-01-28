var e = getApp()
const Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js')
var currentUser = Bmob.User.current();
Page({
  data: {
    
    is_driver:false,
    user_picture:null,
    user_name:null,
    time: null,
    callcar_time:null,
    userMenuList: [{
      groupName: "我的订单",
      icon: "../images/文档.png",
      //rightImage: "../images/文档.png"
    }, {
      groupName: "关于",
      icon: "../images/一般提示.png",
      //rightImage: "/images/tip.png"
    }],
    

    driver_menulist: [{
      groupName: "设置司机服务状态",
      icon: "../images/设置.png",
     // rightImage: "/images/tip.png"
    }
    // {
    //   groupName: "关于",
    //   icon: "../images/一般提示.png",
    //   rightImage: "/images/tip.png"
    // }
    ]
  },
  toPage: function (e) {
    var r = this,
      a = e.currentTarget.dataset.index;
    switch (console.log(a), a) {
      case 0: //我的订单
        wx.navigateTo({
          url: "/pages/bill/bill"
        });
        break;

      case 1: wx.navigateTo({
        url: '../about/about'
      })
        break;

      // case 2: //车位管理
      //   wx.navigateTo({
      //     url: "/pages/parkingSpace/parkingSpace"
      //   });
      //   break;

      // case 3: //关于
      //   wx.navigateTo({
      //     url: "/pages/about/about"
      //   });
    }
  },
  to_page_driver: function (e) {
    var r = this,
      a = e.currentTarget.dataset.index;
    switch (console.log(a), a) {
      case 0: //我的订单
        wx.navigateTo({
          url: '/pages/driver_main/driver_main',
        })
        break;

      // case 1: wx.navigateTo({
      //   url: '../about/about'
      // })
      //   break;

      // case 2: //车位管理
      //   wx.navigateTo({
      //     url: "/pages/parkingSpace/parkingSpace"
      //   });
      //   break;

      // case 3: //关于
      //   wx.navigateTo({
      //     url: "/pages/about/about"
      //   });
    }
  },
  onLoad: function () {
    var that = this;
    //var info = wx.getStorageSync('userInfo');
    //console.log(personInfo.attributes.userPic)
    that.setData({
      
      user_picture: currentUser.attributes.userPic,
      user_name: currentUser.attributes.nickname
    });
    console.log(currentUser.attributes.userPic)

this.driver_load()




  },

  btnAmount: function () {
   
  },

  btnCountProfit: function () {
   
  },

  onShow: function () {
    this.requestUser();
   
  },

  driver_page: function(){

    wx.navigateTo({
      url: '/pages/driver_main/driver_main',
    })
  },


driver_load:function(){
  var that = this;
  var Diary = Bmob.Object.extend("driver");
  var query = new Bmob.Query(Diary);
  query.equalTo("driver_id", currentUser.attributes.userData.openid);
  // 查询所有数据
  query.find({
    success: function (results) {


      that.setData({

       is_driver:true
      });
     
    }
  })



},


  requestUser: function () {
    var that = this;
    var Diary = Bmob.Object.extend("call_car");
    var query = new Bmob.Query(Diary);
    query.equalTo("caller_id", currentUser.attributes.userData.openid);
    // 查询所有数据
    query.find({
      success: function (results) {
        
        
        that.setData({

          callcar_time: results.length
        });
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          console.log(object.id + ' - ' + object.get('title'));
        }
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });



    
  },
});
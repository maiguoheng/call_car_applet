// pages/book_car/book_car.js
var app = getApp()
var that=this
const Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js')
var util = require('../../utils/util.js');
var time = util.formatTime(new Date())
var currentUser = Bmob.User.current();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    input_name: '',
    errorMessage: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {










    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  formSubmit: function(e) {
  console.log(e)
    if (e.detail.value.input_name == "" || e.detail.value.input_phone == ""||e.detail.value.input_direction=="") {
      this.showErrorMessage("请填写完整");
      return;
    }

    console.log('form发生了submit事件，携带数据为：')
    console.log('form发生了submit事件，携带数据为：Name: ', e.detail.value.input_name)
    console.log('form发生了submit事件，携带数据为：Phone: ', e.detail.value.input_phone)
    console.log('form发生了submit事件，携带数据为：Attend: ', e.detail.value.input_attend)
    

    var _this = this
    /*********************    
    wx.redirectTo({
      url:'create_photo'
    })
    **********************/
    
    wx.showToast({
      title: '正在提交...',
      icon: 'loading',
      duration: 3000
    })


    //const query = Bmob.Query('call_car');
    var Call_car = Bmob.Object.extend("call_car");
    var query=new Call_car();
    
    query.set("caller_id", currentUser.attributes.userData.openid)
    
    query.set("driver_id", "oVUTX5btTNJ1cDcPpaalmlxmtXk8")
    query.set("caller_name", e.detail.value.input_name)
    query.set("direction", e.detail.value.input_direction)
    query.set("caller_phone", e.detail.value.input_phone)
    query.save(null, {
      success: function (result) {
        console.log('create success!');
      },
      error: function (object, error) {
        console.log('create failed!');
      }
    });

    
    


    console.log(e.detail.formId)
   
   // console.log(currentUser)
    //var open_id = currentUser.get("openid");
    var temp = {

      "touser": "oVUTX5btTNJ1cDcPpaalmlxmtXk8",
      "template_id": "FUl2KZxO0kzj48VTV9QT-RcrFYpNT5ESmTrkJnM9Fl0",
      "page": "",
      "form_id": e.detail.formId,
      "data": {
        "keyword1": {
          "value": e.detail.value.input_name,
          "color": "#173177"
        },
        "keyword2": {
          "value": e.detail.value.input_phone
        },
        "keyword3": {
          "value": e.detail.value.input_direction
        },
        "keyword4": {
          "value": time
        },
        "keyword5": {
          "value": e.detail.value.input_direction
        }
      },
      "emphasis_keyword": "keyword1.DATA"
    }
   
    app.globalData.temp_formid = e.detail.formId
    app.globalData.temp_name = e.detail.value.input_name
    app.globalData.temp_time = time
    app.globalData.direction = e.detail.value.input_direction
    Bmob.sendMessage(temp).then(function (obj) {
      console.log('发送成功')
      wx.redirectTo({
        url: '../book_ok/book_ok'
      })

      
    },
      function (err) {
        common.showTip('失败' + err)
        console.log(err)
      });


    




  },
  showErrorMessage: function(message) {
    this.setData({
      errorMessage: message
    });
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.translateY(30).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function() {
      animation.translateY(-30).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 3000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
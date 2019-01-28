// pages/book_ok/book_ok.js
const Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js')
var util = require('../../utils/util.js');
var time = util.formatTime(new Date())
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  cancel: function (e){

  var temp = {

    "touser": "oVUTX5btTNJ1cDcPpaalmlxmtXk8",
    "template_id": "JHeU5mtQKefOByxC5zm5ERkMGO5Z8BMoHp6om2QbPOM",
    "page": "",
    "form_id": e.detail.formId,
    "data": {
      "keyword1": {
        "value": app.globalData.temp_name,
        "color": "#173177"
      },
      "keyword2": {
        "value": app.globalData.temp_time
      },
      "keyword3": {
        "value": app.globalData.direction
      },
     
    },
    "emphasis_keyword": "keyword1.DATA"
  }
  Bmob.sendMessage(temp).then(function (obj) {
    console.log('发送成功')
    wx.redirectTo({
      url: '../cancel_ok/cancel_ok'
    })


  },
    function (err) {
      common.showTip('失败' + err)
      console.log(err)
    });


},

  to_pay: function () {
    wx.redirectTo({
      url: '../pay/pay'
    })
    

  },
  call_driver: function(){
    wx.makePhoneCall({
      phoneNumber: "18620800888"
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
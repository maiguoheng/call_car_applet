// pages/select_mode/select_mode.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     this.setData({
       nickName: wx.getStorageSync("userInfo").nickName
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  goToCustomer:function(){
    wx.switchTab({
      url: '../main_menu/main_menu'
    })
  },
  goToDriver: function () {
    getApp().globalData.is_driver=true
    console.log(getApp().globalData.is_driver = true)

    wx.redirectTo({
      url: '../bill_driver/bill_driver',
    })
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
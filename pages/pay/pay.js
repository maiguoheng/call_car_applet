// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
to_pay: function(e) {
  
  wx.saveImageToPhotosAlbum({
    filePath: "pages/images/wxzf.jpg",
    success(res) {
      console.log("保存图片：success");
      wx.showToast({
        title: '保存成功',
      });
    },
    fail(res) {
      console.log("保存图片：fail");
      console.log(res);
    }
  })
 

  
  },

  to_main_menu:function(){
   
    wx.switchTab({
      url: '../main_menu/main_menu'
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

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
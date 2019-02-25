// pages/bill_access/bill_access.js
// 显示司机可以接的单
const Bmob = require('../../utils/bmob.js');
var id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var Diary = Bmob.Object.extend("call_car");
    var query = new Bmob.Query(Diary);
    id = options.id
    query.equalTo("objectId", id);
    // 查询所有数据
    query.find({
      success: function(results) {
        console.log(results)
        that.setData({
          detail: results[0]

        })

      },
      error: function(error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });

  },
  access: function() {
    var open_id = wx.getStorageSync('user_openid')
    var Diary = Bmob.Object.extend("call_car");
    var query = new Bmob.Query(Diary);
    // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
    query.get(id, {
      success: function(result) {
        console.log(result)

        // 回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
        result.set('driver_id', open_id)
        result.set('status', 1) //接单但未完成
        console.log(result)
       
        result.save();
        // The object was retrieved successfully.
      },
      error: function(object, error) {

      }
    });
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
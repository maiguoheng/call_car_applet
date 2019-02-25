// pages/driver_main/driver_main.js
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

  },
  free: function() {
    var Diary = Bmob.Object.extend("driver");
    var query = new Bmob.Query(Diary);
    query.equalTo("driver_id", currentUser.attributes.userData.openid);
    // 查询所有数据
    query.find({
      success: function(results) {
        console.log(results)
        query.get(results.id, {
          success: function(result) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            result.set('driver_status', 1);
            result.save();
            wx.showToast({
              title: '修改状态成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            // The object was retrieved successfully.
          },
          error: function(object, error) {

          }
        });


      },

      error: function(error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });


  },
  nofree: function() {
    var Diary = Bmob.Object.extend("driver");
    var query = new Bmob.Query(Diary);
    query.equalTo("driver_id", currentUser.attributes.userData.openid);
    // 查询所有数据
    query.find({
      success: function(results) {
        console.log(results)
        query.get(results.id, {
          success: function(result) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            result.set('driver_status', 0);
            result.save();
            wx.showToast({
              title: '修改状态成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            // The object was retrieved successfully.
          },
          error: function(object, error) {

          }
        });


      },

      error: function(error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });


  },
  busy: function() {
    var Diary = Bmob.Object.extend("driver");
    var query = new Bmob.Query(Diary);
    query.equalTo("driver_id", currentUser.attributes.userData.openid);
    // 查询所有数据
    query.find({
      success: function(results) {
        console.log(results)
        query.get(results.id, {
          success: function(result) {
            // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
            result.set('driver_status', 2);
            result.save();
            wx.showToast({
              title: '修改状态成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            })
            // The object was retrieved successfully.
          },
          error: function(object, error) {

          }
        });


      },

      error: function(error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getApp().editTabar()


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
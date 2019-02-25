const app = getApp()
const Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js')
var util = require('../../utils/util.js');
var time = util.formatTime(new Date())
var canbook = false;
var id_timeTask;
var currentUser = Bmob.User.current();
var onload_this
Page({
  data: {
    free_driver: '',
    motto: '欢迎使用逸泉地铁接送助手',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    can_book: false,
    current_status: '',
  },
  onLoad: function () {
    getApp().editTabar()

    onload_this = this
    app.globalData.userInfo = wx.getStorageSync("userInfo");
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })


    }
     wx.showLoading({
      title: '正在为您查询司机信息……',
    })
    this.check_driver()

  },

  check_driver: function() {
    //查询司机状态信息,0不在线,1有空，2正在服务
    // wx.showLoading({
    //   title: '正在为您查询司机信息……',
    // })

    var free_driver_count;
    var busy_driver_count;
    var that = this;
    var Diary = Bmob.Object.extend("driver");
    var query = new Bmob.Query(Diary);
    query.equalTo("driver_status", 1);
    // 查询所有数据
    query.find({
      success: function(results) {


        free_driver_count = results.length
        console.log("共查询到空闲司机 " + free_driver_count + " 条记录");
        // 循环处理查询到的数据
        query = new Bmob.Query(Diary);
        query.equalTo("driver_status", 2);
        // 查询所有数据
        query.find({
          success: function(results) {
            onload_this.setData({
              free_driver:free_driver_count
            })

            busy_driver_count = results.length
            console.log("共查询到接单中司机  " + results.length + " 条记录");

            wx.hideLoading()
            // 循环处理查询到的数据
            if (busy_driver_count != 0 || free_driver_count != 0) {
              canbook = true

              onload_this.setData({
                current_status: '有司机空闲或正在服务，可以进行预约'
              })

              // wx.showModal({
              //   content: '有司机空闲或正在服务，可以进行预约',
              //   showCancel: false,
              //   success: function (res) {
              //     if (res.confirm) {
              //       console.log('用户点击确定')
              //     }
              //   }
              // });

              // console.log(e)
              // console.log(app.globalData.userInfo)
              // app.globalData.userInfo = e.detail.userInfo
              // that.setData({
              //   userInfo: e.detail.userInfo,
              //   hasUserInfo: true
              // })
            } else {
              canbook = false
              onload_this.setData({
                current_status: '现在没有司机准备接单，请稍后再试'
              })
              // wx.showModal({
              //   content: '现在没有司机准备接单，请稍后再试',
              //   showCancel: false,
              //   success: function (res) {
              //     if (res.confirm) {
              //       console.log('用户点击确定')
              //     }
              //   }
              // });

            }

          },
          error: function(error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });

      },
      error: function(error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });

    

  },
  onHide: function(){
     clearInterval(id_timeTask)
  },
  onUnload:function(){
    clearInterval(id_timeTask)

  },
  onShow :function(){
    id_timeTask = setInterval(this.check_driver, 20000)

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../location/location'
    })
  },

 

  begin_to_book: function(e) {
    console.log(e)
    onload_this.check_driver()
    if (canbook) {
      wx.navigateTo({
        url: '../book_car/book_car'
      })
    } else {
      wx.showModal({
        content: '现在没有司机准备接单，请稍后再试',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },





})
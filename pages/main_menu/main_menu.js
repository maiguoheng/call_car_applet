const app = getApp()
const Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js')
var util = require('../../utils/util.js');
var time = util.formatTime(new Date())
var currentUser = Bmob.User.current();
Page({
  data: {
    motto: '欢迎使用逸泉地铁接送助手',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../location/location'
    })
  },
  
  onLoad: function () {
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
  },
  getUserInfo: function (e) {
    wx.showLoading({
      title: '请稍等',
    })
var free_driver_count;
var busy_driver_count;
    var that = this;
    var Diary = Bmob.Object.extend("driver");
    var query = new Bmob.Query(Diary);
    query.equalTo("driver_status", 1);
    // 查询所有数据
    query.find({
      success: function (results) {


        free_driver_count=results.length
        console.log("共查询到 " + results.length + " 条记录");
        // 循环处理查询到的数据
        query = new Bmob.Query(Diary);
        query.equalTo("driver_status", 2);
        // 查询所有数据
        query.find({
          success: function (results) {


            busy_driver_count = results.length
            console.log("共查询到 " + results.length + " 条记录");

            wx.hideLoading()
            // 循环处理查询到的数据
            if (busy_driver_count != 0 || free_driver_count != 0) {
              wx.showModal({
                content: '有司机空闲或正在服务，可以进行预约',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              });

              console.log(e)
              app.globalData.userInfo = e.detail.userInfo
              that.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
              })
            }
            else {
              wx.showModal({
                content: '现在没有司机准备接单，请稍后再试',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              });

            }

          },
          error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });
       
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    // query = new Bmob.Query(Diary);
    // query.equalTo("driver_status", 2);
    // // 查询所有数据
    // query.find({
    //   success: function (results) {


    //     busy_driver_count = results.length
    //     console.log("共查询到 " + results.length + " 条记录");
    //     // 循环处理查询到的数据
    //     if (busy_driver_count != 0 || free_driver_count != 0) {
    //       wx.showModal({
    //         content: '有司机空闲或正在服务，可以进行预约',
    //         showCancel: false,
    //         success: function (res) {
    //           if (res.confirm) {
    //             console.log('用户点击确定')
    //           }
    //         }
    //       });

    //       console.log(e)
    //       app.globalData.userInfo = e.detail.userInfo
    //       this.setData({
    //         userInfo: e.detail.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //     else {
    //       wx.showModal({
    //         content: '现在没有司机准备接单，请稍后再试',
    //         showCancel: false,
    //         success: function (res) {
    //           if (res.confirm) {
    //             console.log('用户点击确定')
    //           }
    //         }
    //       });

    //     }

    //   },
    //   error: function (error) {
    //     console.log("查询失败: " + error.code + " " + error.message);
    //   }
    // });
    console.log(busy_driver_count)
    console.log(free_driver_count)
//     if (busy_driver_count!=0||free_driver_count!=0)
// {
//       wx.showModal({
//         content: '有司机空闲或正在服务，可以进行预约',
//         showCancel: false,
//         success: function (res) {
//           if (res.confirm) {
//             console.log('用户点击确定')
//           }
//         }
//       });
     
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
// }
// else{
//       wx.showModal({
//         content: '现在没有司机准备接单，请稍后再试',
//         showCancel: false,
//         success: function (res) {
//           if (res.confirm) {
//             console.log('用户点击确定')
//           }
//         }
//       });
     
// }
  },

  begin_to_book:function(e){
    console.log(e)
this.setData({
  motto:"ok"

  
})



    wx.navigateTo({
      url: '../book_car/book_car'
    })
  }

  
  
})

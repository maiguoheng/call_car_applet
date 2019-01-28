//app.js
var Bmob = require('utils/bmob.js');
Bmob.initialize("d1b352ec30a507b9d2500b33834b9435", "ad20991e751db138391d453e28f2b5d3");


App({
  onLaunch: function () {
    // var that = this;
    // //调用系统API获取设备的信息
    // wx.getSystemInfo({
    //   success: function (res) {
    //     var kScreenW = res.windowWidth / 375
    //     var kScreenH = res.windowHeight / 603
    //     wx.setStorageSync('kScreenW', kScreenW)
    //     wx.setStorageSync('kScreenH', kScreenH)
    //   }
    // })
    // //调用API从本地缓存中获取数据
    // try {
    //   wx.showToast({
    //     title: '加载中...',
    //     mask: true,
    //     icon: 'loading'
    //   })
    //   var value = wx.getStorageSync('user_openid')
    //   if (value) {

    //     wx.showToast({
    //       title: '登录成功',
    //       icon: 'succes',
    //       duration: 1000,
    //       mask: true
    //     })
        
    //   } else {
    //     console.log('执行login1')
    //     wx.login({
    //       success: function (res) {
    //         if (res.code) {
    //           console.log('执行login2', res);
    //         }
    //       }
    //     });
    //     wx.login({
    //       success: function (res) {
    //         if (res.code) {
    //           Bmob.User.requestOpenId(res.code, {
    //             success: function (userData) {
    //               wx.getUserInfo({
    //                 success: function (result) {
    //                   var userInfo = result.userInfo
    //                   var nickName = userInfo.nickName
    //                   var avatarUrl = userInfo.avatarUrl
    //                   var sex = userInfo.gender
    //                   Bmob.User.logIn(nickName, userData.openid, {
    //                     success: function (user) {
    //                       try {
    //                         wx.setStorageSync('user_openid', user.get('userData').openid)
    //                         wx.setStorageSync('user_id', user.id)
    //                         wx.setStorageSync('my_nick', user.get("nickname"))
    //                         wx.setStorageSync('my_username', user.get("username"))
    //                         wx.setStorageSync('my_sex', user.get("sex"))
    //                         wx.setStorageSync('my_avatar', user.get("userPic"))
    //                       } catch (e) {
    //                       }
    //                       wx.showToast({
    //                         title: '成功',
    //                         icon: 'succes',
    //                         duration: 1000,
    //                         mask: true
    //                       })
    //                       console.log("登录成功");
    //                     },
    //                     error: function (user, error) {
    //                       if (error.code == '101') {
    //                         var user = new Bmob.User();//开始注册用户
    //                         user.set('username', nickName);
    //                         user.set('password', userData.openid);
    //                         user.set("nickname", nickName);
    //                         user.set("userPic", avatarUrl);
    //                         user.set("userData", userData);
    //                         user.set('sex', sex);
    //                         user.set('feednum', 0);
    //                         user.signUp(null, {
    //                           success: function (result) {
    //                             wx.showToast({
    //                               title: '注册成功',
    //                               icon: 'succes',
    //                               duration: 1000,
    //                               mask: true
    //                             })
    //                             console.log('注册成功');
    //                             try {//将返回的3rd_session存储到缓存中
    //                               wx.setStorageSync('user_openid', user.get('userData').openid)
    //                               wx.setStorageSync('user_id', user.id)
    //                               wx.setStorageSync('my_nick', user.get("nickname"))
    //                               wx.setStorageSync('my_username', user.get("username"))
    //                               wx.setStorageSync('my_sex', user.get("sex"))
    //                               wx.setStorageSync('my_avatar', user.get("userPic"))
    //                             } catch (e) {
    //                             }
    //                           },
    //                           error: function (userData, error) {
    //                             console.log("openid=" + userData);
    //                             console.log(error)
    //                           }
    //                         });

    //                       }
    //                     }
    //                   });
    //                 }
    //               })
    //             },
    //             error: function (error) {
    //               console.log("Error: " + error.code + " " + error.message);
    //             }
    //           });
    //         } else {
    //           wx.showToast({
    //             title: '登陆失败',
    //             icon: 'succes',
    //             duration: 1000,
    //             mask: true
    //           })
    //           console.log('获取用户登录态失败1！' + res.errMsg)
    //         }
    //       },
    //       complete: function (e) {
    //         wx.showToast({
    //           title: '登陆失败',
    //           icon: 'succes',
    //           duration: 1000,
    //           mask: true
    //         })
    //         console.log('获取用户登录态失败2！' + e)
    //       }
    //     });
    //   }
    // } catch (e) {
    //   wx.showToast({
    //     title: '登陆失败',
    //     icon: 'succes',
    //     duration: 1000,
    //     mask: true
    //   })
    //   console.log("登陆失败")
    // }
    // wx.checkSession({
    //   success: function () {
    //   },
    //   fail: function () {
    //     //登录态过期，重新登录
    //     wx.login()
    //   }
    // })


    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 一键登录
    Bmob.User.auth().then(res => {
      console.log(res);
      console.log("一键登录成功");
      var userData = {
        nickName: res.nickName,
        objectId: res.objectId,
        openid: res.openid,
        userPic: res.userPic,
        username: res.username
      };
      wx.setStorageSync('userData', userData);
      wx.setStorageSync('openid', res.openid)
    }).catch(err => {
      console.log(err);
    })
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  
  
  globalData: {
    userInfo: null,
    temp_formid: null,
    temp_name:null,
    temp_time:null,
    temp_direction:null
  }
})
//app.js
var Bmob = require('utils/bmob.js');
Bmob.initialize("c63296bffd34ffe884c0db3e2f6934be", "07c0a6b2349e98f5844d86a80d9fc2c5");


App({
  onLaunch: function() {
    console.log('App_onLaunch')
    var that = this;
    //调用系统API获取设备的信息
    wx.getSystemInfo({
      success: function(res) {
        var kScreenW = res.windowWidth / 375
        var kScreenH = res.windowHeight / 603
        wx.setStorageSync('kScreenW', kScreenW)
        wx.setStorageSync('kScreenH', kScreenH)
      }
    })
    //调用API从本地缓存中获取数据

    // 在没有 open-type=getUserInfo 版本的兼容处理
    try {
      wx.showToast({
        title: '加载中...',
        mask: true,
        icon: 'loading'
      })
      var value = wx.getStorageSync('user_openid')
      if (value) {

        wx.showToast({
          title: '已经登录',
          icon: 'succes',
          duration: 1000,
          mask: true
        })

      } else {
        console.log('执行login1')
        // wx.login({
        //   success: function (res) {
        //     if (res.code) {
        //       console.log('执行login2', res);
        //     }
        //   }
        // });
        wx.login({
          success: function(res) {
            if (res.code) {

              Bmob.User.requestOpenId(res.code, {
                success: function(userData) {
                  wx.getUserInfo({
                    success: function(result) {
                      var userInfo = result.userInfo
                      var nickName = userInfo.nickName
                      var avatarUrl = userInfo.avatarUrl
                      var sex = userInfo.gender
                      Bmob.User.logIn(nickName, userData.openid, {
                        success: function(user) {

                          wx.setStorageSync('user_openid', user.get('userData').openid)
                          wx.setStorageSync('user_id', user.id)
                          wx.setStorageSync('my_nick', user.get("nickname"))
                          wx.setStorageSync('my_username', user.get("username"))
                          wx.setStorageSync('my_sex', user.get("sex"))
                          wx.setStorageSync('my_avatar', user.get("userPic"))

                          wx.showToast({
                            title: '成功',
                            icon: 'succes',
                            duration: 1000,
                            mask: true
                          })
                          console.log("登录成功");
                        },
                        error: function(user, error) {
                          if (error.code == '101') {
                            var user = new Bmob.User(); //开始注册用户
                            user.set('username', nickName);
                            user.set('password', userData.openid);
                            user.set("nickname", nickName);
                            user.set("userPic", avatarUrl);
                            user.set("userData", userData);
                            user.set('sex', sex);
                            user.set('feednum', 0);
                            user.signUp(null, {
                              success: function(result) {
                                wx.showToast({
                                  title: '注册成功',
                                  icon: 'succes',
                                  duration: 1000,
                                  mask: true
                                })
                                console.log('注册成功');
                                try { //将返回的3rd_session存储到缓存中
                                  wx.setStorageSync('user_openid', user.get('userData').openid)
                                  wx.setStorageSync('user_id', user.id)
                                  wx.setStorageSync('my_nick', user.get("nickname"))
                                  wx.setStorageSync('my_username', user.get("username"))
                                  wx.setStorageSync('my_sex', user.get("sex"))
                                  wx.setStorageSync('my_avatar', user.get("userPic"))

                                } catch (e) {}
                              },
                              error: function(userData, error) {
                                console.log("openid=" + userData);
                                console.log(error)
                              }
                            });

                          }
                        }
                      });
                    }
                  })
                },
                error: function(error) {
                  console.log("Error: " + error.code + " " + error.message);
                }
              });
            } else {
              wx.showToast({
                title: '登陆失败',
                icon: 'succes',
                duration: 1000,
                mask: true
              })
              console.log('获取用户登录态失败1！' + res.errMsg)
            }
            console
          },
          //接口调用结束的回调函数（调用成功、失败都会执行）
          complete: function(e) {
            // wx.showToast({
            //   title: '登陆失败',
            //   icon: 'succes',
            //   duration: 1000,
            //   mask: true
            // })

          }
        });
      }
    } catch (e) {
      wx.showToast({
        title: '登陆失败',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      console.log(e)
    }
    wx.checkSession({
      success: function() {},
      fail: function() {
        //登录态过期，重新登录
        wx.login()
      }
    })







  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    } else {
      //调用登录接口 
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }


  },
  editTabar: function() {
    var tabbar = this.globalData.tabBar,
      currentPages = getCurrentPages(),

      _this = currentPages[currentPages.length - 1],
      pagePath = _this.__route__;
    

    for (var i in tabbar.list) {
      tabbar.list[i].selected = false;

      if (tabbar.list[i].pagePath.substring(3, tabbar.list[i].pagePath.length) == 
        pagePath.substring(6, pagePath.length)) {
        tabbar.list[i].selected = true
      };
    }
    _this.setData({
      tabbar: tabbar
    });
  },

  globalData: {
    userInfo: null,
    temp_formid: null,
    temp_name: null,
    temp_time: null,
    temp_direction: null,
    is_driver: false,

    tabBar: {
      backgroundColor: "#ffffff",
      color: "#BBBBBB",
      selectedColor: "#272A39",
      "list": [{
          "selectedIconPath": "../images/出租车.png",
          "iconPath": "../images/出租车.png",
          "pagePath": "../main_menu_driver/main_menu_driver",
          "text": "叫车"
        },
        {
          "selectedIconPath": "../images/respond.png",
          "iconPath": "../images/respond.png",
          "pagePath": "../bill_driver/bill_driver",
          "text": "接单"
        },
        {
          "selectedIconPath": "../images/用户.png",
          "iconPath": "../images/用户.png",
          "pagePath": "../user_main_driver/user_main_driver",
          "text": "用户"
        }
      ],
      position: "bottom"
    }
  }
})
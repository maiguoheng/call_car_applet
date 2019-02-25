//获取应用实例
const app = getApp()
const Bmob = require('../../utils/bmob.js');
var time
var check_time = 0
var that
Page({
  data: {
    title: "逸泉地铁接送助手",
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function() {
    console.log('permission_onLoad')
    that = this
    var hasPermission = wx.getStorageSync("hasUserInfo");

    if (hasPermission) {
      console.log('already have permission')
      that.check_mode()

    } //if
  },
  onReady: function() {

  },

  //获取用户信息
  getUserInfo: function(e) {
    var that = this;
    app.globalData.userInfo = e.detail.userInfo;
    wx.setStorageSync("userInfo", e.detail.userInfo);
    wx.setStorageSync("hasUserInfo", true);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    //更新当前用户信息
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
                      console.log("登录成功111");
                    },
                    error: function(user, error) {
                      if (error.code == '101') {
                        var user = new Bmob.User(); //开始注册用户
                        user.set('username', nickName);
                        user.set('password', userData.openid);
                        console.log(userData.openid)
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
                    },

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
      },

    });
    time = setInterval(that.check_mode, 2000)


  },
  onHide: function() {
    clearInterval(time)
  },
  onUnload: function() {
    clearInterval(time)
  },
  check_mode: function(e) {
    console.log('check_time' + check_time)
    check_time++
    if (check_time < 10) {

      var Diary = Bmob.Object.extend("driver");
      var query = new Bmob.Query(Diary);
      query.equalTo("driver_id", Bmob.User.current().attributes.userData.openid);
      // 查询所有数据
      query.find({
        success: function(results) {

          if (results.length != 0) {
            console.log(results.length)
            wx.redirectTo({
              url: '../select_mode/select_mode'
            })
          } else {
            wx.switchTab({
              url: '../main_menu/main_menu'
            })
          }

        }
      })
    } else {
      clearInterval(time)
      wx.showModal({
        content: '查询错误，请稍后再试',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });

    }
  }
});
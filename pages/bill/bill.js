const Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js')
var util = require('../../utils/util.js');
var time = util.formatTime(new Date())
var currentUser = Bmob.User.current();
Page({
  
  data: {
    bills: [],
    objectArray: [
      { id: 5, unique: 'unique_5' },
      { id: 4, unique: 'unique_4' },
      { id: 3, unique: 'unique_3' },
      { id: 2, unique: 'unique_2' },
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    numberArray: [1, 2, 3, 4]
  },

  onShow: function () {
    this.fetchData(this);

  },

  fetchData: function (t) {
    var that = this;
    var Diary = Bmob.Object.extend("call_car");
    var query = new Bmob.Query(Diary);
    query.equalTo("caller_id", currentUser.attributes.userData.openid);
    // 查询所有数据
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        results.reverse()//改变排序
        // 循环处理查询到的数据
       that.setData({
         bills: results
       })

      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });

  },

  addNumberToFront: function (e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  }
})
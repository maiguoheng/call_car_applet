//index.js
Page({
  data: {
    angle: '--',
    directions: [0, 0, 0, 0, 0]
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../location/location'
    })
  },

  //指南针描画
  drawCompass: function (direction) {
    var center_x = 150
    var center_y = 150

    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('compassCanvas')

    //根据角度旋转坐标系
    context.translate(center_x, center_y);
    context.rotate(-direction / 180 * Math.PI);
    context.translate(-center_x, -center_y);
    //描画方向转盘
    context.drawImage('../images/1.png', 0, 0,
      center_x * 2, center_y * 2)

    //恢复坐标系
    context.translate(center_x, center_y);
    context.rotate(direction / 180 * Math.PI);
    context.translate(-center_x, -center_y);

    //描画指针。
    context.beginPath()
    context.setLineWidth(5)
    context.setStrokeStyle('red')
    context.moveTo(140, 112)
    context.lineTo(150, 60)
    context.lineTo(160, 112)
    context.closePath()
    context.stroke()

    context.draw()
  },

  //事件处理函数
  onLoad: function () {
    var that = this;
    wx.onCompassChange(function (res) {

      //在数组尾部添加新数据
      that.data.directions.push(res.direction);
      if (that.data.directions.length > 5) {
        //从数组头部删除一个数据
        that.data.directions.shift();
      }
      //数组元素求和
      var total = that.data.directions.reduce(function (prev, v) { return prev + v })
      //求平均值
      var average = total / that.data.directions.length

      that.drawCompass(average);
      //保留1位小数
      var direction = average.toFixed(1) + '°';
      that.setData({ angle: direction })
    });
  },
})
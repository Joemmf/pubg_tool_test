//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '吃鸡战绩查询',
    userInfo: {},
    playerName: '',
    listData: []
  },
  inputName: function (e) {
    app.globalData.playerName = e.detail.value
    this.setData({
      playerName: e.detail.value
    })
  },
  searchPubg: function (e) {
    var that = this
    wx.request({
      url: "https://api.playbattlegrounds.com/shards/pc-as/players?filter[playerNames]=" + app.globalData.playerName,
      method: 'GET',
      header: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNjMyMmFkMC0yMTEzLTAxMzYtODU0Yi0xZGY5Mjc3MjU3ZmYiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTIzNjAxNDg3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImpvZW1tZiIsInNjb3BlIjoiY29tbXVuaXR5IiwibGltaXQiOjEwfQ.ny_KI0BxQFFrEYEskEtnO8mwLc7kiv-ygPEWqmRdtso",
        "Accept": "application/vnd.api+json"
      },
      success: function (res) {
        //console.log(res.data)
        //console.log(res.data.data)
        //console.log(res.data.data[0])
        //console.log(res.data.data[0].relationships)
        //console.log(res.data.data[0].relationships.matches.data)
        that.setData({
          listData: res.data.data[0].relationships.matches.data
        })
      }
    })
  },
  searchDetail: function (e) {
    var id = e.target.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }

})

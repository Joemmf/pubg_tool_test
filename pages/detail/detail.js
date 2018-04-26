const app = getApp()

Page({
  data: {
    listData: [],
    userData:[]
  },

  onLoad: function (options){
    var id = options.id
    var that = this
    wx.request({
      url: "https://api.playbattlegrounds.com/shards/pc-as/matches/" + id,
      method: 'GET',
      header: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNjMyMmFkMC0yMTEzLTAxMzYtODU0Yi0xZGY5Mjc3MjU3ZmYiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTIzNjAxNDg3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImpvZW1tZiIsInNjb3BlIjoiY29tbXVuaXR5IiwibGltaXQiOjEwfQ.ny_KI0BxQFFrEYEskEtnO8mwLc7kiv-ygPEWqmRdtso",
        "Accept": "application/vnd.api+json"
      },
      success: function (res) {
        console.log(res.data.data)
        console.log(res.data.included)
        console.log(res.data.data.relationships.rosters.data[0].id)
        for (var i in res.data.included)
        {
          
          console.log(res.data.included[i].id)
        }
        that.setData({
          listData: res.data.data.attributes,
          userData: res.data.included
        })
      }
    })




  } 
})
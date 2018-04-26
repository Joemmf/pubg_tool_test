const app = getApp()

Page({
  data: {
    listData: [],
    userData:[]
  },

  onLoad: function (options){
    var id = options.id
    var name = options.name
    var that = this
    
    wx.request({
      url: "https://api.playbattlegrounds.com/shards/pc-as/matches/" + id,
      method: 'GET',
      header: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNjMyMmFkMC0yMTEzLTAxMzYtODU0Yi0xZGY5Mjc3MjU3ZmYiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTIzNjAxNDg3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImpvZW1tZiIsInNjb3BlIjoiY29tbXVuaXR5IiwibGltaXQiOjEwfQ.ny_KI0BxQFFrEYEskEtnO8mwLc7kiv-ygPEWqmRdtso",
        "Accept": "application/vnd.api+json"
      },
      success: function (res) {
        console.log(res.data.included)
        console.log(res.data.data)
        // 遍历included里面的participant找到当前玩家的id
        var saveId = 0;
        for (var i in res.data.included){
          if (res.data.included[i].type == 'participant' && res.data.included[i].attributes.stats.name == name){
            saveId = res.data.included[i].id;
            break;
          }
        }

        var tempList = [];
        //console.log("开始找小组"+saveId)
        // 通过当前玩家的id，遍历included里面的roster找到小组组员的id
        for (var i in res.data.included) {
          if (res.data.included[i].type == 'roster') {
            for (var j in res.data.included[i].relationships.participants.data){
              if(res.data.included[i].relationships.participants.data[j].id == saveId){
                tempList = res.data.included[i].relationships.participants.data;
              }
            }
          }
        }
        
        //console.log("开始找组员")
        var memberList = [];
        // 已经得到小组队员id,遍历participant找到小组组员的数据
        for(var i in tempList){
          for (var j in res.data.included) {
            if (res.data.included[j].type == 'participant' && res.data.included[j].id == tempList[i].id) {
              memberList.push(res.data.included[j])
            }
          }
        }
        
        that.setData({
          listData: res.data.data.attributes,
          userData: memberList
        })
      }
    })




  } 
})
//app.js
const Towxml = require("/towxml/main")
App({

  onLaunch: function () {
    
  },
  // 声明一个实意对象
  towxml:new Towxml(),
  globalData:{
    userInfo:null
  }
})

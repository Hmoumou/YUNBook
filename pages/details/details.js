// pages/details/details.js
import {fetch} from "../../utils/util.js"
Page({

  data: {
    bookId:"",
  },

  // 取跳转的东西
  onLoad: function (options) {
    this.setData({
      bookId:options.id
    })
    this.getData()
  },
  getData(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
    })
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
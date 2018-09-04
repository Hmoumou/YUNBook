// pages/details/details.js
import {fetch} from "../../utils/util.js"
Page({
  
  data: {
    bookId:"",
    bookData:{}
  },

  // 取跳转的东西
  onLoad:function(options){
    console.log(options);
    this.setData({
      bookId:options.id
    })
    this.getData()
  },
  getData(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        bookData:res
      })
    })
  },
  jumpCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`
    })
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
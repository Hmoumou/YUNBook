// pages/details/details.js
import {fetch} from "../../utils/util.js"
const app = getApp()
Page({
  data: {
    bookId:"",
    bookData:{},
    isLoading:false,
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
    this.setData({
      isLoading:true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        bookData:res,
        isLoading: false
      })
    }).catch(err=>{
      this.setData({
        isLoading: false
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
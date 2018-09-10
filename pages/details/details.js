// pages/details/details.js
import {fetch} from "../../utils/util.js"
const app = getApp()
Page({
  data: {
    bookId:"",
    bookData:{},
    isLoading:false,
    iscollect:0
  },

  // 取跳转的东西
  onLoad:function(options){
    console.log(options);
    this.setData({
      bookId:options.id
    })
    this.getData()
  },

  collect(){
    this.setData({
      iscollect:false
    }),
    wx.showToast({
      title: '收藏成功',
      duration:1000,
      mask:true,

      success:()=>{
        this.setData({
          iscollect: true
        })
        fetch.post("/collection",{bookId:this.data.bookid})
      }
    })
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
    return {
      title:this.data.bookData.data.title,
      path:`/pages/details/details?id=${this.data.bookId}`,
      imageUrl:this.data.bookData.data.img
      
    }
  },
  readbook:function(){
    wx.navigateTo({
      url: `/pages/book/book?id=${this.data.bookid}`,
    })
  }
})
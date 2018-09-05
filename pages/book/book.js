// pages/book/book.js
import {fetch} from "../../utils/util.js"
const app = getApp()
Page({
  data: {
      article:{},
      title:"",
      titleId:"",
      bookId:"",
      catalog: {},
      isShow:false,
      isLoading:false
   },

  onLoad: function (options) {
    console.log(options) 
   this.setData({
     titleId:options.id,
     bookId:options.bookId
   })
   this.getData()
   this.getCatalog()
  },
  getData(){
    this.setData({
      isLoading: true
    })
    fetch.get(`/article/${this.data.titleId}`).then(res=>{
      // 富文本
          this.setData({
            article: res.data.article.content,
            title:res.data.title,
            isLoading: false
          })
    }).catch(err => {
      isLoading: false
    })
  },
  getCatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        catalog:res.data,
      })
    })
  },
  toggleCatalog(){
    let isShow = !this.data.isShow
    this.setData({
      isShow:isShow
    })
  },
  handleGet(event){
      const id = event.currentTarget.dataset.id
      this.setData({
        titleId:id,
      })
      this.getData()
  },


})
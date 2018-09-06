// pages/book/book.js
import {fetch} from "../../utils/util.js"
const app = getApp()
Page({
  data: {
      article:{},
      title:"",
      titleId:"",
      bookId:"",
      catalog: [],
      isShow:false,
      isLoading:false,
      font:40,
      index:""
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
          this.setData({
            article: res.data.article.content,
            title:res.data.title,
            isLoading: false,
            isShow:false,
            index:res.data.article.index
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
  zitiadd(){
    if(this.data.font>60){
      wx.showModal({
        title: '提示',
        content: '已经是最大了',
      })
    }else{
      this.setData({
        font: this.data.font + 2
      })
    }
  },
  zitisuoxiao() {
    if(this.data.font<30){
      wx.showModal({
        title: '提示',
        content: '字体太小影响视力哦~',
      })
    }else{
      this.setData({
        font: this.data.font - 2
      })
    }
  },
  pagesprav(){
    let catalog = this.data.catalog;
    if ( catalog[this.data.index - 1]){
      this.setData({
        titleId: catalog[this.data.index - 1]._id
      })
    }else{
      wx.showToast({
        title: '已经是第一章了',
      })
    }
    this.getData()
  },
  pagesnext(){
    let catalog = this.data.catalog;
    if (catalog[this.data.index + 1]) {
      this.setData({
        titleId: catalog[this.data.index + 1]._id
      })
    } else {
      wx.showToast({
        title: '已经是最后一章了',
      })
    }
    this.getData()
  }
})
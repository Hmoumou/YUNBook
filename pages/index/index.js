const app = getApp()
import { fetch, login } from '../../utils/util.js'

Page({
  data: {
    bookId:"",
    swiperData:[],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    isLoading:false,
    pn:1,
    hasMore:true,
    isloadMore:false
  },
  onLoad() {
    login()
    this.setData({
      isLoading:true
    })
    Promise.all([this.getData(), this.getContent()]).then(() => {
      this.setData({
        isloadMore: true,
        isLoading:false
      })
    })
    
  },
  getData(){
    this.setData({
      isLoading: true,
    })
    return new Promise((resolve,reject)=>{
      //获取轮播图
      fetch.get('/swiper').then(res => {
        resolve()
        this.setData({
          swiperData: res.data,
          isLoading: false,
        })
      }).catch(err => {
        reject()
        this.setData({
          isLoading: false
        })
      })
    })
  },
  getContent(){
    return new Promise((resolve,reject)=>{
      //获取书籍列表
      fetch.get('/category/books').then(res => {
        resolve()
        console.log(res)
        this.setData({
          mainContent: res.data,
          isLoading:false
        })
      })
    })
  },
  jumpBook(event){
    console.log(event)
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  jumpContentBook(){
    wx.navigateTo({
      url: `/pages/details/details?id=${this.data.bookId}`,
    })
  },
//下拉刷新
  onPullDownRefresh(){
    this.setData({
      isloadMore: false,
    })
    Promise.all([this.getData(),this.getContent()]).then(()=>{
      this.setData({
        pn:1,
        hasMore: true
      })
      wx.stopPullDownRefresh();
    })
  },
  //上拉加载
  getMoreContent(){
    this.setData({
      isloadMore: true,
  
    })
    return new Promise(resolve=>{
      fetch.get('/category/books', { pn: this.data.pn }).then(res => {
        let Arr = [...this.data.mainContent,...res.data]
        this.setData({
          mainContent: Arr,
        })
        resolve(res);
      })
    })
  },
  onReachBottom(){
    if(this.data.hasMore){
      this.setData({
        pn:this.data.pn + 1
      })
      this.getMoreContent().then(res => {
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }
  },


})
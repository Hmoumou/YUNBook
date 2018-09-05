
const app = getApp()
import {fetch} from '../../utils/util.js'

Page({
  data: {
    swiperData:[],
    mainContent:[],
    indicatorDots: true,
    autoplay: false,
    interval: 3000,
    duration: 1000,
    isLoading:false
  },
  onLoad() {
    this.getData(),
    this.getContent()
  },
  getData(){
    this.setData({
      isLoading: true,
    })
    fetch.get('/swiper').then(res=>{
    this.setData({
      swiperData:res.data,
      isLoading: false,
    })
   }).catch(err=>{
     this.setData({
       isLoading: false
     })
   })
  },
  getContent(){
    fetch.get('/category/books').then(res=>{
      this.setData({
        mainContent:res.data
      })
    })
  },
  jumpBook(event){
    console.log(event)
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})
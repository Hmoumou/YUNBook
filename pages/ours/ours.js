// pages/ours/ours.js
import {fatch} from "../../utils/util.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userInfo:{},
  text:"先登录哦~"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    },
   
  getuser() {
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          userInfo: data.userInfo,
          text:"嗷呜呜~"
        })
      }
    })

  },


    gocollect(){
      if (this.data.text == "嗷呜呜~") {
      wx.navigateTo({
        url: '/pages/collect/collect',
      })
      }else{
        wx.showToast({
          title: '请先登录哦~',
        })
      }
    } ,
  
  goguanzu(){
    wx.showToast({
      title: '此功能正在维护中~',
    })
  },

   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
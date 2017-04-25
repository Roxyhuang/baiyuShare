(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
    };
  if (doc.addEventListener) {
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  }
})(document, window);

// 跳转方法

function openUrl(url) {
  location.href = url;
}

var app = new Vue({
  el: '#app',
  data: function () {
    return {
      activityId: null,
      pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=968000926,1402634920&fm=206&gp=0.jpg',
      title: '',
      tips: '',
      time: '',
      address: '',
      activeStatus: 1,
      desc: '',
      goodList: [],
      noGoods: [],
      agreeUser: [],
    }
  },
  created: function () {
    this.activityId = this.getQueryString('activityId');
    this.getDetail();
    this.getWXsecrity();
    this.getMemberList();
  },
  methods: {
    getQueryString: function (name) {
      var searchParams = new URLSearchParams(window.location.search);
      return searchParams.get(name);
    },
    goToDownload: function () {
      window.location.href = '';
    },
    getWXsecrity: function() {
      window.fetch("http://61.132.72.202:2017/BAIYU.Web.Api/api/Activitys/GetActivityDetail?activityId=" + this.activityId, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        },
      }).then(function (res) {
          if(res.ok) {
            var data = res.data;
            wx.config({
              debug: true,
              appId: 'wxedfbdfaf82e1bd68',
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: [
                  'onMenuShareAppMessage',
                  'onMenuShareTimeline',
                ]
            });
          }
      });
    }
    ,
    getMemberList: function() {
      window.fetch("http://61.132.72.202:2017/BAIYU.Web.Api/api/Activitys/GetActivityUseractivityId=" + this.activityId, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        },
      }).then(function (res) {
          if(res.ok) {
            var data = res.data;
            this.agreeUser = data.agreeUser;
          }
      });
    },
    getDetail: function () {
      window.fetch("http://61.132.72.202:2017/BAIYU.Web.Api/api/Activitys/GetActivityDetail?activityId=" + this.activityId, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        },
      }).then(function (res) {
        if (res.ok) {
          var data = res.data;
          this.pic = data.activityPic;
          this.title = data.activityTitle;
          this.time = data.startTime;
          this.address = data.detailAddress;
          this.activeStatus = data.activityStatus;
          this.desc = data.activityDesc;
          this.goodList = data.goodList;
          this.noGoods = data.noGoods;
          wx.onMenuShareTimeline({
            title: data.activityTitle, // 分享标题
            link: 'http://61.132.72.202:2017/BAIYU.Web.Api/api/Activitys/GetActivityDetail?activityId='+ this.activityId, // 分享链接
            imgUrl: data.activityPic, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
           wx.onMenuShareAppMessage({
             title: data.activityTitle, // 分享标题
             desc: data.activityDesc, // 分享描述
             link: 'http://61.132.72.202:2017/BAIYU.Web.Api/api/Activitys/GetActivityDetail?activityId='+ this.activityId, // 分享链接
             imgUrl: data.activityPic, // 分享图标
             type: 'link', // 分享类型,music、video或link，不填默认为link
             dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
             success: function () {
               // 用户确认分享后执行的回调函数
             },
             cancel: function () {
               // 用户取消分享后执行的回调函数
             }
           });
        } else if (res.status == 401) {
          alert('抱歉，服务器正在调试中');
        }
      }, function (e) {
          alert('抱歉，服务器正在调试中');
      });
    },
  }
});

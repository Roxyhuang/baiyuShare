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
      pic: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=968000926,1402634920&fm=206&gp=0.jpg',
      title: '聚会1321',
      tips: '马上约会',
      time: '2011-06-20',
      address: '上海市浦东新区',
      activeStatus: false,
      desc: '一起K歌起来HIGH',
      itemsHave: [],
      itemsNeed: [],
      member: [],
    }
  },
  created: function () {

  },
  methods: {
    getDetail: function () {

    },
  }
});

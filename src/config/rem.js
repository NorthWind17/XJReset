// const setFontSize = (minFontSize = 12, maxFontSize = 16) => {
//     // 7.5根据设计稿的横向分辨率/100得来
//     var deviceWidth = document.documentElement.clientWidth;
//     // 获取浏览器宽度
//     if(deviceWidth > 750) {
//         // deviceWidth = 750;
//         deviceWidth = 75 * 100;
//     } else if (!deviceWidth) {
//     	 return;
//     }
//     const fontSize = Math.max(minFontSize, Math.min(12 * (deviceWidth / 320), maxFontSize));

//     document.documentElement.style.fontSize = `${fontSize}px`;
//     // 这样子的1rem=font-size的大小
//     // 当然，万一你觉得这样子做的rem太小，可以推荐你第二种写法，相对更加简便，代码如下(注释的)
//      // 获取浏览器宽度
//     //if(deviceWidth > 750) {
//         // deviceWidth = 750;
//         //deviceWidth = 7.5 * 50;
//     //}
//     // document.documentElement.style.fontSize = `${deviceWidth / 7.5}px`;
//     // 此时的fontSize大小为50px(375屏幕的时候)

//     // 禁止双击放大
//     document.documentElement.addEventListener('touchstart', function (event) {
//         if (event.touches.length > 1) {
//             event.preventDefault();
//         }
//     }, false);
//     var lastTouchEnd = 0;
//     document.documentElement.addEventListener('touchend', function (event) {
//         var now = Date.now();
//         if (now - lastTouchEnd <= 300) {
//             event.preventDefault();
//         }
//         lastTouchEnd = now;
//     }, false);
// }
// export default {
// 	setFontSize ,
// }
(function(doc, win) {
    var docEl = doc.documentElement;
    var isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
        dpr = window.top === window.self ? dpr : 1;//被iframe引用时，禁止缩放
        dpr = 1;
    var scale = 1 / dpr;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.dataset.dpr = dpr;
    var metaEl = doc.createElement('meta');
    metaEl.name = 'viewport';
    metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
    docEl.firstElementChild.appendChild(metaEl);
    var recalc = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 1920 ) {
            width = 1920 * dpr;
        }
        // 乘以100，px : rem = 100 : 1
        docEl.style.fontSize = 100 * (width / 1920) + 'px';
    };
    recalc();
    
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);

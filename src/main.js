import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/initialize.css';
// import './config/rem.js';
import axios from './config/https.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import * as dd from 'dingtalk-jsapi';
import Print from 'vue-print-nb';
import './style/index.less';
import './style/home.less';
import './style/files.less';
import './style/project.less';
import './style/task.less';
import elformdesign from 'el-form-design';
import utils from './config/util.js';
Vue.prototype.$utils = utils;
// import 'amfe-flexible'
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$dd = dd;
axios.defaults.baseURL = window.domain;
console.log(window.domain);

Vue.use(ElementUI);
Vue.use(Print);
Vue.use(elformdesign);
Vue.filter('FormatDate', function(date, fmt) {
    if (date != null && date != '') {
        return formatDate(date, fmt);
    } else {
        return '';
    }
});
function formatDate(date, fmt) {
    date = new Date(date);
    if (typeof fmt === 'undefined') {
        fmt = 'yyyy-MM-dd HH:mm:ss';
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
            );
        }
    }
    return fmt;
}

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');

// Rem.setFontSize();

import axios from 'axios';
import qs from 'qs';

//axios.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
// axios.defaults.timeout = 16000;//上传大文件取消默认
axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8';

// post传参序列化
// axios.interceptors.request.use(
//     function(config) {
//         // Do something before request is sent
//         // console.log(config)
//         if (config.method == 'post') {
//             // if (config.data.constructor === FormData) {
//             // } else {
//             //     config.data = qs.stringify(config.data);
//             // }
//             config.data = qs.stringify(config.data);
//         }
//         return config;
//     },
//     function(error) {
//         console.log(error);
//         // Do something with request error
//         return Promise.reject(error);
//     }
// );

//添加请求拦截器
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        return config;
    },
    function(error) {
        console.log(error);
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        // window.history.pushState(null, null, "/login")
        console.log('响应拦截器错误信息');
        console.log(error);
        // if(error.response.data.status==401){
        //   Dialog('会话过期,请重新登录').then(action => {
        //     Router.push({path:'/login'})
        //   });
        // }
        return Promise.reject(error.response);
    }
);

export default axios;

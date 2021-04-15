import axios from './https.js';
import * as dd from 'dingtalk-jsapi';
import store from '@/store';
export default {
    // 时间戳转日期
    formateTime: function(time) {
        let date;
        if (time.length < 11) {
            // 秒
            date = new Date(time * 1000);
        } else {
            // 豪秒
            date = new Date(time);
        }

        let Y = date.getFullYear();
        let M =
            date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1;
        let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return Y + '-' + M + '-' + D;
    },
    //时间转换
    timeChange: function(val, type) {
        let chinaStandard = val;
        let newTime;
        let date = new Date(chinaStandard);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? '0' + d : d;
        let h = date.getHours();
        h = h < 10 ? '0' + h : h;
        let minute = date.getMinutes();
        let s = date.getSeconds();
        minute = minute < 10 ? '0' + minute : minute;
        s = s < 10 ? '0' + s : s;
        if (type == 1) {
            newTime = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
        } else if (type == 2) {
            newTime = y + '-' + m + '-' + d;
        } else if (type == 2) {
            newTime = y + '-' + m + '-' + d + ' ' + h + ':' + minute;
        }
        return newTime;
    },
    //时间日期格式化
    dateFormat(dateObj, format) {
        let date = {
            'M+': dateObj.getMonth() + 1,
            'd+': dateObj.getDate(),
            'h+': dateObj.getHours(),
            'm+': dateObj.getMinutes(),
            's+': dateObj.getSeconds(),
            'q+': Math.floor((dateObj.getMonth() + 3) / 3),
            'S+': dateObj.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(
                RegExp.$1,
                (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        for (let k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1
                        ? date[k]
                        : ('00' + date[k]).substr(('' + date[k]).length)
                );
            }
        }
        return format;
    },
    //获取地址栏参数
    GetQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    },
    checkding: function() {
        axios
            .post('/ding/shoujitiongxun', {
                corp_id: store.state.cid,
                url: window.location.href,
                pc: '1'
            })
            .then((res) => {
                if (res.data.status == 1) {
                    let tokenData = res.data.content;
                    dd.config({
                        agentId: tokenData.agentId, // 必填，微应用ID
                        corpId: store.state.cid, //必填，企业ID
                        timeStamp: tokenData.timeStamp, // 必填，生成签名的时间戳
                        nonceStr: tokenData.nonceStr, // 必填，生成签名的随机串
                        signature: tokenData.signature, // 必填，签名
                        type: 0, //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                        jsApiList: [
                            'biz.contact.complexPicker',
                            'biz.contact.choose',
                            'runtime.info',
                            'device.notification.confirm',
                            'device.notification.alert',
                            'device.notification.prompt',
                            'biz.ding.post',
                            'biz.util.openLink',
                            'biz.util.uploadAttachment',
                            'biz.cspace.preview',
                            'biz.util.downloadFile',
                            'biz.util.openSlidePanel',
                            'biz.ding.create'
                        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
                    });
                    dd.error(function(err) {
                        console.log(JSON.stringify(err));
                    });
                }
            });
    },
    getSpaceId: function() {
        axios
            .post('/dingyun/DingPanSaveFile', {
                corp_id: store.state.cid,
                type: 'add',
                userid: store.state.userInfo.uid
            })
            .then((res) => {
                if (res.data.status == 1) {
                    store.commit('setSpaceId', res.data.spaceid);
                }
            });
    },
    utilAdjustWidth: function(stable, appendDiv, sx, sh) {
        // stable是ref选中的table表格
        //appendDiv append的小计合计外层div
        //sx是小计的ref
        //sh是合计的ref
        if (stable && stable.$refs.headerWrapper && appendDiv && sx && sh) {
            let width = getComputedStyle(
                stable.$refs.headerWrapper.querySelector('table')
            ).width;
            //修改append后的宽度和表格宽度一致
            appendDiv.style.width = width;
            sx.style = 'width:' + width;
            sh.style = 'width:' + width;
            Array.from(
                stable.$refs.headerWrapper.querySelectorAll('col')
            ).forEach((n, i) => {
                if (sx.children[i]) {
                    sx.children[i].style =
                        'width:' + n.getAttribute('width') + 'px';
                }
                if (sh.children[i]) {
                    sh.children[i].style =
                        'width:' + n.getAttribute('width') + 'px';
                }
            });
        }
    },
    //数组对象去重
    unique: function(arr) {
        const res = new Map();
        return arr.filter(
            (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
        );
    },
    //计算大小
    renderSize: function(value) {
        if (null == value || value == '') {
            return '0 B';
        }
        var unitArr = new Array(
            'B',
            'K',
            'M',
            'G',
            'T',
            'PB',
            'EB',
            'ZB',
            'YB'
        );
        var index = 0;
        var srcsize = parseFloat(value);
        index = Math.floor(Math.log(srcsize) / Math.log(1024));
        var size = srcsize / Math.pow(1024, index);
        size = size.toFixed(1); //保留的小数位数
        return size + unitArr[index];
    }
};

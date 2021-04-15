let newP = window.location.protocol;

if (newP == 'http:') {
    window.domain = 'http://phpxiezhu.zzdingyun.com/'; //线下
} else {
    window.domain = 'https://newxiezhu.zzdingyun.com/'; //线上端口
}

<template>
    <div id="error">
        <div class="errorMain">
            <img src="../assets/menu/outtime.png" alt="" />
            <h2>{{ msg }}</h2>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'error',
    data() {
        return { dialoglianxi: false, msg: '' };
    },
    methods: {},
    created() {
        this.msg = this.$route.query.msg;
    }
};
</script>

<style lang="less">
body {
    #error {
        width: 100%;
        height: 90vh;
        .errorMain {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #fff;
            text-align: center;
            z-index: 1200;
            img {
                margin-top: 100px;
                width: 240px;
            }
            h2 {
                font-size: 22px;
                margin-bottom: 30px;
            }
            h4 {
                font-size: 16px;
                margin-bottom: 34px;
            }
            .bottomBtn {
                text-align: center;
            }
        }
    }
}
</style>
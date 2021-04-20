<template>
    <div id="app">
        <!-- <userinfo /> -->
        <router-view class="app-bottom" />
        <!-- <menuS/> -->
        <!-- <div class="app-right">
              <menuS/>
             <router-view/>
        </div>-->
    </div>
</template>
<script>
// import menuS from "@/components/menuS.vue";
import userinfo from '@/components/userinfo.vue';
export default {
    name: 'app',
    data() {
        return {
        };
    },
    methods: {},
    created() {},
    computed: {
    },
    mounted() {
    },
    created() {},

    components: {
        // menuS,
        userinfo
    }
};
</script>
<style lang="less" scoped>
#app {
    background: #f6f6f6;
    width: 100%;
    height: 100%;

    .app-bottom {
        height: 100%;
    }
    .app-right {
        display: flex;
        width: 1573px;
    }
    // font-family: Avenir, Helvetica, Arial, sans-serif;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    // color: #2c3e50;
}
</style>

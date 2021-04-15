<template>
    <div id="app">
        <userinfo />
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
            widthS: { width: '18.5rem' },
            schedule: '',
            scheduleNumber: ''
        };
    },
    methods: {},
    created() {},
    computed: {
        styleS() {
            //  alert(this.widthS.Width)
            return this.widthS;
        }
    },
    mounted() {
        const that = this;
        window.onresize = () => {
            let WidthT =
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            let SS = WidthT / 100;
            if (SS > 19.2 || SS == 19.2) {
                let TS = 19.2 + 'rem';
                that.$set(that.widthS, 'width', TS);
            } else {
                let TSS = 18.5 + 'rem';
                that.$set(that.widthS, 'width', TSS);
            }
        };
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
    // width: 18.5rem;
    width: 100%;
    height: 100%;

    .app-bottom {
        height: 100%;
    }
    .app-right {
        display: flex;
        width: 15.73rem;
    }
    // font-family: Avenir, Helvetica, Arial, sans-serif;
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    // color: #2c3e50;
}
</style>

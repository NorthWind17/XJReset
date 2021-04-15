<template>
    <!-- <div id="application">
        <div class="application-left">
            <menuS :viewMenu="viewMenu" />
        </div>
        <div ref="elementS" class="application-right">
            <router-view />
        </div>
    </div> -->
    <div class="commonMain">
        <el-aside class="homeBottomMenu">
            <div class="hbmMain">
                <menuS ref="projectMenu" :viewMenu="viewMenu"></menuS>
            </div>
        </el-aside>
        <el-main class="homeMain">
            <div id="application">
                <router-view />
            </div>
        </el-main>
    </div>
</template>

<script>
import menuS from '@/components/menuS.vue';
export default {
    name: 'application',
    data() {
        return { viewMenu: 5 };
    },
    components: {
        menuS
    }
};
</script>

<style lang="less">
#application {
    display: flex;
    .application-left {
        background: white;
        height: 90vh;
    }
    .application-right {
        height: 90vh;
        //新
        // height: 90vh;
        overflow-y: auto;
        overflow-x: hidden;
    }
}
</style>
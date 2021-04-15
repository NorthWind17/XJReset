<template>
    <!-- <div id="diary">
        <div class="diary-left">
            <menuS :viewMenu="viewMenu" />
        </div>
        <div ref="elementS" class="diary-right">
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
            <div id="diary">
                <router-view />
            </div>
        </el-main>
    </div>
</template>

<script>
import menuS from '@/components/menuS.vue';
export default {
    name: 'diary',
    data() {
        return { viewMenu: 4 };
    },
    components: {
        menuS
    }
};
</script>

<style lang="less">
#diary {
    display: flex;
    .diary-left {
        background: white;
        height: 90vh;
    }
    .diary-right {
        height: 90vh;
        //新
        // height: 90vh;
        overflow-y: auto;
        overflow-x: hidden;
    }
}
</style>
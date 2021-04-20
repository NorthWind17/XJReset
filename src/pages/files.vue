<template>
    <!-- <div id="files">
        <div class="files-left">
            <menuS :viewMenu="viewMenu" />
        </div>
        <div class="files-right">
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
            <div id="files">
                <router-view />
            </div>
        </el-main>
    </div>
</template>
<script>
import menuS from '@/components/menuS.vue';
export default {
    data() {
        return { viewMenu: 3 };
    },
    components: {
        menuS
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
#files {
    display: flex;
    .files-left {
        background: white;
    }
    .files-right {
        width: 1640px;
        height: 90vh;
    }
}
</style>
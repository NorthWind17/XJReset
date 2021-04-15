<template>
    <!-- <div id="task">
        <div class="task-left">
            <menuS :viewMenu="viewMenu" />
        </div>
        <div ref="elementS" class="task-right">
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
            <div id="task">
                <router-view />
            </div>
        </el-main>
    </div>
</template>

<script>
import menuS from '@/components/menuS.vue';
export default {
    name: 'task',
    data() {
        return {
            viewMenu: 2
        };
    },
    components: {
        menuS
    }
};
</script>

<style lang="less">
#task {
    display: flex;
    .task-left {
        background: white;
        height: 90vh;
    }
    .task-right {
        height: 90vh;
        //新
        // height: 90vh;
        overflow-y: auto;
        overflow-x: hidden;
    }
}
</style>
<template>
    <!-- <div id="project">
        <div class="project-left">
            <menuS ref="projectMenu" :viewMenu="viewMenu" />
        </div>
        <div class="project-right">
            <router-view ref="projectRef" />
        </div>
    </div> -->
    <div class="commonMain">
        <el-aside class="homeBottomMenu">
            <div class="hbmMain">
                <menuS
                    ref="projectMenu"
                    @updateL="fatherMethod"
                    :viewMenu="viewMenu"
                ></menuS>
            </div>
        </el-aside>
        <el-main class="homeMain">
            <div id="project">
                <router-view
                    ref="projectRef"
                    @openD="fatherViewDialog"
                    @updateN="fatherUpNum"
                />
            </div>
        </el-main>
    </div>
</template>

<script>
import menuS from '@/components/menuS.vue';
export default {
    name: 'project',
    data() {
        return {
            viewMenu: 1
        };
    },
    components: {
        menuS
    },
    methods: {
        //创建或编辑后更新列表
        fatherMethod(val) {
            if (val == 1) {
                this.$refs.projectRef.getNewList();
            } else if (val == 2) {
                this.$refs.projectRef.getInfo();
            }
        },
        //编辑打开mens新建
        // fatherViewDialog(row, type) {
        //     this.$refs.projectMenu.viewDialog(row, type);
        // },
        fatherViewDialog(val) {
            this.$refs.projectMenu.viewDialog(val.row, val.type);
        },
        //详情编辑更新详情
        // InfoMethod() {
        //     this.$refs.projectRef.getInfo();
        // },
        //更新侧边栏数量
        fatherUpNum() {
            this.$refs.projectMenu.getUserNum();
        }
    },
    mounted() {
        this.$utils.checkding();
    }
};
</script>

<style lang="less">
#project {
    display: flex;
    .project-left {
        background: white;
        height: 90vh;
    }
    .project-right {
        height: 90vh;
        //新
        // height: 90vh;
        overflow-y: auto;
        overflow-x: hidden;
    }
}
</style>
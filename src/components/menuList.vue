<template>
    <div>
        <el-menu
            :router="true"
            background-color="#3296fa"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="routhPath"
            :collapse-transition="true"
            :default-openeds="openPath"
        >
            <div v-for="(item, lindex) in menuList" :key="lindex">
                <el-submenu v-if="item.children.length > 0" :index="item.url">
                    <template slot="title"
                        ><i :class="item.icon"></i
                        ><span class="menuFirstName">{{
                            item.name
                        }}</span></template
                    >
                    <div
                        v-if="item.children.length > 0"
                        v-for="(list, cindex) in item.children"
                        :key="cindex"
                    >
                        <el-submenu
                            v-if="list.children.length > 0"
                            :index="list.url"
                        >
                            <template slot="title">{{ list.name }}</template>
                            <div
                                v-for="(blist, cbindex) in list.children"
                                :key="cbindex"
                            >
                                <div v-if="blist.children.length > 0">
                                    <el-submenu :index="blist.url">
                                        <template slot="title">{{
                                            blist.name
                                        }}</template>
                                        <el-menu-item
                                            v-for="(
                                                bclist, chindex
                                            ) in blist.children"
                                            :index="bclist.url"
                                            :key="chindex"
                                        >
                                            <el-tooltip
                                                class="item"
                                                effect="dark"
                                                :content="bclist.name"
                                                placement="right"
                                            >
                                                <span>{{ bclist.name }}</span>
                                            </el-tooltip>
                                        </el-menu-item>
                                    </el-submenu>
                                </div>
                                <div v-else>
                                    <el-menu-item :index="blist.url">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="blist.name"
                                            placement="right"
                                        >
                                            <span>{{ blist.name }}</span>
                                        </el-tooltip>
                                    </el-menu-item>
                                </div>
                            </div>
                        </el-submenu>
                        <el-menu-item-group v-else>
                            <el-menu-item :index="list.url">{{
                                list.name
                            }}</el-menu-item>
                        </el-menu-item-group>
                    </div>
                </el-submenu>
                <el-menu-item v-else :index="item.url">
                    <i :class="item.icon"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'menuList',
    props: {
        viewMenu: Number
    },
    data() {
        return {
            openPath: [
                '/project/shangwu',
                '/project/shengchan',
                '/project/xiancgl'
            ],
            menuList: [],
            menuType: 9
        };
    },
    methods: {
        getList() {
            this.$axios
                .post('/user/menu', { type: this.menuType })
                .then((res) => {
                    if (res.data.code == 1) {
                        this.menuList = res.data.data;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning',
                            duration: '1500'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    created() {
        this.menuType = this.viewMenu;
        this.getList();
    },
    computed: {
        routhPath() {
            if (
                this.$route.path == '/appIndex8/appIndex' ||
                this.$route.path == '/appIndex8/appIndex2' ||
                this.$route.path == '/appIndex8/appIndexWarn'
            ) {
                return '/appIndex8/appIndex';
            } else if (
                this.$route.path == '/project/workRecordInfo' ||
                this.$route.path == '/project/workRecordTotal'
            ) {
                return '/project/workRecord';
            } else {
                return this.$route.path;
            }
        }
    }
};
</script>

<style>
</style>
<template>
    <div id="filesCurrent">
        <div class="main">
            <div class="middleContent">
                <div class="file" style="margin-bottom: 20px">
                    文件操作动态
                </div>
                <div>
                    <el-table :data="banner" stripe border style="width: 100%">
                        <el-table-column
                            label="姓名"
                            prop="name"
                            width="120"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            label="操作内容"
                            prop="neirong"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            label="操作时间"
                            prop="time"
                            width="200"
                            align="center"
                        ></el-table-column>
                    </el-table>
                </div>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'filesDynamic',
    data() {
        return {
            preViewVisible: false,
            total: '',
            pagesize: 10,
            currentPage: 1,
            banner: []
        };
    },
    methods: {
        //文件恢复
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getFileList();
        },
        getPRole() {
            this.$axios
                .post('/cy_xiezhu/ProjectUserRole', {
                    corp_id: this.$store.state.cid,
                    admin: this.$store.state.userInfo.admin,
                    userid: this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.role == '2') {
                            dd.ready(function () {
                                dd.device.notification.alert({
                                    message:
                                        '无项目，请您先创建项目才能进行其他操作！',
                                    title: '提示', //可传空
                                    buttonName: '收到',
                                    onSuccess: function () {
                                        //onSuccess将在点击button之后回调
                                        /*回调*/
                                    },
                                    onFail: function (err) {}
                                });
                            });
                        }
                    }
                });
        },
        // 文件列表
        getFileList() {
            this.$axios
                .post('/cy_xiezhu/WenJianDongTaiList', {
                    xmid: this.$store.state.projectInfo.pid,
                    admin: this.$store.state.userInfo.admin,
                    current_page: this.currentPage
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.banner = res.data.content.list;
                        this.total = res.data.content.total;
                        if (
                            res.data.content.total > 0 &&
                            this.banner.length < 1
                        ) {
                            this.getFileList();
                        }
                    } else if (res.data.code == 300) {
                        dd.ready(function () {
                            dd.device.notification.alert({
                                message: res.data.msg,
                                title: '提示', //可传空
                                buttonName: '收到',
                                onSuccess: function () {
                                    //onSuccess将在点击button之后回调
                                    /*回调*/
                                },
                                onFail: function (err) {}
                            });
                        });
                    } else {
                        this.$message.warning(`${res.data.msg}`);
                    }
                });
        }
    },
    mounted() {
        this.getPRole();
        this.getFileList();
    },
    watch: {
        '$store.state.projectInfo': {
            handler(val, oldVal) {
                if (oldVal) {
                    this.getFileList();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
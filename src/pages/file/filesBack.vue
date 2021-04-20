<template>
    <div id="filesCurrent">
        <div class="main">
            <div class="middleContent">
                <div class="file">
                    回收文件列表<span style="font-size: 14px; color: #a5a1a1"
                        >（回收站数据最多保存一个月）</span
                    >
                </div>
                <div>
                    <el-table
                        :data="banner"
                        :default-sort="{ prop: 'time', order: 'descending' }"
                        style="width: 100%"
                    >
                        <el-table-column label="图标" width="100">
                            <template slot-scope="scope">
                                <el-row :gutter="20" class="left">
                                    <el-col :span="3" v-if="scope.row.gurl">
                                        <img
                                            :src="scope.row.gurl"
                                            style="
                                                height: 40px;
                                                width: 40px;
                                            "
                                        />
                                    </el-col>
                                    <el-col :span="3" v-else>
                                        <img
                                            src="../../assets/management/guidang.png"
                                            style="
                                                height: 34px;
                                                width: 38px;
                                            "
                                            v-show="
                                                scope.row.type == 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/TZ.png"
                                            style="
                                                height: 40px;
                                                width: 40px;
                                            "
                                            v-show="
                                                scope.row.filetype == '2' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/MX.png"
                                            style="
                                                height: 40px;
                                                width: 40px;
                                            "
                                            v-show="
                                                scope.row.filetype == '3' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/GX.png"
                                            style="
                                                height: 40px;
                                                width: 40px;
                                            "
                                            v-show="
                                                scope.row.filetype == '4' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/BD.png"
                                            style="
                                                height: 40px;
                                                width: 40px;
                                            "
                                            v-show="
                                                scope.row.filetype == '5' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/GF.png"
                                            style="
                                                height: 40px;
                                                width: 40px;
                                            "
                                            v-show="
                                                scope.row.filetype == '6' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/SC.png"
                                            style="
                                                height: 40px;
                                                width: 40px;
                                            "
                                            v-show="
                                                scope.row.filetype == '7'
                                                    ? true
                                                    : false
                                            "
                                        />
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column label="文件名称">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="日期"
                            sortable
                            width="180"
                        ></el-table-column>
                        <el-table-column
                            prop="size"
                            label="大小"
                            sortable
                            width="120"
                        ></el-table-column>
                        <el-table-column
                            label="操作"
                            width="200"
                            align="center"
                        >
                            <template slot-scope="scope">
                                <el-popover
                                    placement="bottom"
                                    trigger="click"
                                    width="60"
                                    popper-class="filesEditPo"
                                    v-model="scope.row.btnVisible"
                                >
                                    <div class="filesImgTableEdit">
                                        <!-- <el-button type="text" @click="previewFiles(scope.row)">预览</el-button> -->
                                        <el-button
                                            type="text"
                                            @click="backClick(scope.row)"
                                            >恢复</el-button
                                        >
                                    </div>
                                    <el-button
                                        type="text"
                                        slot="reference"
                                        icon="el-icon-more"
                                    ></el-button>
                                </el-popover>
                            </template>
                        </el-table-column>
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
        <el-dialog
            title="预览   (ESC关闭)"
            :visible.sync="preViewVisible"
            width="80%"
            :close-on-click-modal="false"
            @close="closeBimface"
        >
            <div id="domId"></div>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'filesBack',
    data() {
        return {
            preViewVisible: false,
            total: '',
            pagesize: 10,
            currentPage: 1,
            dialogVisible: false,
            banner: []
        };
    },
    methods: {
        //文件恢复
        backClick(row) {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/HuanYuanFile', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid,
                    fids: [row.id],
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.$message.success(`${res.data.msg}`);
                        _this.getFileList();
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getFileList();
        },
        closeBimface() {
            document.getElementById('domId').innerHTML = ' ';
            this.preViewVisible = false;
        },
        //预览
        previewFiles(row) {
            const _this = this;
            if (row.type == 'bimface') {
                _this.preViewVisible = true;
                _this.previewBIM(row.id);
            } else if (row.type == 'OSS') {
                let newType = row.name.substring(row.name.lastIndexOf('.') + 1);
                if (newType == 'png' || 'jpg' || 'jpeg' || 'gif' || 'bmp') {
                    _this.previewPic(row.url);
                } else {
                    _this.previewOffice(row.url);
                }
            }
        },
        //预览BIMFACE
        //预览BIMFACE
        previewBIM(id) {
            const _this = this;

            _this.$axios
                .post('/cy_xiezhu/BimFileYuLan', {
                    id: id,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.viewToken = res.data.viewtoken;
                        // 设置BIMFACE JSSDK加载器的配置信息
                        let loaderConfig = new BimfaceSDKLoaderConfig();
                        loaderConfig.viewToken = res.data.viewtoken;
                        // 加载BIMFACE JSSDK加载器
                        BimfaceSDKLoader.load(
                            loaderConfig,
                            _this.successCallback,
                            _this.failureCallback
                        );
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        successCallback(viewMetaData) {
            // 创建WebApplication，直接显示模型或图纸
            let dom4Show = document.getElementById('domId');
            new Glodon.Bimface.Application.WebApplicationDemo(
                viewMetaData,
                dom4Show
            );
        },
        failureCallback(error) {
            console.log(error);
        },
        //预览图片
        previewPic(url) {
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: [url], //图片地址列表
                    current: url, //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        //预览office
        previewOffice() {
            dd.ready(function () {
                dd.biz.util.openLink({
                    url: url,
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        // 文件列表
        getFileList() {
            this.$axios
                .post('/cy_xiezhu/HuiShouZhan', {
                    corp_id: this.$store.state.cid,
                    userid: this.$store.state.userInfo.uid,
                    xmid: this.$store.state.projectInfo.pid,
                    current_page: this.currentPage,
                    admin: this.$store.state.userInfo.admin,
                    name: '',
                    admin: this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.banner = res.data.content.list;
                        this.total = res.data.content.total;
                        if (
                            res.data.content.total > 0 &&
                            this.banner.length < 1
                        ) {
                            this.currentPage = res.data.content.page;
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
        }
    },
    computed: {
        bannerSS() {
            if (this.banner.length < 9) {
                return this.banner;
            } else {
                var bannerS = [];
                for (let i = 0; i < 9; i++) {
                    bannerS.push(this.banner[i]);
                }
                return bannerS;
            }
        } // 文件列表
    },
    mounted() {
        this.getPRole();
        this.getFileList();
        this.$utils.checkding();
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
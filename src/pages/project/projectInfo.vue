<template>
    <div id="projectInfo">
        <div class="main">
            <div class="content">
                <div class="headerlabel">
                    <h3>项目详情</h3>
                    <div class="hlright">
                        <el-button type="primary" plain @click="edit"
                            >编辑</el-button
                        >
                        <el-button type="primary" plain @click="back"
                            >返回</el-button
                        >
                    </div>
                </div>
                <div class="header">
                    <div class="box">{{ proData.beian }}</div>
                    <div>
                        <div class="headerLeft">
                            <div>
                                <img :src="proData.xmurl" alt="项目图像" />
                            </div>
                            <div class="hlContent">
                                <div class="hlct">{{ proData.name }}</div>
                                <div class="xmcontent">
                                    <div>项目简称：{{ proData.pcontent }}</div>
                                    <div>
                                        项目负责人：{{ proData.puseridname }}
                                    </div>
                                </div>
                                <div class="xmcontent">
                                    <div>开工时间：{{ proData.xmstart }}</div>
                                    <div>竣工时间：{{ proData.xmstop }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="headerRight">
                            <el-progress
                                type="circle"
                                :percentage="proData.jindu"
                            ></el-progress>
                        </div>
                    </div>
                </div>
                <div class="pcontent">
                    <el-form
                        :label-position="labelPosition"
                        label-width="160px"
                    >
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="项目基本信息" name="first"
                                ><div class="piBorder">
                                    <el-form-item label="负责人联系电话：">
                                        <div>{{ proData.phone }}</div>
                                    </el-form-item>
                                    <el-form-item label="项目状态：">
                                        <div>{{ proData.beian }}</div>
                                    </el-form-item>

                                    <el-form-item label="开工时间：">
                                        <div>{{ proData.xmstart }}</div>
                                    </el-form-item>
                                    <el-form-item label="竣工时间：">
                                        <div>{{ proData.xmstop }}</div>
                                    </el-form-item>
                                    <el-form-item label="项目金额（万元）：">
                                        <div>{{ proData.xmmoney }}</div>
                                    </el-form-item>
                                    <el-form-item label="项目地址：">
                                        <div>{{ proData.xmcity }}</div>
                                    </el-form-item>
                                    <el-form-item label="详细地址：">
                                        <div>{{ proData.xmaddress }}</div>
                                    </el-form-item>
                                    <el-form-item label="分类标签：">
                                        <div
                                            v-for="(
                                                item, index
                                            ) in proData.xmbiaoqian"
                                        >
                                            {{ item }}
                                        </div>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目简介："
                                        class="xmdetail"
                                    >
                                        <div>{{ proData.xmcontent }}</div>
                                    </el-form-item>
                                </div></el-tab-pane
                            >
                            <el-tab-pane label="项目权限" name="second"
                                ><div class="piBorder">
                                    <el-form-item
                                        class="xmdetail quanxiansecond"
                                    >
                                        <div>
                                            <div>创建任务:</div>
                                            <div class="xmquan">
                                                <div
                                                    v-for="(
                                                        item, index
                                                    ) in proData.xmquanxian.add"
                                                >
                                                    {{ item }}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>修改任务:</div>
                                            <div class="xmquan">
                                                <div
                                                    v-for="(
                                                        item, index
                                                    ) in proData.xmquanxian
                                                        .edit"
                                                >
                                                    {{ item }}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>删除任务:</div>
                                            <div class="xmquan">
                                                <div
                                                    v-for="(
                                                        item, index
                                                    ) in proData.xmquanxian
                                                        .delete"
                                                >
                                                    {{ item }}
                                                </div>
                                            </div>
                                        </div>
                                    </el-form-item>
                                </div></el-tab-pane
                            >
                            <el-tab-pane label="项目成员" name="third"
                                ><div class="pinfoUser">
                                    <el-input
                                        placeholder="请输入姓名"
                                        v-model="searchName"
                                        clearable
                                    >
                                    </el-input>
                                    <!-- <div class="cjTypeClass">
                                        <div style="font-size: 0.14rem">
                                            单位类型：
                                        </div>
                                        <el-select
                                            v-model="cjStype"
                                            clearable
                                            placeholder="请选择单位类型"
                                        >
                                            <el-option
                                                label="施工总承包单位"
                                                value="施工总承包单位"
                                            ></el-option>
                                            <el-option
                                                label="专业分包单位"
                                                value="专业分包单位"
                                            ></el-option>
                                            <el-option
                                                label="建设单位"
                                                value="建设单位"
                                            ></el-option>
                                            <el-option
                                                label="勘察单位"
                                                value="勘察单位"
                                            ></el-option>
                                            <el-option
                                                label="设计单位"
                                                value="设计单位"
                                            ></el-option>
                                            <el-option
                                                label="监理单位"
                                                value="监理单位"
                                            ></el-option>
                                            <el-option
                                                label="咨询单位"
                                                value="咨询单位"
                                            ></el-option>
                                        </el-select>
                                    </div> -->
                                    <el-button
                                        type="primary"
                                        plain
                                        @click="searchClick"
                                        style="margin-left: 20px"
                                        >搜索</el-button
                                    >
                                </div>
                                <el-table
                                    ref="singleTable"
                                    :data="tableData"
                                    highlight-current-row
                                    style="width: 7rem"
                                    border
                                    max-height="250"
                                >
                                    <el-table-column
                                        type="index"
                                        width="50"
                                        label="序号"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="姓名"
                                    ></el-table-column>

                                    <el-table-column
                                        prop="type"
                                        label="人员权限"
                                        :formatter="typeFort"
                                    ></el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                    </el-form>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :visible.sync="quitVisible" width="5rem">
            <span>确认退出该企业？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="quitVisible = false">取 消</el-button>
                <el-button type="primary" :loading="loading" @click="quitClick"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'projectInfo',
    data() {
        return {
            quitVisible: false,
            searchName: '',
            labelPosition: 'right',
            pjname: '',
            pUserName: '',
            percentage: 0,
            ptag: '',
            proData: {
                xmurl: '',
                beian: '',
                name: '',
                pcontent: '',
                phone: '',
                puseridname: '',
                puserid: '',
                xmaddress: '',
                xmbiaoqian: [],
                xmcity: '',
                xmcontent: '',
                xmmoney: '',
                xmquanxian: {},
                xmstart: '',
                xmstop: '',
                xmurl: '',
                xmuser: {},
                corps: []
            },
            tableData: [],
            corpTable: [],
            activeName: 'first',
            cjStype: '',
            loading: false,
            quitData: {}
        };
    },
    methods: {
        quitClick() {
            this.loading = true;
            this.$axios
                .post('/cy_xiezhu/DeleceCorpProject', {
                    xmid: this.$route.query.id,
                    corp_id: this.$store.state.cid,
                    userid: this.$store.state.userInfo.uid,
                    ccorp_id: this.quitData.corp_id,
                    admin: this.$store.state.userInfo.admin
                })
                .then((res) => {
                    this.loading = false;
                    if (res.data.code == 200) {
                        this.quitVisible = false;
                        this.getInfo();
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.warning(res.data.msg);
                    }
                });
        },
        corpFort(row) {
            switch (row.type) {
                case 'zb':
                    return '施工总承包单位';
                    break;
                case 'zf':
                    return '专业分包单位';
                    break;
                case 'js':
                    return '建设单位';
                    break;
                case 'kc':
                    return '勘察单位';
                    break;
                case 'sj':
                    return '设计单位';
                    break;
                case 'jl':
                    return '监理单位';
                    break;
                case 'zx':
                    return '咨询单位';
                    break;
            }
        },
        //退出企业
        quitCorp(row) {
            this.quitData = row;
            this.quitVisible = true;
        },
        edit() {
            const _this = this;
            let newData = JSON.parse(JSON.stringify(_this.proData));
            _this.$parent.fatherViewDialog(newData, 2);
        },
        typeFort(row, column) {
            switch (row.type) {
                case 'manage':
                    return '项目管理员';
                    break;
                case 'user':
                    return '项目成员';
                    break;
            }
        },
        //设置人员权限
        setPeople(type, row) {
            row.btnVisible = false;
            let newType = 'manage';
            if (type == 1) {
                newType = 'manage';
            } else if (type == 2) {
                newType = 'user';
            }
            this.$axios
                .post('/cy_xiezhu/UpdateCongProjectUser', {
                    xmid: this.$route.query.id,
                    corp_id: this.$store.state.cid,
                    userid: this.$store.state.userInfo.uid,
                    bcorp_id: row.corp_id,
                    buserid: row.emplId,
                    type: newType,
                    admin: this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.getUserList();
                        this.$message.success('更改权限成功！');
                    } else {
                        this.$message.warning(res.data.msg);
                    }
                });
        },
        back() {
            this.$router.go(-1);
        },
        searchClick() {
            this.getUserList();
        },
        getUserList() {
            this.$axios
                .post('/cy_xiezhu/PhoneProjectUserList', {
                    xmid: this.$route.query.id,
                    corp_id: this.$store.state.cid,
                    name: this.searchName,
                    danweitype: this.cjStype,
                    type: 1
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.content;
                    }
                });
        },
        getInfo() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectContent', {
                    id: _this.$route.query.id,
                    corp_id: _this.$store.state.cid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.proData = res.data.content;
                        let newData = res.data.content.xmuser;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {},
    created() {
        this.getInfo();
        this.getUserList();
    },
    computed: {
        // projectData() {
        //     return this.$store.state.projectInfo.pid;
        // }
    },
    watch: {
        // projectData: {
        //     handler(newVal, oldVal) {
        //         //你需要执行的代码
        //         if (oldVal) {
        //             this.getInfo();
        //             this.getUserList();
        //         }
        //     },
        //     deep: true,
        //     immediate: true
        // }
    }
};
</script>
<style lang="less">
.poPic {
    width: 2.4rem;
    height: 2.4rem;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
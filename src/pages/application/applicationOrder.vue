<template>
    <div id="applicationOrder">
        <div class="main">
            <div class="content">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="orderId" label="订单编号">
                    </el-table-column>
                    <el-table-column prop="name" label="订单名称">
                    </el-table-column>
                    <el-table-column prop="number" label="可使用人数">
                    </el-table-column>
                    <el-table-column prop="start" label="下单时间">
                    </el-table-column>
                    <el-table-column prop="stop" label="到期时间">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="name"
                        label="操作"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.number > 0"
                                type="primary"
                                plain
                                @click="bindProject(scope.row)"
                                >绑定</el-button
                            ><el-button v-else type="info" plain
                                >绑定</el-button
                            >
                        </template>
                    </el-table-column> -->
                </el-table>
                <!-- <div class="cPag">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div> -->
            </div>
        </div>
        <el-dialog
            title="绑定项目"
            :visible.sync="dialogFormVisible"
            width="500px"
            @close="bindCancel('bfRef')"
        >
            <el-form
                :model="bindForm"
                :rules="bfRule"
                ref="bfRef"
                label-width="100px"
            >
                <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item> -->
                <input type="hidden" />
                <el-form-item label="项目" prop="xmid">
                    <el-select v-model="bindForm.xmid" placeholder="请选择项目">
                        <el-option
                            v-for="item in projectList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bindCancel('bfRef')">取 消</el-button>
                <el-button
                    type="primary"
                    :loading="loaded"
                    @click="bindClick('bfRef')"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bfRule: {
                xmid: [
                    {
                        required: true,
                        message: '请选择项目',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            total: '',
            pagesize: 10,
            currentPage: 1,
            tableData: [],
            bindForm: {
                xmid: ''
            },
            loaded: false,
            dialogFormVisible: false,
            bindID: ''
        };
    },
    methods: {
        bindProject(row) {
            this.getProjectList();
            if (this.$store.state.userInfo.admin == 1) {
                this.dialogFormVisible = true;
                this.bindID = row.id;
            } else {
                this.$notify({
                    title: '警告',
                    message: '钉钉子管理员及以上权限才可进行绑定操作！',
                    type: 'warning',
                    duration: 2000
                });
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        getList() {
            this.$axios
                .post('/task/DingDanList', {
                    corp_id: this.$store.state.cid
                })
                .then((res) => {
                    if (res.data.status == '200') {
                        // this.total = res.data.content.total;
                        this.tableData = res.data.list;
                        // if (this.total > 0 && this.tableData.length < 1) {
                        //     this.currentPage = res.data.content.page;
                        //     this.getList();
                        // }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        bindCancel(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        bindClick(formName) {
            const _this = this;
            _this.loaded = true;

            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/BangDingProject ', {
                            xmid: _this.bindForm.xmid,
                            corp_id: _this.$store.state.cid,
                            admin: _this.$store.state.userInfo.admin,
                            oid: _this.bindID
                        })
                        .then((res) => {
                            if (res.data.code == 200) {
                                _this.getList();
                                _this.loaded = false;
                                _this.dialogFormVisible = false;
                                _this.$refs[formName].resetFields();
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'success',
                                    duration: '2000'
                                });
                            } else {
                                _this.loaded = false;
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error',
                                    duration: '2000'
                                });
                            }
                        })
                        .catch(function (error) {
                            _this.loaded = false;
                            console.log(error);
                        });
                } else {
                    _this.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getProjectList() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectXiaLaList', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin,
                    type: '1'
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.projectList = res.data.content.filter(
                            (item) => item.quanxian != '1'
                        );
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
    mounted() {
        this.getPRole();

        this.getProjectList();
        this.getList();
    }
};
</script>
<style lang="less">
#applicationOrder {
    .content {
        padding: 20px 10px 40px 10em;
    }
}
</style>
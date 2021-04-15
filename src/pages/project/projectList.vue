<template>
    <div id="projectList" ref="elementS">
        <div>
            <div>
                <div class="bg">
                    <div class="headerWarn">
                        <div
                            v-for="(item, index) in projectTypeList"
                            :key="index"
                            :class="
                                index === activeProIndex ? 'activeConClass' : ''
                            "
                            @click="typeClick(index, item.id)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                    <div class="comeSearch">
                        <el-form
                            ref="searchFormRef"
                            :model="searchForm"
                            label-width="100px"
                        >
                            <div class="searchInput">
                                <el-input
                                    placeholder="请输入项目简称"
                                    prefix-icon="el-icon-search"
                                    v-model="searchForm.keyWord"
                                    @keyup.enter.native="searchClick"
                                ></el-input>
                            </div>
                            <div class="searchBottom">
                                <div class="searchLeft">
                                    <el-form-item
                                        class="searchTime"
                                        label="开工时间："
                                    >
                                        <el-date-picker
                                            v-model="searchForm.starttime"
                                            :picker-options="pickerStart"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        class="searchTime"
                                        label="竣工时间："
                                    >
                                        <el-date-picker
                                            v-model="searchForm.endtime"
                                            :picker-options="pickerEnd"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                        ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item
                                        class="searchTime"
                                        label="区域："
                                    >
                                        <el-cascader
                                            :options="options"
                                            @change="addressChange"
                                            style="width: 3rem"
                                            :placeholder="请选择"
                                            :clearable="true"
                                            v-model="searchForm.xmcity"
                                        ></el-cascader>
                                    </el-form-item>
                                </div>
                                <div class="searchRight">
                                    <el-button
                                        type="primary"
                                        round
                                        @click="searchClick"
                                        >搜索</el-button
                                    >
                                </div>
                            </div>
                        </el-form>
                    </div>
                    <el-table
                        :data="tableData"
                        :header-cell-style="tableHeaderClass"
                        border
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="pcontent"
                            label="项目简称"
                            align="center"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="beian"
                            label="项目状态"
                            align="center"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="xmmoney"
                            label="金额（万元）"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="xmcity"
                            label="区域"
                            align="center"
                            show-overflow-tooltip="true"
                        ></el-table-column>
                        <el-table-column
                            prop="xmstart"
                            label="开工时间"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="xmstop"
                            label="竣工时间"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            label="标签"
                            align="center"
                            show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <span>{{
                                    scope.row.xmbiaoqian.toString()
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="puseridname"
                            label="负责人"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-tooltip content="修改" placement="top">
                                    <i
                                        v-if="scope.row.status == '1'"
                                        class="el-icon-edit editBtn"
                                        @click="editProject(scope.row)"
                                    ></i>
                                </el-tooltip>
                                <el-tooltip content="删除" placement="top">
                                    <i
                                        v-if="scope.row.status == '1'"
                                        class="el-icon-delete someBtn"
                                        @click="deletePDialog(scope.row.id)"
                                    ></i>
                                </el-tooltip>
                                <el-tooltip content="退出" placement="top">
                                    <i
                                        v-if="
                                            scope.row.status == '1' &&
                                            scope.row.guanli == 2
                                        "
                                        class="el-icon-scissors someBtn"
                                        @click="quitDialog(scope.row.id)"
                                    ></i>
                                </el-tooltip>
                                <el-tooltip content="归档" placement="top">
                                    <i
                                        v-if="scope.row.status == '1'"
                                        class="el-icon-folder someBtn"
                                        @click="deleteProject(scope.row.id, 2)"
                                    ></i>
                                </el-tooltip>
                                <el-tooltip content="取消归档" placement="top">
                                    <i
                                        v-if="scope.row.status == '2'"
                                        class="el-icon-folder editBtn"
                                        @click="deleteProject(scope.row.id, 3)"
                                    ></i>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align: center">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="pagesize"
                            layout="prev, pager, next, jumper"
                            :total="total"
                        ></el-pagination>
                    </div>
                    <el-dialog
                        title="提示"
                        :visible.sync="deleteVisible"
                        width="5rem"
                    >
                        <span>确认删除？一旦删除数据无法找回</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="deleteVisible = false"
                                >取 消</el-button
                            >
                            <el-button
                                type="primary"
                                :loading="loading"
                                @click="deleteClick"
                                >确 定</el-button
                            >
                        </span>
                    </el-dialog>
                    <el-dialog
                        title="提示"
                        :visible.sync="quitVisible"
                        width="5rem"
                    >
                        <span>确认退出该项目？</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="quitVisible = false"
                                >取 消</el-button
                            >
                            <el-button
                                type="primary"
                                :loading="loading"
                                @click="quitClick"
                                >确 定</el-button
                            >
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import { regionData, CodeToText } from 'element-china-area-data';
export default {
    name: 'projectList',
    data() {
        const validateuser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择负责人'));
            } else {
                callback();
            }
        };
        return {
            quitVisible: false,
            options: regionData,
            projectTypeList: [
                { name: '我的项目', id: '1' },
                { name: '归档项目', id: '2' }
            ],
            searchForm: {
                keyWord: '',
                starttime: '',
                endtime: '',
                city: '',
                xmcity: ''
            },
            tagsData: [],
            activeProIndex: 0,
            addFormRules: {
                name: [
                    {
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }
                ],
                abbreviation: [
                    {
                        required: true,
                        message: '项目简称不能为空',
                        trigger: 'blur'
                    }
                ],
                proserial: [
                    {
                        required: true,
                        message: '项目编号不能为空',
                        trigger: 'blur'
                    }
                ],
                pname: [
                    {
                        required: true,
                        validator: validateuser
                    }
                ]
            },
            widthS: 100,
            total: '',
            pagesize: 10,
            currentPage: 1,
            addForm: { name: '', pname: '' },
            addFormVisible: false,
            loaded: false,
            tableData: [],
            projectType: [],
            typeVal: '1',
            deleteVisible: false,
            loading: false,
            deleteXmId: ''
        };
    },

    methods: {
        tableHeaderClass({ row, rowIndex }) {
            return 'font-weight:500;font-size: 0.15rem;color:#272727;background-color:#f9f9f9;';
        },
        //退出项目
        quitClick() {
            const _this = this;
            _this.loading = true;
            _this.$axios
                .post('/cy_xiezhu/DeleceCorpProject', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.deleteXmId,
                    userid: _this.$store.state.userInfo.uid,
                    admin: this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.loading = false;
                        _this.quitVisible = false;
                        if (
                            _this.deleteXmId ==
                                _this.$store.state.projectInfo.pid &&
                            _this.deleteXmId != _this.tableData[0].id
                        ) {
                            _this.$store.commit(
                                'setProjectName',
                                _this.tableData[0].pcontent
                            );
                            _this.$store.commit(
                                'setProjectId',
                                _this.tableData[0].id
                            );
                            _this.$store.commit(
                                'setProjectPurl',
                                _this.tableData[0].xmurl
                            );
                            _this.$store.commit(
                                'setPerctentage',
                                _this.tableData[0].percentage
                            );
                            _this.$store.commit(
                                'setPTag',
                                _this.tableData[0].ptag
                            );
                            _this.$store.commit(
                                'setPStatus',
                                _this.tableData[0].status
                            );
                        } else {
                            _this.$store.commit(
                                'setProjectName',
                                _this.tableData[1].pcontent
                            );
                            _this.$store.commit(
                                'setProjectId',
                                _this.tableData[1].id
                            );
                            _this.$store.commit(
                                'setProjectPurl',
                                _this.tableData[1].xmurl
                            );
                            _this.$store.commit(
                                'setPerctentage',
                                _this.tableData[1].percentage
                            );
                            _this.$store.commit(
                                'setPTag',
                                _this.tableData[1].ptag
                            );
                            _this.$store.commit(
                                'setPStatus',
                                _this.tableData[1].status
                            );
                        }
                        _this.currentPage = 1;
                        _this.getList();
                        _this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'success'
                        });
                    } else {
                        _this.loading = false;
                        _this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    _this.loading = false;
                    console.log(error);
                });
        },
        //删除项目
        deleteClick() {
            const _this = this;
            _this.loading = true;
            _this.$axios
                .post('/cy_xiezhu/UpdateProject', {
                    cytype: 'delete',
                    xmid: _this.deleteXmId,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.loading = false;
                        _this.deleteVisible = false;
                        if (
                            _this.deleteXmId ==
                                _this.$store.state.projectInfo.pid &&
                            _this.deleteXmId != _this.tableData[0].id
                        ) {
                            _this.$store.commit(
                                'setProjectName',
                                _this.tableData[0].pcontent
                            );
                            _this.$store.commit(
                                'setProjectId',
                                _this.tableData[0].id
                            );
                            _this.$store.commit(
                                'setProjectPurl',
                                _this.tableData[0].xmurl
                            );
                            _this.$store.commit(
                                'setPerctentage',
                                _this.tableData[0].percentage
                            );
                            _this.$store.commit(
                                'setPTag',
                                _this.tableData[0].ptag
                            );
                            _this.$store.commit(
                                'setPStatus',
                                _this.tableData[0].status
                            );
                            _this.$store.commit(
                                'setPPower',
                                _this.tableData[0].quanxian
                            );
                        } else {
                            _this.$store.commit(
                                'setProjectName',
                                _this.tableData[1].pcontent
                            );
                            _this.$store.commit(
                                'setPPower',
                                _this.tableData[1].quanxian
                            );
                            _this.$store.commit(
                                'setProjectId',
                                _this.tableData[1].id
                            );
                            _this.$store.commit(
                                'setProjectPurl',
                                _this.tableData[1].xmurl
                            );
                            _this.$store.commit(
                                'setPerctentage',
                                _this.tableData[1].percentage
                            );
                            _this.$store.commit(
                                'setPTag',
                                _this.tableData[1].ptag
                            );
                            _this.$store.commit(
                                'setPStatus',
                                _this.tableData[1].status
                            );
                        }
                        _this.currentPage = 1;
                        _this.getList();
                        _this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'success'
                        });
                    } else {
                        _this.loading = false;
                        _this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    _this.loading = false;
                    console.log(error);
                });
        },
        quitDialog(id) {
            this.deleteXmId = id;
            this.quitVisible = true;
        },
        deletePDialog(id) {
            this.deleteXmId = id;
            this.deleteVisible = true;
        },
        //归档项目
        deleteProject(xmid, type) {
            const _this = this;
            let ptype;
            if (type == 1) {
                ptype = 'delete';
            } else if (type == 2) {
                ptype = 'guidang';
            } else if (type == 3) {
                ptype = 'quxiaoguidang';
            }
            _this.$axios
                .post('/cy_xiezhu/UpdateProject', {
                    cytype: ptype,
                    xmid: xmid,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (_this.$store.state.projectInfo.pid == xmid) {
                            if (type == 2) {
                                _this.$store.commit('setPStatus', '2');
                            } else if (type == 3) {
                                _this.$store.commit('setPStatus', '1');
                            }
                        }
                        _this.currentPage = 1;
                        _this.getList();
                        _this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'success'
                        });
                    } else {
                        _this.$message({
                            message: res.data.msg,
                            center: true,
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //地址切换
        addressChange(arr) {
            let province = CodeToText[arr[0]];
            let city = CodeToText[arr[1]];
            let area = CodeToText[arr[2]];
            this.searchForm.city = province + city + area;
        },
        //切换项目类型
        typeClick(index, val) {
            this.keyWord = '';
            this.activeProIndex = index;
            this.typeVal = val;
            this.currentPage = 1;
            this.getList();
        },
        searchClick() {
            this.currentPage = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        //获取项目详情
        getProjectInfo(id) {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectContent', {
                    id: id,
                    corp_id: _this.$store.state.cid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        let newRow = JSON.parse(
                            JSON.stringify(res.data.content)
                        );
                        _this.$parent.fatherViewDialog(newRow, 1);
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    _this.$message.error(error.data);
                    console.log(error);
                });
        },
        //编辑项目
        editProject(row) {
            this.getProjectInfo(row.id);
        },

        //项目列表
        getList() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectList', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin,
                    name: _this.searchForm.keyWord,
                    start: _this.searchForm.starttime,
                    stop: _this.searchForm.endtime,
                    current_page: _this.currentPage,
                    city: _this.searchForm.city,
                    type: _this.typeVal
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        //当前时间
                        let currentTime = new Date();
                        let nowTime = Date.parse(
                            _this.$utils.timeChange(currentTime, 2)
                        );
                        let day = 24 * 60 * 60 * 1000;
                        _this.tableData = res.data.content.list.map(function (
                            item
                        ) {
                            return Object.assign(item, {
                                waitTime: '',
                                totalTime: '',
                                percentage: '',
                                ptag: ''
                            });
                        });
                        //计算百分比
                        _this.tableData.map(function (val) {
                            let newStart = Date.parse(val.xmstart);
                            let newStop = Date.parse(val.xmstop);
                            val.totalTime = (newStop - newStart) / day;
                            //当前时间超过开工时间
                            if (nowTime > newStart && nowTime < newStop) {
                                val.waitTime = (nowTime - newStart) / day;
                                val.percentage =
                                    (val.waitTime / val.totalTime) * 100;
                                val.percentage = val.percentage.toFixed(1);
                                val.ptag = '项目进行中';
                            } else if (nowTime >= newStop) {
                                //当前时间大于结束时间
                                val.waitTime = (nowTime - newStart) / day;
                                val.percentage = 100;
                                val.ptag = '项目已结束';
                            } else if (nowTime < newStart) {
                                //当前时间小于开工时间
                                val.waitTime = 0;
                                val.percentage = 0;
                                val.ptag = '项目筹建';
                            } else {
                                //当前时间和开工时间一致
                                val.waitTime = 1;
                                val.percentage =
                                    (val.waitTime / val.totalTime) * 100;
                                val.percentage = val.percentage.toFixed(1);
                                val.ptag = '项目进行中';
                            }
                            return;
                        });
                        _this.total = res.data.content.total;
                        if (_this.total < 1 && _this.typeVal == '1') {
                            _this.$store.commit('setProjectName', '');
                            _this.$store.commit('setProjectId', '');
                            _this.$store.commit('setProjectPurl', '');
                            _this.$store.commit('setPerctentage', '');
                            _this.$store.commit('setPTag', '');
                            _this.$store.commit('setPStatus', '');
                            _this.$store.commit('setPLength', '');
                        }
                        if (
                            _this.total > 0 &&
                            res.data.content.list.length < 1
                        ) {
                            _this.currentPage = res.data.content.page;
                            _this.getList();
                        }
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getNewList() {
            const _this = this;
            _this.currentPage = 1;
            _this.getList();
        },
        addSingP() {
            const that = this;
            document.getElementById('addinput').blur();

            dd.ready(function () {
                dd.biz.contact.complexPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.cid, //企业的corpId
                    multiple: false, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxUsers: 1, //最大可选人数
                    pickedUsers: [], //已选用户
                    pickedDepartments: [], //已选部门
                    disabledUsers: [], //不可选用户
                    disabledDepartments: [], //不可选部门
                    requiredUsers: [], //必选用户（不可取消选中状态）
                    requiredDepartments: [], //必选部门（不可取消选中状态）
                    appId: that.agentid, //微应用的Id
                    permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
                    responseUserOnly: true, //返回人，或者返回人和部门
                    startWithDepartmentId: 0, //仅支持0和-1
                    onSuccess: function (result) {
                        that.addForm.pname = result.users[0].name;
                        that.addForm.userid = result.users[0].emplId;
                    },
                    onFail: function (err) {
                        console.log(err);
                    }
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
        },
        cancel() {
            this.addFormVisible = false;
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
        save(formName) {
            const _this = this;
            _this.loaded = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/project/add', _this.addForm)
                        .then((res) => {
                            if (res.data.code == 200) {
                                _this.loaded = false;
                                _this.addFormVisible = false;
                                _this.$refs[formName].resetFields();
                                _this.$message({
                                    message: '新建成功',
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
        }
    },
    mounted() {
        this.getPRole();
        this.$utils.checkding();
        this.getList();
    },
    computed: {
        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.searchForm.endtime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.starttime;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 8.64e7
                        );
                    }
                }
            };
        }
    },
    watch: {
        tableData: {
            handler(val, oldVal) {
                if (val.length > 0) {
                    if (!this.$store.state.projectInfo.pid) {
                        this.$store.commit(
                            'setProjectName',
                            this.tableData[0].pcontent
                        );
                        this.$store.commit(
                            'setProjectId',
                            this.tableData[0].id
                        );
                        this.$store.commit(
                            'setProjectPurl',
                            this.tableData[0].xmurl
                        );
                        this.$store.commit(
                            'setPerctentage',
                            this.tableData[0].percentage
                        );
                        this.$store.commit('setPTag', this.tableData[0].ptag);
                    }
                } else {
                    if (this.typeVal == '1') {
                        this.$store.commit('setProjectName', '');
                        this.$store.commit('setProjectId', '');
                        this.$store.commit('setProjectPurl', '');
                        this.$store.commit('setPerctentage', '');
                        this.$store.commit('setPTag', '');
                    }
                }
            },
            deep: true
        }
    }
};
</script>

<style lang="less">
#projectList {
    width: 16.4rem;
    .el-pagination {
        text-align: center;
        padding: 20px 0;
    }
    .addPBtn {
        width: 100%;
        text-align: center;
    }
    span {
        font-size: 0.14rem;
    }
    .table {
        width: 100%;
        border-color: #d5d5d5;
        border-collapse: collapse;
        border: 1;
    }
    > div {
        width: 96%;
        background-color: #fff;
        margin: 0.2rem auto;
    }
    .bg {
        padding: 0 0.1rem;
        .headerWarn {
            display: flex;
            padding-top: 0.2rem;
            padding-bottom: 0.3rem;
            div {
                color: #000;
                padding: 0 0.2rem 0.1rem 0.2rem;
                border-bottom: 0;
                cursor: pointer;
            }
            div:nth-child(1) {
                margin-right: 0.2rem;
            }
            .activeConClass {
                color: #3296fa;
                border-bottom: 1px solid #3296fa;
            }
        }
        .comeSearch {
            margin-bottom: 20px;
            .el-form {
                .searchInput {
                    width: 100%;
                    margin-bottom: 0.2rem;
                    .el-input {
                        width: 50%;
                    }
                }
                .searchBottom {
                    display: flex;
                    justify-content: space-between;
                    .searchLeft {
                        display: flex;
                    }
                }
            }
        }
        .middle {
            display: flex;
            line-height: 0.5rem;
            .middle-search {
                width: 3rem;
            }
            .middle-text {
                margin-left: 0.2rem;
            }
        }
        .bj {
            display: flex;
            justify-content: space-between;
            padding-top: 30px;
            width: 100%;
            font-size: 18px;
            > div {
                line-height: 40px;
            }
            .el-form-item {
                margin-left: 0.15rem;
                width: 100%;
            }
        }
        .el-table {
            margin-top: 0.2rem;
            .editBtn,
            .someBtn {
                font-size: 0.2rem;
                color: #409eef;
                margin: 0 0.08rem;
            }
            .someBtn {
                color: rgb(251, 129, 3);
            }
        }
    }
    .el-dialog {
        .el-form {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .el-form-item {
                width: 44%;
                .el-date-editor {
                    width: 100%;
                }
            }
        }

        .addManeger {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
        .showAllPeople {
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            padding-top: 12px;
        }
        .addMList {
            display: flex;
            .mdnList {
                text-align: center;
                position: relative;
                .mdren {
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 50%;
                    border: 1px solid #4090ef;
                    overflow: hidden;
                    margin: 0 auto;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .touxiang {
                        padding: 0;
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        background-color: #4099ef;
                        color: #fff;
                    }
                }
                p {
                    font-size: 12px;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 22px;
                }
                .el-icon-error {
                    position: absolute;
                    top: -6px;
                    right: 0;
                    font-size: 14px;
                }
            }
            .mdnPlus {
                line-height: 50px;
                padding: 0 4px;
                .el-icon-plus {
                    font-size: 10px;
                }
            }
        }
        .addMListLast {
            .mdnList .mdren {
                border: 1px dashed #4090ef;
                .touxiang {
                    background-color: #fff;
                    .el-icon-plus {
                        color: #4090ef;
                    }
                }
            }
        }
    }
    .kuai {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .kuai-one {
            width: 0.6rem;
        }
        .kuai-two {
            width: 0.9rem;
        }
    }
    .table {
        width: 16.4rem;
        border-color: #d5d5d5;
        border-collapse: collapse;
        border: 1;
        height: 7rem;
    }
}
</style>


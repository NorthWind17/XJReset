<template>
    <div id="diaryPrintList">
        <div class="main">
            <div class="content">
                <div>
                    <div class="dpcTopBtn">
                        <!-- <el-button type="primary" @click="printExcel"
                            >导出</el-button
                        > -->
                        <el-button type="primary" @click="openDo"
                            >新增日志打印</el-button
                        >
                    </div>
                    <el-table
                        :data="taskPrintList"
                        :header-cell-style="tableHeaderClass"
                        ref="multiplePTable"
                        style="width: 100%"
                    >
                        <el-table-column
                            prop="logname"
                            label="名称"
                            show-overflow-tooltip="true"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="proname"
                            label="项目"
                            show-overflow-tooltip="true"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="uname"
                            label="创建人"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="time"
                            label="创建时间"
                            align="center"
                        ></el-table-column>
                        <el-table-column
                            prop="logtypeid"
                            label="分类"
                            align="center"
                        ></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="downP(scope.row)"
                                    >打印</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="cPag">
                        <el-pagination
                            @current-change="handleCurrentChange2"
                            :current-page.sync="currentPage2"
                            :page-size="pagesize2"
                            layout="prev, pager, next, jumper"
                            :total="total2"
                        ></el-pagination>
                    </div>
                </div>
            </div>
            <el-dialog
                width="50%"
                title="日志打印"
                :visible.sync="proVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                @close="closePrintExport"
                class="dplpDiaClass"
            >
                <div>
                    <div class="dplTitle">
                        <div class="dplTop">
                            <div
                                v-for="(item, index) in tabList"
                                :key="index"
                                :class="
                                    index === activeConIndex
                                        ? 'activeConClass'
                                        : ''
                                "
                            >
                                <span>{{ item.id }}</span
                                >{{ item.name }}
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <div>
                            <div v-if="tabIndex == 1">
                                <div class="content1" style="padding: 0">
                                    <div
                                        class="dacontent"
                                        v-for="(
                                            typeChild, lindex
                                        ) in taskTypeGetList"
                                        :key="lindex"
                                        @click="newAddTask(typeChild)"
                                    >
                                        <div class="left">
                                            <img
                                                class="img"
                                                :src="typeChild.icon"
                                            />
                                            <span>{{ typeChild.tmpname }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="tabIndex == 2">
                                <div class="diaryMPic">
                                    <div>
                                        <img
                                            src="../../assets/task/diaryM.png"
                                            alt=""
                                        />
                                        <h2 class="dmpName">
                                            {{ diaryName }}
                                        </h2>
                                        <el-form
                                            :model="dpForm"
                                            :rules="dpRule"
                                            ref="dpFormRef"
                                            label-width="10px"
                                            class="dmpForm"
                                        >
                                            <el-form-item
                                                class="dmpjsc"
                                                prop="jscorp"
                                            >
                                                <el-input
                                                    v-model="dpForm.jscorp"
                                                ></el-input>
                                            </el-form-item>
                                            <el-form-item
                                                class="dmppro"
                                                prop="proname"
                                            >
                                                <el-input
                                                    v-model="dpForm.proname"
                                                ></el-input>
                                            </el-form-item>
                                            <el-form-item
                                                class="dmpsg"
                                                prop="sgcorp"
                                            >
                                                <el-input
                                                    v-model="dpForm.sgcorp"
                                                ></el-input>
                                            </el-form-item>
                                            <el-form-item
                                                class="dmgtime"
                                                prop="time"
                                            >
                                                <el-date-picker
                                                    v-model="dpForm.time"
                                                    type="date"
                                                    placeholder=""
                                                    format="yyyy 年 MM 月 dd 日"
                                                    value-format="yyyy-MM-dd"
                                                ></el-date-picker>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                            </div>
                            <div v-if="tabIndex == 3">
                                <div class="comeSearch">
                                    <el-form
                                        ref="searchFormRef"
                                        :model="searchForm"
                                        label-width="100px"
                                    >
                                        <div class="searchBottom">
                                            <div class="searchLeft">
                                                <el-form-item
                                                    class="searchTime"
                                                    label="开始时间："
                                                >
                                                    <el-date-picker
                                                        v-model="
                                                            searchForm.startTime
                                                        "
                                                        :picker-options="
                                                            pickerStart
                                                        "
                                                        type="date"
                                                        placeholder="选择日期"
                                                        format="yyyy 年 MM 月 dd 日"
                                                        value-format="yyyy-MM-dd"
                                                    ></el-date-picker>
                                                </el-form-item>
                                                <el-form-item
                                                    class="searchTime"
                                                    label="结束时间："
                                                >
                                                    <el-date-picker
                                                        v-model="
                                                            searchForm.endTime
                                                        "
                                                        :picker-options="
                                                            pickerEnd
                                                        "
                                                        type="date"
                                                        placeholder="选择日期"
                                                        format="yyyy 年 MM 月 dd 日"
                                                        value-format="yyyy-MM-dd"
                                                    ></el-date-picker>
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
                                    :data="taskList"
                                    :header-cell-style="tableHeaderClass"
                                    @row-click="editTask"
                                    ref="multipleTable"
                                    style="width: 100%"
                                    @selection-change="diaryChange"
                                >
                                    <el-table-column
                                        type="selection"
                                        width="55"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="proname"
                                        label="项目"
                                        show-overflow-tooltip="true"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="创建人"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="logspare1"
                                        label="日志时间"
                                        align="center"
                                    ></el-table-column>
                                    <el-table-column
                                        prop="logtype"
                                        label="分类"
                                        align="center"
                                    ></el-table-column>
                                </el-table>
                                <div class="cPag">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page.sync="currentPage"
                                        :page-size="pagesize"
                                        layout="prev, pager, next, jumper"
                                        :total="total"
                                    ></el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="backBtn">
                        <el-button
                            type="primary"
                            :loading="loading"
                            v-if="tabIndex == 2 && tabIndex != 1"
                            @click="nextPrint('dpFormRef')"
                            >下一步</el-button
                        >
                        <el-button
                            type="primary"
                            :loading="loading"
                            v-if="tabIndex == 3"
                            @click="exportDiary"
                            >打印</el-button
                        >
                        <el-button class="bback" @click="backStep('dpFormRef')"
                            >返回</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                width="30%"
                title="日志成册"
                :visible.sync="exportVisible"
                :append-to-body="true"
                @close="closeExport('exform')"
            >
                <div>
                    <el-form
                        :model="exportForm"
                        :rules="exportRule"
                        ref="exform"
                        label-width="130px"
                    >
                        <el-form-item label="日志名称：" prop="logname">
                            <el-input
                                v-model="exportForm.logname"
                                placeholder="请输入日志名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="工程名称：" prop="proname">
                            <el-input
                                v-model="exportForm.proname"
                                placeholder="请输入工程名称"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="责任人：" prop="personliable">
                            <el-input
                                v-model="exportForm.personliable"
                                placeholder="请输入责任人"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="编制人：" prop="preparedby">
                            <el-input
                                v-model="exportForm.preparedby"
                                placeholder="请输入编制人"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="时间：" prop="time">
                            <el-date-picker
                                v-model="exportForm.time"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div class="pickBtn" style="text-align: center">
                        <el-button
                            type="primary"
                            size="medium"
                            @click="exportClick('exform')"
                            >确定</el-button
                        >
                        <el-button size="medium" @click="closeExport('exform')"
                            >取消</el-button
                        >
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import citydata from '../../components/weatherCity.json';
import * as dd from 'dingtalk-jsapi';
import peoplePick from '../../components/complexPicker.vue';
export default {
    name: 'diaryPrintList',
    components: { peoplePick },
    data() {
        var validateNumber = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;

            if (!reg.test(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };
        return {
            proVisible: false,
            dpRule: {
                jscorp: [
                    {
                        required: true,
                        message: '建设单位不能为空',
                        trigger: 'blur'
                    }
                ],
                proname: [
                    {
                        required: true,
                        message: '工程名称不能为空',
                        trigger: 'blur'
                    }
                ],
                sgcorp: [
                    {
                        required: true,
                        message: '施工单位不能为空',
                        trigger: 'blur'
                    }
                ],
                time: [
                    {
                        required: true,
                        message: '施工日期不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            dpForm: {
                jscorp: '',
                proname: '',
                sgcorp: '',
                time: ''
            },
            taskTypeGetList: [],
            activeConIndex: 0,
            tabList: [
                { name: '选择打印日志类型', id: 1 },
                { name: '编辑日志封面', id: 2 },
                { name: '选择打印日志', id: 3 }
            ],
            searchForm: {
                startTime: '',
                endTime: '',
                type: ''
            },
            tabIndex: 1,
            exportRule: {
                logname: [
                    {
                        required: true,
                        message: '日志名称不能为空',
                        trigger: 'blur'
                    }
                ],
                proname: [
                    {
                        required: true,
                        message: '工程名称不能为空',
                        trigger: 'blur'
                    }
                ],
                personliable: [
                    {
                        required: true,
                        message: '责任人不能为空',
                        trigger: 'blur'
                    }
                ],
                preparedby: [
                    {
                        required: true,
                        message: '编制人不能为空',
                        trigger: 'blur'
                    }
                ],
                time: [
                    {
                        required: true,
                        message: '时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            pickerVisible: false,
            pickerNum: 9,
            exportForm: {
                logname: '',
                corp_id: this.$store.state.cid,
                projectname: this.$store.state.projectInfo.pname,
                logccid: '',
                userid: this.$store.state.userInfo.uid,
                logname: '',
                proname: '',
                personliable: '',
                preparedby: '',
                time: ''
            },
            exportVisible: false,
            deleteVisible: false,
            taskList: [],
            taskPrintList: [],
            drawerVisible: false,
            searchName: '',
            taskTypeList: [],
            total: '',
            pagesize: 10,
            currentPage: 1,
            total2: '',
            pagesize2: 10,
            currentPage2: 1,
            tagsData: [],
            tagsPeopleData: [],
            AllPeopleVisible: false,
            AllSendPeopleVisible: false,
            loading: false,

            peoplePickVisible: false,

            loading: false,
            deleteDId: '',
            multipleDiary: [],
            newID: '',
            selectTypeID: '',
            diaryName: '',
            setMouldID: '',
            wasSelectData: []
        };
    },
    methods: {
        editTask(row) {
            dd.ready(function () {
                dd.biz.util.openSlidePanel({
                    url: row.xmid, //打开侧边栏的url
                    title: '查看日志', //侧边栏顶部标题
                    onSuccess: function (result) {},
                    onFail: function () {}
                });
            });
        },
        //返回
        closePrintExport() {
            this.proVisible = false;
            this.dpForm = {
                jscorp: '',
                proname: '',
                sgcorp: '',
                time: ''
            };
            this.$nextTick(() => {
                this.$refs['dpFormRef'].clearValidate();
            });
        },
        backStep(formName) {
            if (this.tabIndex == 1) {
                this.proVisible = false;
            } else if (this.tabIndex == 2) {
                this.tabIndex = 1;
                this.activeConIndex = 0;
                this.dpForm = {
                    jscorp: '',
                    proname: '',
                    sgcorp: '',
                    time: ''
                };
                this.$nextTick(() => {
                    this.$refs['dpFormRef'].clearValidate();
                });
            } else if (this.tabIndex == 3) {
                this.tabIndex = 2;
                this.activeConIndex = 1;
                this.dpForm = JSON.parse(JSON.stringify(this.dpForm));
            }
        },
        //----下一步
        nextPrint(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/recordlogcover', {
                            userid: _this.$store.state.userInfo.uid,
                            corp_id: _this.$store.state.cid,
                            xmid: _this.$store.state.projectInfo.pid,
                            proname: _this.dpForm.proname,
                            logtype: _this.diaryName,
                            builddw: _this.dpForm.jscorp,
                            constructiondw: _this.dpForm.sgcorp,
                            constructiondate: _this.dpForm.time
                        })
                        .then((res) => {
                            if (res.data.code == '200') {
                                _this.getTaskList();
                                _this.loading = false;
                                _this.setMouldID = res.data.id;
                                _this.tabIndex = 3;
                                _this.activeConIndex = 2;
                            } else {
                                _this.loading = false;
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error',
                                    duration: '2000'
                                });
                            }
                        })
                        .catch(function (error) {
                            _this.loading = false;
                            _this.$message({
                                message: error.data,
                                type: 'error',
                                duration: '2000'
                            });
                            console.log(error);
                        });
                } else {
                    _this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        printExcel() {},
        openDo() {
            if (this.$store.state.projectInfo.pid) {
                this.activeConIndex = 0;
                this.tabIndex = 1;
                this.getLogList();
                this.proVisible = true;
            } else {
                dd.ready(function () {
                    dd.device.notification.alert({
                        message: '无项目，请您先创建项目才能进行其他操作！',
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
        },
        newAddTask(item) {
            this.selectTypeID = item.tmpname;
            this.tabIndex = 2;
            this.activeConIndex = 1;

            this.diaryName = item.tmpname;
        },
        typeClick(item, index) {
            this.tabIndex = item.id;
            this.activeConIndex = index;
        },
        tableHeaderClass({ row, rowIndex }) {
            return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;';
        },
        diaryPrintChange(val) {
            this.multiplePDiary = val;
        },
        diaryChange(val) {
            this.multipleDiary = val;
        },
        exportDiary() {
            const _this = this;
            //已选中或选中的值
            if (
                _this.wasSelectData.length > 0 ||
                _this.multipleDiary.length > 0
            ) {
                let newLogid = [],
                    sendMul = [];
                //如果当前页有选中值
                if (_this.multipleDiary.length > 0) {
                    newLogid = _this.multipleDiary.map((item) => {
                        if (!item.id) return '';
                        return item.id;
                    });
                    //如果有其他也选中值
                    if (_this.wasSelectData.length > 0) {
                        sendMul = _this.wasSelectData.concat(newLogid);
                    } else {
                        sendMul = newLogid;
                    }
                } else {
                    let newMult = _this.taskList.map((item) => {
                        if (!item.id) return '';
                        return item.id;
                    });
                    sendMul = _this.wasSelectData.filter((items) => {
                        if (!newMult.includes(items)) return items;
                    });
                }
                dd.ready(function () {
                    dd.runtime.permission.requestAuthCode({
                        corpId: _this.$store.state.cid,
                        onSuccess: function (result) {
                            _this.$axios
                                .post('/task/logupword', {
                                    corp_id: _this.$store.state.cid,
                                    projectname:
                                        _this.$store.state.projectInfo.pname,
                                    userid: _this.$store.state.userInfo.uid,
                                    logid: sendMul,
                                    coverid: _this.setMouldID,
                                    code: result.code
                                })
                                .then((res) => {
                                    if (res.data.code == '200') {
                                        _this.getList();
                                        _this.$message.success('日志打印成功');
                                        _this.proVisible = false;
                                        _this.wasSelectData = [];
                                        _this.$refs.multipleTable.clearSelection();
                                    } else {
                                        _this.$message.warning(res.data.msg);
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        },
                        onFail: function (err) {}
                    });
                });
            } else {
                this.$message.warning('请您先选择');
            }
        },
        downP(row) {
            const _this = this;
            _this.$axios
                .post('/dingyun/DingPanSaveFile', {
                    corp_id: _this.$store.state.cid,
                    type: 'download',
                    fileids: row.media_id,
                    userid: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        dd.ready(function () {
                            dd.biz.cspace.preview({
                                corpId: _this.$store.state.cid,
                                spaceId: row.spaceid,
                                fileId: row.media_id,
                                fileName: row.logname,
                                fileSize: row.size,
                                fileType: row.filetype,
                                onSuccess: function () {},
                                onFail: function (err) {}
                            });
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //成册
        exportClick(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/logupword', this.exportForm)
                        .then((res) => {
                            if (res.data.code == 200) {
                                dd.ready(function () {
                                    dd.biz.util.openLink({
                                        url: res.data.path, //要打开链接的地址
                                        onSuccess: function (result) {
                                            _this.$message.success(
                                                '日志打印成功'
                                            );
                                            _this.exportVisible = false;
                                            // _this.$refs.multipleTable.clearSelection();
                                        },
                                        onFail: function (err) {
                                            console.log(err);
                                        }
                                    });
                                });
                            } else {
                                _this.$message.warning(res.data.msg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    _this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeExport() {
            this.exportVisible = false;
            this.exportForm = {
                logname: '',
                corp_id: this.$store.state.cid,
                projectname: this.$store.state.projectInfo.pname,
                logccid: '',
                userid: this.$store.state.userInfo.uid,
                logname: '',
                proname: '',
                personliable: '',
                preparedby: '',
                time: ''
            };
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTaskList();
        },
        handleCurrentChange2(val) {
            this.currentPage2 = val;
            this.getList();
        },
        getLogList() {
            const _this = this;
            _this.$axios
                .post('/task/loglisttype')
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.taskTypeGetList = res.data.tmpname;
                    } else if (res.data.code == 400) {
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
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取列表
        getList() {
            const _this = this;
            _this.$axios
                .post('/task/logwordlist', {
                    corp_id: _this.$store.state.cid,
                    proname: _this.$store.state.projectInfo.pname,
                    current_page: _this.currentPage2,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.taskPrintList = res.data.content.list;
                        _this.total2 = res.data.content.total;
                    } else if (res.data.code == '400') {
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
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //搜索
        searchClick() {
            this.currentPage = 1;
            this.getTaskList();
        },
        //获取日志列表
        getTaskList() {
            const _this = this;
            let newWas = [],
                newLogid = [],
                newMult = [];
            if (_this.multipleDiary) {
                newMult = _this.multipleDiary.map((item) => {
                    if (!item.id) return '';
                    return item.id;
                });
            }
            newWas = _this.wasSelectData.concat(newMult);
            _this.$axios
                .post('/task/listlog', {
                    corp_id: _this.$store.state.cid,
                    starttime: _this.searchForm.startTime,
                    stoptime: _this.searchForm.endTime,
                    proname: _this.$store.state.projectInfo.pname,
                    userid: _this.$store.state.userInfo.uid,
                    current_page: _this.currentPage,
                    datecontrast: newWas,
                    logtype: _this.diaryName,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        let newSelect = [];
                        _this.taskList = res.data.content.list;
                        _this.total = res.data.content.total;
                        _this.wasSelectData = res.data.datecontrast1;
                        if (_this.total > 0 && _this.taskList.length < 1) {
                            _this.currentPage = res.data.content.page;
                            _this.getTaskList();
                        }
                        if (_this.taskList.length > 0) {
                            _this.$nextTick(() => {
                                _this.taskList.forEach((row) => {
                                    if (row.checket == true) {
                                        _this.$refs.multipleTable.toggleRowSelection(
                                            row,
                                            true
                                        );
                                    }
                                });
                            });
                        }
                    } else if (res.data.code == 400) {
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
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
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
    },
    created() {
        this.$utils.checkding();
        this.getTaskList();
        this.getList();
    },
    computed: {
        projectData() {
            return this.$store.state.projectInfo;
        },
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.searchForm.endTime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.startTime;
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
        projectData: {
            handler(newVal, oldVal) {
                //你需要执行的代码
                if (oldVal) {
                    this.getTaskList();
                    this.getList();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
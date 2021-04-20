<template>
    <div id="diaryAdd">
        <div class="main">
            <div class="content">
                <div class="border">
                    <!-- <el-collapse v-model="activeNames">
                        <el-collapse-item
                            v-for="(item, index) in taskList"
                            :key="index"
                            :name="index"
                        >
                            <template slot="title">
                                {{ item.type.typename }}
                            </template> -->
                    <div class="content1">
                        <div
                            class="dacontent"
                            v-for="(typeChild, lindex) in typeList"
                            :key="lindex"
                            @click="newAddTask(typeChild)"
                        >
                            <div class="left">
                                <img class="img" :src="typeChild.icon" />
                                <span>{{ typeChild.tmpname }}</span>
                            </div>
                            <div class="bottom">
                                <div v-if="typeChild.date">
                                    <div>{{ typeChild.date }}</div>
                                    <div>：{{ typeChild.datetext }}</div>
                                </div>
                                <div v-if="typeChild.text1">
                                    <div>{{ typeChild.text1 }}</div>
                                    <div>：{{ typeChild.text2 }}</div>
                                </div>
                                <div v-if="typeChild.text3">
                                    <div>{{ typeChild.text3 }}</div>
                                    <div>：{{ typeChild.text4 }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- </el-collapse-item>
                    </el-collapse> -->
                </div>
            </div>
            <!-- <el-drawer
                :title="newAddTitle"
                :visible.sync="drawerVisible"
                direction="rtl"
                @close="drawClose('cComeform')"
                ref="contractDrawer"
            >
                <div class="cDrawerContent">
                    <el-form
                        :model="contractDrawerForm"
                        :rules="taskRule"
                        ref="cComeform"
                        label-width="130px"
                    >
                        <div class="feiwuweather">
                            <div class="weat">
                                <div class="weatname">天气</div>
                                <div class="weatRight">
                                    <div>
                                        <el-input
                                            v-model="
                                                contractDrawerForm.weather.a
                                            "
                                            maxlength="10"
                                            placeholder="上午"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <el-input
                                            v-model="
                                                contractDrawerForm.weather.b
                                            "
                                            maxlength="10"
                                            placeholder="下午"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="weat">
                                <div class="weatname">温度（℃）</div>
                                <div class="weatRight">
                                    <div>
                                        <el-input
                                            v-model="contractDrawerForm.wendu.a"
                                            maxlength="2"
                                            placeholder="上午"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <el-input
                                            v-model="contractDrawerForm.wendu.b"
                                            maxlength="2"
                                            placeholder="下午"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="weat">
                                <div class="weatname">风力（级）</div>
                                <div class="weatRight">
                                    <div>
                                        <el-input
                                            v-model="contractDrawerForm.wind.a"
                                            maxlength="2"
                                            placeholder="上午"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <el-input
                                            v-model="contractDrawerForm.wind.b"
                                            maxlength="2"
                                            placeholder="下午"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <el-form-item label="日期" prop="logspae1">
                            <el-date-picker
                                v-model="contractDrawerForm.logspae1"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <div v-for="(item, index) in newTaskDemoList">
                            <div v-if="item.type == 'oneline'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请输入',
                                                      trigger: 'blur'
                                                  }
                                              ]
                                            : [{ required: false }]
                                    "
                                >
                                    <el-input
                                        placeholder="请输入"
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        maxlength="50"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="item.type == 'numbertext'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请输入',
                                                      trigger: 'blur'
                                                  },
                                                  {
                                                      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                                                      message:
                                                          '请输入数字,可保留两位小数'
                                                  }
                                              ]
                                            : [
                                                  { required: false },
                                                  {
                                                      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                                                      message:
                                                          '请输入数字,可保留两位小数'
                                                  }
                                              ]
                                    "
                                >
                                    <el-input
                                        placeholder="请输入"
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        maxlength="50"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="item.type == 'moreline'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请输入',
                                                      trigger: 'blur'
                                                  }
                                              ]
                                            : [{ required: false }]
                                    "
                                >
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入"
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        maxlength="500"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="item.type == 'downselect'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请选择',
                                                      trigger: [
                                                          'blur',
                                                          'change'
                                                      ]
                                                  }
                                              ]
                                            : [{ required: false }]
                                    "
                                >
                                    <el-select
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="(list,
                                            lindex) in item.select"
                                            :key="lindex"
                                            :label="list.selectname"
                                            :value="list.selectname"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-else-if="item.type == 'datetime'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请选择日期',
                                                      trigger: [
                                                          'blur',
                                                          'change'
                                                      ]
                                                  }
                                              ]
                                            : [{ required: false }]
                                    "
                                >
                                    <el-date-picker
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                        </div>

                        <div class="uploadFiles">
                            <div class="uTopTitlt">
                                <div class="left">附件</div>
                                <div>
                                    <span class="word" @click="addFiles()"
                                        >添加附件</span
                                    >
                                </div>
                            </div>
                            <div class="dingFilesClass">
                                <div
                                    v-for="(item,
                                    index) in contractDrawerForm.enclosure"
                                    :key="index"
                                >
                                    <div>
                                        <div class="fileIcon">
                                            <i class="el-icon-document"></i>
                                        </div>
                                        <div class="filesTitle">
                                            <div>{{ item.fileName }}</div>
                                            <p>
                                                {{
                                                    (
                                                        item.fileSize / 1000
                                                    ).toFixed(2)
                                                }}kb
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            class="watchBtn"
                                            @click="watchFiles(item)"
                                        >
                                            预览
                                        </div>
                                        <div class="fileIcon2">
                                            <i
                                                class="el-icon-error"
                                                @click="deleteFiles(index)"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="shenpi">
                            <div>审批流程</div>
                            <div class="line">
                                <div class="spList">
                                    <div>
                                        <div>可见人</div>
                                        <p>请选择可见人</p>
                                    </div>
                                    <div class="addManeger">
                                        <div
                                            class="addMList"
                                            v-if="tagsPeopleData.length > 3"
                                        >
                                            <div class="mdnList">
                                                <div
                                                    class="mdren"
                                                    @click="openSendPeople"
                                                >
                                                    <span class="touxiang">
                                                        <i
                                                            class="el-icon-s-custom"
                                                        ></i>
                                                    </span>
                                                </div>
                                                <p>查看全部</p>
                                            </div>
                                            <div class="mdnPlus">
                                                <i class="el-icon-plus"></i>
                                            </div>
                                        </div>
                                        <div
                                            class="addMList"
                                            v-for="(item,
                                            index) in tagsPeopleData.slice(
                                                0,
                                                3
                                            )"
                                            :key="index"
                                        >
                                            <div class="mdnList">
                                                <div class="mdren">
                                                    <img
                                                        v-if="item.avatar"
                                                        :src="item.avatar"
                                                        alt
                                                    />
                                                    <span
                                                        class="touxiang"
                                                        v-else
                                                        >{{
                                                            item.name.length <=
                                                            2
                                                                ? item.name
                                                                : item.name.substr(
                                                                      item.name
                                                                          .length -
                                                                          2,
                                                                      2
                                                                  )
                                                        }}</span
                                                    >
                                                </div>
                                                <p>{{ item.name }}</p>
                                                <i
                                                    class="el-icon-error"
                                                    @click="
                                                        handleSendClose(
                                                            item,
                                                            index
                                                        )
                                                    "
                                                ></i>
                                            </div>
                                            <div class="mdnPlus">
                                                <i class="el-icon-plus"></i>
                                            </div>
                                        </div>
                                        <div class="addMList addMListLast">
                                            <div class="mdnList">
                                                <div
                                                    class="mdren"
                                                    @click="addManyP(2)"
                                                >
                                                    <span class="touxiang">
                                                        <i
                                                            class="el-icon-plus"
                                                        ></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="shenpiThree">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div class="demo-drawer__footer">
                            <el-button
                                type="primary"
                                @click="closeDrawer('cComeform')"
                                :loading="loading"
                                >{{
                                    loading ? '提交中 ...' : '提 交'
                                }}</el-button
                            >
                            <el-button @click="drawClose('cComeform')"
                                >取 消</el-button
                            >
                        </div>
                    </el-form>
                </div>
            </el-drawer> -->
            <!-- <el-dialog
                title="全部可见人员"
                :append-to-body="true"
                :visible.sync="AllSendPeopleVisible"
                class="contractOpenPeopleDialog"
                :close-on-click-modal="false"
            >
                <div style="margin-bottom: 10px">
                    共有{{ tagsPeopleData.length }}人
                </div>
                <div class="showAllPeople">
                    <div
                        class="addMList"
                        v-for="(item, index) in tagsPeopleData"
                        :key="index"
                    >
                        <div class="mdnList">
                            <div class="mdren">
                                <img
                                    v-if="item.avatar"
                                    :src="item.avatar"
                                    alt
                                />
                                <span class="touxiang" v-else>{{
                                    item.name.length <= 2
                                        ? item.name
                                        : item.name.substr(
                                              item.name.length - 2,
                                              2
                                          )
                                }}</span>
                            </div>
                            <p>{{ item.name }}</p>
                            <i
                                class="el-icon-error"
                                @click="handleSendClose(item)"
                            ></i>
                        </div>
                        <div class="mdnPlus">
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
                    <div class="addMList addMListLast">
                        <div class="mdnList">
                            <div class="mdren" @click="addManyP(2)">
                                <span class="touxiang">
                                    <i class="el-icon-plus"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog> -->
            <el-dialog
                title="选择项目发起审批"
                :visible.sync="appVisible"
                @close="approvalCancel('selectEditForm')"
                width="600px"
            >
                <el-form
                    :model="selectAddForm"
                    label-width="130px"
                    :rules="selectAddFormRules"
                    ref="selectEditForm"
                    label-position="right"
                >
                    <div>
                        <el-form-item
                            label="项目名称："
                            class="projectTypeSelect"
                        >
                            <el-input
                                v-model="selectAddForm.name"
                                :disabled="true"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="子项目名称："
                            prop="zid"
                            class="projectTypeSelect"
                        >
                            <el-select
                                style="width: 100%"
                                v-model="selectAddForm.zid"
                                filterable
                                clearable
                                placeholder="请选择子项目"
                            >
                                <el-option
                                    v-for="item in noNextProject"
                                    :label="item.zname"
                                    :value="item.zid"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button
                            type="primary"
                            :loading="loaded"
                            @click="approvalSave('selectEditForm')"
                            >发起审批</el-button
                        >
                        <el-button @click="approvalCancel('selectEditForm')"
                            >取消</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="deleteVisible" width="500px">
                <span>确认删除？一旦删除数据无法找回</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button
                        type="primary"
                        :loading="loading"
                        @click="deleteClick"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import citydata from '../../components/weatherCity.json';
import * as dd from 'dingtalk-jsapi';
import supload from '../../components/dingUpload';
import cupload from '../../components/corpUpload';
import peoplePick from '../../components/complexPicker.vue';
export default {
    name: 'diaryOrder',
    components: { supload, cupload, peoplePick },
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
            peopleIsShow: true,
            deleteVisible: false,
            pickerVisible: false,
            pickerNum: 9,
            taskRule: {
                logspae1: [
                    {
                        required: true,
                        message: '请选择日期',
                        trigger: ['blur', 'change']
                    }
                ]
                // weaid: [
                //     {
                //         required: true,
                //         message: '地址不能为空，请选择',
                //         trigger: ['blur', 'change']
                //     }
                // ]
            },
            newAddTitle: '',
            addTypeForm: { name: '' },
            activeNames: [],
            newView: false,
            newName: '',
            addForm: {
                name: '',
                type: '',
                typeName: '',
                url:
                    'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnZXQ26B841600655714494.png'
            },
            disabled: false,
            taskList: [],
            scheduleNumber: this.$store.state.projectInfo.pperctentage,
            schedule: this.$store.state.projectInfo.ptag,
            taskPName: '',
            total: '', //默认数据总数
            pagesize: 5, //每页的数据条数
            currentPage: 1, //默认开始页面
            cwList: [],
            pHurl: require('@/assets/checklist/sgdw.png'),

            drawerVisible: false,
            activeConIndex: 0,
            contractForm: {
                keyWord: '',
                starttime: '',
                endtime: ''
            },
            projectList: [],
            AllPeopleVisible: false,
            AllSendPeopleVisible: false,
            loading: false,
            agentid: '',
            dingPicList: [],
            upImgList: [],
            licenceImg: [],
            isShow: ['1'],
            typeId: '1', //切换类型
            viewCorpPicture: this.$store.state.projectInfo.purl,
            newTaskView: false,
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
            taskTypeList: [],
            mouldType: 1,
            mouldDemoId: '',
            newTaskDemoList: [],
            taskMouldID: '',
            cityOptions: [],
            newID: '',
            newTID: '',
            typeList: [],
            appVisible: false,
            noNextProject: [],
            selectAddForm: {
                zid: '',
                name: this.$store.state.projectInfo.pname
            },
            nextProject: []
        };
    },
    methods: {
        getNextProject() {
            const _this = this;

            _this.$axios
                .post('/task/ZiProjectXiaLa', {
                    xmid: _this.$store.state.projectInfo.pid,
                    type: 1
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.noNextProject = res.data.content;
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        approvalCancel(formName) {
            this.appVisible = false;
            this.loaded = false;
            // this.$refs[formName].resetFields();
        },
        //新建基础按钮
        approvalSave(formName) {
            const _this = this;
            _this.loaded = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/logapproval', {
                            corp_id: _this.$store.state.cid,
                            xmid: _this.$store.state.projectInfo.pid,
                            tmpname: _this.checkNmae,
                            zxmid: _this.selectAddForm.zid,
                            userid: _this.$store.state.userInfo.uid,
                            admin: _this.$store.state.userInfo.admin
                        })
                        .then((res) => {
                            let newUrl =
                                'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=' +
                                this.$store.state.cid +
                                '#/custom/?processCode=' +
                                res.data.process_code;
                            dd.ready(function () {
                                dd.biz.util.openSlidePanel({
                                    url: newUrl, //打开侧边栏的url
                                    title: '发起日志', //侧边栏顶部标题
                                    onSuccess: function (result) {},
                                    onFail: function () {}
                                });
                            });
                            _this.appVisible = false;
                            _this.loaded = false;
                            // _this.$refs[formName].resetFields();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    _this.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        newAddTask(item) {
            const _this = this;
            _this.checkNmae = item.tmpname;
            _this.selectAddForm.name = _this.$store.state.projectInfo.pname;
            if (_this.$store.state.projectInfo.pid) {
                if (_this.noNextProject.length > 0) {
                    _this.appVisible = true;
                } else {
                    _this.$axios
                        .post('/task/logapproval', {
                            corp_id: _this.$store.state.cid,
                            xmid: _this.$store.state.projectInfo.pid,
                            tmpname: item.tmpname,
                            zxmid: '',
                            userid: _this.$store.state.userInfo.uid,
                            admin: _this.$store.state.userInfo.admin
                        })
                        .then((res) => {
                            let newUrl =
                                'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=' +
                                this.$store.state.cid +
                                '#/custom/?processCode=' +
                                res.data.process_code;
                            dd.ready(function () {
                                dd.biz.util.openSlidePanel({
                                    url: newUrl, //打开侧边栏的url
                                    title: '发起日志', //侧边栏顶部标题
                                    onSuccess: function (result) {},
                                    onFail: function () {}
                                });
                            });
                            _this.appVisible = false;
                            _this.loaded = false;
                            // _this.$refs[formName].resetFields();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            } else {
                dd.ready(function () {
                    dd.device.notification.alert({
                        message: '无项目，请您先创建项目才能进行其他操作！',
                        title: '提示', //可传空
                        buttonName: '收到',
                        onSuccess: function () {},
                        onFail: function (err) {}
                    });
                });
            }
        },
        drawClose(formName) {
            this.drawerVisible = false;
            this.contractDrawerForm.logname = '';
            this.contractDrawerForm.logspae1 = '';
            this.contractDrawerForm.logspare7 = [];
            // this.contractDrawerForm.weaid = [];
            this.tagsPeopleData = [];
        },
        closeTaskMould() {
            this.newTaskView = false;
        },
        //获取列表
        getList() {
            const _this = this;
            _this.$axios
                .post('/task/loglisttype')
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.typeList = res.data.tmpname;
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
        this.$utils.checkding();
        this.getPRole();
    },
    created() {
        this.getNextProject();
        this.getList();
    },
    computed: {
        projectData() {
            return this.$store.state.projectInfo;
        },
        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.contractDrawerForm.stoptime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.contractDrawerForm.starttime;
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
                    this.getList();
                    this.getNextProject();
                }
            },
            deep: true
        }
    }
};
</script>
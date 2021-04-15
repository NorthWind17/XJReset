<template>
    <div class="workbench-title">
        <div class="workbench-img">
            <img src="../assets/menu/logo.png" alt />
        </div>
        <div class="switch">
            <div class="switch-box">
                <span>项目名称：</span>
                <span>{{ nameS }}</span>
            </div>
            <div class="switch-button">
                <span style="color: #fff; cursor: pointer" @click="switchover">
                    <i class="el-icon-arrow-down"></i>
                </span>
            </div>
        </div>
        <div class="workbench-center">
            <ul>
                <li :class="cNameOneS" @click="buttonTop('/workbench')">
                    首页
                </li>
                <li
                    :class="cNameTwoS"
                    @click="buttonTop('/project/projectPanel')"
                >
                    <span>项目</span>
                    <div class="proTips" v-if="warnTipView">
                        请点击此处进入项目页面
                        <i class="el-icon-caret-top"></i>
                    </div>
                </li>
                <li :class="cNameFourS" @click="buttonTop('/task/taskMould')">
                    任务
                </li>
                <li
                    :class="cNameThreeS"
                    @click="buttonTop('/files/filesCurrent')"
                >
                    资料
                </li>
                <li :class="cNameTS" @click="buttonTop('/diary/diaryAdd')">
                    日志
                </li>
            </ul>
        </div>
        <div class="relation-box">
            <ul>
                <!-- <li>版本：Dev</li> -->
                <li>
                    <img
                        style="cursor: pointer"
                        @click="takeMoney"
                        src="../assets/menu/zsss.png"
                        alt
                    />
                </li>
                <li>
                    <el-popover placement="bottom" width="290" trigger="hover">
                        <div slot="reference">
                            <img
                                style="cursor: pointer"
                                src="../assets/menu/kefu.jpg"
                                alt
                            />
                        </div>
                        <div class="down" style="text-align: center">
                            <img
                                style="width: 2.2rem; height: 2.2rem"
                                src="../assets/workbench/erweima.jpg"
                                alt
                            />
                            <div style="margin: 0.06rem 0" @click="goMobil">
                                手机钉钉扫描二维码加入“用户服务群”
                            </div>
                            <div>联系电话：0371-56775558</div>
                        </div>
                    </el-popover>
                </li>
                <li>
                    <el-popover placement="bottom" width="150" trigger="hover">
                        <div slot="reference">
                            <img
                                style="cursor: pointer"
                                src="../assets/menu/bangzhu.jpg"
                                alt
                            />
                        </div>
                        <div class="down" style="text-align: center">
                            <p
                                style="margin-bottom: 0.12rem; cursor: pointer"
                                @click="goHelp"
                            >
                                帮助文档
                            </p>
                            <p style="cursor: pointer" @click="backMsg">
                                意见反馈
                            </p>
                        </div>
                    </el-popover>
                </li>
                <li>
                    <img
                        style="cursor: pointer"
                        @click="buttonTop('/application/applicationPower')"
                        src="../assets/menu/shezhi.jpg"
                        alt
                    />
                </li>
            </ul>
        </div>
        <div class="admin">
            <img src="../assets/menu/YH.png" v-if="ImageShow" />
            <img :src="Image" v-else />
            <el-popover placement="bottom" width="290" trigger="hover">
                <div slot="reference">
                    {{ uname }}
                </div>
                <div class="down">
                    <!-- <div class="topPhone">
                        <div style="line-height: 0.4rem; width: 0.74rem">
                            手机号:
                        </div>
                        <el-input
                            :class="inputPhone ? 'actiInput' : 'noneInput'"
                            v-model="inputPhone"
                            readonly
                            id="addinput"
                            placeholder="请输入手机号"
                            @focus="addPhone"
                        ></el-input>
                    </div> -->
                    <div style="margin: 0.06rem 0; line-height: 0.4rem">
                        用户ID：{{ uuid }}
                    </div>
                    <div>公司ID：{{ ucid }}</div>
                </div>
            </el-popover>
        </div>
        <el-dialog title="切换项目" :visible.sync="dialogFormVisible">
            <div>
                <div class="headerWarn">
                    <div
                        v-for="(item, index) in projectTypeList"
                        :key="index"
                        :class="
                            index === activeMenuIndex ? 'activeConClass' : ''
                        "
                        @click="typeClick(index, item.id)"
                    >
                        {{ item.name }}
                    </div>
                </div>
                <div class="content">
                    <div v-if="projectList.length > 0">
                        <div class="panelContent">
                            <div class="panelList">
                                <div
                                    class="progress"
                                    v-for="(item, index) in projectList"
                                    :key="index"
                                    @click="
                                        changeProject(item, item.percentage)
                                    "
                                >
                                    <img
                                        class="biao"
                                        src="../assets/workbench/chj.png"
                                        v-if="item.beian == '筹建'"
                                    />
                                    <img
                                        class="biao"
                                        src="../assets/workbench/zaij.png"
                                        v-else-if="item.beian == '在建'"
                                    />
                                    <img
                                        class="biao"
                                        src="../assets/workbench/tingj.png"
                                        v-else-if="item.beian == '停工'"
                                    />
                                    <img
                                        class="biao"
                                        src="../assets/workbench/junj.png"
                                        v-else-if="item.beian == '竣工'"
                                    />
                                    <img
                                        class="biao"
                                        src="../assets/workbench/zhongj.png"
                                        v-else="item.beian == '中止'"
                                    />
                                    <div class="project-title">
                                        {{ item.pcontent }}
                                    </div>
                                    <div class="circle">
                                        <div
                                            style="
                                                color: gray;
                                                margin-right: 0.2rem;
                                            "
                                        >
                                            <div style="margin-bottom: 0.2rem">
                                                负责人：{{ item.puseridname }}
                                            </div>
                                            <div>
                                                总工期：{{ item.zongday }}天
                                            </div>
                                        </div>
                                        <div>
                                            <el-progress
                                                type="circle"
                                                :percentage="item.jindu"
                                            ></el-progress>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="text-align: center">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage"
                                :page-size="pagesize"
                                layout="prev, pager, next, jumper"
                                :total="pageTotal"
                            ></el-pagination>
                        </div>
                    </div>
                    <div class="projectItem-buttonS" v-else>
                        <div class="projectItem-No">
                            <img
                                src="../assets/menu/NoData.png"
                                alt
                                class="buttonimg"
                            />
                            <p class="buttonP">暂无数据</p>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            title="意见反馈"
            :visible.sync="backFormVisible"
            @close="backMsgCancel"
            class="sendBackDialog"
        >
            <el-form
                :model="backForm"
                label-width="120px"
                ref="backFormRef"
                :rules="backFormRules"
            >
                <el-form-item
                    label="反馈建议："
                    prop="feedback"
                    class="feedBackClass"
                >
                    <el-input
                        type="textarea"
                        placeholder="请输入反馈建议"
                        v-model="backForm.feedback"
                        maxlength="200"
                        show-word-limit
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="tel">
                    <el-input
                        v-model="backForm.tel"
                        placeholder="请输入手机号"
                        maxlength="11"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="backMsgClick('backFormRef')"
                    >确 定</el-button
                >
                <el-button @click="backMsgCancel">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="添加个人手机号"
            :visible.sync="sendFormVisible"
            @close="sendMsgCancel"
            class="sendBackDialog"
        >
            <el-form
                :model="sendForm"
                label-width="120px"
                ref="sendFormRef"
                :rules="sendFormRules"
            >
                <el-form-item label="手机号：" prop="phone">
                    <el-input
                        v-model="sendForm.phone"
                        placeholder="请输入手机号"
                        maxlength="11"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button type="primary" @click="sendMsgClick('sendFormRef')"
                    >确 定</el-button
                >
                <el-button @click="sendMsgCancel">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="createVisible" class="carouselDialog">
            <el-carousel
                trigger="click"
                height="336px"
                :autoplay="false"
                arrow="always"
            >
                <el-carousel-item
                    v-for="(item, index) in helplist"
                    :key="index"
                >
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="item"
                    ></el-image>
                </el-carousel-item>
            </el-carousel>
            <div style="text-align: center">
                <el-button type="primary" @click="goCreate"
                    >去创建项目</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    data() {
        let validatepphone = (rule, value, callback) => {
            const reg = /^1\d{10}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };
        return {
            cuPath: 1,
            helplist: [
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/SGbt4876nh1600333241216.png',
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/Gi5TsJcQMX1600333612174.png',
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/barpk8ENZc1600333806862.png'
            ],
            sendForm: {
                phone: '',
                userid: this.$store.state.userInfo.uid,
                corp_id: this.$store.state.cid
            },
            inputPhone: '',
            sendFormVisible: false,
            warnTipView: false,
            createVisible: false,
            sendFormRules: {
                phone: [
                    {
                        required: true,
                        validator: validatepphone,
                        trigger: 'blur'
                    }
                ]
            },
            backFormRules: {
                feedback: [
                    {
                        required: true,
                        message: '反馈建议不能为空',
                        trigger: 'blur'
                    }
                ],
                tel: [
                    {
                        required: true,
                        validator: validatepphone,
                        trigger: 'blur'
                    }
                ]
            },
            projectTypeList: [
                { name: '我的项目', id: '1' },
                { name: '归档项目', id: '2' }
            ],
            backFormVisible: false,
            activeMenuIndex: 0,
            Image: '',
            uname: '',
            uuid: this.$store.state.userInfo.uid,
            ucid: this.$store.state.cid,
            isadmin: '',
            cNameOne: 'colorName',
            cNameTwo: '',
            show: false,
            nameS: this.$store.state.projectInfo.pname || '暂无数据',
            url: '/workbench',
            typeVal: '1',
            dialogFormVisible: false,
            projectList: [],
            pageTotal: '',
            pagesize: 10,
            currentPage: 1,
            backForm: {
                feedback: '',
                tel: ''
            },
            lfirst: 0,
            lrourl: '',
            upower: []
        };
    },
    computed: {
        // nameSS() {
        //     this.nameS = this.$store.state.projectInfo.pname;
        //     if (this.nameS == '') {
        //         return '暂无数据';
        //     } else {
        //         return this.nameS;
        //     }
        // },

        ImageShow() {
            if (
                this.Image == '' ||
                this.Image == null ||
                this.Image == undefined
            ) {
                return true;
            } else {
                return false;
            }
        },
        cNameOneS() {
            if (
                this.$route.path == '/workbench' ||
                this.$route.query.name == 1
            ) {
                return this.cNameOne;
            } else {
                return this.cNameTwo;
            }
        },
        cNameTwoS() {
            if (
                this.$route.path == '/project/projectPanel' ||
                this.$route.path == '/project/projectList' ||
                this.$route.path == '/project/projectInfo' ||
                this.$route.path == '/project/projectProgress' ||
                this.$route.path == '/project/projectQuality' ||
                this.$route.path == '/project/projectSafe' ||
                this.$route.path == '/project/projectCost' ||
                this.$route.path == '/project/projectContract' ||
                this.$route.path == '/project/projectError1' ||
                this.$route.path == '/project/projectError2' ||
                this.$route.path == '/project/projectError3' ||
                this.$route.path == '/project/projectError4' ||
                this.$route.path == '/project/projectError5'
            ) {
                return this.cNameOne;
            } else {
                return this.cNameTwo;
            }
        },
        cNameThreeS() {
            if (
                this.$route.path == '/files/filesCurrent' ||
                this.$route.path == '/files/filesImg' ||
                this.$route.path == '/files/filesAtlas' ||
                this.$route.path == '/files/filesCollect' ||
                this.$route.path == '/files/filesLocal' ||
                this.$route.path == '/files/filesModel' ||
                this.$route.path == '/files/filesShare' ||
                this.$route.path == '/files/filesDynamic' ||
                this.$route.path == '/files/filesBack'
            ) {
                return this.cNameOne;
            } else {
                return this.cNameTwo;
            }
        },
        cNameFourS() {
            if (
                this.$route.path == '/task/taskOrder' ||
                this.$route.path == '/task/taskMould' ||
                this.$route.path == '/task/taskList' ||
                this.$route.path == '/task/taskManyList'
            ) {
                return this.cNameOne;
            } else {
                return this.cNameTwo;
            }
        },
        cNameTS() {
            if (
                this.$route.path == '/diary/diaryPrintList' ||
                this.$route.path == '/diary/diaryList' ||
                this.$route.path == '/diary/diaryOrder' ||
                this.$route.path == '/diary/diaryAdd'
            ) {
                return this.cNameOne;
            } else {
                return this.cNameTwo;
            }
        }
    },
    mounted() {},

    methods: {
        addPhone() {
            const that = this;
            document.getElementById('addinput').blur();
            that.sendFormVisible = true;
        },
        //内购
        takeMoney() {
            const _this = this;
            if (_this.$store.state.userInfo.admin == '1') {
                _this.$axios
                    .post('/ding/getShopyeman', {
                        corp_id: _this.$store.state.cid,
                        shopcode: 'DD_GOODS-645010'
                    })
                    .then((res) => {
                        if (res.data.status == 1) {
                            dd.ready(function () {
                                dd.biz.util.openSlidePanel({
                                    url: res.data.content, //打开侧边栏的url
                                    title: '协同建设', //侧边栏顶部标题
                                    onSuccess: function (result) {},
                                    onFail: function () {}
                                });
                            });
                        } else {
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                _this.$message.warning(
                    '抱歉，您没有权限操作，请联系钉钉管理员'
                );
            }
        },
        //帮助文档
        goHelp() {
            window.location.href =
                'https://www.yuque.com/books/share/0b3cefc0-655f-4555-ab1d-908e9186a0f2?#';
        },
        goCreate() {
            this.$router.push('/project/projectPanel');
            this.createVisible = false;
        },
        //意见反馈覆盖层
        backMsg() {
            this.backFormVisible = true;
        },
        backMsgCancel() {
            this.backFormVisible = false;
            this.backForm.feedback = '';
            this.backForm.tel = '';
        },
        sendMsgCancel() {
            this.sendFormVisible = false;
            this.sendForm.phone = '';
        },
        //
        sendMsgClick(formName) {
            const _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/cy_xiezhu/UpdateUserPhone', _this.sendForm)
                        .then((res) => {
                            if (res.data.code == 200) {
                                _this.inputPhone = _this.sendForm.phone;
                                _this.$store.commit(
                                    'setPhone',
                                    _this.sendForm.phone
                                );
                                _this.sendFormVisible = false;
                                _this.sendForm.phone = '';
                                _this.$message.success('发送手机号成功');
                            } else {
                                _this.$message.warning(`${res.data.msg}`);
                            }
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //发送意见
        backMsgClick(formName) {
            const _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/Feedback', _this.backForm)
                        .then((res) => {
                            if (res.data.status == '200') {
                                _this.backFormVisible = false;
                                _this.backForm.feedback = '';
                                _this.backForm.tel = '';
                                _this.$message.success('发送意见反馈成功');
                            } else {
                                _this.$message.warning(`${res.data.msg}`);
                            }
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getNewList();
        },
        //切换项目
        changeProject(item, iper) {
            let _flag = false;
            this.$axios
                .post('/task/GetProjectUserRole', {
                    xmid: item.id
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        let newData = res.data.content;
                        if (this.cuPath == 1) {
                            _flag = true;
                        } else if (this.cuPath == 2) {
                            if (newData[0].a1 == 1) {
                                _flag = true;
                            } else {
                                _flag = false;
                            }
                        } else if (this.cuPath == 3) {
                            if (newData[2].a3 == 1) {
                                _flag = true;
                            } else {
                                _flag = false;
                            }
                        } else if (this.cuPath == 4) {
                            if (newData[3].a4 == 1) {
                                _flag = true;
                            } else {
                                _flag = false;
                            }
                        } else if (this.cuPath == 5) {
                            if (newData[4].a5 == 1) {
                                _flag = true;
                            } else {
                                _flag = false;
                            }
                        } else if (this.cuPath == 6) {
                            if (newData[1].a2 == 1) {
                                _flag = true;
                            } else {
                                _flag = false;
                            }
                        }
                        if (_flag) {
                            // let valPro = '';
                            // let newTag = '';
                            // if (item.waitTime > item.totalTime) {
                            //     valPro = 100;
                            //     newTag = '项目已结束';
                            // } else if (item.waitTime < 1) {
                            //     valPro = 0;
                            //     newTag = '项目筹建';
                            // } else {
                            //     valPro = iper;
                            //     newTag = '项目进行中';
                            // }
                            this.$store.commit('setProjectName', item.pcontent);
                            this.$store.commit('setProjectId', item.id);
                            this.$store.commit('setProjectPurl', item.xmurl);
                            this.$store.commit('setPerctentage', item.jindu);
                            this.$store.commit('setPTag', item.beian);
                            this.$store.commit('setPStatus', item.status);
                            this.$store.commit('setPPower', item.quanxian);
                            this.dialogFormVisible = false;
                        } else {
                            this.$notify({
                                title: '提示',
                                type: 'warning',
                                message:
                                    '您在选择的项目中没有当前模块的权限，请联系管理员开通权限！',
                                duration: '2000'
                            });
                        }
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
        },
        //打开切换项目
        switchover() {
            this.getNewList();
            this.dialogFormVisible = true;
        },
        getNewList() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectList', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin,
                    name: '',
                    start: '',
                    stop: '',
                    current_page: _this.currentPage,
                    city: '',
                    type: _this.typeVal
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.pageTotal = res.data.content.total;
                        if (res.data.content.list.length > 0) {
                            //新生成当前时间和开工时间差值，总天数，百分比
                            _this.projectList = res.data.content.list;
                        } else {
                            _this.projectList = [];
                        }
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //项目列表
        getPanelList() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectList', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin,
                    name: '',
                    start: '',
                    stop: '',
                    current_page: 1,
                    city: '',
                    type: _this.typeVal
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.pageTotal = res.data.content.total;
                        if (res.data.content.list.length > 0) {
                            //新生成当前时间和开工时间差值，总天数，百分比
                            _this.projectList = res.data.content.list;
                            if (!_this.$store.state.projectInfo.pid) {
                                _this.$store.commit(
                                    'setProjectName',
                                    _this.projectList[0].pcontent
                                );
                                _this.$store.commit(
                                    'setProjectId',
                                    _this.projectList[0].id
                                );
                                _this.$store.commit(
                                    'setProjectPurl',
                                    _this.projectList[0].xmurl
                                );
                                _this.$store.commit(
                                    'setPerctentage',
                                    _this.projectList[0].jindu
                                );
                                _this.$store.commit(
                                    'setPTag',
                                    _this.projectList[0].beian
                                );
                                _this.$store.commit(
                                    'setPStatus',
                                    _this.projectList[0].status
                                );
                                _this.$store.commit(
                                    'setPPower',
                                    _this.projectList[0].quanxian
                                );
                            }
                            _this.projectList = JSON.parse(
                                JSON.stringify(_this.projectList)
                            );
                        } else {
                            _this.projectList = [];
                            _this.$store.commit('setProjectName', '');
                            _this.$store.commit('setProjectId', '');
                            _this.$store.commit('setProjectPurl', '');
                            _this.$store.commit('setPerctentage', '');
                            _this.$store.commit('setPTag', '');
                            _this.$store.commit('setPStatus', '');
                            _this.$store.commit('setPLength', '');
                            _this.$store.commit('setPPower', '');
                        }
                        // _this.createVisible = true;
                        if (_this.lfirst == 1) {
                            _this.createVisible = true;
                        } else {
                            _this.createVisible = false;
                        }
                        _this.$store.commit(
                            'setPLength',
                            _this.projectList.length
                        );
                        sessionStorage.setItem(
                            'uclength',
                            _this.projectList.length
                        );
                        let newToken = sessionStorage.getItem('ucadmin');
                        if (_this.projectList.length == 0 && newToken == 0) {
                            _this.$router.push('/error');
                        }
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //切换项目类型
        typeClick(index, val) {
            this.activeMenuIndex = index;
            this.typeVal = val;
            this.currentPage = 1;
            this.getNewList();
        },
        goMobil() {
            let newP = window.location.protocol;
            if (
                this.$store.state.cid ==
                    'dingea47c602975497f935c2f4657eb6378f' ||
                this.$store.state.cid ==
                    'dingdb76565ddf3bf19e4ac5d6980864d335' ||
                this.$store.state.cid == 'ding958cdfb717ce33bb35c2f4657eb6378f'
            ) {
                if (
                    this.$store.state.userInfo.uid == '1955162522782338' ||
                    this.$store.state.userInfo.uid == '1743511105903146' ||
                    this.$store.state.userInfo.uid == '195516252224279904'
                ) {
                    if (newP == 'http:') {
                        window.location.href =
                            'http://phpxiezhu.zzdingyun.com/app/mobildist/index.html';
                    } else {
                        window.location.href =
                            'https://newxiezhu.zzdingyun.com/app/mobildist/index.html';
                    }
                }
            }
        },
        getReady() {
            const that = this;
            // 免登录信息获取
            that.$dd.ready(function () {
                // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
                that.$dd.runtime.permission.requestAuthCode({
                    // corpId: "dingea47c602975497f935c2f4657eb6378f",
                    corpId: that.$store.state.cid,
                    onSuccess: function (result) {
                        if (result.code != '') {
                            that.$axios
                                .post('/dingyun/getuserrole', {
                                    corp_id: that.$store.state.cid,
                                    code: result.code
                                })
                                .then((res) => {
                                    if (res.data.status == '1') {
                                        sessionStorage.setItem('errorCode', 1);
                                        let user = res.data.content.userid;
                                        that.Image = res.data.content.avatar;
                                        that.uname = res.data.content.name;
                                        that.uuid = res.data.content.userid;
                                        that.inputPhone =
                                            res.data.content.phone;
                                        that.$store.commit(
                                            'setPhone',
                                            res.data.content.phone
                                        );
                                        that.$store.commit(
                                            'setName',
                                            that.uname
                                        );
                                        that.$store.commit(
                                            'setAvatar',
                                            that.Image
                                        );
                                        that.$store.commit('setUid', user);
                                        that.$store.commit(
                                            'setAdmin',
                                            res.data.content.isAdmin
                                        );
                                        that.$store.commit(
                                            'setFirst',
                                            res.data.content.first
                                        );
                                        sessionStorage.setItem(
                                            'ucadmin',
                                            res.data.content.isAdmin
                                        );
                                        that.lfirst = res.data.content.first;
                                        that.getPanelList();
                                        that.getPower();
                                        that.getUserPower();
                                    } else if (res.data.status == '2') {
                                        sessionStorage.setItem('errorCode', 2);
                                        that.$router.push({
                                            path: '/errorPower',
                                            query: { msg: res.data.msg }
                                        });
                                    }
                                });
                        }
                    },
                    onFail: function (err) {}
                });
            });
        },
        buttonTop(index) {
            if (this.$route.path !== index) {
                if (index == '/workbench') {
                    this.cuPath = 1;
                    this.$router.push('/workbench');
                }
                if (index == '/project/projectPanel') {
                    if (this.upower[0].a1 == 1) {
                        this.cuPath = 2;
                        this.$router.push('/project/projectPanel');
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'warning',
                            message: '您无权限进入，请联系管理员分配权限',
                            duration: '1500'
                        });
                    }
                }
                if (index == '/files/filesCurrent') {
                    if (this.upower[3].a4 == 1) {
                        this.cuPath = 4;
                        this.$router.push('/files/filesCurrent');
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'warning',
                            message: '您无权限进入，请联系管理员分配权限',
                            duration: '1500'
                        });
                    }
                }
                if (index == '/task/taskMould') {
                    if (this.upower[2].a3 == 1) {
                        this.cuPath = 3;
                        this.$router.push('/task/taskMould');
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'warning',
                            message: '您无权限进入，请联系管理员分配权限',
                            duration: '1500'
                        });
                    }
                }
                if (index == '/diary/diaryAdd') {
                    if (this.upower[4].a5 == 1) {
                        this.cuPath = 5;
                        this.$router.push('/diary/diaryAdd');
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'warning',
                            message: '您无权限进入，请联系管理员分配权限',
                            duration: '1500'
                        });
                    }
                }
                if (index == '/application/applicationPower') {
                    if (this.upower[1].a2 == 1) {
                        this.cuPath = 6;
                        this.$router.push('/application/applicationPower');
                    } else {
                        this.$notify({
                            title: '提示',
                            type: 'warning',
                            message: '您无权限进入，请联系管理员分配权限',
                            duration: '1500'
                        });
                    }
                }
            }
        },
        getUserPower(index) {
            const _this = this;
            _this.$axios
                .post('/task/GetProjectUserRole', {
                    xmid: _this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.upower = res.data.content;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ifShow() {
            this.cNameOne = sessionStorage.getItem('cNameOne');
            this.cNameTwo = sessionStorage.getItem('cNameTwo');
            this.cNameThree = sessionStorage.getItem('cNameThree');
            this.cNameFour = sessionStorage.getItem('cNameFour');
            this.cNameT = sessionStorage.getItem('cNameT');
        },
        getPower() {
            const _this = this;
            _this.$axios
                .post('/dingyun/DingPanSaveFile', {
                    corp_id: _this.$store.state.cid,
                    type: 'add',
                    fileids: '',
                    userid: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.status == '1') {
                        _this.$store.commit(
                            'setSpaceId',
                            res.data.spaceid.toString()
                        );
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    created() {
        const that = this;
        //获取corpid的值

        let CorpId = '';
        var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
        CorpId = url.split('?corpid=')[1];
        localStorage.setItem('corpId', CorpId);
        that.$store.commit('setCid', CorpId);
        that.ucid = CorpId;
        that.getReady();
    },
    watch: {
        '$store.state.projectInfo': {
            handler(val, oldVal) {
                if (val.pid) {
                    this.nameS = this.$store.state.projectInfo.pname;
                    this.getUserPower();
                } else {
                    this.nameS = '暂无数据';
                }
            },
            deep: true,
            immediate: true
        },
        '$store.state.userInfo': {
            handler(val, oldVal) {
                if (val.first) {
                    if (val.first == 1) {
                        if (
                            this.$store.state.projectInfo.plength == null ||
                            this.$store.state.projectInfo.plength == 0
                        ) {
                            if (
                                this.lrourl == '/project/projectPanel' ||
                                this.lrourl == '/project/projectList'
                            ) {
                                this.warnTipView = false;
                            } else {
                                this.warnTipView = true;
                            }
                        }
                    } else {
                        this.warnTipView = false;
                    }
                }
            },
            deep: true,
            immediate: true
        },
        $route(to, from) {
            this.lrourl = to.path;
            if (
                this.lrourl == '/project/projectPanel' ||
                this.lrourl == '/project/projectList'
            ) {
                this.warnTipView = false;
            } else {
                if (this.$store.state.userInfo.first == 1) {
                    this.warnTipView = true;
                } else {
                    this.warnTipView = false;
                }
            }
        }
    }
};
</script>

<style lang="less">
body {
    .el-popver {
        .down {
            text-align: center;
            img {
                width: 2.4rem;
                height: 2.4rem;
            }
        }
    }
}
.workbench-title {
    // width: 19.2rem;
    height: 0.9rem;
    background-image: linear-gradient(to right, #409efe, #458cfe);
    line-height: 0.9rem;
    display: flex;
    justify-content: space-around;
    .sendBackDialog {
        .el-dialog {
            width: 6rem;
        }
    }
    .feedBackClass {
        .el-textarea {
            .el-textarea__inner {
                height: 1rem;
            }
        }
    }
    .carouselDialog {
        .el-dialog {
            width: 7.2rem !important;
        }
    }
    .workbench-img {
        width: 2.8rem;
        height: 0.9rem;
        img {
            width: 2.51rem;
            height: 0.8rem;
            margin-left: -0.16rem;
        }
    }
    .title-left {
        font-size: 0.22rem;
        font-family: SourceHanSansCN-Light;
        font-weight: normal;
        font-stretch: normal;
        line-height: 0.9rem;
        letter-spacing: 0rem;
        color: white;
    }
    .workbench-center {
        width: 6.5rem;
        height: 0.9rem;
        font-size: 0.2rem;
        ul {
            width: 6.5rem;
            height: 0.9rem;
            display: flex;
            // margin: 0 auto;
            margin-left: 0.5rem;
            li {
                width: 1.3rem;
                height: 0.9rem;
                text-align: center;
                color: white;
                cursor: pointer;
                position: relative;
                .proTips {
                    position: absolute;
                    bottom: -0.12rem;
                    left: -0.48rem;
                    line-height: 1;
                    background-color: #409efe;
                    z-index: 99;
                    font-size: 0.14rem;
                    padding: 0.1rem 0.2rem;
                    width: 2rem;
                    color: #fff !important;
                    i {
                        position: absolute;
                        top: -0.14rem;
                        left: 1rem;
                        color: red;
                    }
                }
            }

            .colorName {
                color: #fb8103;
            }
        }
    }
    .relation-box {
        height: 0.9rem;
        line-height: 0.9rem;
        // background: red;
        font-size: 0.18rem;
        font-family: SourceHanSansCN-Light;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: white;
        margin-left: 0.5rem;
        ul {
            display: flex;
            height: 100%;
            li {
                padding: 0 0.19rem;
                text-align: center;

                img {
                    vertical-align: middle;
                }
            }
            li:nth-child(3) {
                cursor: pointer;
            }
            .linkme {
                cursor: pointer;
                > span {
                    display: inline-block;
                }
            }
        }
    }
    .admin {
        display: flex;
        justify-content: center;
        align-items: center;
        // margin-left: 1.5rem;
        img {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
        }
        span {
            font-size: 0.2rem;
            color: white;
            margin-left: 0.2rem;
        }
    }
    .switch {
        width: 3rem;
        height: 0.9rem;
        font-size: 0.16rem;
        color: aliceblue;
        display: flex;
        // margin-left: 0.5rem;
        .switch-box {
            width: 2rem;
            height: 0.9rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .switch-button {
            width: 1rem;
            height: 0.9rem;
            margin-left: 0.3rem;
        }
    }
    .el-dialog {
        font-size: 0.2rem;
        .el-dialog__header {
            height: 0.24rem;
            line-height: 0.24rem;
        }
        .content {
            .panelContent {
                width: 96%;
                margin: 0 auto;
                background-color: #fff;
                .panelList {
                    margin: 0.1rem 0;
                    display: flex;
                    width: 96%;
                    margin: 0 auto;
                    padding-top: 0.1rem;
                    flex-wrap: wrap;
                }
                .progress {
                    font-size: 0.16rem;
                    position: relative;
                    background-color: #f9f9f9;
                    width: 44%;
                    margin: 0.25rem 0.2rem;
                    border: 1px solid #fff;
                    border-radius: 10px;
                    cursor: pointer;
                }
                .progress > .biao {
                    position: absolute;
                    left: 0.15rem;
                    top: -0.17rem;
                    width: 0.5rem;
                    height: 0.5rem;
                }
                .project-title {
                    padding: 0.1rem 0;
                    font-size: 0.16rem;
                    border-bottom: 0.01rem solid #dadada;
                    text-align: center;
                    padding-left: 0.75rem;
                    box-sizing: border-box;
                    width: 100%;
                    // height: 0.2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 0.24rem;
                }
                .circle {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.1rem;
                    div {
                        div {
                            line-height: 0.24rem;
                        }
                    }
                }
            }
            .projectItem-buttonS {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                height: 6rem;
                overflow: auto;
                .projectItem-centerS {
                    width: 5.5rem;
                    margin: 0.05rem auto;
                    display: flex;
                    border: 0.01rem solid rgba(12, 12, 12, 0.3);
                    padding: 0.1rem 0.1rem;
                    height: 0.2rem;
                    line-height: 0.2rem;
                    cursor: pointer;
                    p {
                        width: 5.5rem;
                        height: 0.3rem;
                        font-size: 0.14rem;
                        color: #999b9e;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
                .progress {
                    font-size: 0.16rem;
                    position: relative;
                    background-color: #f9f9f9;
                    width: 43%;
                    height: 1.8rem;
                    margin: 0.25rem 0.2rem;
                    margin-bottom: 0rem;
                    border: 1px solid #ffffff;
                    border-radius: 10px;
                }
                .progress > .biao {
                    position: absolute;
                    left: 0.15rem;
                    top: -0.17rem;
                    width: 0.6rem;
                    height: 0.6rem;
                }
                .project-title {
                    padding: 0.1rem 0;
                    font-size: 0.16rem;
                    border-bottom: 0.01rem solid #dadada;
                    text-align: center;
                    width: 100%;
                    height: 0.2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 0.2rem;
                }
                .circle {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    // padding:0.1rem ;
                }
                .projectItem-No {
                    margin: 1rem auto;
                    .buttonimg {
                        display: block;
                        width: 2rem;
                        height: 2rem;
                    }
                    .buttonP {
                        font-size: 0.16rem;
                        text-align: center;
                    }
                }
            }
        }
        .headerWarn {
            display: flex;
            line-height: 0.24rem;
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
    }
}
</style>
	
	

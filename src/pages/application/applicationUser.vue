<template>
    <div id="applicationUser">
        <div class="main">
            <div class="set-top">
                <img :src="appUrl" alt />
                <div class="top-box">
                    <p>{{ companyName }}</p>
                    <p>
                        <span>使用人数：</span>
                        <span>{{ scopeCount }}</span>
                    </p>
                    <!-- <p style="color:#409eff;" @click="takeMoney">购买空间</p> -->
                </div>
            </div>
            <div class="set-bottom">
                <p>项目信息</p>
                <div class="bottom-box">
                    <!-- <div class="box-two">
                        <img src="../../assets/workbench/renshu.png" alt />
                        <p class="boxtwo">{{ companyName }}</p>
                        <div class="two-center">
                            <div class="personnel-box">
                                <el-progress
                                    type="circle"
                                    :percentage="maxOfPeople - scopeCount"
                                    :stroke-width="10"
                                    :show-text="false"
                                    :width="widthS"
                                    class="personnelStrip"
                                ></el-progress>
                                <div class="personnel-center">
                                    <p>{{ maxOfPeople - scopeCount }}</p>
                                    <p>剩余可用</p>
                                </div>
                            </div>
                            <div class="personnel">
                                <div>
                                    <span>使用项目数</span>
                                    <span>{{ scopeCount }}</span>
                                </div>
                                <div>
                                    <span>总项目数</span>
                                    <span>{{ maxOfPeople }}</span>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div
                        class="box-one"
                        @click="editBim"
                        style="cursor: pointer"
                    >
                        <img src="../../assets/workbench/shijian.png" alt />
                        <p class="boxone">剩余可用点数</p>
                        <div class="one-center">
                            <div class="time-box">
                                <el-progress
                                    type="circle"
                                    :percentage="pRAvailable"
                                    :stroke-width="10"
                                    :show-text="false"
                                    :width="widthS"
                                    :color="colors"
                                    class="timeStrip"
                                ></el-progress>
                                <div class="Strip-center">
                                    <p>{{ RAvailable }}</p>
                                    <p>剩余可用</p>
                                </div>
                            </div>
                            <div class="time">
                                <div>
                                    <span>使用点数</span>
                                    <span>{{ createTime }}</span>
                                </div>
                                <div>
                                    <span>总点数</span>
                                    <span>{{ StopTime }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="box-two"
                        style="cursor: pointer"
                        @click="editOss"
                    >
                        <img src="../../assets/workbench/kongjian.png" alt />
                        <p class="boxtwo">剩余可用空间</p>
                        <div class="two-center">
                            <div class="personnel-box">
                                <el-progress
                                    type="circle"
                                    :percentage="reKongPer"
                                    :stroke-width="10"
                                    :show-text="false"
                                    :width="widthS"
                                    class="personnelStrip"
                                ></el-progress>
                                <div class="personnel-center">
                                    <p>{{ reKong < 0 ? 0 : reKong }}</p>
                                    <p>剩余可用</p>
                                </div>
                            </div>
                            <div class="personnel">
                                <div>
                                    <span>使用空间</span>
                                    <span>{{ reSize }}</span>
                                </div>
                                <div>
                                    <span>总空间</span>
                                    <span>{{ totalSize }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="set-bottom">
                <p style="padding-top: 0.3rem; padding-bottom: 0.2rem">
                    软件版本：1.8.1 （官方开发版本）
                </p>
            </div>
        </div>
        <el-dialog
            title="分配点数"
            :visible.sync="ebVisible"
            width="5rem"
            @close="drawClose('ebRef')"
            class="auDialog"
        >
            <el-form
                ref="ebRef"
                :model="ebform"
                :rules="ebformRules"
                label-width="140px"
            >
                <el-form-item label="项目：" prop="xmid">
                    <el-select v-model="ebform.xmid" placeholder="请选择项目">
                        <el-option
                            v-for="(item, index) in projectList"
                            :key="index"
                            :label="item.pcontent"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分配点数（点）：" prop="num">
                    <el-input-number
                        v-model="ebform.num"
                        @change="handleChange"
                        :step="50"
                        :min="1"
                        :max="1000"
                        label="描述文字"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="drawClose('ebRef')">取 消</el-button>
                <el-button
                    type="primary"
                    :loading="loading"
                    @click="saveNew('ebRef')"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="分配空间"
            :visible.sync="esVisible"
            width="5rem"
            @close="esClose('esRef')"
            class="auDialog"
        >
            <el-form
                ref="esRef"
                :model="esform"
                :rules="esformRules"
                label-width="140px"
            >
                <el-form-item label="项目：" prop="xmid">
                    <el-select v-model="esform.xmid" placeholder="请选择项目">
                        <el-option
                            v-for="(item, index) in projectList"
                            :key="index"
                            :label="item.pcontent"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分配空间（G）：" prop="num">
                    <el-input-number
                        v-model="esform.num"
                        @change="handleChange"
                        :min="1"
                        :max="1000"
                        :step="10"
                        label="描述文字"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="esClose('esRef')">取 消</el-button>
                <el-button
                    type="primary"
                    :loading="loading"
                    @click="saveEs('esRef')"
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
            ebformRules: {
                xmid: [
                    {
                        required: true,
                        message: '项目不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                num: [
                    {
                        required: true,
                        message: '分配点数不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            esformRules: {
                xmid: [
                    {
                        required: true,
                        message: '项目不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                num: [
                    {
                        required: true,
                        message: '分配空间不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            ebform: {
                xmid: '',
                num: 1
            },
            esform: {
                xmid: '',
                num: 1
            },
            appUrl: this.$store.state.projectInfo.purl,
            projectList: [],
            esVisible: false,
            ebVisible: false,
            colors: '#fb8103',
            widthS: '',
            companyName: this.$store.state.projectInfo.pname,
            usersNumber: '',
            StopTime: '',
            createTime: '',
            RAvailable: '0',
            maxOfPeople: 100,
            scopeCount: '0',
            residue: '0',
            pRAvailable: 0,
            pResidue: 0,
            reKong: 0,
            reKongPer: 0,
            reSize: 0,
            totalSize: 0
        };
    },
    created() {
        if (this.$store.state.projectInfo.purl) {
            this.appUrl = this.$store.state.projectInfo.purl;
        } else {
            this.appUrl =
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnZXQ26B841600655714494.png';
        }
        var WidthT =
            document.documentElement.clientWidth || document.body.clientWidth;
        var SS = WidthT / 12;
        this.widthS = SS;
        window.onresize = () => {
            var WidthT =
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            var SS = WidthT / 12;
            this.widthS = SS;
        };
    },
    mounted() {
        this.getPRole();

        this.getInfo();
        this.getProjectList();
    },
    methods: {
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
        esClose(name) {
            this.esVisible = false;
            this.esform.xmid = '';
            this.esform.num = 1;
        },
        //分配空间
        saveEs(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/cy_xiezhu/DeleceCorpProject', {
                            xmid: _this.$route.query.id,
                            corp_id: _this.$store.state.cid,
                            userid: _this.$store.state.userInfo.uid,
                            ccorp_id: _this.quitData.corp_id,
                            admin: _this.$store.state.userInfo.admin
                        })
                        .then((res) => {
                            _this.loading = false;
                            if (res.data.code == 200) {
                                _this.ebVisible = false;
                                _this.getInfo();
                                _this.$message.success(res.data.msg);
                            } else {
                                _this.$message.warning(res.data.msg);
                            }
                        });
                } else {
                    _this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        drawClose(name) {
            this.ebVisible = false;
            this.ebform.xmid = '';
            this.ebform.num = 1;
        },
        //分配点数
        saveNew(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/cy_xiezhu/DeleceCorpProject', {
                            xmid: _this.$route.query.id,
                            corp_id: _this.$store.state.cid,
                            userid: _this.$store.state.userInfo.uid,
                            ccorp_id: _this.quitData.corp_id,
                            admin: _this.$store.state.userInfo.admin
                        })
                        .then((res) => {
                            _this.loading = false;
                            if (res.data.code == 200) {
                                _this.ebVisible = false;
                                _this.getInfo();
                                _this.$message.success(res.data.msg);
                            } else {
                                _this.$message.warning(res.data.msg);
                            }
                        });
                } else {
                    _this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editBim() {
            console.log('1');
            // this.ebVisible = true;
        },
        editOss() {
            console.log('2');
            // this.esVisible = true;
        },
        getInfo() {
            this.$axios
                .post('/task/qiyeinfo', {
                    corp_id: this.$store.state.cid,
                    xmid: this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.status == '200') {
                        let newData = res.data.list;
                        this.scopeCount = newData.Npeople;
                        this.StopTime = newData.dian;
                        this.createTime = newData.yiyong;
                        this.RAvailable = this.StopTime - this.createTime;
                        let dayPer = (this.RAvailable / this.StopTime) * 100;
                        this.pRAvailable = dayPer.toFixed(1);

                        this.totalSize = this.$utils.renderSize(newData.kysize);
                        this.reSize = this.$utils.renderSize(newData.size);
                        let newKong = newData.kysize - newData.size;
                        this.reKong = this.$utils.renderSize(newKong);
                        let newPer = (newKong / newData.kysize) * 100;
                        this.reKongPer = newPer.toFixed(1);
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
                        _this.projectList = res.data.content;
                    }
                });
        }
    },
    computed: {
        projectData() {
            return this.$store.state.projectInfo;
        }
    },
    watch: {
        projectData: {
            handler(newVal, oldVal) {
                //你需要执行的代码
                if (oldVal) {
                    if (newVal.purl) {
                        this.appUrl = newVal.purl;
                    } else {
                        this.appUrl =
                            'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnZXQ26B841600655714494.png';
                    }
                    this.companyName = newVal.pname;
                    this.getInfo();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
<style lang="less" scoped>
#app {
    .app-bottom {
        height: 90vh;
    }
}

#applicationUser {
    // width: 18rem;
    // height: 90vh;
    // background: #fff;
    // // margin: 0rem auto;
    // margin: 0 auto;
    // border-radius: 0.1rem;
    .auDialog {
        .el-select,
        .el-input-number {
            width: 100%;
        }
    }
    .set-top {
        width: 100%;
        height: 2.3rem;
        display: flex;
        img {
            margin: 0.5rem 0rem 0rem 0.5rem;
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 0.1rem;
        }
        .top-box {
            margin: 0.5rem 0rem 0rem 0.2rem;
            font-size: 0.2rem;
            p {
                &:nth-child(1) {
                    font-family: SourceHanSansCN-Normal;
                    font-size: 0.2rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.45rem;
                    letter-spacing: 0px;
                    color: #575b60;
                }
                &:nth-child(2) {
                    font-family: SourceHanSansCN-Normal;
                    font-size: 0.16rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.45rem;
                    letter-spacing: 0rem;
                    color: #9ea0a3;
                }
                &:nth-child(3) {
                    font-family: SourceHanSansCN-Normal;
                    font-size: 0.16rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.45rem;
                    letter-spacing: 0rem;
                    color: #9ea0a3;
                }
            }
        }
    }
    .set-bottom {
        p {
            margin-left: 0.5rem;
            font-family: SourceHanSansCN-Normal;
            font-size: 0.18rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 0.45rem;
            letter-spacing: 0px;
            color: #575b60;
        }
        .bottom-box {
            display: flex;
            justify-content: space-around;
            margin-top: 1rem;
        }
        .box-one {
            width: 3.4rem;
            height: 3.6rem;
            box-shadow: 0rem 0.01rem 0.08rem 0px rgba(20, 20, 20, 0.17);
            border-radius: 0.06rem;
            position: relative;
            img {
                width: 0.7rem;
                height: 0.7rem;
                position: absolute;
                top: -0.35rem;
                left: -0.35rem;
            }
            .boxone {
                width: 100%;
                height: 0.5rem;
                margin-left: 0rem;
                background-color: #ff943e;
                font-family: AdobeHeitiStd-Regular;
                font-size: 0.22rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.5rem;
                letter-spacing: 0rem;
                color: #ffffff;
                text-align: center;
                border-radius: 0.06rem 0.06rem 0px 0px;
            }
            .one-center {
                width: 100%;
                height: 3.2rem;
                border-radius: 0px 0px 0.06rem 0.06rem;
                .time-box {
                    width: 100%;
                    height: 2.3rem;
                    position: relative;
                    .timeStrip {
                        margin-top: 0.4rem;
                        margin-left: 0.9rem;
                    }
                    .Strip-center {
                        position: absolute;
                        top: 1.05rem;
                        left: 0.9rem;
                        p {
                            width: 1.6rem;
                            &:nth-child(1) {
                                margin-left: 0rem;
                                font-family: AdobeHeitiStd-Regular;
                                font-size: 0.32rem;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 0.35rem;
                                letter-spacing: 0rem;
                                color: #191f25;
                                text-align: center;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            &:nth-child(2) {
                                margin-left: 0rem;
                                font-family: AdobeHeitiStd-Regular;
                                font-size: 0.18rem;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 0.3rem;
                                letter-spacing: 0rem;
                                color: #7a7d81;
                                text-align: center;
                            }
                        }
                    }
                }
                .time {
                    width: 100%;
                    height: 0.8rem;
                    background-color: #f2f6f9;
                    display: flex;
                    font-family: SourceHanSansCN-Normal;
                    font-size: 0.16rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.4rem;
                    letter-spacing: 0rem;
                    color: #575b60;
                    span {
                        display: block;
                        width: 1.7rem;
                        height: 0.4rem;
                        line-height: 0.4rem;
                        text-align: center;
                    }
                }
            }
        }
        .box-two {
            width: 3.4rem;
            height: 3.6rem;
            box-shadow: 0px 0.01rem 0.08rem 0px rgba(20, 20, 20, 0.17);
            border-radius: 0.06rem;
            position: relative;
            img {
                width: 0.7rem;
                height: 0.7rem;
                position: absolute;
                top: -0.35rem;
                left: -0.35rem;
            }
            .boxtwo {
                width: 100%;
                margin-left: 0rem;
                height: 0.5rem;
                background-color: #3296fa;
                font-family: AdobeHeitiStd-Regular;
                font-size: 0.22rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 0.5rem;
                letter-spacing: 0rem;
                color: #ffffff;
                text-align: center;
                border-radius: 0.06rem 0.06rem 0px 0px;
            }
            .two-center {
                width: 100%;
                height: 3.2rem;
                border-radius: 0px 0px 0.06rem 0.06rem;
                .personnel-box {
                    width: 100%;
                    height: 2.3rem;
                    position: relative;
                    .personnelStrip {
                        margin-top: 0.4rem;
                        margin-left: 0.9rem;
                    }
                    .personnel-center {
                        position: absolute;
                        top: 1.05rem;
                        left: 0.9rem;
                        p {
                            width: 1.6rem;
                            &:nth-child(1) {
                                margin-left: 0rem;
                                font-family: AdobeHeitiStd-Regular;
                                font-size: 0.32rem;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 0.35rem;
                                letter-spacing: 0rem;
                                color: #191f25;
                                text-align: center;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            &:nth-child(2) {
                                margin-left: 0rem;
                                font-family: AdobeHeitiStd-Regular;
                                font-size: 0.18rem;
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: 0.3rem;
                                letter-spacing: 0rem;
                                color: #7a7d81;
                                text-align: center;
                            }
                        }
                    }
                }
                .personnel {
                    width: 100%;
                    height: 0.8rem;
                    background-color: #f2f6f9;
                    display: flex;
                    font-family: SourceHanSansCN-Normal;
                    font-size: 0.16rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.4rem;
                    letter-spacing: 0rem;
                    color: #575b60;
                    span {
                        display: block;
                        width: 1.7rem;
                        height: 0.4rem;
                        line-height: 0.4rem;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <el-main>
        <div class="anchor-point">
            <div class="scroll-content">
                <div class="scroll-item" id="renwu">
                    <div class="homeLeft">
                        <tab-bar class="tab">
                            <tab-bar-item
                                path="/workbench"
                                textColor="#fb8103"
                                v-if="workbenchS"
                            >
                                <img
                                    slot="item-img"
                                    src="../assets/menu/GZT-c.png"
                                    alt
                                />
                                <img
                                    slot="item-img-new"
                                    src="../assets/menu/GZT.png"
                                    alt
                                />
                                <div slot="item-text">首页</div>
                            </tab-bar-item>
                            <tab-bar-item
                                path="/management/managementpanel"
                                textColor="#fb8103"
                                v-if="managementS"
                            >
                                <img
                                    slot="item-img"
                                    src="../assets/menu/XMGL-c.png"
                                    alt
                                />
                                <img
                                    slot="item-img-new"
                                    src="../assets/menu/XMGL.jpg"
                                    alt
                                />
                                <div slot="item-text">项目面板</div>
                            </tab-bar-item>
                            <tab-bar-item
                                path="/management/managementAdd"
                                textColor="#fb8103"
                                v-if="managementS"
                            >
                                <img
                                    slot="item-img"
                                    src="../assets/menu/newprojectOne.jpg"
                                    alt
                                />
                                <img
                                    slot="item-img-new"
                                    src="../assets/menu/newprojectTwo.jpg"
                                    alt
                                />
                                <div slot="item-text">项目列表</div>
                            </tab-bar-item>
                        </tab-bar>
                    </div>
                    <div class="homeRight">
                        <div class="workbench">
                            <div class="content1">
                                <div>
                                    <div class="contentleft">
                                        <div class="wtitle">
                                            <img
                                                src="../assets/workbench/ywc.png"
                                            />
                                            <div>今日已完成</div>
                                        </div>
                                        <div class="content-one">
                                            <div
                                                style="
                                                    background-color: #409eff;
                                                "
                                            >
                                                <div>
                                                    <div class="content-text">
                                                        <div class="db-title">
                                                            <span
                                                                >待办任务</span
                                                            >
                                                            <span
                                                                class="tite-numb"
                                                                >{{
                                                                    taskNum.dzxtask
                                                                }}</span
                                                            >
                                                        </div>
                                                        <img
                                                            src="../assets/workbench/DB.png"
                                                            class="Imga-W"
                                                        />
                                                    </div>
                                                    <div
                                                        class="bottom"
                                                        @click="goTask('7')"
                                                    >
                                                        立即查看>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style="
                                                    background-color: #fb8103;
                                                "
                                            >
                                                <div>
                                                    <div class="content-text">
                                                        <div class="db-title">
                                                            <span
                                                                >抄送我的</span
                                                            >
                                                            <span
                                                                class="tite-numb"
                                                                >{{
                                                                    taskNum.cstask
                                                                }}</span
                                                            >
                                                        </div>
                                                        <img
                                                            src="../assets/workbench/DB.png"
                                                            class="Imga-W"
                                                        />
                                                    </div>
                                                    <div
                                                        class="bottom"
                                                        @click="goTask('3')"
                                                    >
                                                        立即查看>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style="
                                                    background-color: #35dacf;
                                                "
                                            >
                                                <div>
                                                    <div class="content-text">
                                                        <div class="db-title">
                                                            <span
                                                                >今日完成</span
                                                            >
                                                            <span
                                                                class="tite-numb"
                                                                >{{
                                                                    taskNum.ygdtask
                                                                }}</span
                                                            >
                                                        </div>
                                                        <img
                                                            src="../assets/workbench/DB.png"
                                                            class="Imga-W"
                                                        />
                                                    </div>
                                                    <div
                                                        class="bottom"
                                                        @click="goTask('5')"
                                                    >
                                                        立即查看>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                style="
                                                    background-color: rgb(
                                                        243,
                                                        77,
                                                        77
                                                    );
                                                "
                                            >
                                                <div>
                                                    <div class="content-text">
                                                        <div class="db-title">
                                                            <span
                                                                >逾期任务</span
                                                            >
                                                            <span
                                                                class="tite-numb"
                                                                >{{
                                                                    taskNum.yuqi
                                                                }}</span
                                                            >
                                                        </div>
                                                        <img
                                                            src="../assets/workbench/DB.png"
                                                            class="Imga-W"
                                                        />
                                                    </div>
                                                    <div
                                                        class="bottom"
                                                        @click="goTask('8')"
                                                    >
                                                        立即查看>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-right">
                                <div class="bottom-four">
                                    <img src="../assets/workbench/xx.png" />
                                    <div>消息通知</div>
                                </div>
                                <div class="four-text">
                                    <div class="text-center">
                                        <div class="center-tile">
                                            <span></span>
                                            <p>{{ msgList[0].title }}</p>
                                        </div>
                                        <div class="text-box">
                                            <p>{{ msgList[0].content }}</p>
                                        </div>
                                    </div>
                                    <span class="more" @click="viewMore"
                                        >查看更多》</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="scroll-item" id="xiangmu">
                    <div class="line">——————项目统计—————</div>
                    <div class="appxmtj">
                        <div>
                            <div class="kuai">
                                <div>
                                    <div>
                                        <img
                                            src="../assets/project/c.png"
                                            class="kuai-two"
                                        />
                                    </div>
                                    <div class="kuai-right">
                                        <div class="total">
                                            <span>项目总数(个数):</span>
                                            <span
                                                style="
                                                    color: #409eff;
                                                    font-size: 32rpx;
                                                    margin-left: 10px;
                                                "
                                                >{{ Sum }}</span
                                            >
                                        </div>
                                        <div>
                                            <span>造价总额(万元):</span>
                                            <span
                                                style="
                                                    color: #fb8103;
                                                    font-size: 32rpx;
                                                    margin-left: 10px;
                                                "
                                                >{{ SumMoney }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="kuai">
                                <div>
                                    <div>
                                        <img
                                            src="../assets/project/zj.png"
                                            class="kuai-two"
                                        />
                                    </div>
                                    <div class="kuai-right">
                                        <div class="total">
                                            <span>在建项目(个数):</span>
                                            <span
                                                style="
                                                    color: #409eff;
                                                    font-size: 32rpx;
                                                    margin-left: 10px;
                                                "
                                                >{{ construction }}</span
                                            >
                                        </div>
                                        <div>
                                            <span>造价总额(万元):</span>
                                            <span
                                                style="
                                                    color: #fb8103;
                                                    font-size: 32rpx;
                                                    margin-left: 10px;
                                                "
                                                >{{ constructionMoney }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="kuai">
                                <div>
                                    <div>
                                        <img
                                            src="../assets/project/xz.png"
                                            class="kuai-two"
                                        />
                                    </div>
                                    <div class="kuai-right">
                                        <div class="total">
                                            <span>本年新增(个数):</span>
                                            <span
                                                style="
                                                    color: #409eff;
                                                    font-size: 32rpx;
                                                    margin-left: 10px;
                                                "
                                                >{{ newly }}</span
                                            >
                                        </div>
                                        <div>
                                            <span>造价总额(万元):</span>
                                            <span
                                                style="
                                                    color: #fb8103;
                                                    font-size: 32rpx;
                                                    margin-left: 10px;
                                                "
                                                >{{ newlyMoney }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="kuai">
                                <div>
                                    <div>
                                        <img
                                            src="../assets/project/jg.png"
                                            class="kuai-two"
                                        />
                                    </div>
                                    <div class="kuai-right">
                                        <div class="total">
                                            <span>本年竣工(个数):</span>
                                            <span
                                                style="
                                                    color: #409eff;
                                                    font-size: 32rpx;
                                                    margin-left: 10px;
                                                "
                                                >{{ present }}</span
                                            >
                                        </div>
                                        <div>
                                            <span>造价总额(万元):</span>
                                            <span
                                                style="
                                                    color: #fb8103;
                                                    font-size: 32rpx;
                                                    margin-left: 10px;
                                                "
                                                >{{ presentMoney }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="workbenpro">
                            <div class="project-title">
                                <div>本月进度</div>
                            </div>
                            <div class="prolist" v-if="projectList.length > 0">
                                <div
                                    class="manage-content"
                                    v-for="(item, index) in projectList"
                                    :key="index"
                                >
                                    <div class="title">{{ item.name }}</div>
                                    <div class="manageright">
                                        <div class="progress-box">
                                            <el-progress
                                                :percentage="item.jindu"
                                            ></el-progress>
                                        </div>
                                    </div>
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
                            <div
                                v-else
                                style="text-align: center; padding: 30px 0"
                            >
                                <img
                                    style="width: 140px; height: 140px"
                                    src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/NG4ZDG6eBM1600655909495.jpg"
                                    alt
                                />
                                <p style="font-size: 16px">暂时还没有数据哦</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog
                title="消息通知"
                :visible.sync="dialogVisible"
                width="30%"
            >
                <div class="four-text">
                    <div
                        class="text-center"
                        v-for="(item, index) in msgList"
                        :key="index"
                    >
                        <div class="center-tile">
                            <span></span>
                            <p>{{ item.title }}</p>
                        </div>
                        <div class="text-box">
                            <p>{{ item.content }}</p>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </el-main>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'workbench',
    data() {
        return {
            pagesize: 3,
            currentPage: 1,
            pageTotal: '',
            projectList: [],
            msgList: [{ title: '', content: '' }],
            dialogVisible: false,
            userPower: [],
            isFirst: false,
            taskNum: { dzxtask: '', cstask: '', ygdtask: '', yuqi: '' }
        };
    },
    methods: {
        getUserPower(index) {
            const _this = this;
            _this.$axios
                .post('/task/GetProjectUserRole', {
                    xmid: _this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.userPower = res.data.content;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        goTask(status) {
            if (this.userPower[2].a3 == 1) {
                this.$router.push({
                    path: '/task/taskList',
                    query: { status: status }
                });
            } else {
                this.$notify({
                    title: '提示',
                    type: 'warning',
                    message: '您无权限进入，请联系管理员分配权限',
                    duration: '1500'
                });
            }
        },
        viewMore() {
            this.dialogVisible = true;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getProjectList();
        },
        getProjectList() {
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
                    type: '1',
                    num: 3
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.pageTotal = res.data.content.total;
                        //当前时间
                        let currentTime = new Date();
                        let nowTime = Date.parse(
                            _this.$utils.timeChange(currentTime, 2)
                        );
                        let day = 24 * 60 * 60 * 1000;
                        //新生成当前时间和开工时间差值，总天数，百分比
                        _this.projectList = res.data.content.list.map(function (
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
                        _this.projectList.map(function (val) {
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
                        if (
                            _this.pageTotal < 1 &&
                            _this.projectList.length < 1
                        ) {
                            // dd.ready(function () {
                            //     dd.device.notification.alert({
                            //         message:
                            //             '无项目，请您先创建项目才能进行其他操作！',
                            //         title: '提示', //可传空
                            //         buttonName: '收到',
                            //         onSuccess: function () {
                            //             //onSuccess将在点击button之后回调
                            //             /*回调*/
                            //         },
                            //         onFail: function (err) {}
                            //     });
                            // });
                            _this.$notify({
                                title: '提示',
                                message:
                                    '无项目，请您先创建项目才能进行其他操作！',
                                type: 'warning',
                                duration: 2000
                            });
                        }
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, //获取我的项目信息
        getProjectInfo() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectMianBan', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        let newData = res.data.content;
                        _this.Sum = res.data.content.zong.count;
                        _this.SumMoney = res.data.content.zong.money;
                        _this.construction = res.data.content.zai.count;
                        _this.constructionMoney = res.data.content.zai.money;
                        _this.newly = res.data.content.jinjian.count;
                        _this.newlyMoney = res.data.content.jinjian.money;
                        _this.present = res.data.content.jinjun.count;
                        _this.presentMoney = res.data.content.jinjun.money;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取消息通知
        getMsg() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/TongZhiList')
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.msgList = res.data.content;
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    _this.$message.warning('请刷新页面，稍后再试！');
                    console.log(error);
                });
        },
        getNum() {
            const _this = this;
            _this.$axios
                .post('/task/taskxq', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    projectname: _this.$store.state.projectInfo.pname,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.taskNum = res.data.list;
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getMsg();
        this.getProjectList();
        this.getProjectInfo();
        this.getNum();
    },
    created() {
        this.$utils.checkding();
        this.getUserPower();
    },
    computed: {
        projectData() {
            return this.$store.state.projectInfo;
        }
    },
    watch: {
        projectData: {
            handler(val, oldVal) {
                if (oldVal) {
                    this.getProjectList();
                    this.getProjectInfo();
                    this.getUserPower();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
<style lang="less">
.anchor-point {
    flex-basis: 100%;
    display: flex;
    .scroll-content {
        width: 100%;
        min-width: 1000px;
        .scroll-item {
            width: 96%;
            margin: 0 auto;
            p {
                font-size: 16px;
            }
            .appxmtj {
                display: flex;
                justify-content: space-between;
                > div {
                    width: 49.5%;
                }
                > div:nth-child(1) {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                }
                > div:nth-child(2) {
                    background-color: #fff;
                    border-radius: 10px;
                }
                .project-title {
                    display: flex;
                    justify-content: space-between;
                    height: 50px;
                    line-height: 50px;
                    border-bottom: 1px solid #efefef;
                    padding: 0 20px;
                }
            }
            .workbenpro {
                max-height: 390px;
                .prolist {
                    padding: 0 10px;
                }
            }
            .el-table {
                thead {
                    tr {
                        background-color: #edf0f5;
                    }
                }
            }
        }
        .line {
            color: #9ea0a3;
            text-align: center;
            margin: 30px 0;
            font-size: 20px;
            font-family: 'SourceHanSansCN-Light';
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 0px;
            color: #9ea0a3;
        }
        .xmtj {
            p {
                height: 30px;
                line-height: 30px;
                font-size: 20px;
                padding: 10px 0;
                padding-left: 10px;
                border-bottom: 1px solid #ddd;
            }
            .xmtjLeft {
                width: 33%;
                background-color: #fff;
                border-radius: 10px;
                #pei {
                    width: 100%;
                    height: 92%;
                }
            }

            .xmtjRight {
                width: 66%;
                height: 100%;
                border-radius: 10px;
                background-color: #fff;
                overflow: hidden;
                .el-table {
                    height: 92%;
                }
            }
        }
        .zstj {
            p {
                height: 30px;
                line-height: 30px;
                font-size: 20px;
                padding: 10px 0;
                padding-left: 10px;
                border-bottom: 1px solid #ddd;
            }
            .zstjLeft {
                width: 66%;
                border-radius: 10px;
                background-color: #fff;
                .el-tabs {
                    font-size: 20px;
                    .el-tabs__header {
                        div {
                            font-size: 20px;
                        }
                        .el-tabs__nav-scroll {
                            padding: 0 10px;
                            .el-tabs__nav {
                                padding: 5px 0;
                                .el-tabs__item {
                                    font-size: 20px;
                                }
                            }
                        }
                    }
                }
                .el-table {
                    height: 92%;
                }
            }

            .zstjRight {
                width: 33%;
                height: 100%;
                border-radius: 10px;
                background-color: #fff;
                #pei {
                    width: 100%;
                    height: 92%;
                }
            }
        }
        #caigou {
            p {
                height: 30px;
                line-height: 30px;
                font-size: 20px;
                padding: 10px 0;
                padding-left: 10px;
                border-bottom: 1px solid #ddd;
            }
            .caigouLeft {
                width: 33%;
                border-radius: 10px;
                background-color: #fff;
                .el-tabs {
                    font-size: 20px;
                    .el-tabs__header {
                        div {
                            font-size: 20px;
                        }
                        .el-tabs__nav-scroll {
                            padding: 0 10px;
                            .el-tabs__nav {
                                padding: 5px 0;
                                .el-tabs__item {
                                    font-size: 20px;
                                }
                            }
                        }
                    }
                }
                .el-table {
                    height: 92%;
                }
            }

            .caigouRight {
                width: 66%;
                height: 100%;
                border-radius: 10px;
                background-color: #fff;
                #pei {
                    width: 100%;
                    height: 92%;
                }
            }
        }
        #xiangmu {
            font-size: 16px;
        }
    }
    .operation-btn {
        width: 280px;
        height: 90vh;
        background-color: #fff;
        > div {
            font-size: 16px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
            padding: 0 20px;
            display: flex;

            .rightWord {
                // padding-left: 5%;
                margin-left: 30px;
            }
            img {
                vertical-align: middle;
            }
        }
        .activeClass {
            color: #ff943e;
            border-right: 1px solid #ff943e;
            background-color: #f6f6f6;
        }
    }
    .kuai {
        width: 46%;
        // margin: 10px 30px 15px 0;
        border-radius: 10px;
        margin-bottom: 20px;
        background-color: #fff;
        > div {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 40px 0;
        }
        .kuai-two {
            width: 90px;
            margin-left: 20px;
        }
        .kuai-right {
            margin-left: 20px;
            .total {
                margin-bottom: 30px;
            }
        }
    }
}

.workbench {
    display: flex;
    justify-content: space-between;
}
.content-right {
    margin-top: 20px;
    width: 21%;
    height: 370px;
    position: relative;
}
.content1 {
    margin-top: 20px;
    width: 70%;

    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px 0;
    > div {
        padding: 0 40px;
    }
}

.content-one {
    display: flex;
    width: 100%;
    justify-content: space-between;
    /* margin: 20px 0px; */
}
.content-one > div {
    position: relative;
    width: 22%;
    height: 194px;
    background-color: #409eff;
    border-radius: 10px;
    margin-top: 24px;
    > div {
        padding: 0 10px;
    }
}
.wtitle {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eef5f8;
    height: 70px;
    line-height: 70px;
    font-size: 18px;
}
.content-text {
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
}
.db-title {
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 18px;
    font-weight: blod;
    align-items: center;
}
.tite-numb {
    margin-top: 02px;
}
.content-one > div .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    border-radius: 0px 0px 10px 10px;
    opacity: 0.2;
    text-align: right;
    display: block;
    font-size: 14px;
    cursor: pointer;
}

.bottom-four {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    background-color: #409eff;
    border-radius: 10px 10px 0px 0px;
    font-size: 18px;
    letter-spacing: 0px;
    color: #ffffff;
}
.text-center {
    margin-bottom: 20px;
}
.four-text {
    color: #999d99;
    border-radius: 10px;
    font-size: 18px;
    background-color: #ffffff;
    height: 240px;
    padding: 20px 20px;
    position: relative;
    overflow: hidden;
}
.center-tile {
    display: flex;
}
.center-tile span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #f58205;
    border-radius: 50%;
    margin: 4px 10px 0px 0px;
}
.text-box {
    padding-left: 50px;
    font-size: 16px;
}
.text-box p {
    margin-top: 8px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 8;
}
.Imga-W {
    width: 59px;
    height: 73px;
}
.more {
    position: absolute;
    top: 250px;
    right: 0;
    font-size: 16px;
    color: #409eff;
    cursor: pointer;
}

.prolist {
    // height: 250px;
    // overflow: auto;
    .manage-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 92%;
        margin: 20px auto;
        height: 25px;
        padding: 18px;
        background-color: #f7f7f7;
        position: relative;
        border-radius: 10px;
        .title {
            display: inline-block;
            width: 300px;
            margin-left: 50px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        img {
            width: 48px;
            height: 42px;
        }
    }
    .manageright {
        display: flex;
        .progress-box {
            width: 200px;
        }
    }
}
</style>
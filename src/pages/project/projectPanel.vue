<template>
    <div id="projectPanel">
        <div>
            <div class="bg">
                <div class="topTitle">
                    <div class="kuai">
                        <div>
                            <img
                                src="../../assets/project/c.png"
                                class="kuai-two"
                            />
                        </div>
                        <div>
                            <div class="total">
                                <span>项目总数(个数):</span>
                                <span
                                    style="color: #409eff; font-size: 32rpx"
                                    >{{ Sum }}</span
                                >
                            </div>
                            <div>
                                <span>造价总额(万元):</span>
                                <span
                                    style="
                                        color: #fb8103;
                                        font-size: 32rpx;
                                        margin-left: 0.1rem;
                                    "
                                    >{{ SumMoney }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="kuai">
                        <div>
                            <img
                                src="../../assets/project/zj.png"
                                class="kuai-two"
                            />
                        </div>
                        <div>
                            <div class="total">
                                <span>在建项目(个数):</span>
                                <span
                                    style="color: #409eff; font-size: 32rpx"
                                    >{{ construction }}</span
                                >
                            </div>
                            <div>
                                <span>造价总额(万元):</span>
                                <span
                                    style="
                                        color: #fb8103;
                                        font-size: 32rpx;
                                        margin-left: 0.1rem;
                                    "
                                    >{{ constructionMoney }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="kuai">
                        <div>
                            <img
                                src="../../assets/project/xz.png"
                                class="kuai-two"
                            />
                        </div>
                        <div>
                            <div class="total">
                                <span>本年新增(个数):</span>
                                <span
                                    style="color: #409eff; font-size: 32rpx"
                                    >{{ newly }}</span
                                >
                            </div>
                            <div>
                                <span>造价总额(万元):</span>
                                <span
                                    style="
                                        color: #fb8103;
                                        font-size: 32rpx;
                                        margin-left: 0.1rem;
                                    "
                                    >{{ newlyMoney }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <div class="kuai">
                        <div>
                            <img
                                src="../../assets/project/jg.png"
                                class="kuai-two"
                            />
                        </div>
                        <div>
                            <div class="total">
                                <span>本年竣工(个数):</span>
                                <span
                                    style="color: #409eff; font-size: 32rpx"
                                    >{{ present }}</span
                                >
                            </div>
                            <div>
                                <span>造价总额(万元):</span>
                                <span
                                    style="
                                        color: #fb8103;
                                        font-size: 32rpx;
                                        margin-left: 0.1rem;
                                    "
                                    >{{ presentMoney }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comeSearch">
                    <el-form ref="form" :model="searchForm" label-width="100px">
                        <div class="searchLeft">
                            <div class="searchInput">
                                <el-input
                                    placeholder="请输入项目简称"
                                    prefix-icon="el-icon-search"
                                    v-model="searchForm.name"
                                    @keyup.enter.native="searchClick"
                                ></el-input>
                            </div>
                            <el-form-item class="searchTime" label="开始时间：">
                                <el-date-picker
                                    v-model="searchForm.starttime"
                                    :picker-options="pickerStart"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item class="searchTime" label="结束时间：">
                                <el-date-picker
                                    v-model="searchForm.endtime"
                                    :picker-options="pickerEnd"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="searchRight">
                            <el-button type="primary" round @click="searchClick"
                                >搜索</el-button
                            >
                        </div>
                    </el-form>
                </div>

                <div class="content">
                    <div class="panelContent">
                        <div class="panelList" v-if="projectList.length > 0">
                            <div
                                class="progress"
                                v-for="(item, index) in projectList"
                                :key="index"
                                @click="goInfo(item.id)"
                            >
                                <img
                                    class="biao"
                                    src="../../assets/workbench/chj.png"
                                    v-if="item.beian == '筹建'"
                                />
                                <img
                                    class="biao"
                                    src="../../assets/workbench/zaij.png"
                                    v-else-if="item.beian == '在建'"
                                />
                                <img
                                    class="biao"
                                    src="../../assets/workbench/tingj.png"
                                    v-else-if="item.beian == '停工'"
                                />
                                <img
                                    class="biao"
                                    src="../../assets/workbench/junj.png"
                                    v-else-if="item.beian == '竣工'"
                                />
                                <img
                                    class="biao"
                                    src="../../assets/workbench/zhongj.png"
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
                                        <div>总工期：{{ item.zongday }}天</div>
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
                        <div
                            v-else
                            style="text-align: center; padding: 0.3rem 0"
                        >
                            <img
                                src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/NG4ZDG6eBM1600655909495.jpg"
                                alt
                            />
                            <p style="font-size: 0.16rem">暂时还没有数据哦</p>
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
            </div>
        </div>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'projectPanel',
    data() {
        return {
            projectList: [],
            pageTotal: '',
            pagesize: 6,
            currentPage: 1,
            SumMoney: '',
            Sum: '',
            constructionMoney: '',
            construction: '',
            newly: '',
            newlyMoney: '',
            presentMoney: '',
            present: '',
            searchForm: {
                name: '',
                starttime: '',
                endtime: ''
            }
        };
    },

    methods: {
        goInfo(id) {
            this.$router.push({
                path: 'projectInfo',
                query: { id: id }
            });
        },
        searchClick() {
            this.currentPage = 1;
            this.getPanelList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getPanelList();
        },
        handleClose() {},
        //项目列表
        getPanelList() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectList', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin,
                    name: _this.searchForm.name,
                    start: _this.searchForm.starttime,
                    stop: _this.searchForm.endtime,
                    current_page: _this.currentPage,
                    city: _this.searchForm.city,
                    type: '3',
                    num: _this.pagesize
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.pageTotal = res.data.content.total;
                        _this.projectList = res.data.content.list;
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
            _this.getPanelList();
        },
        //获取我的项目信息
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
        this.getPanelList();
    },
    created() {
        this.getProjectInfo();
        this.$utils.checkding();
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
        projectList: {
            handler(val, oldVal) {
                if (val.length > 0) {
                    if (!this.$store.state.projectInfo.pid) {
                        this.$store.commit(
                            'setProjectName',
                            this.projectList[0].pcontent
                        );
                        this.$store.commit(
                            'setProjectId',
                            this.projectList[0].id
                        );
                        this.$store.commit(
                            'setProjectPurl',
                            this.projectList[0].xmurl
                        );
                        this.$store.commit(
                            'setPerctentage',
                            this.projectList[0].percentage
                        );
                        this.$store.commit('setPTag', this.projectList[0].ptag);
                    }
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style lang="less">
#projectPanel {
    width: 16.4rem;
    margin: 0 auto;
    > div {
        width: 96%;
        display: flex;
        flex-direction: column;
        margin: 0.2rem auto;
        // background-color: #fff;
    }
    .xg {
        width: 0.2rem;
        height: 0.2rem;
        margin-left: 0.3rem;
    }
    span {
        font-size: 0.14rem;
    }
    .edit {
        margin: 0 0.2rem;
    }

    .bg {
        // padding: 0 0.1rem;
        .addNew {
            font-size: 20px;
            height: 40px;
            line-height: 40px;
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
        }
        .content {
            font-size: 0.2rem;
            padding: 10px;
            background-color: #fff;
        }
        #middle {
            display: flex;

            margin-left: 0.3rem;
            .middle-search {
                width: 8rem;
                margin-right: 0.3rem;
                // vertical-align:middle;
                // height: 0.8rem;
            }
        }
        .bj {
            display: flex;

            .el-form-item {
                margin: 0.15rem;
                width: 100%;
            }
        }
    }
    .el-dialog {
        width: 500px;
        .el-dialog__header {
            font-size: 18px;
            .el-dialog__title {
                font-size: 18px;
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
    .project-content {
        margin-top: 0.2rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        font-size: 0.2rem;
        padding-top: 0.2rem;
    }
    .project-content > div {
        width: 21%;

        background-color: #f5f5f5;
        height: 1.5rem;

        border-radius: 0.1rem;
    }
    .kuai {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .kuai-two {
            width: 0.9rem;
            margin-left: 0;
        }
    }
    .total {
        margin-bottom: 0.3rem;
    }

    .table {
        width: 98%;
        margin: 0 auto;
        border-color: #d5d5d5;
        border-collapse: collapse;
        border: 1;
    }
    .search-btn {
        width: 5%;
    }
}
</style>


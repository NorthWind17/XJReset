<template>
    <div id="applicationOrder">
        <div class="main">
            <div class="content">
                <div class="searchMlist">
                    <div
                        v-if="taskMouldList.length > 0"
                        v-for="(item, index) in taskMouldList"
                    >
                        <div class="sebor">
                            <img :src="item.tmpimg" alt="" />
                            <div class="sepop">
                                <div>
                                    <el-tooltip
                                        content="启用"
                                        placement="top"
                                        v-if="item.type == 0"
                                    >
                                        <i
                                            class="el-icon-unlock"
                                            @click="unlockT(item)"
                                        ></i>
                                    </el-tooltip>
                                    <el-tooltip
                                        content="禁用"
                                        placement="top"
                                        v-else
                                    >
                                        <i
                                            class="el-icon-lock"
                                            @click="lockT(item)"
                                        ></i>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                        <p>{{ item.tmpname }}</p>
                        <img
                            v-if="item.type == 0"
                            class="warnImg"
                            src="../../assets/task/warn.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            taskMouldList: []
        };
    },
    methods: {
        //获取列表
        getList() {
            const _this = this;
            _this.$axios
                .post('/task/wholetmp', {
                    corp_id: _this.$store.state.cid
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.taskMouldList = res.data.content.list;
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        unlockT(item) {
            const _this = this;
            _this.$axios
                .post('/task/tmpStart_stop', {
                    corp_id: _this.$store.state.cid,
                    id: item.id,
                    type: item.type
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.getList();
                        _this.$message({
                            type: 'success',
                            message: '启用成功',
                            duration: 1500
                        });
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        lockT(item) {
            const _this = this;
            _this.$axios
                .post('/task/tmpStart_stop', {
                    corp_id: _this.$store.state.cid,
                    id: item.id,
                    type: item.type
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.getList();
                        _this.$message({
                            type: 'success',
                            message: '禁用成功',
                            duration: 1500
                        });
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
        this.getList();
    }
};
</script>
<style lang="less" scoped>
#applicationOrder {
    .content {
        padding: 0.2rem 0.1rem 0.4rem 0.1rem;
        .searchMlist {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            margin-bottom: 0.2rem;
            font-size: 0.16rem;
            > div {
                // margin: 0 0.06rem 0.06rem 0.06rem;
                margin: 0 0.24rem 0.2rem 0.24rem;
                cursor: pointer;
                padding: 0.12rem;
                border: 1px dashed #409eff;
                position: relative;
                .sebor {
                    width: 1rem;
                    height: 1rem;
                    border: 1px solid #d6d6d6;
                    border-radius: 50%;
                    position: relative;
                    overflow: hidden;
                    margin: 0 auto;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .sepop {
                        display: none;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        text-align: center;
                        color: #fff;
                        top: 0;
                        line-height: 1rem;
                        background-color: rgba(0, 0, 0, 0.5);
                        i {
                            font-size: 24px;
                        }
                    }
                }
                p {
                    width: 120px;
                    margin-top: 0.08rem;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .warnImg {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
            // > div:hover .sebor {
            //     border: 2px solid #409eef;
            //     // border-color: #409eef;
            // }
            > div:hover .sepop {
                display: block;
            }
        }
    }
}
</style>
<template>
    <div id="applicationPower">
        <div class="main">
            <div class="content">
                <div class="appPC">
                    <div class="apcS">
                        <el-select
                            v-model="searchValue"
                            clearable
                            placeholder="请选择权限类型"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-button type="primary" round @click="searchClick"
                            >搜索</el-button
                        >
                    </div>
                    <el-popover
                        placement="bottom"
                        trigger="hover"
                        v-model="visible"
                    >
                        <div style="text-align: right; margin: 0">
                            <el-button
                                type="primary"
                                plain
                                round
                                @click="addPower(1)"
                                >添加主管理员</el-button
                            >
                            <el-button
                                type="primary"
                                plain
                                round
                                @click="addPower(2)"
                                >添加子管理员</el-button
                            >
                            <el-button
                                type="primary"
                                plain
                                round
                                @click="addPower(3)"
                                >添加任务管理员</el-button
                            >
                            <el-button
                                type="primary"
                                plain
                                round
                                @click="addPower(5)"
                                >添加日志管理员</el-button
                            ><el-button
                                type="primary"
                                plain
                                round
                                @click="addPower(4)"
                                >添加资料管理员</el-button
                            >
                        </div>
                        <el-button type="primary" slot="reference"
                            >添加</el-button
                        >
                    </el-popover>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="姓名">
                        <template slot-scope="scope">
                            <div class="tbPic">
                                <img
                                    v-if="scope.row.avatar"
                                    :src="scope.row.avatar"
                                    alt=""
                                />
                                <span v-else>{{
                                    scope.row.name.length <= 2
                                        ? scope.row.name
                                        : scope.row.name.substr(
                                              scope.row.name.length - 2,
                                              2
                                          )
                                }}</span>
                                <div>{{ scope.row.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="power"
                        label="权限"
                        :formatter="fortStatus"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="操作"
                        width="100"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click="deleteUser(scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
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
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
    data() {
        return {
            visible: false,
            searchValue: '',
            total: '',
            pagesize: 10,
            currentPage: 1,
            tableData: [],
            options: [
                { label: '主管理员', value: 1 },
                { label: '子管理员', value: 2 },
                { label: '任务管理员', value: 3 },
                { label: '资料管理员', value: 4 },
                { label: '日志管理员', value: 5 }
            ],
            selectUser: [],
            selectType: 1
        };
    },

    methods: {
        fortStatus(row, column) {
            switch (row.rank) {
                case '1':
                    return '主管理员';
                    break;
                case '4':
                    return '资料管理员';
                    break;
                case '2':
                    return '子管理员';
                    break;
                case '3':
                    return '任务管理员';
                    break;
                case '5':
                    return '日志管理员';
                    break;
            }
        },
        deleteUser(row) {
            const that = this;
            that.$axios
                .post('/task/DeleteRole', {
                    corp_id: that.$store.state.cid,
                    cuserid: that.$store.state.userInfo.uid,
                    buserid: row.userid,
                    rank: row.rank
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        that.$message({
                            message: res.data.msg,
                            type: 'success',
                            duration: 1500
                        });
                        that.getList();
                    } else {
                        that.$message({
                            message: res.data.msg,
                            type: 'warning',
                            duration: 1500
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addPower(type) {
            const that = this;
            that.$utils.checkding();
            that.selectType = type;
            that.visible = false;
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
                        that.selectUser = result.users;
                        that.addUser();
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
        addUser() {
            const that = this;
            that.$axios
                .post('/task/CreatedRole', {
                    corp_id: that.$store.state.cid,
                    cuserid: that.$store.state.userInfo.uid,
                    buserid: that.selectUser,
                    rank: that.selectType
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        that.getList();
                        that.$message({
                            message: res.data.msg,
                            type: 'success',
                            duration: 1500
                        });
                    } else {
                        that.$message({
                            message: res.data.msg,
                            type: 'warning',
                            duration: 1500
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        searchClick() {
            this.currentPage = 1;
            this.getList();
        },
        getList() {
            this.$axios
                .post('/task/RoleList', {
                    corp_id: this.$store.state.cid,
                    rank: this.searchValue,
                    current_page: this.currentPage
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.total = res.data.content.total;
                        this.tableData = res.data.content.list;
                        if (this.total > 0 && this.tableData.length < 1) {
                            this.currentPage = res.data.content.page;
                            this.getList();
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    computed: {},
    created() {},
    mounted() {
        this.$utils.checkding();
        this.getList();
    }
};
</script>
<style lang="less" >
#app {
    .app-bottom {
        height: 90vh;
    }
}

#applicationPower {
    .content {
        padding: 20px 10px 0 10px;
        .appPC {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            .apcS {
                display: flex;
                justify-content: flex-start;
                .el-button {
                    margin-left: 20px;
                }
            }
        }
        .tbPic {
            display: flex;
            img,
            span {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 20px;
            }
            span {
                background-color: #409eef;
                color: #fff;
                text-align: center;
                line-height: 40px;
            }
            div {
                line-height: 40px;
            }
        }
    }
}
</style>
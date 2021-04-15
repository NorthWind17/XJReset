<template>
    <div id="commonProject">
        <div style="margin-bottom: 30px">
            <div style="display: flex">
                <el-input
                    placeholder="请输入名称"
                    v-model="conSearch"
                    class="input-with-select"
                >
                    <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searchCon"
                    ></el-button>
                </el-input>
                <el-select
                    v-model="ptype"
                    @change="selectP"
                    filterable
                    clearable
                    placeholder="请选择项目类型"
                >
                    <el-option
                        v-for="item in projectType"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="basicComon">
            <el-table
                :data="houseList"
                :header-cell-style="tableHeaderClass"
                :cell-style="tableRowClass"
                border
                height="500"
                style="width: 100%"
                highlight-current-row
                @current-change="handleRChange"
            >
                <el-table-column width="50px">
                    <template slot-scope="scope">
                        <el-checkbox
                            @change="checkChange($event, scope.row)"
                            v-model="scope.row.checked"
                        />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="项目编号"
                    align="center"
                    show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="项目名称"
                    align="center"
                    show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="project_status"
                    label="项目状态"
                    align="center"
                    show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    align="center"
                    show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                    prop="stand_termer"
                    label="立项人"
                    align="center"
                    show-overflow-tooltip="true"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isCloseP: Number
    },
    data() {
        return {
            AbasicList: [],
            currentPage: 1,
            total: '',
            pagesize: 10,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            houseList: [],
            conSearch: '',
            listNodeID: '0',
            multipleSelection: [],
            projectType: [],
            ptype: '',
            currentRow: null
        };
    },
    methods: {
        checkChange(event, row) {
            row.checked = !row.checked;
            this.$emit('listenChild', row.name);
        },
        handleRChange(row) {
            this.houseList.forEach((item) => {
                if (item.id !== row.id) {
                    item.checked = false;
                } else {
                    item.checked = true;
                }
            });
            this.houseList = JSON.parse(JSON.stringify(this.houseList));
            this.currentRow = row;
            this.$emit('listenChild', row.name);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        searchCon() {
            this.currentPage = 1;
            this.getList();
        },
        selectP(val) {
            this.currentPage = 1;
            this.getList();
        },
        //获取列表
        getList() {
            this.$axios
                .post('/project/projectInfoRegisterList', {
                    page: this.currentPage,
                    number: 10,
                    start_plan_start_riqi: '',
                    end_plan_start_riqi: '',
                    stand_termer: '',
                    start_plan_end_riqi: '',
                    end_plan_end_riqi: '',
                    name: this.conSearch,
                    stalker: '',
                    construction_unit: '',
                    type: this.ptype,
                    project_status: '中标',
                    shenpi: 7,
                    p_number: ''
                })
                .then((res) => {
                    if (res.data.code == 1) {
                        this.total = res.data.count;
                        this.houseList = res.data.data;
                        if (this.total > 0 && this.houseList.length < 1) {
                            this.currentPage = res.data.page_number;
                            this.getList();
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg,
                            duration: 1500
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    created() {
        this.projectType = this.$utils.utilProjectType();
        this.getList();
    },
    mounted() {},
    watch: {
        isCloseP: {
            handler(newVal) {
                // this.$nextTick(() => {
                //     this.$refs.multipleTable.clearSelection();
                // });
            },
            immediate: true
        }
    }
};
</script>
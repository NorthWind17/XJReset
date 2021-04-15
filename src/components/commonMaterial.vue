<template>
    <div id="commonMateRial">
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
            </div>
        </div>
        <div class="basicCreate">
            <div class="bcLeft">
                <el-tree
                    :data="AbasicList"
                    :props="defaultProps"
                    :default-expand-all="true"
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    @node-click="handleClickList"
                ></el-tree>
            </div>
            <div class="bcRight">
                <el-table
                    :data="houseList"
                    :header-cell-style="tableHeaderClass"
                    :cell-style="tableRowClass"
                    border
                    height="547"
                    style="width: 100%"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column
                        prop="number"
                        label="物品编码"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="物品名称"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="type_name"
                        label="物品类型"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="unit"
                        label="单位"
                        align="center"
                        show-overflow-tooltip="true"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="tax_price"
                        label="含税售价（元）"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="规格型号"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column prop="color" label="颜色" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="brand"
                        label="品牌"
                        align="center"
                        show-overflow-tooltip="true"
                    >
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[10, 50, 100]"
                    layout="sizes,prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isClose: Number
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
            multipleSelection: []
        };
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.$emit('listenChild', val);
        },
        getBasicList() {
            this.$axios
                .post('/project/materialTypeList', {
                    name: ''
                })
                .then((res) => {
                    if (res.data.code == 1) {
                        this.AbasicList = [
                            {
                                id: '0',
                                pid: '0',
                                name: '物资类型',
                                children: res.data.data
                            }
                        ];
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleClickList(data) {
            this.listNodeID = data.id;
            this.currentPage = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        searchCon() {
            this.currentPage = 1;
            this.getList();
        },
        //获取列表
        getList() {
            this.$axios
                .post('/project/materialGoodsList', {
                    name: this.conSearch,
                    page: this.currentPage,
                    type: this.listNodeID,
                    number: this.pagesize
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
        this.getList();
        this.getBasicList();
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.multipleTable.clearSelection();
        });
    },
    watch: {
        isClose: {
            handler(newVal) {
                this.$nextTick(() => {
                    this.$refs.multipleTable.clearSelection();
                });
            },
            immediate: true
        }
    }
};
</script>
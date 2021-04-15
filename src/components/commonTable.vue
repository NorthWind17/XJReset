<template>
    <div id="commonTable">
        <el-table
            v-if="titleList.length > 0"
            :data="tpList"
            :header-cell-style="tableHeaderClass"
            :cell-style="tableRowClass"
            @row-click="checkList"
            @header-dragend="checkWidth"
            border
            ref="table"
            max-height="650"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
                v-for="(item, index) in titleList"
                :key="index"
                :prop="item.value"
                :label="item.label"
                :show-overflow-tooltip="true"
                align="center"
            >
            </el-table-column>
            <el-table-column label="审批状态" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == '2'" style="color: #67c23a"
                        >已同意</span
                    >
                    <span
                        v-else-if="scope.row.status == '1'"
                        style="color: #e6a23c"
                        >审批中</span
                    >
                    <span
                        v-else-if="scope.row.status == '3'"
                        style="color: #f56c6c"
                        >已拒绝</span
                    ><span v-else style="color: #409eff">外部数据</span>
                </template>
            </el-table-column>
            <div slot="append" v-if="isFooter == 1">
                <div :class="tpList.length > 0 ? '' : 'newTableAppendBorder'">
                    <div class="sum_footer xiaoji" ref="sum_xiaoji">
                        <div class="sum_footer_unit center">小计</div>
                        <div
                            v-for="(item, index) in footerNumList"
                            :key="index"
                            :class="
                                item.xj
                                    ? 'over_sum_text sum_footer_unit'
                                    : 'sum_footer_unit'
                            "
                        >
                            <el-tooltip
                                v-if="item.xj"
                                class="item"
                                effect="dark"
                                :content="item.xj"
                                placement="top"
                            >
                                <div>{{ item.xj }}</div>
                            </el-tooltip>
                        </div>
                        <div class="sum_footer_unit"></div>
                    </div>
                    <div class="sum_footer" ref="sum_heji">
                        <div class="sum_footer_unit center">合计</div>
                        <div
                            v-for="(item, index) in footerNumList"
                            :key="index"
                            :class="
                                item.hj
                                    ? 'over_sum_text sum_footer_unit'
                                    : 'sum_footer_unit'
                            "
                        >
                            <el-tooltip
                                v-if="item.hj"
                                class="item"
                                effect="dark"
                                :content="item.hj"
                                placement="top"
                            >
                                <div>{{ item.hj }}</div>
                            </el-tooltip>
                        </div>
                        <div class="sum_footer_unit"></div>
                    </div>
                </div>
            </div>
        </el-table>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'commonTable',
    props: {
        tpList: Array,
        titleList: Array,
        isFooter: Number,
        footerNumList: Array
    },
    data() {
        return {
            multSelectData: []
        };
    },
    methods: {
        //筛选
        handleSelectionChange(val) {
            this.multSelectData = val.map((item) => {
                if (!item.id) return '';
                return item.id;
            });
            this.$emit('listenChild', this.multSelectData);
        },
        adjustWidth() {
            const _this = this;
            _this.$nextTick(() => {
                let newW = document.getElementsByClassName(
                    'el-table__append-wrapper'
                )[0];
                _this.$utils.utilAdjustWidth(
                    _this.$refs.table,
                    newW,
                    _this.$refs.sum_xiaoji,
                    _this.$refs.sum_heji
                );
            });
        },
        tableHeaderClass({ row, rowIndex }) {
            return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;';
        },
        tableRowClass({ row, rowIndex }) {
            return 'color:#5f5f5f;padding:6px 0;';
        },
        checkWidth() {
            setTimeout(() => {
                this.adjustWidth();
            }, 200);
        },
        //查看审批
        checkList(row, column) {
            const _this = this;
            if (column.type != 'selection') {
                let newUrl = '';
                if (row.filename) {
                    newUrl = row.filename;
                } else {
                    newUrl = row.url;
                }
                dd.ready(function () {
                    dd.biz.util.openSlidePanel({
                        url: newUrl, //打开侧边栏的url
                        title: '详情', //侧边栏顶部标题
                        onSuccess: function (result) {},
                        onFail: function () {}
                    });
                });
            }
        }
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.$nextTick(() => {
                if (this.$refs.table) {
                    this.$refs.table.doLayout();
                }
                setTimeout(() => {
                    this.adjustWidth();
                }, 100);
            });
        });
    },
    watch: {
        tpList: {
            //深度监听，可监听到对象、数组的变化
            handler(val, oldVal) {
                setTimeout(() => {
                    this.adjustWidth();
                }, 500);
            }
        },
        titleList: {
            //深度监听，可监听到对象、数组的变化
            handler(val, oldVal) {
                setTimeout(() => {
                    this.adjustWidth();
                }, 500);
            }
        }
    }
};
</script>
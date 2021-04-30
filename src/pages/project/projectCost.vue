<template>
    <div id="projectCost">
        <div class="main">
            <div class="content">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="成本列表" name="first">
                        <div class="comeSearch">
                            <el-form ref="form" :model="payform" :inline="true">
                                <div class="searchLeft">
                                    <div class="slContent">
                                        <div class="searchInput">
                                            <el-input
                                                placeholder="请输入成本标题"
                                                prefix-icon="el-icon-search"
                                                v-model="payform.keyWord"
                                            ></el-input>
                                            <el-form-item>
                                                <el-button
                                                    type="primary"
                                                    round
                                                    @click="searchinfo"
                                                    >搜索</el-button
                                                ></el-form-item
                                            >
                                        </div>
                                        <div class="searchRight">
                                            <el-form-item>
                                                <el-button
                                                    type="primary"
                                                    @click="viewDraw()"
                                                    >新建</el-button
                                                >
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="srbContent">
                                        <el-form-item label="子项目：">
                                            <el-select
                                                v-model="payform.next"
                                                clearable
                                                filterable
                                                placeholder="请选择子项目"
                                                @change="nextChange"
                                            >
                                                <el-option
                                                    v-for="item in nextProject"
                                                    :label="item.zname"
                                                    :value="item.zid"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="成本类型：">
                                            <el-select
                                                v-model="payform.type"
                                                clearable
                                                filterable
                                                placeholder="请选择成本类型"
                                                @change="jtypeChange"
                                            >
                                                <el-option
                                                    v-for="item in BbasicList"
                                                    :label="item.name"
                                                    :value="item.name"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="审批流程：">
                                            <el-select
                                                v-model="payform.bstatus"
                                                clearable
                                                placeholder="请选择审批流程"
                                                @change="bsChange"
                                            >
                                                <el-option
                                                    v-for="item in basicLiuList"
                                                    :label="item.name"
                                                    :value="item.id"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item
                                            label="状态："
                                            class="srbcs"
                                        >
                                            <el-select
                                                v-model="payform.status"
                                                clearable
                                                placeholder="请选择状态"
                                                @change="schange"
                                            >
                                                <el-option
                                                    v-for="item in basicStatusList"
                                                    :label="item.name"
                                                    :value="item.id"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                        <el-table
                            :data="cwList"
                            @row-click="checkCome"
                            @header-dragend="checkWidth"
                            :header-cell-style="tableHeaderClass"
                            border
                            ref="appTable"
                            style="width: 100%"
                            max-height="800"
                        >
                            <el-table-column
                                prop="cbtitle"
                                label="成本标题"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="created"
                                label="发起日期"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="money"
                                label="成本金额"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="name"
                                label="发起人"
                                align="center"
                            ></el-table-column>
                            <!-- <el-table-column
                                prop="jibie"
                                label="成本等级"
                                align="center"
                            ></el-table-column> -->
                            <el-table-column
                                prop="type"
                                label="成本类型"
                                align="center"
                            ></el-table-column>
                            <el-table-column label="状态" align="center">
                                <template slot-scope="scope">
                                    <span
                                        v-if="scope.row.status == '0'"
                                        style="color: #909399"
                                        >已撤销</span
                                    >
                                    <span
                                        v-else-if="scope.row.status == '1'"
                                        style="color: #67c23a"
                                        >已同意</span
                                    >
                                    <span
                                        v-else-if="scope.row.status == '2'"
                                        style="color: #e6a23c"
                                        >审批中</span
                                    >
                                    <span v-else style="color: #f56c6c"
                                        >已拒绝</span
                                    >
                                </template>
                            </el-table-column>
                            <div slot="append">
                                <div class="sum_footer xiaoji" ref="sum_xiaoji">
                                    <div class="sum_footer_unit center">
                                        小计
                                    </div>
                                    <div class="sum_footer_unit"></div>
                                    <div class="sum_footer_unit over_sum_text">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="xiaoji"
                                            placement="top"
                                        >
                                            <div>{{ xiaoji }}</div>
                                        </el-tooltip>
                                    </div>
                                    <div class="sum_footer_unit"></div>
                                    <div class="sum_footer_unit"></div>
                                    <div class="sum_footer_unit"></div>
                                </div>
                                <div class="sum_footer" ref="sum_heji">
                                    <div class="sum_footer_unit center">
                                        合计
                                    </div>
                                    <div class="sum_footer_unit"></div>
                                    <div class="sum_footer_unit over_sum_text">
                                        <el-tooltip
                                            class="item"
                                            effect="dark"
                                            :content="heji"
                                            placement="top"
                                        >
                                            <div>{{ heji }}</div>
                                        </el-tooltip>
                                    </div>
                                    <div class="sum_footer_unit"></div>
                                    <div class="sum_footer_unit"></div>
                                    <div class="sum_footer_unit"></div>
                                </div>
                            </div>
                        </el-table>
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-sizes="[10, 50, 100, 200]"
                            :page-size="pagesize"
                            layout="sizes,prev, pager, next, jumper"
                            :total="total"
                        ></el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="统计分析" name="second">
                        <div class="qualityChart">
                            <!-- <div class="qualityChartTop">
                                <el-date-picker
                                    v-model="qcTime"
                                    type="month"
                                    placeholder="选择月"
                                    format="yyyy 年 MM 月"
                                    value-format="yyyy-MM"
                                >
                                </el-date-picker>
                                <el-button type="primary" @click="searchQC"
                                    >搜索</el-button
                                >
                            </div> -->
                            <div class="qchart">
                                <div
                                    v-if="activeName == 'second'"
                                    id="qualityLX"
                                    ref="QLX"
                                ></div>
                                <div
                                    v-if="activeName == 'second'"
                                    id="qualityDJ"
                                    ref="QDJ"
                                ></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="基础设置" name="third">
                        <div class="pb_third">
                            <el-button
                                type="primary"
                                round
                                @click="newAddBasic()"
                                >新建</el-button
                            >
                        </div>
                        <div class="projectBasic">
                            <el-collapse
                                v-model="basicActiveNames"
                                @change="handleChange"
                            >
                                <el-collapse-item
                                    title="基础类型"
                                    name="1"
                                    v-if="BbasicList.length > 0"
                                >
                                    <div>
                                        <el-tag
                                            v-for="list in BbasicList"
                                            :key="list.id"
                                            :closable="
                                                list.status == '1'
                                                    ? true
                                                    : false
                                            "
                                            @close="deleteTitleClick(list)"
                                            >{{ list.name }}</el-tag
                                        >
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item
                                    title="账户信息"
                                    name="2"
                                    v-if="tableData.length > 0"
                                >
                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%"
                                    >
                                        <el-table-column
                                            prop="name"
                                            align="center"
                                            show-overflow-tooltip="true"
                                            label="企业名称/个人名称"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="number"
                                            label="账号"
                                            align="center"
                                            show-overflow-tooltip="true"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="bank"
                                            label="开户行"
                                            align="center"
                                            show-overflow-tooltip="true"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            label="操作"
                                            width="140"
                                        >
                                            <template slot-scope="scope">
                                                <el-popconfirm
                                                    title="确定删除吗？"
                                                    @onConfirm="
                                                        deleteTitleClick(
                                                            scope.row
                                                        )
                                                    "
                                                >
                                                    <el-button
                                                        type="danger"
                                                        icon="el-icon-delete"
                                                        slot="reference"
                                                        size="medium"
                                                        >删除</el-button
                                                    >
                                                </el-popconfirm>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-drawer
                title="新建成本审批"
                :visible.sync="drawerVisible"
                direction="rtl"
                @close="drawClose('cComeform')"
                ref="contractDrawer"
            >
                <div class="cDrawerContent">
                    <el-form
                        :model="fDrawerForm"
                        :rules="fdFormRules"
                        ref="cComeform"
                        label-width="130px"
                    >
                        <el-form-item label="成本标题：" prop="sgtitle">
                            <el-input
                                v-model="fDrawerForm.sgtitle"
                                placeholder="请输入成本标题"
                            ></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="成本等级：" prop="jibie">
                            <el-select
                                v-model="fDrawerForm.jibie"
                                placeholder="请选择成本等级"
                            >
                                <el-option
                                    v-for="item in AbasicList"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="成本类型：" prop="type">
                            <el-select
                                v-model="fDrawerForm.type"
                                placeholder="请选择成本类型"
                            >
                                <el-option
                                    v-for="item in BbasicList"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成本金额：" prop="money">
                            <el-input-number
                                v-model="fDrawerForm.money"
                                controls-position="right"
                                :min="1"
                            ></el-input-number>
                        </el-form-item>
                        <el-form-item label="成本详情：" prop="sgcontent">
                            <el-input
                                type="textarea"
                                v-model="fDrawerForm.sgcontent"
                                placeholder="请输入成本详情"
                            ></el-input>
                        </el-form-item>

                        <div class="uploadPic">
                            <supload
                                ref="mychild"
                                :upImgList="upImgList"
                                :licenceImg="licenceImg"
                                :isShow="isShow"
                                @listenToChildEvent="show"
                            ></supload>
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
                                    v-for="(item, index) in fDrawerForm.fjurl"
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
                                        <div>
                                            <span style="color: red"
                                                >* &nbsp;&nbsp;</span
                                            >审批人
                                        </div>
                                        <p>请选择审批人</p>
                                    </div>
                                    <div class="addManeger">
                                        <div
                                            class="addMList"
                                            v-if="tagsData.length > 3"
                                        >
                                            <div class="mdnList">
                                                <div
                                                    class="mdren"
                                                    @click="openAllPeople"
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
                                            v-for="(
                                                item, index
                                            ) in tagsData.slice(0, 3)"
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
                                                        handleClose(item, index)
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
                                                    @click="addManyP(1)"
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
                                <div class="spList">
                                    <div>
                                        <div>抄送人</div>
                                        <p>请选择抄送人</p>
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
                                            v-for="(
                                                item, index
                                            ) in tagsPeopleData.slice(0, 3)"
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
                                <div class="shenpiFore">
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
            </el-drawer>
            <el-drawer
                :title="viewDrawTitle"
                :visible.sync="viewVisible"
                direction="rtl"
                @close="viewClose"
                ref="viewDrawer"
                class="viewdrawClass"
            >
                <div class="cDrawerContent">
                    <el-form
                        :model="fViewForm"
                        ref="cViewform"
                        label-width="130px"
                    >
                        <el-form-item label="成本标题：">
                            <div>{{ fViewForm.sgtitle }}</div>
                        </el-form-item>
                        <!-- <el-form-item label="成本等级：">
                            <div>{{ fViewForm.jibie }}</div>
                        </el-form-item> -->
                        <el-form-item label="成本类型：">
                            <div>{{ fViewForm.type }}</div>
                        </el-form-item>
                        <el-form-item label="成本金额：">
                            <div>{{ fViewForm.money }}</div>
                        </el-form-item>
                        <el-form-item label="成本详情：">
                            <div>{{ fViewForm.sgcontent }}</div>
                        </el-form-item>
                        <el-form-item label="图片：">
                            <div class="dingPicClass">
                                <div v-for="(item, index) in fViewForm.image">
                                    <img
                                        @click="lookimg(item)"
                                        :src="item"
                                        alt
                                    />
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="附件：">
                            <div class="dingFilesClass">
                                <div
                                    v-for="(item, index) in fViewForm.fjurl"
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
                                        <!-- <div class="fileIcon2">
                                            <i
                                                class="el-icon-error"
                                                @click="deleteFiles(index)"
                                            ></i>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </el-form-item>

                        <div class="shenpi">
                            <div>审批流程</div>
                            <div class="line">
                                <div class="spList">
                                    <div>
                                        <div>审批人</div>
                                        <p>请选择审批人</p>
                                    </div>
                                    <div class="addManeger">
                                        <div
                                            class="addMList"
                                            v-if="tagsData.length > 3"
                                        >
                                            <div class="mdnList">
                                                <div
                                                    class="mdren"
                                                    @click="openViewAll"
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
                                            v-for="(
                                                item, index
                                            ) in tagsData.slice(0, 3)"
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
                                            </div>
                                            <div class="mdnPlus">
                                                <i class="el-icon-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="spList">
                                    <div>
                                        <div>抄送人</div>
                                        <p>请选择抄送人</p>
                                    </div>
                                    <div class="addManeger">
                                        <div
                                            class="addMList"
                                            v-if="tagsPeopleData.length > 3"
                                        >
                                            <div class="mdnList">
                                                <div
                                                    class="mdren"
                                                    @click="openViewSend"
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
                                            v-for="(
                                                item, index
                                            ) in tagsPeopleData.slice(0, 3)"
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
                                            </div>
                                            <div class="mdnPlus">
                                                <i class="el-icon-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="shenpiThree">
                                    <span></span>
                                </div>
                                <div class="shenpiFore">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div class="demo-drawer__footer">
                            <div v-if="isSend">
                                <el-button
                                    type="primary"
                                    @click="viewSend(1)"
                                    :loading="loading"
                                    >同意</el-button
                                >
                                <el-button
                                    @click="viewSend(2)"
                                    :loading="loaded"
                                    >拒绝</el-button
                                >
                                <el-button
                                    @click="viewSend(3)"
                                    :loading="loadcan"
                                    >撤销</el-button
                                >
                                <el-button @click="viewClose">取消</el-button>
                            </div>
                        </div>
                    </el-form>
                </div>
            </el-drawer>
            <el-dialog
                title="全部审批人员"
                :append-to-body="true"
                :visible.sync="AllPeopleVisible"
                class="contractOpenPeopleDialog"
                :close-on-click-modal="false"
            >
                <div style="margin-bottom: 10px">
                    共有{{ tagsData.length }}人
                </div>
                <div class="showAllPeople">
                    <div
                        class="addMList"
                        v-for="(item, index) in tagsData"
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
                                @click="handleClose(item)"
                            ></i>
                        </div>
                        <div class="mdnPlus">
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
                    <div class="addMList addMListLast">
                        <div class="mdnList">
                            <div class="mdren" @click="addManyP(1)">
                                <span class="touxiang">
                                    <i class="el-icon-plus"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="全部抄送人员"
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
            </el-dialog>
            <el-dialog
                title="全部审批人员"
                :append-to-body="true"
                :visible.sync="viewAllVisible"
                class="contractOpenPeopleDialog viewOpen"
                :close-on-click-modal="false"
            >
                <div style="margin-bottom: 10px">
                    共有{{ tagsData.length }}人
                </div>
                <div class="showAllPeople">
                    <div
                        class="addMList"
                        v-for="(item, index) in tagsData"
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
                        </div>
                        <div class="mdnPlus">
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="全部抄送人员"
                :append-to-body="true"
                :visible.sync="viewSendVisible"
                class="contractOpenPeopleDialog viewOpen"
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
                        </div>
                        <div class="mdnPlus">
                            <i class="el-icon-plus"></i>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="添加基础设置"
                :visible.sync="addFormVisible"
                @close="titleCancel"
                width="600px"
            >
                <el-form
                    :model="basicAddForm"
                    label-width="130px"
                    :rules="basicAddFormRules"
                    ref="addEditForm"
                    label-position="right"
                    @submit.native.prevent
                >
                    <div>
                        <el-form-item
                            label="基础设置类型："
                            prop="type"
                            class="projectTypeSelect"
                        >
                            <el-radio-group
                                v-model="basicAddForm.type"
                                @change="radioChange"
                            >
                                <el-radio-button
                                    v-for="(item, index) in titleBtnList"
                                    :label="item.value"
                                    :key="index"
                                    >{{ item.name }}</el-radio-button
                                >
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            :label="
                                basicAddForm.type == 'e'
                                    ? '基础设置名称'
                                    : '企业/个人名称'
                            "
                            prop="content"
                        >
                            <el-input
                                v-model="basicAddForm.content"
                                maxlength="50"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="账号"
                            prop="number"
                            v-if="basicAddForm.type == 'h'"
                        >
                            <el-input
                                v-model="basicAddForm.number"
                                maxlength="50"
                            ></el-input>
                        </el-form-item>
                        <el-form-item
                            label="开户行"
                            prop="bank"
                            v-if="basicAddForm.type == 'h'"
                        >
                            <el-input
                                v-model="basicAddForm.bank"
                                maxlength="50"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button
                            type="primary"
                            :loading="loaded"
                            @click="titleSave('addEditForm')"
                            >保存</el-button
                        >
                        <el-button @click="titleCancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
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
            <el-dialog
                title="通讯录"
                :visible.sync="pickerVisible"
                :append-to-body="true"
                :show-close="false"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                width="850px"
            >
                <peoplePick
                    v-if="peopleIsShow"
                    :pickerNum="pickerNum"
                    @listenPicker="pickerSelect"
                ></peoplePick>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import supload from '../../components/dingUpload';
import peoplePick from '../../components/complexPicker.vue';
const echarts = require('echarts');
export default {
    name: 'projectCost',
    components: { supload, peoplePick },
    data() {
        return {
            tableData: [],
            selectAddForm: {
                zid: '',
                name: this.$store.state.projectInfo.pname
            },
            noNextProject: [],
            appVisible: false,
            nextProject: [],
            qcTime: '',
            peopleIsShow: true,
            basicLiuList: [
                { name: '我发起的', id: 1 },
                { name: '抄送我的', id: 2 },
                { name: '我审批的', id: 3 }
            ],
            basicStatusList: [
                // { name: '已撤销', id: 1 },
                { name: '已同意', id: 2 },
                { name: '已拒绝', id: 4 },
                { name: '审批中', id: 3 }
            ],
            pickerVisible: false,
            clickType: 1,
            pickerNum: 9,
            fdFormRules: {
                sgtitle: [
                    {
                        required: true,
                        message: '请输入成本标题',
                        trigger: 'blur'
                    }
                ],
                // jibie: [
                //     {
                //         required: true,
                //         message: '请选择成本等级',
                //         trigger: ['blur', 'change']
                //     }
                // ],
                type: [
                    {
                        required: true,
                        message: '请选择成本类型',
                        trigger: ['blur', 'change']
                    }
                ],
                money: [
                    {
                        required: true,
                        message: '请输入成本金额',
                        trigger: ['blur', 'change']
                    }
                ],
                sgcontent: [
                    {
                        required: true,
                        message: '请输入成本详情',
                        trigger: 'blur'
                    }
                ]
            },
            basicAddFormRules: {
                number: [
                    {
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }
                ],
                bank: [
                    {
                        required: true,
                        message: '请输入开户行',
                        trigger: 'blur'
                    }
                ],
                content: [
                    {
                        required: true,
                        message: '名称不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            basicAddForm: {
                content: '',
                bank: '',
                number: '',
                type: 'e',
                xmid: this.$store.state.projectInfo.pid,
                corp_id: this.$store.state.cid
            },
            addFormVisible: false,
            titleBtnList: [
                { name: '类型', value: 'e' },
                { name: '账户信息', value: 'h' }
            ],
            AbasicList: [], //成本成本等级
            BbasicList: [], //成本成本类别
            basicActiveNames: ['1', '2'],
            activeName: 'first',
            fViewForm: {
                name: '',
                fjurl: [],
                image: [],
                spuser: [],
                csuser: [],
                money: '',
                sgcontent: '',
                xmid: this.$store.state.projectInfo.pid,
                corp_id: this.$store.state.cid
            },
            viewVisible: false,
            isSend: false,
            viewDrawTitle: '查看',
            viewAllVisible: false,
            viewSendVisible: false,
            bankcount: [],
            datalist: [],
            cwList: [],
            FCTypeList: [
                { name: '待我审批', value: '1', num: 0 },
                { name: '我已审批', value: '2', num: 0 },
                { name: '我发起的审批', value: '3', num: '' },
                { name: '抄送我的', value: '4', num: '' }
            ],
            drawerVisible: false,
            activeConIndex: 0,
            payform: {
                keyWord: '',
                type: '',
                status: '',
                bstatus: '',
                next: ''
            },
            departmentList: [],
            projectList: [],
            selectFTypeList: [],
            tagsData: [],
            tagsPeopleData: [],
            fDrawerForm: {
                sgtitle: '',
                xmid: this.$store.state.projectInfo.pid,
                fjurl: [],
                image: [],
                spuser: [],
                csuser: [],
                type: '',
                money: '',
                // jibie: '',
                sgcontent: '',
                corp_id: this.$store.state.cid,
                user: this.$store.state.userInfo.uid
            },
            AllPeopleVisible: false,
            AllSendPeopleVisible: false,
            loading: false,
            agentid: '',
            dingPicList: [],
            upImgList: [],
            licenceImg: [],
            isShow: ['1'],
            typeId: '1',
            total: '',
            pagesize: 10,
            currentPage: 1,
            loaded: false,
            loadcan: false,
            checkId: '',
            LXData: [],
            DJData: [],
            timer: null,
            totalMoney: 0,
            xiaoji: 0,
            heji: 0
        };
    },
    methods: {
        adjustWidth() {
            const _this = this;
            _this.$nextTick(() => {
                _this.$nextTick(() => {
                    let newW = document.getElementsByClassName(
                        'el-table__append-wrapper'
                    )[0];
                    _this.$utils.utilAdjustWidth(
                        _this.$refs.appTable,
                        newW,
                        _this.$refs.sum_xiaoji,
                        _this.$refs.sum_heji
                    );
                });
            });
        },
        radioChange(val) {
            this.basicAddForm.content = '';
            if (val == 'e') {
                this.basicAddForm.number = '';
                this.basicAddForm.bank = '';
            }
        },
        approvalCancel(formName) {
            this.appVisible = false;
            this.loaded = false;
            this.$refs[formName].resetFields();
        },
        //新建基础按钮
        approvalSave(formName) {
            const _this = this;
            _this.loaded = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/dingding/CreateTemplate', {
                            corp_id: _this.$store.state.cid,
                            tmpname: '成本审批',
                            xmid: _this.$store.state.projectInfo.pid,
                            zxmid: _this.selectAddForm.zid,
                            userid: _this.$store.state.userInfo.uid
                        })
                        .then((res) => {
                            let newUrl =
                                'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
                                _this.$store.state.cid +
                                '#/custom/?processCode=' +
                                res.data.process_code;
                            dd.ready(function () {
                                dd.biz.util.openLink({
                                    url: newUrl, //要打开链接的地址
                                    onSuccess: function (result) {
                                        /**/
                                    },
                                    onFail: function (err) {}
                                });
                            });
                            // dd.ready(function () {
                            //     dd.biz.util.openSlidePanel({
                            //         url: newUrl, //打开侧边栏的url
                            //         title: '发起成本审批', //侧边栏顶部标题
                            //         onSuccess: function (result) {},
                            //         onFail: function () {
                            //             setTimeout(() => {
                            //                 _this.getList();
                            //                 _this.$emit('updateN');
                            //                 // _this.$parent.fatherUpNum();
                            //             }, 5000);
                            //             setTimeout(() => {
                            //                 _this.getList();
                            //                 _this.$emit('updateN');
                            //                 // _this.$parent.fatherUpNum();
                            //             }, 10000);
                            //         }
                            //     });
                            // });
                            _this.appVisible = false;
                            _this.loaded = false;
                            _this.$refs[formName].resetFields();
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
        nextChange(val) {
            this.currentPage = 1;
            this.getList();
        },
        jtypeChange(val) {
            this.currentPage = 1;
            this.getList();
        },
        bsChange(val) {
            this.currentPage = 1;
            this.getList();
        },
        schange(val) {
            this.currentPage = 1;
            this.getList();
        },
        tableHeaderClass({ row, rowIndex }) {
            return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;';
        },
        searchQC() {
            console.log(this.qcTime);
            if (this.qcTime == null) {
                this.qcTime = '';
            }
        },
        doPie() {
            const _this = this;
            let mChart = echarts.init(document.getElementById('qualityLX')),
                DJChart = echarts.init(document.getElementById('qualityDJ'));

            mChart.clear();
            mChart.setOption({
                tooltip: {
                    trigger: 'item',
                    // formatter: '{a} <br/>{b} : {c} ({d}%)'
                    formatter: function (params) {
                        console.log('456++' + JSON.stringify(params));
                        return (
                            params.seriesName +
                            '<br/>' +
                            params.name +
                            ' : ' +
                            params.value +
                            ' (' +
                            params.percent +
                            '%)' +
                            '<br/>' +
                            '总数：' +
                            params.data.money
                        );
                    }
                },
                series: [
                    {
                        name: '成本类型统计',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: _this.LXData,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
            // DJChart.clear();
            // DJChart.setOption({
            //     tooltip: {
            //         trigger: 'item',
            //         formatter: '{a} <br/>{b} : {c} ({d}%)'
            //     },
            //     series: [
            //         {
            //             name: '成本等级统计',
            //             type: 'pie',
            //             radius: '55%',
            //             center: ['50%', '60%'],
            //             data: _this.DJData,
            //             emphasis: {
            //                 itemStyle: {
            //                     shadowBlur: 10,
            //                     shadowOffsetX: 0,
            //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //                 }
            //             }
            //         }
            //     ]
            // });
        },
        getPie() {
            this.$axios
                .post('/task/ChengBenTongJi', {
                    xmid: this.$store.state.projectInfo.pid,
                    userid: this.$store.state.userInfo.uid,
                    admin: this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        // console.log('7477++'+)
                        let newData = [];
                        let newChar = [];
                        // res.data.jibie.forEach((item) => {
                        //     let obj = {};
                        //     for (let i = 0; i <= res.data.jibie.length; i++) {
                        //         obj.value = item.count;
                        //         obj.name = item.name;
                        //     }
                        //     newData.push(obj);
                        // });
                        res.data.type.forEach((item) => {
                            let obj = {};
                            for (let i = 0; i <= res.data.type.length; i++) {
                                obj.value = item.count;
                                obj.name = item.name;
                                obj.money = item.money;
                            }
                            newChar.push(obj);
                        });
                        this.totalMoney = res.data.type[0].money;
                        this.DJData = newData;
                        this.LXData = newChar;
                        this.doPie();
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //删除基础设置
        deleteTitleClick(list, type) {
            this.$axios
                .post('/task/UpdateJichu', {
                    id: list.id,
                    type: 'delete'
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.BbasicList.splice(
                            this.BbasicList.indexOf(list),
                            1
                        );
                        this.getBasicList();
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg,
                            duration: 2000
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取基础设置列表
        getBasicList() {
            this.$axios
                .post('/task/JichuList', {
                    corp_id: this.$store.state.cid,
                    xmid: this.$store.state.projectInfo.pid,
                    type: 0
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        // this.AbasicList = res.data.content.a;
                        this.BbasicList = res.data.content.e;
                        this.tableData = res.data.content.h;
                    } else {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //新建基础设置
        newAddBasic() {
            this.addFormVisible = true;
            // dd.ready(function() {
            //     dd.biz.util.openSlidePanel({
            //         url:
            //             'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=dingea47c602975497f935c2f4657eb6378f#/custom/?processCode=PROC-17931ABD-AA8C-4213-AF52-D562CCA43770', //打开侧边栏的url
            //         title: '审批', //侧边栏顶部标题
            //         onSuccess: function(result) {},
            //         onFail: function() {}
            //     });
            // });
        },
        titleCancel() {
            this.addFormVisible = false;
            this.basicAddForm = {
                content: '',
                bank: '',
                number: '',
                type: 'e',
                xmid: this.$store.state.projectInfo.pid,
                corp_id: this.$store.state.cid
            };
        },
        //新建基础按钮
        titleSave(formName) {
            const _this = this;
            _this.loaded = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/CreatedJichu', _this.basicAddForm)
                        .then((res) => {
                            if (res.data.code == 200) {
                                _this.getBasicList();
                                _this.loaded = false;
                                _this.addFormVisible = false;
                                _this.$refs[formName].resetFields();
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'success',
                                    duration: '2000'
                                });
                            } else {
                                _this.loaded = false;
                                _this.$message({
                                    message: res.data.msg,
                                    type: 'error',
                                    duration: '2000'
                                });
                            }
                        })
                        .catch(function (error) {
                            _this.loaded = false;
                            console.log(error);
                        });
                } else {
                    _this.loaded = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleClick(tab) {
            if (tab.name == 'first') {
                this.currentPage = 1;
                this.getList();
            } else if (tab.name == 'second') {
                this.getPie();
            } else if (tab.name == 'third') {
                this.getBasicList();
            }
        },
        fortStatus(row, column) {
            switch (row.status) {
                case '0':
                    return '已撤销';
                    break;
                case '1':
                    return '已同意';
                    break;
                case '2':
                    return '审批中';
                    break;
                case '3':
                    return '已拒绝';
                    break;
            }
        },
        lookimg(item) {
            const _this = this;
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: _this.fViewForm.image, //图片地址列表
                    current: item, //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        openViewAll() {
            this.viewAllVisible = true;
        },
        openViewSend() {
            this.viewSendVisible = true;
        },
        checkWidth() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.adjustWidth();
                }, 500);
            });
        },
        //查看审批
        checkCome(row) {
            dd.ready(function () {
                dd.biz.util.openSlidePanel({
                    url: row.url, //打开侧边栏的url
                    title: '查看成本审批', //侧边栏顶部标题
                    onSuccess: function (result) {},
                    onFail: function () {}
                });
            });
        },
        getInfo(id) {
            this.$axios
                .post('/task/ChengBenContent', { id: id })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.fViewForm = res.data.content;
                        this.tagsData = this.fViewForm.spuser;
                        this.tagsPeopleData = this.fViewForm.csuser;
                        this.viewVisible = true;
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'error',
                            duration: '2000'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //同意拒绝审批操作
        viewSend(status) {
            let newJie = 1;
            if (status == 1) {
                newJie = status;
                this.loading = true;
            } else if (status == 2) {
                newJie = status;
                this.loaded = true;
            } else if (status == 3) {
                newJie = '';
                this.loadcan = true;
            }
            this.goDo(status, newJie);
        },
        viewClose() {
            this.viewVisible = false;
        },
        goDo(status, newJie) {
            const _this = this;
            _this.$axios
                .post('/task/UpdateChengBen', {
                    id: _this.checkId,
                    type: status,
                    userid: _this.$store.state.userInfo.uid,
                    spyijian: '',
                    spjieguo: newJie
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.viewVisible = false;
                        _this.getList();
                        if (status == 1) {
                            _this.loading = false;
                            _this.$message({
                                message: '已同意该审批',
                                type: 'success',
                                duration: '2000'
                            });
                        } else if (status == 2) {
                            _this.loaded = false;
                            _this.$message({
                                message: '已拒绝该审批',
                                type: 'success',
                                duration: '2000'
                            });
                        } else if (status == 3) {
                            _this.loadcan = false;
                            _this.$message({
                                message: '已撤销该审批',
                                type: 'success',
                                duration: '2000'
                            });
                        }
                    } else {
                        _this.loading = false;
                        _this.loaded = false;
                        _this.loadcan = false;
                        _this.$message({
                            message: res.data.msg,
                            type: 'error',
                            duration: '2000'
                        });
                    }
                })
                .catch(function (error) {
                    _this.loading = false;
                    _this.loaded = false;
                    _this.loadcan = false;
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            this.pagesize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        closeDrawer(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.fDrawerForm.spuser.length > 0) {
                        _this.$axios
                            .post('/task/CreatedChengBen', _this.fDrawerForm)
                            .then((res) => {
                                if (res.data.code == 200) {
                                    _this.getList();
                                    _this.loading = false;
                                    _this.drawerVisible = false;
                                    _this.$refs[formName].resetFields();
                                    _this.$message({
                                        message: '添加成功',
                                        type: 'success',
                                        duration: '2000'
                                    });
                                } else {
                                    _this.loading = false;
                                    _this.$message({
                                        message: res.data.msg,
                                        type: 'error',
                                        duration: '2000'
                                    });
                                }
                            })
                            .catch(function (error) {
                                _this.loading = false;
                                console.log(error);
                            });
                    } else {
                        _this.$message({
                            message: '请选择审批人！',
                            type: 'warning',
                            duration: '1500'
                        });
                    }
                } else {
                    _this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //预览附件
        watchFiles(item) {
            const _this = this;
            _this.$axios
                .post('/dingyun/DingPanSaveFile', {
                    corp_id: _this.$store.state.cid,
                    type: 'download',
                    fileids: item.fileId,
                    userid: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.status == 1) {
                        dd.ready(function () {
                            dd.biz.cspace.preview({
                                corpId: _this.$store.state.cid,
                                spaceId: item.spaceId,
                                fileId: item.fileId,
                                fileName: item.fileName,
                                fileSize: item.fileSize,
                                fileType: item.fileType,
                                onSuccess: function () {
                                    //无，直接在native显示文件详细信息
                                },
                                onFail: function (err) {
                                    // 无，直接在native页面显示具体的错误
                                }
                            });
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //删除附件
        deleteFiles() {
            this.fDrawerForm.fjurl.splice(index, 1);
        },
        show(msg) {
            this.fDrawerForm.sgurl = msg;
        },
        openAllPeople() {
            this.AllPeopleVisible = true;
        },
        openSendPeople() {
            this.sendPeopleVisible = true;
        },
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.fDrawerForm.spuser = this.tagsData;
        },
        handleSendClose(tag) {
            this.tagsPeopleData.splice(this.tagsPeopleData.indexOf(tag), 1);
            this.fDrawerForm.csuser = this.tagsPeopleData;
        },
        drawClose(formName) {
            this.$refs[formName].resetFields();
            this.fDrawerForm = {
                sgtitle: '',
                xmid: this.$store.state.projectInfo.pid,
                fjurl: [],
                image: [],
                spuser: [],
                csuser: [],
                type: '',
                money: '',
                // jibie: '',
                sgcontent: '',
                corp_id: this.$store.state.cid,
                user: this.$store.state.userInfo.uid
            };
            this.licenceImg = [];
            this.upImgList = [];
            this.isShow = [];
            this.drawerVisible = false;
        },
        //打开抽屉
        viewDraw() {
            const _this = this;
            if (_this.$store.state.projectInfo.pid) {
                if (_this.noNextProject.length > 0) {
                    _this.appVisible = true;
                } else {
                    _this.$axios
                        .post('/dingding/CreateTemplate', {
                            corp_id: _this.$store.state.cid,
                            tmpname: '成本审批',
                            xmid: _this.$store.state.projectInfo.pid,
                            zxmid: '',
                            userid: _this.$store.state.userInfo.uid
                        })
                        .then((res) => {
                            let newUrl =
                                'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?ddtab=true&corpid=' +
                                _this.$store.state.cid +
                                '#/custom/?processCode=' +
                                res.data.process_code;
                            dd.ready(function () {
                                dd.biz.util.openLink({
                                    url: newUrl, //要打开链接的地址
                                    onSuccess: function (result) {
                                        /**/
                                    },
                                    onFail: function (err) {}
                                });
                            });
                            // dd.ready(function () {
                            //     dd.biz.util.openSlidePanel({
                            //         url: newUrl, //打开侧边栏的url
                            //         title: '发起成本审批', //侧边栏顶部标题
                            //         onSuccess: function (result) {},
                            //         onFail: function () {
                            //             setTimeout(() => {
                            //                 _this.getList();
                            //                 _this.$emit('updateN');
                            //                 // _this.$parent.fatherUpNum();
                            //             }, 5000);
                            //             setTimeout(() => {
                            //                 _this.getList();
                            //                 _this.$emit('updateN');
                            //                 // _this.$parent.fatherUpNum();
                            //             }, 10000);
                            //         }
                            //     });
                            // });
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
        //切换成本类型
        typeClick(item, index) {
            this.activeConIndex = index;
            this.typeId = item.value;
            this.cwListName = item.name;
            this.getList();
        },
        //获取部门列表
        getDepartmentList() {
            this.$axios
                .post('/index.php/api/dmaillist/getDepartmentList')
                .then((res) => {
                    if (res.data.code == 1) {
                        this.departmentList = res.data.data.department;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取项目列表
        getProjectList() {
            this.$axios
                .post('/index.php/api/dproject/allProject')
                .then((res) => {
                    if (res.data.code == 1) {
                        this.projectList = res.data.data.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取成本类型列表
        typeChange() {
            this.$axios
                .post('/index.php/api/dfinance/labelList')
                .then((res) => {
                    if (res.data.code == 1) {
                        this.selectFTypeList = res.data.data.out;
                        this.bankcount = res.data.data.account;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
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
                    if (res.data.status == 1) {
                        _this.$store.commit(
                            'setSpaceId',
                            res.data.spaceid.toString()
                        );
                        _this.addFilesClick();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addFilesClick() {
            const _this = this;
            dd.ready(function () {
                dd.biz.util.uploadAttachment({
                    image: {
                        multiple: true,
                        compress: false,
                        max: 9,
                        spaceId: _this.$store.state.spaceId
                    },
                    space: {
                        corpId: _this.$store.state.cid,
                        spaceId: _this.$store.state.spaceId,
                        max: 9
                    },
                    file: { spaceId: _this.$store.state.spaceId, max: 9 },
                    types: ['photo', 'file', 'space'],
                    onSuccess: function (result) {
                        //onSuccess将在文件上传成功之后调用
                        result.data.forEach((item) => {
                            _this.fDrawerForm.fjurl.push(item);
                        });
                    },
                    onFail: function (err) {}
                });
            });
            dd.error(function (err) {
                console.log('错误++' + err);
            });
        },
        addFiles() {
            this.getPower();
        },
        pickerSelect(arr, type) {
            const that = this;

            if (type == 1) {
                let newtap = JSON.parse(JSON.stringify(that.tagsPeopleData));
                let newtag = JSON.parse(JSON.stringify(that.tagsData));
                if (that.clickType == 1) {
                    arr.forEach((item) => {
                        newtag.push(item);
                    });
                    that.tagsData = newtag;
                    that.fDrawerForm.spuser = newtag;
                } else if (that.clickType == 2) {
                    arr.forEach((item) => {
                        newtap.push(item);
                    });
                    that.tagsPeopleData = newtap;
                    that.fDrawerForm.csuser = newtap;
                }
            }
            that.pickerVisible = false;
            that.peopleIsShow = false;
            that.$nextTick(() => {
                that.peopleIsShow = true;
            });
        },
        addManyP(type) {
            const that = this;
            that.clickType = type;
            // that.pickerVisible = true;
            dd.ready(function () {
                dd.biz.contact.complexPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.cid, //企业的corpId
                    multiple: true, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxUsers: 99, //最大可选人数
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
                        if (type == 1) {
                            let newPeople = JSON.parse(
                                JSON.stringify(that.tagsData)
                            );
                            result.users.forEach((item) => {
                                newPeople.push(item);
                            });
                            newPeople = that.$utils.unique(newPeople);
                            that.tagsData = newPeople;
                            that.fDrawerForm.spuser = newPeople;
                        } else if (type == 2) {
                            let newPeople = JSON.parse(
                                JSON.stringify(that.tagsPeopleData)
                            );
                            result.users.forEach((item) => {
                                newPeople.push(item);
                            });
                            newPeople = that.$utils.unique(newPeople);
                            that.tagsPeopleData = newPeople;
                            that.fDrawerForm.csuser = newPeople;
                        }
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
        searchinfo() {
            this.getList();
        },
        //获取列表
        getList() {
            this.$axios
                .post('/task/ChengBenList', {
                    corp_id: this.$store.state.cid,
                    type: this.payform.type,
                    status: this.payform.status,
                    xmid: this.$store.state.projectInfo.pid,
                    sgtitle: this.payform.keyWord,
                    current_page: this.currentPage,
                    userid: this.$store.state.userInfo.uid,
                    bstatus: this.payform.bstatus,
                    zixmid: this.payform.next,
                    admin: this.$store.state.userInfo.admin,
                    num: this.pagesize
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.total = res.data.content.total;
                        this.cwList = res.data.content.list;
                        this.xiaoji = res.data.xiaoji;
                        this.heji = res.data.zongji;
                        this.$nextTick(() => {
                            this.adjustWidth();
                            if (
                                document.body.scrollHeight > window.innerHeight
                            ) {
                                setTimeout(() => {
                                    this.adjustWidth();
                                }, 500);
                            }
                        });
                        if (this.total > 0 && this.cwList.length < 1) {
                            this.currentPage = res.data.content.page;
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
        }, //获取子项目
        getNextProject() {
            const _this = this;
            _this.$axios
                .post('/task/ZiProjectXiaLa', {
                    xmid: _this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.nextProject = res.data.content;
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
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
        this.$utils.checkding();
        this.getNextProject();
        this.getBasicList();
        this.getList();
        window.addEventListener('resize', () => {
            setTimeout(() => {
                this.adjustWidth();
            }, 100);
        });
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
                if (newVal.ppower == '2') {
                    this.$router.push({ path: '/project/projectError3' });
                }
                if (oldVal) {
                    this.getList();
                    this.getNextProject();
                    this.getBasicList();
                    this.getPie();
                }
            },
            deep: true
        }
    }
};
</script>
<template>
    <div id="projectProgress" ref="elementS">
        <div class="main">
            <div class="content">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="工程事件" name="first"
                        ><div class="ppHerder">
                            <div>
                                <el-input
                                    v-model="searchName"
                                    placeholder="请输入事件名称"
                                ></el-input>

                                <el-button
                                    type="primary"
                                    round
                                    @click="searchClick"
                                    >搜索</el-button
                                >
                            </div>
                            <div>
                                <el-button
                                    type="primary"
                                    round
                                    @click="manyAddClick"
                                    >批量新建工程事件</el-button
                                >
                                <el-button
                                    type="primary"
                                    round
                                    @click="newAddClick"
                                    >新建工程事件</el-button
                                >
                            </div>
                        </div>
                        <div
                            style="
                                display: flex;
                                justify-content: flex-end;
                                margin: 20px 0;
                            "
                        >
                            <el-select
                                v-model="searchId"
                                placeholder="请选择子项目"
                                @change="searchNext"
                            >
                                <el-option
                                    v-for="item in nextProject"
                                    :key="item.zid"
                                    :label="item.zname"
                                    :value="item.zid"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div class="ppcontent">
                            <!-- <h4>郑州项目</h4> -->
                            <div v-if="progressData.length > 0">
                                <div class="panelList">
                                    <div
                                        class="progress"
                                        v-for="(item, index) in progressData"
                                        :key="index"
                                        @click="editClick(item.id)"
                                    >
                                        <!-- <img
                                            class="biao"
                                            src="../../assets/workbench/w.png"
                                            v-if="
                                                item.waitTime > 0 &&
                                                    item.waitTime <
                                                        item.totalTime
                                            "
                                        />
                                        <img
                                            class="biao"
                                            src="../../assets/workbench/wg.png"
                                            v-else-if="
                                                item.waitTime >= item.totalTime
                                            "
                                        />
                                        <img
                                            class="biao"
                                            src="../../assets/workbench/wwc.png"
                                            v-else
                                        /> -->
                                        <div class="project-title">
                                            {{ item.jdtitle }}
                                        </div>
                                        <div class="circle">
                                            <div style="color: gray">
                                                <div
                                                    style="margin-bottom: 20px"
                                                >
                                                    负责人：{{ item.jduser }}
                                                </div>
                                                <div>
                                                    总工期：{{ item.day }}天
                                                </div>
                                            </div>
                                            <div>
                                                <el-progress
                                                    type="circle"
                                                    :percentage="item.jindu"
                                                ></el-progress>
                                            </div>
                                        </div>
                                        <div
                                            class="proDark"
                                            v-if="item.status == 1"
                                        >
                                            <i class="el-icon-lock"></i>
                                        </div>
                                    </div>
                                </div>
                                <div style="text-align: center">
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
                            <div
                                v-else
                                style="text-align: center; padding: 0.3rem 0"
                            >
                                <img
                                    src="https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/NG4ZDG6eBM1600655909495.jpg"
                                    alt
                                />
                                <p style="font-size: 0.16rem">
                                    暂时还没有数据哦
                                </p>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="横道图" name="second">
                        <div class="gantBtn">
                            <el-radio-group
                                v-model="gantRadio"
                                @change="gantChange"
                            >
                                <el-radio-button label="1"
                                    >按日显示</el-radio-button
                                >
                                <el-radio-button label="2"
                                    >按月显示</el-radio-button
                                >
                            </el-radio-group>
                        </div>
                        <div ref="ganttRef" class="left-container" />
                    </el-tab-pane>
                    <el-tab-pane label="统计分析" name="third">
                        <div class="pprogressChart">
                            <div class="pchart">
                                <div
                                    v-if="activeName == 'third'"
                                    id="progressBar"
                                    ref="pbar"
                                ></div>
                                <div class="prchart">
                                    <el-form
                                        :inline="true"
                                        :model="formInline"
                                        class="demo-form-inline"
                                    >
                                        <el-form-item label="名称：">
                                            <el-input
                                                v-model="formInline.name"
                                                placeholder="请输入事件名称"
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item label="状态：">
                                            <el-select
                                                v-model="formInline.type"
                                                clearable
                                                placeholder="请选择状态"
                                            >
                                                <el-option
                                                    label="已完成"
                                                    value="1"
                                                ></el-option>
                                                <el-option
                                                    label="未完成"
                                                    value="2"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button
                                                type="primary"
                                                @click="onSubmit"
                                                >搜索</el-button
                                            >
                                        </el-form-item>
                                    </el-form>
                                    <el-table
                                        :data="chartsData.content"
                                        border
                                        style="width: 100%"
                                        height="450"
                                    >
                                        <el-table-column
                                            prop="jdtitle"
                                            align="center"
                                            label="工程事件名称"
                                            :show-overflow-tooltip="true"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="jduser"
                                            label="负责人"
                                            align="center"
                                            :show-overflow-tooltip="true"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="starttime"
                                            align="center"
                                            :show-overflow-tooltip="true"
                                            label="开始时间"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="stoptime"
                                            align="center"
                                            :show-overflow-tooltip="true"
                                            label="结束时间"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            prop="wctime"
                                            align="center"
                                            :show-overflow-tooltip="true"
                                            label="完成时间"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                            align="center"
                                            label="进度"
                                        >
                                            <template slot-scope="scope">
                                                <span
                                                    >{{
                                                        scope.row.jindu
                                                    }}%</span
                                                >
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="status"
                                            align="center"
                                            label="状态"
                                            :formatter="fortStatus"
                                        >
                                        </el-table-column>
                                    </el-table>
                                    <div class="cPag">
                                        <el-pagination
                                            @current-change="chartChange"
                                            :current-page.sync="ccurrentPage"
                                            :page-size="10"
                                            layout="prev, pager, next, jumper"
                                            :total="ctotal"
                                        ></el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="里程碑事件" name="four">
                        <div style="display: flex">
                            <el-select
                                style="margin-right: 0.2rem"
                                v-model="searchLCId"
                                @change="searchLCClick"
                                placeholder="请选择子项目"
                            >
                                <el-option
                                    v-for="item in nextProject"
                                    :key="item.zid"
                                    :label="item.zname"
                                    :value="item.zid"
                                >
                                </el-option>
                            </el-select>
                            <!-- <el-button
                                type="primary"
                                round
                                @click="searchLCClick"
                                >搜索</el-button
                            > -->
                        </div>
                        <div class="fourLicheng">
                            <div class="flMain">
                                <div class="flmTips">
                                    <img
                                        src="../../assets/journal/startp.jpg"
                                        alt=""
                                    />
                                    进度&nbsp;
                                    <img
                                        src="../../assets/journal/weip.png"
                                        alt=""
                                    />
                                    进度=0&nbsp;
                                    <img
                                        src="../../assets/journal/syi.png"
                                        alt=""
                                    />
                                    0%--100% 进度&nbsp;
                                    <img
                                        src="../../assets/journal/fwan.png"
                                        alt=""
                                    />
                                    进度=100%&nbsp;
                                </div>
                                <div class="flmList">
                                    <div>
                                        <div
                                            class="list"
                                            v-for="(
                                                item, index
                                            ) in progressList"
                                            :key="index"
                                        >
                                            <div class="listtop">
                                                <div
                                                    class="ltlp"
                                                    @click="
                                                        goNext(item.id, index)
                                                    "
                                                >
                                                    <img
                                                        v-if="item.jindu == 100"
                                                        src="../../assets/journal/finish.png"
                                                        alt=""
                                                    />
                                                    <img
                                                        v-else-if="
                                                            item.jindu == 0
                                                        "
                                                        src="../../assets/journal/wei.png"
                                                        alt=""
                                                    />
                                                    <img
                                                        v-else
                                                        src="../../assets/journal/start.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div class="ltr">
                                                    <el-progress
                                                        :percentage="item.jindu"
                                                        :show-text="false"
                                                        status="success"
                                                    ></el-progress>
                                                </div>
                                            </div>
                                            <div class="listbottom">
                                                <el-tooltip
                                                    placement="top-start"
                                                >
                                                    <div slot="content">
                                                        {{ item.jdtitle
                                                        }}<br />{{
                                                            item.jindu
                                                        }}%
                                                    </div>
                                                    <div
                                                        @click="
                                                            editClick(item.id)
                                                        "
                                                    >
                                                        {{ item.jdtitle }}
                                                    </div>
                                                </el-tooltip>
                                            </div>
                                        </div>
                                        <div class="list">
                                            <div class="listtop">
                                                <div class="ltlp">
                                                    <img
                                                        v-if="lcType == 1"
                                                        src="../../assets/journal/finish.png"
                                                        alt=""
                                                    />
                                                    <img
                                                        v-else
                                                        src="../../assets/journal/wei.png"
                                                        alt=""
                                                    />
                                                    <span v-if="lcType != 1">{{
                                                        progressList.length
                                                    }}</span>
                                                </div>
                                                <div class="ltr"></div>
                                            </div>
                                            <div class="listbottom">
                                                <div>完成</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <el-table
                                    :data="progressNextList"
                                    style="width: 100%; margin-bottom: 20px"
                                    row-key="id"
                                    border
                                    lazy
                                    :load="loadTable"
                                    :tree-props="{
                                        children: 'children',
                                        hasChildren: 'hasChildren'
                                    }"
                                    max-height="650"
                                    @row-click="checkList"
                                >
                                    <el-table-column
                                        prop="text"
                                        label="事件名称"
                                        show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="personName"
                                        label="负责人"
                                        align="center"
                                        show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="content"
                                        label="事件描述"
                                        align="center"
                                        show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="start_date"
                                        label="开始时间"
                                        align="center"
                                        show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="end_date"
                                        label="结束时间"
                                        align="center"
                                        show-overflow-tooltip="true"
                                    >
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- <div>
                                <div class="proFdiv">
                                    <div class="prostartdiv">
                                        <img
                                            @click="startClick"
                                            src="../../assets/workbench/start.png"
                                            alt=""
                                        />
                                        <div
                                            style="
                                                position: absolute;
                                                bottom: -0.33rem;
                                                right: 0.2rem;
                                                color: #fff;
                                            "
                                        >
                                            起点
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="prodiv"
                                    v-for="(item, index) in progressList"
                                    :key="index"
                                >
                                    <div :class="lineClass(index)">
                                        <img
                                            v-if="item.status != 1"
                                            src="../../assets/workbench/sudashed.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="../../assets/workbench/faildashed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div :class="topClass(index)">
                                        <img
                                            class="tcimg"
                                            src="../../assets/workbench/pbiao.png"
                                            alt=""
                                            @click="editClick(item.id)"
                                        />
                                        <img
                                            class="tclockimg"
                                            v-if="item.status == 1"
                                            src="../../assets/workbench/lock.png"
                                            alt=""
                                            @click="editClick(item.id)"
                                        />
                                        <div class="mbContent">
                                            <div>
                                                里程碑：{{ item.jdtitle }}
                                            </div>
                                            <div>
                                                开始时间：{{ item.starttime }}
                                            </div>
                                            <div>
                                                结束时间：{{ item.stoptime }}
                                            </div>
                                            <el-progress
                                                :percentage="item.jindu"
                                                :text-inside="true"
                                                :stroke-width="20"
                                                color="
                                                        rgba(245, 141, 70, 1)
                                                    "
                                            ></el-progress>
                                        </div>
                                    </div>
                                </div>
                                <div class="prodiv">
                                    <div :class="lastLine">
                                        <img
                                            v-if="isLast"
                                            src="../../assets/workbench/sudashed.png"
                                            alt=""
                                        />
                                        <img
                                            v-else
                                            src="../../assets/workbench/faildashed.png"
                                            alt=""
                                        />
                                    </div>
                                    <div :class="lastTopClass">
                                        <img
                                            style="width: 103px"
                                            class="tcimg"
                                            src="../../assets/workbench/success.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-dialog
                :title="taskTitle"
                :visible.sync="newProgressView"
                width="600px"
                @close="closeDialog('proform')"
            >
                <el-form
                    ref="proform"
                    :label-position="labelPosition"
                    :model="addForm"
                    :rules="newProgressRule"
                    label-width="150px"
                >
                    <el-form-item label="工程事件名称：" prop="jdtitle">
                        <el-input
                            v-model="addForm.jdtitle"
                            maxlength="10"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="负责人：" prop="jdusers">
                        <div class="addManeger">
                            <div class="addMList" v-if="tagsData.length > 3">
                                <div class="mdnList">
                                    <div class="mdren" @click="openAllPeople">
                                        <span class="touxiang">
                                            <i class="el-icon-s-custom"></i>
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
                                v-for="(item, index) in tagsData.slice(0, 3)"
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
                                        @click="handleClose(item, index, 1)"
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
                    </el-form-item>
                    <el-form-item label="上级事件：" class="upOrg">
                        <el-button
                            @click="selectCorp"
                            plain
                            style="width: 100%"
                        >
                            <span>{{ addForm.uname }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <div class="addNewDiv" v-if="newView">
                            <div class="addNewMain">
                                <div class="addNewList">
                                    <el-tree
                                        :props="sDefaultProps"
                                        :load="sloadNode"
                                        node-key="id"
                                        accordion="true"
                                        lazy
                                        :expand-on-click-node="false"
                                        ref="stree"
                                        show-checkbox
                                        check-strictly
                                        @check="handleCheck"
                                    ></el-tree>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="定义为里程碑：" prop="status">
                        <el-radio v-model="addForm.status" label="2"
                            >是</el-radio
                        >
                        <el-radio v-model="addForm.status" label="1"
                            >否</el-radio
                        >
                    </el-form-item>
                    <el-form-item label="开始时间：" prop="starttime">
                        <el-date-picker
                            v-model="addForm.starttime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerStart"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间：" prop="stoptime">
                        <el-date-picker
                            v-model="addForm.stoptime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerEnd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="工程事件描述：">
                        <el-input
                            v-model="addForm.jdcontent"
                            type="textarea"
                            :rows="4"
                            maxlength="100"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button
                        type="primary"
                        :loading="loading"
                        @click="goSure('proform')"
                        >确 定</el-button
                    ><el-button @click="closeDialog('proform')"
                        >取 消</el-button
                    >
                </div>
            </el-dialog>
            <el-dialog
                title="修改事件"
                :visible.sync="editProgressView"
                width="600px"
                @close="closeEdit('peform')"
            >
                <el-form
                    ref="peform"
                    :label-position="labelPosition"
                    :model="editForm"
                    :rules="editProgressRule"
                    label-width="150px"
                >
                    <el-form-item label="事件名称：" prop="jdtitle">
                        <el-input
                            v-model="editForm.jdtitle"
                            maxlength="10"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="负责人：" prop="jdusers">
                        <div class="addManeger">
                            <div class="addMList" v-if="tagsData.length > 3">
                                <div class="mdnList">
                                    <div class="mdren" @click="openAllPeople">
                                        <span class="touxiang">
                                            <i class="el-icon-s-custom"></i>
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
                                v-for="(item, index) in tagsData.slice(0, 3)"
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
                                        @click="handleClose(item, index, 2)"
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
                    </el-form-item>
                    <el-form-item label="定义为里程碑：" prop="status">
                        <el-radio v-model="editForm.status" label="2"
                            >是</el-radio
                        >
                        <el-radio v-model="editForm.status" label="1"
                            >否</el-radio
                        >
                    </el-form-item>
                    <!-- <el-form-item label="上级事件：" class="upOrg">
                        <el-button
                            @click="selectCorp"
                            plain
                            style="width:100%;"
                        >
                            <span>{{ editForm.uname }}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <div class="addNewDiv" v-if="newView">
                            <div class="addNewMain">
                                <div class="addNewList">
                                    <el-tree
                                        :props="sDefaultProps"
                                        :load="sloadNode"
                                        node-key="id"
                                        accordion="true"
                                        lazy
                                        :expand-on-click-node="false"
                                        ref="stree"
                                        show-checkbox
                                        check-strictly
                                        @check="handleCheck"
                                    ></el-tree>
                                </div>
                            </div>
                        </div>
                    </el-form-item> -->
                    <el-form-item label="开始时间：" prop="starttime">
                        <el-date-picker
                            v-model="editForm.starttime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerEStart"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间：" prop="stoptime">
                        <el-date-picker
                            v-model="editForm.stoptime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerEEnd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="事件描述：">
                        <el-input
                            v-model="editForm.jdcontent"
                            type="textarea"
                            :rows="4"
                            maxlength="100"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button
                        type="primary"
                        :loading="loading"
                        @click="editSure('peform')"
                        >确 定</el-button
                    ><el-button @click="completeEdit">完 成</el-button
                    ><el-button @click="deleteEdit">删 除</el-button
                    ><el-button @click="closeEdit('peform')">取 消</el-button>
                </div>
            </el-dialog>
            <el-dialog
                title="全部待办人员"
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
                                @click="handleClose(item, index, 1)"
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
                title="全部待办人员"
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
                                @click="handleClose(item, index, 1)"
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
                title="删除"
                width="600px"
                :append-to-body="true"
                :visible.sync="deleteVisible"
                :close-on-click-modal="false"
            >
                <div>确认删除该里程碑？一旦删除无法找回！</div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteClick"
                        >确认</el-button
                    >
                </div>
            </el-dialog>
            <el-dialog
                title="完成"
                width="800px"
                :append-to-body="true"
                :visible.sync="comVisible"
                :close-on-click-modal="false"
                @close="comCancel"
            >
                <el-form
                    :model="comform"
                    :rules="comRule"
                    ref="comFRef"
                    label-width="130px"
                >
                    <el-form-item label="完成时间：" prop="jdstoptime">
                        <el-date-picker
                            v-model="comform.jdstoptime"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickStop"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="完成说明：" prop="jdyuanyin">
                        <el-input
                            type="textarea"
                            v-model="comform.jdyuanyin"
                        ></el-input>
                    </el-form-item>
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
                                v-for="(item, index) in comform.jdstopurl"
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
                                                (item.fileSize / 1000).toFixed(
                                                    2
                                                )
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
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="comCancel">取 消</el-button>
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="comSure('comFRef')"
                        >确认</el-button
                    >
                </div>
            </el-dialog>
            <el-dialog
                title="批量新建工程事件"
                :visible.sync="upFormVisible"
                :close-on-click-modal="false"
                @close="upCancel"
                class="uploadExcel"
            >
                <div class="newExcel">
                    <div class="leftForm">
                        <el-form
                            ref="form"
                            :rules="creatProjectrules"
                            :label-position="labelPosition"
                            :model="upForm"
                            label-width="100px"
                        >
                            <el-form-item label="负责人：" prop="jdusers">
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
                                        v-for="(item, index) in tagsData.slice(
                                            0,
                                            3
                                        )"
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
                                                              item.name.length -
                                                                  2,
                                                              2
                                                          )
                                                }}</span>
                                            </div>
                                            <p>{{ item.name }}</p>
                                            <i
                                                class="el-icon-error"
                                                @click="
                                                    handleClose(item, index, 3)
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
                                                @click="addManyP(3)"
                                            >
                                                <span class="touxiang">
                                                    <i class="el-icon-plus"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item label="上级事件：" class="upOrg">
                                <el-button
                                    @click="selectCorp"
                                    plain
                                    style="width: 100%"
                                >
                                    <span>{{ upForm.uname }}</span>
                                    <i
                                        class="el-icon-arrow-down el-icon--right"
                                    ></i>
                                </el-button>
                                <div class="addNewDiv" v-if="newView">
                                    <div class="addNewMain">
                                        <div class="addNewList">
                                            <el-tree
                                                :props="dDefaultProps"
                                                :load="dloadNode"
                                                node-key="id"
                                                accordion="true"
                                                lazy
                                                :expand-on-click-node="false"
                                                ref="dtree"
                                                show-checkbox
                                                check-strictly
                                                @check="handleMCheck"
                                            ></el-tree>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item>

                            <el-form-item class="newtijiao" label="上传文件：">
                                <div class="newcom">
                                    <img
                                        width="50"
                                        src="../../assets/workbench/exceladd.png"
                                        alt
                                    />
                                    <p>请上传文件</p>
                                    <eupload
                                        @listenToChild="showe"
                                        :upImgList2="upImgList2"
                                        :licenceImg2="licenceImg2"
                                        :isShow2="isShow2"
                                    ></eupload>
                                </div>
                            </el-form-item>
                            <div class="warn">
                                <div>
                                    <p>注意：</p>
                                    <p>
                                        如有员工不在钉钉通讯中，请先将员工加入组织架构
                                    </p>
                                    <p>
                                        薪资报表以下载的模板为准，否则将无法读取报表数据，重复上传数据将被覆盖
                                    </p>
                                    <span
                                        @click="derive"
                                        style="color: #3a99f2; cursor: pointer"
                                        >下载模板</span
                                    >
                                </div>
                            </div>
                            <el-form-item
                                style="margin-top: 20px; text-align: center"
                            >
                                <el-button
                                    type="primary"
                                    :loading="loaded"
                                    @click="save"
                                    >确定</el-button
                                >
                                <el-button type="primary" @click="upCancel"
                                    >取消</el-button
                                >
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="rightPic">
                        <!-- <img src="../../../static/images/indexL.png" alt /> -->
                    </div>
                </div>
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
const echarts = require('echarts');
import gantt from 'dhtmlx-gantt'; // 引入模块
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js'; // 本地化
import * as dd from 'dingtalk-jsapi';
import eupload from '../../components/excelUpload.vue';
import peoplePick from '../../components/complexPicker.vue';
var timeFn = null;
export default {
    name: 'projectProgress',
    components: { eupload, peoplePick },
    data() {
        const validateuser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择负责人'));
            } else {
                callback();
            }
        };
        return {
            progressNextList: [],
            peopleIsShow: true,
            searchLCId: this.$store.state.projectInfo.pid,
            searchId: this.$store.state.projectInfo.pid,
            nextProject: [],
            clickType: 1,
            chartsData: { bing: {}, content: [] },
            formInline: {
                name: '',
                type: ''
            },
            searchName: '',
            isLast: false,
            upFormVisible: false,
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
            loaded: false,
            editID: '',
            deleteVisible: false,
            comVisible: false,
            editProgressView: false,
            progressList: [],
            comform: {
                jdstoptime: '',
                jdyuanyin: '',
                userid: this.$store.state.userInfo.uid,
                jdstopurl: []
            },
            upForm: {
                uname: '请选择上级事件',
                corp_id: this.$store.state.cid,
                userid: this.$store.state.userInfo.uid,
                xmid: this.$store.state.projectInfo.pid,
                fid: '',
                jdusers: [],
                jdstatus: '',
                url: ''
            },
            comRule: {
                jdyuanyin: [
                    {
                        required: true,
                        message: '完成说明不能为空',
                        trigger: 'blur'
                    }
                ],
                jdstoptime: [
                    {
                        required: true,
                        message: '完成时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            editProgressRule: {
                jdtitle: [
                    {
                        required: true,
                        message: '工程事件名称不能为空',
                        trigger: 'blur'
                    }
                ],
                jdusers: [
                    {
                        required: true,
                        message: '负责人不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                starttime: [
                    {
                        required: true,
                        message: '结束时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                stoptime: [
                    {
                        required: true,
                        message: '结束时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            newProgressRule: {
                jdtitle: [
                    {
                        required: true,
                        message: '工程事件名称不能为空',
                        trigger: 'blur'
                    }
                ],
                jdusers: [
                    {
                        required: true,
                        message: '负责人不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                fid: [
                    {
                        required: true,
                        message: '请选择上级事件',
                        trigger: ['blur', 'change']
                    }
                ],
                starttime: [
                    {
                        required: true,
                        message: '结束时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                stoptime: [
                    {
                        required: true,
                        message: '结束时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            sDefaultProps: {
                id: 'id',
                label: 'name',
                children: 'content',
                isLeaf: 'leaf'
            },
            dDefaultProps: {
                id: 'id',
                label: 'name',
                children: 'content',
                isLeaf: 'leaf'
            },
            newView: false,
            nextRadio: 0,
            gantRadio: 1,
            labelPosition: 'right',
            newProgressView: false,
            taskTitle: '新建工程事件',
            activeName: 'first',
            projectList: [],
            addForm: {
                jdtitle: '',
                starttime: '',
                stoptime: '',
                jdusers: [],
                jdcontent: '',
                uname: '请选择上级事件',
                fid: '',
                jdstatus: '',
                status: '1',
                corp_id: this.$store.state.cid,
                userid: this.$store.state.userInfo.uid,
                xmid: this.$store.state.projectInfo.pid
            },
            editForm: {
                jdtitle: '',
                starttime: '',
                stoptime: '',
                jdusers: [],
                jdcontent: '',
                jdstatus: '',
                corp_id: this.$store.state.cid,
                status: '1',
                userid: this.$store.state.userInfo.uid,
                xmid: this.$store.state.projectInfo.pid,
                shangjistarttime: '',
                shangjistoptime: ''
            },
            searchForm: {
                name: '',
                starttime: '',
                endtime: '',
                city: ''
            },
            moveId: '',
            tasks: {
                data: [
                    // {
                    //     id: 1,
                    //     text: '开工开工开工开工开工开工开工开工',
                    //     start_date: '15-04-2017',
                    //     end_date: '18-04-2017',
                    //     personName: '张总',
                    //     duration: 3,
                    //     progress: 0.6
                    // },
                    // {
                    //     id: 2,
                    //     text: 'Task #2',
                    //     start_date: '18-04-2017',
                    //     end_date: '21-04-2017',
                    //     personName: '李总',
                    //     duration: 3,
                    //     progress: 0.4
                    // },
                    // {
                    //     id: 3,
                    //     text: 'Task #3',
                    //     start_date: '20-04-2017',
                    //     end_date: '23-04-2017',
                    //     personName: '赵总',
                    //     duration: 3,
                    //     progress: 0.4,
                    //     parent: 2
                    // }
                ]
                // links: [{ id: 1, source: 1, target: 2, type: '0' }]
            },
            progressData: [],
            newNode: [],
            newResolve: [],
            tagsData: [],
            AllPeopleVisible: false,
            loading: false,
            nfid: '',
            jdstatus: '',
            comStop: '',
            comStart: '',
            pickerVisible: false,
            ccurrentPage: 1,
            ctotal: '',
            pickerNum: 9,
            total: '',
            pagesize: 12,
            currentPage: 1,
            newStatus: 1,
            currentFid: '',
            newLStatus: 1,
            lcType: 2
        };
    },

    methods: {
        loadTable(tree, treeNode, resolve) {
            const _this = this;
            _this.$axios
                .post('/task/NewJinDuContent', {
                    corp_id: _this.$store.state.cid,
                    fid: tree.id,
                    xmid: _this.searchLCId,
                    type: _this.newLStatus
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        let newData = res.data.content;
                        resolve(newData);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        fortStatus(row) {
            switch (row.status) {
                case '0':
                    return '按期完成';
                    break;
                case '1':
                    return '提前完成';
                    break;
                case '2':
                    return '延期完成';
                    break;
                case '3':
                    return '未完成';
                    break;
            }
        },
        manyAddClick() {
            this.upForm = {
                uname: '请选择上级事件',
                corp_id: this.$store.state.cid,
                userid: this.$store.state.userInfo.uid,
                xmid: this.$store.state.projectInfo.pid,
                fid: '',
                jdusers: [],
                jdstatus: '',
                url: ''
            };
            this.upImgList2 = '';
            this.licenceImg2 = '';
            this.isShow2 = ['1'];
            this.upFormVisible = true;
        },
        showe(url) {
            this.upForm.url = url;
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
            this.comform.jdstopurl.splice(index, 1);
        },
        getPower() {
            const _this = this;
            _this.$axios
                .post('/dingyun/DingPanSaveFile', {
                    corp_id: _this.$store.state.cid,
                    type: 'add',
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
                        _this.comform.jdstopurl = result.data;
                    },
                    onFail: function (err) {}
                });
            });
            dd.error(function (err) {
                console.log(err);
            });
        },
        addFiles() {
            this.getPower();
        },
        handleClick(tab, event) {
            console.log(tab);
            if (tab.name == 'first') {
                this.jdstatus = '';
                this.nfid = '';
                this.getProgressList();
            } else if (tab.name == 'second') {
                this.getGant();
            } else if (tab.name == 'third') {
                this.getCharts();
            } else if (tab.name == 'four') {
                this.getLCList();
                this.getLCNList();
            }
        },
        derive() {
            dd.ready(function () {
                dd.biz.util.openLink({
                    url:
                        'http://' +
                        window.location.host +
                        '/task/LiChengBeiMoBan', //要打开链接的地址
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        upCancel() {
            this.upFormVisible = false;
            this.newView = false;
            this.tagsData = [];
            this.isShow2 = [];
        },
        save() {
            const _this = this;
            let newData = JSON.parse(JSON.stringify(_this.upForm));
            _this.loaded = true;
            if (_this.upForm.jdusers.length > 0) {
                if (_this.upForm.fid) {
                    if (_this.upForm.url) {
                        delete newData.uname;
                        _this.$axios
                            .post('/task/JinDuSCreated', newData)
                            .then((res) => {
                                if (res.data.code == 200) {
                                    _this.loaded = false;
                                    _this.upFormVisible = false;
                                    _this.getProgressList();
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
                        _this.$message.warning('请上传Excel文件');
                    }
                } else {
                    _this.loaded = false;
                    _this.$message.warning('请选择上级事件');
                }
            } else {
                _this.loaded = false;
                _this.$message.warning('请选择负责人');
            }
        },
        comCancel() {
            this.comVisible = false;
            this.comform = {
                jdstoptime: '',
                jdyuanyin: '',
                userid: this.$store.state.userInfo.uid
            };
        },
        comSure(formName) {
            const _this = this;
            _this.loaded = true;
            let newTime = new Date(_this.comStop).getTime();
            let newT = new Date(_this.comform.jdstoptime).getTime();
            if (newT < newTime) {
                _this.comform.type = 1;
                _this.comform.jdgongqi =
                    (newTime - newT) / (1000 * 60 * 60 * 24);
            } else if (newT > newTime) {
                _this.comform.type = 2;
                _this.comform.jdgongqi =
                    (newT - newTime) / (1000 * 60 * 60 * 24);
            } else {
                _this.comform.type = 0;
                _this.comform.jdgongqi = 0;
            }
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/FinishJinDu', _this.comform)
                        .then((res) => {
                            if (res.data.code == 200) {
                                _this.loaded = false;
                                _this.comVisible = false;
                                _this.editProgressView = false;
                                _this.getLCList();
                                _this.getProgressList();
                                _this.getLCNList();
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
                }
            });
        },
        deleteClick() {
            const _this = this;
            _this.$axios
                .post('/task/UpdateJinDu', {
                    jid: _this.editID,
                    type: 'delete',
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.getProgressList();
                        _this.getLCList();
                        _this.getLCNList();
                        _this.deleteVisible = false;
                        _this.editProgressView = false;
                    } else {
                        _this.$message({
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
        completeEdit() {
            this.comVisible = true;
        },
        deleteEdit() {
            this.deleteVisible = true;
        },
        startClick() {
            this.jdstatus = '';
            this.nfid = '';
            this.getProgressList();
        },
        backClick(item) {
            const _this = this;
            clearTimeout(timeFn);
            _this.jdstatus = item.sjjdstatus;
            _this.nfid = item.sjid;
            _this.getProgressList();
        },
        nextClick(item) {
            const _this = this;
            clearTimeout(timeFn); //首先清除计时器
            timeFn = setTimeout(() => {
                _this.jdstatus = item.jdstatus;
                _this.nfid = item.id;
                _this.getProgressList();
            }, 300);
        },
        checkList(row, column) {
            this.editID = row.id;
            this.comform.jid = row.id;
            this.getInfo(row.id);
        },
        editClick(id) {
            this.editID = id;
            this.comform.jid = id;
            this.getInfo(id);
        },
        getInfo(id) {
            const _this = this;
            _this.$axios
                .post('/task/JinDuContent', { jid: id })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.editForm = res.data.content;
                        _this.editForm.jid = id;
                        _this.comStop = res.data.content.stoptime;
                        _this.comStart = res.data.content.starttime;
                        _this.tagsData = res.data.content.jdusers;
                        _this.editProgressView = true;
                    } else {
                        _this.$message({
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
        openAllPeople() {
            this.AllPeopleVisible = true;
        },
        handleClose(item, index, type) {
            this.tagsData.splice(this.tagsData.indexOf(item), 1);
            if (type == 1) {
                this.addForm.jdusers = this.tagsData;
            } else if (type == 2) {
                this.editForm.jdusers = this.tagsData;
            } else if (type == 3) {
                this.upForm.jdusers = this.tagsData;
            }
        },
        pickerSelect(arr, type) {
            const that = this;
            if (type == 1) {
                let newPeople = JSON.parse(JSON.stringify(that.tagsData));

                arr.forEach((item) => {
                    newPeople.push(item);
                });
                if (newPeople.length > 9) {
                    that.$message({
                        message: '负责人不得超过9人',
                        type: 'warning',
                        duration: '1500'
                    });
                } else {
                    that.tagsData = newPeople;
                    if (that.clickType == 1) {
                        that.addForm.jdusers = that.tagsData;
                    } else if (that.clickType == 2) {
                        that.editForm.jdusers = that.tagsData;
                    } else if (that.clickType == 3) {
                        that.upForm.jdusers = that.tagsData;
                    }
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
                        that.tagsData = result.users;
                        if (type == 1) {
                            that.addForm.jdusers = that.tagsData;
                        } else if (type == 2) {
                            that.editForm.jdusers = that.tagsData;
                        } else if (type == 3) {
                            that.upForm.jdusers = that.tagsData;
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
        selectCorp() {
            this.newView = !this.newView;
            this.sloadNode(this.newNode, this.newResolve);
        },
        //el-tree执行单选
        handleCheck(a, b) {
            //a为传递给 data 属性的数组中该节点所对应的对象；b为树目前的选中状态对象
            this.$refs.stree.setCheckedNodes([a]);
            this.addForm.uname = a.name;
            this.addForm.jdstatus = a.status;
            this.addForm.xmid = a.xmid;
            if (a.status == 1 || a.status == 2) {
                this.addForm.fid = '';
            } else {
                this.addForm.fid = a.id;
            }
            this.newView = false;
        },
        sloadNode(node, resolve) {
            const that = this;
            that.newNode = node;
            that.newResolve = resolve;
            that.newNode.childNodes = [];
            if (node.level === 0) {
                that.$axios
                    .post('/task/JinDuShuXingList', {
                        xmid: that.$store.state.projectInfo.pid,
                        status: '',
                        fid: ''
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            let result = res.data.content;
                            return resolve(result);
                        }
                    });
            } else if (node.level > 0) {
                let _id = node.data.fid;
                //-----获取子级组织
                that.$axios
                    .post('/task/JinDuShuXingList', {
                        xmid: that.$store.state.projectInfo.pid,
                        status: node.data.status,
                        fid: _id
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            let result = res.data.content;
                            return resolve(result);
                        }
                    });
            }
        },
        handleMCheck(a, b) {
            //a为传递给 data 属性的数组中该节点所对应的对象；b为树目前的选中状态对象
            this.$refs.dtree.setCheckedNodes([a]);
            this.upForm.uname = a.name;
            this.upForm.jdstatus = a.status;
            this.upForm.fid = a.fid;
            this.upForm.xmid = a.xmid;
            if (a.status == 1 || a.status == 2) {
                this.addForm.fid = '';
            } else {
                this.addForm.fid = a.id;
            }
            this.newView = false;
        },
        dloadNode(node, resolve) {
            const that = this;
            that.newNode = node;
            that.newResolve = resolve;
            that.newNode.childNodes = [];
            if (node.level === 0) {
                that.$axios
                    .post('/task/JinDuShuXingList', {
                        xmid: that.$store.state.projectInfo.pid,
                        status: '',
                        fid: ''
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            let result = res.data.content;
                            return resolve(result);
                        }
                    });
            } else if (node.level > 0) {
                let _id = node.data.fid;
                //-----获取子级组织
                that.$axios
                    .post('/task/JinDuShuXingList', {
                        xmid: that.$store.state.projectInfo.pid,
                        status: node.data.status,
                        fid: _id
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            let result = res.data.content;
                            return resolve(result);
                        }
                    });
            }
        },
        goSure(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    let newData = JSON.parse(JSON.stringify(this.addForm));
                    delete newData.uname;
                    if (newData.jdstatus) {
                        _this.$axios
                            .post('/task/CreatedJinDu', newData)
                            .then((res) => {
                                if (res.data.code == 200) {
                                    _this.loading = false;
                                    _this.newProgressView = false;
                                    _this.getProgressList();
                                    _this.$message({
                                        message: res.data.msg,
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
                        _this.loading = false;
                        _this.$message({
                            message: '请选择上级事件',
                            type: 'warning',
                            duration: '2000'
                        });
                    }
                } else {
                    _this.loading = false;
                }
            });
        },
        //修改
        editSure(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    let newData = JSON.parse(JSON.stringify(this.editForm));
                    newData.xmid = _this.$store.state.projectInfo.pid;
                    newData.userid = _this.$store.state.userInfo.uid;
                    newData.type = 'update';
                    _this.$axios
                        .post('/task/UpdateJinDu', newData)
                        .then((res) => {
                            if (res.data.code == 200) {
                                _this.loading = false;
                                _this.editProgressView = false;
                                _this.getProgressList();
                                _this.getLCList();
                                _this.getLCNList();
                                _this.$message({
                                    message: res.data.msg,
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
                    _this.loading = false;
                }
            });
        },
        gantChange(val) {
            if (val == 1) {
                gantt.config.scales = [
                    { unit: 'month', step: 1, format: '%F, %Y' },
                    { unit: 'day', step: 1, format: '%j, %D' }
                ];
                // 数据解析
                // gantt.parse(this.tasks);
            } else if (val == 2) {
                gantt.config.scales = [
                    { unit: 'year', step: 1, format: '%Y' },
                    { unit: 'month', step: 1, format: '%M' }
                ];
                // 数据解析
                // gantt.parse(this.tasks);
            }
            this.getGant();
        },
        goInfo() {
            //查看里程碑详情
        },
        newAddClick() {
            this.tagsData = [];
            this.newProgressView = true;
            this.addForm = {
                jdtitle: '',
                starttime: '',
                stoptime: '',
                jdusers: [],
                jdcontent: '',
                uname: '请选择上级事件',
                fid: '',
                jdstatus: '',
                status: '1',
                corp_id: this.$store.state.cid,
                userid: this.$store.state.userInfo.uid,
                xmid: this.$store.state.projectInfo.pid,
                fid: ''
            };
        },
        closeDialog() {
            this.newProgressView = false;
            this.newView = false;
            this.tagsData = [];
        },
        closeEdit(formName) {
            this.$refs[formName].resetFields();
            this.editProgressView = false;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getProgressList();
        },
        searchClick() {
            this.currentPage = 1;
            this.getProgressList();
        },
        searchNext(val) {
            let obj = {};
            obj = this.nextProject.find((item) => {
                return item.zid === val;
            });
            if (obj.ztype == '主项目') {
                this.newStatus = 1;
            } else {
                this.newStatus = 2;
            }
            this.currentPage = 1;
            this.getProgressList();
        },
        searchLCClick(val) {
            let obj = {};
            obj = this.nextProject.find((item) => {
                return item.zid === val;
            });
            if (obj.ztype == '主项目') {
                this.newLStatus = 1;
            } else {
                this.newLStatus = 2;
            }
            this.getLCList();
            this.getLCNList();
        },
        goNext(id, index) {
            if (index == 0) {
                this.currentFid = '1';
            } else {
                this.currentFid = id;
            }
            this.getLCNList();
        },

        getLCNList() {
            const _this = this;
            _this.$axios
                .post('/task/NewJinDuContent', {
                    corp_id: _this.$store.state.cid,
                    fid: _this.currentFid,
                    xmid: _this.searchLCId,
                    type: _this.newLStatus
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.progressNextList = res.data.content;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getLCList() {
            const _this = this;

            _this.$axios
                .post('/task/newJinDuList', {
                    corp_id: _this.$store.state.cid,
                    jdstatus: _this.jdstatus,
                    fid: _this.nfid,
                    name: '',
                    status: 2,
                    xmid: _this.searchLCId,
                    licheng: 1
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.progressList = res.data.content;
                        _this.lcType = res.data.type;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getProgressList() {
            const _this = this;
            _this.$axios
                .post('/task/JinDuList', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    jdstatus: _this.jdstatus,
                    fid: _this.nfid,
                    name: _this.searchName,
                    current_page: _this.currentPage,
                    status: _this.newStatus,
                    xmid: _this.searchId
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.progressData = res.data.content.list;
                        _this.total = res.data.content.total;
                        if (_this.total > 0 && _this.progressData.length < 1) {
                            _this.currentPage = res.data.content.page;
                            _this.getProgressList();
                        }
                    } else {
                        _this.$message({
                            type: 'warning',
                            message: res.data.msg,
                            duration: 1500
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getGant() {
            const _this = this;
            _this.$axios
                .post('/task/JinDuHengDaoTu', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        gantt.clearAll();
                        _this.tasks.data = res.data.content;
                        gantt.parse(_this.tasks);
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        onSubmit() {
            this.ccurrentPage = 1;
            this.getCharts();
        },
        chartChange(val) {
            this.ccurrentPage = val;
            this.getCharts();
        },
        getCharts() {
            const _this = this;
            _this.$axios
                .post('/task/JinDuTongJiList', {
                    xmid: _this.$store.state.projectInfo.pid,
                    name: _this.formInline.name,
                    type: _this.formInline.type,
                    current_page: _this.ccurrentPage
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.chartsData.bing = res.data.bing;
                        _this.chartsData.content = res.data.content.list;
                        _this.ctotal = res.data.content.total;
                        _this.$nextTick(() => {
                            // echarts.getInstanceByDom(_this.$refs.pbar).resize();
                            _this.doPie();
                        });
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取子项目
        getNextProject(ntype) {
            const _this = this;
            _this.$axios
                .post('/task/ZiProjectXiaLa', {
                    xmid: _this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.nextProject = res.data.content;
                        if (ntype == 1) {
                            _this.searchId = _this.nextProject[0].zid;
                            _this.searchLCId = _this.nextProject[0].zid;
                            _this.getProgressList();
                            _this.getLCNList();
                            _this.getLCList();
                        }
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        doPie() {
            const _this = this;
            let mChart = echarts.init(document.getElementById('progressBar'));

            let newData = [];
            let newChart = JSON.parse(JSON.stringify(_this.chartsData.bing));
            newData = [
                { name: '已完成', value: newChart.yiw },
                { name: '未完成', value: newChart.weiw }
            ];
            mChart.clear();
            mChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '工程事件统计',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: newData,
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
        const _this = this;
        _this.getPRole();
        _this.$utils.checkding();
        _this.getNextProject();
        _this.getProgressList();
        // _this.getCharts();
        gantt.i18n.setLocale('cn');
        gantt.config.columns = [
            {
                name: 'text',
                label: '工程事件名称',
                tree: true,
                width: '200'
            },
            {
                name: 'personName',
                label: '负责人',
                align: 'center',
                resize: true
            },
            {
                name: 'start_date',
                label: '开始时间',
                align: 'center',
                width: 150
            },
            {
                name: 'end_date',
                label: '结束时间',
                align: 'center',
                width: 150
            },
            { name: 'duration', label: '工期', align: 'center' }
        ];
        // gantt.config.readonly = true;
        gantt.config.scales = [
            { unit: 'month', step: 1, format: '%F, %Y' },
            { unit: 'day', step: 1, format: '%j, %D' }
        ];
        gantt.config.grid_width = 500;
        // 初始化
        gantt.init(_this.$refs.ganttRef);
        _this.getGant();
        // 数据解析
    },
    computed: {
        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.addForm.stoptime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.addForm.starttime;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 8.64e7
                        );
                    }
                }
            };
        },
        pickerEStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.editForm.stoptime;
                    let MinVal = this.editForm.shangjistarttime;
                    if (endDateVal) {
                        return (
                            time.getTime() > new Date(endDateVal).getTime() ||
                            time.getTime() < new Date(MinVal).getTime()
                        );
                    }
                }
            };
        },
        pickerEEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.editForm.starttime;
                    let MaxVal = this.editForm.shangjistoptime;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                                new Date(beginDateVal).getTime() - 8.64e7 ||
                            time.getTime() > new Date(MaxVal).getTime()
                        );
                    }
                }
            };
        },
        pickStop() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.comStart;

                    return (
                        // time.getTime() < Date.now() - 8.64e7 ||
                        time.getTime() < new Date(beginDateVal).getTime()
                    );
                }
            };
        },
        // lastLine() {
        //     let newArrData = this.progressList;
        //     let newLength = this.progressList.length;
        //     if (newLength % 2 != 0) {
        //         this.isLast = true;
        //         return 'prordiv';
        //     } else {
        //         this.isLast = false;
        //         return 'proldiv';
        //     }
        // },
        // lastTopClass() {
        //     let newArrData = this.progressList;
        //     let newLength = this.progressList.length;
        //     if (newLength % 2 != 0) {
        //         this.isLast = true;
        //         return 'prombdiv';
        //     } else {
        //         this.isLast = false;
        //         return 'promtdiv';
        //     }
        // },
        // lineClass() {
        //     return function (index) {
        //         let newIndex = index + 1;
        //         if (newIndex % 2 != 0) {
        //             return 'proldiv';
        //         } else {
        //             return 'prordiv';
        //         }
        //     };
        // },
        // topClass() {
        //     return function (index) {
        //         let newIndex = index + 1;
        //         if (newIndex % 2 != 0) {
        //             return 'promtdiv';
        //         } else {
        //             return 'prombdiv';
        //         }
        //     };
        // },
        projectData() {
            return this.$store.state.projectInfo;
        }
    },
    watch: {
        projectData: {
            handler(newVal, oldVal) {
                //你需要执行的代码
                if (newVal.ppower == '2') {
                    this.$router.push({ path: '/project/projectError5' });
                }
                if (oldVal) {
                    this.getGant();
                    this.getNextProject(1);

                    this.getCharts();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
<template>
    <div id="filesImg">
        <div class="main">
            <div class="topContent" v-if="titleId == 1">
                <div class="piccontent" @click="drawing(1)">
                    <img class="img" src="../../assets/management/TZ.png" />
                    <span>图纸</span>
                </div>
                <div class="piccontent" @click="drawing(2)">
                    <img class="img" src="../../assets/management/MX.png" />
                    <span>模型</span>
                </div>
                <div class="piccontent" @click="drawing(3)">
                    <img class="img" src="../../assets/management/GX.png" />
                    <span>参建各方文件</span>
                </div>
                <div class="piccontent" @click="drawing(4)">
                    <img class="img" src="../../assets/management/BD.png" />
                    <span>私人文件</span>
                </div>
                <div class="piccontent" @click="drawing(5)">
                    <img class="img" src="../../assets/management/GF.png" />
                    <span>规范图集</span>
                </div>
                <div class="piccontent" @click="drawing(6)">
                    <img class="img" src="../../assets/management/SC.png" />
                    <span>我的收藏</span>
                </div>
            </div>
            <div class="middleContent">
                <div class="breadContent">
                    <i
                        class="el-icon-arrow-left"
                        v-if="breadList.length > 1"
                        @click="goBackFile"
                    ></i>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item
                            v-for="(item, index) in breadList"
                            :key="index"
                            @click.native="goFile(item, index)"
                            >{{ item.name }}</el-breadcrumb-item
                        >
                    </el-breadcrumb>
                </div>
                <div class="fileTitle">
                    <div class="fileTitleLeft">
                        <div v-if="viewUpload && teshuId != 1">
                            <div v-if="viewClose" class="closeUpload">
                                <div>上传列表</div>
                                <i
                                    class="el-icon-circle-close"
                                    @click="closeUploadClick"
                                ></i>
                            </div>
                            <el-upload
                                class="upload-demo"
                                action
                                :http-request="httpUpload"
                                :before-upload="beforeFilesUpload"
                                multiple
                                :limit="1000"
                                :file-list="fileList"
                                :on-exceed="handleExceed"
                                :on-success="handleSuccess"
                            >
                                <div class="handUpGc">
                                    <el-button
                                        class="handUpGcBtn"
                                        size="small"
                                        type="primary"
                                        >上传工程文件</el-button
                                    >
                                    <div class="handUpGcImg">
                                        <p>
                                            工程文件支持预览的文件格式有：rvt、rfa、rte、skp、nwd、nwc、ifc、dwg、dxf、3dm、stl、dgn、stp、step、rvm、osgb、3ds、3dxml、obj、dae、ply、fbx、dwf、gmp、gtj、gbq、gcl、ggj、gqi、gdq、gjg、igms、gpb、gpv、gsc、gbg、gsh、gtb、gzb
                                        </p>
                                    </div>
                                </div>
                            </el-upload>
                        </div>
                        <div
                            v-if="viewUpload && teshuId != 1"
                            class="handUpDpan"
                        >
                            <el-button
                                size="small"
                                type="primary"
                                @click="sendDing"
                                >上传钉盘文件</el-button
                            >
                            <div class="handUpDpanImg">
                                <p>
                                    钉盘支持预览的文件格式有：pdf、doc、docx、ppt、pptx、xlsx、txt、gif、bmp、png、jpg、ico、tiff、webp、zip、tif、tga、ini、java、xml、html、jsp、js、cpp、h、c、php、pl、pm、pv、perl、json、sql、css、py、sh、jpeg、
                                </p>
                            </div>
                        </div>

                        <el-button
                            size="small"
                            v-if="viewUpload && teshuId != 1"
                            @click="openNewF(1)"
                            >新建文件夹</el-button
                        >
                        <el-button
                            size="small"
                            v-if="viewUpload && teshuId != 1"
                            @click="moveFiles(1)"
                            >移动</el-button
                        >
                        <el-button
                            size="small"
                            type="danger"
                            v-if="titleId != 7 && teshuId != 1"
                            @click="deleteManyFiles"
                            >删除</el-button
                        >
                    </div>
                    <div class="fileTitleRight">
                        <el-input
                            v-model="searchName"
                            placeholder="请输入内容"
                            @keyup.enter.native="searchClick"
                        ></el-input>
                        <el-button
                            size="small"
                            type="primary"
                            @click="searchClick"
                            >搜索</el-button
                        >
                    </div>
                </div>
                <div class="tableFiles">
                    <el-table
                        :data="banner"
                        style="width: 100%"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        @cell-click="goNext"
                    >
                        <el-table-column
                            type="selection"
                            width="55"
                            align="center"
                        ></el-table-column>
                        <el-table-column label="图标" width="100">
                            <template slot-scope="scope">
                                <el-row :gutter="20" class="left">
                                    <el-col :span="3" v-if="scope.row.gurl">
                                        <img
                                            :src="scope.row.gurl"
                                            style="height: 40px; width: 40px"
                                        />
                                    </el-col>
                                    <el-col :span="3" v-else>
                                        <img
                                            src="../../assets/management/guidang.png"
                                            style="height: 34px; width: 38px"
                                            v-show="
                                                scope.row.type == 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/TZ.png"
                                            style="height: 40px; width: 40px"
                                            v-show="
                                                scope.row.filetype == '2' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/MX.png"
                                            style="height: 40px; width: 40px"
                                            v-show="
                                                scope.row.filetype == '3' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/GX.png"
                                            style="height: 40px; width: 40px"
                                            v-show="
                                                scope.row.filetype == '4' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/BD.png"
                                            style="height: 40px; width: 40px"
                                            v-show="
                                                scope.row.filetype == '5' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/GF.png"
                                            style="height: 40px; width: 40px"
                                            v-show="
                                                scope.row.filetype == '6' &&
                                                scope.row.type != 'file'
                                                    ? true
                                                    : false
                                            "
                                        />
                                        <img
                                            src="../../assets/management/SC.png"
                                            style="height: 40px; width: 40px"
                                            v-show="
                                                scope.row.filetype == '7'
                                                    ? true
                                                    : false
                                            "
                                        />
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="文件名称"
                            show-overflow-tooltip="true"
                        >
                            <template slot-scope="scope">
                                <span style="cursor: pointer">{{
                                    scope.row.name
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="70" align="right">
                            <template slot-scope="scope">
                                <img
                                    v-if="scope.row.slurl"
                                    :src="scope.row.slurl"
                                    style="
                                        width: 46px;
                                        height: 25px;
                                        vertical-align: middle;
                                    "
                                    alt=""
                                />
                            </template>
                        </el-table-column>
                        <el-table-column label="上传方式" width="100">
                            <template slot-scope="scope">
                                <el-button
                                    v-if="scope.row.type == 'DD'"
                                    type="text"
                                    >钉盘文件</el-button
                                >
                                <el-button
                                    v-if="scope.row.type == 'bimface'"
                                    type="text"
                                    >工程文件</el-button
                                >
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="日期"
                            sortable
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="80"
                            v-if="titleId != 7"
                        >
                            <template slot-scope="scope">
                                <div
                                    v-if="
                                        scope.row.sq == '2' &&
                                        scope.row.sc == '2' &&
                                        scope.row.bj == '2'
                                    "
                                ></div>
                                <div v-else>
                                    <div v-if="scope.row.teshu != 1">
                                        <el-popover
                                            placement="bottom"
                                            trigger="click"
                                            width="60"
                                            popper-class="filesEditPo"
                                            v-model="scope.row.btnVisible"
                                        >
                                            <div class="filesImgTableEdit">
                                                <el-button
                                                    type="text"
                                                    v-if="
                                                        scope.row.type != 'file'
                                                    "
                                                    @click="downLoad(scope.row)"
                                                    >下载</el-button
                                                >
                                                <el-button
                                                    type="text"
                                                    @click="
                                                        moveFiles(2, scope.row)
                                                    "
                                                    v-if="
                                                        viewUpload &&
                                                        scope.row.quanxian !=
                                                            3 &&
                                                        scope.row.bj == '1'
                                                    "
                                                    >移动</el-button
                                                >
                                                <!-- <el-button
                                            type="text"
                                            @click="shareFiles(scope.row)"
                                        >{{scope.row.quanxian=='0'?'共享':'取消共享'}}</el-button>-->
                                                <el-button
                                                    type="text"
                                                    v-if="
                                                        titleId != 5 &&
                                                        scope.row.quanxian !=
                                                            3 &&
                                                        scope.row.type ==
                                                            'file' &&
                                                        scope.row.sq == '1'
                                                    "
                                                    @click="
                                                        powerManage(scope.row)
                                                    "
                                                    >权限管理</el-button
                                                >
                                                <el-button
                                                    type="text"
                                                    v-if="
                                                        scope.row.quanxian !=
                                                            3 &&
                                                        scope.row.bj == '1'
                                                    "
                                                    @click="
                                                        openNewF(2, scope.row)
                                                    "
                                                    >重命名</el-button
                                                >
                                                <el-button
                                                    type="text"
                                                    v-if="
                                                        scope.row.quanxian !=
                                                            3 &&
                                                        scope.row.sc == '1'
                                                    "
                                                    @click="
                                                        deleteFiles(scope.row)
                                                    "
                                                    >删除</el-button
                                                >
                                            </div>
                                            <el-button
                                                type="text"
                                                slot="reference"
                                                icon="el-icon-more"
                                            ></el-button>
                                        </el-popover>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="size"
                            label="大小"
                            width="120"
                            align="center"
                        ></el-table-column>
                        <el-table-column width="60" align="center" label="收藏">
                            <template slot-scope="scope">
                                <img
                                    v-if="scope.row.quanxian != 3"
                                    :src="
                                        scope.row.collect == '1'
                                            ? imgData.aurl
                                            : imgData.url
                                    "
                                    :class="
                                        scope.row.collect == '1'
                                            ? 'activeCollet'
                                            : 'deadCollet'
                                    "
                                    @click="imgCollect(scope.row)"
                                />
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="cPag">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="10"
                            layout="prev, pager, next, jumper"
                            :total="total"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog
            title="预览   (ESC关闭)"
            :visible.sync="preViewVisible"
            width="80%"
            :close-on-click-modal="false"
            @close="closeBimface"
            class="viewFileDialog"
        >
            <div style="text-align: right; margin-bottom: 10px; color: red">
                <i
                    class="el-icon-question"
                    style="font-size: 16px; color: red; cursor: pointer"
                    @click="openWarn"
                ></i>
            </div>
            <div id="domId"></div>
            <el-dialog
                width="900px"
                title="提示"
                :visible.sync="innerVisible"
                append-to-body
            >
                <div style="text-align: center">
                    <p style="margin-bottom: 30px; font-size: 16px">
                        如果无法查看文件，请去钉钉的系统设置-开启WebGL与SVG支持
                    </p>
                    <el-carousel
                        arrow="always"
                        :autoplay="false"
                        height="420px"
                    >
                        <el-carousel-item
                            v-for="item in picWarnList"
                            :key="item"
                        >
                            <img :src="item" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-dialog>
        </el-dialog>
        <el-dialog
            title="移动文件"
            :visible.sync="moveVisible"
            width="30%"
            :close-on-click-modal="false"
            @close="closeMove"
            class="moveDialog"
        >
            <div class="moveClass">
                <el-tree
                    :props="sDefaultProps"
                    :load="sloadNode"
                    node-key="parentid"
                    accordion="true"
                    lazy
                    :expand-on-click-node="false"
                    ref="stree"
                    show-checkbox
                    check-strictly
                    @check="handleCheck"
                ></el-tree>
            </div>
            <div class="moveBtn">
                <el-button
                    type="primary"
                    :loading="loaded"
                    @click="moveFileClick"
                    >确定</el-button
                >
                <el-button @click="closeMove">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="权限设置"
            :visible.sync="PowerFileVisible"
            width="30%"
            :close-on-click-modal="false"
            @close="closePower"
            class="PowerDialog"
        >
            <div class="PowerClass">
                <div class="pfname">{{ powerFilesName }}</div>
                <el-button type="text" @click="addPeople(1)"
                    >添加成员</el-button
                >
                <el-table
                    ref="multipleWE"
                    :data="pfPeople"
                    style="width: 100%"
                    height="250"
                    @selection-change="SelectionChangeWe"
                    class="pOneTable"
                >
                    <el-table-column
                        prop="name"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-popover
                                placement="bottom"
                                trigger="click"
                                width="60"
                                popper-class="filesEditPo"
                            >
                                <div class="filesImgTableEdit">
                                    <el-button
                                        type="text"
                                        @click="peopleMClick(scope.row, 1)"
                                        >可管理</el-button
                                    >
                                    <el-button
                                        type="text"
                                        @click="peopleMClick(scope.row, 2)"
                                        >可编辑</el-button
                                    >
                                    <el-button
                                        type="text"
                                        @click="peopleMClick(scope.row, 3)"
                                        >可查看</el-button
                                    >
                                    <el-button
                                        type="text"
                                        @click="deletePeople(1, scope.row)"
                                        >删除</el-button
                                    >
                                </div>
                                <el-button
                                    type="text"
                                    slot="reference"
                                    class="fimgMsg"
                                >
                                    <i
                                        class="el-icon-setting el-icon--left"
                                    ></i>
                                    {{ fortPower[scope.row.type] }}
                                    <i
                                        class="el-icon-caret-bottom el-icon--right"
                                    ></i>
                                </el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- <div class="PowerBtn">
                <el-button type="primary" :loading="loaded" @click="PowerClick">确定</el-button>
                <el-button @click="closePower">取消</el-button>
            </div>-->
        </el-dialog>

        <el-dialog
            title="权限设置"
            :visible.sync="PowerFileOneVisible"
            width="750px"
            :close-on-click-modal="false"
            @close="cancelEdit"
            class="PowerDialog"
        >
            <div class="PowerClass">
                <!-- <div class="powerTopBtn">
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        @click="addPeople(2)"
                        >添加成员</el-button
                    >
                    <el-button
                        type="danger"
                        size="medium"
                        plain
                        @click="deletePeople(2)"
                        >删除成员</el-button
                    >
                </div> -->
                <el-table
                    :data="newPowerPeopleList"
                    height="400px"
                    style="width: 100%"
                    @selection-change="nppChange"
                >
                    <el-table-column
                        type="selection"
                        :selectable="checkSelectable"
                        width="55"
                    >
                    </el-table-column>
                    <el-table-column
                        label="成员"
                        width="130px"
                        show-overflow-tooltip="true"
                    >
                        <template slot-scope="scope">
                            <div class="pdddInfo">
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
                    <el-table-column label="权限">
                        <template slot-scope="scope">
                            <div>
                                <el-checkbox
                                    v-for="(ilist, lindex) in scope.row.role"
                                    :label="ilist.id"
                                    v-model="ilist.checkAll"
                                    :key="lindex"
                                    :disabled="
                                        scope.row.zbj == '1' ? true : false
                                    "
                                    @change="
                                        handlecheckedRoleChange(
                                            $event,
                                            scope.row.role,
                                            ilist,
                                            index
                                        )
                                    "
                                    >{{ ilist.name }}</el-checkbox
                                >
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="pdPeopleList">
                    <div
                        v-for="(item, index) in newPowerPeopleList"
                        :key="index"
                    >
                        <div>
                            <img v-if="item.avatar" :src="item.avatar" alt="" />
                            <span v-else>{{
                                item.name.length <= 2
                                    ? item.name
                                    : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                            <div>{{ item.name }}</div>
                        </div>
                        <div>
                            <el-checkbox
                                v-for="(ilist, lindex) in item.role"
                                :label="ilist.id"
                                v-model="ilist.checkAll"
                                :key="lindex"
                                @change="
                                    handlecheckedRoleChange(
                                        $event,
                                        item,
                                        ilist,
                                        index
                                    )
                                "
                                >{{ ilist.name }}</el-checkbox
                            >
                        </div>
                    </div>
                </div> -->

                <!-- <el-tabs
                    tab-position="left"
                    v-model="editableTabsValue"
                    style="height: 250px"
                    @tab-click="tabClick"
                >
                    <el-tab-pane label="谁可以管理" name="1">
                        <el-table
                            ref="multipleWm"
                            :data="whoManage"
                            tooltip-effect="dark"
                            style="width: 100%"
                            height="200"
                            @selection-change="SelectionChangeWm"
                        >
                            <el-table-column
                                type="selection"
                                width="55"
                            ></el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                show-overflow-tooltip
                            ></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="谁可以编辑/上传" name="2">
                        <el-table
                            ref="multipleWe"
                            :data="whoEdit"
                            tooltip-effect="dark"
                            style="width: 100%"
                            height="200"
                            @selection-change="SelectionChangeWe"
                        >
                            <el-table-column
                                type="selection"
                                width="55"
                            ></el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                show-overflow-tooltip
                            ></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="谁可以查看" name="3">
                        <el-table
                            ref="multipleWv"
                            :data="whoView"
                            tooltip-effect="dark"
                            style="width: 100%"
                            height="200"
                            @selection-change="SelectionChangeWv"
                        >
                            <el-table-column
                                type="selection"
                                width="55"
                            ></el-table-column>
                            <el-table-column
                                prop="name"
                                label="姓名"
                                show-overflow-tooltip
                            ></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs> -->
            </div>
            <div slot="footer" class="dialog-footer">
                <div style="display: flex; justify-content: space-between">
                    <div>
                        <el-checkbox v-model="isCopy"
                            >继承上级文件夹权限</el-checkbox
                        >
                    </div>
                    <div>
                        <el-button @click="cancelEdit">取 消</el-button>
                        <el-button type="primary" @click="editPeoplePower"
                            >确 定</el-button
                        >
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
            :title="newFFTitle"
            :visible.sync="newView"
            width="30%"
            @close="closeTaskType('typeform')"
            class="newAddFileDialog"
        >
            <el-form
                ref="typeform"
                label-width="100px"
                :rules="addNewFileRules"
                :label-position="labelPosition"
                :model="addNewFForm"
                @submit.native.prevent
            >
                <el-form-item label="文件名称：" prop="name">
                    <el-input
                        v-model="addNewFForm.name"
                        maxlength="25"
                    ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeTaskType('typeform')">取 消</el-button>
                <el-button type="primary" @click="addNewFile('typeform')"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
    name: 'filesImg',
    data() {
        return {
            isCopy: true,
            pickerVisible: false,
            peopleIsShow: true,
            pickerNum: 1000,
            fortPower: {
                manage: '可管理',
                upload: '可编辑',
                view: '可查看'
            },
            peoplePickVisible: false,
            pfPeople: [], //文件权限人员设置
            whoManage: [],
            whoEdit: [],
            whoView: [],
            editableTabsValue: '1',
            PowerFileVisible: false,
            PowerFileOneVisible: false,
            addNewFileRules: {
                name: [
                    {
                        required: true,
                        message: '名称不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            searchName: '',
            banner: [],
            newFFTitle: '新建文件夹',
            newView: false,
            breadList: [{ name: '', id: '' }], //导航list
            btnVisible: false,
            total: '',
            pagesize: 10,
            currentPage: 1,
            imgData: {
                url: 'static/images/task/empty.png',
                aurl: 'static/images/task/star.png'
            }, //收藏图标
            addNewFForm: {
                name: ''
            },
            imgView: true,
            titleName: '',
            titleId: 0, //左侧菜单栏ID
            loading: false,
            g_object_name: '',
            g_object_name_type: 'random_name',
            urlHost: '',
            policyBase64: '',
            accessid: '',
            signature: '',
            expire: 0,
            callbackbody: '',
            key: '',
            host: '',
            uploadType: 1,
            bimHost: '',
            bimObjectKey: '',
            bimPolicy: '',
            bimOSSAccessKeyId: '',
            bimCallback: '',
            bimSignature: '',
            viewUpload: true, //上传按钮是否可见
            filesPower: 0, //是否共享
            preViewVisible: false,
            viewToken: '',
            currentFilesId: '', //当前文件夹ID
            selectFilesData: [],
            dialogFileType: 1,
            fileList: [],
            loaded: false,
            viewClose: false,
            sDefaultProps: {
                id: 'prantid',
                label: 'name',
                children: 'content',
                isLeaf: 'leaf'
            },
            pDefaultProps: {
                id: 'emplId',
                label: 'name',
                children: 'user',
                isLeaf: 'leaf'
            },
            moveVisible: false,
            moveData: [], //移动的文件ID数组
            moveId: '', //移动到的文件夹ID
            managePId: '',
            powerFilesName: '', //权限名称
            pickType: '',
            selectPowerPeople: [], //选中的权限人员
            editFileNameID: '',
            newNode: [],
            newResolve: [],
            editPeople: [], //操作文件人员
            previewFileId: '',
            teshuId: 0,
            newPowerPeopleList: [],
            moreSelectPeople: [],
            isCanVisible: false,
            innerVisible: false,
            picWarnList: [
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/WzfnNZZfQP1615520214522.png',
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/sijBDStyrj1615520216033.png',
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/jAH6EcdHpZ1615520216243.png'
            ]
        };
    },

    methods: {
        openWarn() {
            this.innerVisible = true;
        },
        addPeople(type) {
            const that = this;
            // that.pickType = type;
            // this.pickerVisible = true;
            let picker = that.newPowerPeopleList.map((item, index) => {
                return item.emplId;
            });
            dd.ready(function () {
                dd.biz.contact.complexPicker({
                    title: '通讯录', //标题
                    corpId: that.$store.state.cid, //企业的corpId
                    multiple: true, //是否多选
                    limitTips: '超出了', //超过限定人数返回提示
                    maxUsers: 99, //最大可选人数
                    pickedUsers: picker, //已选用户
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
                        that.pickerSelect(result.users, that.pickType);
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
        //文件权限人员更改为可管理
        peopleMClick(row, stype) {
            this.editPeople = [row];
            let newArr = [];
            let users = { manage: [], upload: [], view: [] };
            let newPeople = this.pfPeople;
            newPeople.forEach((item) => {
                if (item.emplId == row.emplId) {
                    if (stype == 1) {
                        item.type = 'manage';
                    } else if (stype == 2) {
                        item.type = 'upload';
                    } else if (stype == 3) {
                        item.type = 'view';
                    }
                }
            });
            newPeople.forEach((ele) => {
                if (ele.type == 'manage') {
                    users.manage.push(ele);
                } else if (ele.type == 'upload') {
                    users.upload.push(ele);
                } else if (ele.type == 'view') {
                    users.view.push(ele);
                }
            });
            this.addNewPowerPeople(users, 0, 'edit');
        },
        //删除权限人员
        deletePeople(type, row) {
            let newArr = [];
            let users = { manage: [], upload: [], view: [] };
            if (type == 1) {
                this.editPeople = [row];
                let rowArr = [row];
                newArr = this.pfPeople.filter((item) => {
                    return !rowArr.some((ele) => ele.emplId === item.emplId);
                });
                if (newArr.length > 0) {
                    newArr.forEach((item) => {
                        if (item.type == 'manage') {
                            users.manage.push(item);
                        } else if (item.type == 'upload') {
                            users.upload.push(item);
                        } else if (item.type == 'view') {
                            users.view.push(item);
                        }
                    });
                } else {
                    users.manage = [];
                    users.upload = [];
                    users.view = [];
                }
                this.addNewPowerPeople(users, 0, 'delete');
            } else if (type == 2) {
                let newType;
                if (this.editableTabsValue == 1) {
                    newType = 1;
                    newArr = this.whoManage.filter((item) => {
                        return !this.selectPowerPeople.some(
                            (ele) => ele.emplId === item.emplId
                        );
                    });
                    users.manage = newArr;
                } else if (this.editableTabsValue == 2) {
                    newType = 2;
                    newArr = this.whoEdit.filter((item) => {
                        return !this.selectPowerPeople.some(
                            (ele) => ele.emplId === item.emplId
                        );
                    });
                    users.upload = newArr;
                } else if (this.editableTabsValue == 3) {
                    newType = 3;
                    newArr = this.whoView.filter((item) => {
                        return !this.selectPowerPeople.some(
                            (ele) => ele.emplId === item.emplId
                        );
                    });
                    users.view = newArr;
                }
                this.addNewPowerPeople(users, 0, 'delete2');
            }
        },
        addNewPowerPeople(users, newType, stype) {
            const _this = this;
            if (stype == 'delete2') {
                if (_this.selectPowerPeople.length < 1) {
                    console.log('全部为空');
                    _this.$message.warning('请您先选择人员');
                } else {
                    _this.$axios
                        .post('/cy_xiezhu/FileRoleAdd', {
                            corp_id: _this.$store.state.cid,
                            xmid: _this.$store.state.projectInfo.pid,
                            userid: _this.$store.state.userInfo.uid,
                            users: users,
                            fids: [_this.managePId],
                            admin: _this.$store.state.userInfo.admin,
                            type: newType,
                            admin: _this.$store.state.userInfo.admin
                        })
                        .then((res) => {
                            if (res.data.code == 200) {
                                _this.peoplePickVisible = false;
                                users.manage = [];
                                users.upload = [];
                                users.view = [];

                                _this.getRebort(stype);

                                _this.getPowerPeopleList();
                                _this.$message.success('权限修改成功');
                            } else {
                                _this.$message.warning(`${res.data.msg}`);
                            }
                        });
                }
            } else {
                _this.$axios
                    .post('/cy_xiezhu/FileRoleAdd', {
                        corp_id: _this.$store.state.cid,
                        xmid: _this.$store.state.projectInfo.pid,
                        userid: _this.$store.state.userInfo.uid,
                        users: users,
                        fids: [_this.managePId],
                        admin: _this.$store.state.userInfo.admin,
                        type: newType,
                        admin: _this.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            _this.peoplePickVisible = false;
                            users.manage = [];
                            users.upload = [];
                            users.view = [];

                            _this.getRebort(stype);

                            _this.getPowerPeopleList();
                            _this.$message.success('权限修改成功');
                        } else {
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    });
            }
        },
        //操作执行记录
        getRebort(stype) {
            const _this = this;
            let name, czconten;
            if (stype == 'delete') {
                czconten = '删除人员权限' + JSON.stringify(_this.editPeople);
                name = 6;
            } else if (stype == 'delete2') {
                czconten =
                    '删除人员权限' + JSON.stringify(_this.selectPowerPeople);
                name = 6;
            } else if (stype == 'edit') {
                czconten = '更改人员权限' + JSON.stringify(_this.editPeople);
                name = 6;
            } else if (stype == 'add') {
                czconten = '添加人员权限' + JSON.stringify(_this.editPeople);
                name = 6;
            } else if (stype == 'preview') {
                czconten = '预览文件' + _this.previewFileId;
                name = 1;
            }
            _this.$axios
                .post('/cy_xiezhu/CreatedJiLu', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid,
                    fid: _this.managePId || _this.previewFileId,
                    name: name,
                    czconten: czconten,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        console.log(res.data.msg);
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        closePicker() {
            this.peoplePickVisible = false;
            this.$refs.ptree.setCheckedKeys([]);
        },
        nppChange(val) {
            console.log(val);
            this.moreSelectPeople = val;
        },
        checkSelectable(row) {
            return row.zbj == '2';
        },
        cancelEdit() {
            this.PowerFileOneVisible = false;
        },
        editPeoplePower() {
            const _this = this;
            let newID = 1;
            if (_this.isCopy) {
                newID = 1;
            } else {
                newID = 2;
            }
            _this.$axios
                .post('/cy_xiezhu/FileRoleAdd', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid,
                    users: _this.newPowerPeopleList,
                    fids: [_this.managePId],
                    admin: _this.$store.state.userInfo.admin,
                    copy: newID,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.PowerFileOneVisible = false;
                        _this.getPowerPeopleList();
                        _this.getRebort('edit');
                        _this.$message.success('权限修改成功');
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        handlecheckedRoleChange(e, item, list, index) {
            let non = [];
            this.$nextTick(() => {
                if (list.name == '授权') {
                    if (list.checkAll) {
                        item.forEach((illist) => {
                            illist.id = 1;
                            illist.checkAll = true;
                        });
                    }
                }
                if (list.name == '查看') {
                    if (list.checkAll) {
                        item[1].checkAll = true;
                        item[1].id = 1;
                    } else {
                        item[1].checkAll = false;
                        item[1].id = 2;
                    }
                }
                if (list.name == '下载') {
                    if (list.checkAll) {
                        item[0].checkAll = true;
                        item[0].id = 1;
                    } else {
                        item[0].checkAll = false;
                        item[0].id = 2;
                    }
                }
                this.newPowerPeopleList = this.newPowerPeopleList.concat(non);
                this.newPowerPeopleList.forEach((item) => {
                    item.role.forEach((list) => {
                        if (list.checkAll) {
                            list.id = 1;
                        } else {
                            list.id = 2;
                        }
                    });
                });
            });
            console.log('44444+++' + JSON.stringify(this.newPowerPeopleList));
        },
        //获取权限人员列表
        getPowerPeopleList() {
            const _this = this;
            // let type = 0;
            // if (_this.pickType == 1) {
            //     type = 0;
            // } else if (_this.pickType == 2) {
            //     if (_this.editableTabsValue == 1) {
            //         type = 1;
            //     } else if (_this.editableTabsValue == 2) {
            //         type = 2;
            //     } else if (_this.editableTabsValue == 3) {
            //         type = 3;
            //     }
            // }

            _this.$axios
                .post('/cy_xiezhu/FileRoleUserLisst', {
                    fid: _this.managePId,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.copy == 1) {
                            _this.isCopy = true;
                        } else {
                            _this.isCopy = false;
                        }
                        _this.newPowerPeopleList = JSON.parse(
                            JSON.stringify(res.data.content)
                        );

                        _this.newPowerPeopleList.forEach((item) => {
                            item.role.forEach((list) => {
                                if (list.id == 1) {
                                    list.checkAll = true;
                                } else {
                                    list.checkAll = false;
                                }
                            });
                        });
                        // if (_this.pickType == 1) {
                        //     _this.pfPeople = res.data.content;
                        // } else if (_this.pickType == 2) {
                        //     if (_this.editableTabsValue == 1) {
                        //         _this.whoManage = res.data.content;
                        //     } else if (_this.editableTabsValue == 2) {
                        //         _this.whoEdit = res.data.content;
                        //     } else if (_this.editableTabsValue == 3) {
                        //         _this.whoView = res.data.content;
                        //     }
                        // }
                    }
                });
        },
        pickerSelect(arr, type) {
            const _this = this;
            let users = { manage: [], upload: [], view: [] };
            let newPeople = [];
            let newType = 0;
            let newArr = arr;
            newArr.forEach((item) => {
                if (item.emplId) {
                    newPeople.push(item);
                }
            });
            _this.editPeople = newPeople;

            if (_this.pickType == 1) {
                users.view = newPeople;

                newType = 0;
                let nvArray = [],
                    nuArray = [],
                    nmArray = [];
                _this.pfPeople.forEach((item) => {
                    if (item.type == 'manage') {
                        nmArray.push(item);
                    } else if (item.type == 'upload') {
                        nuArray.push(item);
                    } else if (item.type == 'view') {
                        nvArray.push(item);
                    }
                });
                users.view = users.view.concat(nvArray);
                users.upload = users.upload.concat(nuArray);
                users.manage = users.manage.concat(nmArray);
            } else if (_this.pickType == 2) {
                if (_this.editableTabsValue == 1) {
                    newType = 1;
                    users.manage = newPeople;
                    users.manage = users.manage.concat(_this.whoManage);
                } else if (_this.editableTabsValue == 2) {
                    newType = 2;
                    users.upload = newPeople;
                    users.upload = users.upload.concat(_this.whoEdit);
                } else if (_this.editableTabsValue == 3) {
                    newType = 3;
                    users.view = newPeople;
                    users.view = users.view.concat(_this.whoEdit);
                }
            }
            if (
                users.manage.length < 1 &&
                users.upload.length < 1 &&
                users.view.length < 1
            ) {
                console.log('全部为空');
            } else {
                _this.$axios
                    .post('/cy_xiezhu/FileRoleAdd', {
                        corp_id: _this.$store.state.cid,
                        xmid: _this.$store.state.projectInfo.pid,
                        userid: _this.$store.state.userInfo.uid,
                        users: users,
                        fids: [_this.managePId],
                        admin: _this.$store.state.userInfo.admin,
                        type: newType,
                        admin: _this.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            _this.peoplePickVisible = false;
                            users.manage = [];
                            users.upload = [];
                            users.view = [];
                            _this.getPowerPeopleList();
                            _this.getRebort('add');
                            _this.$message.success('权限修改成功');
                        } else {
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    });
            }
            _this.pickerVisible = false;
            _this.peopleIsShow = false;
            _this.$nextTick(() => {
                _this.peopleIsShow = true;
            });
        },
        SelectionChangeWv(val) {
            this.selectPowerPeople = val;
        },
        SelectionChangeWe(val) {
            this.selectPowerPeople = val;
        },
        SelectionChangeWm(val) {
            this.selectPowerPeople = val;
        },
        //关闭权限管理覆盖层
        closePowerOne() {
            this.PowerFileOneVisible = false;
        },
        closePower() {
            this.PowerFileVisible = false;
        },
        //切换管理权限
        tabClick(tab) {
            this.$refs.multipleWm.clearSelection();
            this.$refs.multipleWe.clearSelection();
            this.$refs.multipleWv.clearSelection();
            this.getPowerPeopleList();
        },
        //打开权限管理覆盖层
        powerManage(row) {
            this.managePId = row.id;
            this.powerFilesName = row.name;

            if (row.type == 'file') {
                this.PowerFileOneVisible = true;
                this.pickType = 2;
            }
            // else {
            //     this.PowerFileVisible = true;
            //     this.pickType = 1;
            // }
            this.getPowerPeopleList();
        },
        //取消移动
        closeMove() {
            this.moveVisible = false;
        },
        //移动文件
        moveFileClick() {
            const _this = this;
            if (_this.moveId) {
                _this.$axios
                    .post('/cy_xiezhu/YiDongFile', {
                        corp_id: _this.$store.state.cid,
                        xmid: _this.$store.state.projectInfo.pid,
                        userid: _this.$store.state.userInfo.uid,
                        parentid: _this.moveId,
                        fids: _this.moveData,
                        admin: _this.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            _this.moveVisible = false;
                            _this.$message.success(res.data.msg);
                            _this.getFileList();
                        } else {
                            _this.$message.warning(res.data.msg);
                        }
                    });
            } else {
                _this.$message.warning('请先选择文件夹');
            }
        },
        //el-tree执行单选
        handleCheck(a, b) {
            //a为传递给 data 属性的数组中该节点所对应的对象；b为树目前的选中状态对象
            this.$refs.stree.setCheckedNodes([a]);
            this.moveId = a.parentid;
        },
        //文件夹树形
        sloadNode(node, resolve) {
            const that = this;
            that.newNode = node;
            that.newResolve = resolve;
            that.newNode.childNodes = [];
            let newPrivate = '';
            if (that.titleId == 5) {
                newPrivate = 5;
            } else {
                newPrivate = '';
            }
            if (node.level === 0) {
                that.$axios
                    .post('/cy_xiezhu/FileJiaGou', {
                        xmid: that.$store.state.projectInfo.pid,
                        userid: that.$store.state.userInfo.uid,
                        corp_id: that.$store.state.cid,
                        parentid: 1,
                        private: newPrivate,
                        admin: that.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            let result = res.data.content;
                            return resolve(result);
                        }
                    });
            } else if (node.level > 0) {
                let _id = node.data.parentid;
                //-----获取子级组织
                that.$axios
                    .post('/cy_xiezhu/FileJiaGou', {
                        xmid: that.$store.state.projectInfo.pid,
                        userid: that.$store.state.userInfo.uid,
                        parentid: _id,
                        corp_id: that.$store.state.cid,
                        private: newPrivate,
                        admin: that.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            let result = res.data.content;
                            return resolve(result);
                        }
                    });
            }
        },
        closeUploadClick() {
            let newDom = document.getElementsByClassName('el-upload-list')[0];
            newDom.style.display = 'none';
            this.viewClose = false;
            this.fileList = [];
        },
        //搜索
        searchClick() {
            this.currentPage = 1;
            this.getFileList();
        },
        //进入任意文件夹
        goFile(item, index) {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/FileUserRole', {
                    admin: _this.$store.state.userInfo.admin,
                    xmid: _this.$store.state.projectInfo.pid,
                    role: '查看',
                    fid: item.id,
                    userid: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.role == 1) {
                            _this.teshuId = item.teshu;
                            if (item.id != _this.currentFilesId) {
                                _this.searchName = '';
                                _this.breadList = _this.breadList.splice(
                                    0,
                                    index + 1
                                );
                                _this.currentFilesId = item.id;
                                _this.getFileList();
                            }
                        } else {
                            _this.$message.warning('您没有查看该文件夹');
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //返回上一层文件夹
        goBackFile() {
            this.searchName = '';
            this.breadList.pop();
            this.currentFilesId = this.breadList[this.breadList.length - 1].id;
            this.teshuId = this.breadList[this.breadList.length - 1].teshu;
            this.getFileList();
        },
        //关闭新建文件夹覆盖层
        closeTaskType(formName) {
            this.newView = false;
            this.addNewFForm.name = '';
            // this.$refs[formName].resetFields();
        },
        //新建文件夹
        addNewFile(formName) {
            const _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.dialogFileType == 1) {
                        _this.$axios
                            .post('/cy_xiezhu/SaveFile', {
                                corp_id: _this.$store.state.cid,
                                userid: _this.$store.state.userInfo.uid,
                                xmid: _this.$store.state.projectInfo.pid,
                                type: 'file',
                                url: ' ',
                                name: _this.addNewFForm.name,
                                filetype: _this.titleId,
                                parentid: _this.currentFilesId || _this.titleId,
                                admin: _this.$store.state.userInfo.admin
                            })
                            .then((res) => {
                                if (res.data.code == 200) {
                                    _this.newView = false;
                                    _this.getFileList();
                                    _this.addNewFForm.name = '';
                                    _this.$message.success('新建文件夹成功');
                                } else if (res.data.code == 300) {
                                    dd.ready(function () {
                                        dd.device.notification.alert({
                                            message: res.data.msg,
                                            title: '提示', //可传空
                                            buttonName: '收到',
                                            onSuccess: function () {
                                                //onSuccess将在点击button之后回调
                                                /*回调*/
                                            },
                                            onFail: function (err) {}
                                        });
                                    });
                                } else {
                                    _this.$message.warning(`${res.data.msg}`);
                                }
                            });
                    } else if (_this.dialogFileType == 2) {
                        _this.$axios
                            .post('/cy_xiezhu/UpdateFile', {
                                corp_id: _this.$store.state.cid,
                                userid: _this.$store.state.userInfo.uid,
                                xmid: _this.$store.state.projectInfo.pid,
                                fid: _this.editFileNameID,
                                name: _this.addNewFForm.name,
                                admin: _this.$store.state.userInfo.admin
                            })
                            .then((res) => {
                                if (res.data.code == 200) {
                                    _this.newView = false;
                                    _this.getFileList();
                                    _this.addNewFForm.name = '';
                                    _this.$message.success('更改名称成功');
                                } else {
                                    _this.$message.warning(`${res.data.msg}`);
                                }
                            });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //打开新建文件夹
        openNewF(type, row) {
            const _this = this;
            if (type == 1) {
                _this.$axios
                    .post('/cy_xiezhu/FileUserRole', {
                        admin: _this.$store.state.userInfo.admin,
                        xmid: _this.$store.state.projectInfo.pid,
                        role: '创建',
                        fid: _this.currentFilesId,
                        userid: _this.$store.state.userInfo.uid
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            if (res.data.role == 1) {
                                _this.addNewFForm.name = '';
                                _this.newFFTitle = '新建文件夹';
                                _this.dialogFileType = 1;
                                _this.newView = true;
                            } else {
                                _this.newView = false;
                                _this.$message.warning('您没有权限新建文件夹');
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (type == 2) {
                _this.editFileNameID = row.id;
                let newName = row.name;
                if (row.type == 'file') {
                    _this.addNewFForm.name = newName;
                } else {
                    _this.addNewFForm.name = newName.substring(
                        0,
                        newName.lastIndexOf('.')
                    );
                }
                _this.newFFTitle = '重命名';
                _this.dialogFileType = 2;
                _this.newView = true;
            }
        },
        //点击文件名
        goNext(row, column, cell, event) {
            const _this = this;
            switch (column.label) {
                case '文件名称':
                    if (row.type == 'file') {
                        _this.$axios
                            .post('/cy_xiezhu/FileUserRole', {
                                admin: _this.$store.state.userInfo.admin,
                                xmid: _this.$store.state.projectInfo.pid,
                                role: '查看',
                                fid: row.id,
                                userid: _this.$store.state.userInfo.uid
                            })
                            .then((res) => {
                                if (res.data.code == 200) {
                                    if (res.data.role == 1) {
                                        _this.teshuId = row.teshu;
                                        _this.searchName = '';
                                        _this.currentFilesId = row.id;
                                        _this.formateArrObjData(
                                            _this.breadList,
                                            row,
                                            'id'
                                        );
                                        _this.getFileList();
                                    } else {
                                        _this.$message.warning(
                                            '您没有查看该文件夹'
                                        );
                                    }
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        _this.previewFileId = row.id;
                        _this.previewFiles(row);
                    }
                    break;
            }
        },
        formateArrObjData(initialArr, obj, pro) {
            if (initialArr.findIndex((val) => val[pro] === obj[pro]) == -1) {
                initialArr.push(obj);
            }
            return initialArr;
        },
        //移动文件
        moveFiles(type, data) {
            this.sloadNode(this.newNode, this.newResolve);
            if (type == 1) {
                if (this.selectFilesData.length > 0) {
                    this.moveData = this.selectFilesData.map((item) => {
                        if (!item.id) return '';
                        return item.id;
                    });
                    this.moveVisible = true;
                } else {
                    this.$message.warning('请您先选择文件');
                }
            } else if (type == 2) {
                this.moveData = [data.id];
                this.moveVisible = true;
            }
        },
        //删除文件
        deleteManyFiles() {
            if (this.selectFilesData.length > 0) {
                this.goDelete();
            } else {
                this.$message.warning('请您先选择文件');
            }
        },
        goDelete() {
            const _this = this;
            let newPeople = this.selectFilesData.map((item) => {
                if (!item.id) return '';
                return item.id;
            });
            _this.$axios
                .post('/cy_xiezhu/DeleteFile', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    fids: newPeople,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.$refs.multipleTable.clearSelection();
                        _this.$message.success(`${res.data.msg}`);
                        _this.getFileList();
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        //多选
        handleSelectionChange(val) {
            this.selectFilesData = val;
        },
        closeBimface() {
            document.getElementById('domId').innerHTML = '';
            this.preViewVisible = false;
        },
        get_signature() {
            const _this = this;
            _this.$axios.post('/ossapi/sign/get').then(
                function (response) {
                    _this.urlHost = response.data.host;
                    let obj = response.data;

                    _this.host = obj['host'];
                    _this.policyBase64 = obj['policy'];
                    _this.accessid = obj['accessid'];
                    _this.signature = obj['signature'];
                    _this.expire = parseInt(obj['expire']);
                    _this.callbackbody = obj['callback'];
                    _this.key = obj['dir'];
                    return true;
                },
                function (err) {
                    console.log(err);
                }
            );
        },
        random_string(len) {
            var len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            var maxPos = chars.length;
            var pwd = '';
            for (let i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd + new Date().getTime();
        },
        get_suffix(filename) {
            let pos = filename.lastIndexOf('.');
            let suffix = '';
            if (pos != -1) {
                suffix = filename.substring(pos);
            }
            return suffix;
        },
        calculate_object_name(filename) {
            const _this = this;
            if (_this.g_object_name_type == 'local_name') {
                _this.g_object_name += '${filename}';
            } else if (_this.g_object_name_type == 'random_name') {
                let suffix = _this.get_suffix(filename);
                _this.g_object_name =
                    _this.key + _this.random_string(10) + suffix;
                // hostU = g_object_name;
            }
            return '';
        },
        get_uploaded_object_name(filename) {
            const _this = this;
            if (_this.g_object_name_type == 'local_name') {
                tmp_name = _this.g_object_name;
                tmp_name = tmp_name.replace('${filename}', filename);
                return tmp_name;
            } else if (_this.g_object_name_type == 'random_name') {
                return _this.g_object_name;
            }
        },
        set_upload_param(filename, ret, regFile, reg) {
            const _this = this;
            if (ret == false) {
                ret = _this.get_signature();
            }
            _this.g_object_name = _this.key;
            if (filename != '') {
                let suffix = _this.get_suffix(filename);
                _this.calculate_object_name(filename);
            }
            // hostU = _this.g_object_name;
            let new_multipart_params = new FormData();
            new_multipart_params.append('key', _this.g_object_name);
            new_multipart_params.append('policy', _this.policyBase64);
            new_multipart_params.append('OSSAccessKeyId', _this.accessid);
            new_multipart_params.append('success_action_status', '200');
            new_multipart_params.append('callback', _this.callbackbody);
            new_multipart_params.append('signature', _this.signature);

            _this.bimUpload(regFile, 1, reg);
        },
        //预览
        previewFiles(row) {
            const _this = this;
            if (row.type == 'bimface') {
                _this.preViewVisible = true;
                _this.previewBIM(row.id);
            } else if (row.type == 'DD') {
                _this.watchFiles(row.url);
                _this.getRebort('preview');
            } else if (row.type == 'OSS') {
                let newType = row.name.substring(row.name.lastIndexOf('.') + 1);
                if (
                    newType == 'png' ||
                    newType == 'jpg' ||
                    newType == 'jpeg' ||
                    newType == 'gif' ||
                    newType == 'bmp'
                ) {
                    _this.previewPic(row.url);
                } else {
                    _this.previewOffice(row.url);
                }
                _this.getRebort('preview');
            }
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
        //下载
        downLoad(row) {
            const _this = this;
            if (row.type == 'bimface') {
                _this.$axios
                    .post('/cy_xiezhu/GetBimFaceFileUrl', {
                        fileId: row.url,
                        admin: _this.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        if (res.data.code == 'success') {
                            dd.ready(function () {
                                dd.biz.util.downloadFile({
                                    url: res.data.data, //要下载的文件的url
                                    name: row.name, //定义下载文件名字
                                    onProgress: function (msg) {
                                        console.log(msg);
                                    },
                                    onSuccess: function (result) {},
                                    onFail: function () {}
                                });
                            });
                        } else {
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    });
            } else if (row.type == 'OSS') {
                dd.ready(function () {
                    dd.biz.util.downloadFile({
                        url: row.url, //要下载的文件的url
                        name: row.name, //定义下载文件名字
                        onProgress: function (msg) {
                            console.log(msg);
                        },
                        onSuccess: function (result) {},
                        onFail: function (err) {}
                    });
                });
            }
        },
        //删除
        deleteFiles(row) {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/DeleteFile', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    fids: [row.id],
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.$message.success(`${res.data.msg}`);
                        _this.getFileList();
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        //共享
        shareFiles(row) {
            const _this = this;
            let newPower = 0;
            if (row.quanxian == '1') {
                newPower = 0;
            } else if (row.quanxian == '0') {
                newPower = 1;
            }
            _this.$axios
                .post('/cy_xiezhu/UpdateFile', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    fid: row.id,
                    userid: _this.$store.state.userInfo.uid,
                    quanxian: newPower,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (newPower == 1) {
                            _this.$message.success('共享成功');
                        } else if (newPower == 0) {
                            _this.$message.success('取消共享成功');
                        }
                        _this.getFileList();
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        //预览BIMFACE
        previewBIM(id) {
            const _this = this;

            _this.$axios
                .post('/cy_xiezhu/BimFileYuLan', {
                    id: id,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.viewToken = res.data.viewtoken;
                        // 设置BIMFACE JSSDK加载器的配置信息
                        let loaderConfig = new BimfaceSDKLoaderConfig();
                        loaderConfig.viewToken = res.data.viewtoken;
                        // 加载BIMFACE JSSDK加载器
                        BimfaceSDKLoader.load(
                            loaderConfig,
                            _this.successCallback,
                            _this.failureCallback
                        );
                        _this.getRebort('preview');
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        successCallback(viewMetaData) {
            // 创建WebApplication，直接显示模型或图纸
            let dom4Show = document.getElementById('domId');
            new Glodon.Bimface.Application.WebApplicationDemo(
                viewMetaData,
                dom4Show
            );
        },
        failureCallback(error) {
            console.log(error);
        },
        //预览图片
        previewPic(url) {
            dd.ready(function () {
                dd.biz.util.previewImage({
                    urls: [url], //图片地址列表
                    current: url, //当前显示的图片链接
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        //预览office
        previewOffice(url) {
            dd.ready(function () {
                dd.biz.util.openLink({
                    url: url,
                    onSuccess: function (result) {
                        /**/
                    },
                    onFail: function (err) {}
                });
            });
        },
        //上传
        httpUpload(reg) {
            const _this = this;

            if (_this.uploadType == 2) {
                _this.loading = true;
                _this.$axios
                    .post('/cy_xiezhu/GetBimFacePolicy', {
                        name: reg.file.name
                    })
                    .then((res) => {
                        if (res.data.code == 'success') {
                            let newData = res.data.data;
                            _this.bimHost = newData.host;
                            _this.bimObjectKey = newData.objectKey;
                            _this.bimPolicy = newData.policy;
                            _this.bimOSSAccessKeyId = newData.accessId;
                            _this.bimCallback = newData.callbackBody;
                            _this.bimSignature = newData.signature;
                            _this.loading = true;
                            _this.bimUpload(reg.file, 2, reg);
                        } else {
                            _this.loading = false;
                            _this.$message.warning(res.data.message);
                        }
                    });
            } else if (_this.uploadType == 1) {
                _this.loading = true;
                _this.$axios
                    .post('/ossapi/sign/get', {
                        corp_id: _this.$store.state.cid
                    })
                    .then(
                        function (response) {
                            _this.urlHost = response.data.host;
                            let obj = response.data;

                            _this.host = obj['host'];
                            _this.policyBase64 = obj['policy'];
                            _this.accessid = obj['accessid'];
                            _this.signature = obj['signature'];
                            _this.expire = parseInt(obj['expire']);
                            _this.callbackbody = obj['callback'];
                            _this.key = obj['dir'];
                            _this.loading = true;
                            _this.set_upload_param(
                                reg.file.name,
                                true,
                                reg.file,
                                reg
                            );
                        },
                        function (err) {
                            _this.loading = false;
                            console.log(err);
                        }
                    );
            }
        },
        isCanClick() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/FileUserRole', {
                    admin: _this.$store.state.userInfo.admin,
                    xmid: _this.$store.state.projectInfo.pid,
                    role: '创建',
                    fid: _this.currentFilesId,
                    userid: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.role == 1) {
                            _this.isCanVisible = !_this.isCanVisible;
                        } else {
                            _this.isCanVisible = false;
                            _this.$message.warning('您没有权限上传文件');
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        sendDing() {
            const _this = this;
            _this.isCanVisible = false;
            if (_this.$store.state.projectInfo.pid) {
                if (_this.$store.state.projectInfo.pstatus == '1') {
                    // _this.$axios
                    //     .post('/cy_xiezhu/FileUserRole', {
                    //         admin: _this.$store.state.userInfo.admin,
                    //         xmid: _this.$store.state.projectInfo.pid,
                    //         role: '创建',
                    //         fid: _this.currentFilesId,
                    //         userid: _this.$store.state.userInfo.uid
                    //     })
                    //     .then((res) => {
                    //         if (res.data.code == 200) {
                    //             if (res.data.role == 1) {
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
                    //     } else {
                    //         _this.$message.warning(
                    //             '您没有权限上传文件'
                    //         );
                    //     }
                    // }
                    // })
                    // .catch(function (error) {
                    //     console.log(error);
                    // });
                } else if (_this.$store.state.projectInfo.pstatus == '2') {
                    _this.$message.warning('归档项目不能上传文件');
                }
            } else {
                _this.$message.warning('上传文件前必须建项目');
            }
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

                        _this.$axios
                            .post('/cy_xiezhu/SaveDDFile', {
                                quanxian: _this.filesPower,
                                filetype: _this.titleId,
                                parentid: _this.currentFilesId,
                                corp_id: _this.$store.state.cid,
                                xmid: _this.$store.state.projectInfo.pid,
                                files: result.data,
                                userid: _this.$store.state.userInfo.uid
                            })
                            .then((res) => {
                                if (res.data.code == 200) {
                                    _this.$message({
                                        type: 'success',
                                        message: '上传成功',
                                        duration: 1500
                                    });
                                    _this.getFileList();
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
                    onFail: function (err) {
                        console.log('err++' + err);
                    }
                });
            });
            dd.error(function (err) {
                console.log('错误++' + err);
            });
        },
        //上传前验证
        beforeFilesUpload(file) {
            const _this = this;
            _this.loading = true;
            _this.isCanVisible = false;
            if (_this.$store.state.projectInfo.pstatus == '1') {
                //判断上传
                if (_this.$store.state.projectInfo.pid) {
                    let bimType = file.name.substring(
                        file.name.lastIndexOf('.') + 1
                    );
                    console.log('4444+++' + JSON.stringify(file));
                    if (file.type) {
                        //图片
                        _this.uploadType = 1;
                        _this.$message.warning('该文件不支持上传！');
                        return false;
                    } else {
                        // if (
                        //     bimType == '3DS' ||
                        //     bimType == '3ds' ||
                        //     bimType == 'dwg' ||
                        //     bimType == 'dae' ||
                        //     bimType == 'dgn' ||
                        //     bimType == '3dm' ||
                        //     bimType == 'rvt' ||
                        //     bimType == 'rfa' ||
                        //     bimType == 'ifc' ||
                        //     bimType == 'skp' ||
                        //     bimType == 'nwc' ||
                        //     bimType == 'nwd' ||
                        //     bimType == 'dgn' ||
                        //     bimType == 'stp' ||
                        //     bimType == 'stl' ||
                        //     bimType == 'dxf' ||
                        //     bimType == 'obj' ||
                        //     bimType == 'ply' ||
                        //     bimType == 'igms' ||
                        //     bimType == 'GDQ' ||
                        //     bimType == 'zip' ||
                        //     bimType == 'ggj' ||
                        //     bimType == 'gmp' ||
                        //     bimType == 'GLC10'
                        // ) {
                        if (
                            bimType == 'doc' ||
                            bimType == 'docx' ||
                            bimType == 'xlsx' ||
                            bimType == 'xls' ||
                            bimType == 'ppt' ||
                            bimType == 'pptx' ||
                            bimType == 'pdf'
                        ) {
                            _this.uploadType = 1;
                            _this.$message.warning('该文件不支持上传！');
                            return false;
                        } else {
                            _this.uploadType = 2;
                        }

                        // } else {
                        //     _this.$message.warning('该文件不支持上传！');
                        //     return false;
                        // }
                    }

                    //大于1G
                    if (file.size / 1024 / 1024 > 1024) {
                        _this.loading = false;
                        _this.$message.warning(`当前文件过大`);
                        return false;
                    }
                    _this.viewClose = true;
                    let newDom = document.getElementsByClassName(
                        'el-upload-list'
                    )[0];
                    newDom.style.display = 'block';
                } else {
                    _this.$message.warning('上传文件前必须建项目');
                    _this.loading = false;
                    return false;
                }
            } else if (_this.$store.state.projectInfo.pstatus == '2') {
                _this.$message.warning('归档项目不能上传文件');
                _this.loading = false;
                return false;
            }
        },
        //超出上传数量
        handleExceed(files) {
            this.loading = false;
            this.$message.warning(
                `当前限制选择 6 个文件，本次选择了 ${files.length} 个文件`
            );
        },
        //上传成功
        handleSuccess(response, file, fileList) {
            // this.fileList = [];
            this.$message.success(`${file.name} 上传成功`);
        },
        //BIM上传
        bimUpload(file, type, reg) {
            const _this = this;
            let newData = new FormData();
            if (type == 2) {
                newData.append('name', file.name);
                newData.append('key', _this.bimObjectKey);
                newData.append('policy', _this.bimPolicy);
                newData.append('OSSAccessKeyId', _this.bimOSSAccessKeyId);
                newData.append('callback', _this.bimCallback);
                newData.append('signature', _this.bimSignature);
                newData.append('success_action_status', 200);
                newData.append('file', file);
                _this.$axios
                    .post('' + _this.bimHost + '', newData, {
                        onUploadProgress: (progressEvent) => {
                            let percent =
                                ((progressEvent.loaded / progressEvent.total) *
                                    100) |
                                0;
                            //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                            reg.onProgress({ percent: percent });
                        }
                    })
                    .then((res) => {
                        if (res.data.code == 'success') {
                            _this.saveFiles(res.data.data, 2);
                        } else {
                            _this.loading = false;
                        }
                    });
            } else if (type == 1) {
                newData.append('name', file.name);
                newData.append('key', _this.g_object_name);
                newData.append('policy', _this.policyBase64);
                newData.append('OSSAccessKeyId', _this.accessid);
                newData.append('success_action_status', '200');
                newData.append('callback', _this.callbackbody);
                newData.append('signature', _this.signature);
                newData.append('file', file);
                _this.$axios
                    .post('' + _this.host + '', newData, {
                        onUploadProgress: (progressEvent) => {
                            let percent =
                                ((progressEvent.loaded / progressEvent.total) *
                                    100) |
                                0;
                            //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                            reg.onProgress({ percent: percent });
                        }
                    })
                    .then((res) => {
                        if (res.data.success == '1') {
                            let fileData = {};
                            fileData.length = file.size;
                            fileData.name = file.name;

                            _this.saveFiles(fileData, 1, newData.get('key'));
                        } else {
                        }
                    });
            }
        },
        //保存上传成功的文件
        saveFiles(upData, type, newKey) {
            const _this = this;
            let upUrl;
            if (type == '1') {
                upUrl = _this.host + '/' + newKey;
            } else if (type == '2') {
                upUrl = upData.fileId;
            }
            _this.$axios
                .post('/cy_xiezhu/SaveFile', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    xmid: _this.$store.state.projectInfo.pid,
                    type: 'bimface',
                    url: upUrl,
                    number: upData.length,
                    name: upData.name,
                    quanxian: _this.filesPower,
                    filetype: _this.titleId,
                    parentid: _this.currentFilesId,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.loading = false;
                        _this.getFileList();
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                        _this.loading = false;
                    }
                });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getFileList();
        },
        // 文件列表
        getFileList() {
            this.$axios
                .post('/cy_xiezhu/FileList', {
                    type: this.titleId,
                    corp_id: this.$store.state.cid,
                    userid: this.$store.state.userInfo.uid,
                    xmid: this.$store.state.projectInfo.pid,
                    parentid: this.currentFilesId,
                    name: this.searchName,
                    current_page: this.currentPage,
                    admin: this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.total = res.data.content.total;

                        this.banner = res.data.content.list.map(function (
                            item
                        ) {
                            return Object.assign(item, {
                                btnVisible: false
                            });
                        });
                        if (
                            this.total > 0 &&
                            res.data.content.list.length < 1
                        ) {
                            this.currentPage = res.data.content.page;
                            this.getFileList();
                        }
                    } else if (res.data.code == 300) {
                        dd.ready(function () {
                            dd.device.notification.alert({
                                message: res.data.msg,
                                title: '提示', //可传空
                                buttonName: '收到',
                                onSuccess: function () {
                                    //onSuccess将在点击button之后回调
                                    /*回调*/
                                },
                                onFail: function (err) {}
                            });
                        });
                    } else {
                        this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        //收藏
        imgCollect(row) {
            const _this = this;
            if (row.collect == '1') {
                _this.$axios
                    .post('/cy_xiezhu/DeleteCollect', {
                        sid: row.sid,
                        xmid: _this.$store.state.projectInfo.pid,
                        userid: _this.$store.state.userInfo.uid,
                        admin: _this.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            _this.$message.success(`${res.data.msg}`);
                            _this.getFileList();
                        } else {
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    });
            } else if (row.collect == '0') {
                _this.$axios
                    .post('/cy_xiezhu/CreatedCollect', {
                        corp_id: _this.$store.state.cid,
                        xmid: _this.$store.state.projectInfo.pid,
                        fid: row.id,
                        userid: _this.$store.state.userInfo.uid,
                        admin: _this.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            _this.$message.success(`${res.data.msg}`);
                            _this.getFileList();
                        } else {
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    });
            }
        },
        routePages(name) {
            switch (name) {
                case 'filesImg':
                    this.titleId = 2;
                    this.teshuId = 0;
                    this.currentFilesId = 2;
                    this.filesPower = 1;
                    this.viewUpload = true;
                    this.titleName = '图纸列表';
                    this.breadList = [{ name: '图纸文件', id: 2, teshu: 0 }];
                    break;
                case 'filesModel':
                    this.titleId = 3;
                    this.teshuId = 0;
                    this.currentFilesId = 3;
                    this.filesPower = 1;
                    this.viewUpload = true;
                    this.titleName = '模型列表';
                    this.breadList = [{ name: '模型文件', id: 3, teshu: 0 }];
                    break;
                case 'filesShare':
                    this.titleId = 4;
                    this.teshuId = 0;
                    this.currentFilesId = 4;
                    this.filesPower = 1;
                    this.viewUpload = true;
                    this.titleName = '参建各方文件列表';
                    this.breadList = [
                        { name: '参建各方文件', id: 4, teshu: 0 }
                    ];
                    break;
                case 'filesLocal':
                    this.titleId = 5;
                    this.currentFilesId = 5;
                    this.teshuId = 0;
                    this.filesPower = 0;
                    this.viewUpload = true;
                    this.titleName = '私人文件列表';
                    this.breadList = [{ name: '私人文件', id: 5, teshu: 0 }];
                    break;
                case 'filesAtlas':
                    this.titleId = 6;
                    this.currentFilesId = 6;
                    this.filesPower = 1;
                    this.teshuId = 0;
                    this.viewUpload = true;
                    this.titleName = '规范图集列表';
                    this.breadList = [{ name: '规范图集', id: 6, teshu: 0 }];
                    break;
                case 'filesCollect':
                    this.titleId = 7;
                    this.currentFilesId = 7;
                    this.teshuId = 1;
                    this.filesPower = 0;
                    this.viewUpload = false;
                    this.titleName = '我的收藏列表';
                    this.breadList = [{ name: '我的收藏', id: 7, teshu: 0 }];
                    break;
            }
            if (this.titleId > 0) {
                this.getFileList();
            }

            this.viewClose = false;
            this.fileList = [];
            let newDom = document.getElementsByClassName('el-upload-list')[0];
            newDom.style.display = 'none';
        },
        getReg() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectUserList', {
                    xmid: _this.$store.state.projectInfo.pid,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.pTreeData = res.data.content;
                    }
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
        this.getReg();
    },
    created() {
        this.routePages(this.$route.name);
    },
    watch: {
        $route(to, from) {
            this.routePages(to.name);
        },
        '$store.state.projectInfo': {
            handler(val, oldVal) {
                switch (this.titleId) {
                    case 2:
                        this.breadList = [{ name: '图纸文件', id: 2 }];
                        break;
                    case 3:
                        this.breadList = [{ name: '模型文件', id: 3 }];
                        break;
                    case 4:
                        this.breadList = [{ name: '参建各方文件', id: 4 }];
                        break;
                    case 5:
                        this.breadList = [{ name: '私人文件', id: 5 }];
                        break;
                    case 6:
                        this.breadList = [{ name: '规范图集', id: 6 }];
                        break;
                    case 7:
                        this.breadList = [{ name: '我的收藏', id: 7 }];
                        break;
                }
                if (this.titleId > 0) {
                    this.currentPage = 1;
                    this.searchName = '';
                    this.currentFilesId = this.titleId;
                    if (oldVal) {
                        this.getFileList();
                    }
                }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {}
};
</script>
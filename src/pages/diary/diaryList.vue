<template>
    <div id="diaryList">
        <div class="main">
            <div class="content">
                <div class="comeSearch">
                    <el-form
                        ref="searchFormRef"
                        :model="searchForm"
                        label-width="100px"
                    >
                        <div class="searchBottom">
                            <div class="searchLeft">
                                <el-form-item
                                    class="searchTime"
                                    label="开始时间："
                                >
                                    <el-date-picker
                                        v-model="searchForm.startTime"
                                        :picker-options="pickerStart"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    class="searchTime"
                                    label="结束时间："
                                >
                                    <el-date-picker
                                        v-model="searchForm.endTime"
                                        :picker-options="pickerEnd"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </el-form-item>
                                <el-form-item
                                    class="searchTime"
                                    label="日志分类："
                                >
                                    <el-select
                                        v-model="searchForm.type"
                                        filterable
                                        clearable
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in taskTypeList"
                                            :key="item.id"
                                            :label="item.tmpname"
                                            :value="item.tmpname"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    class="searchTime"
                                    label="日志状态："
                                >
                                    <el-select
                                        v-model="searchForm.status"
                                        clearable
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            label="我发起的"
                                            value="1"
                                        ></el-option>
                                        <!-- <el-option
                                            label="未读"
                                            value="2"
                                        ></el-option> -->
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="searchRight">
                                <el-button
                                    type="primary"
                                    round
                                    @click="searchClick"
                                    >搜索</el-button
                                >
                            </div>
                        </div>
                    </el-form>
                </div>
                <el-table
                    :data="taskList"
                    :header-cell-style="tableHeaderClass"
                    @row-click="editTask"
                    ref="multipleTable"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="proname"
                        label="项目"
                        show-overflow-tooltip="true"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="name"
                        label="创建人"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="logspare1"
                        label="日志时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="logtype"
                        label="分类"
                        align="center"
                    ></el-table-column>
                    <el-table-column label="审批状态" align="center">
                        <template slot-scope="scope">
                            <span
                                v-if="scope.row.status == '1'"
                                style="color: #67c23a"
                                >已同意</span
                            >
                            <span
                                v-else-if="scope.row.status == '0'"
                                style="color: #e6a23c"
                                >审批中</span
                            >
                            <span v-else style="color: #f56c6c">已拒绝</span>
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
            <el-dialog title="提示" :visible.sync="deleteVisible" width="5rem">
                <span>确认删除？一旦删除数据无法找回</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button
                        type="primary"
                        :loading="loading"
                        @click="deleteClick"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
            <el-drawer
                title="编辑日志"
                :visible.sync="drawerVisible"
                direction="rtl"
                @close="drawClose('cComeform')"
                ref="contractDrawer"
            >
                <div class="cDrawerContent">
                    <el-form
                        :model="contractDrawerForm"
                        :rules="taskRule"
                        ref="cComeform"
                        label-width="130px"
                    >
                        <!-- <el-form-item label="天气">
                            <div class="diaryTemp">
                                <div class="dtTop">
                                    <div>{{weatherData.wd}}</div>
                                    <div>{{weatherData.timedate}}</div>
                                </div>
                                <div class="dtBottom">
                                    <div>{{weatherData.windDirDay}}</div>
                                    <div>
                                        <img :src="weatherData.tb" alt />
                                    </div>
                                </div>
                            </div>
                        </el-form-item>-->
                        <div class="feiwuweather">
                            <div class="weat">
                                <div class="weatname">天气</div>
                                <div class="weatRight">
                                    <div>
                                        <el-input
                                            v-model="
                                                contractDrawerForm.weather.a
                                            "
                                            maxlength="10"
                                            placeholder="上午"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <el-input
                                            v-model="
                                                contractDrawerForm.weather.b
                                            "
                                            maxlength="10"
                                            placeholder="下午"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="weat">
                                <div class="weatname">温度（℃）</div>
                                <div class="weatRight">
                                    <div>
                                        <el-input
                                            v-model="contractDrawerForm.wendu.a"
                                            maxlength="2"
                                            placeholder="上午"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <el-input
                                            v-model="contractDrawerForm.wendu.b"
                                            maxlength="2"
                                            placeholder="下午"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="weat">
                                <div class="weatname">风力（级）</div>
                                <div class="weatRight">
                                    <div>
                                        <el-input
                                            v-model="contractDrawerForm.wind.a"
                                            maxlength="2"
                                            placeholder="上午"
                                        ></el-input>
                                    </div>
                                    <div>
                                        <el-input
                                            v-model="contractDrawerForm.wind.b"
                                            maxlength="2"
                                            placeholder="下午"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- <el-form-item label="日志名称" prop="logname">
                            <el-input
                                v-model="contractDrawerForm.logname"
                                maxlength="20"
                            ></el-input>
                        </el-form-item> -->
                        <!-- <el-form-item label="地址" prop="weaid" style="width:100%">
                            <el-cascader
                                v-model="contractDrawerForm.weaid"
                                :options="cityOptions"
                                @change="handleChange"
                                style="width:100%"
                            ></el-cascader>
                        </el-form-item>-->
                        <el-form-item label="日期" prop="logspare1">
                            <el-date-picker
                                v-model="contractDrawerForm.logspare1"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <div v-for="(item, index) in newTaskDemoList">
                            <div v-if="item.type == 'oneline'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请输入',
                                                      trigger: 'blur'
                                                  }
                                              ]
                                            : [{ required: false }]
                                    "
                                >
                                    <el-input
                                        placeholder="请输入"
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        maxlength="50"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="item.type == 'numbertext'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请输入',
                                                      trigger: 'blur'
                                                  },
                                                  {
                                                      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                                                      message:
                                                          '请输入数字,可保留两位小数'
                                                  }
                                              ]
                                            : [
                                                  { required: false },
                                                  {
                                                      pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                                                      message:
                                                          '请输入数字,可保留两位小数'
                                                  }
                                              ]
                                    "
                                >
                                    <el-input
                                        placeholder="请输入"
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        maxlength="50"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="item.type == 'moreline'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请输入',
                                                      trigger: 'blur'
                                                  }
                                              ]
                                            : [{ required: false }]
                                    "
                                >
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入"
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        maxlength="500"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="item.type == 'downselect'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请选择',
                                                      trigger: [
                                                          'blur',
                                                          'change'
                                                      ]
                                                  }
                                              ]
                                            : [{ required: false }]
                                    "
                                >
                                    <el-select
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="(
                                                list, lindex
                                            ) in item.select"
                                            :key="lindex"
                                            :label="list.selectname"
                                            :value="list.selectname"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-else-if="item.type == 'datetime'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'logspare2.' + item.title"
                                    :rules="
                                        item.checked == true
                                            ? [
                                                  {
                                                      required: true,
                                                      message: '请选择日期',
                                                      trigger: [
                                                          'blur',
                                                          'change'
                                                      ]
                                                  }
                                              ]
                                            : [{ required: false }]
                                    "
                                >
                                    <el-date-picker
                                        v-model="
                                            contractDrawerForm.logspare2[
                                                item.title
                                            ]
                                        "
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
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
                                    v-for="(
                                        item, index
                                    ) in contractDrawerForm.enclosure"
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
                                                        item.fileSize / 1024
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
                                        <div>可见人</div>
                                        <p>请选择可见人</p>
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
                                <!-- <div class="shenpiFore">
                                    <span></span>
                                </div>-->
                            </div>
                        </div>
                        <div class="demo-drawer__footer">
                            <el-button
                                type="primary"
                                @click="closeDrawer('cComeform')"
                                :loading="loading"
                                >{{
                                    loading ? '修改中 ...' : '修改'
                                }}</el-button
                            >
                            <el-button @click="drawClose('cComeform')"
                                >取消</el-button
                            >
                        </div>
                    </el-form>
                </div>
            </el-drawer>
            <el-dialog
                title="全部可见人员"
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
            <!-- <el-dialog
                width="30%"
                title="选择人员"
                :visible.sync="peoplePickVisible"
                append-to-body
                class="peoplePickClass"
                @close="closePicker"
            >
                <div>
                    <el-tree
                        :data="pTreeData"
                        :props="pDefaultProps"
                        node-key="emplId"
                        :expand-on-click-node="false"
                        ref="ptree"
                        show-checkbox
                        class="peopleTree"
                    >
                        <span
                            class="custom-tree-node"
                            slot-scope="{ node, data }"
                        >
                            <span>
                                <img
                                    v-if="data.avatar"
                                    :src="data.avatar"
                                    alt
                                />
                                <span v-else>{{
                                    data.name.length <= 2
                                        ? data.name
                                        : data.name.substr(
                                              data.name.length - 2,
                                              2
                                          )
                                }}</span>
                            </span>
                            <span>{{ node.label }}</span>
                        </span>
                    </el-tree>
                    <div class="pickBtn">
                        <el-button
                            type="primary"
                            size="medium"
                            :loading="loaded"
                            @click="PickClick"
                            >确定</el-button
                        >
                        <el-button size="medium" @click="closePicker"
                            >取消</el-button
                        >
                    </div>
                </div>
            </el-dialog> -->
            <el-dialog
                width="30%"
                title="日志成册"
                :visible.sync="exportVisible"
                @close="closeExport"
            >
                <div>
                    <el-form
                        :model="exportForm"
                        :rules="exportRule"
                        ref="exform"
                        label-width="130px"
                    >
                        <!-- <el-form-item label="记录人：">
                            <el-input
                                v-model="exportForm.name"
                                readonly
                                placeholder="请点击选择或搜索记录人"
                                id="addExport"
                                @focus="addSingle"
                            ></el-input>
                        </el-form-item> -->
                        <el-form-item label="成册名称：" prop="logccid">
                            <el-select
                                style="width: 65%"
                                v-model="exportForm.logccid"
                                filterable
                                clearable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in diaryExList"
                                    :key="item.id"
                                    :label="item.logccname"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                            <el-button type="primary" @click="addNewCe"
                                >新增</el-button
                            >
                        </el-form-item>
                    </el-form>
                    <div class="pickBtn" style="text-align: center">
                        <el-button
                            type="primary"
                            size="medium"
                            :loading="loading"
                            @click="exportClick('exform')"
                            >确定</el-button
                        >
                        <el-button size="medium" @click="closeExport"
                            >取消</el-button
                        >
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                width="30%"
                title="新增日志成册"
                :visible.sync="ceVisible"
                @close="closeCE"
            >
                <div>
                    <el-form
                        :model="ceForm"
                        :rules="ceRule"
                        ref="excform"
                        label-width="130px"
                    >
                        <el-form-item label="成册名称：" prop="logtmpname">
                            <el-input v-model="ceForm.logtmpname"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="pickBtn" style="text-align: center">
                        <el-button
                            type="primary"
                            size="medium"
                            :loading="loading"
                            @click="addNewClick('excform')"
                            >确定</el-button
                        >
                        <el-button size="medium" @click="closeCE"
                            >取消</el-button
                        >
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
import citydata from '../../components/weatherCity.json';
import * as dd from 'dingtalk-jsapi';
import peoplePick from '../../components/complexPicker.vue';
export default {
    name: 'diaryList',
    components: { peoplePick },
    data() {
        var validateNumber = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;

            if (!reg.test(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };
        return {
            peopleIsShow: true,
            ceVisible: false,
            ceForm: {
                logtmpname: ''
            },
            ceRule: {
                logtmpname: [
                    {
                        required: true,
                        message: '请输入成册名称',
                        trigger: 'blur'
                    }
                ]
            },
            exportRule: {
                logccid: [
                    {
                        required: true,
                        message: '请选择成册名称',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            pickerVisible: false,
            pickerNum: 9,
            exportForm: { logccid: '' },
            exportVisible: false,
            deleteVisible: false,
            cityOptions: [],
            taskRule: {
                logname: [
                    {
                        required: true,
                        message: '日志名称不能为空',
                        trigger: 'blur'
                    }
                ],
                logspare1: [
                    {
                        required: true,
                        message: '请选择日期',
                        trigger: ['blur', 'change']
                    }
                ]
                // weaid: [
                //     {
                //         required: true,
                //         message: '地址不能为空，请选择',
                //         trigger: ['blur', 'change']
                //     }
                // ]
            },
            taskList: [],
            drawerVisible: false,
            activeConIndex: 0,
            searchForm: {
                name: '',
                startTime: '',
                endTime: '',
                type: '',
                status: ''
            },
            taskTypeList: [],
            diaryExList: [],
            total: '',
            pagesize: 10,
            currentPage: 1,
            tagsData: [],
            tagsPeopleData: [],
            contractDrawerForm: {
                fiunderuserid: this.$store.state.userInfo.uid,
                corp_id: this.$store.state.cid,
                founder: this.$store.state.userInfo.uname,
                proname: this.$store.state.projectInfo.pname,
                xmid: this.$store.state.projectInfo.pid,
                enclosure: [],
                logspare7: [],
                logtype: '',
                logspare1: '',
                wind: {
                    a: '',
                    b: ''
                },
                weather: {
                    a: '',
                    b: ''
                },
                wendu: {
                    a: '',
                    b: ''
                },
                // weaid: [],
                logspare2: {}
            },
            AllPeopleVisible: false,
            AllSendPeopleVisible: false,
            loading: false,
            pDefaultProps: {
                id: 'emplId',
                label: 'name',
                children: 'user',
                isLeaf: 'leaf'
            },
            pTreeData: [],
            peoplePickVisible: false,
            peopleType: 0,
            editTaskID: '',
            editTaskName: '',
            loading: false,
            weatherData: {},
            deleteDId: '',
            multipleDiary: [],
            newID: ''
        };
    },
    methods: {
        tableHeaderClass({ row, rowIndex }) {
            return 'font-weight:500;font-size: 0.15rem;color:#272727;background-color:#f9f9f9;';
        },
        addNewCe() {
            this.ceVisible = true;
        },
        addNewClick(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.ceForm.corp_id = _this.$store.state.cid;
                    _this.ceForm.xmid = _this.$store.state.projectInfo.pid;
                    _this.$axios
                        .post('/task/addlongtypename', _this.ceForm)
                        .then((res) => {
                            if (res.data.code == 200) {
                                _this.loading = false;
                                _this.ceVisible = false;
                                _this.getDiaryExList();
                                _this.$refs[formName].resetFields();
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
                            _this.$message({
                                message: error.data,
                                type: 'error',
                                duration: '2000'
                            });
                            console.log(error);
                        });
                } else {
                    _this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeCE() {
            this.ceVisible = false;
            this.loading = false;
            this.ceForm.logtmpname = '';
        },
        addSingle() {
            const that = this;
            document.getElementById('addExport').blur();
            that.peopleType = 1;
            that.pickerNum = 1;
            that.pickerVisible = true;
            // dd.ready(function() {
            //     dd.biz.contact.complexPicker({
            //         title: '通讯录', //标题
            //         corpId: that.$store.state.cid, //企业的corpId
            //         multiple: false, //是否多选
            //         limitTips: '超出了', //超过限定人数返回提示
            //         maxUsers: 1, //最大可选人数
            //         pickedUsers: [], //已选用户
            //         pickedDepartments: [], //已选部门
            //         disabledUsers: [], //不可选用户
            //         disabledDepartments: [], //不可选部门
            //         requiredUsers: [], //必选用户（不可取消选中状态）
            //         requiredDepartments: [], //必选部门（不可取消选中状态）
            //         appId: that.agentid, //微应用的Id
            //         permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
            //         responseUserOnly: true, //返回人，或者返回人和部门
            //         startWithDepartmentId: 0, //仅支持0和-1
            //         onSuccess: function(result) {
            //             that.exportForm.name = result.users[0].name;
            //         },
            //         onFail: function(err) {
            //             console.log(err);
            //         }
            //     });
            // });
            // dd.error(function(err) {
            //     console.log(err);
            // });
        },
        diaryChange(val) {
            this.multipleDiary = val;
        },
        exportDiary() {
            if (this.multipleDiary.length > 0) {
                let newMult = [];
                newMult = this.multipleDiary.map((item) => {
                    if (!item.id) return '';
                    return item.id;
                });
                this.newID = newMult.toString();
                this.exportVisible = true;
            } else {
                this.$message.warning('请您先选择');
            }
        },
        //成册
        exportClick(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/bindinglog', {
                            logid: _this.newID,
                            logccid: _this.exportForm.logccid,
                            userid: _this.$store.state.userInfo.uid,
                            corp_id: _this.$store.state.cid,
                            xmid: _this.$store.state.projectInfo.pid
                        })
                        .then((res) => {
                            if (res.data.code == '200') {
                                _this.loading = false;
                                _this.$message.success('日志成册成功');
                                _this.exportVisible = false;
                                _this.exportForm.name = '';
                                _this.$refs.multipleTable.clearSelection();
                            } else {
                                _this.loading = false;
                                _this.$message.warning(res.data.msg);
                            }
                        })
                        .catch(function (error) {
                            _this.loading = false;
                            console.log(error);
                        });
                } else {
                    _this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeExport() {
            this.exportVisible = false;
            this.exportForm.name = '';
        },
        //打开全部可见人员覆盖层
        openSendPeople() {
            this.AllSendPeopleVisible = true;
        },
        //删除人员
        handleSendClose(tag) {
            this.tagsPeopleData.splice(this.tagsPeopleData.indexOf(tag), 1);
            this.contractDrawerForm.logspare7 = this.tagsPeopleData;
        },
        //天气地址选择
        handleChange(val) {
            this.contractDrawerForm.weaid = val;
        },
        typeChange(val) {
            if (val) {
                let obj = {};
                obj = this.taskTypeList.find(function (item) {
                    return item.id === val;
                });
                this.searchForm.typeName = obj.tmpname;
            } else {
                this.searchForm.typeName = '';
            }
        }, //数组对象去重
        unique(arr) {
            const res = new Map();
            return arr.filter(
                (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
            );
        },
        dedupe(array) {
            return Array.from(new Set(array));
        },
        //选人确定点击
        PickClick() {
            const _this = this;
            let newArr = [];
            _this.$refs.ptree.getCheckedNodes().forEach((item) => {
                if (item.emplId) {
                    newArr.push(item);
                }
            });
            let newPeople = [];
            newPeople = newArr.map((item) => {
                if (!item.emplId) return '';
                return item.emplId;
            });
            if (_this.peopleType == 1) {
                newArr.forEach((item) => {
                    _this.tagsData.push(item);
                });
                newPeople.forEach((item) => {
                    _this.contractDrawerForm.todostaff.push(item);
                });
                _this.tagsData = _this.unique(_this.tagsData);
                _this.contractDrawerForm.todostaff = _this.dedupe(
                    _this.contractDrawerForm.todostaff
                );
            } else if (_this.peopleType == 2) {
                newArr.forEach((item) => {
                    _this.tagsPeopleData.push(item);
                });
                newPeople.forEach((item) => {
                    _this.contractDrawerForm.logspare7.push(item);
                });
                _this.tagsPeopleData = _this.unique(_this.tagsPeopleData);
                _this.contractDrawerForm.logspare7 = _this.tagsPeopleData;
            }
            _this.peoplePickVisible = false;
        },
        pickerSelect(arr, type) {
            const that = this;
            if (type == 1) {
                if (that.peopleType == 1) {
                    // that.exportForm.name = arr[0].name;
                } else if (that.peopleType == 2) {
                    let newPeople = JSON.parse(
                        JSON.stringify(that.tagsPeopleData)
                    );

                    arr.forEach((item) => {
                        newPeople.push(item);
                    });
                    that.tagsPeopleData = that.unique(newPeople);
                    that.contractDrawerForm.logspare7 = that.tagsPeopleData;
                }
            }
            that.pickerVisible = false;
            that.peopleIsShow = false;
            that.$nextTick(() => {
                that.peopleIsShow = true;
            });
        },
        //打开选人覆盖层
        addManyP(type) {
            const that = this;
            that.pickerNum = 9;
            // that.getReg();
            that.peopleType = type;
            // that.peoplePickVisible = true;
            that.pickerVisible = true;
        },
        //获取组织架构
        getReg() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectUserList', {
                    xmid: _this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.pTreeData = res.data.content;
                    }
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

                        if (_this.contractDrawerForm.enclosure == null) {
                            _this.contractDrawerForm.enclosure = [];
                        }
                        result.data.forEach((item) => {
                            _this.contractDrawerForm.enclosure.push(item);
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
        //添加附件
        addFiles() {
            this.getPower();
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
        deleteFiles(index) {
            this.contractDrawerForm.enclosure.splice(index, 1);
        },
        //修改按钮
        editTask(row, column) {
            const _this = this;
            // switch (column.label) {
            //     case '任务标题':
            if (
                column.label == '项目' ||
                column.label == '创建人' ||
                column.label == '日志时间' ||
                column.label == '分类'
            ) {
                dd.ready(function () {
                    dd.biz.util.openSlidePanel({
                        url: row.xmid, //打开侧边栏的url
                        title: '查看日志', //侧边栏顶部标题
                        onSuccess: function (result) {},
                        onFail: function () {}
                    });
                });
            }
            // item.viewPopo = false;
            // const _this = this;
            // _this.editTaskID = item.id;
            // _this.editTaskName = item.name;
            // _this.$axios
            //     .post('/task/tmpedit', {
            //         type: 1,
            //         logtmp_id: item.logspare3
            //     })
            //     .then((res) => {
            //         if (res.data.code == '200') {
            //             let newData = res.data.list;

            //             //动态添加属性
            //             let newJson = {};
            //             newData.tmpdate.forEach((item) => {
            //                 let newKey = item.title;

            //                 newJson[newKey] = '';
            //             });
            //             _this.$set(
            //                 _this.contractDrawerForm,
            //                 'logspare2',
            //                 newJson
            //             );
            //             _this.contractDrawerForm.logtypeid = item.tmptypeid;
            //             _this.contractDrawerForm.logtype = item.tmptypename;

            //             _this.newTaskDemoList = newData.tmpdate;
            //             _this.drawerVisible = true;
            //             _this.getTaskInfo();
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        },
        //获取日志详情
        getTaskInfo() {
            const _this = this;
            _this.$axios
                .post('/task/logdetails', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    logid: _this.editTaskID,
                    userid: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.tagsPeopleData = res.data.list.logspare7;
                        _this.weatherData = res.data.list.weather;
                        _this.contractDrawerForm = res.data.list;
                        // delete _this.contractDrawerForm.weather;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //关闭编辑按钮
        drawClose(formName) {
            this.drawerVisible = false;
            // this.contractDrawerForm.tasktitle = '';
            this.contractDrawerForm.starttime = '';
            this.contractDrawerForm.stoptime = '';
            this.contractDrawerForm.logspare7 = [];
            this.tagsPeopleData = [];
        },
        //编辑提交按钮
        closeDrawer(formName) {
            const _this = this;
            // _this.contractDrawerForm.logtype = _this.editTaskName;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    // if (this.contractDrawerForm.todostaff.length > 0) {
                    let newData = _this.contractDrawerForm;
                    newData.logspare7 = newData.logspare7;
                    newData.corp_id = _this.$store.state.cid;
                    newData.xmid = _this.$store.state.projectInfo.pid;
                    newData.userid = _this.$store.state.userInfo.uid;
                    newData.id = _this.editTaskID;
                    newData.type = 2;
                    _this.$axios
                        .post('/task/logupdate', newData)
                        .then((res) => {
                            if (res.data.code == '200') {
                                _this.loading = false;
                                _this.drawerVisible = false;
                                _this.getTaskList();

                                _this.$refs[formName].resetFields();
                                _this.contractDrawerForm.logspare7 = [];

                                _this.tagsPeopleData = [];
                                _this.$message({
                                    message: '编辑日志成功',
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
                            _this.$message({
                                message: error.data,
                                type: 'error',
                                duration: '2000'
                            });
                            console.log(error);
                        });
                    // } else {
                    //     this.loading = false;
                    //     this.$message.warning('请选择待办人');
                    // }
                } else {
                    _this.loading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loading = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },
        taskFormat(row) {
            switch (row.taskstatus) {
                case '0':
                    return '未办';
                    break;
                case '1':
                    return '已办';
                    break;
                case '3':
                    return '已归档';
                    break;
            }
        },
        //删除日志
        deleteClick() {
            const _this = this;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$axios
                .post('/task/logdel', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid,
                    id: _this.deleteDId
                })
                .then((res) => {
                    _this.loading = false;
                    if (res.data.code == 200) {
                        _this.deleteVisible = false;
                        _this.$message.success(res.data.msg);
                        _this.getTaskList();
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    _this.loading = false;
                    _this.$message.warning(error.msg);
                    console.log(error);
                });
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loading = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },
        //完成和删除
        completeTask(row) {
            this.deleteVisible = true;
            this.deleteDId = row.id;
        },
        //日志归档
        taskBack() {
            const _this = this;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$axios
                .post('/task/taskdelOrcom', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid,
                    id: _this.editTaskID,
                    status: 3
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.getTaskList();
                        _this.$message.success('该日志已归档成功');
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    _this.$message.error(error.data);
                });
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loading = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTaskList();
        },
        //搜索
        searchClick() {
            this.currentPage = 1;
            this.getTaskList();
        },
        //获取日志列表
        getTaskList() {
            const _this = this;
            _this.$axios
                .post('/task/listlog', {
                    corp_id: _this.$store.state.cid,
                    logtype: _this.searchForm.type,
                    starttime: _this.searchForm.startTime,
                    stoptime: _this.searchForm.endTime,
                    proname: _this.$store.state.projectInfo.pname,
                    userid: _this.$store.state.userInfo.uid,
                    current_page: _this.currentPage,
                    status: _this.searchForm.status,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.taskList = res.data.content.list.map(function (
                            item
                        ) {
                            return Object.assign(item, {
                                viewPopo: false
                            });
                        });
                        _this.total = res.data.content.total;
                        if (_this.total > 0 && _this.taskList.length < 1) {
                            _this.currentPage = res.data.content.page;
                            _this.getTaskList();
                        }
                    } else if (res.data.code == 400) {
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
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取日志类型下拉列表
        getTaskTypeList() {
            this.$axios
                .post('/task/logtypeziji', {
                    corpid: this.$store.state.cid,
                    xmid: this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.taskTypeList = res.data.content;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getDiaryExList() {
            this.$axios
                .post('/task/staybindinglog', {
                    corp_id: this.$store.state.cid,
                    xmid: this.$store.state.projectInfo.pid,
                    userid: this.$store.state.userInfo.uid,
                    logname: '',
                    type: 1
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        this.diaryExList = res.data.content;
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
    },
    created() {
        this.$utils.checkding();
        this.cityOptions = citydata;
        // this.getDiaryExList();
        this.getTaskList();
        this.getTaskTypeList();
    },
    computed: {
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.searchForm.endTime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.startTime;
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
        projectData() {
            return this.$store.state.projectInfo;
        }
    },
    watch: {
        projectData: {
            handler(newVal, oldVal) {
                //你需要执行的代码
                if (oldVal) {
                    this.getTaskList();
                    this.getTaskTypeList();
                    // this.getDiaryExList();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
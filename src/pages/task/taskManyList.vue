<template>
    <div id="taskManyList">
        <div class="main">
            <div class="content">
                <div class="comeSearch">
                    <el-form
                        ref="searchFormRef"
                        :model="searchForm"
                        :inline="true"
                    >
                        <div class="searchInput">
                            <div>{{ manyName }}</div>
                            <el-button type="primary" @click="back"
                                >返回</el-button
                            >
                        </div>
                        <div class="searchBottom">
                            <div class="searchLeft">
                                <el-form-item class="searchTime">
                                    <el-input
                                        placeholder="请输入内容"
                                        prefix-icon="el-icon-search"
                                        v-model="searchForm.name"
                                        @keyup.enter.native="searchClick"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    class="searchTime"
                                    label="任务类型："
                                >
                                    <el-select
                                        v-model="searchForm.type"
                                        filterable
                                        clearable
                                        @change="typeChange"
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in taskTypeList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="searchRight">
                                <el-button
                                    type="primary"
                                    plain
                                    round
                                    @click="searchClick"
                                    >搜索</el-button
                                >
                            </div>
                        </div>
                    </el-form>
                </div>
                <el-table
                    :data="cwList"
                    @row-click="editTask"
                    stripe
                    style="width: 100%"
                >
                    <el-table-column
                        label="任务标题"
                        show-overflow-tooltip="true"
                        ><template slot-scope="scope">
                            <span style="cursor:pointer;color:#409eef;">{{
                                scope.row.tasktitle
                            }}</span>
                        </template></el-table-column
                    >
                    <el-table-column
                        prop="name"
                        label="项目"
                        show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="by1"
                        label="待办人"
                        show-overflow-tooltip="true"
                    ></el-table-column>
                    <el-table-column
                        prop="todotime"
                        label="待办时间"
                    ></el-table-column>
                    <el-table-column
                        prop="tasktype"
                        label="分类"
                    ></el-table-column>
                    <el-table-column
                        prop="founder"
                        label="创建人"
                    ></el-table-column>
                    <el-table-column
                        prop="taskstatus"
                        label="待办状态"
                        :formatter="taskFormat"
                    ></el-table-column>
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
            <el-drawer
                title="编辑任务"
                :visible.sync="drawerVisible"
                direction="rtl"
                @close="drawClose('cComeform')"
                ref="contractDrawer"
                class="taskDrawClass"
            >
                <div class="cDrawerContent">
                    <div class="drawTopBtn">
                        <div>
                            <el-button
                                type="primary"
                                round
                                @click="completeTask(1)"
                                v-if="taskStatus == '0'"
                                >完成</el-button
                            ><el-button
                                type="primary"
                                round
                                @click="resetTask(1)"
                                v-if="taskStatus == '1'"
                                >重启</el-button
                            >
                        </div>
                        <el-button type="warning" round @click="resetTask(2)"
                            >催办</el-button
                        >
                    </div>
                    <el-form
                        :model="contractDrawerForm"
                        :rules="taskRule"
                        ref="cComeform"
                        label-width="130px"
                    >
                        <!-- <el-form-item label="任务名称" prop="tasktitle">
                            <el-input v-model="contractDrawerForm.tasktitle" maxlength="20"></el-input>
                        </el-form-item> -->
                        <el-form-item label="任务开始时间" prop="starttime">
                            <el-date-picker
                                v-model="contractDrawerForm.starttime"
                                :picker-options="pickerStart"
                                type="date"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="任务结束时间" prop="stoptime">
                            <el-date-picker
                                v-model="contractDrawerForm.stoptime"
                                :picker-options="pickerEnd"
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
                                    :prop="'desc.' + item.title"
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
                                            contractDrawerForm.desc[item.title]
                                        "
                                        maxlength="50"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="item.type == 'numbertext'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'desc.' + item.title"
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
                                            contractDrawerForm.desc[item.title]
                                        "
                                        maxlength="50"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="item.type == 'moreline'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'desc.' + item.title"
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
                                            contractDrawerForm.desc[item.title]
                                        "
                                        maxlength="500"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div v-else-if="item.type == 'downselect'">
                                <el-form-item
                                    :label="item.name"
                                    :prop="'desc.' + item.title"
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
                                            contractDrawerForm.desc[item.title]
                                        "
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="(list,
                                            lindex) in item.select"
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
                                    :prop="'desc.' + item.title"
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
                                            contractDrawerForm.desc[item.title]
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
                                    v-for="(item,
                                    index) in contractDrawerForm.enclosure"
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
                                        <div>
                                            <span style="color:red;"
                                                >* &nbsp;&nbsp;</span
                                            >待办人
                                        </div>
                                        <p>请选择待办人</p>
                                    </div>
                                    <div class="addManeger">
                                        <div
                                            class="addMList"
                                            v-if="tagsData.length > 3"
                                        >
                                            <div class="mdnList">
                                                <div
                                                    class="mdren"
                                                    @click="openAllPeople(1)"
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
                                            v-for="(item,
                                            index) in tagsData.slice(0, 3)"
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
                                                    @click="openAllPeople(2)"
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
                                            v-for="(item,
                                            index) in tagsPeopleData.slice(
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
                        <el-form-item
                            class="taskDrawTalk"
                            label="评论"
                            style="margin-top:46px;"
                        >
                            <el-input v-model="taskcomment"></el-input>
                            <div class="taskDTBtn">
                                <el-button :loading="loadTalk" @click="talkWith"
                                    >评论</el-button
                                >
                                <div class="taskDTIcon">
                                    <i
                                        class="el-icon-picture"
                                        @click="talkPic"
                                    ></i>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="评论记录">
                            <div
                                v-if="talkList.length > 0"
                                style="margin-top:10px;"
                            >
                                <div
                                    class="pljilu"
                                    v-for="(item, index) in talkList"
                                    :key="index"
                                >
                                    <p>{{ item.username }}</p>
                                    <p>{{ item.created }}</p>
                                    <p>{{ item.content }}</p>
                                    <div class="dingFilesClass">
                                        <div
                                            v-for="(plist, index) in item.file"
                                            :key="index"
                                        >
                                            <div>
                                                <div class="fileIcon">
                                                    <i
                                                        class="el-icon-document"
                                                    ></i>
                                                </div>
                                                <div class="filesTitle">
                                                    <div>
                                                        {{ plist.fileName }}
                                                    </div>
                                                    <p>
                                                        {{
                                                            (
                                                                plist.fileSize /
                                                                1024
                                                            ).toFixed(2)
                                                        }}kb
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="watchBtn"
                                                    @click="watchFiles(plist)"
                                                >
                                                    预览
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>无评论</div>
                        </el-form-item>
                        <div class="demo-drawer__footer">
                            <el-button
                                type="primary"
                                @click="closeDrawer('cComeform')"
                                :loading="loading"
                                >{{
                                    loading ? '修改中 ...' : '修改'
                                }}</el-button
                            >
                            <!-- <el-button @click="resetTask(1)">重启</el-button>
                            <el-button @click="resetTask(2)">催办</el-button> -->
                            <!-- <el-button :loading="loadTalk" @click="talkWith"
                                >评论</el-button
                            > -->
                            <!-- <el-button @click="completeTask(1)">完成</el-button> -->
                            <!-- <el-button @click="drawClose('cComeform')"
                                >取消</el-button
                            > -->
                        </div>
                    </el-form>
                </div>
            </el-drawer>
            <el-dialog
                title="全部待办人员"
                :append-to-body="true"
                :visible.sync="AllPeopleVisible"
                class="contractOpenPeopleDialog"
                :close-on-click-modal="false"
            >
                <div style="margin-bottom:10px;">
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
                title="全部可见人员"
                :append-to-body="true"
                :visible.sync="AllSendPeopleVisible"
                class="contractOpenPeopleDialog"
                :close-on-click-modal="false"
            >
                <div style="margin-bottom:10px;">
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
import peoplePick from '../../components/complexPicker.vue';
export default {
    name: 'taskManyList',
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
            pickerNum: 1000,
            pickerVisible: false,
            deleteVisible: false,
            taskRule: {
                tasktitle: [
                    {
                        required: true,
                        message: '任务名称不能为空',
                        trigger: 'blur'
                    }
                ],
                starttime: [
                    {
                        required: true,
                        message: '请选择日期',
                        trigger: ['blur', 'change']
                    }
                ],
                stoptime: [
                    {
                        required: true,
                        message: '请选择日期',
                        trigger: ['blur', 'change']
                    }
                ]
            },

            manyName: this.$route.query.name,
            cwList: [],
            drawerVisible: false,
            activeConIndex: 0,
            searchForm: {
                name: '',
                type: '',
                typeName: ''
            },
            taskTypeList: [],
            total: '',
            pagesize: 10,
            currentPage: 1,
            newId: this.$route.query.id,
            tagsData: [],
            tagsPeopleData: [],
            contractDrawerForm: {
                projectName: '',
                fiunderuserid: this.$store.state.userInfo.uid,
                corp_id: this.$store.state.cid,
                founder: this.$store.state.userInfo.uname,
                projectname: this.$store.state.projectInfo.pname,
                xmid: this.$store.state.projectInfo.pid,
                enclosure: [],
                by1: [],
                by2: [],
                tasktitle: '',
                tasktype: '',
                spare3: '',
                stoptime: '',
                starttime: '',
                desc: {}
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
            editProName: '',
            loading: false,
            newTodoPeople: [],
            taskcomment: '', //评论内容
            loadTalk: false,
            deleteTId: '',
            talkList: [],
            dingAppor: [],
            dingCop: [],
            taskStatus: '0'
        };
    },
    methods: {
        //发送评论图片
        talkPic() {
            const _this = this;
            _this.$axios
                .post('/dingyun/DingPanSaveFile', {
                    corp_id: _this.$store.state.cid,
                    type: 'add',
                    fileids: '',
                    userid: _this.$store.state.userInfo.uid
                })
                .then(res => {
                    if (res.data.status == 1) {
                        _this.$store.commit(
                            'setSpaceId',
                            res.data.spaceid.toString()
                        );
                        _this.talkPicClick();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        talkPicClick() {
            const _this = this;
            dd.ready(function() {
                dd.biz.util.uploadAttachment({
                    image: {
                        multiple: true,
                        compress: false,
                        max: 9,
                        spaceId: _this.$store.state.spaceId
                    },
                    types: ['photo'],
                    onSuccess: function(result) {
                        //result.data
                        _this.goTalkPic(result.data);
                    },
                    onFail: function(err) {
                        console.log('err++' + err);
                    }
                });
            });
            dd.error(function(err) {
                console.log('错误' + err);
            });
        },
        goTalkPic(file) {
            const _this = this;
            _this.$axios
                .post('/task/taskcomment', {
                    taskid: _this.editTaskID,
                    xmid: _this.$store.state.projectInfo.pid,
                    corp_id: _this.$store.state.cid,
                    username: _this.$store.state.userInfo.uname,
                    user_id: _this.$store.state.userInfo.uid,
                    content: '',
                    file: file
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.$message.success('发表图片评论成功');
                        _this.getTalkList();
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function(error) {
                    _this.$message.error(`${error.data}`);
                    console.log(error);
                });
        },
        openAllPeople(type) {
            if (type == 1) {
                this.AllPeopleVisible = true;
            } else if (type == 2) {
                this.AllSendPeopleVisible = true;
            }
        },
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.contractDrawerForm.by1 = this.tagsData;
        },
        handleSendClose(tag) {
            this.tagsPeopleData.splice(this.tagsPeopleData.indexOf(tag), 1);
            this.contractDrawerForm.by2 = this.tagsPeopleData;
        },
        deleteClick() {
            const _this = this;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$axios
                .post('/task/taskdelOrcom', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid,
                    id: _this.deleteTId,
                    status: 0
                })
                .then(res => {
                    _this.loading = false;
                    if (res.data.code == 200) {
                        _this.deleteVisible = false;
                        _this.$message.success(res.data.msg);
                        _this.gettaskManyList();
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                })
                .catch(function(error) {
                    _this.loading = false;
                    console.log(error);
                });
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loading = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },
        //评论任务
        talkWith() {
            const _this = this;
            _this.loadTalk = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            if (_this.taskcomment) {
                _this.$axios
                    .post('/task/taskcomment', {
                        taskid: _this.editTaskID,
                        xmid: _this.$store.state.projectInfo.pid,
                        corp_id: _this.$store.state.cid,
                        username: _this.$store.state.userInfo.uname,
                        user_id: _this.$store.state.userInfo.uid,
                        content: _this.taskcomment,
                        file: []
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            _this.loadTalk = false;
                            _this.taskcomment = '';
                            _this.$message.success('发表评论成功');
                            _this.getTalkList();
                        } else {
                            _this.loadTalk = false;
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    })
                    .catch(function(error) {
                        _this.loadTalk = false;
                        _this.$message.error(`${error.data}`);
                        console.log(error);
                    });
            } else {
                _this.loadTalk = false;
                _this.$message.warning('请输入评论内容！');
            }
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loadTalk = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },

        //评论任务
        talkWith() {
            const _this = this;
            _this.loadTalk = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            if (_this.taskcomment) {
                _this.$axios
                    .post('/task/taskcomment', {
                        taskid: _this.editTaskID,
                        xmid: _this.$store.state.projectInfo.pid,
                        corp_id: _this.$store.state.cid,
                        username: _this.$store.state.userInfo.uname,
                        user_id: _this.$store.state.userInfo.uid,
                        content: _this.taskcomment,
                        file: []
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            _this.loadTalk = false;
                            _this.taskcomment = '';
                            _this.$message.success('发表评论成功');
                            _this.getTalkList();
                        } else {
                            _this.loadTalk = false;
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    })
                    .catch(function(error) {
                        _this.loadTalk = false;
                        _this.$message.error(`${error.data}`);
                        console.log(error);
                    });
            } else {
                _this.loadTalk = false;
                _this.$message.warning('请输入评论内容！');
            }
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loadTalk = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },
        unique(arr) {
            const res = new Map();
            return arr.filter(
                arr => !res.has(arr.emplId) && res.set(arr.emplId, 1)
            );
        },
        dedupe(array) {
            return Array.from(new Set(array));
        },
        pickerSelect(arr, type) {
            const that = this;

            if (type == 1) {
                let newtap = JSON.parse(JSON.stringify(that.tagsPeopleData));
                let newtag = JSON.parse(JSON.stringify(that.tagsData));
                if (that.peopleType == 1) {
                    arr.forEach(item => {
                        newtag.push(item);
                    });
                    that.tagsData = newtag;
                    that.tagsData = that.$utils.unique(that.tagsData);
                    that.contractDrawerForm.by1 = that.tagsData;
                } else if (that.peopleType == 2) {
                    arr.forEach(item => {
                        newtap.push(item);
                    });
                    that.tagsPeopleData = newtap;
                    that.tagsPeopleData = that.$utils.unique(
                        that.tagsPeopleData
                    );
                    that.contractDrawerForm.by2 = that.tagsPeopleData;
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
                .then(res => {
                    if (res.data.code == 200) {
                        _this.pTreeData = res.data.content;
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
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
                .then(res => {
                    if (res.data.status == 1) {
                        _this.$store.commit(
                            'setSpaceId',
                            res.data.spaceid.toString()
                        );
                        _this.addFilesClick();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        addFilesClick() {
            const _this = this;
            dd.ready(function() {
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
                    onSuccess: function(result) {
                        //onSuccess将在文件上传成功之后调用
                        if (_this.contractDrawerForm.enclosure == null) {
                            _this.contractDrawerForm.enclosure = [];
                        }
                        result.data.forEach(item => {
                            _this.contractDrawerForm.enclosure.push(item);
                        });
                    },
                    onFail: function(err) {
                        console.log('err++' + err);
                    }
                });
            });
            dd.error(function(err) {
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
                .then(res => {
                    if (res.data.status == 1) {
                        dd.ready(function() {
                            dd.biz.cspace.preview({
                                corpId: _this.$store.state.cid,
                                spaceId: item.spaceId,
                                fileId: item.fileId,
                                fileName: item.fileName,
                                fileSize: item.fileSize,
                                fileType: item.fileType,
                                onSuccess: function() {
                                    //无，直接在native显示文件详细信息
                                },
                                onFail: function(err) {
                                    // 无，直接在native页面显示具体的错误
                                }
                            });
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //删除附件
        deleteFiles(index) {
            this.contractDrawerForm.enclosure.splice(index, 1);
        },
        //修改按钮
        editTask(row, column) {
            // item.viewPopo = false;
            const _this = this;
            // switch (column.label) {
            //     case '任务标题':
            _this.taskcomment = '';
            _this.editTaskID = row.id;
            _this.editTaskName = row.tasktitle;
            _this.editProName = row.pname;
            _this.getTalkList();
            _this.$axios
                .post('/task/edittempalte', {
                    type: 1,
                    id: row.spare4
                })
                .then(res => {
                    if (res.data.code == '200') {
                        let newData = res.data.list;

                        //动态添加属性
                        let newJson = {};
                        newData.task_title.forEach(item => {
                            let newKey = item.title;

                            newJson[newKey] = '';
                        });
                        _this.$set(_this.contractDrawerForm, 'desc', newJson);
                        _this.contractDrawerForm.spare3 = row.taskid;
                        _this.contractDrawerForm.tasktype = row.name;

                        _this.newTaskDemoList = newData.task_title;
                        _this.drawerVisible = true;
                        _this.getTaskInfo();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            //         break;
            // }
        },
        getTalkList() {
            const _this = this;
            _this.$axios
                .post('/task/cotentlist', {
                    taskid: _this.editTaskID,
                    corp_id: _this.$store.state.cid,
                    user_id: _this.$store.state.userInfo.uid
                })
                .then(res => {
                    if (res.data.code == 200) {
                        if (res.data.list) {
                            _this.talkList = res.data.list;
                        } else {
                            _this.talkList = [];
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //获取任务详情
        getTaskInfo() {
            const _this = this;
            _this.$axios
                .post('/task/taskdetails', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    id: _this.editTaskID,
                    userid: _this.$store.state.userInfo.uid
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.tagsData = res.data.list.by1;
                        _this.taskStatus = res.data.list.taskstatus;
                        _this.tagsPeopleData = res.data.list.by2;
                        _this.contractDrawerForm = res.data.list;
                        _this.dingAppor = JSON.parse(
                            JSON.stringify(_this.contractDrawerForm.by1)
                        );
                        _this.newTodoPeople = _this.contractDrawerForm.by1;
                        _this.contractDrawerForm.enclosure = JSON.parse(
                            _this.contractDrawerForm.enclosure
                        );
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }, //关闭编辑按钮
        drawClose(formName) {
            this.drawerVisible = false;
            this.contractDrawerForm.tasktitle = '';
            this.contractDrawerForm.starttime = '';
            this.contractDrawerForm.stoptime = '';
            this.contractDrawerForm.by2 = [];
            this.contractDrawerForm.by1 = [];
            this.tagsPeopleData = [];
            this.tagsData = [];
        },
        //编辑按钮
        closeDrawer(formName) {
            const _this = this;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$refs[formName].validate(valid => {
                if (valid) {
                    if (_this.contractDrawerForm.by1.length > 0) {
                        let newData = _this.contractDrawerForm;
                        newData.corp_id = _this.$store.state.cid;
                        newData.xmid = _this.$store.state.projectInfo.pid;
                        newData.userid = _this.$store.state.userInfo.uid;
                        newData.id = _this.editTaskID;
                        _this.$axios
                            .post('/task/taskupdate', newData)
                            .then(res => {
                                if (res.data.status == '1') {
                                    _this.loading = false;
                                    _this.drawerVisible = false;
                                    _this.gettaskManyList();

                                    _this.$refs[formName].resetFields();
                                    _this.contractDrawerForm.by1 = [];
                                    _this.contractDrawerForm.by2 = [];
                                    _this.tagsData = [];
                                    _this.tagsPeopleData = [];
                                    _this.$message({
                                        message: '编辑任务成功',
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
                            .catch(function(error) {
                                _this.loading = false;
                                console.log(error);
                            });
                    } else {
                        _this.$message.warning('请选择待办人员');
                        _this.loading = false;
                    }
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

        typeChange(val) {
            if (val) {
                let obj = {};
                obj = this.taskTypeList.find(function(item) {
                    return item.id === val;
                });
                this.searchForm.typeName = obj.name;
            } else {
                this.searchForm.typeName = '';
            }
        },
        //完成和删除
        completeTask(type, row) {
            const _this = this;
            let newId = '';
            if (type == 0) {
                row.viewPopo = false;
                _this.deleteVisible = true;
                _this.deleteTId = row.id;
            } else if (type == 1) {
                // if (_this.$store.state.projectInfo.pstatus == '1') {
                _this.$axios
                    .post('/task/taskdelOrcom', {
                        corp_id: _this.$store.state.cid,
                        xmid: _this.$store.state.projectInfo.pid,
                        userid: _this.$store.state.userInfo.uid,
                        id: _this.editTaskID,
                        status: type
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            _this.drawerVisible = false;
                            _this.$message.success(res.data.msg);
                            _this.gettaskManyList();
                            if (type == 1) {
                                _this
                                    .$confirm('是否归档该任务?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    })
                                    .then(() => {
                                        _this.taskBack();
                                    })
                                    .catch(() => {
                                        _this.$message({
                                            type: 'info',
                                            message: '已取消归档',
                                            duration: 1500
                                        });
                                    });
                            }
                        } else {
                            _this.$message.warning(res.data.msg);
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                // } else if (_this.$store.state.projectInfo.pstatus == '2') {
                //     _this.$message.warning('归档项目不可操作！');
                // }
            }
        },
        //任务归档
        taskBack() {
            const _this = this;
            _this.$axios
                .post('/task/taskdelOrcom', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid,
                    id: _this.editTaskID,
                    status: 3
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.gettaskManyList();
                        _this.$message.success('该任务已归档成功');
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    _this.$message.error(error.data);
                });
        },
        //重启任务
        resetTask(type) {
            const _this = this;
            let newType = '';
            if (type == 1) {
                newType = 2; //重启
                _this.$axios
                    .post('/task/tasknotice', {
                        corp_id: _this.$store.state.cid,
                        user_id: _this.$store.state.userInfo.uid,
                        xmid: _this.$store.state.projectInfo.pid,
                        userid: _this.newTodoPeople.toString(),
                        id: _this.editTaskID,
                        type: newType,
                        tasktitle: _this.editTaskName,
                        proname: _this.editProName
                    })
                    .then(res => {
                        if (res.data.status == '200') {
                            _this.drawerVisible = false;
                            _this.$message.success(res.data.msg);
                            _this.gettaskManyList();
                        } else {
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            } else if (type == 2) {
                newType = 1; //催办
                dd.ready(function() {
                    dd.biz.ding.create({
                        users: _this.dingAppor, // 用户列表，工号
                        corpId: _this.$store.state.cid, // 企业id
                        type: 1, // 附件类型 1：image  2：link
                        alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
                        alertDate: {
                            format: 'yyyy-MM-dd HH:mm',
                            value: ''
                        },
                        attachment: {
                            images: ['']
                        }, // 附件信息
                        text: '', // 正文
                        bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；

                        onSuccess: function() {},
                        onFail: function() {}
                    });
                });
                dd.error(function(err) {
                    _this.$alert('发钉+++' + err);
                });
            }
        },
        // //催办
        // notice(row) {
        //     const _this = this;
        //     row.viewPopo = false;
        //     _this.$axios
        //         .post('/task/tasknotice', {
        //             corp_id: _this.$store.state.cid,
        //             user_id: _this.$store.state.userInfo.uid,
        //             xmid: _this.$store.state.projectInfo.pid,
        //             userid: row.userids,
        //             id: row.id,
        //             tasktitle: row.tasktitle,
        //             type: 1,
        //             proname: row.name
        //         })
        //         .then(res => {
        //             if (res.data.code == 200) {
        //                 _this.$message.success(res.data.msg);
        //                 _this.gettaskManyList();
        //             } else {
        //                 _this.$message.warning(`${res.data.msg}`);
        //             }
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
        // },
        // // 完成
        // completeTask(row) {
        //     const _this = this;
        //     row.viewPopo = false;
        //     _this.$axios
        //         .post('/task/taskdelOrcom', {
        //             corp_id: _this.$store.state.cid,
        //             xmid: _this.$store.state.projectInfo.pid,
        //             userid: _this.$store.state.userInfo.uid,
        //             id: row.id,
        //             status: 1
        //         })
        //         .then(res => {
        //             if (res.data.code == 200) {
        //                 _this.$message.success(res.data.msg);
        //                 _this.gettaskManyList();
        //             } else {
        //                 _this.$message.warning(`${res.data.msg}`);
        //             }
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
        // },
        // //重启任务
        // resetTask(row) {
        //     const _this = this;
        //     row.viewPopo = false;
        //     // if (_this.$store.state.projectInfo.pstatus == '1') {
        //     _this.$axios
        //         .post('/task/tasknotice', {
        //             corp_id: _this.$store.state.cid,
        //             userid: _this.$store.state.userInfo.uid,
        //             xmid: _this.$store.state.projectInfo.pid,
        //             userid: _this.$store.state.userInfo.uid,
        //             id: row.id,
        //             type: 2,
        //             proname: row.name,
        //             tasktitle: row.tasktitle
        //         })
        //         .then(res => {
        //             if (res.data.status == '200') {
        //                 _this.$message.success(res.data.msg);
        //                 _this.gettaskManyList();
        //             } else {
        //                 _this.$message.warning(`${res.data.msg}`);
        //             }
        //         })
        //         .catch(function(error) {
        //             console.log(error);
        //         });
        //     // } else if (_this.$store.state.projectInfo.pstatus == '2') {
        //     //     _this.$message.warning('归档项目不可操作！');
        //     // }
        // },

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
        back() {
            this.$router.go(-1);
        },
        viewDraw() {
            this.drawerVisible = true;
        },
        typeClick(index) {
            this.activeConIndex = index;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.gettaskManyList();
        },
        //获取任务类型列表
        getTaskTypeList() {
            this.$axios
                .post('/task/tasktype', {
                    corpid: this.$store.state.cid,
                    xmid: this.$store.state.projectInfo.pid
                })
                .then(res => {
                    if (res.data.code == 200) {
                        this.taskTypeList = res.data.list;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        //搜索
        searchClick() {
            this.currentPage = 1;
            this.gettaskManyList();
        },
        gettaskManyList() {
            this.$axios
                .post('/task/taskhomepag', {
                    corp_id: this.$store.state.cid,
                    xmid: this.$store.state.projectInfo.pid,
                    userid: this.$store.state.userInfo.uid,
                    type: this.$route.query.id,
                    tasktitle: this.searchForm.name,
                    tasktype: this.searchForm.type,
                    current_page: this.currentPage
                })
                .then(res => {
                    if (res.data.status == '1') {
                        this.cwList = res.data.content.list.map(function(item) {
                            return Object.assign(item, {
                                viewPopo: false
                            });
                        });
                        this.total = res.data.content.total;
                        if (this.total > 0 && this.cwList.length < 1) {
                            this.currentPage = res.data.content.page;
                            this.gettaskManyList();
                        }
                    } else if (res.data.status == '400') {
                        dd.ready(function() {
                            dd.device.notification.alert({
                                message: res.data.msg,
                                title: '提示', //可传空
                                buttonName: '收到',
                                onSuccess: function() {
                                    //onSuccess将在点击button之后回调
                                    /*回调*/
                                },
                                onFail: function(err) {}
                            });
                        });
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getTaskTypeList();
        this.gettaskManyList();
    },
    created() {
        this.newId = this.$route.query.id;
        this.$utils.checkding();
    },
    watch: {
        '$store.state.projectInfo': {
            handler(newVal, oldVal) {
                //你需要执行的代码
                if (oldVal) {
                    this.gettaskManyList();
                    this.getTaskTypeList();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
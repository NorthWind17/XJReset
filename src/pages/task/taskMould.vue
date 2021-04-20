<template>
    <div id="taskMould">
        <div class="main">
            <div class="content">
                <div class="border header">
                    <div class="headerTitle">发起任务</div>
                    <div class="headerContent">
                        <div class="headerHover" @click="viewDialog(1)">
                            <div class="bigWord">文档任务</div>
                            <div class="smallWord">公共模板</div>
                        </div>
                        <div class="headerHover" @click="sendNormal">
                            <div class="bigWord">普通任务</div>
                            <div class="smallWord">简易模板</div>
                        </div>
                    </div>
                </div>

                <div class="tmMiddle">
                    <div class="middleTitle">审批流程</div>
                    <div class="middleContent">
                        <div @click="goList('1')">
                            <div class="left">
                                <img
                                    src="../../assets/workbench/shenpi.png"
                                    alt=""
                                />
                            </div>
                            <div class="right">
                                <div>{{ dzxtask }}</div>
                                <div>审批中></div>
                            </div>
                        </div>
                        <div class="line"><span></span></div>
                        <!-- <div @click="goList('1')">
                            <div class="left">
                                <img
                                    src="../../assets/workbench/qianshu.png"
                                    alt=""
                                />
                            </div>
                            <div class="right">
                                <div>0</div>
                                <div>签署中></div>
                            </div>
                        </div>
                        <div class="line"><span></span></div> -->
                        <div @click="goList('4')">
                            <div class="left">
                                <img
                                    src="../../assets/workbench/guidang.png"
                                    alt=""
                                />
                            </div>
                            <div class="right">
                                <div>{{ yzxtask }}</div>
                                <div>归档中></div>
                            </div>
                        </div>
                        <div class="line"><span></span></div>
                        <div @click="goList('5')">
                            <div class="left">
                                <img
                                    src="../../assets/workbench/wanjie.png"
                                    alt=""
                                />
                            </div>
                            <div class="right">
                                <div>{{ ygdtask }}</div>
                                <div>已完结></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header tmBottom">
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '1' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ dzxtask }}</div>
                            <div class="headline">待执行任务</div>
                        </div>
                    </router-link>
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '2' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ wcjtask }}</div>
                            <div class="headline">我创建任务</div>
                        </div>
                    </router-link>
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '3' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ cstask }}</div>
                            <div class="headline">抄送我的</div>
                        </div>
                    </router-link>
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '4' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ yzxtask }}</div>
                            <div class="headline">已执行任务</div>
                        </div>
                    </router-link>
                    <router-link
                        class="rwbl-content"
                        :to="{
                            path: '/task/taskList',
                            query: { status: '5' }
                        }"
                        open-type="navigate"
                        style="margin-bottom: 30rpx"
                    >
                        <div>
                            <div class="num">{{ ygdtask }}</div>
                            <div class="headline">已归档任务</div>
                        </div>
                    </router-link>
                </div>
            </div>
            <el-dialog
                title="选择模板"
                :visible.sync="viewMould"
                class="contractOpenPeopleDialog"
                :close-on-click-modal="false"
            >
                <div class="viewMould">
                    <!-- <div class="searchTitle">
                        <el-input v-model="searchMould"></el-input
                        ><el-button type="primary" round @click="searchMClick"
                            >搜索</el-button
                        >
                    </div> -->
                    <div v-if="taskMouldList.length < 1 && !isUpShow">
                        暂无数据
                    </div>
                    <div v-else>
                        <div class="searchMlist">
                            <div
                                v-if="taskMouldList.length > 0"
                                v-for="(item, index) in taskMouldList"
                                @click="sendMould(item)"
                            >
                                <div>
                                    <img :src="item.tmpimg" alt="" />
                                    <span>发起审批</span>
                                </div>
                                <p>{{ item.tmpname }}</p>
                            </div>
                            <!-- <div v-if="isUpShow">
                                <div
                                    @click="goUpload"
                                    style="
                                        text-align: center;
                                        line-height: 180px;
                                    "
                                >
                                    <i
                                        class="el-icon-plus"
                                        style="font-size: 60px"
                                    ></i>
                                </div>
                            </div> -->
                        </div>
                    </div>

                    <!-- <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination> -->
                </div>

                <el-dialog
                    title="选择项目发起审批"
                    :visible.sync="appVisible"
                    @close="approvalCancel('selectEditForm')"
                    append-to-body
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
            </el-dialog>
            <el-dialog
                title="审批类型"
                :visible.sync="viewTaskType"
                class="contractOpenPeopleDialog"
                :close-on-click-modal="false"
            >
                <div class="viewTask">
                    <div>
                        <div></div>
                        <p>汤</p>
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title="上传非标模板"
                :visible.sync="uploadTaskType"
                class="contractOpenPeopleDialog"
                :append-to-body="true"
                :close-on-click-modal="false"
            >
                <div class="uploadTask">
                    <div class="upsType">
                        <div><span style="color: red">*</span>任务类型</div>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="upsExcel">
                        <div><span style="color: red">*</span>上传文件</div>
                        <div class="newcom">
                            <img
                                width="50"
                                src="../../assets/workbench/exceladd.png"
                                alt
                            />
                            <p>请上传文件</p>
                            <eupload
                                @listenToChild="showUrl"
                                :upImgList2="upImgList2"
                                :licenceImg2="licenceImg2"
                                :isShow2="isShow2"
                            ></eupload>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="upTCancel">取 消</el-button>
                    <el-button type="primary" @click="upTSend">确 定</el-button>
                </div>
            </el-dialog>
            <el-drawer
                title="新建普通任务"
                :visible.sync="drawerVisible"
                direction="rtl"
                @close="drawClose('cComeform')"
                ref="contractDrawer"
                class="taskMDraw"
            >
                <div class="cDrawerContent">
                    <el-form
                        :model="contractDrawerForm"
                        :rules="taskRule"
                        ref="cComeform"
                        label-width="130px"
                    >
                        <el-form-item label="任务标题" prop="tasktitle">
                            <el-input
                                v-model="contractDrawerForm.tasktitle"
                            ></el-input>
                        </el-form-item>
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
                        <el-form-item label="备注" prop="remark">
                            <el-input
                                type="textarea"
                                v-model="contractDrawerForm.remark"
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
        </div>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import supload from '../../components/dingUpload';
import cupload from '../../components/corpUpload';
import eupload from '../../components/excelUpload';
export default {
    name: 'taskOrder',
    components: { supload, cupload, eupload },
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
            loaded: false,
            selectAddForm: {
                zid: '',
                name: this.$store.state.projectInfo.pname
            },
            noNextProject: [],
            appVisible: false,
            timer: null,
            taskRule: {
                tasktitle: [
                    {
                        required: true,
                        message: '请输入标题',
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
            tagsData: [],
            tagsPeopleData: [],
            drawerVisible: false,
            taskMouldID: '',
            AllPeopleVisible: false,
            AllSendPeopleVisible: false,
            dzxtask: 0,
            cstask: 0,
            wcjtask: 0,
            yzxtask: 0,
            ygdtask: 0,
            quanbutask: 0,
            backTaskNum: 0,
            uploadTaskType: false,
            total: '',
            pagesize: 12,
            currentPage: 1,
            taskMouldList: [],
            viewMould: false,
            viewTaskType: false,
            loading: false,
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
            searchMould: '',
            searchStatus: 1,
            excelUrl: '',
            isUpShow: false,
            contractDrawerForm: {
                fiunderuserid: this.$store.state.userInfo.uid,
                corp_id: this.$store.state.cid,
                founder: this.$store.state.userInfo.uname,
                projectname: this.$store.state.projectInfo.pname,
                userid: this.$store.state.userInfo.uid,
                xmid: this.$store.state.projectInfo.pid,
                enclosure: [],
                by1: [],
                by2: [],
                starttime: '',
                stoptime: '',
                remark: '',
                tasktitle: ''
            },
            peopleType: 1,
            checkName: ''
        };
    },
    methods: {
        upTCancel() {},
        upTSend() {},
        goUpload() {
            this.uploadTaskType = true;
        },
        showUrl(url) {
            this.excelUrl = url;
        },
        getNum() {
            const _this = this;
            _this.$axios
                .post('/task/taskxq', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    projectname: _this.$store.state.projectInfo.pname,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.dzxtask = res.data.list.dzxtask;
                        _this.yzxtask = res.data.list.yzxtask;
                        _this.ygdtask = res.data.list.ygdtask;
                        _this.wcjtask = res.data.list.wcjtask;
                        _this.cstask = res.data.list.cstask;
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        sendMould(item) {
            const _this = this;
            _this.checkName = item.tmpname;
            _this.selectAddForm.name = _this.$store.state.projectInfo.pname;
            if (_this.noNextProject.length > 0) {
                _this.appVisible = true;
            } else {
                _this.$axios
                    .post('/task/gettmpcode', {
                        corp_id: _this.$store.state.cid,
                        tmpname: item.tmpname,
                        xmid: _this.$store.state.projectInfo.pid,
                        zxmid: '',
                        userid: _this.$store.state.userInfo.uid,
                        admin: _this.$store.state.userInfo.admin
                    })
                    .then((res) => {
                        let newUrl =
                            'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=' +
                            _this.$store.state.cid +
                            '#/custom/?processCode=' +
                            res.data.process_code;
                        dd.ready(function () {
                            dd.biz.util.openSlidePanel({
                                url: newUrl, //打开侧边栏的url
                                title: '发起' + item.tmpname, //侧边栏顶部标题
                                onSuccess: function (result) {
                                    _this.viewMould = false;
                                },
                                onFail: function () {
                                    setTimeout(() => {
                                        _this.getNum();
                                    }, 5000);
                                    setTimeout(() => {
                                        _this.getNum();
                                    }, 10000);
                                }
                            });
                        });
                        _this.viewMould = false;
                        _this.appVisible = false;
                        _this.loaded = false;
                        // _this.$refs[formName].resetFields();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        sendNormal() {
            if (this.$store.state.projectInfo.pid) {
                this.contractDrawerForm.enclosure = [];
                this.drawerVisible = true;
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
        drawClose(formName) {
            this.drawerVisible = false;
            this.$refs[formName].resetFields();
            this.contractDrawerForm.starttime = '';
            this.contractDrawerForm.stoptime = '';
            this.contractDrawerForm.tasktitle = '';
            this.contractDrawerForm.enclosure = [];
            this.contractDrawerForm.by2 = [];
            this.contractDrawerForm.by1 = [];
            this.tagsPeopleData = [];
            this.tagsData = [];
        },
        closeDrawer(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.contractDrawerForm.by1.length > 0) {
                        let newData = _this.contractDrawerForm;
                        newData.tmpid = _this.taskMouldID;
                        newData.userid = _this.$store.state.userInfo.uid;
                        newData.xmid = _this.$store.state.projectInfo.pid;
                        _this.$axios
                            .post('/task/Addtask', newData)
                            .then((res) => {
                                if (res.data.code == 200) {
                                    _this.loading = false;
                                    _this.drawerVisible = false;
                                    // _this.getList();
                                    _this.getNum();
                                    _this.$refs[formName].resetFields();
                                    _this.contractDrawerForm.by1 = [];
                                    _this.contractDrawerForm.by2 = [];
                                    _this.tagsData = [];
                                    _this.tagsPeopleData = [];
                                    _this.$message({
                                        message: '新建任务成功',
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
                        _this.$message.warning('请选择待办人员');
                        _this.loading = false;
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
                        dd.error(function (err) {
                            console.log('44+++' + err);
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
        openAllPeople() {
            this.AllPeopleVisible = true;
        },
        openSendPeople() {
            this.AllSendPeopleVisible = true;
        },
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.contractDrawerForm.by1 = this.tagsData;
        },
        handleSendClose(tag) {
            this.tagsPeopleData.splice(this.tagsPeopleData.indexOf(tag), 1);
            this.contractDrawerForm.by2 = this.tagsPeopleData;
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
                            _this.contractDrawerForm.enclosure.push(item);
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
        addManyP(type) {
            const that = this;
            that.peopleType = type;
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
                        that.pickerSelect(result.users);
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
        pickerSelect(arr) {
            const _this = this;

            if (_this.peopleType == 1) {
                let newPeople = JSON.parse(JSON.stringify(_this.tagsData));

                arr.forEach((item) => {
                    newPeople.push(item);
                });
                if (newPeople.length > 1000) {
                    _this.$message({
                        message: '不得超过1000人',
                        type: 'warning',
                        duration: '1500'
                    });
                } else {
                    _this.tagsData = newPeople;
                    _this.tagsData = _this.$utils.unique(_this.tagsData);
                    _this.contractDrawerForm.by1 = _this.tagsData;
                }
            } else if (_this.peopleType == 2) {
                let newPeople = JSON.parse(
                    JSON.stringify(_this.tagsPeopleData)
                );

                arr.forEach((item) => {
                    newPeople.push(item);
                });
                if (newPeople.length > 1000) {
                    _this.$message({
                        message: '不得超过1000人',
                        type: 'warning',
                        duration: '1500'
                    });
                } else {
                    _this.tagsPeopleData = newPeople;
                    _this.tagsPeopleData = _this.$utils.unique(
                        _this.tagsPeopleData
                    );
                    _this.contractDrawerForm.by2 = _this.tagsPeopleData;
                }
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
                        .post('/task/gettmpcode', {
                            corp_id: _this.$store.state.cid,
                            tmpname: _this.checkName,
                            xmid: _this.$store.state.projectInfo.pid,
                            zxmid: _this.selectAddForm.zid,
                            userid: _this.$store.state.userInfo.uid,
                            admin: _this.$store.state.userInfo.admin
                        })
                        .then((res) => {
                            let newUrl =
                                'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=' +
                                _this.$store.state.cid +
                                '#/custom/?processCode=' +
                                res.data.process_code;
                            dd.ready(function () {
                                dd.biz.util.openSlidePanel({
                                    url: newUrl, //打开侧边栏的url
                                    title: '发起' + _this.checkName, //侧边栏顶部标题
                                    onSuccess: function (result) {
                                        _this.viewMould = false;
                                    },
                                    onFail: function () {
                                        setTimeout(() => {
                                            _this.getNum();
                                        }, 5000);
                                        setTimeout(() => {
                                            _this.getNum();
                                        }, 10000);
                                    }
                                });
                            });
                            _this.viewMould = false;
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
        //打开模板选择覆盖层
        viewDialog(type) {
            if (this.$store.state.projectInfo.pid) {
                if (type == 1) {
                    this.isUpShow = false;
                } else if (type == 2) {
                    this.isUpShow = true;
                }
                this.searchMould = '';
                this.currentPage = 1;
                this.searchStatus = type;
                this.getList();
                this.viewMould = true;
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
        //去列表
        goList(status) {
            this.$router.push({
                path: '/task/taskList',
                query: { status: status }
            });
        },
        //发起审批
        goCheck() {
            this.viewTaskType = true;
            // this.$axios
            //     .post('/task/gettmpcode', {
            //         corp_id: this.$store.state.cid,
            //         tmpname: '检验批'
            //     })
            //     .then((res) => {
            //         let newUrl =
            //             'https://aflow.dingtalk.com/dingtalk/pc/query/pchomepage.htm?corpid=dingea47c602975497f935c2f4657eb6378f#/custom/?processCode=' +
            //             res.data.process_code +
            //             '';
            //         dd.ready(function () {
            //             dd.biz.util.openSlidePanel({
            //                 url: newUrl, //打开侧边栏的url
            //                 title: '发起审批', //侧边栏顶部标题
            //                 onSuccess: function (result) {},
            //                 onFail: function () {}
            //             });
            //         });
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        },
        //获取任务类型列表
        getTaskTypeList() {
            this.$axios
                .post('/task/tasktypelist', {
                    corpid: this.$store.state.cid,
                    xmid: this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.taskTypeList = res.data.list;
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
        searchMClick() {
            this.currentPage = 1;
            this.getList();
        },
        //获取列表
        getList() {
            const _this = this;
            _this.$axios
                .post('/task/tmplist', {
                    status: _this.searchStatus,
                    type: 2,
                    tmpname: _this.searchMould,
                    corp_id: _this.$store.state.cid
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.taskMouldList = res.data.content.list;
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
        //获取项目信息
        getInfo() {
            const _this = this;
            _this.$axios
                .post('/task/taskxq', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    userid: _this.$store.state.userInfo.uid,
                    admin: _this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getNextProject() {
            const _this = this;

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
    },
    created() {
        this.$utils.checkding();
        this.getNextProject();
        this.getNum();
    },
    computed: {
        // 结束时间大于开始时间
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.contractDrawerForm.stoptime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.contractDrawerForm.starttime;
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
                    this.getNextProject();
                    this.getNum();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
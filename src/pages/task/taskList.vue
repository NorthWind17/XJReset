/*
 * @Author: NorthWind 
 * @Date: 2020-11-18 09:39:46 
 * @Last Modified by: NorthWind
 * @Last Modified time: 2021-04-20 18:24:50
 */
<template>
    <div id="taskList">
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
                                <!-- <el-form-item label="名称：" class="sbFirst">
                                    <el-input
                                        placeholder="请输入内容"
                                        prefix-icon="el-icon-search"
                                        v-model="searchForm.name"
                                        @keyup.enter.native="searchClick"
                                    ></el-input>
                                </el-form-item> -->
                                <el-form-item
                                    class="searchTime"
                                    label="开始时间："
                                >
                                    <el-date-picker
                                        v-model="searchForm.starttime"
                                        :picker-options="searchStart"
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
                                        v-model="searchForm.endtime"
                                        :picker-options="searchEnd"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </el-form-item>
                                <el-form-item label="任务类型：">
                                    <el-select
                                        v-model="searchForm.status"
                                        placeholder="请选择"
                                        clearable
                                    >
                                        <el-option label="文档任务" value="2">
                                        </el-option>
                                        <el-option label="普通任务" value="1">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="文档类型：">
                                    <el-select
                                        v-model="searchForm.type"
                                        placeholder="请选择"
                                        clearable
                                        filterable
                                    >
                                        <el-option
                                            v-for="(item, index) in taskTmpList"
                                            :label="item.tmpname"
                                            :value="item.tmpname"
                                        >
                                        </el-option>
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
                    <div class="searchList">
                        <div class="typeClass">
                            <el-badge
                                v-for="(item, index) in taskStatusList"
                                :key="index"
                                :value="item.num"
                                :max="99"
                                class="item"
                            >
                                <el-button
                                    size="medium"
                                    :class="
                                        index === activeConIndex
                                            ? 'activeConClass'
                                            : ''
                                    "
                                    @click="typeClick(item, index)"
                                    >{{ item.name }}</el-button
                                >
                            </el-badge>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="taskList"
                    @row-click="goEditTask"
                    :header-cell-style="tableHeaderClass"
                    border
                    style="width: 100%"
                >
                    <el-table-column
                        prop="tasktitle"
                        label="任务标题"
                        show-overflow-tooltip="true"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="pname"
                        label="项目"
                        show-overflow-tooltip="true"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="founder"
                        label="创建人"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="createdtime"
                        label="开始时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="stoptime"
                        label="结束时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="tasktype"
                        label="分类"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="taskstatus"
                        label="状态"
                        align="center"
                        :formatter="taskFormat"
                    ></el-table-column>
                    <el-table-column
                        label="归档内容"
                        v-if="typeId == '5'"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.status == '0'"
                                @click.native.prevent="watchRow(scope.row)"
                                type="text"
                            >
                                查看
                            </el-button>
                            <el-button v-else type="text" size="small">
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        v-if="typeId == '4'"
                        align="center"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="backRow(scope.row)"
                                type="text"
                            >
                                归档
                            </el-button>
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
            <el-dialog title="提示" :visible.sync="deleteVisible" width="500px">
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
                title="发起签署"
                :visible.sync="drawerVisible"
                direction="rtl"
                @close="drawClose('cComeform')"
                ref="contractDrawer"
                class="taskDrawClass"
            >
                <div class="cDrawerContent">
                    <!-- <div class="drawTopBtn">
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
                    </div> -->
                    <el-form :model="viewForm" label-width="130px">
                        <el-form-item label="审批编码" prop="starttime">
                            <div>11111</div>
                        </el-form-item>
                        <el-form-item label="任务编码" prop="starttime">
                            <div>提交后系统自动生成</div>
                        </el-form-item>
                        <el-form-item label="任务名称" prop="starttime">
                            <div>任务</div>
                        </el-form-item>
                        <el-form-item label="任务文件" prop="starttime">
                            <div>
                                <div>
                                    <div></div>
                                    <div>
                                        <p>名</p>
                                        <p>10k</p>
                                    </div>
                                </div>
                                <div><i class="el-icon-download"></i></div>
                            </div>
                        </el-form-item>
                    </el-form>
                    <el-form
                        :model="signForm"
                        :rules="taskSignRule"
                        ref="csignform"
                        label-width="130px"
                    >
                        <el-form-item label="印章管理员" prop="user">
                            <el-select
                                v-model="signForm.user"
                                filterable
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用章类型" prop="type">
                            <el-select
                                v-model="signForm.type"
                                filterable
                                placeholder="请选择"
                            >
                                <el-option label="项目章" value="项目章">
                                </el-option>
                                <el-option label="公章" value="公章">
                                </el-option>
                                <el-option label="财务章" value="财务章">
                                </el-option>
                                <el-option label="合同章" value="合同章">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input
                                type="textarea"
                                placeholder="请输入备注"
                                v-model="signForm.remark"
                            >
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item
                            class="taskDrawTalk"
                            label="评论"
                            style="margin-top: 46px"
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
                                style="margin-top: 10px"
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
                        </el-form-item> -->
                        <div class="demo-drawer__footer">
                            <el-button
                                type="primary"
                                @click="closeDrawerll('csignform')"
                                :loading="loading"
                                >{{
                                    loading ? '修改中 ...' : '修改'
                                }}</el-button
                            >
                        </div>
                    </el-form>
                </div>
            </el-drawer>
            <el-drawer
                :title="newDrawTitle"
                :visible.sync="newDrawerVisible"
                direction="rtl"
                @close="newClose('cComeform')"
                ref="contractDrawer"
                class="viewTaskDrawClass"
            >
                <div class="cDrawerContent">
                    <div class="cDrawerLeft">
                        <div class="cdBasic"><span></span>基础信息</div>
                        <el-form
                            :model="viewForm"
                            class="cdvForm"
                            label-width="100px"
                        >
                            <el-form-item label="审批编码">
                                <div>11111</div>
                            </el-form-item>
                            <el-form-item label="任务编码">
                                <div>提交后系统自动生成</div>
                            </el-form-item>
                            <el-form-item label="任务名称">
                                <div>任务</div>
                            </el-form-item>
                            <el-form-item label="任务状态">
                                <div>待归档</div>
                            </el-form-item>
                            <el-form-item label="任务文件" class="cdFile">
                                <div>
                                    <div class="cdfLeft">
                                        <div>
                                            <i class="el-icon-document"></i>
                                        </div>
                                        <div>
                                            <p>名</p>
                                            <p>10k</p>
                                        </div>
                                    </div>
                                    <div class="cdfRight">
                                        <i class="el-icon-download"></i>
                                    </div>
                                </div>
                            </el-form-item>
                        </el-form>
                        <div class="signInfo">
                            <div class="cdBasic"><span></span>签署信息</div>
                            <el-form :model="viewSignForm" label-width="100px">
                                <el-form-item label="审批编码">
                                    <div>11111</div>
                                </el-form-item>
                                <el-form-item label="任务编码">
                                    <div>提交后系统自动生成</div>
                                </el-form-item>
                                <el-form-item label="任务名称">
                                    <div>任务</div>
                                </el-form-item>
                                <el-form-item label="任务状态">
                                    <div>待归档</div>
                                </el-form-item>
                                <el-form-item label="任务文件" class="cdFile">
                                    <div>
                                        <div class="cdfLeft">
                                            <div>
                                                <i class="el-icon-document"></i>
                                            </div>
                                            <div>
                                                <p>名</p>
                                                <p>10k</p>
                                            </div>
                                        </div>
                                        <div class="cdfRight">
                                            <i class="el-icon-download"></i>
                                        </div>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="backInfo">
                            <div class="cdBasic"><span></span>归档信息</div>
                            <el-form :model="viewBackForm" label-width="100px">
                                <el-form-item label="审批编码">
                                    <div>11111</div>
                                </el-form-item>
                                <el-form-item label="任务编码">
                                    <div>提交后系统自动生成</div>
                                </el-form-item>
                                <el-form-item label="任务名称">
                                    <div>任务</div>
                                </el-form-item>
                                <el-form-item label="任务状态">
                                    <div>待归档</div>
                                </el-form-item>
                                <el-form-item label="任务文件" class="cdFile">
                                    <div>
                                        <div class="cdfLeft">
                                            <div>
                                                <i class="el-icon-document"></i>
                                            </div>
                                            <div>
                                                <p>名</p>
                                                <p>10k</p>
                                            </div>
                                        </div>
                                        <div class="cdfRight">
                                            <i class="el-icon-download"></i>
                                        </div>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="cdlB">
                            <el-button type="primary" round @click="goBackFile"
                                >去归档</el-button
                            >
                            <el-button
                                type="text"
                                icon="el-icon-more"
                            ></el-button>
                        </div>
                    </div>
                    <div class="cDrawerRight"></div>
                </div>
                <el-drawer
                    title="上传归档文件"
                    :append-to-body="true"
                    @close="innerClose"
                    :visible.sync="innerDrawer"
                    class="taskInnerView"
                >
                    <div>
                        <div class="uploadFiles">
                            <div class="uTopTitlt">
                                <div class="left">
                                    <span style="color: red">*</span>附件
                                </div>
                                <div>
                                    <span class="word" @click="addFiles()"
                                        >添加附件</span
                                    >
                                </div>
                            </div>
                            <div class="dingFilesClass">
                                <div
                                    v-for="(item, index) in selectEnclosure"
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
                        <div class="tiRemarn">
                            <div>备注</div>
                            <el-input
                                type="textarea"
                                v-model="sendRemark"
                            ></el-input>
                        </div>
                    </div>
                    <div class="demo-drawer__footer">
                        <el-button>取 消</el-button>
                        <el-button type="primary" :loading="loading">{{
                            loading ? '提交中 ...' : '确 定'
                        }}</el-button>
                    </div>
                </el-drawer>
            </el-drawer>
            <el-drawer
                title="审批普通任务"
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
                                v-if="taskStatus == '2'"
                                >重启</el-button
                            >
                        </div>
                        <el-button type="warning" round @click="resetTask(2)"
                            >催办</el-button
                        >
                    </div>
                    <el-form label-width="130px">
                        <el-form-item label="任务开始时间">
                            <div>{{ contractDrawerForm.starttime }}</div>
                        </el-form-item>
                        <el-form-item label="任务结束时间">
                            <div>{{ contractDrawerForm.stoptime }}</div>
                        </el-form-item>
                        <el-form-item label="备注">
                            <div>{{ contractDrawerForm.desc }}</div>
                        </el-form-item>
                        <div class="uploadFiles">
                            <div class="uTopTitlt">
                                <div class="left">附件</div>
                                <!-- <div>
                                    <span class="word" @click="addFiles()"
                                        >添加附件</span
                                    >
                                </div> -->
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
                                            <!-- <i
                                                class="el-icon-error"
                                                @click="deleteFiles(index)"
                                            ></i> -->
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
                        <el-form-item
                            class="taskDrawTalk"
                            label="评论"
                            style="margin-top: 46px"
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
                                style="margin-top: 10px"
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
                        <!-- <div
                            class="demo-drawer__footer"
                            v-if="taskStatus != '1'"
                        >
                            <el-button
                                type="primary"
                                @click="viewSend(2)"
                                :loading="loading"
                                >同意</el-button
                            >
                            <el-button @click="viewSend(3)" :loading="loaded"
                                >拒绝</el-button
                            >
                        </div> -->
                    </el-form>
                </div>
            </el-drawer>
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
            <el-drawer
                title="归档提示"
                :visible.sync="centerDialogVisible"
                direction="rtl"
                @close="cancelcd('backFormRef')"
                class="backTaskDialog"
            >
                <div style="padding: 0 20px">
                    <el-form
                        :model="backForm"
                        :rules="backTaskRule"
                        ref="backFormRef"
                        label-width="130px"
                    >
                        <el-form-item label="归档文件：" class="bfFiles">
                            <div class="uploadFiles">
                                <div>
                                    <span class="word" @click="addFiles()"
                                        >添加附件</span
                                    >
                                </div>
                                <div class="dingFilesClass">
                                    <div
                                        v-for="(
                                            item, index
                                        ) in backForm.enclosure"
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
                        </el-form-item>
                        <el-form-item label="归档位置：" prop="weizhi">
                            <el-input
                                v-model="backForm.weizhi"
                                placeholder="请输入归档位置，例如文件柜多少号"
                                maxlength="20"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="归档份数：" prop="fen">
                            <el-input-number
                                v-model="backForm.fen"
                                controls-position="right"
                                @change="numChange"
                                :min="1"
                            ></el-input-number>
                            <!-- <el-input
                                v-model="backForm.fen"
                                maxlength="20"
                            ></el-input> -->
                        </el-form-item>
                        <el-form-item label="归档备注：" prop="remark">
                            <el-input
                                type="textarea"
                                v-model="backForm.remark"
                                placeholder="请输入归档备注"
                                maxlength="200"
                            ></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelcd('backFormRef')"
                        >取 消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="closecd('backFormRef')"
                        :loading="loading"
                        >{{ loading ? '归档中 ...' : '归 档' }}</el-button
                    >
                </div>
            </el-drawer>
            <el-drawer
                title="归档内容"
                :visible.sync="watchDialogVisible"
                direction="rtl"
                class="backTaskDialog"
            >
                <div style="padding: 0 20px">
                    <el-form :model="viewBackForm" label-width="130px">
                        <el-form-item label="归档文件：" class="bfFiles">
                            <div class="uploadFiles">
                                <div class="dingFilesClass">
                                    <div
                                        v-for="(
                                            item, index
                                        ) in viewBackForm.guidangfile"
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
                                                <!-- <i
                                                    class="el-icon-error"
                                                    @click="deleteFiles(index)"
                                                ></i> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="归档位置：">
                            <div>{{ viewBackForm.guidangsite }}</div>
                        </el-form-item>
                        <el-form-item label="归档份数：">
                            <div>{{ viewBackForm.guidangnumber }}</div>
                        </el-form-item>
                        <el-form-item label="归档备注：">
                            <div>{{ viewBackForm.guidangremarks }}</div>
                        </el-form-item>
                        <el-form-item label="归档人：">
                            <div>{{ viewBackForm.gdname }}</div>
                        </el-form-item>
                    </el-form>
                </div>
            </el-drawer>
        </div>
    </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi';
import peoplePick from '../../components/complexPicker.vue';
export default {
    name: 'taskList',
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
            watchDialogVisible: false,
            backTaskRule: {
                weizhi: [
                    {
                        required: true,
                        message: '归档位置不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            backForm: {
                weizhi: '',
                fen: 1,
                enclosure: [],
                remark: ''
            },
            centerDialogVisible: false,
            taskcomment: '',
            viewAllVisible: false,
            viewSendVisible: false,
            loadTalk: false,
            loaded: false,
            sendRemark: '',
            innerDrawer: false,
            newDrawTitle: '',
            newDrawerVisible: false,
            deleteVisible: false,
            taskSignRule: {
                user: [
                    {
                        required: true,
                        message: '印章管理员不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '请选择用章类型',
                        trigger: ['blur', 'change']
                    }
                ],
                remark: [
                    {
                        required: true,
                        message: '请选择日期',
                        trigger: 'blur'
                    }
                ]
            },
            taskList: [],
            taskTmpList: [],
            drawerVisible: false,
            activeConIndex: 0,
            activeTaskIndex: 0,
            viewSignForm: {},
            viewBackForm: {},
            viewForm: {},
            searchForm: {
                name: '',
                starttime: '',
                endtime: '',
                type: '',
                typeName: '',
                status: ''
            },
            taskTypeList: [],
            total: '',
            pagesize: 10,
            currentPage: 1,
            tagsData: [],
            tagsPeopleData: [],
            signForm: {
                user: '',
                type: '',
                remark: ''
            },
            contractDrawerForm: {
                enclosure: [],
                starttime: '',
                stoptime: '',
                desc: ''
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
            loading: false,
            newTodoPeople: [],
            taskcomment: '', //评论内容
            loadTalk: false,
            deleteTId: '',
            talkList: [],
            dingAppor: [],
            dingCop: [],
            taskStatus: '0',
            taskStatusList: [
                { name: '全部', id: '6', num: '' },
                { name: '审批中', id: '1', num: '' },
                { name: '归档中', id: '4', num: '' },
                { name: '已完结', id: '5', num: '' },

                { name: '我创建的', id: '2', num: '' },
                { name: '抄送我的', id: '3', num: '' },
                { name: '待我审批', id: '7', num: '' },
                { name: '逾期', id: '8', num: '' }
            ],
            // taskStateList: [
            //     { name: '全部', id: 1, num: 0 },
            //     { name: '待执行任务', id: 2, num: 0 },
            //     { name: '我创建任务', id: 3, num: 0 },
            //     { name: '抄送我的', id: 4, num: 0 },
            //     { name: '已执行任务', id: 5, num: 0 }
            // ],
            typeId: 4,
            stateId: 1,
            selectEnclosure: [],
            backTaskId: ''
        };
    },
    methods: {
        getTmpList() {
            const _this = this;
            _this.$axios
                .post('/task/tmplist', {
                    status: 1,
                    type: 2,
                    tmpname: '',
                    corp_id: _this.$store.state.cid
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.taskTmpList = res.data.content.list;
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        numChange(value) {
            console.log(value);
        },
        //归档
        closecd(formName) {
            const _this = this;
            _this.loading = true;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.backForm.enclosure.length > 0) {
                        _this.$axios
                            .post('/task/approvalguidang', {
                                taskid: _this.backTaskId,
                                corp_id: _this.$store.state.cid,
                                userid: _this.$store.state.userInfo.uid,
                                xmid: _this.$store.state.projectInfo.pid,
                                guidangfile: _this.backForm.enclosure,
                                guidangsite: _this.backForm.weizhi,
                                guidangnumber: _this.backForm.fen,
                                guidangremarks: _this.backForm.remark,
                                gdname: _this.$store.state.userInfo.uname
                            })
                            .then((res) => {
                                if (res.data.code == 200) {
                                    _this.loading = false;
                                    _this.centerDialogVisible = false;
                                    _this.$refs[formName].resetFields();
                                    _this.backForm.enclosure = [];
                                    _this.getNum();
                                    _this.getTaskList();
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
                        _this.$notify({
                            title: '提示',
                            message: '请上传附件',
                            duration: 2000,
                            type: 'warning'
                        });
                    }
                } else {
                    _this.loading = false;
                    return false;
                }
            });
        },
        cancelcd(formName) {
            this.loading = false;
            this.centerDialogVisible = false;
            this.$refs[formName].resetFields();
            this.backForm.enclosure = [];
        },
        openViewAll() {
            this.viewAllVisible = true;
        },
        openViewSend() {
            this.viewSendVisible = true;
        },
        tableHeaderClass({ row, rowIndex }) {
            return 'font-weight:500;font-size: 15px;color:#272727;background-color:#f9f9f9;';
        },
        goBackFile() {
            this.innerDrawer = true;
        },
        typeClick(item, index) {
            this.activeConIndex = index;
            this.typeId = item.id;
            this.getTaskList();
        },
        stateClick(item, index) {
            this.activeTaskIndex = index;
            this.stateId = item.id;
        },
        //同意拒绝审批操作
        viewSend(status) {
            if (status == 2) {
                this.loading = true;
            } else if (status == 3) {
                this.loaded = true;
            }
            this.goDo(status);
        },
        goDo(status) {
            const _this = this;
            _this.$axios
                .post('/index.php/api/dfinance/financeIncomeDeal', {
                    id: _this.editTaskID,
                    status: status,
                    userid: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.code == 1) {
                        _this.drawerVisible = false;
                        _this.getNum();
                        _this.getTaskList();
                        if (status == 2) {
                            _this.loading = false;
                            _this.$message({
                                message: '已同意该审批',
                                type: 'success',
                                duration: '2000'
                            });
                        } else if (status == 3) {
                            _this.loaded = false;
                            _this.$message({
                                message: '已拒绝该审批',
                                type: 'success',
                                duration: '2000'
                            });
                        }
                    } else {
                        _this.loading = false;
                        _this.loaded = false;
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
                    console.log(error);
                });
        },
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
                .then((res) => {
                    if (res.data.status == 1) {
                        _this.$store.commit(
                            'setSpaceId',
                            res.data.spaceid.toString()
                        );
                        _this.talkPicClick();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        talkPicClick() {
            const _this = this;
            dd.ready(function () {
                dd.biz.util.uploadAttachment({
                    image: {
                        multiple: true,
                        compress: false,
                        max: 9,
                        spaceId: _this.$store.state.spaceId
                    },
                    types: ['photo'],
                    onSuccess: function (result) {
                        //result.data
                        _this.goTalkPic(result.data);
                    },
                    onFail: function (err) {
                        console.log('err++' + err);
                    }
                });
            });
            dd.error(function (err) {
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
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.$message.success('发表图片评论成功');
                        _this.getTalkList();
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
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
        // handleClose(tag) {
        //     this.tagsData.splice(this.tagsData.indexOf(tag), 1);
        //     this.contractDrawerForm.by1 = this.tagsData;
        // },
        // handleSendClose(tag) {
        //     this.tagsPeopleData.splice(this.tagsPeopleData.indexOf(tag), 1);
        //     this.contractDrawerForm.by2 = this.tagsPeopleData;
        // },
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
                        proname: _this.$store.state.projectInfo.pname,
                        corp_id: _this.$store.state.cid,
                        username: _this.$store.state.userInfo.uname,
                        user_id: _this.$store.state.userInfo.uid,
                        content: _this.taskcomment,
                        file: []
                    })
                    .then((res) => {
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
                    .catch(function (error) {
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
        typeChange(val) {
            if (val) {
                let obj = {};
                obj = this.taskTypeList.find(function (item) {
                    return item.id === val;
                });
                this.searchForm.typeName = obj.name;
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
        //打开选人覆盖层
        addManyP(type) {
            const that = this;
            // that.getReg();
            that.peopleType = type;
            // that.peoplePickVisible = true;
            that.pickerVisible = true;
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
                            _this.backForm.enclosure.push(item);
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
            this.backForm.enclosure.splice(index, 1);
        },
        //修改按钮
        goEditTask(row, column) {
            // item.viewPopo = false;
            const _this = this;
            if (column.label != '操作' && column.label != '归档内容') {
                if (row.status == '1') {
                    _this.editTaskID = row.id;
                    _this.getTaskInfo(row);
                } else if (row.status == '0') {
                    dd.ready(function () {
                        dd.biz.util.openSlidePanel({
                            url: row.filedata1, //打开侧边栏的url
                            title: '查看任务审批', //侧边栏顶部标题
                            onSuccess: function (result) {},
                            onFail: function () {
                                setTimeout(() => {
                                    _this.getNum();
                                }, 5000);
                            }
                        });
                    });
                    // }
                }
                if (_this.typeId == '3') {
                    _this.sendNumClick(row, 1);
                } else if (_this.typeId == '5') {
                    _this.sendNumClick(row, 2);
                }
            }
        },
        sendNumClick(row, type) {
            const _this = this;

            _this.$axios
                .post('/task/eliminate', {
                    id: row.id,
                    status: type
                })
                .then((res) => {
                    if (res.data.code == '200') {
                        _this.getNum();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        backRow(row) {
            this.backTaskId = row.id;
            this.centerDialogVisible = true;
        },
        watchRow(row) {
            const _this = this;
            _this.watchDialogVisible = true;

            _this.$axios
                .post('/task/taskgdfilelist', {
                    taskid: row.id
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.viewBackForm = res.data.content;
                        _this.watchDialogVisible = true;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getTalkList() {
            const _this = this;
            _this.$axios
                .post('/task/cotentlist', {
                    taskid: _this.editTaskID,
                    corp_id: _this.$store.state.cid,
                    user_id: _this.$store.state.userInfo.uid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (res.data.list) {
                            _this.talkList = res.data.list;
                        } else {
                            _this.talkList = [];
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //获取任务详情
        getTaskInfo(row) {
            const _this = this;
            _this.$axios
                .post('/task/taskdetails', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid,
                    id: row.id,
                    userid: _this.$store.state.userInfo.uid,
                    status: _this.typeId,
                    proname: _this.$store.state.projectInfo.pname
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.tagsData = res.data.list.by1;
                        _this.newTodoPeople = res.data.list.by1;
                        _this.taskStatus = res.data.list.taskstatus;
                        _this.tagsPeopleData = res.data.list.by2;
                        _this.contractDrawerForm = res.data.list;
                        _this.contractDrawerForm.enclosure = JSON.parse(
                            _this.contractDrawerForm.enclosure
                        );
                        _this.drawerVisible = true;
                        _this.getTalkList();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //关闭编辑按钮
        drawClose(formName) {
            this.drawerVisible = false;
            this.signForm.user = '';
            this.signForm.type = '';
            this.signForm.remark = '';
        },
        //编辑按钮
        closeDrawer(formName) {
            const _this = this;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (_this.contractDrawerForm.by1.length > 0) {
                        let newData = _this.contractDrawerForm;
                        newData.corp_id = _this.$store.state.cid;
                        newData.xmid = _this.$store.state.projectInfo.pid;
                        newData.userid = _this.$store.state.userInfo.uid;
                        newData.id = _this.editTaskID;
                        _this.$axios
                            .post('/task/taskupdate', newData)
                            .then((res) => {
                                if (res.data.status == '1') {
                                    _this.loading = false;
                                    _this.drawerVisible = false;
                                    _this.getTaskList();

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
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loading = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },
        taskFormat(row) {
            switch (row.taskstatus) {
                case '0':
                    return '审批中';
                    break;
                case '1':
                    return '归档中';
                    break;
                case '2':
                    return '已完结';
                    break;
                case '5':
                    return '已逾期';
                    break;
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
                        proname: _this.$store.state.projectInfo.pname,
                        userid: _this.$store.state.userInfo.uid,
                        id: _this.editTaskID,
                        status: type
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                            _this.drawerVisible = false;
                            _this.$message.success(res.data.msg);
                            _this.getTaskList();
                            _this.getNum();
                            // if (type == 1) {
                            //     _this
                            //         .$confirm('是否归档该任务?', '提示', {
                            //             confirmButtonText: '确定',
                            //             cancelButtonText: '取消',
                            //             type: 'warning'
                            //         })
                            //         .then(() => {
                            //             _this.taskBack();
                            //         })
                            //         .catch(() => {
                            //             _this.$message({
                            //                 type: 'info',
                            //                 message: '已取消归档',
                            //                 duration: 1500
                            //             });
                            //         });
                            // }
                        } else {
                            _this.$message.warning(res.data.msg);
                        }
                    })
                    .catch(function (error) {
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
                    proname: _this.$store.state.projectInfo.pname,
                    userid: _this.$store.state.userInfo.uid,
                    id: _this.editTaskID,
                    status: 3
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.getTaskList();
                        _this.$message.success('该任务已归档成功');
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
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
                        proname: _this.$store.state.projectInfo.pname,
                        userid: _this.newTodoPeople,
                        id: _this.editTaskID,
                        type: newType
                    })
                    .then((res) => {
                        if (res.data.status == '200') {
                            _this.drawerVisible = false;
                            _this.$message.success(res.data.msg);
                            _this.getTaskList();
                            _this.getNum();
                        } else {
                            _this.$message.warning(`${res.data.msg}`);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (type == 2) {
                newType = 1; //催办
                dd.ready(function () {
                    dd.biz.ding.create({
                        users: _this.tagsData, // 用户列表，工号
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

                        onSuccess: function () {},
                        onFail: function () {}
                    });
                });
                dd.error(function (err) {
                    _this.$alert('发钉+++' + err);
                });
            }
        },
        viewDraw() {
            this.drawerVisible = true;
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
        getTaskList() {
            const _this = this;
            _this.$axios
                .post('/task/approvallist', {
                    corp_id: _this.$store.state.cid,
                    status: _this.typeId,
                    starttime: _this.searchForm.starttime,
                    stoptime: _this.searchForm.endtime,
                    projectname: _this.$store.state.projectInfo.pname,
                    userid: _this.$store.state.userInfo.uid,
                    current_page: _this.currentPage,
                    admin: _this.$store.state.userInfo.admin,
                    sort: _this.searchForm.status,
                    tasktype: _this.searchForm.type
                })
                .then((res) => {
                    if (res.data.status == '200') {
                        _this.taskList = res.data.content.list;
                        _this.total = res.data.content.total;
                        if (_this.total > 0 && _this.taskList.length < 1) {
                            _this.currentPage = res.data.content.page;
                            _this.getTaskList();
                        }
                    } else if (res.data.status == '400') {
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
                        if (res.data.list.quanbutask == 0) {
                            res.data.list.quanbutask = '';
                        }
                        if (res.data.list.dzxtask == 0) {
                            res.data.list.dzxtask = '';
                        }
                        if (res.data.list.yzxtask == 0) {
                            res.data.list.yzxtask = '';
                        }
                        if (res.data.list.ygdtask == 0) {
                            res.data.list.ygdtask = '';
                        }
                        if (res.data.list.wcjtask == 0) {
                            res.data.list.wcjtask = '';
                        }
                        if (res.data.list.cstask == 0) {
                            res.data.list.cstask = '';
                        }
                        if (res.data.list.Papprovalnumber == 0) {
                            res.data.list.Papprovalnumber = '';
                        }
                        if (res.data.list.yuqi == 0) {
                            res.data.list.yuqi = '';
                        }
                        _this.taskStatusList[0].num = res.data.list.quanbutask;
                        _this.taskStatusList[1].num = res.data.list.dzxtask;
                        _this.taskStatusList[2].num = res.data.list.yzxtask;
                        // _this.taskStatusList[3].num = res.data.list.ygdtask;
                        // _this.taskStatusList[4].num = res.data.list.wcjtask;
                        _this.taskStatusList[5].num = res.data.list.cstask;
                        _this.taskStatusList[6].num =
                            res.data.list.Papprovalnumber;
                        _this.taskStatusList[7].num = res.data.list.yuqi;
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.getPRole();
        this.getTmpList();
    },
    created() {
        this.getNum();
        this.$utils.checkding();
        if (this.$route.query.status) {
            this.typeId = this.$route.query.status;
        } else {
            this.typeId = '6';
        }

        this.taskStatusList.forEach((item, index) => {
            if (item.id == this.typeId) {
                this.activeConIndex = index;
            }
        });
        // if (this.$route.query.id) {
        //     this.stateId = this.$route.query.id;
        // } else {
        //     this.stateId = 1;
        // }

        // this.taskStateList.forEach((item, index) => {
        //     if (item.id == this.stateId) {
        //         this.activeTaskIndex = index;
        //     }
        // });

        this.getTaskList();
    },
    computed: {
        projectData() {
            return this.$store.state.projectInfo;
        },
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
        searchStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.searchForm.endtime;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        searchEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.searchForm.starttime;
                    if (beginDateVal) {
                        return (
                            // time.getTime() < Date.now() - 8.64e7 ||
                            time.getTime() <
                            new Date(beginDateVal).getTime() - 8.64e7
                        );
                    }
                }
            };
        }
    },
    watch: {
        projectData: {
            handler(newVal, oldVal) {
                //你需要执行的代码
                if (oldVal) {
                    this.getNum();
                    this.getTaskList();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
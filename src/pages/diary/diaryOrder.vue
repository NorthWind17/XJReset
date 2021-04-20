<template>
    <div id="taskOrder">
        <div class="main">
            <div class="content">
                <div class="border">
                    <div class="borderAdd">
                        <el-button type="primary" plain @click="addNewTask"
                            >新建日志模板</el-button
                        >
                        <el-button type="primary" plain @click="addNewType"
                            >新建日志类型</el-button
                        >
                    </div>
                    <el-collapse v-model="activeNames">
                        <el-collapse-item
                            v-for="(item, index) in taskList"
                            :key="index"
                            :name="index"
                        >
                            <template slot="title">
                                {{ item.type.typename }}
                                <i
                                    class="header-icon el-icon-delete"
                                    style="margin-left:10px; color: #ec4848"
                                    v-if="item.type.del != 11"
                                    @click.stop.prevent="
                                        deleteTaskMould(item, 1)
                                    "
                                ></i>
                            </template>
                            <div class="content1">
                                <div
                                    class="piccontent"
                                    v-for="(typeChild, lindex) in item.lsit"
                                    :key="lindex"
                                    :class="
                                        typeChild.status == '2'
                                            ? 'actipiccontent'
                                            : ''
                                    "
                                >
                                    <div class="left">
                                        <img
                                            class="img"
                                            :src="typeChild.icon"
                                        />
                                        <el-popover
                                            placement="bottom"
                                            trigger="hover"
                                            popper-class="filesEditPo"
                                            width="100"
                                        >
                                            <div class="filesImgTableEdit">
                                                <el-button
                                                    type="text"
                                                    plain
                                                    v-if="
                                                        typeChild.corp_id !=
                                                        '11'
                                                    "
                                                    @click="editTask(typeChild)"
                                                    >编辑模板</el-button
                                                >
                                                <el-button
                                                    type="text"
                                                    plain
                                                    v-if="
                                                        typeChild.corp_id !=
                                                        '11'
                                                    "
                                                    @click="
                                                        deleteTaskMould(
                                                            typeChild,
                                                            2
                                                        )
                                                    "
                                                    >删除模板</el-button
                                                >
                                                <el-button
                                                    v-if="
                                                        typeChild.status == '2'
                                                    "
                                                    type="text"
                                                    plain
                                                    @click="
                                                        mouldEdit(1, typeChild)
                                                    "
                                                    >启用模板</el-button
                                                >
                                                <el-button
                                                    v-if="
                                                        typeChild.status == '0'
                                                    "
                                                    type="text"
                                                    plain
                                                    @click="
                                                        mouldEdit(2, typeChild)
                                                    "
                                                    >停用模板</el-button
                                                >
                                            </div>
                                            <span slot="reference">{{
                                                typeChild.tmpname
                                            }}</span>
                                        </el-popover>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <el-dialog
                title="新建日志类型"
                :visible.sync="newView"
                width="30%"
                @close="closeTaskType"
            >
                <el-form
                    ref="typeFormRef"
                    label-width="100px"
                    :label-position="labelPosition"
                    :model="addTypeForm"
                    :rules="typeFormRule"
                >
                    <el-form-item label="类型名称：" prop="name">
                        <el-input
                            v-model="addTypeForm.name"
                            maxlength="20"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button
                        type="primary"
                        :loading="loading"
                        @click="addNewTypeClick('typeFormRef')"
                        >确定</el-button
                    >
                    <el-button @click="closeTaskType">取消</el-button>
                </span>
            </el-dialog>
            <el-dialog
                :title="taskTitle"
                :visible.sync="newTaskView"
                width="80%"
                @close="closeTaskMould"
                class="newTaskClass"
            >
                <div class="header">
                    <el-form
                        ref="form"
                        :inline="true"
                        :label-position="labelPosition"
                        :model="addForm"
                    >
                        <el-form-item label="模板名称：">
                            <el-input
                                v-model="addForm.name"
                                @input.native="nameChange"
                                maxlength="10"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="日志类型：">
                            <el-select
                                v-model="addForm.type"
                                @change="taskTypeChange"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in taskTypeList"
                                    :key="item.id"
                                    :label="item.logtmpname"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="类型图标：">
                            <cupload
                                ref="myccchild"
                                :upImgList="upImgList2"
                                :licenceImg="licenceImg2"
                                :isShow="isShow2"
                                @listenToChildEvent="showUrl"
                            ></cupload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dndList">
                    <div class="dndList-list">
                        <draggable
                            :list="fixList"
                            :options="{
                                group: {
                                    name: falgs,
                                    pull: 'clone',
                                    put: false
                                },
                                sort: false
                            }"
                            @end="end"
                            :clone="cloneDog"
                            class="dragArea"
                        >
                            <div
                                v-for="element in fixList"
                                :key="element.id"
                                :class="{ undraggable: element.flag }"
                                class="list-complete-item"
                            >
                                <div class="list-complete-item-handle2">
                                    {{ element.name }}
                                </div>
                            </div>
                        </draggable>
                    </div>
                    <div class="dndList-list">
                        <draggable
                            :list="dragCloneList"
                            :options="{ group: 'article', disabled: disabled }"
                            @start="draStart"
                            @end="draEnd"
                            class="dragListArea"
                        >
                            <div
                                v-for="(element, index) in dragCloneList"
                                :key="index"
                                class="list-complete-item"
                                :class="
                                    element.id === activeDragId
                                        ? 'activeClass'
                                        : ''
                                "
                                @click="cloneListClick(element, index)"
                            >
                                <div class="list-complete-item-handle">
                                    {{ element.name }}
                                </div>
                                <div>
                                    <i
                                        class="el-icon-delete"
                                        @click="handleDel(index, element.id)"
                                    ></i>
                                </div>
                            </div>
                        </draggable>
                    </div>
                    <div class="dndList-list">
                        <div v-if="editShow">
                            <el-form
                                ref="form"
                                :label-position="labelPosition"
                                :model="editeForm"
                                label-width="80px"
                            >
                                <el-form-item label="标题">
                                    <el-input
                                        v-model="editeForm.name"
                                        @input.native="nameChange"
                                        maxlength="12"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="选项"
                                    v-if="
                                        editeForm.type == 'onecheck' ||
                                        editeForm.type == 'morecheck' ||
                                        editeForm.type == 'downselect'
                                    "
                                >
                                    <div
                                        v-for="(
                                            item, index
                                        ) in editeForm.select"
                                        class="selectListClass"
                                    >
                                        <el-input
                                            v-model="item.selectname"
                                            placeholder="请输入"
                                            maxlength="12"
                                        ></el-input>
                                    </div>

                                    <el-button type="primary" @click="addSelece"
                                        >添加选项</el-button
                                    >
                                </el-form-item>
                                <el-form-item label="校验">
                                    <el-checkbox v-model="editeForm.checked"
                                        >必填</el-checkbox
                                    >
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
                <div class="tijiao">
                    <el-button
                        type="primary"
                        :loading="loading"
                        @click="addMould"
                        >提交</el-button
                    >
                </div>
            </el-dialog>
            <el-drawer
                title="新建日志"
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
                        <!-- <el-form-item label="天气" prop="weather">
                            <el-input v-model="contractDrawerForm.weather" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item label="温度" prop="wendu">
                            <el-input v-model="contractDrawerForm.wendu" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item label="风力" prop="wind">
                            <el-input v-model="contractDrawerForm.wind" maxlength="20"></el-input>
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
                        <el-form-item label="日志名称" prop="logname">
                            <el-input
                                v-model="contractDrawerForm.logname"
                                maxlength="20"
                            ></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="地址" prop="weaid" style="width:100%">
                            <el-cascader
                                v-model="contractDrawerForm.weaid"
                                :options="cityOptions"
                                @change="handleChange"
                                style="width:100%"
                            ></el-cascader>
                        </el-form-item>-->
                        <el-form-item label="日期" prop="logspae1">
                            <el-date-picker
                                v-model="contractDrawerForm.logspae1"
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
                                <!-- <div class="spList">
                                    <div>
                                        <div>
                                            <span style="color:red;">* &nbsp;&nbsp;</span>待办人
                                        </div>
                                        <p>请选择待办人</p>
                                    </div>
                                    <div class="addManeger">
                                        <div class="addMList" v-if="tagsData.length>3">
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
                                            v-for="(item,index) in tagsData.slice(0,3)"
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
                                                    >{{item.name.length<=2?item.name:item.name.substr(item.name.length-2,2)}}</span>
                                                </div>
                                                <p>{{item.name}}</p>
                                                <i
                                                    class="el-icon-error"
                                                    @click="handleClose(item,index)"
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
                                </div>-->
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
            <!-- <el-dialog
                title="全部待办人员"
                :append-to-body="true"
                :visible.sync="AllPeopleVisible"
                class="contractOpenPeopleDialog"
                :close-on-click-modal="false"
            >
                <div style="margin-bottom:10px;">共有{{tagsData.length}}人</div>
                <div class="showAllPeople">
                    <div class="addMList" v-for="(item,index) in tagsData" :key="index">
                        <div class="mdnList">
                            <div class="mdren">
                                <img v-if="item.avatar" :src="item.avatar" alt />
                                <span
                                    class="touxiang"
                                    v-else
                                >{{item.name.length<=2?item.name:item.name.substr(item.name.length-2,2)}}</span>
                            </div>
                            <p>{{item.name}}</p>
                            <i class="el-icon-error" @click="handleClose(item)"></i>
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
            </el-dialog>-->
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
            <el-dialog
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
            </el-dialog>
        </div>
    </div>
</template>
<script>
import citydata from '../../components/weatherCity.json';
import * as dd from 'dingtalk-jsapi';
import draggable from 'vuedraggable';
import supload from '../../components/dingUpload';
import cupload from '../../components/corpUpload';
export default {
    name: 'diaryOrder',
    components: { supload, draggable, cupload },
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
            deleteVisible: false,
            typeFormRule: {
                name: [
                    {
                        required: true,
                        message: '名称不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            taskRule: {
                logname: [
                    {
                        required: true,
                        message: '日志名称不能为空',
                        trigger: 'blur'
                    }
                ],
                logspae1: [
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
            todayToDo: 0,
            tasksOverdue: 0,
            todayFinished: 0,
            InitiatedTask: 0,
            addTypeForm: { name: '' },
            activeNames: [],
            newView: false,
            newName: '',
            addForm: {
                name: '',
                type: '',
                typeName: '',
                url:
                    'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnZXQ26B841600655714494.png'
            },
            fixList: [
                { id: 1, name: '单行输入框', checked: false, type: 'oneline' },
                { id: 2, name: '多行输入框', checked: false, type: 'moreline' },
                {
                    id: 3,
                    name: '数字输入框',
                    checked: false,
                    type: 'numbertext'
                },
                // {
                //     id: 5,
                //     name: '多选框',
                //     checked: false,
                //     select: [{ selectname: '' }],
                //     type: 'morecheck'
                // },

                {
                    id: 6,
                    name: '下拉框',
                    checked: false,
                    select: [{ selectname: '' }],
                    type: 'downselect'
                },
                { id: 7, name: '日期', checked: false, type: 'datetime' }
            ],
            Num: new Date().getTime(),
            disabled: false,
            editShow: false,
            dragCloneList: [],
            editeForm: {
                name: '',
                checked: false,
                select: [{ selectname: '' }]
            },
            activeDragId: -1,
            falgs: 'article',
            activeDragIndex: 0,
            taskList: [],
            cwListName: '待我审批',
            scheduleNumber: this.$store.state.projectInfo.pperctentage,
            schedule: this.$store.state.projectInfo.ptag,
            taskPName: '',
            total: '', //默认数据总数
            pagesize: 5, //每页的数据条数
            currentPage: 1, //默认开始页面
            cwList: [],
            pHurl: require('@/assets/checklist/sgdw.png'),

            drawerVisible: false,
            activeConIndex: 0,
            contractForm: {
                keyWord: '',
                starttime: '',
                endtime: ''
            },
            projectList: [],
            selectTypeList: [],
            tagsData: [],
            tagsPeopleData: [],
            contractDrawerForm: {
                user_id: this.$store.state.userInfo.uid,
                corp_id: this.$store.state.cid,
                name: this.$store.state.userInfo.uname,
                proname: this.$store.state.projectInfo.pname,
                xmid: this.$store.state.projectInfo.pid,
                logspae1: '',
                enclosure: [],
                kjpersonnel: [],
                logtype: '',
                logtypeid: '',
                logname: '',
                wind: { a: '', b: '' },
                weather: { a: '', b: '' },
                wendu: { a: '', b: '' },
                // weaid: [],
                logspare2: {}
            },
            AllPeopleVisible: false,
            AllSendPeopleVisible: false,
            loading: false,
            agentid: '',
            dingPicList: [],
            upImgList: [],
            licenceImg: [],
            isShow: ['1'],
            typeId: '1', //切换类型
            viewCorpPicture: this.$store.state.projectInfo.purl,
            cpUrl: require('@/assets/checklist/sgdw.png'),
            newTaskView: false,
            upImgList2: '',
            licenceImg2: '',
            isShow2: ['1'],
            taskTypeList: [],
            mouldType: 1,
            mouldDemoId: '',
            newTaskDemoList: [],
            pDefaultProps: {
                id: 'emplId',
                label: 'name',
                children: 'user',
                isLeaf: 'leaf'
            },
            pTreeData: [],
            peoplePickVisible: false,
            peopleType: 0,
            taskMouldID: '',
            cityOptions: [],
            taskTitle: '新建日志模板',
            newID: '',
            newTID: ''
        };
    },
    methods: {
        mouldEdit(type, item) {
            const _this = this;
            let newStatus = 1;
            if (type == 1) {
                newStatus = 2;
            } else if (type == 2) {
                newStatus = 1;
            }
            _this.$axios
                .post('/task/logtmpStartstop', {
                    xmid: _this.$store.state.projectInfo.pid,
                    corp_id: _this.$store.state.cid,
                    status: newStatus,
                    logtmpid: item.id
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.$message.success(res.data.msg);
                        _this.getList();
                    } else {
                        _this.$message.warning(res.data.msg);
                    }
                });
        },
        //天气地址选择
        handleChange(val) {
            this.contractDrawerForm.weaid = val;
        },
        //数组对象去重
        unique(arr) {
            const res = new Map();
            return arr.filter(
                (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
            );
        },
        dedupe(array) {
            return Array.from(new Set(array));
        },
        closePicker() {
            this.peoplePickVisible = false;
            this.$refs.ptree.setCheckedKeys([]);
        },
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
                    _this.contractDrawerForm.kjpersonnel.push(item);
                });
                _this.tagsPeopleData = _this.unique(_this.tagsPeopleData);
                _this.contractDrawerForm.kjpersonnel = _this.dedupe(
                    _this.contractDrawerForm.kjpersonnel
                );
            }
            _this.peoplePickVisible = false;
        },
        getReg() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectUserList', {
                    xmid: _this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code === 200) {
                        _this.pTreeData = res.data.content;
                    }
                });
        },
        newAddTask(item) {
            let newTime = new Date().getTime();
            this.taskMouldID = item.id;
            this.contractDrawerForm.logspae1 = this.$utils.formateTime(newTime);
            this.contractDrawerForm.enclosure = [];
            this.contractDrawerForm.weather.a = '';
            this.contractDrawerForm.weather.b = '';
            this.contractDrawerForm.wendu.a = '';
            this.contractDrawerForm.wendu.b = '';
            this.contractDrawerForm.wind.a = '';
            this.contractDrawerForm.wind.b = '';
            this.getMouldInfo(item, 1);
        },
        taskTypeChange(val) {
            let obj = {};
            obj = this.taskTypeList.find(function (item) {
                return item.id === val;
            });
            this.addForm.typeName = obj.logtmpname;
        },
        //编辑日志模板
        editTask(item) {
            this.editShow = false;
            this.licenceImg2 = item.icon;
            this.editeForm = {};
            this.mouldType = 2;
            this.mouldDemoId = item.id;
            this.taskTitle = '编辑日志模板';
            this.getMouldInfo(item, 2);
            this.newTaskView = true;
        },
        //获取模板详情
        getMouldInfo(item, type) {
            const _this = this;
            _this.$axios
                .post('/task/tmpedit', {
                    type: 1,
                    logtmp_id: item.id
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        let newData = res.data.list;
                        if (type == 2) {
                            _this.addForm.name = newData.tmpname;
                            _this.addForm.type = newData.tmptypeid;
                            _this.addForm.typeName = newData.tmptypename;
                            _this.addForm.url = newData.icon;
                            _this.dragCloneList = newData.tmpdate;
                        } else if (type == 1) {
                            //动态添加属性
                            let newJson = {};
                            newData.tmpdate.forEach((item) => {
                                let newKey = item.title;

                                newJson[newKey] = '';
                            });
                            _this.$set(
                                _this.contractDrawerForm,
                                'logspare2',
                                newJson
                            );
                            _this.contractDrawerForm.logtypeid =
                                _this.taskMouldID;
                            _this.contractDrawerForm.logtype = item.tmpname;

                            _this.newTaskDemoList = newData.tmpdate;
                            _this.drawerVisible = true;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //删除模板
        deleteClick() {
            const _this = this;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$axios
                .post('/task/logtmpdel', {
                    corp_id: _this.$store.state.cid,
                    userid: _this.$store.state.userInfo.uid,
                    xmid: _this.$store.state.projectInfo.pid,
                    logtmp_id: _this.newTID,
                    id: _this.newID
                })
                .then((res) => {
                    _this.loading = false;
                    if (res.data.code == 200) {
                        _this.deleteVisible = false;
                        _this.getList();
                        _this.getTaskTypeList();
                        _this.$message.success('删除成功');
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
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
        //删除日志类型覆盖层
        deleteTaskMould(item, stype) {
            const _this = this;
            let newArr = [];
            if (stype == 1) {
                if (item.lsit.length > 0) {
                    newArr = item.lsit.map((item) => {
                        if (!item.id) return '';
                        return item.id;
                    });
                    _this.newID = newArr.toString();
                } else {
                    _this.newID = '';
                }
                _this.newTID = item.type.logtmp_id;
            } else if (stype == 2) {
                _this.newTID = '';
                _this.newID = item.id;
            }
            _this.deleteVisible = true;
        },
        showUrl(url) {
            this.addForm.url = url;
        },
        closeTaskType() {
            this.addTypeForm.name = '';
            this.newView = false;
        },
        //新建日志类型
        addNewTypeClick(formName) {
            const _this = this;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post('/task/addlogtype', {
                            corp_id: _this.$store.state.cid,
                            userid: _this.$store.state.userInfo.uid,
                            xmid: _this.$store.state.projectInfo.pid,
                            logtmpname: _this.addTypeForm.name
                        })
                        .then((res) => {
                            _this.loading = false;
                            if (res.data.code == 200) {
                                _this.loading = false;
                                _this.newView = false;
                                _this.getList();
                                _this.getTaskTypeList();
                                _this.addTypeForm.name = '';
                                _this.$message.success('新建日志类型成功');
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
                        });
                } else {
                    _this.loading = false;
                    return false;
                }
            });
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loading = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },
        closeTaskMould() {
            this.newTaskView = false;
        },
        addSelece() {
            this.editeForm.select.push({
                selectname: ''
            });
        },
        //新建，编辑模板
        addMould() {
            const _this = this;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            if (_this.addForm.name) {
                if (_this.addForm.type) {
                    if (_this.mouldType == 1) {
                        _this.$axios
                            .post('/task/addlogtmp', {
                                corp_id: _this.$store.state.cid,
                                logtypeid: _this.addForm.type,
                                logtmpname: _this.addForm.typeName,
                                icon: _this.addForm.url,
                                user_id: _this.$store.state.userInfo.uid,
                                tmpdate: _this.dragCloneList,
                                xmid: _this.$store.state.projectInfo.pid,
                                tmpname: _this.addForm.name
                            })
                            .then((res) => {
                                _this.loading = false;
                                if (res.data.code == 200) {
                                    _this.getList();
                                    _this.getTaskTypeList();
                                    _this.loading = false;
                                    _this.newTaskView = false;
                                    _this.$message({
                                        message: '添加模板成功',
                                        type: 'success',
                                        duration: '2000'
                                    });
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
                                _this.loading = false;
                                console.log(error);
                            });
                    } else if (_this.mouldType == 2) {
                        _this.$axios
                            .post('/task/tmpedit', {
                                logtmp_id: _this.mouldDemoId,
                                type: 2,
                                tmptypeid: _this.addForm.type,
                                tmptypename: _this.addForm.typeName,
                                icon: _this.addForm.url,
                                user_id: _this.$store.state.userInfo.uid,
                                xmid: _this.$store.state.projectInfo.pid,
                                tmpdate: _this.dragCloneList,
                                tmpedit: _this.addForm.name
                            })
                            .then((res) => {
                                if (res.data.code == '200') {
                                    _this.getList();
                                    _this.getTaskTypeList();
                                    _this.loading = false;
                                    _this.newTaskView = false;
                                    _this.$message({
                                        message: '修改模板成功',
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
                    }
                } else {
                    _this.loading = false;
                    _this.$message.warning('请选择日志类型');
                }
            } else {
                _this.loading = false;
                _this.$message.warning('请输入模板名称');
            }
            // } else if (_this.$store.state.projectInfo.pstatus == '2') {
            //     _this.loading = false;
            //     _this.$message.warning('归档项目不可操作！');
            // }
        },
        nameChange() {
            this.dragCloneList.forEach((item) => {
                if (item.id == this.activeDragId) {
                    item.name = this.editeForm.name;
                }
            });
        },
        //点击复制
        cloneListClick(item, index) {
            this.activeDragId = item.id;
            this.editShow = true;
            this.editeForm = item;
        },
        cloneDog({ id, name, type }) {
            const that = this;
            // for (let i = 0; i < 6; i++) {
            //     that.Num += Math.floor(Math.random() * 10);
            // }
            that.Num = new Date().getTime();
            if (id == 6 || id == 4 || id == 5) {
                return {
                    id: that.Num,
                    name: name,
                    checked: false,
                    type: type,
                    select: [{ selectname: '' }]
                };
            } else {
                return {
                    id: that.Num,
                    name: name,
                    type: type,
                    checked: false
                };
            }
        },
        end(ev) {
            if (ev.to.className === 'dragListArea') {
                this.$set(this.fixList[ev.oldIndex], 'flag', true);
            }
        },
        draStart(event) {
            this.falgs = '222222';
        },
        draEnd(ev) {
            this.falgs = 'article';
        },
        handleDel(index, id) {
            this.dragCloneList.splice(index, 1);
            let q = this.fixList.find((value, index, arr) => {
                return value.id === id;
            });
            this.$set(q, 'flag', false);
        },
        addNewType() {
            this.newView = true;
        },
        //新建日志模板
        addNewTask() {
            this.addForm.name = '';
            this.addForm.type = '';
            this.addForm.typeName = '';
            this.dragCloneList = [];
            this.editShow = false;
            this.editeForm = {};
            this.mouldType = 1;
            this.taskTitle = '新建日志模板';
            this.newTaskView = true;
        },
        drawClose(formName) {
            this.drawerVisible = false;
            this.contractDrawerForm.logname = '';
            this.contractDrawerForm.logspae1 = '';
            this.contractDrawerForm.kjpersonnel = [];
            // this.contractDrawerForm.weaid = [];
            this.tagsPeopleData = [];
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getList();
        },
        //新建日志
        closeDrawer(formName) {
            const _this = this;
            _this.loading = true;
            // if (_this.$store.state.projectInfo.pstatus == '1') {
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    // if (this.contractDrawerForm.todostaff.length > 0) {
                    let newData = _this.contractDrawerForm;
                    newData.kjpersonnel = newData.kjpersonnel.toString();
                    newData.logtypeid = _this.taskMouldID;
                    newData.userid = _this.$store.state.userInfo.uid;
                    newData.xmid = _this.$store.state.projectInfo.pid;
                    _this.$axios
                        .post('/task/Addlog', newData)
                        .then((res) => {
                            _this.loading = false;
                            if (res.data.code == 200) {
                                _this.loading = false;
                                _this.drawerVisible = false;
                                _this.getList();

                                _this.$refs[formName].resetFields();
                                _this.contractDrawerForm.todostaff = [];
                                _this.contractDrawerForm.kjpersonnel = [];
                                _this.tagsPeopleData = [];
                                _this.$message({
                                    message: '新建日志成功',
                                    type: 'success',
                                    duration: '2000'
                                });
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
                            _this.loading = false;
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
        show(msg) {
            this.contractDrawerForm.images = msg;
        },
        openAllPeople() {
            this.AllPeopleVisible = true;
        },
        openSendPeople() {
            this.AllSendPeopleVisible = true;
        },
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.contractDrawerForm.todostaff = this.tagsData.map((item) => {
                if (!item.emplId) return '';
                return item.emplId;
            });
        },
        handleSendClose(tag) {
            this.tagsPeopleData.splice(this.tagsPeopleData.indexOf(tag), 1);
            this.contractDrawerForm.kjpersonnel = this.tagsPeopleData.map(
                (item) => {
                    if (!item.emplId) return '';
                    return item.emplId;
                }
            );
        },
        //获取日志类型列表
        getTaskTypeList() {
            this.$axios
                .post('/task/logtypelist', {
                    corp_id: this.$store.state.cid,
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
            that.getReg();
            that.peopleType = type;
            that.peoplePickVisible = true;
        },
        //获取列表
        getList() {
            const _this = this;
            _this.$axios
                .post('/task/edittemplate', {
                    corp_id: _this.$store.state.cid,
                    xmid: _this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        _this.activeNames = [];

                        if (res.data.comtent) {
                            for (let i = 0; i < res.data.comtent.length; i++) {
                                _this.activeNames.push(i);
                            }
                            _this.taskList = res.data.comtent;
                        } else {
                            _this.taskList = [];
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
                        let newData = res.data.list;
                        _this.todayToDo = newData.jrdb;
                        _this.tasksOverdue = newData.yqrw;
                        _this.todayFinished = newData.jrwc;
                        _this.InitiatedTask = newData.mefqtask;
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
        this.$utils.checkding();
        this.getPRole();
    },
    created() {
        this.cityOptions = citydata;
        // this.viewCorpPicture = this.$store.state.projectInfo.purl;
        // this.taskPName = this.$store.state.projectInfo.pname;
        this.contractDrawerForm.type = '1';
        this.getList();
        this.getTaskTypeList();
        // this.getInfo();
        this.getReg();
    },
    computed: {
        projectData() {
            return this.$store.state.projectInfo;
        },
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
        }
    },
    watch: {
        projectData: {
            handler(newVal, oldVal) {
                //你需要执行的代码
                if (oldVal) {
                    // this.viewCorpPicture = newVal.purl;
                    // this.taskPName = newVal.pname;
                    // this.scheduleNumber = newVal.pperctentage;
                    // this.schedule = newVal.ptag;
                    // this.getInfo();
                    this.getList();
                    this.getTaskTypeList();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
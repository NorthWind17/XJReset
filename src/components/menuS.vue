<template>
    <div class="menuS">
        <div class="cebian">
            <div
                class="menuProject"
                @click="addNewProject"
                v-if="viewMenu == 1"
            >
                <img src="../assets/project/add.jpg" alt /> 创建项目
                <div class="mpTips" v-if="tipView">
                    点击此处创建项目
                    <i class="el-icon-caret-left"></i>
                </div>
            </div>
            <el-menu
                class="el-menu-vertical-demo lwmenu"
                @open="handleOpen"
                mode="vertical"
                @close="menuClose"
                background-color="#3296fa"
                text-color="#fff"
                active-text-color="#ffd04b"
                :unique-opened="uopen"
                :collapse-transition="ctran"
                :router="true"
                :default-active="routhPath"
            >
                <div
                    v-for="item in menuList"
                    :index="item.path"
                    :key="item.path"
                >
                    <el-submenu v-if="item.chlid" :index="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item
                                v-for="list in item.chlid"
                                :index="list.path"
                                :key="list.path"
                                >{{ list.name }}</el-menu-item
                            >
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-else :index="item.path">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                        <span
                            v-if="item.num != 0 && item.num < 100"
                            class="mensViewNum"
                            >{{ item.num }}</span
                        >
                        <span
                            v-if="item.num != 0 && item.num > 99"
                            class="mensViewNum"
                            >99</span
                        >
                    </el-menu-item>
                </div>
            </el-menu>
        </div>
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
            @close="drawClose('addFormRef')"
            class="meNewPro"
        >
            <div>
                <el-form
                    :model="addForm"
                    ref="addFormRef"
                    :rules="addFormRules"
                    label-width="130px"
                    :label-position="labelPosition"
                >
                    <el-tabs
                        :tab-position="tabPosition"
                        v-model="activeName"
                        style="height: 600px"
                    >
                        <el-tab-pane
                            label="基本信息"
                            name="basic"
                            class="basicInfo"
                        >
                            <el-form-item
                                label="项目名称"
                                prop="name"
                                class="addPhoto"
                            >
                                <el-input
                                    v-model="addForm.name"
                                    maxlength="50"
                                    placeholder="请输入项目名称"
                                ></el-input>
                                <div class="touPic">
                                    <supload
                                        ref="mychild"
                                        :upImgList="upImgList"
                                        :licenceImg="licenceImg"
                                        :isShow="isShow"
                                        @listenToChildEvent="showUrl"
                                    ></supload>
                                </div>
                            </el-form-item>
                            <el-form-item label="项目简称" prop="pcontent">
                                <el-input
                                    v-model="addForm.pcontent"
                                    maxlength="10"
                                    placeholder="请输入项目简称"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="开工时间" prop="xmstart">
                                <el-date-picker
                                    v-model="addForm.xmstart"
                                    :picker-options="pickerStart"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="竣工时间" prop="xmstop">
                                <el-date-picker
                                    v-model="addForm.xmstop"
                                    :picker-options="pickerEnd"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="负责人电话" prop="phone">
                                <el-input
                                    v-model="addForm.phone"
                                    placeholder="请输入电话号码"
                                    maxlength="11"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="项目状态" prop="beian">
                                <el-select
                                    style="width: 100%"
                                    v-model="addForm.beian"
                                    placeholder="请选择状态"
                                >
                                    <el-option
                                        v-for="(item, index) in statusOptions"
                                        :key="index"
                                        :label="item"
                                        :value="item"
                                    >
                                    </el-option>
                                </el-select>
                                <!-- <el-input
                                    v-model="addForm.beian"
                                    maxlength="50"
                                    placeholder="请输入备案号"
                                ></el-input> -->
                            </el-form-item>

                            <el-form-item
                                label="项目金额（万元）"
                                prop="xmmoney"
                            >
                                <el-input
                                    v-model="addForm.xmmoney"
                                    maxlength="10"
                                    placeholder="请输入项目金额"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="项目地址" prop="city">
                                <el-cascader
                                    :options="options"
                                    @change="addressChange"
                                    style="width: 300px"
                                    :placeholder="projectAddress"
                                    :clearable="true"
                                    v-model="addForm.city"
                                ></el-cascader>
                            </el-form-item>
                            <el-form-item label="详细地址" prop="xmaddress">
                                <el-input
                                    type="textarea"
                                    v-model="addForm.xmaddress"
                                    placeholder="请输入详细地址"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="项目简介" prop="xmcontent">
                                <el-input
                                    type="textarea"
                                    v-model="addForm.xmcontent"
                                    placeholder="请输入项目简介"
                                ></el-input>
                            </el-form-item>
                            <div class="typeTitle">
                                <div>分类标签</div>
                                <div class="tagTitle">
                                    <el-tag
                                        :key="tag"
                                        v-for="tag in xmbiaoqian"
                                        closable
                                        :disable-transitions="false"
                                        @close="tagClose(tag)"
                                        >{{ tag }}</el-tag
                                    >
                                    <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible"
                                        v-model="inputValue"
                                        ref="saveTagInput"
                                        size="small"
                                        @keyup.enter.native="handleInputConfirm"
                                        @blur="handleInputConfirm"
                                    ></el-input>
                                    <el-button
                                        v-else
                                        class="button-new-tag"
                                        size="small"
                                        @click="showInput"
                                        >+ 添加</el-button
                                    >
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="成员管理" name="chengyuan">
                            <el-tabs
                                v-model="activeUser"
                                @tab-click="handleClick"
                            >
                                <el-tab-pane :label="isBen" name="aufirst"
                                    ><el-form-item
                                        label="项目负责人"
                                        prop="puserid"
                                    >
                                        <div
                                            @click="addSingP"
                                            class="userClass"
                                        >
                                            <div class="puserClass">
                                                <div class="mdren">
                                                    <img
                                                        v-if="addForm.purl"
                                                        :src="addForm.purl"
                                                        alt
                                                    />
                                                    <span
                                                        class="touxiang"
                                                        v-else
                                                        >{{
                                                            addForm.puseridname
                                                                .length <= 2
                                                                ? addForm.puseridname
                                                                : addForm.puseridname.substr(
                                                                      addForm
                                                                          .puseridname
                                                                          .length -
                                                                          2,
                                                                      2
                                                                  )
                                                        }}</span
                                                    >
                                                </div>
                                                <p>{{ addForm.puseridname }}</p>
                                            </div>
                                        </div>
                                    </el-form-item>
                                    <el-form-item
                                        label="项目管理员"
                                        class="mensPeople"
                                    >
                                        <div class="addManeger">
                                            <div
                                                class="addMList"
                                                v-if="tagsData.length > 3"
                                            >
                                                <div class="mdnList">
                                                    <div
                                                        class="mdren"
                                                        @click="
                                                            openAllPeople(1)
                                                        "
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
                                                                item.name
                                                                    .length <= 2
                                                                    ? item.name
                                                                    : item.name.substr(
                                                                          item
                                                                              .name
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
                                                            manageClose(
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
                                    </el-form-item>
                                    <el-form-item
                                        label="项目成员"
                                        prop="xmpeople"
                                        class="mensPeople"
                                    >
                                        <div class="addManeger">
                                            <div
                                                class="addMList"
                                                v-if="tagsPeopleData.length > 3"
                                            >
                                                <div class="mdnList">
                                                    <div
                                                        class="mdren"
                                                        @click="
                                                            openAllPeople(2)
                                                        "
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
                                                                item.name
                                                                    .length <= 2
                                                                    ? item.name
                                                                    : item.name.substr(
                                                                          item
                                                                              .name
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
                                                            peopleClose(
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
                                        </div> </el-form-item
                                ></el-tab-pane>
                                <!-- <el-tab-pane
                                    label="外部参建企业人员管理"
                                    name="ausecond"
                                    v-if="btnType == 2"
                                >
                                    <div class="cjuTable">
                                        <div class="cjSearch">
                                            <el-input
                                                v-model="cjSname"
                                                placeholder="请输入姓名"
                                            ></el-input>
                                            <div class="cjTypeClass">
                                                <div>单位类型：</div>
                                                <el-select
                                                    v-model="cjStype"
                                                    clearable
                                                    placeholder="请选择单位类型"
                                                >
                                                    <el-option
                                                        label="施工总承包单位"
                                                        value="施工总承包单位"
                                                    ></el-option>
                                                    <el-option
                                                        label="专业分包单位"
                                                        value="专业分包单位"
                                                    ></el-option>
                                                    <el-option
                                                        label="建设单位"
                                                        value="建设单位"
                                                    ></el-option>
                                                    <el-option
                                                        label="勘察单位"
                                                        value="勘察单位"
                                                    ></el-option>
                                                    <el-option
                                                        label="设计单位"
                                                        value="设计单位"
                                                    ></el-option>
                                                    <el-option
                                                        label="监理单位"
                                                        value="监理单位"
                                                    ></el-option>
                                                    <el-option
                                                        label="咨询单位"
                                                        value="咨询单位"
                                                    ></el-option>
                                                    
                                                </el-select>
                                            </div>
                                            <el-button type="primary"
                                            plain
                                            @click="searchClick"
                                                >搜索</el-button
                                            >
                                        </div>
                                        <el-table
                                            :data="tableData"
                                            height="350"
                                            highlight-current-row
                                            style="width: 100%"
                                        >
                                            <el-table-column
                                                type="index"
                                                label="序号"
                                                width="50"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                prop="name"
                                                label="姓名"
                                                width="100"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                prop="corpname"
                                                label="企业名称"
                                                show-overflow-tooltip="true"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                prop="danweitype"
                                                label="单位类型"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                prop="type"
                                                label="人员权限"
                                                :formatter="typeFort"
                                            ></el-table-column
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label="操作"
                                                align="center"
                                                width="80"
                                            >
                                                <template slot-scope="scope">
                                                    <el-popover
                                                        placement="bottom"
                                                        trigger="click"
                                                        width="120"
                                                        popper-class="cjuserEditPo"
                                                        v-model="
                                                            scope.row.btnVisible
                                                        "
                                                    >
                                                        <div
                                                            class="filesImgTableEdit"
                                                        >
                                                            
                                                            <el-button
                                                                type="text"
                                                                @click="
                                                                    setPeople(
                                                                        1,
                                                                        scope.row
                                                                    )
                                                                "
                                                                >设置为项目管理员</el-button
                                                            >
                                                            <el-button
                                                                type="text"
                                                                @click="
                                                                    setPeople(
                                                                        2,
                                                                        scope.row
                                                                    )
                                                                "
                                                                >设置为项目成员</el-button
                                                            >
                                                        </div>
                                                        <el-button
                                                            type="text"
                                                            slot="reference"
                                                            icon="el-icon-more"
                                                        ></el-button>
                                                    </el-popover>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-tab-pane> -->
                                <!-- <el-tab-pane
                                    label="企业邀请管理"
                                    name="authird"
                                >
                                    <div class="qymanage">
                                        <div class="cjcorp">
                                            <div>施工总承包单位：</div>
                                            <div
                                                class="cjjs"
                                                v-for="(item, index) in addForm
                                                    .corplist.zb"
                                                :key="index"
                                            >
                                                <div>
                                                    <span style="color: #409eff"
                                                        >单位{{
                                                            index + 1
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        公司ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.a"
                                                    ></el-input>
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        用户ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.b"
                                                    ></el-input>
                                                </div>
                                            </div>
                                            <el-button
                                                type="primary"
                                                plain
                                                @click="addNewCj(1)"
                                                >增加单位</el-button
                                            >
                                        </div>
                                        <div class="cjcorp">
                                            <div>专业分包单位：</div>
                                            <div
                                                class="cjjs"
                                                v-for="(item, index) in addForm
                                                    .corplist.zf"
                                                :key="index"
                                            >
                                                <div>
                                                    <span style="color: #409eff"
                                                        >单位{{
                                                            index + 1
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        公司ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.a"
                                                    ></el-input>
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        用户ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.b"
                                                    ></el-input>
                                                </div>
                                            </div>
                                            <el-button
                                                type="primary"
                                                plain
                                                @click="addNewCj(6)"
                                                >增加单位</el-button
                                            >
                                        </div>
                                        <div class="cjcorp">
                                            <div>建设单位：</div>
                                            <div
                                                class="cjjs"
                                                v-for="(item, index) in addForm
                                                    .corplist.js"
                                                :key="index"
                                            >
                                                <div>
                                                    <span style="color: #409eff"
                                                        >单位{{
                                                            index + 1
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        公司ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.a"
                                                    ></el-input>
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        用户ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.b"
                                                    ></el-input>
                                                </div>
                                            </div>
                                            <el-button
                                                type="primary"
                                                plain
                                                @click="addNewCj(2)"
                                                >增加单位</el-button
                                            >
                                        </div>
                                        <div class="cjcorp">
                                            <div>勘察单位：</div>
                                            <div
                                                class="cjjs"
                                                v-for="(item, index) in addForm
                                                    .corplist.kc"
                                                :key="index"
                                            >
                                                <div>
                                                    <span style="color: #409eff"
                                                        >单位{{
                                                            index + 1
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        公司ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.a"
                                                    ></el-input>
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        用户ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.b"
                                                    ></el-input>
                                                </div>
                                            </div>
                                            <el-button
                                                type="primary"
                                                plain
                                                @click="addNewCj(3)"
                                                >增加单位</el-button
                                            >
                                        </div>
                                        <div class="cjcorp">
                                            <div>设计单位：</div>
                                            <div
                                                class="cjjs"
                                                v-for="(item, index) in addForm
                                                    .corplist.sj"
                                                :key="index"
                                            >
                                                <div>
                                                    <span style="color: #409eff"
                                                        >单位{{
                                                            index + 1
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        公司ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.a"
                                                    ></el-input>
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        用户ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.b"
                                                    ></el-input>
                                                </div>
                                            </div>
                                            <el-button
                                                type="primary"
                                                plain
                                                @click="addNewCj(4)"
                                                >增加单位</el-button
                                            >
                                        </div>
                                        <div class="cjcorp">
                                            <div>监理单位：</div>
                                            <div
                                                class="cjjs"
                                                v-for="(item, index) in addForm
                                                    .corplist.jl"
                                                :key="index"
                                            >
                                                <div>
                                                    <span style="color: #409eff"
                                                        >单位{{
                                                            index + 1
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        公司ID：
                                                    </div>

                                                    <el-input
                                                        v-model="item.a"
                                                    ></el-input>
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        用户ID：
                                                    </div>

                                                    <el-input
                                                        v-model="item.b"
                                                    ></el-input>
                                                </div>
                                            </div>
                                            <el-button
                                                type="primary"
                                                plain
                                                @click="addNewCj(5)"
                                                >增加单位</el-button
                                            >
                                        </div>
                                        <div class="cjcorp">
                                            <div>咨询单位：</div>
                                            <div
                                                class="cjjs"
                                                v-for="(item, index) in addForm
                                                    .corplist.zx"
                                                :key="index"
                                            >
                                                <div>
                                                    <span style="color: #409eff"
                                                        >单位{{
                                                            index + 1
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        公司ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.a"
                                                    ></el-input>
                                                </div>
                                                <div class="cjc">
                                                    <div class="cjcname">
                                                        用户ID：
                                                    </div>

                                                    <el-input
                                                        v-model.trim="item.b"
                                                    ></el-input>
                                                </div>
                                            </div>
                                            <el-button
                                                type="primary"
                                                plain
                                                @click="addNewCj(7)"
                                                >增加单位</el-button
                                            >
                                        </div>
                                    </div>
                                </el-tab-pane> -->
                            </el-tabs>
                        </el-tab-pane>

                        <el-tab-pane label="操作权限" name="caozuo">
                            <div class="menuSPower">
                                <div>
                                    <div class="mpName">
                                        创建任务
                                        <span>谁可以在项目内创建任务</span>
                                    </div>
                                    <el-checkbox-group
                                        v-model="createCheckList"
                                    >
                                        <el-checkbox
                                            label="项目负责人"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="项目管理员"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="项目成员"
                                        ></el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div>
                                    <div class="mpName">
                                        修改任务
                                        <span>谁可以在项目内修改任务</span>
                                    </div>
                                    <el-checkbox-group v-model="editCheckList">
                                        <el-checkbox
                                            label="项目负责人"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="项目管理员"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="项目成员"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="任务创建人"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="任务负责人"
                                        ></el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div>
                                    <div class="mpName">
                                        删除任务
                                        <span>谁可以在项目内删除任务</span>
                                    </div>
                                    <el-checkbox-group
                                        v-model="deleteCheckList"
                                    >
                                        <el-checkbox
                                            label="项目负责人"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="项目管理员"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="项目成员"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="任务创建人"
                                        ></el-checkbox>
                                        <el-checkbox
                                            label="任务负责人"
                                        ></el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane
                            label="子项目管理"
                            name="zixiangmu"
                            class="nextManage"
                        >
                            <div
                                v-for="(item, index) in addForm.zproject"
                                :key="index"
                            >
                                <el-form-item
                                    label="子项目名称"
                                    class="nextXmClass"
                                >
                                    <el-input
                                        v-model="item.zname"
                                        placeholder="请输入子项目名称"
                                        maxlength="20"
                                    ></el-input>
                                    <i
                                        class="el-icon-circle-close"
                                        @click="deleteMoreActive(index)"
                                    ></i>
                                </el-form-item>
                            </div>
                            <div class="nextMbtn">
                                <el-button size="small" @click="addNextXm"
                                    >添加子项目</el-button
                                >
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="drawClose('addFormRef')">取 消</el-button>
                <el-button
                    type="primary"
                    :loading="loading"
                    @click="saveNew('addFormRef')"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog
            title="全部项目管理员"
            :append-to-body="true"
            :visible.sync="AllPeopleVisible"
            class="contractOpenPeopleDialog"
            :close-on-click-modal="false"
        >
            <div style="margin-bottom: 10px">共有{{ tagsData.length }}人</div>
            <div class="showAllPeople">
                <div
                    class="addMList"
                    v-for="(item, index) in tagsData"
                    :key="index"
                >
                    <div class="mdnList">
                        <div class="mdren">
                            <img v-if="item.avatar" :src="item.avatar" alt />
                            <span class="touxiang" v-else>{{
                                item.name.length <= 2
                                    ? item.name
                                    : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                        </div>
                        <p>{{ item.name }}</p>
                        <i
                            class="el-icon-error"
                            @click="manageClose(item, index)"
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
            title="全部项目成员"
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
                            <img v-if="item.avatar" :src="item.avatar" alt />
                            <span class="touxiang" v-else>{{
                                item.name.length <= 2
                                    ? item.name
                                    : item.name.substr(item.name.length - 2, 2)
                            }}</span>
                        </div>
                        <p>{{ item.name }}</p>
                        <i
                            class="el-icon-error"
                            @click="peopleClose(item, index)"
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
        <el-dialog title="提示" :visible.sync="linkVisible" width="30%">
            <div>
                <div v-for="(item, index) in msgList" :key="index">
                    <p>{{ item }}</p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import supload from './corpUpload';
import * as dd from 'dingtalk-jsapi';
import { regionData, CodeToText } from 'element-china-area-data';
export default {
    name: 'menuS',
    components: { supload },
    props: {
        viewMenu: Number
    },
    data() {
        let validatepphone = (rule, value, callback) => {
            const reg = /^1\d{10}$/;
            if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };
        let validateMoney = (rule, value, callback) => {
            const reg = /^(([1-9][0-9]*)|(([0]\.\d{1}|[1-9][0-9]*\.\d{2})))$/;
            if (!reg.test(value)) {
                callback(new Error('请输入数字，最多保留两位小数'));
            } else {
                callback();
            }
        };
        return {
            statusOptions: ['筹建', '在建', '停工', '竣工', '中止'],
            isBen: '企业人员管理',
            isBenID: 1,
            linkVisible: false,
            msgList: [],
            cjSname: '',
            cjStype: '',
            tableData: [
                {
                    date: '王小虎',
                    name: '筑快',
                    address: '建设单位',
                    btnVisible: false
                }
            ],
            activeUser: 'aufirst',
            tipView: false,
            addFormRules: {
                name: [
                    {
                        required: true,
                        message: '项目名称不能为空',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        validator: validatepphone,
                        trigger: 'blur'
                    }
                ],
                pcontent: [
                    {
                        required: true,
                        message: '项目简称不能为空',
                        trigger: 'blur'
                    }
                ],
                // xmmoney: [
                //     {
                //         required: true,
                //         validator: validateMoney,
                //         trigger: 'blur'
                //     }
                // ],
                beian: [
                    {
                        required: true,
                        message: '项目状态不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                xmstart: [
                    {
                        required: true,
                        message: '开工时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                xmstop: [
                    {
                        required: true,
                        message: '竣工时间不能为空',
                        trigger: ['blur', 'change']
                    }
                ],
                // city: [
                //     {
                //         required: true,
                //         message: '项目地址不能为空',
                //         trigger: ['blur', 'change']
                //     }
                // ],
                puserid: [
                    {
                        required: true
                    }
                ]
            },
            peopleList: [],
            breadList: [],
            projectAddress: '请选择项目地址',
            dialogTitle: '创建项目',
            btnType: 1,
            options: regionData,
            dialogFormVisible: false,
            AllPeopleVisible: false,
            AllSendPeopleVisible: false,
            tagsPeopleData: [],
            tagsData: [],
            addForm: {
                zproject: [{ zname: '', zid: '' }],
                corplist: {
                    js: [
                        {
                            a: '',
                            b: '',
                            c: 'js'
                        }
                    ],
                    zb: [
                        {
                            a: '',
                            b: '',
                            c: 'zb'
                        }
                    ],
                    zf: [
                        {
                            a: '',
                            b: '',
                            c: 'zf'
                        }
                    ],
                    zx: [
                        {
                            a: '',
                            b: '',
                            c: 'zx'
                        }
                    ],
                    sj: [
                        {
                            a: '',
                            b: '',
                            c: 'sj'
                        }
                    ],
                    jl: [
                        {
                            a: '',
                            b: '',
                            c: 'jl'
                        }
                    ],
                    kc: [
                        {
                            a: '',
                            b: '',
                            c: 'kc'
                        }
                    ]
                },
                name: '',
                phone: '',
                xmpeople: [],
                xmmanage: [],
                pcontent: '',
                puserid: this.$store.state.userInfo.uid,
                beian: '',
                xmmoney: '',
                xmstart: '',
                xmstop: '',
                xmcity: '',
                city: '',
                xmaddress: '',
                xmcontent: '',
                puseridname: this.$store.state.userInfo.uname,
                purl: this.$store.state.userInfo.avatar,
                xmurl:
                    'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnZXQ26B841600655714494.png'
            },
            createCheckList: ['项目负责人', '项目管理员', '项目成员'],
            editCheckList: ['项目负责人', '项目管理员', '项目成员'],
            deleteCheckList: ['项目负责人', '项目管理员'],
            upImgList: '',
            licenceImg: '',
            isShow: ['1'],
            xmbiaoqian: [],
            inputVisible: false,
            inputValue: '',
            uopen: true,
            ctran: true,
            tabPosition: 'left',
            labelPosition: 'top',
            loading: false,
            menuList: [],
            appList: [
                // {
                //     name: '项目信息',
                //     icon: 'el-icon-tickets',
                //     path: '/application/applicationUser',
                //     num: 0
                // },
                {
                    name: '公司权限设置',
                    icon: 'el-icon-user',
                    path: '/application/applicationPower',
                    num: 0
                },
                {
                    name: '订单中心',
                    icon: 'el-icon-notebook-2',
                    path: '/application/applicationOrder'
                },
                {
                    name: '任务模板设置',
                    icon: 'el-icon-switch-button',
                    path: '/application/taskMouldSet'
                }
            ],
            taskList: [
                {
                    name: '新建任务',
                    icon: 'el-icon-s-claim',
                    path: '/task/taskMould',
                    num: 0
                },

                {
                    name: '任务列表',
                    icon: 'el-icon-document-copy',
                    path: '/task/taskList',
                    num: 0
                }
                // {
                //     name: '任务模板',
                //     icon: 'el-icon-date',
                //     path: '/task/taskOrder'
                // }
            ],
            diaryList: [
                {
                    name: '新建日志',
                    icon: 'el-icon-s-claim',
                    path: '/diary/diaryAdd',
                    num: 0
                },
                {
                    name: '日志列表',
                    icon: 'el-icon-s-order',
                    path: '/diary/diaryList',
                    num: 0
                },

                // {
                //     name: '日志模板',
                //     icon: 'el-icon-s-cooperation',
                //     path: '/diary/diaryOrder'
                // },
                {
                    name: '日志成册打印',
                    icon: 'el-icon-printer',
                    path: '/diary/diaryPrintList',
                    num: 0
                }
            ],
            filesList: [
                {
                    name: '最近列表',
                    path: '/files/filesCurrent',
                    icon: 'el-icon-document',
                    num: 0
                },
                {
                    name: '图纸文件',
                    path: '/files/filesImg',
                    icon: 'el-icon-picture-outline',
                    num: 0
                },
                {
                    name: '模型文件',
                    path: '/files/filesModel',
                    icon: 'el-icon-guide',
                    num: 0
                },
                {
                    name: '规范图集',
                    path: '/files/filesAtlas',
                    icon: 'el-icon-school',
                    num: 0
                },

                {
                    name: '参建各方文件',
                    path: '/files/filesShare',
                    icon: 'el-icon-set-up',
                    num: 0
                },
                {
                    name: '私人文件',
                    path: '/files/filesLocal',
                    icon: 'el-icon-house',
                    num: 0
                },
                {
                    name: '我的收藏',
                    path: '/files/filesCollect',
                    icon: 'el-icon-collection',
                    num: 0
                },
                {
                    name: '文件动态',
                    path: '/files/filesDynamic',
                    icon: 'el-icon-bell',
                    num: 0
                },
                {
                    name: '回收站',
                    path: '/files/filesBack',
                    icon: 'el-icon-delete',
                    num: 0
                }
            ],
            projectList: [
                {
                    name: '项目面板',
                    icon: 'el-icon-menu',
                    path: '/project/projectPanel',
                    num: 0
                },
                {
                    name: '项目列表',
                    icon: 'el-icon-document-copy',
                    path: '/project/projectList',
                    num: 0
                },
                {
                    name: '进度管理',
                    icon: 'el-icon-trophy',
                    path: '/project/projectProgress',
                    num: 0
                },
                {
                    name: '质量事故汇报',
                    icon: 'el-icon-s-release',
                    path: '/project/projectQuality',
                    num: 0
                },
                {
                    name: '安全事故汇报',
                    icon: 'el-icon-warning-outline',
                    path: '/project/projectSafe',
                    num: 0
                },
                {
                    name: '成本控制',
                    icon: 'el-icon-s-shop',
                    path: '/project/projectCost',
                    num: 0
                },
                {
                    name: '合同管理',
                    icon: 'el-icon-notebook-2',
                    path: '/project/projectContract1',
                    num: 0,
                    chlid: [
                        {
                            name: '收入合同管理',
                            icon: 'el-icon-notebook-2',
                            path: '/project/projectContract',
                            num: 0
                        },
                        {
                            name: '支出合同管理',
                            icon: 'el-icon-notebook-2',
                            path: '/project/projectZContract',
                            num: 0
                        }
                    ]
                }
            ],
            errorProjectList: [
                {
                    name: '项目面板',
                    icon: 'el-icon-menu',
                    path: '/project/projectPanel',
                    num: 0
                },
                {
                    name: '项目列表',
                    icon: 'el-icon-document-copy',
                    path: '/project/projectList',
                    num: 0
                },
                {
                    name: '进度管理',
                    icon: 'el-icon-trophy',
                    path: '/project/projectError5',
                    num: 0
                },
                {
                    name: '质量事故汇报',
                    icon: 'el-icon-s-release',
                    path: '/project/projectError1',
                    num: 0
                },
                {
                    name: '安全事故汇报',
                    icon: 'el-icon-warning-outline',
                    path: '/project/projectError2',
                    num: 0
                },
                {
                    name: '成本控制',
                    icon: 'el-icon-s-shop',
                    path: '/project/projectError3',
                    num: 0
                },
                {
                    name: '合同管理',
                    icon: 'el-icon-notebook-2',
                    path: '/project/projectError4',
                    num: 0,
                    chlid: [
                        {
                            name: '收入合同管理',
                            icon: 'el-icon-notebook-2',
                            path: '/project/projectError4',
                            num: 0
                        },
                        {
                            name: '支出合同管理',
                            icon: 'el-icon-notebook-2',
                            path: '/project/projectError6',
                            num: 0
                        }
                    ]
                }
            ],
            activeName: 'basic',
            menusXmId: '',
            editGoType: 1
        };
    },
    methods: {
        //删除子项目
        deleteMoreActive(index) {
            this.addForm.zproject.splice(index, 1);
        },
        // 新增子项目
        addNextXm() {
            this.addForm.zproject.push({ zname: '', zid: '' });
        },
        typeFort(row, column) {
            switch (row.type) {
                case 'manage':
                    return '项目管理员';
                    break;
                case 'user':
                    return '项目成员';
                    break;
            }
        },
        //设置人员权限
        setPeople(type, row) {
            row.btnVisible = false;
            let newType = 'manage';
            if (type == 1) {
                newType = 'manage';
            } else if (type == 2) {
                newType = 'user';
            }
            this.$axios
                .post('/cy_xiezhu/UpdateCongProjectUser', {
                    xmid: this.menusXmId,
                    corp_id: this.$store.state.cid,
                    userid: this.$store.state.userInfo.uid,
                    bcorp_id: row.corp_id,
                    buserid: row.emplId,
                    type: newType,
                    admin: this.$store.state.userInfo.admin
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.getUserList();
                        this.$message.success('更改权限成功！');
                    } else {
                        this.$message.warning(res.data.msg);
                    }
                });
        },
        addNewCj(type) {
            switch (type) {
                case 1:
                    this.addForm.corplist.zb.push({ a: '', b: '', c: 'zb' });
                    break;
                case 2:
                    this.addForm.corplist.js.push({ a: '', b: '', c: 'js' });
                    break;
                case 3:
                    this.addForm.corplist.kc.push({ a: '', b: '', c: 'kc' });
                    break;
                case 4:
                    this.addForm.corplist.sj.push({ a: '', b: '', c: 'sj' });
                    break;
                case 5:
                    this.addForm.corplist.jl.push({ a: '', b: '', c: 'jl' });
                    break;
                case 6:
                    this.addForm.corplist.zf.push({ a: '', b: '', c: 'zf' });
                    break;
                case 7:
                    this.addForm.corplist.zx.push({ a: '', b: '', c: 'zx' });
                    break;
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
        },
        sloadNode(node, resolve) {
            const that = this;

            if (node.level === 0) {
                that.$axios
                    .post('/dingxiezhu/teamjigoulist', {
                        id: that.content.id
                    })
                    .then((res) => {
                        if ((res.data.status = 1)) {
                            let result = res.data.content;
                            return resolve(result);
                        }
                    });
            } else if (node.level > 0) {
                let _id = node.data.bzid;
                //-----获取子级组织
                that.$axios
                    .post('/dingxiezhu/teamjigoulist', {
                        id: that.content.id,
                        bzid: _id
                    })
                    .then((res) => {
                        if ((res.data.status = 1)) {
                            let result = res.data.content;
                            return resolve(result);
                        }
                    });
            }
        },
        searchClick() {
            this.getUserList();
        },
        getUserList() {
            this.$axios
                .post('/cy_xiezhu/PhoneProjectUserList', {
                    xmid: this.menusXmId,
                    corp_id: this.$store.state.cid,
                    name: this.cjSname,
                    danweitype: this.cjStype,
                    type: 2
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        this.tableData = res.data.content;
                    }
                });
        },
        viewDialog(row, type) {
            const _this = this;
            _this.editGoType = type;
            _this.menusXmId = row.id;
            if (row.guanli == 1) {
                _this.isBen = '企业人员管理';
                _this.isBenID = 1;
            } else {
                _this.isBen = '企业人员管理';
                _this.isBenID = 2;
            }

            _this.getUserList();
            _this.activeName = 'basic';
            _this.btnType = 2;
            _this.projectAddress = row.xmcity;
            _this.dialogTitle = '编辑项目';
            _this.xmbiaoqian = row.xmbiaoqian;
            _this.addForm = row;

            if (!_this.addForm.xmurl) {
                _this.addForm.xmurl =
                    'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnZXQ26B841600655714494.png';
            }
            _this.licenceImg = _this.addForm.xmurl;
            _this.addForm.city = row.xmcity;
            _this.addForm.xmmanage = row.xmuser.manage;
            _this.addForm.xmpeople = row.xmuser.user;
            _this.tagsData = row.xmuser.manage;
            _this.tagsPeopleData = row.xmuser.user;
            _this.createCheckList = row.xmquanxian.add;
            _this.editCheckList = row.xmquanxian.edit;
            _this.deleteCheckList = row.xmquanxian.delete;
            _this.dialogFormVisible = true;
        },
        saveNew(formName) {
            const _this = this;
            _this.loading = true;

            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    let newData = _this.addForm;
                    let xmpeople = { manage: [], user: [] };
                    let xmqx = { add: [], edit: [], delete: [] };
                    xmpeople.manage = _this.addForm.xmmanage;
                    xmpeople.user = _this.addForm.xmpeople;
                    xmqx.add = _this.createCheckList;
                    xmqx.edit = _this.editCheckList;
                    xmqx.delete = _this.deleteCheckList;

                    if (_this.btnType == 1) {
                        _this.$axios
                            .post('/cy_xiezhu/CreatProject', {
                                xmbiaoqian: _this.xmbiaoqian,
                                xmuser: xmpeople,
                                xmquanxian: xmqx,
                                corp_id: _this.$store.state.cid,
                                name: newData.name,
                                pcontent: newData.pcontent,
                                puserid: newData.puserid,
                                pboss: _this.$store.state.userInfo.uid,
                                phone: newData.phone,
                                beian: newData.beian,
                                xmmoney: newData.xmmoney,
                                xmstart: newData.xmstart,
                                xmstop: newData.xmstop,
                                xmcity: newData.xmcity,
                                xmaddress: newData.xmaddress,
                                xmcontent: newData.xmcontent,
                                xmurl: newData.xmurl,
                                admin: _this.$store.state.userInfo.admin,
                                corplist: newData.corplist,
                                zproject: newData.zproject
                            })
                            .then((res) => {
                                if (res.data.code == 200) {
                                    // _this.$parent.fatherMethod();
                                    _this.$emit('updateL', 1);
                                    _this.loading = false;
                                    _this.dialogFormVisible = false;
                                    _this.$refs[formName].resetFields();

                                    _this.$message({
                                        message: '创建项目成功',
                                        type: 'success',
                                        duration: '2000'
                                    });
                                    if (res.data.changmsg.length > 0) {
                                        _this.linkVisible = true;
                                        _this.msgList = res.data.changmsg;
                                    } else {
                                        _this.linkVisible = false;
                                        _this.msgList = [];
                                    }
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
                    } else if (_this.btnType == 2) {
                        _this.$axios
                            .post('/cy_xiezhu/UpdateProject', {
                                cytype: 'update',
                                xmid: newData.id,
                                xmbiaoqian: _this.xmbiaoqian,
                                xmuser: xmpeople,
                                xmquanxian: xmqx,
                                corp_id: _this.$store.state.cid,
                                name: newData.name,
                                pcontent: newData.pcontent,
                                puserid: newData.puserid,
                                beian: newData.beian,
                                xmmoney: newData.xmmoney,
                                xmstart: newData.xmstart,
                                xmstop: newData.xmstop,
                                phone: newData.phone,
                                xmcity:
                                    newData.xmcity == ''
                                        ? _this.projectAddress
                                        : newData.xmcity,
                                xmaddress: newData.xmaddress,
                                xmcontent: newData.xmcontent,
                                xmurl: newData.xmurl,
                                admin: _this.$store.state.userInfo.admin,
                                userid: _this.$store.state.userInfo.uid,
                                corplist: newData.corplist,
                                zproject: newData.zproject
                            })
                            .then((res) => {
                                if (res.data.code == 200) {
                                    if (_this.editGoType == 1) {
                                        //从项目列表编辑
                                        // _this.$parent.fatherMethod();
                                        _this.$emit('updateL', 1);
                                    } else if (_this.editGoType == 2) {
                                        //从项目详情编辑
                                        // _this.$parent.InfoMethod();
                                        _this.$emit('updateL', 2);
                                    }

                                    if (
                                        newData.id ==
                                        _this.$store.state.projectInfo.pid
                                    ) {
                                        _this.getInfo(newData.id);

                                        // let currPer, editPer, editPtag;
                                        // //当前时间
                                        // let currentTime = new Date();
                                        // let nowTime = Date.parse(
                                        //     _this.$utils.timeChange(
                                        //         currentTime,
                                        //         2
                                        //     )
                                        // );
                                        // let day = 24 * 60 * 60 * 1000;
                                        // let newStart = Date.parse(
                                        //     newData.xmstart
                                        // );
                                        // let newStop = Date.parse(
                                        //     newData.xmstop
                                        // );
                                        // let waitTime =
                                        //     (nowTime - newStart) / day;
                                        // let totalTime =
                                        //     (newStop - newStart) / day;
                                        // if (
                                        //     nowTime > newStart &&
                                        //     nowTime < newStop
                                        // ) {
                                        //     currPer =
                                        //         (waitTime / totalTime) * 100;
                                        //     editPer = currPer.toFixed(1);
                                        //     editPtag = '项目进行中';
                                        // } else if (nowTime >= newStop) {
                                        //     currPer = 100;
                                        //     editPtag = '项目已结束';
                                        // } else if (nowTime < newStart) {
                                        //     //当前时间小于开工时间
                                        //     waitTime = 0;
                                        //     currPer = 0;
                                        //     editPtag = '项目筹建';
                                        // } else {
                                        //     //当前时间和开工时间一致
                                        //     waitTime = 1;
                                        //     currPer =
                                        //         (waitTime / totalTime) * 100;
                                        //     editPer = currPer.toFixed(1);
                                        //     editPtag = '项目进行中';
                                        // }
                                    }

                                    _this.loading = false;
                                    _this.dialogFormVisible = false;
                                    _this.$refs[formName].resetFields();

                                    _this.$message({
                                        message: res.data.msg,
                                        type: 'success',
                                        duration: '2000'
                                    });
                                    if (res.data.changmsg.length > 0) {
                                        _this.linkVisible = true;
                                        _this.msgList = res.data.changmsg;
                                    } else {
                                        _this.linkVisible = false;
                                        _this.msgList = [];
                                    }
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
                    _this.$message.warning('有必填信息未填写，请去填写！');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        showUrl(url) {
            this.addForm.xmurl = url;
        },
        getInfo(id) {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectContent', {
                    id: id,
                    corp_id: _this.$store.state.cid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        let infoData = res.data.content;
                        _this.$store.commit(
                            'setProjectName',
                            infoData.pcontent
                        );
                        _this.$store.commit('setProjectPurl', infoData.xmurl);
                        _this.$store.commit('setPerctentage', infoData.jindu);
                        _this.$store.commit('setPTag', infoData.beian);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        //删除成员
        peopleClose(tag, index) {
            this.tagsPeopleData.splice(this.tagsPeopleData.indexOf(tag), 1);
            this.addForm.xmpeople = this.tagsPeopleData;
        },
        //删除管理员
        manageClose(tag, index) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
            this.addForm.xmmanage = this.tagsData;
        },
        //查看人员
        openAllPeople(id) {
            if (id == 1) {
                this.AllPeopleVisible = true;
            } else if (id == 2) {
                this.AllSendPeopleVisible = true;
            }
        },
        //关闭创建
        drawClose(name) {
            this.$refs[name].resetFields();
            this.dialogFormVisible = false;
        },
        //删除全部成员人员
        handleSendClose(item) {},
        addNewProject() {
            this.isBen = '企业人员管理';
            this.isBenID = 1;
            this.tipView = false;
            this.btnType = 1;
            this.tableData = [];
            this.tagsData = [];
            this.tagsPeopleData = [];
            this.createCheckList = ['项目负责人', '项目管理员', '项目成员'];
            this.editCheckList = ['项目负责人', '项目管理员', '项目成员'];
            this.deleteCheckList = ['项目负责人', '项目管理员'];
            this.activeName = 'basic';
            this.projectAddress = '请选择项目地址';
            this.addForm = {
                zproject: [{ zname: '', zid: '' }],
                corplist: {
                    js: [
                        {
                            a: '',
                            b: '',
                            c: 'js'
                        }
                    ],
                    zb: [
                        {
                            a: '',
                            b: '',
                            c: 'zb'
                        }
                    ],
                    zf: [
                        {
                            a: '',
                            b: '',
                            c: 'zf'
                        }
                    ],
                    zx: [
                        {
                            a: '',
                            b: '',
                            c: 'zx'
                        }
                    ],
                    sj: [
                        {
                            a: '',
                            b: '',
                            c: 'sj'
                        }
                    ],
                    jl: [
                        {
                            a: '',
                            b: '',
                            c: 'jl'
                        }
                    ],
                    kc: [
                        {
                            a: '',
                            b: '',
                            c: 'kc'
                        }
                    ]
                },
                name: '',
                phone: '',
                xmpeople: [],
                xmmanage: [],
                pcontent: '',
                puserid: this.$store.state.userInfo.uid,
                beian: '',
                xmmoney: '',
                xmstart: '',
                xmstop: '',
                xmcity: '',
                city: '',
                xmaddress: '',
                xmcontent: '',
                puseridname: this.$store.state.userInfo.uname,
                purl: this.$store.state.userInfo.avatar,
                xmurl:
                    'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/DnZXQ26B841600655714494.png'
            };
            this.dialogFormVisible = true;
            this.dialogTitle = '创建项目';
        },
        handleClose(item) {},
        addressChange(arr) {
            let province = CodeToText[arr[0]];
            let city = CodeToText[arr[1]];
            let area = CodeToText[arr[2]];
            this.addForm.xmcity = province + city + area;
            // alert(this.selectedOptions)
        },
        tagClose(tag) {
            this.xmbiaoqian.splice(this.xmbiaoqian.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.xmbiaoqian.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        menuClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //数组对象去重
        unique(arr) {
            const res = new Map();
            return arr.filter(
                (arr) => !res.has(arr.emplId) && res.set(arr.emplId, 1)
            );
        },
        addManyP(type) {
            const that = this;

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
                        let newObjs = result.users.map(function (item) {
                            return Object.assign(item, {
                                corp_id: that.$store.state.cid
                            });
                        });
                        if (type == 1) {
                            newObjs.forEach((item) => {
                                that.tagsData.push(item);
                            });
                            that.addForm.xmmanage = that.tagsData;
                        } else if (type == 2) {
                            newObjs.forEach((item) => {
                                that.tagsPeopleData.push(item);
                            });
                            that.addForm.xmpeople = that.tagsPeopleData;
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
        addSingP() {
            const that = this;
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
                        that.addForm.puseridname = result.users[0].name;
                        that.addForm.purl = result.users[0].avatar;
                        that.addForm.puserid = result.users[0].emplId;
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
        getUserNum() {
            this.$axios
                .post('/task/UserShuLiang', {
                    xmid: this.$store.state.projectInfo.pid
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        if (this.$store.state.projectInfo.ppower == '2') {
                            // this.errorProjectList[3].num = res.data.content[0];
                            // this.errorProjectList[4].num = res.data.content[1];
                            // this.errorProjectList[5].num = res.data.content[2];
                            // this.errorProjectList[6].chlid[0].num =
                            //     res.data.content[3];
                            // this.errorProjectList[6].chlid[1].num =
                            //     res.data.content[4];
                            this.menuList = this.errorProjectList;
                        } else {
                            // this.projectList[3].num = res.data.content[0];
                            // this.projectList[4].num = res.data.content[1];
                            // this.projectList[5].num = res.data.content[2];
                            // this.projectList[6].chlid[0].num =
                            //     res.data.content[3];
                            // this.projectList[6].chlid[1].num =
                            //     res.data.content[4];
                            this.menuList = this.projectList;
                        }
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning',
                            duration: '1500'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.$utils.checkding();
        if (
            this.$store.state.userInfo.first == 1 &&
            this.$store.state.projectInfo.plength < 1
        ) {
            this.tipView = true;
        } else {
            this.tipView = false;
        }
    },
    created() {
        switch (this.viewMenu) {
            case 1:
                this.getUserNum();
                break;
            case 2:
                this.menuList = this.taskList;
                break;
            case 3:
                this.menuList = this.filesList;
                break;
            case 4:
                this.menuList = this.diaryList;
                break;
            case 5:
                this.menuList = this.appList;
                break;
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
        routhPath() {
            if (
                this.$route.path == '/project/projectPanel' ||
                this.$route.path == '/project/projectInfo'
            ) {
                return '/project/projectPanel';
            } else if (
                this.$route.path == '/task/taskMould' ||
                this.$route.path == '/task/taskManyList'
            ) {
                return '/task/taskMould';
            } else {
                return this.$route.path;
            }
        },
        pickerStart() {
            return {
                disabledDate: (time) => {
                    let endDateVal = this.addForm.xmstop;
                    if (endDateVal) {
                        return time.getTime() > new Date(endDateVal).getTime();
                    }
                }
            };
        },
        pickerEnd() {
            return {
                disabledDate: (time) => {
                    let beginDateVal = this.addForm.xmstart;
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
                if (this.viewMenu == 1) {
                    this.getUserNum();
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style lang="less">
.menuS {
    font-size: 0px;
    width: 220px;
    // height: 826px;
    .cebian {
        .menuProject {
            width: 180px;
            margin: 20px auto;
            height: 50px;
            line-height: 50px;
            background-color: #f78008;
            color: #fff;
            font-size: 18px;
            border-radius: 10px;
            padding: 0 10px;
            text-align: center;
            position: relative;
            cursor: pointer;
            img {
                vertical-align: middle;
                width: 30px;
                height: 30px;
            }
            .mpTips {
                position: absolute;
                right: -180px;
                top: 0;
                z-index: 99;
                background-color: #409eef;
                font-size: 14px;
                padding: 0 20px;
                i {
                    position: absolute;
                    left: -14px;
                    top: 18px;
                    color: red;
                }
            }
        }
        .mensViewNum {
            position: absolute;
            right: 18px;
            width: 18px;
            height: 18px;
            top: 20px;
            background-color: red;
            border-radius: 50%;
            line-height: 18px;
            text-align: center;
            font-size: 12px !important;
            color: #fff;
        }
        .el-menu-vertical-demo {
            border-right: 0;
            .el-menu-item {
                i {
                    font-size: 18px;
                    color: #fff;
                }
                span {
                    font-size: 16px;
                }
            }
            .el-menu-item.is-active {
                i {
                    color: #ffd04b;
                }
            }
            .el-submenu {
                i {
                    font-size: 18px;
                }
                span {
                    font-size: 16px;
                }
                .el-menu-item {
                    font-size: 16px;
                }
            }
        }
    }
    .meNewPro {
        .el-dialog {
            min-width: 800px;
        }
        .el-form {
            .el-date-editor,
            .el-cascader {
                width: 100% !important;
            }
        }
        .qymanage {
            height: 500px;
            overflow-y: auto;
            .cjcorp {
                width: 100%;
                .el-button {
                    margin-left: 200px;
                }
                .cjjs {
                    padding-left: 200px;
                    .cjc {
                        margin: 0 6px 10px 6px;
                        display: flex;
                        > div:nth-child(1) {
                            width: 80px;
                            line-height: 40px;
                        }
                        .el-input {
                            width: 300px;
                        }
                    }
                }
            }
        }
        .cjuTable {
            .cjSearch,
            .cjTypeClass {
                display: flex;
                margin-right: 10px;
            }
            .cjSearch {
                margin: 10px 0;
                .cjTypeClass {
                    > div:nth-child(1) {
                        line-height: 40px;
                    }
                }
                .el-input {
                    width: 200px;
                    margin-right: 10px;
                }
            }
        }
    }
    .menuS-img {
        width: 280px;
        height: 70px;
        // background: red;
        padding: 10px 20px;
        box-sizing: border-box;
        // box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
        line-height: 52px;

        div {
            width: 100%;
            height: 100%;
            background: #f78008;
            border-radius: 15px;
            cursor: pointer;
            // line-height: 100%;
            img {
                width: 20px;
                height: 20px;
                margin-left: 65px;
                vertical-align: middle;
            }
            span {
                font-size: 18px;
                color: white;
                margin-left: 15px;
                vertical-align: middle;
            }
        }
    }
    .menuS-center {
        padding: 0px 20px;
        .tab {
            margin-top: 15px;
            font-size: 20px;
        }
    }
    .typeTitle {
        width: 100%;
        > div:nth-child(1) {
            margin-top: 6px;
            margin-bottom: 10px;
        }
        .tagTitle {
            .el-tag + .el-tag {
                margin-left: 10px;
            }
            .button-new-tag {
                margin-left: 10px;
                height: 32px;
                line-height: 30px;
                padding-top: 0;
                padding-bottom: 0;
            }
            .input-new-tag {
                width: 90px;
                margin-left: 10px;
                vertical-align: bottom;
            }
        }
    }
    .addPhoto {
        .el-form-item__content {
            display: flex;
            justify-content: space-between;

            .touPic {
                height: 40px;
                width: 40px;
                margin-left: 10px;
            }
        }
    }
    .outcan {
        width: 50%;
        > div {
            display: flex;
            line-height: 40px;
            justify-content: space-between;
            margin-bottom: 20px;
        }
    }
    .el-dialog {
        .basicInfo {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .el-form-item {
                width: 45%;
                margin-bottom: 8px;
                .el-form-item__label {
                    padding: 0;
                }
            }
        }

        .userClass {
            width: 40px;
            .puserClass {
                position: relative;
                .mdren {
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 50%;
                    border: 1px solid #4090ef;
                    overflow: hidden;
                    margin: 0 auto;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .touxiang {
                        padding: 0;
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        background-color: #4099ef;
                        color: #fff;
                    }
                }
                p {
                    font-size: 12px;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 22px;
                    min-width: 40px;
                }
                @media screen and (max-width: 1740px) {
                    p {
                        min-width: 50px;
                    }
                }
                @media screen and (max-width: 1400px) {
                    p {
                        min-width: 60px;
                    }
                }
                .el-icon-error {
                    position: absolute;
                    top: -6px;
                    right: 0;
                    font-size: 14px;
                }
            }
        }
        .mensPeople {
            .addManeger {
                justify-content: flex-start;
            }
        }
        .menuManagePeople {
            .el-form-item__label:before {
                content: '*';
                color: #f56c6c;
                margin-right: 4px;
            }
        }
        .menuSPower {
            .mpName {
                margin-bottom: 20px;
                span {
                    color: rgb(146, 146, 146);
                }
            }
            .el-checkbox-group {
                margin-bottom: 20px;
                padding-left: 20px;
            }
        }
    }
    .nextManage {
        .nextXmClass {
            .el-form-item__content {
                display: flex;
                .el-input {
                    width: 80%;
                    margin-right: 10px;
                }
                > i {
                    line-height: 40px;
                    color: red;
                    cursor: pointer;
                }
            }
        }
        .nextMbtn {
            width: 80%;
            text-align: center;
        }
    }
    // .el-icon-circle-close {
    //     color: red;
    //     cursor: pointer;
    // }
}
</style>

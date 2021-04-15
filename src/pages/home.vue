/*
 * @Author: NorthWind 
 * @Date: 2020-11-12 16:49:08 
 * @Last Modified by: NorthWind
 * @Last Modified time: 2021-04-15 15:35:06
 */
<template>
    <div id="home">
        <el-container class="homeContain" style="border: 1px solid #eee">
            <el-header class="homeHeader">
                <userinfo></userinfo>
                <!-- <div class="workbench-img">
                    <img :src="logoUrl" alt="" />
                </div>
                <div class="workbench_main">
                    <div class="workbench-center">
                        <ul class="firstInjs">
                            <li
                                v-for="(item, index) in titleList"
                                :key="index"
                                :class="cNameTwoS(item.url)"
                                @click="buttonTop(item.url)"
                            >
                                <img :src="item.image" alt="" />
                                <span>{{ item.name }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="workbench_right">
                        <div class="relation-box">
                            <ul>
                                <li class="secondInjs">
                                    <el-popover
                                        placement="bottom"
                                        width="290"
                                        trigger="hover"
                                    >
                                        <div slot="reference">
                                            <img
                                                style="cursor: pointer"
                                                src="../assets/menu/kefu.jpg"
                                                alt
                                            />
                                        </div>
                                        <div
                                            class="down"
                                            style="text-align: center"
                                        >
                                            <img
                                                style="
                                                    width: 220px;
                                                    height: 242px;
                                                "
                                                src="../assets/workbench/erweima.png"
                                                alt
                                            />
                                            <div
                                                style="margin: 0.06rem 0"
                                                @click="gophone"
                                            >
                                                手机钉钉扫描二维码加入“用户服务群”
                                            </div>
                                            <div>联系电话：0371-56775558</div>
                                        </div>
                                    </el-popover>
                                </li>
                                <li class="thirdInjs">
                                    <el-popover
                                        placement="bottom"
                                        width="150"
                                        trigger="hover"
                                    >
                                        <div slot="reference">
                                            <img
                                                style="cursor: pointer"
                                                src="../assets/menu/bangzhu.jpg"
                                                alt
                                            />
                                        </div>
                                        <div
                                            class="down"
                                            style="text-align: center"
                                        >
                                            <p
                                                @click="gohelp"
                                                style="
                                                    margin-bottom: 12px;
                                                    cursor: pointer;
                                                "
                                            >
                                                帮助文档
                                            </p>
                                            <p
                                                style="cursor: pointer"
                                                @click="addBack"
                                            >
                                                意见反馈
                                            </p>
                                        </div>
                                    </el-popover>
                                </li>
                            </ul>
                        </div>
                        <div class="admin">
                            <img :src="Image" v-if="Image" />
                            <img src="../assets/menu/YH.png" v-else />
                            <div style="margin-left: 20px; overflow: hidden">
                                {{ uname }}
                            </div>
                        </div>
                    </div>
                </div> -->
            </el-header>
            <el-container class="homeBottomContain">
                <router-view />
            </el-container>
        </el-container>
        <el-dialog :visible.sync="createVisible" class="carouselDialog">
            <el-carousel
                trigger="click"
                height="559px"
                :autoplay="false"
                arrow="always"
            >
                <el-carousel-item
                    v-for="(item, index) in helplist"
                    :key="index"
                >
                    <el-image
                        style="width: 100%; height: 100%"
                        :src="item"
                    ></el-image>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
        <el-dialog
            title="意见反馈"
            :visible.sync="addFormVisible"
            @close="handleClose('addEditForm')"
            width="600px"
        >
            <el-form
                :model="addForm"
                label-width="80px"
                :rules="addFormRules"
                ref="addEditForm"
                label-position="right"
            >
                <div>
                    <el-form-item label="意见：" prop="parere">
                        <el-input
                            type="textarea"
                            v-model="addForm.parere"
                            maxlength="240"
                            show-word-limit
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="tel">
                        <el-input
                            v-model="addForm.tel"
                            maxlength="11"
                        ></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button
                        type="primary"
                        :loading="loaded"
                        @click="addSave('addEditForm')"
                        >提交</el-button
                    >
                    <el-button @click="handleClose('addEditForm')"
                        >取消</el-button
                    >
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
// import Driver from 'driver.js';
// import 'driver.js/dist/driver.min.css';
import userinfo from '@/components/userinfo.vue';
export default {
    name: 'home',
    components: {
        // menuS,
        userinfo
    },
    data() {
        return {
            helplist: [
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/zXDkXNeNkd1609724091928.png',
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/7s26jHzTtf1609724267189.png',
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/KHEMpJfKJT1609724623208.png',
                'https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/7KAxBPaE7F1609724624335.png'
            ],
            createVisible: false,
            addFormRules: {
                parere: [
                    {
                        required: true,
                        message: '请输入意见',
                        trigger: 'blur'
                    }
                ],
                tel: [
                    {
                        required: true,
                        message: '请选择手机号',
                        trigger: 'blur'
                    }
                ]
            },
            loaded: false,
            addFormVisible: false,
            ImageShow: false,
            Image: '',
            cname: '',
            name: '',
            corp_time: '',
            corp_name: '',
            uname: '',
            cNameOne: 'colorName',
            cNameTwo: '',
            titleList: [],
            addForm: {
                tel: '',
                parere: ''
            },
            logoUrl: ''
            // titleList: [
            //     { name: '首页', url: '/appIndex' },
            //     { name: '项目', url: '/project/tenderProject' },
            //     { name: '财务', url: '/finance/financeAccountInfo' },
            //     { name: '证书', url: '/certificate/tenderProject' },
            //     { name: '资料', url: '/files/tenderProject' },
            //     { name: '系统', url: '/system/systemRole' },
            //     { name: '基本信息', url: '/basicInfo/basicHouseManage' }
            // ]
        };
    },
    methods: {},
    mounted() {
        // this.framework();
        // this.$nextTick(() => {
        //     let gonext = document.getElementsByClassName('.introGoNext');
        //     gonext.onclick = function () {
        //         console.log('45666++');
        //     };
        // });
    },
    created() {
        console.log('456++');
    }
};
</script>


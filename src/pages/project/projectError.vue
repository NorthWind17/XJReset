<template>
    <div id="projectError">
        <div class="main">
            <div class="content">
                <div style="margin-bottom: 50px">
                    <img src="../../assets/workbench/noPower.png" alt="" />
                </div>
                <div>
                    <div style="margin-bottom: 10px">
                        暂无权限使用，未购买正式版请您购买正式版
                    </div>
                    <div>若已购买正式版，请去订单中心将此项目绑定订单</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
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
    computed: {
        projectData() {
            return this.$store.state.projectInfo;
        }
    },
    watch: {
        projectData: {
            handler(newVal, oldVal) {
                //你需要执行的代码
                let oldUrl = this.$route.path;
                if (newVal.ppower == '1') {
                    switch (oldUrl) {
                        case '/project/projectError1':
                            this.$router.push({
                                path: '/project/projectQuality'
                            });
                            break;
                        case '/project/projectError2':
                            this.$router.push({ path: '/project/projectSafe' });
                            break;
                        case '/project/projectError3':
                            this.$router.push({ path: '/project/projectCost' });
                            break;
                        case '/project/projectError4':
                            this.$router.push({
                                path: '/project/projectContract'
                            });
                            break;
                        case '/project/projectError5':
                            this.$router.push({
                                path: '/project/projectProgress'
                            });
                            break;
                    }
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
<style lang="less" >
#projectError {
    .content {
        padding: 0.2rem 0.1rem 0 0.1rem;
        min-height: 5rem;
        text-align: center;
    }
}
</style>

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('../pages/home.vue')
    },
    //-----------首页
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/home.vue'),
        redirect: 'workbench',
        children: [
            {
                path: '/workbench',
                name: 'workbench',
                component: () => import('../pages/workbench.vue')
            }, //---------------公司用户信息
            {
                path: '/application',
                name: 'application',
                component: () => import('../pages/application.vue'),
                redirect: 'applicationUser',
                children: [
                    {
                        path: 'applicationUser',
                        name: 'applicationUser',
                        component: () =>
                            import('../pages/application/applicationUser.vue')
                    },
                    {
                        path: 'applicationOrder',
                        name: 'applicationOrder',
                        component: () =>
                            import('../pages/application/applicationOrder.vue')
                    },
                    {
                        path: 'taskMouldSet',
                        name: 'taskMouldSet',
                        component: () =>
                            import('../pages/application/taskMouldSet.vue')
                    },
                    {
                        path: 'applicationPower',
                        name: 'applicationPower',
                        component: () =>
                            import('../pages/application/applicationPower.vue')
                    }
                ]
            },
            //-----------资料路由
            {
                path: '/files',
                name: 'files',
                component: () => import('../pages/files.vue'),
                redirect: 'filesCurrent',
                children: [
                    {
                        path: 'filesCurrent',
                        component: () =>
                            import('../pages/file/filesCurrent.vue')
                    },
                    {
                        path: 'filesBack',
                        component: () => import('../pages/file/filesBack.vue'),
                        name: 'filesBack'
                    },
                    {
                        path: 'filesDynamic',
                        component: () =>
                            import('../pages/file/filesDynamic.vue'),
                        name: 'filesDynamic'
                    },
                    {
                        path: 'filesImg',
                        component: () => import('../pages/file/filesImg.vue'),
                        name: 'filesImg',
                        meta: {
                            title: 'filesImg',
                            icon: '',
                            noCache: true
                        }
                    },
                    {
                        path: 'filesModel',
                        component: () => import('../pages/file/filesImg.vue'),
                        name: 'filesModel',
                        meta: {
                            title: 'filesModel',
                            icon: '',
                            noCache: true
                        }
                    },
                    {
                        path: 'filesShare',
                        component: () => import('../pages/file/filesImg.vue'),
                        name: 'filesShare',
                        meta: {
                            title: 'filesShare',
                            icon: '',
                            noCache: true
                        }
                    },
                    {
                        path: 'filesLocal',
                        component: () => import('../pages/file/filesImg.vue'),
                        name: 'filesLocal',
                        meta: {
                            title: 'filesLocal',
                            icon: '',
                            noCache: true
                        }
                    },
                    {
                        path: 'filesAtlas',
                        component: () => import('../pages/file/filesImg.vue'),
                        name: 'filesAtlas',
                        meta: {
                            title: 'filesAtlas',
                            icon: '',
                            noCache: true
                        }
                    },
                    {
                        path: 'filesCollect',
                        // component: () => import('../pages/file/filesCollect.vue'),
                        component: () => import('../pages/file/filesImg.vue'),
                        name: 'filesCollect',
                        meta: {
                            title: 'filesCollect',
                            icon: '',
                            noCache: true
                        }
                    }
                ]
            },
            //---------项目路由
            {
                path: '/project',
                name: 'project',
                component: () => import('../pages/project.vue'),
                redirect: 'projectPanel',
                children: [
                    {
                        path: 'projectPanel',
                        name: 'projectPanel',
                        component: () =>
                            import('../pages/project/projectPanel.vue')
                    },
                    {
                        path: 'projectInfo',
                        name: 'projectInfo',
                        component: () =>
                            import('../pages/project/projectInfo.vue')
                    },
                    {
                        path: 'projectList',
                        name: 'projectList',
                        component: () =>
                            import('../pages/project/projectList.vue')
                    },
                    {
                        path: 'projectProgress',
                        name: 'projectProgress',
                        component: () =>
                            import('../pages/project/projectProgress.vue')
                    },
                    {
                        path: 'projectQuality',
                        name: 'projectQuality',
                        component: () =>
                            import('../pages/project/projectQuality.vue')
                    },
                    {
                        path: 'projectSafe',
                        name: 'projectSafe',
                        component: () =>
                            import('../pages/project/projectSafe.vue')
                    },
                    {
                        path: 'projectCost',
                        name: 'projectCost',
                        component: () =>
                            import('../pages/project/projectCost.vue')
                    },
                    {
                        path: 'projectContract',
                        name: 'projectContract',
                        component: () =>
                            import('../pages/project/projectContract.vue')
                    },
                    {
                        path: 'projectZContract',
                        name: 'projectZContract',
                        component: () =>
                            import('../pages/project/projectZContract.vue')
                    },
                    {
                        path: 'projectError1',
                        name: 'projectError1',
                        component: () =>
                            import('../pages/project/projectError.vue')
                    },
                    {
                        path: 'projectError2',
                        name: 'projectError2',
                        component: () =>
                            import('../pages/project/projectError.vue')
                    },
                    {
                        path: 'projectError3',
                        name: 'projectError3',
                        component: () =>
                            import('../pages/project/projectError.vue')
                    },
                    {
                        path: 'projectError4',
                        name: 'projectError4',
                        component: () =>
                            import('../pages/project/projectError.vue')
                    },
                    {
                        path: 'projectError6',
                        name: 'projectError6',
                        component: () =>
                            import('../pages/project/projectError.vue')
                    },
                    {
                        path: 'projectError5',
                        name: 'projectError5',
                        component: () =>
                            import('../pages/project/projectError.vue')
                    }
                ]
            },
            //---------任务路由
            {
                path: '/task',
                name: 'task',
                component: () => import('../pages/task.vue'),
                redirect: 'taskMould',
                children: [
                    {
                        path: 'taskOrder',
                        name: 'taskOrder',
                        component: () => import('../pages/task/taskOrder.vue')
                    },
                    {
                        path: 'taskMould',
                        name: 'taskMould',
                        component: () => import('../pages/task/taskMould.vue')
                    },
                    {
                        path: 'taskList',
                        name: 'taskList',
                        component: () => import('../pages/task/taskList.vue')
                    },
                    {
                        path: 'taskManyList',
                        component: () =>
                            import('../pages/task/taskManyList.vue'),
                        name: 'taskManyList',
                        meta: {
                            title: 'taskManyList',
                            icon: '',
                            noCache: true
                        }
                    }
                ]
            },
            //----------日志路由
            {
                path: '/diary',
                name: 'diary',
                component: () => import('../pages/diary.vue'),
                redirect: 'diaryAdd',
                children: [
                    {
                        path: 'diaryOrder',
                        name: 'diaryOrder',
                        component: () => import('../pages/diary/diaryOrder.vue')
                    },
                    {
                        path: 'diaryList',
                        name: 'diaryList',
                        component: () => import('../pages/diary/diaryList.vue')
                    },
                    {
                        path: 'diaryPrintList',
                        name: 'diaryPrintList',
                        component: () =>
                            import('../pages/diary/diaryPrintList.vue')
                    },
                    {
                        path: 'diaryAdd',
                        name: 'diaryAdd',
                        component: () => import('../pages/diary/diaryAdd.vue')
                    }
                ]
            }
        ]
    },

    {
        path: '/error',
        name: 'error',
        component: () => import('../pages/error.vue')
    },
    {
        path: '/errorPower',
        name: 'errorPower',
        component: () => import('../pages/errorPower.vue')
    }
];

const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    if (to.path === '/error' || to.path === '/errorPower') {
        next();
    } else {
        let token = sessionStorage.getItem('ucadmin');
        let tlength = sessionStorage.getItem('uclength');
        let errorCode = sessionStorage.getItem('errorCode');
        if (token == 0 && tlength == 0) {
            // Vue.prototype.$message({
            //     message: '已到期，请去购买升级',
            //     center: true,
            //     duration: 2000,
            //     type: 'warning'
            // });
            next('/error');
        } else if (errorCode == 2) {
            next('/errorPower');
        } else {
            next();
        }
    }
});
export default router;

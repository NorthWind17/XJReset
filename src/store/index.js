import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        HeightS: '',
        // cNameTwo:"",
        // cNameThree:"",
        // cNameFour:"",
        // cNameT:"",
        cid: sessionStorage.getItem('cid'),
        spaceId: sessionStorage.getItem('cid'),
        userInfo: {
            uid: sessionStorage.getItem('uid'),
            uname: sessionStorage.getItem('uname'),
            avatar: sessionStorage.getItem('avatar'),
            deptid: sessionStorage.getItem('deptid'),
            spaceid: sessionStorage.getItem('spaceid'),
            admin: sessionStorage.getItem('admin'),
            first: sessionStorage.getItem('first'),
            phone: sessionStorage.getItem('phone')
        },
        projectInfo: {
            pname: sessionStorage.getItem('pname'),
            pid: sessionStorage.getItem('pid'),
            purl: sessionStorage.getItem('purl'),
            pperctentage: sessionStorage.getItem('pperctentage'),
            ptag: sessionStorage.getItem('ptag'),
            plength: sessionStorage.getItem('plength'),
            pstatus: sessionStorage.getItem('pstatus'),
            ppower: sessionStorage.getItem('ppower')
        }
    },
    mutations: {
        //获取钉盘自定义空间ID
        setSpaceId(state, spaceid) {
            state.userInfo.spaceid = spaceid;
            sessionStorage.setItem('spaceid', spaceid);
        },
        //获取用户权限
        setAdmin(state, admin) {
            state.userInfo.admin = admin;
            sessionStorage.setItem('admin', admin);
        },
        setPhone(state, phone) {
            state.userInfo.phone = phone;
            sessionStorage.setItem('phone', phone);
        },
        //获取用户初次进入
        setFirst(state, first) {
            state.userInfo.first = first;
            sessionStorage.setItem('first', first);
        },
        Heights(state, val) {
            state.HeightS = val;
            return state.HeightS;
        },
        //选择的项目
        setProjectName(state, pname) {
            state.projectInfo.pname = pname;
            sessionStorage.setItem('pname', pname);
        },
        setProjectId(state, pid) {
            state.projectInfo.pid = pid;
            sessionStorage.setItem('pid', pid);
        },
        setPStatus(state, ps) {
            state.projectInfo.pstatus = ps;
            sessionStorage.setItem('pstatus', ps);
        },
        setPPower(state, pp) {
            state.projectInfo.ppower = pp;
            sessionStorage.setItem('ppower', pp);
        },
        setPLength(state, pl) {
            state.projectInfo.plength = pl;
            sessionStorage.setItem('plength', pl);
        },
        setProjectPurl(state, purl) {
            state.projectInfo.purl = purl;
            sessionStorage.setItem('purl', purl);
        },
        setPerctentage(state, pperctentage) {
            state.projectInfo.pperctentage = pperctentage;
            sessionStorage.setItem('pperctentage', pperctentage);
        },
        setPTag(state, ptag) {
            state.projectInfo.ptag = ptag;
            sessionStorage.setItem('ptag', ptag);
        },
        //获取用户名
        setName(state, uname) {
            state.userInfo.uname = uname;
            sessionStorage.setItem('uname', uname);
        },
        //获取用户id
        setUid(state, userid) {
            state.userInfo.uid = userid;
            sessionStorage.setItem('uid', userid);
        },
        //获取用户部门id
        setDeptId(state, deptid) {
            state.userInfo.deptid = deptid;
            sessionStorage.setItem('deptid', deptid);
        },
        setCid(state, cid) {
            state.cid = cid;
            sessionStorage.setItem('cid', cid);
        },
        setAvatar(state, avatar) {
            state.userInfo.avatar = avatar;
            sessionStorage.setItem('avatar', avatar);
        },
        //钉盘存储空间id
        setSpaceId(state, spaceId) {
            state.spaceId = spaceId;
            sessionStorage.setItem('spaceId', spaceId);
        }
        // cNameTwoS(state, val) {
        //   state.cNameTwo = val
        //   return state.cNameTwo
        // },
        // cNameThreeS(state, val) {
        //   state.cNameThree = val
        //   return state.cNameThree
        // },
        // cNameFourS(state, val) {
        //   state.cNameFour = val
        //   return state.cNameFour
        // },
        // cNameTS(state, val) {
        //   state.cNameT = val
        //   return state.cNameT
        // },
    },
    actions: {},
    getters: {},
    modules: {}
});

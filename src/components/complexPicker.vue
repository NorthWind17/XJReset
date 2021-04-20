<template>
    <div id="complexPicker">
        <!-- 通讯录组件 -->
        <div class="pickerMain">
            <div class="pickerLeft">
                <div>
                    <el-tag
                        v-for="tag in dynamicTags"
                        :key="tag.name"
                        closable
                        @close="handleClose(tag)"
                    >
                        {{ tag.name }}
                    </el-tag>
                    <div class="search-list">
                        <input class="prSearch" @keyup="getPeople($event)" autofocus="autofocus" v-model="searchName" placeholder="搜索"></input>
                        <div class="search-select" v-if="showList">
                            <div v-if="!searchData">暂无此人</div>
                            <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
                                <li
                                    v-for="(item,index) in searchData"
                                    :key="index"
                                    class="search-select-option search-select-list"
                                    @click="selectClick(item,index)"
                                >
                                <div><img v-if="item.avatar" :src="item.avatar" alt=""> <span></span></div>
                                <div>
                                    <div>{{item.name}}</div>
                                    <div>{{item.corp_name}}</div>
                                </div>
                                </li>
                            </transition-group>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pickerRight">
                <div>
                    <div class="prTitle">{{prUTitle}}</div>
                    <div class="breadContent">
                        <i
                            class="el-icon-arrow-left"
                            v-if="breadList.length > 1"
                            @click="goBackFile"
                        ></i>
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item
                                v-for="(item, index) in breadList"
                                :key="index"
                                @click.native="goFile(item, index)"
                                >{{ item.name }}</el-breadcrumb-item
                            >
                        </el-breadcrumb>
                    </div>
                    <div class="pickerBottomMain">
                        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange($event)">
                            <div v-for="item in pickerPeolple" :key="item.emplId">
                                <el-checkbox  :label="item" >
                                    <span>{{item.name}}</span>
                                </el-checkbox>
                                <span @click="goNext(item)" style="font-size: 14px;">下一级</span>
                            </div>
                        </el-checkbox-group> -->
                        <el-checkbox
                            :indeterminate="isIndeterminate"
                            v-model="checkAll"
                            @change="
                                handleCheckAllChange(
                                    $event
                                )
                            "
                            >全选</el-checkbox
                        >
                        <div v-for="(item, index) in pickerPeolple" class="pbPeopleList">
                            <el-checkbox
                                :label="item.emplId"
                                v-model="item.checkAll"
                                :key="index"
                                @change="
                                    handlecheckedRoleChange(
                                        $event,
                                        item,
                                        index
                                    )
                                "
                                >
                                <span class="youPic" v-if="item.avatar && item.leixing ==2"><img :src="item.avatar" alt=""></span>
                                <span class="noPic" v-if="!item.avatar && item.leixing ==2"></span>
                                <span>{{ item.name }}</span>
                            </el-checkbox>
                            <span class="pbpR" v-if="item.leixing == 1" :class="item.checkAll?'lockNext':''" @click="goNext(item)" style="font-size: 14px;"><i class="el-icon-share"></i> 下一级</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div style="width: 49%;text-align:center;">
            <el-button type="primary" round @click="checkBtn">确定</el-button>
            <el-button round @click="checkCancel">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'complexPicker',
    props: {
        pickerNum: {
            type: Number
        }
    },
    data() {
        return {
            breadList: [{ name: '公司列表', id: 1 }],
            isIndeterminate: true,
            checkedCities: [],
            checkAll: false,
            pickerPeolple: [],
            dynamicTags: [],
            currentID: 1,
            searchName: '',
            prUTitle: '企业',
            peopleNum: this.pickerNum,
            searchData: [],
            showList: false,
            hoverIndex: -1,
            getChangeVal: []
        };
    },
    methods: {
        //全选
        handleCheckAllChange(e) {
            //更改全选按钮状态
            this.checkAll = e;
            if (e == false) {
                this.isIndeterminate = true;
            } else {
                this.isIndeterminate = false;
            }
            //根据全选按钮状态选中单选
            for (let i = 0, len = this.pickerPeolple.length; i < len; i++) {
                this.pickerPeolple[i].checkAll = e;
            }
            let selectArr = []; //已选择数据
            let noneArray = []; //未选中数据
            this.pickerPeolple.forEach(ele => {
                if (ele.checkAll) {
                    selectArr.push(ele);
                } else {
                    noneArray.push(ele);
                }
            });
            // this.dynamicTags = this.$utils.unique(this.dynamicTags);
            this.handleSelectionChange(selectArr); //计算选中数是否超过规定值
            //为湘中数据左右联动
            //对比右侧取消选中和左侧展示数据，如果两者有相同值，去掉相同值
            let newArr = [];
            let newS = this.dynamicTags;
            if (noneArray.length > 0) {
                for (var i = 0; i < noneArray.length; i++) {
                    var obj = noneArray[i];
                    var num = obj.emplId;
                    var isExist = false;
                    for (var j = 0; j < newS.length; j++) {
                        var aj = newS[j];
                        var n = aj.emplId;
                        if (n == num) {
                            isExist = true;
                            break;
                        }
                    }
                    if (!isExist) {
                        newArr.push(aj);
                    }
                }
                this.dynamicTags = newArr;
            }
        },
        //单选
        handlecheckedRoleChange(e, item, index) {
            //根据单选数量和当前级总数量对比决定是否全选
            let tickCount = 0,
                unTickCount = 0;
            let noneArray = [];
            item.checkAll = e;
            for (let i = 0; i < this.pickerPeolple.length; i++) {
                if (this.pickerPeolple[i].checkAll == true) tickCount++;
                if (this.pickerPeolple[i].checkAll == false) unTickCount++;
            }
            if (tickCount == this.pickerPeolple.length) {
                //子级全勾选
                this.checkAll = true;
                this.isIndeterminate = false;
            } else if (
                unTickCount == this.pickerPeolple.length ||
                tickCount < this.pickerPeolple.length
            ) {
                //子级全不勾选或没有全勾选
                this.checkAll = false;
                this.isIndeterminate = true;
            } else {
                this.checkAll = false;
                this.isIndeterminate = true; //添加不确定状态
            }
            this.pickerPeolple = this.pickerPeolple.concat(noneArray);
            let noselectArray = []; //未选中数据
            this.pickerPeolple.forEach(ele => {
                if (ele.checkAll) {
                    this.dynamicTags.push(ele);
                } else {
                    noselectArray.push(ele);
                }
            });
            // this.dynamicTags = this.$utils.unique(this.dynamicTags);
            this.handleSelectionChange(this.dynamicTags);
            //左右数据联动
            //对比左侧展示数据和右侧未选中数据，如果相同，去掉
            let newArr = [];
            let newS = this.dynamicTags;
            if (noselectArray.length > 0) {
                this.dynamicTags.forEach(item => {
                    noselectArray.forEach(element => {
                        if (item.emplId == element.emplId) {
                            // selectArr.push(item);
                            this.dynamicTags.splice(
                                this.dynamicTags.indexOf(item),
                                1
                            );
                        }
                    });
                });
            }
        },
        // handleCheckAllChange(val) {
        //     this.checkedCities = val ? this.pickerPeolple : [];

        //     this.isIndeterminate = false;
        //     console.log('555++' + JSON.stringify(this.checkedCities));
        //     console.log('666++' + val);
        //     if (this.checkedCities.length > 0) {
        //         this.handleSelectionChange(this.checkedCities);
        //     } else {
        //         let selectArr = [];
        //         if (this.dynamicTags.length > 0) {
        //             console.log('全选11++' + JSON.stringify(this.dynamicTags));
        //             console.log(
        //                 '全选22++' + JSON.stringify(this.pickerPeolple)
        //             );
        //             let newArr = [];
        //             newArr = this.dynamicTags.filter(
        //                 item =>
        //                     !this.pickerPeolple.some(
        //                         ele => ele.emplId === item.emplId
        //                     )
        //             );
        //             this.dynamicTags = JSON.parse(JSON.stringify(newArr));
        //             console.log('全选对比后数据++' + JSON.stringify(newArr));
        //         }
        //     }
        // },
        handleCheckedCitiesChange(e) {
            let checkedCount = e.length;
            this.checkAll = checkedCount === this.pickerPeolple.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.pickerPeolple.length;

            console.log('999++' + JSON.stringify(e));
            this.handleSelectionChange(e);
            if (e) {
                let newArr = [];
                let newS = e;
                for (var i = 0; i < this.pickerPeolple.length; i++) {
                    var obj = this.pickerPeolple[i];
                    var num = obj.emplId;
                    var isExist = false;
                    for (var j = 0; j < newS.length; j++) {
                        var aj = newS[j];
                        var n = aj.emplId;
                        if (n == num) {
                            isExist = true;
                            break;
                        }
                    }
                    if (!isExist) {
                        newArr.push(obj);
                    }
                }
                console.log('右侧对比未选中数据++' + JSON.stringify(newArr));
                let selectArr = [];
                if (newArr.length > 0) {
                    this.dynamicTags.forEach(item => {
                        newArr.forEach(element => {
                            if (item.emplId == element.emplId) {
                                // selectArr.push(item);
                                this.dynamicTags.splice(
                                    this.dynamicTags.indexOf(item),
                                    1
                                );
                            }
                        });
                    });
                    console.log(
                        '单选对比后数据++' + JSON.stringify(this.dynamicTags)
                    );
                }
            }
        },
        getPeople(e) {
            const _this = this;
            if (e.keyCode == 38 || e.keyCode == 40) {
                return false;
            }
            _this.showList = true;
            _this.$axios
                .post('/cy_xiezhu/ProjectUserList', {
                    id: '',
                    xmid: _this.$store.state.projectInfo.pid,
                    name: _this.searchName
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.searchData = res.data.content;
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        },
        selectClick(item, index) {
            this.showList = false;
            this.dynamicTags.push(item);
            this.searchName = '';
            this.dynamicTags.forEach(item => {
                this.pickerPeolple.forEach(ele => {
                    if (item.emplId == ele.emplId) {
                        ele.checkAll = true;
                    }
                });
            });
        },
        checkBtn() {
            this.$emit('listenPicker', this.dynamicTags, 1);
            this.dynamicTags = [];
            this.checkAll = false;
            this.isIndeterminate = true;
            this.pickerPeolple.forEach(item => {
                item.checkAll = false;
            });
        },
        checkCancel() {
            this.$emit('listenPicker', this.dynamicTags, 2);
            this.dynamicTags = [];
            this.checkAll = false;
            this.isIndeterminate = true;
            this.pickerPeolple.forEach(item => {
                item.checkAll = false;
            });
        },
        sum(arr) {
            var s = 0;
            for (var i = arr.length - 1; i >= 0; i--) {
                s += arr[i];
            }
            return s;
        },
        toggleSelection(rows) {
            const _this = this;
            let peoArr = [];

            if (rows) {
                rows.forEach(row => {
                    _this.pickerPeolple.find(item => {
                        if (row.emplId == item.emplId) {
                            peoArr.push(item);
                            item.checkAll = true;
                        }
                    });
                });
            }
            if (peoArr.length > 0) {
                // _this.checkedCities = peoArr;
                if (peoArr.length == _this.pickerPeolple.length) {
                    _this.checkAll = true;
                    _this.isIndeterminate = false;

                    _this.pickerPeolple.forEach(item => {
                        item.checkAll = true;
                    });
                }
            }
        },
        handleSelectionChange(val) {
            const _this = this;
            // _this.getChangeVal = val;
            let newPeople = JSON.parse(JSON.stringify(_this.dynamicTags)),
                sumArr = [],
                num = 0;

            val.forEach(item => {
                newPeople.push(item);
            });
            newPeople = _this.$utils.unique(newPeople);
            sumArr = newPeople.map(item => {
                if (!item.renshu) return '';
                return Number(item.renshu);
            });
            //选中的人员数量
            num = _this.sum(sumArr);
            console.log('规定的数量++' + _this.peopleNum);
            console.log('选中的数量++' + num);
            if (_this.peopleNum >= num) {
                _this.dynamicTags = newPeople;
            } else {
                _this.$message.warning('超出人员选择数量！');
                return false;
                // _this.$refs.multipleTable.clearSelection();
            }
        },
        //返回上一层文件夹
        goBackFile() {
            this.breadList.pop();
            this.currentID = this.breadList[this.breadList.length - 1].id;
            this.getPickList();
        },
        goFile(item, index) {
            if (item.id != this.currentID) {
                this.breadList = this.breadList.splice(0, index + 1);
                this.currentID = item.id;
                this.getPickList();
            }
        },
        //删除左侧数据。联动右侧数据
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            this.pickerPeolple = JSON.parse(JSON.stringify(this.pickerPeolple));
            let selectPeolple = [];

            this.pickerPeolple.forEach(ele => {
                if (ele.emplId == tag.emplId) {
                    ele.checkAll = false;
                }
                if (ele.checkAll) {
                    selectPeolple.push(ele);
                }
            });
            //对比长度更改全选按钮状态
            let cindex = selectPeolple.length,
                pindex = this.pickerPeolple.length;
            if (cindex == pindex) {
                this.checkAll = true;
                this.isIndeterminate = false;
            } else {
                this.checkAll = false;
                this.isIndeterminate = true;
            }
        },
        formateArrObjData(initialArr, obj, pro) {
            if (initialArr.findIndex(val => val[pro] === obj[pro]) == -1) {
                initialArr.push(obj);
            }
            return initialArr;
        },
        goNext(item) {
            if (!item.checkAll) {
                this.currentID = item.id;
                this.prUTitle = item.corp_name;
                this.formateArrObjData(this.breadList, item, 'id');
                this.getPickList();
            }
        },
        getPickList() {
            const _this = this;
            _this.$axios
                .post('/cy_xiezhu/ProjectUserList', {
                    id: _this.currentID,
                    xmid: _this.$store.state.projectInfo.pid,
                    name: ''
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.pickerPeolple = res.data.content;

                        this.pickerPeolple = this.pickerPeolple.map(item => {
                            return Object.assign(item, {
                                isIndeterminate: false,
                                checkAll: false
                            });
                        });
                        this.isIndeterminate = false;
                        this.checkAll = false;
                        if (_this.dynamicTags.length > 0) {
                            //左侧是否有数据决定新加载数据的状态
                            _this.toggleSelection(_this.dynamicTags);
                        }
                    } else {
                        _this.$message.warning(`${res.data.msg}`);
                    }
                });
        }
    },
    mounted() {
        this.currentID = 1;
        this.getPickList();
    }
};
</script>

<style>
</style>
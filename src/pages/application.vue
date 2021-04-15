<template>
    <div id="application">
        <div class="application-left">
            <menuS :viewMenu="viewMenu" />
        </div>
        <div ref="elementS" class="application-right">
            <router-view />
        </div>
    </div>
</template>

<script>
import menuS from '@/components/menuS.vue';
export default {
    name: 'application',
    data() {
        return { viewMenu: 5 };
    },
    components: {
        menuS
    }
};
</script>

<style lang="less">
#application {
    display: flex;
    .application-left {
        background: white;
        height: 90vh;
    }
    .application-right {
        height: 90vh;
        //新
        // height: 90vh;
        overflow-y: auto;
        overflow-x: hidden;
    }
}
</style>
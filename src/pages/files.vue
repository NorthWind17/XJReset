<template>
    <div id="files">
        <div class="files-left">
            <menuS :viewMenu="viewMenu" />
        </div>
        <div class="files-right">
            <router-view />
        </div>
    </div>
</template>
<script>
import menuS from '@/components/menuS.vue';
export default {
    data() {
        return { viewMenu: 3 };
    },
    components: {
        menuS
    },
    mounted() {}
};
</script>
<style lang="less" scoped>
#files {
    display: flex;
    .files-left {
        background: white;
    }
    .files-right {
        width: 16.4rem;
        height: 90vh;
    }
}
</style>
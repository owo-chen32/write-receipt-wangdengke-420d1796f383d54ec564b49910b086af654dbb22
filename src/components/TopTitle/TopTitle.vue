<template>
    <div class="index-top">
        {{ title }}
        <i @click="goback"></i>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
    // 标题
    title: {
        type: String,
        default: "",
    },
});
// 返回的方法
const goback = () => {
    router.back();
};
</script>

<style lang="less" scoped>
.index-top {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    background: url("/src/assets/images/title_bg.png") center center no-repeat;
    background-size: cover;
    color: #fff;
    text-align: center;
    position: fixed;
    top: 0;
    font-size: 0.16rem;

    i {
        display: block;
        width: 0.25rem;
        height: 0.25rem;
        background: url("/src/assets/images/arrow.png") center center no-repeat;
        background-size: cover;
        position: absolute;
        top: 0.1rem;
        left: 0.1rem;
    }
}
</style>
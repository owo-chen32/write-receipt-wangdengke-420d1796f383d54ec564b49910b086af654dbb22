<template>
    <div class="index-container pt50">
        <TopTitle title="扫码开票"></TopTitle>
        <div class="index-content">
            <div class="content-title">请填写您的车牌号码</div>
            <NewInput :payPlate="plate" ref="inputNum"></NewInput>
            <button class="content-btn" @click="goWriteReceipt">去开票</button>
        </div>
    </div>
</template>

<script setup>
import NewInput from "@/components/KeyBoard/NewInput.vue";
import TopTitle from "@/components/TopTitle/TopTitle.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCarStore } from "@/store/index";
// import { storeToRefs } from "pinia";
// console.log(
//     import.meta.env.VITE_APP_DEV_URL,
//     "import.meta.env.VITE_APP_DEV_URL"
// );

const route = useRoute();
const router = useRouter();
// 车牌号
const plate = ref("");
const inputNum = ref("");
// 给车牌号赋值
// plate.value = route.query.plate || "";
// 点击去开票触发的方法
const goWriteReceipt = () => {
    const num = inputNum.value?.arr.plate.join("");
    if (num.length < 7) return;
    router.push({ name: "parkingticket", query: { num } });
};

const store = useCarStore();
// 修改状态库中的plate值
store.plate = plate.value;
</script>

<style lang="less" scoped>
.index-container {
    .index-content {
        height: 2.5rem;
        background-color: #fff;
        margin: 0.08rem;
        border-radius: 0.05rem;
        overflow: hidden;
        position: relative;

        .content-title {
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            font-size: 0.2rem;
            margin: 0.2rem 0;
        }

        .content-btn {
            width: 80%;
            height: 0.4rem;
            margin: 0 10% 0.2rem;
            border-radius: 0.2rem;
            background-color: #5e6deb;
            font-size: 0.18rem;
            color: #fff;
            outline: none;
            border: 0;
            position: absolute;
            bottom: 0.1rem;
        }
    }
}
</style>
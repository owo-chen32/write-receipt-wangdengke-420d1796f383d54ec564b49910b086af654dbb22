<template>
    <div class="parking-ticket-container pt50">
        <TopTitle title="待开票列表"></TopTitle>
        <div class="content">
            <MakeTiket :list="list"></MakeTiket>
        </div>
        <div v-if="!list.length">
            <div class="bth_ts">
                <img src="/src/assets/images/blank.png" alt="" />
            </div>
            <div class="span">您没有可开票的订单记录哦!</div>
        </div>
    </div>
</template>

<script setup>
import TopTitle from "@/components/TopTitle/TopTitle.vue";
import MakeTiket from "@/components/MakeTiket/MakeTiket.vue";
import { useRoute } from "vue-router";
import { getInvoiceApi } from "@/api/applybilling";
import { onMounted, ref } from "vue";

const route = useRoute();

import { useCarStore } from "@/store/index";
const store = useCarStore();

// 开票列表数据
const list = ref([]);

// 获取开票列表的方法
const getInvoice = async () => {
    let res = await getInvoiceApi({
        plate: route.query.num,
        invoiceStatus: 0,
    });
    list.value = res.data;
};

// 调用获取开票列表的方法
onMounted(() => {
    getInvoice();
});
</script>
<style lang='less' scoped>
.parking-ticket-container {
    width: 100%;
    background-color: #f1f4fc;
    .content {
        width: 100%;
        height: auto;
    }
}
.bth_ts {
    img {
        width: 150px;
        display: block;
        margin: 251px auto 0;
    }
}
.span {
    font-size: 16px;
    margin-left: 90px;
    font-weight: bolder;
}
</style>
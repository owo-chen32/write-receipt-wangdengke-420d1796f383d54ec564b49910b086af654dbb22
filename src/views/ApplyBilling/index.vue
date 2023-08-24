<template>
  <div class="apply-billing-container pt50">
    <TopTitle title="申请开票"></TopTitle>
    <div class="ab-content">
      <div class="ab-money">
        <div class="ab-money-tit">开票金额：￥</div>
        <div class="ab-money-money">{{ que_data.money }}</div>
      </div>
      <div class="ab-type">
        <div class="ab-type-tit">电子发票抬头类型</div>
        <div class="radio-btn">
          <van-button
            :class="activeIndex == index ? 'active' : ''"
            v-for="(item, index) in tabs"
            :key="index"
            @click="chageTabs(index)"
            >{{ item.name }}</van-button
          >
        </div>
        <component :is="currentComponent.com"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopTitle from "@/components/TopTitle/TopTitle.vue";
import Computer from "@/components/Computer/index.vue";
import Person from "@/components/Person/index.vue";
import { reactive, ref, shallowRef } from "vue";
import { showDialog } from "vant";
import { writeReceiptApi } from "@/api/applybilling";
import { useCarStore } from "@/store/index";
import { useRoute } from "vue-router";
const route = useRoute();
// 路由参数
const que_data = route.query;

const store = useCarStore();
// 个人按钮是否选中
const isShowPerson = ref(false);
// 是否展示纳税人识别号
const isShowTaxpayer = ref(true);
// 发票抬头数据
const buyerName = ref("");
// 纳税人识别号数据
const buyerTaxNo = ref("");
// 收票人邮箱
const buyerEmail = ref("");
/**sdsd */
const tabs = ref([
  {
    name: "个人",
    path: Person,
  },
  {
    name: "公司",
    path: Computer,
  },
]);
const currentComponent = reactive({
  com: Computer,
});

// 选择的tabs
const activeIndex = ref(1);

// 发票
const write_list = ref({});

// 确定提交
const sure = async (values) => {
  console.log(values);
  //   return;
  // 入参
  const params = {
    // 订单号
    order_no: que_data.order_no,
    // 发票抬头
    buyerName: write_list.value.buyerName,
    // 纳税人识别号
    buyerTaxNo: write_list.value.buyerTaxNo,
    // 收票人邮箱
    buyerEmail: write_list.value.buyerEmail,
    // 金额
    goodsTotalPrice: que_data.money,
  };

  if (write_list.buyerName) {
    write_list.buyerName = false;
  }
  // 回包
  const res = await writeReceiptApi(params);
  if (res.code === 1) {
    showDialog({
      title: "开票申请成功",
      // message: "您的电子发票已发送至预留邮箱" + buyerEmail.value + "@qq.com",
      message: "您的电子发票已发送至预留邮箱" + `${params.buyerEmail}`,
    });
  }
  // else {
  //     showDialog({
  //         title: "开票申请失败",
  //         message: "仅支持1个月内的订单开具发票,请核对时间后重试。",
  //     });
  // }
};
// tabs切换
const chageTabs = (i) => {
  activeIndex.value = i;
  console.log(tabs.value[i].path);
  currentComponent.com = tabs.value[i].path;
};
// 点击个人的操作方法
const person = () => {
  write_list.value = {
    buyerName: "",
    buyerEmail: "",
  };
  // 隐藏纳税人识别号
  isShowTaxpayer.value = false;
  isShowPerson.value = true;
};
// 点击单位的操作方法
const computer = () => {
  write_list.value = {
    buyerName: "",
    buyerTaxNo: "",
    buyerEmail: "",
  };
  // 展示纳税人识别号
  isShowTaxpayer.value = true;
  isShowPerson.value = false;
};
</script>
<style lang="less">
.content-btn {
  width: 80%;
  height: 0.4rem;
  margin: 0.2rem 10%;
  border-radius: 0.05rem;
  background-color: #5e6deb;
}
</style>
<style lang="less" scoped>
.apply-billing-container {
  .ab-money {
    margin: 0.08rem;
    background-color: #fff;
    height: 0.8rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0.1rem;
    font-size: 0.2rem;
  }

  .ab-type {
    margin: 0.08rem;
    background-color: #fff;
    // padding: 0.15rem 0.08rem;
    font-size: 0.14rem;
    .ab-type-tit {
      padding: 0.15rem 0 0 0.08rem;
    }
    .radio-btn {
      margin: 0.3rem 0;
      display: flex;
      justify-content: space-around;

      .van-button {
        width: 1.2rem;
        height: 0.4rem;
        border-radius: 8px;
        background-color: #d6d9e0;

        &.active {
          background-color: #fff;
          border: 0.01rem solid #5e6deb;
          color: #5e6deb;
        }
      }
    }
  }
}

.custom-field::before {
  content: "";
  display: block;
  width: 100%;
  border-bottom: #e1e2e4 0.1px solid;
  // background-color: #ccc;
  position: relative;
  top: 55px;
  // margin-top: 4px;
}
:deep(.van-field) {
  border: transparent !important;
}
</style>

<template>
    <div class="box">
        <van-popup v-model:show="show" close-icon="close" round>
            <!-- <div :class="!err.code ? 'img0' : 'img1'"> -->
            <div :class="isRoute ? 'img0' : iconimg(err.data.scanCode, 0)">
                <!-- <img :src="err.img_src" alt="" /> -->
            </div>
            <p>{{ isRoute ? err.msg : err.data.msg }}</p>
            <Lines></Lines>
            <div class="ok" @click="close">知道了</div>
        </van-popup>
    </div>
</template>

<script setup>
import Lines from "@/components/Lines/lines.vue";
import { ref, defineProps, defineExpose, watch, onMounted } from "vue";
import { useStopStore } from "@/store/stop";
import { storeToRefs } from "pinia";
const useStore = useStopStore();
const { isShow } = storeToRefs(useStore);
const show = ref(false);
const props = defineProps({
    err: {
        type: Object,
        requied: true,
    },
    isRoute: {
        type: Boolean,
        default: false,
    },
});

/* const aaa = {
  code:err.code,
  data:{
    msg:err.code
  }
} */

let errData = {};

const errdata = ref({});
const img_src = ref({
    img_src: props.err.img_src,
});
const open = (res) => {
    /*  if(!res.code){
    errData = {
      code:res.code,
      data:{
        scanCode:0,
        msg:res.msg
      }
    }
  }else{
    errData = res
     
  }
    */

    show.value = true;
};
const close = () => {
    show.value = false;
};

watch(
    () => show.value,
    (newValue, oldValue) => {
        if (newValue) {
            isShow.value = false;
        }
    },
    { deep: true, immediate: true }
);

const iconimg = (scanCode, es) => {

    if (scanCode == "undefined") {
        scanCode = es;
    }
    let icons = "";
    switch (
    scanCode // 这个抽时间试试 || 简短一点
    ) {
        case -1:
            icons = "img0";
            break;
        case 0:
            icons = "img0";
            break;
        case 1:
            icons = "img1";
            break;
        case 2:
            icons = "img1";
            break;
        case 3:
            icons = "img0";
            break;
        case 4:
            icons = "img0";
            break;
        case 5:
            icons = "img0";
            break;
        case 6:
            icons = "img0";
            break;
        case 7:
            icons = "img1";
            break;
        case 8:
            icons = "img0"; //不在场
            break;
        case 9:
            icons = "img1"; // 月租套餐
            break;
        case 10:
            icons = "img0"; /** 临时车费用 */
            break;
        case 11:
            icons = "img0"; /** 通道没有收费车辆 */
            break;
        case 12:
            icons = "img1"; /** 停车未产生费用 */
            break;
        case 13:
            icons = "img0"; /** 密码错误 */
            break;
        case 14:
            icons = "img1"; /** 密码正确 */
            break;
        case 15:
            icons = "img1"; /** 通道有收费车辆 */
            break;
        case 16:
            icons = "img0"; /** 数据保存异常 */
            break;
        case 17:
            icons = "img0"; /** 无收费标准信息 */
            break;
        case 18:
            icons = "img0"; /** 无用户信息 */
            break;
        case 19:
            icons = "img0"; /** 无通道信息 */
            break;
        case 20:
            icons = "img0"; /** 无车场信息 */
            break;
        case 21:
            icons = "img0"; /** 未扫到车牌，请倒车重试 */
            break;
        case 22:
            icons = "img1"; /** 有压地感应 */
            break;
        case 23:
            icons = "img0"; /** 费用计算异常 */
            break;
        case 24:
            icons = "img1"; /** 免费车 */
            break;
        case 25:
            icons = "img0"; /** 车辆在场 */
            break;
        case 26:
            icons = "img0"; /**  已出场*/
            break;
        case 27:
            icons = "img0"; /** 缺少参数 */
            break;
        case 28:
            icons = "img0"; /** 重复出场 */
            break;
        case 29:
            icons = "img0"; /** 未完成订单支付 */
            break;
        case 30:
            icons = "img0"; /** 超出支付后允许的离场时间,需要重新支付离场! */
            break;
        case 31:
            icons = "img0"; /** 储值车 */
            break;
        case 32:
            icons = "img0"; /** 临时车 */
            break;
    }
    return icons;
};

defineExpose({ open, close });
onMounted(() => {
    //  
    //  
});
//
</script>

<style lang="scss" scoped>
.box {
    :deep(.van-popup) {
        display: flex;
        flex-direction: column;
        // flex-wrap: wrap;
        // justify-content: center;
        align-items: center;
        width: 20.38rem;
        // height: 12.5rem;
        height: auto;
        background: #ffffff;
        border-radius: 0.5rem;
        overflow: hidden;
        border-radius: 0.67rem;
        padding: 1rem 1.5rem 0;

        // text-align: center;
        .img1 {
            width: 2.88rem;
            height: 2.88rem;
            // width: 3.13rem;
            // height: 3.13rem;
            // background: url("../../assets/images/ico_tip_ok.png") no-repeat center;
            background: url("~@/assets/images/ico_tip_ok.png") no-repeat center;
            background-size: contain;
            border-radius: 50%;
        }

        .img0 {
            width: 2.88rem;
            height: 2.88rem;
            // background: url("../../assets/images/no.png") no-repeat center;
            background: url("~@/assets/images/no.png") no-repeat center;
            background-size: contain;
            border-radius: 50%;
        }

        p {
            margin: 1rem auto 2rem;
            /* display: inline-block;
    width: 23.17rem;
    height: 2rem; */
            padding: 0 2.5rem;
            height: auto;
            font-size: 0.88rem !important;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #071836;
            line-height: 1.5rem;
        }

        .ok {
            // width: 23.17rem;
            align-self: flex-end;
            height: 3.5rem;
            font-size: 1rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #0052d9;
            text-align: center;
            line-height: 3.5rem;
            margin: 0 auto;
        }
    }
}</style>
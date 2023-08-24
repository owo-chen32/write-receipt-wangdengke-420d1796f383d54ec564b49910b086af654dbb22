<template>
    <div class="container">
        <div
            class="ticket"
            v-for="(item, index) in props.list"
            :key="index"
            @click="getlist_id(item)"
        >
            <!-- 票据头部 -->
            <div class="ticket_top">
                <div
                    class="radios"
                    :class="{ radfalsh: item.checked }"
                    @click="isradios(index)"
                ></div>
                <div class="ticket_plateright">
                    <div class="platestyle">{{ item.plate }}</div>
                    <div class="platehint" v-if="item.order_type === 0">
                        临停缴费
                    </div>
                    <div class="platehint" v-else>月租车充值</div>
                </div>
            </div>
            <!-- 票据分界线 -->
            <div class="lines"></div>
            <!-- 票据内容 -->
            <div class="ticket_content">
                <div class="content_left">
                    <div class="ticket_data">
                        <span class="data_left">支付时间</span
                        ><span class="data_right">{{
                            dayjs(new Date(item.update_time)).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        }}</span>
                    </div>
                </div>
                <div class="content_right">
                    {{ item.money }}<span class="money">元</span>
                </div>
            </div>
        </div>

        <div class="transparent"></div>

        <div class="bottom_invoice" v-if="list_id">
            <!-- 去开票 -->
            <van-button
                type="primary"
                class="put_invoice"
                @click="sureWriteReceipt"
                >确认开票</van-button
            >
            <div class="put_money">
                开票金额：<span class="bignums">{{ writeReceiptMoney }}</span
                >元
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useCarStore } from "@/store/index";
import dayjs from "dayjs";
const router = useRouter();
const store = useCarStore();
const list_id = ref(null);

// 父组件传来的值
const props = defineProps({
    // 待开票列表
    list: {
        type: Array,
        default: [],
    },
});

// 接口数据
let writeMoney = {
    order_no: "", // 订单号
    buyerName: "", //购买方姓名
    buyerEmail: "", // 购买邮箱
    goodsTotalPrice: "", // 金额
};

// 路由传参
const quedata = ref({});

// 开票金额
let writeReceiptMoney = ref(0);
// 勾选项
const isradios = (index) => {
    if (index) {
    }
};

// 获取订单信息
const getlist_id = (row) => {
    if (row.checked) {
        // 当前选项已选中，点击后取消选中
        row.checked = false;
        writeReceiptMoney.value = "";
        quedata.value = {};
        list_id.value = false;
    } else {
        // 当前选项未选中，点击后选中，并取消其他选项的选中状态
        for (const item of props.list) {
            item.checked = false; // 先将所有项的选中状态设为 false
        }
        row.checked = true; // 将当前点击的项设为选中状态

        writeReceiptMoney.value = row.money;
        let { order_no, money, openid } = row;
        quedata.value = { order_no, money, openid };
        list_id.value = row.plate;
    }
    // for (const item of props.list) {
    //     item.checked = false;
    // }
    // row.checked = true;
    // // console.log(row, "row");
    // // console.log(props.list, "list");
    // // row.checked = !row.checked;
    // if (row.checked) {
    //     writeReceiptMoney.value = row.money;
    //     let { order_no, money, openid } = row;
    //     quedata.value = { order_no, money, openid };
    //     list_id.value = row.plate;
    // } else {
    //     list_id.value = false;
    // }
};

// 点击确定开票触发的方法
const sureWriteReceipt = () => {
    // props.list.filter((item) => item.checked === true).map(v=>v.)
    router.push({
        name: "applybilling",
        query: quedata.value,
    });
};

watchEffect(() => {
    // console.log(props.list, "list");
});
</script>
<style lang='less' scoped>
.container {
    width: 100%;
    // height: 100%;
    .ticket {
        // width: 3.9rem;
        min-height: 1.15rem;
        background: #ffffff;
        margin-bottom: 0.07rem;
        border: 0.01rem solid transparent;

        // 车牌头部
        .ticket_top {
            width: auto;
            height: 0.26rem;
            margin: 0.13rem 0.23rem 0.12rem 0.14rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .radios {
                width: 0.12rem;
                height: 0.12rem;
                border: 0.01rem solid #5867e9;
                border-radius: 50%;
            }

            .radfalsh {
                border: 0.06rem solid #5867e9;
            }

            .ticket_plateright {
                width: 3.3rem;
                height: 0.26rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .platestyle {
                    display: inline-block;
                    padding: 0.05rem 0.22rem;
                    background: #edf1fb;
                    border-radius: 0.11rem 0 0.11rem 0;
                    height: 0.26rem;
                    font-size: 0.13rem;
                    font-weight: 400;
                    color: #272a46;
                }

                .platehint {
                    height: 0.26rem;
                    line-height: 0.26rem;
                    font-size: 0.15rem;
                    font-weight: 400;
                    color: #8c929f;
                }
            }
        }

        .lines {
            width: 3.73rem;
            border: 0.1px solid rgb(238, 236, 236);
            margin: 0 auto;
        }

        .ticket_content {
            width: auto;
            min-height: 0.45rem;
            margin: 0.09rem 0.22rem 0.12rem 0.36rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .content_left {
                width: 65%;
                min-height: 0.45rem;
                text-align: start;
                display: flex;
                flex-wrap: wrap;
                align-items: center;

                .ticket_data {
                    height: 0.14rem;
                    display: flex;
                    align-items: center;

                    .data_left {
                        height: 0.14rem;
                        font-size: 0.14rem;
                        font-weight: 400;
                        color: #8c929f;
                        margin-right: 0.1rem;
                    }

                    .data_right {
                        height: 0.14rem;
                        font-size: 0.14rem;
                        font-weight: 400;
                    }
                }

                & > .ticket_data:nth-child(n + 2) {
                    margin-top: 17px;
                }
            }

            .content_right {
                width: auto;
                height: 0.45rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                font-size: 0.26rem;
                font-weight: 400;
                color: #272a46;

                .money {
                    display: inline-block;
                    width: 0.12rem;
                    height: 0.12rem;
                    font-size: 0.13rem;
                    font-weight: 400;
                    color: #8c929f;
                    margin: 0.06rem;
                }
            }
        }
    }

    .transparent {
        width: 3.9rem;
        height: 0.38rem;
        background: transparent;
    }

    // 开票
    .bottom_invoice {
        width: 4rem;
        height: 0.43rem;
        background: #ffffff;
        box-shadow: 0px 0.01rem 0.07rem 0 #cfd4e6;
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;

        // 开票
        .put_invoice {
            width: 0.95rem;
            height: 0.27rem;
            background: linear-gradient(-90deg, #4f5fe3 0%, #8594ff 100%);
            border-radius: 0.13rem;
            margin-right: 0.13rem;
            font-size: 0.13rem;
            font-weight: 400;
            color: #ffffff;
        }

        .put_money {
            font-size: 0.13rem;
            font-weight: 400;
            color: #8c929f;
            margin-right: 0.18rem;

            .bignums {
                height: 0.2rem;
                font-size: 0.26rem;
                font-weight: 400;
                color: #ffac3a;
                margin: 0 0.12rem 0 0.08rem;
            }
        }
    }
}
</style>
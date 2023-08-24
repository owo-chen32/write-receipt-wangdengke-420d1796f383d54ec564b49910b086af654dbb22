<template>
    <div class="keyboard-wrap" v-if="kbShow">
        <div class="head">
            <div class="done" @click="done">关闭</div>
        </div>

        <div class="key-list">
            <div
                class="colspan"
                :class="{ active: index === currentIndex }"
                v-for="(item, index) in keyboardList"
                :key="index"
            >
                <div
                    class="uni-flex"
                    v-for="(secondItem, secondIndex) in item"
                    :key="secondIndex"
                >
                    <div
                        class="item"
                        v-for="(thridItem, thridIndex) in secondItem"
                        :key="thridIndex"
                        @click.stop="
                            touchstartActive(
                                thridItem,
                                index,
                                thridIndex,
                                secondItem,
                                item,
                                secondIndex
                            )
                        "
                    >
                        <div class="content" :class="isDel(thridItem)">
                            {{ thridItem.split(",")[0] }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
const props = defineProps(["kbIndex", "kbType", "kbShow"]);
const emit = defineEmits([
    "childClose",
    "childDel",
    "childValue",
    "childIndex",
]);
const currentIndex = ref(0);
const keyboardList = ref([
    [
        ["京", "粤", "津", "晋", "冀", "蒙", "辽", "吉", "黑", "渝"],
        ["苏", "浙", "皖", "闽", "赣", "鲁", "鄂", "沪", "宁"],
        ["桂", "琼", "川", "贵", "云", "藏", "陕", "新"],
        ["豫", "湘", "青", "甘", "临", ""],
    ],
    [
        // ["1,f", "2,f", "3,f", "4,f", "5,f", "6,f", "7,f", "8,f", "9,f", "0,f"],
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        // ["Q", "W", "E", "R", "T", "Y", "U", "I,f", "O,f", "P"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M", ""],
    ],
    [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M", ""],
    ],
    [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M", ""],
    ],
    [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M", ""],
    ],
    [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M", ""],
    ],
    [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
        ["L", "M", "N", "P", "Q", "R", "S", "T", "U", "V"],
        ["W", "X", "Y", "Z", "港", "澳", "学", "领", "警", ""],
    ],
    [
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M", ""],
    ],
]);
watch(
    () => props.kbIndex,
    (newValue, oldValue) => {
        //获取键盘区域下标
        //转为数字类型，防止数据类型不能匹配
        if (newValue != oldValue) {
            currentIndex.value = Number(newValue);
        }
    }
);

const isDel = (three) => {
    if (three == "") {
        return ["delete"];
    }
};

const done = () => {
    emit("childClose", false);
};

//删除
const del = () => {
    emit("childDel", currentIndex.value);
    if (currentIndex.value == 0) {
        return;
    }
    currentIndex.value--;
};
//点击事件
const touchstartActive = (res, index, ...option) => {
    //

    if (
        option[0] == option[1].length - 1 &&
        option[2].length - 1 == option[3]
    ) {
        del();
        return;
    }
    //键盘包含f字符不执行
    if (res.split(",")[1] == "f" || res == "") {
        return;
    }
    emit("childValue", res, index);
    if (currentIndex.value == keyboardList.value.length - 1) {
        return;
    }
    currentIndex.value++;
    emit("childIndex", currentIndex.value);
};
</script>
<style lang='less' scoped>
.delete {
    position: relative;
    &::before {
        content: "";
        width: 0.2rem;
        height: 0.2rem;
        background: url("@/assets/images/del.png") no-repeat center;
        background-size: contain;
        transform: scale(0.9);
    }
}

.keyboard-wrap {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    padding: 0 0.07rem 0.12rem;
    left: 0;
    width: 100%;
    height: 3.02rem;
    box-sizing: border-box;
    background: #fffeff;
    box-shadow: 0rem -0.05rem 0.1rem 0rem rgba(0, 0, 0, 0.06);

    .head {
        width: 100%;
        height: 0.44rem;

        .done {
            float: right;
            margin-right: 0.08rem;
            line-height: 0.44rem;
            color: #1d6df5;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;

            .van-icon {
                font-size: 0.16rem;
            }
        }
    }

    .key-list {
        width: 100%;
        height: 0.41rem;
        background: #fffeff;
    }

    .uni-flex {
        display: flex;
        justify-content: center;
    }

    /*iphone键盘*/
    .item {
        width: 0.34rem;
        height: 0.44rem;
        background: #efefef;
        border-radius: 0.04rem;
        margin-right: 0.04rem;
        margin-bottom: 0.12rem;
        text-align: center;
        box-sizing: content-box;

        .content {
            width: 100%;
            height: 100%;
            font-size: 0.18rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 500;
            color: #1d6df5;
            line-height: 0.21rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .reletives {
            position: relative;
        }

        &.disable .content {
            background-color: #d6dde0;
            color: #acb5b9;
            border-radius: 0.04rem;
        }

        &.item:not(.disable):active .content {
            background-color: orange;
            color: black;
        }
    }

    .colspan {
        display: none;

        &.active {
            display: block;
        }
    }

    .del-item {
        position: absolute;
        right: -0.016rem;
    }
}
</style>
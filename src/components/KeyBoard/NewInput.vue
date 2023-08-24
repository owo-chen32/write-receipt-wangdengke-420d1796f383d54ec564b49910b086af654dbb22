<template>
    <div class="input-plate-wrap" ref="box">
        <input
            class="plate-item"
            :class="moreclass(index)"
            v-for="(item, index) in arr.ars"
            :key="index"
            v-model="arr.plate[index]"
            type="text"
            @click="setindex(index)"
            maxlength="1"
            readonly
        />
    </div>

    <KeyBoard
        :kbShow="isShow"
        :kbIndex="arr.nums"
        :kbType="arr.length"
        @childValue="keyboardValue"
        @childClose="keyboardClose"
        @childDel="keyboardDel"
    ></KeyBoard>
</template>

<script setup>
import KeyBoard from "./KeyBoard.vue";
import { ref, watch, defineProps, onMounted } from "vue";
const box = ref(null);
const props = defineProps({
    payPlate: {
        type: String,
        default: "",
    },
});

const arr = ref({
    ars: 8,
    plate: [],
    nums: 0,
});

const isShow = ref(false);
const setindex = (i) => {
    isShow.value = true; //显示键盘
    arr.value.nums = i;
};

// 顺序不能乱
const moreclass = (index) => {
    let liang = arr.value.nums === index && index < 7 ? "liang" : "";
    if (arr.value.nums === index) return "liang";
    if (
        arr.value.nums !== index &&
        index == arr.value.ars - 1 &&
        arr.value.plate.length == arr.value.ars
    ) {
        return "";
    }
    if (arr.value.nums !== index && index == arr.value.ars - 1)
        return [liang, "newpower"];
};

// 键盘点击返回的值
const keyboardValue = (res) => {
    if (arr.value.plate.length === arr.value.ars) {
        arr.value.plate.splice(arr.value.nums, 1, res);
        // arr.value.plate.pop();
        arr.value.nums < arr.value.ars - 1 && arr.value.nums++;
        //
        return;
    }
    if (arr.value.nums > arr.value.plate.length + 1) {
        arr.value.nums = arr.value.plate.length + 1;
        arr.value.plate.splice(arr.value.plate.length, 0, res);
        //
        return;
    }
    arr.value.plate.splice(arr.value.nums, 1, res);
    arr.value.nums < arr.value.ars - 1 && arr.value.nums++;
};

//关闭
// const keyboardClose = (res, index) => {
const keyboardClose = (res) => {
    isShow.value = res || false;
    arr.value.nums = ""; //关闭键盘键盘高亮取消
};

// 删除
const keyboardDel = () => {
    arr.value.plate.splice(arr.value.nums, 1);
    arr.value.nums && arr.value.nums--;
};

// watch();

onMounted(() => {
    arr.value.plate = props.payPlate.split("");
});

defineExpose({
    arr,
});
</script>

<style lang="less" scoped>
.input-plate-wrap {
    width: 100%;
    height: 0.64rem;
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .plate-item {
        width: 0.33rem;
        height: 0.42rem;
        border-radius: 0.04rem;
        border: 0.01rem solid #c1d5f5;
        font-size: 0.14rem;
        text-align: center;
    }

    .liang {
        background: #f6f8fd;
        border: 0.01rem solid #1d6df5;
    }

    .icondiandongche {
        color: orange;
        font-size: 0.14rem;
    }
}

.newpower {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url("/src/assets/images/ico_home_new energy_sel.png") no-repeat
        center;
    background-size: cover;
}
</style>

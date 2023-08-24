<template>
  <div>
    <van-form @submit="onSubmit" ref="form">
      <van-cell-group inset>
        <van-field
          label-align="top"
          required
          autocomplete="off"
          v-model="write_list.buyerName"
          name="发票抬头"
          label="发票抬头"
          placeholder="请填写发票抬头"
          :rules="[{ required: true, message: '请填写发票抬头' }]"
        />
        <van-field
          label-align="top"
          required
          autocomplete="off"
          v-model="write_list.buyerTaxNo"
          name="纳税人识别号"
          label="纳税人识别号"
          placeholder="请填写纳税人识别号"
          :rules="[
            {
              required: true,
              message: '请填写纳税人识别号',
            },
          ]"
        />
        <van-field
          label-align="top"
          required
          autocomplete="off"
          v-model="write_list.buyerEmail"
          name="收票人邮箱"
          label="收票人邮箱"
          placeholder="请填写收票人邮箱"
          :rules="[{ required: true, message: '请填写收票人邮箱' }]"
        />
      </van-cell-group>
    </van-form>
    <div class="next-btn" style="margin: 16px">
      <van-button
        class="content-btn"
        type="primary"
        native-type="submit"
        @click="onSubmit"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { showDialog } from "vant";

const form = ref(null);
const route = useRoute();
// 路由参数

const write_list = reactive({
  buyerName: "",
  buyerTaxNo: "",
  buyerEmail: "",
});
const onSubmit = () => {
  form.value.validate().then(() => {
    console.log(route.query);
    showDialog({
      title: "开票申请成功",
      // message: "您的电子发票已发送至预留邮箱" + buyerEmail.value + "@qq.com",
      message: "您的电子发票已发送至预留邮箱" + `${write_list.buyerEmail}`,
    });
  });
};
</script>

<style lang="scss" scoped></style>

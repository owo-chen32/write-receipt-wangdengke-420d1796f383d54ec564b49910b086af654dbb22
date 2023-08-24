<template>
  <div>
    <van-form @submit="sure">
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
          v-model="write_list.buyerEmail"
          name="收票人邮箱"
          label="收票人邮箱"
          placeholder="请填写收票人邮箱"
          :rules="[{ required: true, message: '请填写收票人邮箱' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          class="content-btn"
          type="primary"
          native-type="submit"
          @click="sure"
          >下一步</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const write_list = reactive({});
</script>

<style lang="scss" scoped></style>

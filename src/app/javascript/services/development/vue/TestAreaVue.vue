<script setup lang="ts">
/** vueテスト用コンポーネント */

import ModalArea from './test-area-vue/ModalArea.vue';
import UIArea from './test-area-vue/UIArea.vue';
import FormArea from './test-area-vue/FormArea.vue';

interface Props {
  testValue?: number;
  formData: any;
}

const props = defineProps<Props>();

const blockStyle = 'border-gray-400 border-2 p-3';
</script>

<template>
  <div class="py-6 border-gray-500 border-2 p-5">
    <div class="mb-6 text-lg">vue.js動作確認</div>

    <div class="space-y-4">
      <div :class="blockStyle">
        <UIArea />
      </div>

      <div :class="blockStyle">
        <ModalArea />
      </div>

      <div :class="blockStyle">
        <FormArea
          :listVal="formData.list_val"
          :radioVal="formData.radio_val"
          :dateTimeVal="formData.datetime_val"
          :listVals="formData.list_vals"
          :radioVals="formData.radio_vals"
        />
      </div>
    </div>
  </div>
</template>

<template>
  <div class="space-y-2">
    <div>Page2</div>
    <div>
      <button @click="cnt++" class="app-btn-primary">Add</button>
    </div>
    <div>
      <span>cnt: {{ cnt }}</span>
    </div>

    <div>
      <span>commonCnt: {{ commonCnt }}</span>
    </div>

    <div class="mt-5 py-6 border-gray-500 border-2 p-5">
      <div class="space-x-2">
        <button
          @click="current = 'Parts1'"
          :class="[
            current === 'Parts1' ? 'app-link-active' : 'app-link-normal',
          ]"
        >
          Parts1
        </button>
        <button
          @click="current = 'Parts2'"
          :class="[
            current === 'Parts2' ? 'app-link-active' : 'app-link-normal',
          ]"
        >
          Parts2
        </button>
      </div>

      <keep-alive>
        <component :is="currentComponent" v-model:commonCnt="commonCnt" />
      </keep-alive>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { components } from '../../router-test/page2/router';

const current = ref('Parts1');
const currentComponent = computed(() => components[current.value]);

const cnt = ref<number>(0);

const commonCnt = ref<number>(0);

// 初期化時
onMounted(() => {
  console.log('page2 mounted');
});
</script>

<template>
  <div
    style="
      border: 1px solid #aaa;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    "
  >
    <h3>Vue動作確認</h3>
    <div>タグからの値: {{ name }}</div>
    <div>
      <button @click="cnt++">Add</button>
    </div>
    <div>
      <span>cnt: {{ cnt }}</span>
    </div>

    <div>
      vueからreactを動かす
      <div style="margin-top: 1rem;">
        <button @click="loadingTest">
          Loading
        </button>
      </div>

      <div style="margin-top: 1rem;">
        <button @click="() => toastTest('notice')">
          Toast notice
        </button>
        <button @click="() => toastTest('alert')">
          Toast alert
        </button>
        <button
          @click="
            () => {
              toastTest('notice');
              toastTest('alert');
            }
          "
        >
          Toast 2
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { showToast, setIsLoading } from '@/services/ui/message';

interface Props {
  name: string;
}

const props = defineProps<Props>();

const name = ref(props.name ?? '');

const cnt = ref<number>(0);

/** ロード画面の動作確認 */
const loadingTest = () => {
  console.log('Loading vue.js');
  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
};

/** トーストの動作確認 */
const toastTest = (type) => {
  const msg = `トーストテスト vue.js type:${type}`;
  console.log(msg);
  showToast(msg, type);
};
</script>

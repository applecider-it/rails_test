<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    "
  >
    <div>UI動作確認 (vueからreactを動かす)</div>

    <div>
      
      <div>
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
import { showToast, setIsLoading } from '@/services/ui/message';

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

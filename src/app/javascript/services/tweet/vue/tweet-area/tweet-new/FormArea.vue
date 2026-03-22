<script setup lang="ts">
type Errors = {
  content?: string[];
};

const props = defineProps<{
  onSubmit: () => void;
  errors?: Errors;
}>();

const content = defineModel<string>('content', {
  required: true,
});

const handleSubmit = () => {
  props.onSubmit();
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mb-4 mt-10" id="tweetForm">
    <textarea
      rows="3"
      class="w-full border rounded p-2"
      placeholder="What's happening?"
      name="content"
      v-model="content"
    />

    <p v-if="errors?.content" class="text-red-600">
      {{ errors.content[0] }}
    </p>

    <button type="submit" class="mt-2 app-btn-primary">確認</button>
  </form>
</template>

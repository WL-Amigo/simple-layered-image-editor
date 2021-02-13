<template>
  <img :src="src" class="w-32 h-32 object-cover" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

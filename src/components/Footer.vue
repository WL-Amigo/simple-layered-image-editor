<template>
  <div class="w-full h-12"></div>
  <div class="absolute bottom-0 w-full h-12 bg-blue-200 flex flex-row justify-between items-center px-4">
    <div>Simple Layered Image Editor (仮)</div>
    <div>
      <span>built by </span>
      <ex-link href="https://twitter.com/WL_Amigo">@WL_Amigo</ex-link>
      <span> (</span>
      <ex-link href="https://white-luck-bringers.netlify.app/">WhiteLuckBringers</ex-link>
      <span>), inspired by </span>
      <ex-link href="https://twitter.com/oreno_ani">@oreno_ani</ex-link>
      <span>'s </span>
      <ex-link href="https://twitter.com/oreno_ani/status/1356902652404092930">tweet</ex-link>
      <span>. </span>
      <button @click="isLicensesOpened = true">
        <span class="underline">licenses</span>
      </button>
    </div>
  </div>
  <licenses-modal v-model:isOpen="isLicensesOpened" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ExLink } from '@/components/common/SafeLink';
import LicensesModal from '@/components/LicensesModal.vue';

export default defineComponent({
  components: {
    ExLink,
    LicensesModal,
  },
  setup() {
    return {
      isLicensesOpened: ref(false),
    };
  },
});
</script>

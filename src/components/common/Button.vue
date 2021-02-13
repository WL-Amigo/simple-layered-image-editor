<template>
  <button class="h-8 px-4 flex flex-row items-center space-x-2 rounded border-b-2" :class="buttonClasses">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { defineStringLiteralTypeWithDefault } from '@/utils/VueProps';

const Colors = ['default', 'primary'] as const;

export default defineComponent({
  name: 'Button',
  props: {
    color: defineStringLiteralTypeWithDefault(Colors, 'default'),
  },
  setup(props) {
    const colorClasses = computed(() => {
      switch (props.color) {
        case 'primary':
          return ['border-blue-900', 'bg-blue-500', 'text-white', 'hover:bg-blue-600'];
        default:
          return ['border-gray-700', 'bg-gray-50', 'hover:bg-gray-100'];
      }
    });
    const buttonClasses = computed(() => colorClasses.value);

    return {
      buttonClasses,
    };
  },
});
</script>

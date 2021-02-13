<template>
  <div class="w-full flex flex-row px-8 py-4 space-x-2">
    <div class="relative" v-for="(layer, i) in layers" :key="`${layer.type}-${i.toFixed(0)}`">
      <layer-entry :layer="layer" @replace="$emit('replace', $event)" @delete="$emit('delete', $event)" />
    </div>
    <add-new-image id="add-new-image" @input="$emit('add', $event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { LayerConfig } from '../model/LayerConfig';
import LayerEntry from './LayerEntry';
import AddNewImage from './AddNewImage.vue';

export default defineComponent({
  components: {
    LayerEntry,
    AddNewImage,
  },
  props: {
    layers: {
      type: Object as PropType<LayerConfig[]>,
      required: true,
    },
  },
  emits: {
    add: null,
    replace: null,
    delete: null,
  },
  setup() {
    return {};
  },
});
</script>

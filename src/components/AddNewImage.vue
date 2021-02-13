<template>
  <label :for="id" class="border-gray-500 border-2 border-dashed inline-block">
    <div
      class="w-32 h-32 flex justify-center items-center bg-white hover:bg-gray-200"
      :class="areaDynamicClasses"
      @dragover="onDragEnterOrOver"
      @dragenter="onDragEnterOrOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <layer-plus-icon class="w-8 h-8 text-gray-500" />
    </div>
    <input
      type="file"
      name="image"
      accept="image/png, image/jpeg, image/webp"
      :id="id"
      @input="onInput"
      multiple
      class="hidden"
    />
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useFileInputEventHandler, useDragAndDropFileInput } from '../compositions/FileInput';
import LayerPlusIcon from '../icons/boxicons/layerPlus.svg?component';

export default defineComponent({
  name: 'AddNewImage',
  components: {
    LayerPlusIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  emits: {
    input: null,
  },
  setup(_, { emit }) {
    const emitFileInput = (files: FileList): void => {
      emit(
        'input',
        Array.from({ length: files.length }, (_, i) => files.item(i)).filter((f): f is File => f !== null),
      );
    };
    const onInput = useFileInputEventHandler(emitFileInput);

    const { isDragOvered, onDragEnterOrOver, onDragLeave, onDrop } = useDragAndDropFileInput(emitFileInput);
    const areaDynamicClasses = computed(() => (isDragOvered.value ? ['bg-gray-200'] : []));

    return {
      onInput,
      onDrop,
      onDragEnterOrOver,
      onDragLeave,
      areaDynamicClasses,
    };
  },
});
</script>

<style scoped></style>

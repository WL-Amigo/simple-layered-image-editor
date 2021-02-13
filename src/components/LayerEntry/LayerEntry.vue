<template>
  <div
    class="relative border-2 border-transparent"
    @dragover="onDragEnterOrOver"
    @dragenter="onDragEnterOrOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <layer-preview :layer="layer" />
    <div class="absolute inset-0 w-full h-full flex justify-center items-center" :class="dragOverClasses">
      <refresh-icon class="w-16 h-16 text-white" />
    </div>
    <div
      class="absolute inset-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 bg-black bg-opacity-25"
    >
      <button class="w-8 h-8" @click="emitDelete">
        <trash-icon class="w-full h-full text-white hover:text-gray-100" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useDragAndDropFileInput } from '../../compositions/FileInput';
import { LayerConfig } from '../../model/LayerConfig';
import { LayerPreview } from './LayerPreview';
import RefreshIcon from '../../icons/boxicons/refresh.svg?component';
import TrashIcon from '../../icons/boxicons/trash.svg?component';
import { defineObjectType } from '@/utils/VueProps';
import { InvalidStateError } from '@/errors/FatalError';

export default defineComponent({
  components: {
    LayerPreview,
    RefreshIcon,
    TrashIcon,
  },
  props: {
    layer: defineObjectType<LayerConfig>(),
  },
  emits: {
    replace: null,
    delete: null,
  },
  setup(props, { emit }) {
    const emitReplace = (fileList: FileList): void => {
      const file = fileList.item(0);
      if (file === null) {
        throw new InvalidStateError('fileList が空です');
      }
      const replacePayload: { id: string; file: File } = {
        id: props.layer.id,
        file: file,
      };
      emit('replace', replacePayload);
    };
    const emitDelete = (): void => {
      emit('delete', props.layer.id);
    };
    const { isDragOvered, onDragEnterOrOver, onDragLeave, onDrop } = useDragAndDropFileInput(emitReplace);
    const dragOverClasses = computed(() => (isDragOvered.value ? ['bg-black', 'bg-opacity-25'] : ['opacity-0']));

    return {
      onDragEnterOrOver,
      onDragLeave,
      onDrop,
      emitDelete,
      dragOverClasses,
    };
  },
});
</script>

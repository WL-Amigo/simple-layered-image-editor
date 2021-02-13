<template>
  <div class="min-h-full relative">
    <div class="container mx-auto pb-4">
      <layer-list :layers="layerConfigList" @add="onInput" @replace="onReplace" @delete="onDelete" />
      <main-stage :layers="layerConfigList" />
      <div class="w-full flex flex-row justify-center pt-4">
        <download-button />
      </div>
    </div>
    <slie-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { MainStage } from './components/MainStage';
import { LayerConfig } from './model/LayerConfig';
import { ServiceKeys, useService } from './compositions/ServiceProvider';
import LayerList from './components/LayerList.vue';
import DownloadButton from '@/components/DownloadButton.vue';
import SlieFooter from '@/components/Footer.vue';

const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== 'string') {
        rej('unexpected result type');
        return;
      }
      res(result);
      return;
    };
    reader.readAsDataURL(file);
  });
};

export default defineComponent({
  name: 'App',
  components: {
    MainStage,
    LayerList,
    DownloadButton,
    SlieFooter,
  },
  setup() {
    const uniqueIdProvider = useService(ServiceKeys.uniqueIdProvider);
    const layerConfigList = ref<LayerConfig[]>([]);
    const onInput = async (files: File[]) => {
      const urls = await Promise.all(files.map(readFileAsDataUrl));
      layerConfigList.value.push(
        ...urls.map<LayerConfig>((url) => ({ type: 'image', url, id: uniqueIdProvider.get() })),
      );
    };
    const onReplace = async (payload: { id: string; file: File }) => {
      const url = await readFileAsDataUrl(payload.file);
      const replaceIndex = layerConfigList.value.findIndex((lc) => lc.id === payload.id);
      layerConfigList.value.splice(replaceIndex, 1, { type: 'image', url, id: uniqueIdProvider.get() });
    };
    const onDelete = (id: string) => {
      const deleteIndex = layerConfigList.value.findIndex((lc) => lc.id === id);
      layerConfigList.value.splice(deleteIndex, 1);
    };

    return {
      layerConfigList,
      onInput,
      onReplace,
      onDelete,
    };
  },
});
</script>

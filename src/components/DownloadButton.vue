<template>
  <slie-button @click="execDownload" color="primary">
    <download-icon class="w-4 h-4" />
    <span>PNG で保存</span>
  </slie-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ServiceKeys, useService } from '@/compositions/ServiceProvider';
import { InvalidStateError } from '@/errors/FatalError';
import SlieButton from '@/components/common/Button.vue';
import DownloadIcon from '@/icons/boxicons/download.svg?component';

export default defineComponent({
  components: {
    SlieButton,
    DownloadIcon,
  },
  setup() {
    const stageManager = useService(ServiceKeys.stageManager);
    const execDownload = () => {
      const mainStage = stageManager.getMainStage();
      if (mainStage === undefined) {
        throw new InvalidStateError('メインステージが登録されていません');
      }
      const dataUrl = mainStage.toDataURL({ pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'export.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return {
      execDownload,
    };
  },
});
</script>

import { defineComponent, h, PropType } from 'vue';
import { LayerConfig } from '../../model/LayerConfig';
import ImageLayerPrev from './private/ImageLayer.vue';

export const LayerPreview = defineComponent({
  props: {
    layer: {
      type: Object as PropType<LayerConfig>,
      required: true,
    },
  },
  setup(props) {
    switch (props.layer.type) {
      case 'image':
        return () => h(ImageLayerPrev, { src: props.layer.url });
    }
  },
});

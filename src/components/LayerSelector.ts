import { FunctionalComponent, h } from 'vue';
import { LayerConfig } from '../model/LayerConfig';

import { ImageLayer } from './ImageLayer';

export const LayerSelector: FunctionalComponent<{
  layerConfig: LayerConfig;
  index: number;
}> = (props) => {
  const layerConfig = props.layerConfig;

  switch (layerConfig.type) {
    case 'image':
      return h(ImageLayer, { src: layerConfig.url });
  }
};

LayerSelector.displayName = 'LayerSelector';

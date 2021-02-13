interface LayerConfigBase {
  id: string;
  type: string;
}

interface ImageLayerConfig extends LayerConfigBase {
  type: 'image';
  url: string;
}

export type LayerConfig = ImageLayerConfig;

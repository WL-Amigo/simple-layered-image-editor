import { readFileAsDataUrl } from '@/utils/File';

interface LayerConfigBase {
  type: string;
}

export interface ImageLayerConfig extends LayerConfigBase {
  type: 'image';
  url: string;
}

export const LayerConfigOperations = {
  createImageLayer: async (src: File): Promise<ImageLayerConfig> => {
    return {
      type: 'image',
      url: await readFileAsDataUrl(src),
    };
  },
} as const;

export type LayerConfigWithoutId = ImageLayerConfig;
export type LayerConfig = LayerConfigWithoutId & { id: string };

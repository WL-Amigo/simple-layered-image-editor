import { LayerConfig, LayerConfigWithoutId } from '@/model/LayerConfig';
import { createMemo, Accessor } from 'solid-js';
import { createStore, DeepReadonly } from 'solid-js/store';
import { useService } from './ServiceProvider';

export type LayersProperty = readonly DeepReadonly<LayerConfig>[];
interface LayerManagerComposition {
  layers: Accessor<LayersProperty>;
  addLayer: (layer: LayerConfigWithoutId) => string;
  replaceLayer: (id: string, layer: LayerConfigWithoutId) => void;
  deleteLayer: (id: string) => void;
}
export const useLayerManager = (): LayerManagerComposition => {
  const [state, setState] = createStore<{ layers: LayerConfig[] }>({ layers: [] });
  const layersSignal = createMemo(() => state.layers);
  const uniqueIdProvider = useService('uniqueIdProvider');

  const addLayer = (layer: LayerConfigWithoutId) => {
    const id = uniqueIdProvider.get();
    setState('layers', (layers) => [{ ...layer, id }, ...layers]);
    return id;
  };

  const replaceLayer = (id: string, layer: LayerConfigWithoutId) => {
    setState('layers', (layers) => {
      const result = [...layers];
      const replaceIndex = result.findIndex((l) => l.id === id);
      if (replaceIndex < 0) {
        return layers;
      }
      result.splice(replaceIndex, 1, { ...layer, id });
      return result;
    });
  };

  const deleteLayer = (id: string) => {
    setState('layers', (layers) => {
      const result = [...layers];
      const replaceIndex = result.findIndex((l) => l.id === id);
      if (replaceIndex < 0) {
        return layers;
      }
      result.splice(replaceIndex, 1);
      return result;
    });
  };

  return {
    layers: layersSignal,
    addLayer,
    replaceLayer,
    deleteLayer,
  };
};

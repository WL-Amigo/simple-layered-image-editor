import { LayersProperty } from '@/compositions/LayerManager';
import { LayerConfigOperations, LayerConfigWithoutId } from '@/model/LayerConfig';
import { Component, createEffect, For } from 'solid-js';
import { AddLayerListItem } from './LayerListItem';
import { LayerEntryListItem } from './LayerListItem/LayerEntry';

interface Props {
  layers: LayersProperty;
  onAddLayer: (layer: LayerConfigWithoutId) => void;
  onReplaceLayer: (id: string, layer: LayerConfigWithoutId) => void;
  onDeleteLayer: (id: string) => void;
}
export const LayerList: Component<Props> = (props) => {
  if (import.meta.env.DEV) {
    createEffect(() => console.log(props.layers.map((l) => ({ ...l }))));
  }
  const onInputFile = async (file: File) => {
    props.onAddLayer(await LayerConfigOperations.createImageLayer(file));
  };
  const onReplaceWithImage = async (id: string, file: File) => {
    props.onReplaceLayer(id, await LayerConfigOperations.createImageLayer(file));
  };

  return (
    <div class="w-full flex flex-row px-8 py-4 gap-x-2">
      <AddLayerListItem onInputFile={onInputFile} />
      <For each={props.layers}>
        {(layer) => (
          <LayerEntryListItem
            layer={layer}
            onReplaceWithImage={(src) => onReplaceWithImage(layer.id, src)}
            onDelete={props.onDeleteLayer}
          />
        )}
      </For>
    </div>
  );
};

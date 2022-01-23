import { useDragAndDropFileInput } from '@/compositions/FileInput';
import { RefreshIcon, TrashIcon } from '@/icons/boxicons';
import { LayerConfig } from '@/model/LayerConfig';
import { windi } from '@/utils/Windi';
import clsx from 'clsx';
import { Component, createMemo } from 'solid-js';
import { LayerPreview } from './LayerPreview';
import { LayerItemCommonStyle } from './Style';

interface Props {
  layer: LayerConfig;
  onReplaceWithImage: (src: File) => void;
  onDelete: (id: string) => void;
}
export const LayerEntryListItem: Component<Props> = (props) => {
  const onInputFileList = (files: FileList) => {
    const file = files.item(0);
    if (file === null) {
      return;
    }
    props.onReplaceWithImage(file);
  };

  const { isDragOvered, onDragEnterOrOver, onDragLeave, onDrop } = useDragAndDropFileInput(onInputFileList);
  const areaDynamicClasses = createMemo(() => (isDragOvered() ? windi`bg-black bg-opacity-25` : windi`opacity-0`));

  return (
    <div
      class={LayerItemCommonStyle}
      onDragOver={onDragEnterOrOver}
      ondragenter={onDragEnterOrOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <LayerPreview layer={props.layer} />
      <div class={clsx(windi`absolute inset-0 w-full h-full flex justify-center items-center`, areaDynamicClasses())}>
        <RefreshIcon class="w-16 h-16 text-white pointer-events-none" />
      </div>
      <div class="absolute inset-0 w-full h-full flex flex-row justify-center items-center opacity-0 hover:opacity-100 bg-black bg-opacity-25">
        <button onClick={() => props.onDelete(props.layer.id)}>
          <TrashIcon class="w-8 h-8 text-gray-200 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

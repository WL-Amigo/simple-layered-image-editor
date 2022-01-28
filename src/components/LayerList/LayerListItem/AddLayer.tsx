import { useDragAndDropFileInput, useFileInputEventHandler } from '@/compositions/FileInput';
import { LayerPlusIcon } from '@/icons/boxicons';
import { windi } from '@/utils/Windi';
import clsx from 'clsx';
import { Component, createMemo } from 'solid-js';
import { LayerItemCommonStyle } from './Style';

interface Props {
  onInputFile: (file: File) => void;
}
export const AddLayerListItem: Component<Props> = (props) => {
  const onInputFileList = (files: FileList) => {
    const file = files.item(0);
    if (file === null) {
      return;
    }
    props.onInputFile(file);
  };
  const onInput = useFileInputEventHandler(onInputFileList);

  const { isDragOvered, onDragEnterOrOver, onDragLeave, onDrop } = useDragAndDropFileInput(onInputFileList);
  const areaDynamicClasses = createMemo(() => (isDragOvered() ? windi`bg-gray-200` : ''));

  return (
    <label htmlFor="add-image-layer" class={clsx(LayerItemCommonStyle, windi`border-dashed`)}>
      <div
        class={clsx(
          windi`w-full h-full flex justify-center items-center bg-white hover:bg-gray-200 text-gray-500`,
          areaDynamicClasses(),
        )}
        onDragOver={onDragEnterOrOver}
        onDragEnter={onDragEnterOrOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <LayerPlusIcon class="w-8 h-8" />
      </div>
      <input
        type="file"
        name="image"
        accept="image/png, image/jpeg, image/webp"
        id="add-image-layer"
        multiple
        class="hidden"
        onInput={onInput}
      />
    </label>
  );
};

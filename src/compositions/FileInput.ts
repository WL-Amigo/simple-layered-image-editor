import { Accessor, createSignal } from 'solid-js';

export const useFileInputEventHandler = (fileListHandler: (fileList: FileList) => void): ((e: Event) => void) => {
  return (e: Event) => {
    if (e.target instanceof HTMLInputElement && e.target.files !== null && e.target.files.length > 0) {
      fileListHandler(e.target.files);
    }
  };
};

type DragAndDropFileInputComposition = {
  onDragEnterOrOver: (e: Event) => void;
  onDragLeave: (e: Event) => void;
  onDrop: (e: DragEvent) => void;
  isDragOvered: Accessor<boolean>;
};
export const useDragAndDropFileInput = (
  fileListHandler: (fileList: FileList) => void,
): DragAndDropFileInputComposition => {
  const [isDragOvered, setIsDragOvered] = createSignal(false);
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOvered(false);

    if (e.dataTransfer?.files === undefined || e.dataTransfer.files.length === 0) {
      return;
    }
    fileListHandler(e.dataTransfer.files);
  };
  const onDragEnterOrOver = (e: Event) => {
    e.preventDefault();
    setIsDragOvered(true);
  };
  const onDragLeave = (e: Event) => {
    e.preventDefault();
    setIsDragOvered(false);
  };

  return {
    onDragEnterOrOver,
    onDragLeave,
    onDrop,
    isDragOvered,
  };
};

import Konva from 'konva';
import { Component, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useKonvaStage } from './Stage';

interface Props {
  src: string;
}
export const KImage: Component<Props> = (props) => {
  const stage = useKonvaStage();
  const layer = new Konva.Layer();
  onMount(() => stage.add(layer));
  onCleanup(() => layer.remove());

  const [image, setImage] = createSignal<Konva.Image | undefined>(undefined);
  createEffect(() => {
    const src = props.src;
    Konva.Image.fromURL(src, (imgNode: Konva.Image) => {
      imgNode.setDraggable(true);
      setImage(imgNode);
    });
  });
  createEffect<Konva.Image | undefined>((prev) => {
    if (prev) {
      prev.destroy();
      layer.batchDraw();
    }
    return image();
  });
  createEffect(() => {
    const imageNode = image();
    if (imageNode === undefined) {
      return;
    }

    const imageWidth = imageNode.width();
    const imageHeight = imageNode.height();
    const stageWidth = stage.width();
    const stageHeight = stage.height();
    const scale = Math.min(stageWidth / imageWidth, stageHeight / imageHeight);
    const imageX = Math.round((stageWidth - imageWidth * scale) / 2);
    const imageY = Math.round((stageHeight - imageHeight * scale) / 2);
    imageNode.scale({ x: scale, y: scale });
    imageNode.x(imageX);
    imageNode.y(imageY);

    layer.add(imageNode);
    layer.batchDraw();
  });

  return null;
};

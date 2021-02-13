import Konva from 'konva';
import { defineComponent, onUnmounted, shallowRef, watchEffect } from 'vue';
import { useStage } from './MainStage';

export const ImageLayer = defineComponent({
  name: 'ImageLayer',
  props: {
    src: String,
  },
  setup(props) {
    const stageRef = useStage();
    const layerNodeRef = shallowRef(new Konva.Layer());
    const imageNodeRef = shallowRef<Konva.Image>();

    stageRef.value.add(layerNodeRef.value);
    onUnmounted(() => layerNodeRef.value.remove());

    watchEffect(() => {
      if (props.src === undefined) {
        return;
      }

      Konva.Image.fromURL(props.src, (imgNode: Konva.Image) => {
        imgNode.setDraggable(true);
        imageNodeRef.value = imgNode;
      });
    });

    watchEffect((onInvalidate) => {
      const layer = layerNodeRef.value;
      const imageNode = imageNodeRef.value;
      if (imageNode === undefined) {
        return;
      }

      // fit to stage
      const stage = stageRef.value;
      const imageWidth = imageNode.width();
      const imageHeight = imageNode.height();
      const scale = Math.min(stage.width() / imageWidth, stage.height() / imageHeight);
      const imageX = Math.round((stage.width() - imageWidth * scale) / 2);
      const imageY = Math.round((stage.height() - imageHeight * scale) / 2);
      imageNode.scale({ x: scale, y: scale });
      imageNode.x(imageX);
      imageNode.y(imageY);

      layer.add(imageNode);
      layer.batchDraw();

      onInvalidate(() => {
        imageNode.remove();
        layer.batchDraw();
      });
    });

    return () => null;
  },
});

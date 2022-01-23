import { LayersProperty } from '@/compositions/LayerManager';
import { DownloadIcon } from '@/icons/boxicons';
import { NonReactiveRef } from '@/model/NonReactiveRef';
import { saveFileFromDataUrl } from '@/utils/File';
import type Konva from 'konva';
import { Component, For } from 'solid-js';
import { Button } from '../Button';
import { KImage } from '../Konva/Image';
import { KStage } from '../Konva/Stage';

interface Props {
  layers: LayersProperty;
}
export const LayerView: Component<Props> = (props) => {
  const stageRef: NonReactiveRef<Konva.Stage | undefined> = { value: undefined };
  const onSavePNG = () => {
    const stage = stageRef.value;
    if (stage === undefined) {
      return;
    }
    saveFileFromDataUrl(stage.toDataURL({ pixelRatio: 2 }));
  };

  return (
    <div class="w-full h-full flex flex-col justify-center items-center gap-y-2">
      <KStage onStageReady={(stage) => (stageRef.value = stage)}>
        <For each={props.layers}>
          {(item) => {
            if (item.type === 'image') {
              return <KImage src={item.url} />;
            }
          }}
        </For>
      </KStage>
      <Button color="primary" onClick={onSavePNG}>
        <DownloadIcon class="w-6 h-6" />
        <span>PNG で保存</span>
      </Button>
    </div>
  );
};

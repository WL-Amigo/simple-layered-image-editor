import { defineComponent, h, inject, InjectionKey, onMounted, PropType, provide, Ref, ref, shallowRef } from 'vue';
import Konva from 'konva';
import { LayerConfig } from '../model/LayerConfig';
import { LayerSelector } from './LayerSelector';
import { ServiceKeys, useService } from '@/compositions/ServiceProvider';
import { InvalidStateError } from '@/errors/FatalError';

export const MainStage = defineComponent({
  name: 'MainStage',
  props: {
    layers: {
      type: Object as PropType<LayerConfig[]>,
      required: true,
    },
  },
  setup(props, ctx) {
    const stageManager = useService(ServiceKeys.stageManager);
    const konvaMountRef = ref<HTMLDivElement | null>(null);
    const stageRef = shallowRef<Konva.Stage>(
      new Konva.Stage({
        width: 960,
        height: 540,
        container: document.createElement('div'),
      }),
    );
    stageManager.setMainStage(stageRef.value);

    onMounted(() => {
      if (konvaMountRef.value === null) {
        return;
      }

      stageRef.value.setContainer(konvaMountRef.value);
    });

    provide(KonvaStageInjectionKey, stageRef);

    return () =>
      h(
        'div',
        {
          ref: konvaMountRef,
          class: 'flex justify-center items-center flex-col',
        },
        props.layers.map((ilc, i) => LayerSelector({ layerConfig: ilc, index: i }, ctx)),
      );
  },
});

const KonvaStageInjectionKey: InjectionKey<Ref<Konva.Stage>> = Symbol();

export const useStage = (): Ref<Konva.Stage> => {
  const konvaStageRef = inject(KonvaStageInjectionKey);
  if (konvaStageRef === undefined) {
    throw new InvalidStateError('Konva.Stage が provide されていません');
  }

  return konvaStageRef;
};

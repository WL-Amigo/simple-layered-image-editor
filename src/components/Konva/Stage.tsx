import Konva from 'konva';
import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from 'solid-js';

const KonvaStageContext = createContext<Accessor<Konva.Stage | undefined>>();
export const useKonvaStage = (): Konva.Stage => {
  const stageSignal = useContext(KonvaStageContext);
  if (stageSignal === undefined) {
    throw new Error('useKonvaStage cannot be used outside of KStage.');
  }
  const stage = stageSignal();
  if (stage === undefined) {
    throw new Error('Failed to get Konva.Stage');
  }

  return stage;
};

interface Props {
  onStageReady?: (stage: Konva.Stage) => void;
}
export const KStage: Component<Props> = (props) => {
  const stageMountRef = (<div />) as HTMLDivElement;
  const [stage, setStage] = createSignal<Konva.Stage | undefined>(undefined);
  onMount(() => {
    setStage(
      new Konva.Stage({
        width: 960,
        height: 540,
        container: stageMountRef,
      }),
    );
  });
  onCleanup(() => {
    stage()?.destroy();
  });
  createEffect(() => {
    const stageInst = stage();
    if (stageInst !== undefined) {
      props.onStageReady?.(stageInst);
    }
  });

  return (
    <>
      {stageMountRef}
      <KonvaStageContext.Provider value={stage}>{props.children}</KonvaStageContext.Provider>
    </>
  );
};

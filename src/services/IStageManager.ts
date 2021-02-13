import Konva from 'konva';

export interface IStageManager {
  setMainStage(stage: Konva.Stage): void;
  getMainStage(): Konva.Stage | undefined;
}

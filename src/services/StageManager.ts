import Konva from 'konva';
import { Stage } from 'konva/types/Stage';
import { IStageManager } from './IStageManager';

export class StageManager implements IStageManager {
  private mainStage: Konva.Stage | undefined = undefined;

  setMainStage(stage: Stage): void {
    this.mainStage = stage;
  }
  getMainStage(): Stage | undefined {
    return this.mainStage;
  }
}

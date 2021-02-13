import { provide } from 'vue';
import { ServiceKeys } from '../compositions/ServiceProvider';
import { StageManager } from './StageManager';
import { UniqueIdProvider } from './UniqueIdProvider';

export const useDependencySetupper = (): void => {
  const stageManagerInst = new StageManager();
  const uniqueIdProviderInst = new UniqueIdProvider();

  provide(ServiceKeys.stageManager, stageManagerInst);
  provide(ServiceKeys.uniqueIdProvider, uniqueIdProviderInst);
};

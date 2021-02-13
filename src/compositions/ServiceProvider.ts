import { inject, InjectionKey } from 'vue';
import { DependencyNotProvidedError } from '../errors/DependencyError';
import { IStageManager } from '../services/IStageManager';
import { IUniqueIdProvider } from '../services/IUniqueIdProvider';

export const ServiceKeys = {
  stageManager: Symbol('StageManager') as InjectionKey<IStageManager>,
  uniqueIdProvider: Symbol('UniqueIdProvider') as InjectionKey<IUniqueIdProvider>,
} as const;

export const useService = <ServiceType>(key: InjectionKey<ServiceType>): ServiceType => {
  const service = inject(key);
  if (service === undefined) {
    throw new DependencyNotProvidedError(key);
  }

  return service;
};

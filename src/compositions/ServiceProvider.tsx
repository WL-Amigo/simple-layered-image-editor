import { createContext, useContext } from 'solid-js';
import { IUniqueIdProvider } from '../services/IUniqueIdProvider';

export interface ServiceContainer {
  uniqueIdProvider: IUniqueIdProvider;
}
export const ServiceContext = createContext<ServiceContainer>();
export const useService = <ServiceKey extends keyof ServiceContainer>(
  key: ServiceKey,
): ServiceContainer[ServiceKey] => {
  const container = useContext(ServiceContext);
  if (container === undefined) {
    throw new Error('ServiceContainer is not provided');
  }
  return container[key];
};

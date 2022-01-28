import { Component, lazy } from 'solid-js';
import { ServiceContainer, ServiceContext } from '../compositions/ServiceProvider';
import { UniqueIdProvider } from './UniqueIdProvider';

export const AllDependencyProvider = lazy(() => {
  const uniqueIdProviderInst = new UniqueIdProvider();

  const container: ServiceContainer = {
    uniqueIdProvider: uniqueIdProviderInst,
  };

  const Provider: Component = (props) => (
    <ServiceContext.Provider value={container}>{props.children}</ServiceContext.Provider>
  );
  return Promise.resolve({
    default: Provider,
  });
});

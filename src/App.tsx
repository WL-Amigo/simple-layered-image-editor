import { Component, Suspense } from 'solid-js';
import { Footer } from './components/Footer';
import { LayerList } from './components/LayerList';
import { LayerView } from './components/LayerView';
import { useLayerManager } from './compositions/LayerManager';
import { AllDependencyProvider } from './services/SetupDependencies';

const Bootstrap: Component = () => {
  return (
    <Suspense>
      <AllDependencyProvider>
        <Body />
      </AllDependencyProvider>
    </Suspense>
  );
};

const Body: Component = () => {
  const { layers, addLayer, deleteLayer, replaceLayer } = useLayerManager();

  return (
    <div class="h-full min-h-full relative flex flex-col overflow-hidden">
      <div class="container mx-auto flex-1 overflow-hidden flex flex-col">
        <LayerList layers={layers()} onAddLayer={addLayer} onReplaceLayer={replaceLayer} onDeleteLayer={deleteLayer} />
        <div class="flex-1 overflow-hidden flex flex-row">
          <LayerView layers={layers()} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const App = Bootstrap;

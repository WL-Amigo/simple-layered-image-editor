import { createApp, defineComponent, h } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import { useDependencySetupper } from './services/SetupDependencies';

createApp(
  defineComponent({
    name: 'Root',
    setup() {
      useDependencySetupper();

      return () => h(App);
    },
  }),
).mount('#app');

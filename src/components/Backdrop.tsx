import { windi } from '@/utils/Windi';
import { Component, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Transition } from 'solid-transition-group';

interface Props {
  isOpen: boolean;
  onClickAway?: () => void;
}
export const Backdrop: Component<Props> = (props) => {
  return (
    <Portal mount={document.getElementById('modal') ?? undefined}>
      <Transition
        enterClass={windi`opacity-0`}
        enterToClass={windi`opacity-100`}
        exitClass={windi`opacity-100`}
        exitToClass={windi`opacity-0`}
      >
        <Show when={props.isOpen}>
          <div
            class="bg-black bg-opacity-25 absolute top-0 left-0 w-screen h-screen flex items-center justify-center transition-opacity duration-200 backdrop-filter backdrop-blur-sm"
            onClick={props.onClickAway}
          >
            {props.children}
          </div>
        </Show>
      </Transition>
    </Portal>
  );
};

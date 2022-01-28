import { windi } from '@/utils/Windi';
import clsx from 'clsx';
import { Component, createMemo, splitProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';

interface Props {
  color?: 'default' | 'primary';
}
export const Button: Component<JSX.ButtonHTMLAttributes<HTMLButtonElement> & Props> = (originalProps) => {
  const [props, restProps] = splitProps(originalProps, ['color', 'children']);
  const colorClasses = createMemo(() => {
    switch (props.color) {
      case 'primary':
        return windi`border-blue-900 bg-blue-500 text-white hover:bg-blue-600`;
      default:
        return windi`border-gray-700 bg-gray-50 hover:bg-gray-100`;
    }
  });

  return (
    <button
      {...restProps}
      class={clsx(windi`h-10 px-4 flex flex-row items-center gap-x-2 rounded border-b-2`, colorClasses())}
    >
      {props.children}
    </button>
  );
};

import { windi } from '@/utils/Windi';
import clsx from 'clsx';
import { Component } from 'solid-js';

export const ExtLink: Component<{ href: string; class?: string }> = (props) => (
  <a
    href={props.href}
    rel="noopener noreferrer"
    target="_blank"
    class={clsx(windi`underline text-black hover:text-gray-700`, props.class)}
  >
    {props.children}
  </a>
);

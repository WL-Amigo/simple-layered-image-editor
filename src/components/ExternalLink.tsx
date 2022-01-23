import { Component } from 'solid-js';

export const ExtLink: Component<{ href: string }> = (props) => (
  <a href={props.href} rel="noopener noreferrer" target="_blank" class="underline text-black hover:text-gray-700">
    {props.children}
  </a>
);

import { Component } from 'solid-js';
import { ExtLink } from './ExternalLink';

export const Footer: Component = () => {
  return (
    <div class="w-full h-12 bg-blue-200 flex flex-row justify-between items-center px-4">
      <div>Simple Layered Image Editor (仮)</div>
      <div>
        <span>built by </span>
        <ExtLink href="https://twitter.com/WL_Amigo">@WL_Amigo</ExtLink>
        <span> (</span>
        <ExtLink href="https://white-luck-bringers.netlify.app/">WhiteLuckBringers</ExtLink>
        <span>), inspired by </span>
        <ExtLink href="https://twitter.com/oreno_ani">@oreno_ani</ExtLink>
        <span>'s </span>
        <ExtLink href="https://twitter.com/oreno_ani/status/1356902652404092930">tweet</ExtLink>
        <span>. </span>
        <button>
          <span class="underline">licenses</span>
        </button>
      </div>
    </div>
  );
};

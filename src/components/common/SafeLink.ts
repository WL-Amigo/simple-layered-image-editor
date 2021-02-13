import { FunctionalComponent, h } from 'vue';

export const ExLink: FunctionalComponent<{ href: string }> = (props, ctx) =>
  h(
    'a',
    {
      href: props.href,
      rel: 'noopener noreferrer',
      target: '_blank',
      class: 'underline text-black hover:text-gray-700',
    },
    ctx.slots.default?.(),
  );

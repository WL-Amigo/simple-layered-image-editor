import { GitHubIcon, PackageIcon, StarIcon } from '@/icons/boxicons';
import { LicenseItem } from '@/model/License';
import { Component, createResource, For, Show } from 'solid-js';
import { Backdrop } from './Backdrop';
import { ExtLink } from './ExternalLink';

const AdditionalLicenses: readonly Readonly<LicenseItem>[] = [
  {
    name: '@iconify/json',
    license: 'MIT',
    url: 'https://iconify.design/icon-sets/',
    category: 'dependency',
  },
];
const AssetLicenses: readonly Readonly<LicenseItem>[] = [
  {
    name: 'Boxicons',
    license: 'CC 4.0',
    url: 'https://boxicons.com/',
    category: 'asset',
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const LicenseModal: Component<Props> = (props) => {
  const [licensesResource] = createResource(() => import('Licenses').then((m) => m.Licenses));

  return (
    <Backdrop isOpen={props.isOpen} onClickAway={props.onClose}>
      <div class="rounded-lg bg-white p-4 space-y-2 w-screen-lg max-w-screen" onClick={(e) => e.stopPropagation()}>
        <Show when={licensesResource()} fallback={<div class="flex justify-center items-center">Loading ...</div>}>
          {(licenses) => (
            <>
              <h1 class="text-2xl">Simple Layered Image Editor (仮)</h1>
              <div class="grid grid-cols-2 gap-2 w-full">
                <div>
                  <span class="pr-4">MIT ライセンス</span>
                  <ExtLink href="https://twitter.com/WL_Amigo">アミーゴ</ExtLink>
                  <span>(</span>
                  <ExtLink href="https://white-luck-bringers.netlify.app/">WhiteLuckBringers</ExtLink>
                  <span>)、</span>
                  <ExtLink href="https://twitter.com/oreno_ani">カツサダ</ExtLink>
                </div>
                <ExtLink
                  href="https://github.com/WL-Amigo/simple-layered-image-editor"
                  class="flex flex-row items-center"
                >
                  <GitHubIcon class="w-6 h-6" />
                  <span class="pl-1">リポジトリ</span>
                </ExtLink>
              </div>
              <h2 class="text-xl pt-2">ソフトウェアライセンス</h2>
              <div class="grid grid-cols-3 gap-2 w-full">
                <For each={[...licenses, ...AdditionalLicenses]}>
                  {(license) => (
                    <div class="ml-8 flex flex-row items-center flex-wrap relative">
                      <PackageIcon class="w-6 h-6 -ml-8 absolute" />
                      <ExtLink href={license.url} class="whitespace-nowrap">
                        {license.name}
                      </ExtLink>
                      <span class="pl-1 whitespace-nowrap">({license.license})</span>
                    </div>
                  )}
                </For>
              </div>
              <h2 class="text-xl pt-2">アセットのライセンス</h2>
              <div class="grid grid-cols-3 gap-2 w-full">
                <For each={AssetLicenses}>
                  {(license) => (
                    <div class="ml-8 flex flex-row items-center flex-wrap relative">
                      <StarIcon class="w-6 h-6 -ml-8 absolute" />
                      <ExtLink href={license.url} class="whitespace-nowrap">
                        {license.name}
                      </ExtLink>
                      <span class="pl-1 whitespace-nowrap">({license.license})</span>
                    </div>
                  )}
                </For>
              </div>
            </>
          )}
        </Show>
      </div>
    </Backdrop>
  );
};

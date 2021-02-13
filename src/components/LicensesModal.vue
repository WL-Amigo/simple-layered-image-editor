<template>
  <teleport to="body">
    <div
      class="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex flex-row justify-center items-center"
      v-if="isOpen"
      @click="$emit('update:isOpen', false)"
    >
      <div class="rounded-lg bg-white p-4 space-y-2" @click.stop="">
        <h1 class="text-2xl">Simple Layered Image Editor (仮)</h1>
        <div class="grid grid-cols-2 gap-2 w-full">
          <div>
            <span class="pr-4">MIT ライセンス</span>
            <ex-link href="https://twitter.com/WL_Amigo">アミーゴ</ex-link>
            <span>(</span>
            <ex-link href="https://white-luck-bringers.netlify.app/">WhiteLuckBringers</ex-link>
            <span>)、</span>
            <ex-link href="https://twitter.com/oreno_ani">カツサダ</ex-link>
          </div>
          <ex-link href="" class="flex flex-row items-center">
            <github-icon class="w-6 h-6" />
            <span class="pl-1">リポジトリ</span>
          </ex-link>
        </div>
        <h2 class="text-xl pt-2">ソフトウェアライセンス</h2>
        <div class="grid grid-cols-3 gap-2 w-full">
          <div v-for="license in softLicenses" :key="license.name" class="ml-8 flex flex-row items-center relative">
            <package-icon class="w-6 h-6 -ml-8 absolute" />
            <ex-link :href="license.url">{{ license.name }}</ex-link>
            <span class="pl-1">({{ license.license }})</span>
          </div>
        </div>
        <h2 class="text-xl pt-2">アセットのライセンス</h2>
        <div class="grid grid-cols-3 gap-2 w-full">
          <div v-for="license in assetLicenses" :key="license.name" class="ml-8 flex flex-row items-center relative">
            <star-icon class="w-6 h-6 -ml-8 absolute" />
            <ex-link :href="license.url">{{ license.name }}</ex-link>
            <span class="pl-1">({{ license.license }})</span>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { LicenseItem } from '@/model/License';
import { defineBooleanType } from '@/utils/VueProps';
import { Licenses } from 'Licenses';
import { defineComponent } from 'vue';
import { ExLink } from '@/components/common/SafeLink';
import PackageIcon from '@/icons/boxicons/package.svg?component';
import StarIcon from '@/icons/boxicons/star.svg?component';
import GithubIcon from '@/icons/boxicons/github.svg?component';

const AssetLicenses: readonly Readonly<LicenseItem>[] = [
  {
    name: 'Boxicons',
    license: 'CC 4.0',
    url: 'https://boxicons.com/',
    category: 'asset',
  },
];

export default defineComponent({
  name: 'LicensesModal',
  components: {
    PackageIcon,
    StarIcon,
    GithubIcon,
    ExLink,
  },
  props: {
    isOpen: defineBooleanType(false),
  },
  emits: {
    'update:isOpen': null,
  },
  setup() {
    return {
      softLicenses: Licenses,
      assetLicenses: AssetLicenses,
    };
  },
});
</script>

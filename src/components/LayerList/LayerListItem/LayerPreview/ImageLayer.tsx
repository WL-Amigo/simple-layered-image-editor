import { ImageLayerConfig } from '@/model/LayerConfig';
import { Component } from 'solid-js';

interface Props {
  imageLayer: ImageLayerConfig;
}
export const ImageLayerPreview: Component<Props> = (props) => (
  <img src={props.imageLayer.url} class="w-full h-full object-cover object-center" />
);

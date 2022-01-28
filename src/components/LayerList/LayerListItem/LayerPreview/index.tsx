import { LayerConfig } from '@/model/LayerConfig';
import { Component } from 'solid-js';
import { ImageLayerPreview } from './ImageLayer';

interface Props {
  layer: LayerConfig;
}
export const LayerPreview: Component<Props> = (props) =>
  props.layer.type === 'image' ? <ImageLayerPreview imageLayer={props.layer} /> : null;

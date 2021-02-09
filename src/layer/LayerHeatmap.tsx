import React from 'react';
import {Map as OLMap, Feature as OLFeature} from 'ol';
import {Heatmap as OLLayerHeatmap} from 'ol/layer';
import {Vector as OLSourceVector} from 'ol/source';

import {default as LayerBaseVector, LayerBaseVectorProps} from './LayerBaseVector';

export interface LayerHeatmapProps extends LayerBaseVectorProps {
    blur?: number;
    radius?: number;
    weight?: (f: OLFeature) => number;
}

class LayerHeatmap extends LayerBaseVector<LayerHeatmapProps> {
    ol: OLLayerHeatmap;
    source: OLSourceVector;
    context: OLMap;

    constructor(props: Readonly<LayerHeatmapProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.source = new OLSourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format
        });
        this.ol = new OLLayerHeatmap({source: this.source, ...props});
        this.eventSources = [this.ol, this.source];
        this.onchange();
    }

    refresh(prev?: LayerHeatmapProps): void {
        super.refresh();
        if (!prev || prev.blur !== this.props.blur) this.ol.setBlur(this.props.blur);
        if (!prev || prev.radius !== this.props.radius) this.ol.setRadius(this.props.radius);
    }
}

export default LayerHeatmap;

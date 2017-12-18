// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../leaflet
//   ../elt

declare module 'elt-leaflet' {
    export * from 'elt-leaflet/map';
    export * from 'elt-leaflet/grouper';
    import * as L_ from 'leaflet';
    export const L: typeof L_;
}

declare module 'elt-leaflet/map' {
    import { Attrs, Component, O, Verb, RO } from 'elt';
    import * as L from 'leaflet';
    export interface MapAttributes extends Attrs {
        center?: RO<L.LatLngExpression | null | undefined>;
        bbox?: RO<L.LatLngBoundsExpression | null | undefined>;
        zoom?: RO<number>;
        tileLayer: string;
    }
    export class Map extends Component {
        attrs: MapAttributes;
        readonly leafletMap: L.Map;
        inserted(node: HTMLElement): void;
        removed(): void;
        panTo(ll: L.LatLng): void;
        addLayer(layer: L.Layer): void;
        render(children: DocumentFragment): Element;
    }
    export type LeafletCallback<T extends L.LeafletEvent> = (ev: T) => any;
    export interface MapWatcherCallbacks {
        autopanstart?: LeafletCallback<L.LeafletEvent>;
        baselayerchange?: LeafletCallback<L.LayersControlEvent>;
        click?: LeafletCallback<L.LeafletMouseEvent>;
        dblclick?: LeafletCallback<L.LeafletMouseEvent>;
        keypress?: LeafletCallback<L.LeafletEvent>;
        layeradd?: LeafletCallback<L.LayerEvent>;
        layerremove?: LeafletCallback<L.LayerEvent>;
        load?: LeafletCallback<L.LeafletEvent>;
        locationerror?: LeafletCallback<L.ErrorEvent>;
        locationfound?: LeafletCallback<L.LocationEvent>;
        mousedown?: LeafletCallback<L.LeafletMouseEvent>;
        mousemove?: LeafletCallback<L.LeafletMouseEvent>;
        mouseout?: LeafletCallback<L.LeafletMouseEvent>;
        mouseover?: LeafletCallback<L.LeafletMouseEvent>;
        mouseup?: LeafletCallback<L.LeafletMouseEvent>;
        move?: LeafletCallback<L.LeafletEvent>;
        moveend?: LeafletCallback<L.LeafletEvent>;
        movestart?: LeafletCallback<L.LeafletEvent>;
        overlayadd?: LeafletCallback<L.LayersControlEvent>;
        overlayremove?: LeafletCallback<L.LayersControlEvent>;
        popupclose?: LeafletCallback<L.PopupEvent>;
        popupopen?: LeafletCallback<L.PopupEvent>;
        preclick?: LeafletCallback<L.LeafletMouseEvent>;
        resize?: LeafletCallback<L.ResizeEvent>;
        tooltipclose?: LeafletCallback<L.TooltipEvent>;
        tooltipopen?: LeafletCallback<L.TooltipEvent>;
        unload?: LeafletCallback<L.LeafletEvent>;
        viewreset?: LeafletCallback<L.LeafletEvent>;
        zoom?: LeafletCallback<L.LeafletEvent>;
        zoomend?: LeafletCallback<L.LeafletEvent>;
        zoomlevelschange?: LeafletCallback<L.LeafletEvent>;
        zoomstart?: LeafletCallback<L.LeafletEvent>;
    }
    export class MapWatcher extends Verb {
        callbacks: MapWatcherCallbacks;
        leaflet_map: L.Map | null;
        constructor(callbacks: MapWatcherCallbacks);
        inserted(): void;
        removed(): void;
    }
    export function WatchMap(callbacks: MapWatcherCallbacks): Node;
    export class MarkerDisplayer extends Verb {
        coords: RO<L.LatLngExpression>;
        dom_marker: Element;
        options: L.MarkerOptions;
        marker: L.Marker;
        constructor(coords: RO<L.LatLngExpression>, dom_marker: Element, options: L.MarkerOptions);
        init(): void;
        inserted(node: Node): void;
        removed(node: Node): void;
    }
    export function DisplayMarker(coords: RO<L.LatLngExpression>, marker: Element, options?: L.MarkerOptions): Node;
    export class LayerDisplayer extends Verb {
        layers: O<L.Layer[] | L.Layer>;
        map: L.Map;
        layer: L.LayerGroup;
        constructor(layers: O<L.Layer[] | L.Layer>);
        init(): void;
        inserted(node: Node): void;
        removed(node: Node): void;
    }
    export function DisplayLayers(layers: RO<null | undefined | L.Layer | (null | undefined | L.Layer)[]>): Node;
    export namespace CSS {
        const map: string;
    }
}

declare module 'elt-leaflet/grouper' {
    import { Verb, Observable, ArrayTransformObservable } from 'elt';
    import * as L from 'leaflet';
    export interface GroupPoint<T> extends L.Point {
            x: number;
            y: number;
            visited: boolean;
            index: number;
            x_index: number;
            y_index: number;
    }
    export interface Cluster<T> extends L.Point {
            x: number;
            y: number;
            points: GroupPoint<T>[];
    }
    export type GrouperCallbackMulti<T> = (item: ArrayTransformObservable<T>, latlng: L.LatLng) => (Element | L.Marker);
    export class Grouper<T> extends Verb {
            extractor: (a: T) => L.LatLng;
            list: Observable<T[]>;
            multi: GrouperCallbackMulti<T>;
            epsilon: number;
            map: L.Map;
            zoom_level: number;
            cluster_layer: L.LayerGroup;
            bound_recompute: () => void;
            child_observables: Observable<any>[];
            lst_x: GroupPoint<T>[];
            lst_y: GroupPoint<T>[];
            o_clusters: Observable<Cluster<T>[]>;
            constructor(extractor: (a: T) => L.LatLng, list: Observable<T[]>, multi: GrouperCallbackMulti<T>, epsilon?: number);
            /**
                *
                * @param point
                * @param epsilon Une distance en pixels
                */
            query(point: GroupPoint<T>, cluster: Cluster<T>, epsilon: number): void;
            /**
                * C'est dans cette méthode qu'on regroupe les items par liste et qu'on rassemble
                * ceux qui ont la même localisation exactement.
                *
                * @param lst La liste à rentrer
                */
            computeLists(): void;
            /**
                * Recompute the clusters or single points.
                */
            recompute(): void;
            inserted(node: Node): void;
            removed(): void;
            /**
                *
                */
            init(): void;
    }
    /**
        *
        * @param items La liste d'items que l'on va vouloir regrouper
        * @param single  L'affichage d'un item simple
        * @param multi L'affichage d'une liste d'items sur les mêmes coordonnées
        * @param regrouped L'affichage de plusieurs points regroupés par distance
        */
    export function GeoGroup<T>(extractor: (a: T) => L.LatLng, items: Observable<T[]>, multi: GrouperCallbackMulti<T>, options?: {
            epsilon: number;
    }): Node;
}


import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { basemapSourceList as basemap, tools, navControl } from './initialState';
import { LayerListItem } from '@/types';

type GenericTools = {
	disabled: boolean;
	active: boolean;
    show: boolean;
	type:
       | 'navigation'
       | 'geolocate'
       | 'fullscreen'
       | 'basemap'
       | 'geocoder'
       | 'terrain'
       | 'measure'
       | 'building'
       | 'layerControl'
       | 'widgetTools'
       | 'attributesTable'
};

type navControls = {
    active: boolean;
    disabled: boolean;
    show: boolean;
    type: 
    |'layers'
    |'systemDynamic'
};

interface MapControlStore {
    activeBasemap: string;
    setActiveBasemap: (value: string) => void;
    basemap: Array<{
		key: string;
		label: string;
		value: string[];
		screenshot?: string;
		maxZoom?: number;
	}>;
    mapperBasemapSingle: () => {
		key: string;
		label: string;
		value: string[];
		screenshot?: string;
		maxZoom?: number;
	};
    tools: { [k in GenericTools['type']]: Omit<GenericTools, 'type'> };
    toolConfig: (x: {key: GenericTools['type'], config: Partial<Omit<GenericTools, 'type'>> }) => void;
    navControl: { [k in navControls['type']]: Omit<navControls, 'type'> };
    navControlConfig: (x: {key: navControls['type'], config: Partial<Omit<navControls, 'type'>> }) => void;
    distanceInfo: string;
    setDistanceInfo: (x: string) => void;
    isOpenAddLayer: boolean;
    setIsOpenAddLayer: (x:boolean) => void;
    extent: any;
    setExtent: (extent: any) => void;
}

export const useMapControl = create<MapControlStore>()(
    devtools(
        (set, get) => ({
            activeBasemap:'maptiler-satellite',
            setActiveBasemap: (payload) => set(
                () => ({ activeBasemap: payload }),
                undefined,
                'setActiveBasemap'
            ),
            basemap,
            mapperBasemapSingle: () => {
                const basemap = get().basemap;
                const activeBasemap = get().activeBasemap;

                return basemap.find((v) => v.key === activeBasemap) ?? { value: [], key: '', label: '', screenshot: '' }
            },
            tools,
            toolConfig: ({ key, config }) => set(
                (prev) => {
                    if (config.active !== undefined) {
                        prev.tools[key].active = config.active
                    }
                    if (config.disabled !== undefined) {
                        prev.tools[key].disabled = config.disabled
                    }
                    if (config.show !== undefined) {
                        prev.tools[key].show = config.show
                    }
                    return {tools: { ...prev.tools }}
                }
            ),
            navControl,
            navControlConfig: ({ key, config }) => set(
                (prev) => {
                    if (config.active !== undefined) {
                        prev.navControl[key].active = config.active
                    }
                    if (config.disabled !== undefined) {
                        prev.navControl[key].disabled = config.disabled
                    }
                    if (config.show !== undefined) {
                        prev.navControl[key].show = config.show
                    }
                    return {navControl: { ...prev.navControl }}
                }
            ),
            distanceInfo: '',
            setDistanceInfo: (payload) => set(
                () => ({ distanceInfo: payload })
            ),
            isOpenAddLayer: false,
            setIsOpenAddLayer: (payload) => set(() => ({ isOpenAddLayer: payload })),
            extent: {},
            setExtent: (extent) => set(() => ({ extent }), undefined, 'setExtent'),
        }),
        { store: 'MAP-CONTROL', name: 'store' }
    )
)
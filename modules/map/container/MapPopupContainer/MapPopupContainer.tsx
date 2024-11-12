import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { useMapData } from '../../data/hooks/useMapData';
import { toTitleCase } from '@/lib/utils';

const fetchFeatureInfo = async (layer: string, point: { x: number, y: number, height:number, width:number }, bbox: string) => {
    const url = `/api/gn/layer/featureInfo?layer=${layer}&x=${point.x}&y=${point.y}&h=${point.height}&w=${point.width}&bbox=${bbox}&srs=EPSG:4326`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const MapPopupContainer: React.FC = () => {
    const { map } = useMap();
    const { layers, setFeatures } = useMapData();
    const [mapLayers, setMapLayers] = useState<string[]>([]);
    const [popup, setPopup] = useState<maplibregl.Popup | null>(null);

    // Effect for getting the map layers
    useEffect(() => {
        if (!map) return;

        const getLayers = () => {
            const data = map.getMap()?.getStyle()?.layers
                .filter(layer => layer.type === 'raster')
                .map(layer => layer.id) || [];
            setMapLayers(data.reverse());
        };

        getLayers();
        map.getMap().on('styledata', getLayers);

        return () => {
            map.getMap().off('styledata', getLayers);
        };
    }, [map]);

    // Effect for handling click event and fetching feature info
    useEffect(() => {
        if (!map || mapLayers.length === 0) return;
        
        const handleOnClick = async (e: maplibregl.MapMouseEvent) => {
            const filterLayer = layers.filter(v => mapLayers.includes(v.layer.id));
            // const width = map.getMap().getCanvas().width;
            // const height = map.getMap().getCanvas().height;
            const width = map.getContainer().clientWidth;
            const height = map.getContainer().clientHeight;
            const x = Math.round(e.point.x); // x coordinate (horizontal)
            const y = Math.round(e.point.y); // y coordinate (vertical)
        
            // const x = Math.round((e.point.x / width) * 256);
            // const y = Math.round((e.point.y / height) * 256);
            const bounds = map.getBounds().toArray().flat();
        
            const sw = map.project([bounds[0], bounds[1]]);
            const ne = map.project([bounds[2], bounds[3]]);
            const bbox3857 = [sw.x, ne.y, ne.x, sw.y];
        
            if (filterLayer.length > 0) {
                if (popup) {
                    popup.remove(); // Remove the previous popup
                }
        
                try {
                    // Fetch feature info for each layer
                    const featureInfoResults = await Promise.all(
                        filterLayer.map(v => fetchFeatureInfo(v.layerName as string, { x, y, height, width }, bounds.join(',')))
                    );
        
                    // Group features by layer name
                    const groupedFeatures = filterLayer.reduce((acc, layer, index) => {
                        const features = featureInfoResults[index]?.features || [];
                        if (features.length > 0) {
                            acc[layer?.layerName || ''] = {
                                title: toTitleCase(layer.name),
                                features
                            };
                        }
                        return acc;
                    }, {} as Record<string, {title:string;features:any[]}>);

                    // Collect all features into a flat array
                    const allFeatures = Object.values(groupedFeatures).flatMap((group) => group.features).map((feature) => ({
                        ...feature,
                        properties: {
                            ...feature.properties,
                            FE_visual_state: 'highlighted' // highlighted or normal
                        }
                    }));

                    // Store all features in the Zustand store
                    setFeatures(allFeatures);
        
                    // Check if we have features to show in the popup
                    const hasFeatures = Object.keys(groupedFeatures).length > 0;

                    if (hasFeatures) {
                        const newPopup = new maplibregl.Popup({
                            closeButton: false,
                            closeOnClick: true,
                            maxWidth: '400px'
                        })
                            .setLngLat(e.lngLat)
                            .setHTML(`
                                <div class="bg-white rounded-sm text-black max-h-[400px] overflow-y-auto">
                                    ${Object.values(groupedFeatures).map((item, index) => `
                                        <div class="px-4 py-2 mb-2 ${index !== Object.values(groupedFeatures).length - 1 ? "border-b" : ""}">
                                            <div class="bg-secondary text-center text-base mb-2 rounded-sm p-2">${item.title}</div>
                                            <ul class="space-y-2">
                                                ${item.features.map(feature => `
                                                    <li class="border-b border-gray-700 pb-2 last:border-none">
                                                        ${Object.entries(feature.properties).map(
                                                            ([key, value]) => `
                                                                <div class="text-sm grid grid-cols-2 gap-1 leading-5">
                                                                    <strong class="text-primary">${key}</strong>
                                                                    <span class="text-black">${value}</span>
                                                                </div>
                                                            `
                                                        ).join('')}
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                    `).join('')}
                                </div>
                            `)
                            .addTo(map.getMap());
        
                        setPopup(newPopup); // Store the new popup
                    }
                } catch (error) {
                    console.error("Error fetching feature info:", error);
                }
            }
        };
        

        map?.on('click', handleOnClick);
        // map.on('click', (e) => {
        //     // Get the map's container width and height
        //     const width = map.getContainer().clientWidth;
        //     const height = map.getContainer().clientHeight;
          
        //     // Get the pixel coordinates of the click
        //     const x = e.point.x; // x coordinate (horizontal)
        //     const y = e.point.y; // y coordinate (vertical)
          
        //     // Get the coordinates of the click in geographical coordinates (lat/lng)
        //     const coordinates = e.lngLat;
          
        //     console.log(`Width: ${width}, Height: ${height}`);
        //     console.log(`Clicked at pixel (x: ${x}, y: ${y})`);
        //     console.log(`Clicked at geographical coordinates (lng: ${coordinates.lng}, lat: ${coordinates.lat})`);
        // });

        return () => {
            map?.off('click', handleOnClick);
            if (popup) {
                popup.remove(); // Cleanup popup on component unmount
            }
        };
    }, [mapLayers, layers]);

    return null; // No JSX as we are managing the popup manually
};

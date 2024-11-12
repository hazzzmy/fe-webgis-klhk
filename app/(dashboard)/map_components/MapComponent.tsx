"use client"

import { useEffect, useRef, useState } from 'react';
import maplibregl, { GeoJSONSource, Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import CustomButtonControl from '@/components/map-components/CustomButtonControlOptions';
import { Building2Icon, Radius } from 'lucide-react';
import * as turf from '@turf/turf';
import { LayersGroup, Location, Source } from '@/types';
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import LayerControl from './LayerControl';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import PopupController from './PopupController';
import { createPulsingDot, genPoiMarkerImages } from '@/lib/utils';


interface MapProps {
    centerMap?: Location;
}

const initialLayersList: LayersGroup = [
    {
        layersGroup: "Layers Group 1",
        layersGroupId: 1,
        layers:[
        {
            id: 1,
            name: "us_states",
            active: false,
            isToggle:false,
            beforeId: undefined,
            layer: {
                id: 'us_states',
                type: 'fill',
                live: false,
                source: 'us_states',
                paint: {
                    'fill-color': '#FFF000',
                    'fill-opacity': 1,
                    'fill-outline-color': '#000'
                }
            },
        },
        {
            id: 2,
            name: "countries",
            active: false,
            isToggle:false,
            beforeId: undefined,
            layer: {
                id: 'countries',
                type: 'fill',
                live: false,
                source: 'statesData',
                'source-layer': 'administrative',
                paint: {
                    'fill-color': '#6B7C93',
                    'fill-opacity': 1,
                }
            },
        },
    ],
    },
    {
        layersGroup: "Web Map Service",
        layersGroupId: 2,
        layers:[
            {
                id: "1",
                name: "wms-test-layer",
                active: false,
                isToggle:false,
                beforeId: undefined,
                layer: {
                    id: 'wms-test-layer',
                    type: 'raster',
                    live: false,
                    source: 'wms-test-source',
                    paint: {},
                },
            },
        ]
    },      
]


const sourceList: Source[] = [
    {
        uuid: '18f15846-f229-4564-bf10-ddaf77447ced',
        id: 'geojson',
        name: "measure-geojson",
        type: "geojson",
        minZoom: 6,
        maxZoom: 20,
        data: {
            type: 'FeatureCollection',
            features: []
        },
    },
    {
        uuid: 'f9c627c1-356a-4004-b135-1f7a963269d1',
        id: 'tileUrl',
        name: "openmaptiles",
        type: "vector",
        url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
        minZoom: 6,
        maxZoom: 20
    }
];

const MapComponent: React.FC<MapProps> = ({ centerMap }) => {

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const measureRef = useRef<boolean>(false);
    const buildingRef = useRef<boolean>(false);
    const [distance, setDistance] = useState<string>("");

    const marker = useRef<maplibregl.Marker | null>(null);
    const [lngLat, setLngLat] = useState<{ lng: number; lat: number } | null>(null);
    const [activeMarker, setActiveMarker] = useState(false);

    const [address, setAddress] = useState<string>('');

    const onMarkerPositionChange = (position: { lng: number; lat: number }, address: string) => {
        setLngLat(position);
        setAddress(address);
    };

    const fetchAddress = async (lng: number, lat: number) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            const address = data.display_name;
            onMarkerPositionChange({ lng, lat }, address);
        } catch (error) {
            console.error('Failed to fetch address:', error);
            onMarkerPositionChange({ lng, lat }, 'Address not found');
        }
    };

    const [toggledLayers, setToggledLayers] = useState<string[]>([]);

    const geojson = useRef({
        type: 'FeatureCollection',
        features: [] as any[]
    });
    const linestring = useRef({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [] as any[]
        }
    });

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new maplibregl.Map({
            container: mapContainer.current,
            center: [-101.058541,40.908231],
            zoom: 3,
            pitch: 0,
            style: {
                version: 8,
                glyphs: `https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
                sources: {
                    osm: {
                        type: "raster",
                        tiles: [
                            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        ],
                        tileSize: 256,
                        attribution: "&copy; OpenStreetMap Contributors",
                        maxzoom: 20,
                    },
                    terrainSource: {
                        type: "raster-dem",
                        url: `https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`,
                        tileSize: 256,
                    },

                },
                layers: [
                    {
                        id: "osm",
                        type: "raster",
                        source: "osm",
                    },
                ],
                terrain: {
                    source: "terrainSource",
                    exaggeration: 1,
                },
            },
            maxZoom: 20,
            maxPitch: 85,
            maxTileCacheZoomLevels: 5,
        });

        mapInstance.current = map

        map.addControl(new maplibregl.FullscreenControl());
        map.addControl(
            new maplibregl.NavigationControl({
                visualizePitch: true,
                showZoom: true,
                showCompass: true,
            })
        );

        map.addControl(
            new maplibregl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );

        map.addControl(
            new maplibregl.TerrainControl({
                source: 'terrainSource',
                exaggeration: 1,
            })
        );

        const measureControl = new CustomButtonControl({
            onClick: () => {
                measureRef.current = !measureRef.current;

                if (!measureRef.current) {
                    geojson.current.features = [];
                    linestring.current.geometry.coordinates = [];
                    (map?.getSource("measure-geojson") as GeoJSONSource).setData(geojson.current as any);
                }
                setDistance('');
            },
            initialActive: measureRef.current,
            icon: <Radius />,
        });

        map.addControl(measureControl);

        const buildingControl = new CustomButtonControl({
            onClick: () => {
                if (!map) return;

                buildingRef.current = !buildingRef.current;

                if (map.getLayer("openmaptiles")) {
                    map.removeLayer("openmaptiles");
                }
                

                if (buildingRef.current) {
                    map.addLayer(
                        {
                            id: "openmaptiles",
                            type: "fill-extrusion",
                            source: "openmaptiles",
                            "source-layer": "building",
                            minzoom: 15,
                            filter: ['!=', ['get', 'hide_3d'], true],
                            paint: {
                                'fill-extrusion-color': '#FFFFFF',
                                'fill-extrusion-opacity': 0.5,
                                'fill-extrusion-height': [
                                    'interpolate',
                                    ['linear'],
                                    ['zoom'],
                                    15,
                                    0,
                                    16,
                                    ['get', 'render_height']
                                ],
                                'fill-extrusion-base': ['case',
                                    ['>=', ['get', 'zoom'], 16],
                                    ['get', 'render_min_height'], 0
                                ]
                            }
                        }
                    )
                }
            },
            initialActive: buildingRef.current,
            icon: <Building2Icon />,
        });

        map.addControl(buildingControl);

        const geocoderApi = {
            forwardGeocode: async (config: any) => {
                const features = [];
                try {
                    const request = `https://nominatim.openstreetmap.org/search?q=${config.query}&format=geojson&polygon_geojson=1&addressdetails=1&marker=False`;
                    const response = await fetch(request);

                    const geojson = await response.json();

                    for (const feature of geojson.features) {
                        const center = [
                            feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
                            feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
                        ];
                        const point = {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: center,
                            },
                            place_name: feature.properties.display_name,
                            properties: feature.properties,
                            text: feature.properties.display_name,
                            place_type: ['place'],
                            center,
                        };
                        features.push(point);
                    }
                } catch (e) {
                    console.error(`Failed to forwardGeocode with error: ${e}`);
                }

                return {
                    features,
                };
            },
        };

        const geocoder = new MaplibreGeocoder(geocoderApi, {
            maplibregl,
            zoom: 18,
            flyTo: false,
            reverseGeocoding: true,
            showResultMarker: false,
            showResultMarkers: false,
            showResultsMarker: false,
            showMarker: false,
            marker: false,
        })

        geocoder.on('result', (e: any) => {
            if(marker.current) {
                marker.current.remove();
                setActiveMarker(false);
            }

            const { result } = e;
            const [lng, lat] = result.center;

            map?.flyTo({
                center: [lng, lat],
                zoom: 15,
                essential: true,
            });

        });

        map.addControl(geocoder, 'top-left');

        map.on('load', async () => {

            
            const colors = ["#f01313","#fcc708","#fcfc08","#7efc08"];
            const layersType = ['volcano','earthquake','groundmovement']
            const pulsingStatuses = ['active', 'inactive']
            
        
            if (colors.length > 0 && layersType.length > 0) {
                layersType.map(async (layer) => {
                    colors.map(async (color) => {
                        pulsingStatuses.map(async (pulsingStatus) => {
                            // Create a pulsing dot for each color and layer
                            map.addImage(`pulsing-dot-${layer}-${pulsingStatus}-${color}`, createPulsingDot(map, color, layer, pulsingStatus as 'active' | 'inactive') as any, { pixelRatio: 2 });
                        })
                    });
                });
            }

            const colorCodes = [
                "#315fba",
                "#47b22a",
                "#471cc6",
                "#f620fe",
                "#73540c",
                "#461c1f",
                "#a5156a",
                "#367cdd",
                "#3ddb18",
                "#87f07c",
                "#21f399",
                "#833bd4",
                "#258777",
                "#1d174f",
                "#ad6740",
                "#e0c0f4",
                "#27d291",
                "#dd7db7",
                "#0cb35f",
                "#2da987",
                "#7927cc",
                "#0000FF"
            ];

            if (colorCodes.length > 0) {
                colorCodes.map(async (color) => {
                    const img = await map.loadImage(genPoiMarkerImages(color))
                    map.addImage(color, img.data)
                })
            }

            setMapLoaded(true); // Set map as loaded
            sourceList.forEach((source) => {
                if (source.id === "geojson") {
                    map?.addSource(source.name, {
                        type: source.type,
                        data: source.data,
                    });
                } else if (source.id === "tile") {
                    map?.addSource(source.name, {
                        type: source.type,
                        tiles: source.tiles,
                        minzoom: source.minZoom,
                        maxzoom: source.maxZoom,
                    });
                } else if (source.id === "tileUrl") {
                    map?.addSource(source.name, {
                        type: source.type,
                        url: source.url,
                        minzoom: source.minZoom,
                        maxzoom: source.maxZoom,
                    });
                }else if (source.id === "raster") {
                    map?.addSource(source.name, {
                        type: source.type,
                        tiles: source.tiles,
                        tileSize: 256,
                        minzoom: source.minZoom,
                        maxzoom: source.maxZoom,
                    });
                }
            });

            map.addLayer({
                id: 'measure-points',
                type: 'circle',
                source: 'measure-geojson',
                paint: {
                    'circle-radius': 5,
                    'circle-color': 'blue',
                },
                filter: ['in', '$type', 'Point'],
            });

            map.addLayer({
                id: 'measure-lines',
                type: 'line',
                source: 'measure-geojson',
                layout: {
                    'line-cap': 'round',
                    'line-join': 'round',
                },
                paint: {
                    'line-color': 'red',
                    'line-width': 2.5,
                    'line-dasharray': [0.5, 2.5],
                },
                filter: ['in', '$type', 'LineString'],
            });

            map.on('click', (e) => {
                // Get the map's container width and height
                const width = map.getContainer().clientWidth;
                const height = map.getContainer().clientHeight;
              
                // Get the pixel coordinates of the click
                const x = e.point.x; // x coordinate (horizontal)
                const y = e.point.y; // y coordinate (vertical)
              
                // Get the coordinates of the click in geographical coordinates (lat/lng)
                const coordinates = e.lngLat;
              
                console.log(`Width: ${width}, Height: ${height}`);
                console.log(`Clicked at pixel (x: ${x}, y: ${y})`);
                console.log(`Clicked at geographical coordinates (lng: ${coordinates.lng}, lat: ${coordinates.lat})`);
              });
              

            map.on('click', (e: any) => {
                if (measureRef.current) {
                    const features = map.queryRenderedFeatures(e.point, {
                        layers: ['measure-points']
                    });

                    if (geojson.current.features.length > 1) geojson.current.features.pop();
                    setDistance('');

                    if (features?.length) {
                        const id = features[0].properties?.id;
                        geojson.current.features = geojson.current.features.filter((point) => point.properties.id !== id);
                    } else {
                        const point = {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [e.lngLat.lng, e.lngLat.lat]
                            },
                            properties: {
                                id: String(new Date().getTime())
                            }
                        };

                        geojson.current.features.push(point);
                    }

                    if (geojson.current.features.length > 1) {
                        linestring.current.geometry.coordinates = geojson.current.features.map(point => point.geometry.coordinates);
                        geojson.current.features.push(linestring.current);
                        const totalDistance = turf.length(linestring.current as any, { units: 'meters' }).toFixed(1);
                        setDistance(`Total distance: ${(Number(totalDistance)).toLocaleString('en-US')} m`);

                    }

                    (map.getSource("measure-geojson") as any).setData(geojson.current as any);
                    map.moveLayer('measure-lines');
                    map.moveLayer('measure-points');
                }
            });

            map.on('mousemove', (e) => {
                if (measureRef.current) {
                    const features = map.queryRenderedFeatures(e.point, {
                        layers: ['measure-points']
                    });
                    if (mapInstance.current) {
                        mapInstance.current.getCanvas().style.cursor = features?.length ? 'pointer' : 'crosshair';
                    }
                } else {
                    if (mapInstance.current) {
                        mapInstance.current.getCanvas().style.cursor = 'pointer';
                    }
                }
            });

        }
        );
        return () => {
            map.remove();
        };

    }, []);


    useEffect(() => {
        if (activeMarker && mapInstance.current) {
            if (marker.current) {
                marker.current.remove();
                setActiveMarker(false);
            }

            const center = mapInstance.current?.getCenter();
            const newMarker = new maplibregl.Marker({ draggable: true })
                .setLngLat(center ? [center.lng, center.lat] : [0, 0])
                .addTo(mapInstance.current);
            fetchAddress(center ? center.lng : 0, center ? center.lat : 0);

            newMarker.on('dragend', () => {
                const { lng, lat } = newMarker.getLngLat();
                setLngLat({ lng, lat });
                fetchAddress(lng, lat);
            });

            marker.current = newMarker;
            setLngLat(center ? { lng: center.lng, lat: center.lat } : { lng: 0, lat: 0 });
            setActiveMarker(true); // Reset the flag after adding the marker
        }else{
            onMarkerPositionChange({ lng: 0, lat: 0 }, '');
            setActiveMarker(false);
            marker.current?.remove();
        }
    }, [activeMarker, mapInstance]);

    return (
        <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel defaultSize={20} minSize={20}>
            <div className='w-full h-full'>
                {mapLoaded && mapInstance.current && ( <LayerControl map={mapInstance.current as maplibregl.Map} layersGroup={initialLayersList} setToggleLayers={setToggledLayers}/>)}
            </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={30}>
            <div className='relative h-full'>
                <div id="mapContainer" ref={mapContainer} className='w-full h-full'/>
                {distance && <div
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        margin: 'auto',
                        width: 'max-content',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        zIndex: 10,
                        borderRadius: '0.5rem',
                    }}
                >
                    {distance}
                </div>}
                {address && lngLat && <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        right: 10,
                        margin: 'auto',
                        maxWidth: '70%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        zIndex: 10,
                        borderRadius: '0.5rem',
                    }}
                >
                    <p>{lngLat["lat"].toFixed(5).toString()}, {lngLat["lng"].toFixed(5).toString()}</p>
                    <p>{address}</p>
                </div>}
                {mapLoaded && mapInstance.current && <PopupController map={mapInstance.current}/>}
            </div>
        </ResizablePanel>
    </ResizablePanelGroup>
    )
};

export default MapComponent;
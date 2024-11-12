import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import './popup.css';

interface PopupControllerProps {
    map: maplibregl.Map | null;
}

const PopupController: React.FC<PopupControllerProps> = ({ map }) => {
    const popup = useRef<maplibregl.Popup | null>(null);
    const [mapLayers, setMapLayers] = useState<string[]>([]);

    // Effect for getting the map layers
    useEffect(() => {
        if (!map) return;

        const getLayers = () => {
            // Include 'symbol' layers along with 'fill' and 'line'
            const layers = map.getStyle().layers
                .filter(layer => layer.type === 'fill' || layer.type === 'line' || layer.type === 'symbol') // Include symbol layers
                .map(layer => layer.id);
            setMapLayers(layers.reverse());
        };

        getLayers();

        // Optional: You can refresh layers when the style changes, if needed
        map.on('styledata', getLayers);

        return () => {
            map.off('styledata', getLayers);
        };
    }, [map]);

    // Effect for generating the popup and attaching the event handler
    useEffect(() => {
        if (!map || mapLayers.length === 0) return;

        // Create a new popup instance
        popup.current = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: true,
        });

        const showPopup = (e: maplibregl.MapMouseEvent) => {
            // Query features on the clicked point using the dynamically retrieved layers
            const queriedFeatures = mapLayers.flatMap(layer =>
                map.queryRenderedFeatures(e.point, { layers: [layer] })
            );

            if (queriedFeatures.length > 0) {
                renderPopup(queriedFeatures, e.lngLat);
            }
        };

        const renderPopup = (featuresToDisplay: maplibregl.MapGeoJSONFeature[], lngLat: maplibregl.LngLat) => {
            const content = featuresToDisplay.map((feature, index) => {
                const layerName = feature.layer.id;

                console.log("LAYERNAME",layerName)
                const properties = feature.properties;

                const propertyList = Object.entries(properties).map(([key, value]) => `
                    <tr>
                        <td style="padding-right: 8px; color: #9AC7F9;width: 180px;"><strong>${key.split("_")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(" ")}</strong></td>
                        <td style="color: #FFFFFF;">${value}</td>
                    </tr>
                `).join('');

                // Conditionally apply border for all but the last item
                const borderBottomStyle = index === featuresToDisplay.length - 1 ? '' : 'border-bottom: 1px solid #444;';

                return `
                    <div style="padding: 10px; width: 100%; ${borderBottomStyle} margin-bottom: 5px;">
                        <h2 style="color: #FFF; margin-bottom:5px; text-align: center; padding: 8px; background-color: #262626; border-radius: 4px;">
                        ${layerName.split("_")
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(" ")}
                            </h2>
                        <table style="width: 100%;">
                            ${propertyList}
                        </table>
                    </div>
                `;
            }).join('');

            const coordinates = lngLat.toArray();
            while (Math.abs(lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.current?.setLngLat(coordinates)
                .setHTML(`
                    <div style="background-color: rgba(0, 0, 0, 0.8); border-radius: 5px; max-height: 400px; overflow-y: auto;padding:0px;">
                        <div style="overflow-y: auto; max-height: 370px; display: flex; flex-direction: column; gap-y: 5px;">
                            ${content}
                        </div>
                    </div>
                `)
                .setMaxWidth('400px')
                .addTo(map);
        };

        // Attach the click event handler
        map.on('click', showPopup);
        

        return () => {
            map.off('click', showPopup);
            popup.current?.remove();
        };
    }, [map, mapLayers]);

    return null; // This component does not render anything
};

export default PopupController;

import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl";
import { SharedComponentButtonTooltip } from "@/shared/components/SharedComponentButtonTooltip";
import { Radius } from "lucide-react"; // Replace with the appropriate icon
import * as turf from "@turf/turf"; // Make sure you have turf.js installed
import CustomButtonControl from "@/components/map-components/CustomButtonControlOptions";
import { GeoJSONSource } from "maplibre-gl";

interface MapControlMeasureProps {
    setDistance: (x:string) => void
    active: boolean;
    onClick: () => void;
    disabled: boolean;
}

export const MapControlMeasure:React.FC<MapControlMeasureProps> = (props) => {
    const { setDistance, active, onClick, disabled } = props

    const map = useMap();
    const mapCurrent = map.current?.getMap();
    const measureControl = useRef<CustomButtonControl | null>(null); // Create a ref for the control

    const geojson = useRef<any>({
        type: "FeatureCollection",
        features: [],
    });
    
    const linestring = useRef<any>({
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: [],
        },
    });

    useEffect(() => {
        if (!mapCurrent) return;

        // Initialize the measure control only once
        if (!measureControl.current) {
            measureControl.current = new CustomButtonControl({
                onClick: toggleMeasureMode,
                initialActive: active,
                icon: <Radius />,
            });
        }

        // Add GeoJSON source
        if (!mapCurrent.getSource("measure-geojson")) {
            mapCurrent.addSource("measure-geojson", {
                type: "geojson",
                data: geojson.current,
            });
        }

        // Add measure layers if they do not exist
        if (!mapCurrent.getLayer("measure-points")) {
            mapCurrent.addLayer({
                id: "measure-points",
                type: "circle",
                source: "measure-geojson",
                paint: {
                    "circle-radius": 5,
                    "circle-color": "blue",
                },
                filter: ["in", "$type", "Point"],
            });

            mapCurrent.addLayer({
                id: "measure-lines",
                type: "line",
                source: "measure-geojson",
                layout: {
                    "line-cap": "round",
                    "line-join": "round",
                },
                paint: {
                    "line-color": "red",
                    "line-width": 2.5,
                    "line-dasharray": [0.5, 2.5],
                },
                filter: ["in", "$type", "LineString"],
            });
        }

        // Click event handler
        const handleClick = (e: any) => {
            if (active) {
                const features = mapCurrent.queryRenderedFeatures(e.point, {
                    layers: ["measure-points"],
                });

                if (geojson.current.features.length > 1) geojson.current.features.pop();
                setDistance("");

                if (features.length) {
                    const id = features[0].properties?.id;
                    geojson.current.features = geojson.current.features.filter(
                        (point: { properties: { id: any; }; }) => point.properties.id !== id
                    );
                } else {
                    const point = {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [e.lngLat.lng, e.lngLat.lat],
                        },
                        properties: {
                            id: String(new Date().getTime()),
                        },
                    };
                    geojson.current.features.push(point);
                }

                if (geojson.current.features.length > 1) {
                    linestring.current.geometry.coordinates = geojson.current.features.map(
                        (point: { geometry: { coordinates: any; }; }) => point.geometry.coordinates
                    );
                    geojson.current.features.push(linestring.current);
                    const totalDistance = turf.length(linestring.current, { units: "meters" }).toFixed(1);
                    setDistance(`Total distance: ${(Number(totalDistance)).toLocaleString("en-US")} m`);
                }

                (mapCurrent.getSource("measure-geojson") as unknown as GeoJSONSource)?.setData(geojson.current);
                mapCurrent.moveLayer("measure-lines");
                mapCurrent.moveLayer("measure-points");
            }
        };

        if (active) {
            const handleMouseMove = (e: any) => {
                const features = mapCurrent.queryRenderedFeatures(e.point, {
                    layers: ["measure-points"],
                });
                mapCurrent.getCanvas().style.cursor = features.length ? "pointer" : "crosshair";
            };

            mapCurrent.on("mousemove", handleMouseMove);

            // Cleanup mouse move listener on unmount or when active changes
            return () => {
                mapCurrent.off("mousemove", handleMouseMove);
                mapCurrent.off("click", handleClick);
            };
        } else {
            // Reset the cursor style when inactive
            mapCurrent.getCanvas().style.cursor = "grab";

            // Remove click event listener
            return () => {
                mapCurrent.off("click", handleClick);
            };
        }
    }, [map, active]); // Include active in the dependency array

    const toggleMeasureMode = () => {
        onClick(); // Toggle the measuring mode state

        geojson.current.features = [];
        linestring.current.geometry.coordinates = [];
        (mapCurrent?.getSource("measure-geojson") as unknown as GeoJSONSource)?.setData(geojson.current);
        setDistance('');
    };

    return (
        <div className="MapControlMeasure">
            <SharedComponentButtonTooltip
                tooltipProps={{
                    side: "right",
                    children: "Measure Distance"
                }}
                style={{ width: 29, height: 29, padding: 0 }}
                onClick={toggleMeasureMode}
                disabled={disabled}
            >
                <Radius size={20} color={active ? '#0088EA' : 'currentColor'} />
            </SharedComponentButtonTooltip>
        </div>
    );
};

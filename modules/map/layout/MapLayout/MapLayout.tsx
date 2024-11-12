import { MapProvider } from 'react-map-gl/maplibre';
import { MapContainer } from '@/modules/map/container/MapContainer';
import { MapLayerBasemap } from '@/modules/map/container/MapLayerBasemap';
import { MapControlContainer } from '../../control/container/MapControlContainer';
import { MapControlLayersContainer } from '../../control/container/MapControlLayersContainer';
import { MapAddLayerContainer } from '../../data/container/MapAddLayerContainer';
import { MapPopupContainer } from '../../container/MapPopupContainer';
import { MapLayerGeojson } from '../../container/MapLayerGeojson';

import '../../style/custom-popup.css'
import { MapFilterByExtent } from '../../container/MapFilterByExtent';

export const MapLayout:React.FC<{ children?: React.ReactNode }> = (props) => {
    return (
        <MapProvider>
            <MapContainer>
                {/* LAYERLIST */}
                <MapLayerBasemap />
                {/* LAYERLIST */}

                {props.children}

                {/* MAP CONTROL */}
                <MapControlContainer />
                {/* MAP CONTROL */}

                <MapControlLayersContainer />
                <MapAddLayerContainer />
                <MapLayerGeojson />
                <MapPopupContainer />
                <MapFilterByExtent />
            </MapContainer>
        </MapProvider>
    )
}
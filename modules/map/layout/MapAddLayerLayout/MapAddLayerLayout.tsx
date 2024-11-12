import React from 'react'

export const MapAddLayerLayout = () => {
  return (
    <div>MapAddLayerLayout</div>
  )
}

export default MapAddLayerLayout

// export const MapLayout:React.FC<{ children?: React.ReactNode }> = (props) => {
//     return (
//         <MapProvider>
//             <MapContainer>
//                 {/* LAYERLIST */}
//                 <MapLayerBasemap />
//                 {/* LAYERLIST */}

//                 {props.children}

//                 {/* MAP CONTROL */}
//                 <MapControlContainer />
//                 {/* MAP CONTROL */}

//                 <MapControlLayersContainer />
//                 <MapAddLayerContainer />
//             </MapContainer>
//         </MapProvider>
//     )
// }
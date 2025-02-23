import { MapControlGeocoder } from '../../components/MapControlGeocoder'
import { MapControlFullscreen } from '../../components/MapControlFullscreen'
import { MapControlGeolocate } from '../../components/MapControlGeolocate'
import { MapControlNavigation } from '../../components/MapControlNavigation'
import { MapControlTerrain } from '../../components/MapControlTerrain'
import { MapControlBuilding } from '../../components/MapControlBuilding/MapControlBuilding'
import React from 'react'
import { MapDistanceInfo } from '../../components/MapDistanceInfo'
import { useMapControl } from '../../hooks/useMapControl'
import { MapControlMeasure } from '../../components/MapControlMeasure'
import { MapControlBasemap } from '../../components/MapControlBasemap'
import { ButtonToggleSidebar } from '../../components/ButtonToggleSidebar'
import { ButtonToggleAttributeLayers } from '../../components/ButtonToggleAttributeLayers'
import { usePathname } from 'next/navigation'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { AttributesTableContainer } from '@/modules/attribute-data/container/AttributesTableContainer'

export const MapControlContainer = () => {
  const mapControl = useMapControl();

  const pathname = usePathname()
  // const active = pathname === '/map' ? mapControl.tools.layerControl.active : systemDynamicControl.tools.systemDynamicControl.active


  return (
    <React.Fragment>
      <ResizablePanelGroup
            direction="vertical"
            className="h-full max-h-screen items-stretch"
            style={{ paddingLeft: mapControl.tools.layerControl.active ? '336px' : '16px', paddingBottom:'16px', paddingRight:'56px' }}
          >
            <ResizablePanel><></></ResizablePanel>
            {mapControl.tools.attributesTable.active && <ResizableHandle withHandle={mapControl.tools.attributesTable.active} />}
            <ResizablePanel
              defaultSize={42}
              minSize={20}
              maxSize={90}
              style={{ display: mapControl.tools.attributesTable.active ? 'block' : 'none', maxWidth: '79vw'}}
              >
              <div className='relative h-full'>
                <AttributesTableContainer sizeWidgetTools={mapControl.tools.widgetTools.active ? 100 : 0} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>

      <div
        className='MapControlContainerTopLeft absolute'
        style={{
          top: 16,
          right: 16,
        }}
      >
        <div className='flex flex-col gap-2 items-end'>
          {mapControl.tools.widgetTools.show && (
            <ButtonToggleSidebar
              position='right'
              isOpen={mapControl.tools.widgetTools.active}
              onClick={() => {
                mapControl.toolConfig({ key: 'widgetTools', config: { active: !mapControl.tools.widgetTools.active } })
              }}
              disabled={mapControl.tools.widgetTools.disabled}
            />
          )}
          {mapControl.tools.geocoder.show && (
            <MapControlGeocoder
              active={mapControl.tools.geocoder.active}
              onClick={() => {
                mapControl.toolConfig({ key: 'geocoder', config: { active: !mapControl.tools.geocoder.active } })
              }}
              disabled={mapControl.tools.geocoder.disabled}
            />
          )}
          {mapControl.tools.fullscreen.show && (
            <MapControlFullscreen
              active={mapControl.tools.fullscreen.active}
              disabled={mapControl.tools.fullscreen.disabled}
              onClick={(value) => {
                mapControl.toolConfig({ key: 'fullscreen', config: { active: value } })
                mapControl.toolConfig({ key: 'layerControl', config: { show: !value } })
              }}
            />
          )}
          {mapControl.tools.navigation.show && (
            <MapControlNavigation
              disabled={mapControl.tools.navigation.disabled}
            />
          )}
          {mapControl.tools.geolocate.show && (
            <MapControlGeolocate
              active={mapControl.tools.geolocate.active}
              onClick={(value) => {
                mapControl.toolConfig({ key: 'geolocate', config: { active: value } })
              }}
              disabled={mapControl.tools.geolocate.disabled}
            />
          )}
          {mapControl.tools.terrain.show && (
            <MapControlTerrain
              active={mapControl.tools.terrain.active}
              onClick={() => {
                mapControl.toolConfig({ key: 'terrain', config: { active: !mapControl.tools.terrain.active } })
              }}
              disabled={mapControl.tools.terrain.disabled}
            />
          )}
          {mapControl.tools.building.show && (
            <MapControlBuilding
              active={mapControl.tools.building.active}
              onClick={() => {
                mapControl.toolConfig({ key: 'building', config: { active: !mapControl.tools.building.active } })
              }}
              disabled={mapControl.tools.building.disabled}
            />
          )}
          {mapControl.tools.measure.show && (
            <MapControlMeasure
              active={mapControl.tools.measure.active}
              onClick={() => {
                mapControl.toolConfig({ key: 'measure', config: { active: !mapControl.tools.measure.active } })
              }}
              disabled={mapControl.tools.measure.disabled}
              setMeasurement={mapControl.setDistanceInfo}
            />
          )}
          {mapControl.tools.basemap.show && (
            <MapControlBasemap
              active={mapControl.tools.basemap.active}
              onClick={() => {
                mapControl.toolConfig({ key: 'basemap', config: { active: !mapControl.tools.basemap.active } })
              }}
              disabled={mapControl.tools.basemap.disabled}
              basemaps={mapControl.basemap}
              activeBasemap={mapControl.activeBasemap}
              setBasemap={mapControl.setActiveBasemap}
            />
          )}
          {mapControl.tools.attributesTable.show && (
              <ButtonToggleAttributeLayers
                position='right'
                isOpen={mapControl.tools.attributesTable.active}
                onClick={() => {
                  mapControl.toolConfig({ key: 'attributesTable', config: { active: !mapControl.tools.attributesTable.active } })
                }}
                disabled={mapControl.tools.attributesTable.disabled}
              />
          )}
        </div>
      </div>
      <div
        className='MapControlContainerBottomLeft absolute'
        style={{
          top: 16,
          left: mapControl.tools.layerControl.active ? 336 : 16,
        }}
      >
        <div className='flex flex-col gap-2'>
          <MapDistanceInfo distance={mapControl.distanceInfo} />
          <div className='flex flex-row gap-2'>
            {mapControl.tools.layerControl.show && (
              <ButtonToggleSidebar
                position='left'
                isOpen={mapControl.tools.layerControl.active}
                onClick={() => {
                  mapControl.toolConfig({ key: 'layerControl', config: { active: !mapControl.tools.layerControl.active } })
                }}
                disabled={mapControl.tools.layerControl.disabled}
              />
            )}
          </div>
        </div>
      </div>
      {/* <div
        className='MapControlContainerBottomRight absolute'
        style={{
          bottom: 16,
          right: 16,
        }}
      >
        <div className='flex flex-col gap-2'>
          {mapControl.tools.widgetTools.show && (
            <ButtonToggleSidebar
              position='right'
              isOpen={mapControl.tools.widgetTools.active}
              onClick={() => {
                mapControl.toolConfig({ key: 'widgetTools', config: { active: !mapControl.tools.widgetTools.active } })
              }}
              disabled={mapControl.tools.widgetTools.disabled}
            />
          )}
        </div>
      </div> */}
    </React.Fragment>
  )
}

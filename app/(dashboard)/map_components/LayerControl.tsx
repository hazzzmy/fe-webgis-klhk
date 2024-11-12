import { useState, useEffect } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Map } from 'maplibre-gl';
import { LayersGroup } from '@/types';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LControl from './LControl';
import { SortableItemGroup } from './SortableItemGroup';

type LayerControlProps = {
    map: Map | undefined;
    layersGroup: LayersGroup;
    setToggleLayers: (layers:string[])=>(void)
};

const LayerControl: React.FC<LayerControlProps> = ({ map, layersGroup, setToggleLayers }) => {
    const [layerList, setLayerList] = useState<LayersGroup>([]);
    const [activeId, setActiveId] = useState(null);

    // Set the 'beforeId' dynamically for each active layer based on the previous active layer
    useEffect(() => {
        let lastActiveLayerId: string | undefined = undefined;
    
        // Iterate over the layersGroup
        const updatedLayers = layersGroup.map((layerGroup) => {
            // Iterate over each layer in the layerGroup
            const updatedGroup = {
                ...layerGroup,
                layers: layerGroup.layers.map((layer) => {
                    // If the current layer is active
                    if (layer.active) {
                        const newLayer = {
                            ...layer,
                            beforeId: lastActiveLayerId, // Set beforeId to the last active layer ID
                        };
                        // Update the last active layer ID to the current one
                        lastActiveLayerId = layer.layer.id;
                        return newLayer;
                    }
                    // If the layer is not active, just return it without modification
                    return layer;
                }),
            };
            return updatedGroup;
        });
    
        // Update the state with the newly computed layer list
        setLayerList(updatedLayers);
    }, []);


    const updateLayersOnMap = (newList: LayersGroup) => {
        if (map) {
            // Flatten the layersGroup to access all layers in a single array
            const activeLayers = newList.flatMap(group => group.layers).filter(layer => layer.active);
            const inactiveLayers = newList.flatMap(group => group.layers).filter(layer => !layer.active);

            inactiveLayers.forEach((layer) => {
                if (map.getLayer(layer.layer.id)) {
                    map.removeLayer(layer.layer.id);
                }
            });

            activeLayers.forEach((layer, index) => {
                const beforeId = activeLayers[index - 1]?.layer.id || undefined;
                if (!map.getLayer(layer.layer.id)) {
                    map.addLayer(layer.layer as any, beforeId);
                }
                if (map.getLayer(layer.layer.id)) {
                    map.moveLayer(layer.layer.id, beforeId);
                }
            });
        }
    };

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: any) => {
        setActiveId(null);
        const { active, over } = event;
        if (active.id !== over.id) {
            setLayerList((prevList) => {
                const oldIndex = prevList.findIndex((item) => item.layersGroupId === active.id);
                const newIndex = prevList.findIndex((item) => item.layersGroupId === over.id);
                const newList = arrayMove(prevList, oldIndex, newIndex);
                updateLayersOnMap(newList);
                return newList;
            });
        }
    };

    
    useEffect(() => {
        if (map) {
            layerList.forEach((group) => {
                group.layers.forEach((layer) => {
                    if (layer.active && !map.getLayer(layer.layer.id)) {
                        map.addLayer(layer.layer as any, layer.beforeId);
                    }
                });
            });
        }
    }, [map, layerList])

    const handleChangeLayerGroup=(layerGroup: LayersGroup) => {
        setLayerList(layerGroup);
        updateLayersOnMap(layerGroup);

        const getToggledLayers = () => {
            const toggled = layerGroup
              .flatMap(group => group.layers) // Flatten the layers from all groups
              .filter(layer => layer.active) // Filter where isToggle is true
              .filter(layer => layer.isToggle) // Filter where isToggle is true
              .map(layer => layer.name); // Get the layer names
            setToggleLayers(toggled);
        };

        getToggledLayers()
    }

    return (
        <Card className="bg-black rounded text-black bg-opacity-50 z-10 h-full w-full flex flex-col border-none">
            <Card className="p-4 rounded rounded-bl-none rounded-br-none border-none bg-black">
                <CardTitle className="text-white text-xl">Layers Control</CardTitle>
            </Card>
            <Separator orientation='horizontal'/>
            <CardContent className="p-3 gap-1 flex flex-col bg-black h-full overflow-y-auto">
                <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <SortableContext items={layerList.map((layer) => layer.layersGroupId)}  strategy={verticalListSortingStrategy}>
                        {layerList.map((layerGroup, index) => (
                            <SortableItemGroup key={layerGroup.layersGroupId} id={layerGroup.layersGroupId} style={'flex flex-col gap-2 card rounded bg-neutral-900 p-2'} groupName={layerGroup.layersGroup}>
                                <LControl groupId={layerGroup.layersGroupId}  map={map} layersGroup={layerList} setLayerG={handleChangeLayerGroup}/>
                            </SortableItemGroup>
                        ))}
                    </SortableContext>
                    <DragOverlay>
                        {activeId ? <div id={activeId} className="flex items-center justify-between p-2 bg-neutral-950 bg-opacity-50 rounded flex-row w-full h-full"> </div> : null}
                    </DragOverlay>
                </DndContext>
            </CardContent>
        </Card>
    );
};

export default LayerControl;

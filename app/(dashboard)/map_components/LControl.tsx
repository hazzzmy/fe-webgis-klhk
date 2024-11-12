import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem'; // Ensure correct path
import { Map } from 'maplibre-gl';
import { LayerGroup, LayerList, LayersGroup } from '@/types';
import { RadioIcon } from 'lucide-react';

type LayerControlProps = {
    map: Map | undefined;
    layersGroup: LayersGroup;
    groupId: number;
    setLayerG: (LayersGroup: LayersGroup)=>(void);
};

const LControl: React.FC<LayerControlProps> = ({ groupId, map, layersGroup, setLayerG }) => {
    const [lg, setLg] = useState<LayersGroup>([]);
    const [layerList, setLayerList] = useState<LayerList>([]);

    // Sync LayersGroup to the local state
    useEffect(() => {
        setLg(layersGroup);
    }, [layersGroup]);

    // Sync the layers to the map on load or changes in layerList or LayersGroup
    useEffect(() => {
        if (map) {
            const lgroup = lg.find((lgg) => lgg.layersGroupId === groupId);
            
            if (lgroup) {
                // updateMapLayers(lgroup.layers);
                setLayerList(lgroup.layers);
            }
        }
    }, [map, lg, groupId]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setLayerList((prevList) => {
                const oldIndex = prevList.findIndex((item) => item.id === active.id);
                const newIndex = prevList.findIndex((item) => item.id === over.id);
                const newList = arrayMove(prevList, oldIndex, newIndex);

                // Update LayersGroup to reflect the new order
                const updatedLayersGroup = lg.map((group) => {
                    if (group.layersGroupId === groupId) {
                        return {
                            ...group,
                            layers: newList
                        };
                    }
                    return group;
                });

                setLg(updatedLayersGroup);
                setLayerG(updatedLayersGroup)
                return newList;
            });
        }
    };

    // Handle layer activation/deactivation (checkbox change)
    const handleCheckboxChange = (layerId: number) => {
        const updatedLayersGroup = lg.map((group) => {
            if (group.layersGroupId === groupId) {
                const updatedLayers = group.layers.map((layer) => {
                    if (layer.id === layerId) {
                        return {
                            ...layer,
                            active: !layer.active
                        };
                    }
                    return layer;
                });

                return {
                    ...group,
                    layers: updatedLayers
                };
            }
            return group;
        });

        setLg(updatedLayersGroup);
        setLayerG(updatedLayersGroup);
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={layerList.map((layer) => layer.id)} strategy={verticalListSortingStrategy}>
                {map && layerList.map((layer) => (
                    <SortableItem
                        id={layer.id}
                        key={layer.id}
                        style="flex items-center justify-between p-2 bg-neutral-800 rounded flex-row w-full"
                        type={2}
                    >
                        <div className="flex flex-row items-center gap-2 w-full">
                            <input
                                type="checkbox"
                                checked={layer.active}
                                onChange={() => handleCheckboxChange(layer.id)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex flex-row items-center gap-2 justify-between w-full">
                                <span className="text-white text-xs">
                                    {layer.name.split("_")
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                        .join(" ")}
                                </span>
                                {layer.layer.live &&
                                <div className='flex px-1 border-red-500 border-2 bg-red-950 flex-row rounded items-center gap-1 justify-center mr-1'>
                                    <RadioIcon className='text-white' size={'0.8rem'}/>
                                    <span className='text-white text-[0.6rem]'>Live</span>
                                </div>
                                }
                            </div>
                        </div>
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default LControl;

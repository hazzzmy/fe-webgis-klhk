import React, { useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button"
import { MinusCircle, PlusCircle } from "lucide-react"
import { useMapData } from "@/modules/map/data/hooks/useMapData";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { LayerListItem } from "@/types";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { dataQueryProperty, useAttributeData } from "@/modules/attribute-data/hooks/useAttributeData";
import { dataChartPropertyValue, useWidget } from "../../hooks";
import { useMapControl } from "@/modules/map/control/hooks/useMapControl";

export const WidgetContainer = () => {
    const {layers} = useMapData();
    const {extent} = useMapControl();
    const {cqlFilter: cql} = useAttributeData();
    const {filterByExtent} = useWidget();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState<LayerListItem|undefined>();
    const [selectedAttr, setSelectedAttr] = useState<string[]>([]);
    
    const layerName = selectedLayer?.layerName as string;
    const cqlFilter = cql[layerName] ?? '';
    const dataAttr = dataQueryProperty(layerName);
    const hasLayerData = !!selectedLayer && !!dataAttr.data;
    const dataChart = dataChartPropertyValue(layerName, extent, filterByExtent, cqlFilter, selectedAttr.join(','), selectedAttr.length > 0 && !!selectedLayer);

    const handleOnCreate = () => {
        setIsDrawerOpen(true);
    }

    const handleLayerSelect = (layerId: string) => {
        const layer = layers.find(layer => layer.id == layerId)
        setSelectedLayer(layer);
    };

    useEffect(() => {
        if (!isDrawerOpen) {
            setSelectedLayer(undefined);
            setSelectedAttr([]);
        }
    }, [isDrawerOpen])

    return (
        <React.Fragment>
            <div className="px-4 flex items-center justify-between text-sm">
                <Button
                    variant={'outline'}
                    className="px-4 py-2 text-primary bg-secondary rounded hover:bg-primary hover:text-white flex items-center gap-2"
                    size='sm'
                    onClick={handleOnCreate}
                >
                    Create
                    <PlusCircle size={20} />
                </Button>
                <div>Total: 0</div>
            </div>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} dismissible={!hasLayerData}>
                <DrawerContent className="flex px-6 pb-6 gap-4 min-h-[90vh]">
                    <DrawerTitle>Chart Editor</DrawerTitle>
                    <DrawerDescription />
                    <div>
                        <div>
                            <div className="grid grid-cols-[1fr_1fr_2fr] gap-4 mb-2">
                                {/* Select Attribute */}
                                <div>
                                    {layers.length > 0 && (
                                        <div className='flex items-center mb-4'>
                                            <p className="min-w-28">Select Layer</p>
                                            <Select onValueChange={handleLayerSelect} value={selectedLayer?.id}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Layer" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {layers.map((layer) => <SelectItem key={layer.id} value={layer.id}>{layer.name}</SelectItem>)}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>      
                                        </div>
                                    )}
                                    {hasLayerData && (
                                            <Card className="w-[25vw] h-[60vh] overflow-auto">
                                                <table className="w-full bg-white">
                                                    <thead>
                                                        <tr>
                                                            <th className="py-2 px-4 border-b text-left">Attribute</th>
                                                            <th className="py-2 px-4 border-b text-left">Type</th>
                                                            <th className="py-2 px-4 border-b">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataAttr?.data?.featureTypes?.length > 0 && dataAttr.data.featureTypes.map((attribute: any) => (
                                                            <tr key={attribute.name}>
                                                                <td className="py-2 px-4 border-b font-medium">{attribute.name}</td>
                                                                <td className="py-2 px-4 border-b">{attribute.localType}</td>
                                                                <td className="py-2 px-4 border-b flex items-center justify-center">
                                                                    <Button
                                                                        disabled={selectedAttr.includes(attribute.name)}
                                                                        variant="outline"
                                                                        onClick={() => {
                                                                            setSelectedAttr((prev) => ([...prev, attribute.name]))
                                                                        }}
                                                                        className="mx-1"
                                                                    >
                                                                        <PlusCircle/>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </Card>
                                    )}
                                </div>

                                {/* Selected Attribute */}
                                {hasLayerData && (
                                    <div>
                                        <p className="leading-10 mb-4">Selected Attribute</p>
                                        <Card className="w-[25vw] h-[60vh] overflow-auto bg-slate-100 p-2 flex flex-col gap-1">
                                            {selectedAttr.map((attr) => (
                                                <Card key={attr} className="w-full flex justify-between items-center py-2 px-4 shadow-md">
                                                    <p>{attr}</p>
                                                    <MinusCircle
                                                        size={20}
                                                        className="cursor-pointer hover:text-red-500"
                                                        onClick={() => {
                                                            setSelectedAttr((prev) => prev.filter((v) => v !== attr))
                                                        }}
                                                    />
                                                </Card>
                                            ))}
                                        </Card>
                                    </div>
                                )}

                                {/* Chart Editor */}
                                {hasLayerData && (
                                    <div className="border">
                                        <p>Example data</p>
                                        <pre>{JSON.stringify(dataChart?.data?.[0], undefined, 2)}</pre>
                                        <p>Total Data: {dataChart.data?.length}</p>
                                    </div>
                                )}
                            </div>

                            {/* Button Action */}
                            {hasLayerData && (
                                <div className="flex items-center gap-2 justify-end">
                                    <Button
                                        disabled={!dataChart.data || dataChart.isLoading}
                                        variant={'outline'}
                                        className="px-4 py-2 text-primary bg-secondary rounded hover:bg-primary hover:text-white"
                                    >
                                        Create
                                    </Button>
                                    <Button
                                        disabled={dataChart.isLoading}
                                        variant={'outline'}
                                        className="px-4 py-2 text-primary bg-secondary rounded hover:bg-primary hover:text-white"
                                        onClick={() => {
                                            setIsDrawerOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}

                        </div>
                        {/* Skeleton Loader */}
                        {!dataAttr.data && !!selectedLayer && (
                            <div className="grid grid-cols-[1fr_1fr_2fr] gap-4">
                                <SkeletonWrapper isLoading={dataAttr.isLoading}>
                                    <Card className="w-[25vw] h-[60vh]" />
                                </SkeletonWrapper>
                                <SkeletonWrapper isLoading={dataAttr.isLoading}>
                                    <Card className="w-[25vw] h-[60vh]" />
                                </SkeletonWrapper>
                                <SkeletonWrapper isLoading={dataAttr.isLoading}>
                                    <Card className="w-full h-[60vh]" />
                                </SkeletonWrapper>
                            </div>
                        )}
                        {(layers.length === 0 || (layers.length > 0 && !selectedLayer)) && (
                            <Card className='p-2 bg-[#F2F2F2] text-[#376C9F] flex flex-row gap-2 justify-center items-center'>
                                <InfoCircledIcon className='w-5 h-5' />
                                <p>{layers.length === 0 ? "Please Add Layer First" : "Please Select Layer First"}</p>
                            </Card>
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}
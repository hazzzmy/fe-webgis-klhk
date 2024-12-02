import React, { useEffect, useState } from "react"
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button"
import { InfoIcon, MinusCircle, Pencil, PlusCircle } from "lucide-react"
import { useMapData } from "@/modules/map/data/hooks/useMapData";
import { Card } from "@/components/ui/card";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { LayerListItem } from "@/types";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { dataQueryProperty, useAttributeData } from "@/modules/attribute-data/hooks/useAttributeData";
import { dataChartPropertyValue, useWidget } from "../../hooks";
import { useMapControl } from "@/modules/map/control/hooks/useMapControl";
import { LayerSelector } from "../../components/LayerSelector";
import { ListAttributes } from "../../components/ListAttributes";
import { SelectedAttributes } from "../../components/SelectedAttributes";
import { LabelSelect } from "../../components/LabelSelector";
import { EmptyState } from "../../components/EmptyState";
import { DataPreview } from "../../components/DataPreview";
import { dataChartPropertyValueMetric, SelectedAttribute } from "../../hooks/useWidget";
import { AggSelector } from "../../components/AggSelector";
import { Stepper } from "../../components/Stepper";
import { StepChartType } from "../../components/StepChartType";
import { ChartType } from "../../components/StepChartType/StepChartType";
import { StepCustomMetric } from "../../components/StepCustomMetric";
import { StepCustomBarArea } from "../../components/StepCustomBarArea";
import { LabelPosition } from "recharts/types/component/Label";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { CustomBarChart } from "../../components/CustomBarChart";
import { CustomMetric } from "../../components/CustomMetric";
import { chartColors } from "../../utils/chartConfig";
import { CustomAreaChart } from "../../components/CustomAreaChart";
import { StepCustomLineScatter } from "../../components/StepCustomLineScatter";
import { StepCustomRadarRadialPie } from "../../components/StepCustomRadarRadialPie";
import { CustomLineChart } from "../../components/CustomLineChart";
import { CustomScatterChart } from "../../components/CustomScatterChart";
import { CustomRadarChart } from "../../components/CustomRadarChart";
import { CustomRadialChart } from "../../components/CustomRadialChart";
import { CustomPieChart } from "../../components/CustomPieChart";

type inputValueChart = {
    id?: string;
    title: string;
    subTitle: string;
    footer: string;
    labelPosition: LabelPosition | 'none';
    legendPosition: string;
    colorPalete: string;
}

type inputValueLineScatter = inputValueChart & {
    xAxisTitle: string;
    yAxisValue: string[],
    yAxisLabel: string,
    yAxisLabelValue: string;
    yAxisTitle: string;
}

type inputValueBarArea = inputValueLineScatter & {
    stacked: 'false' | 'true' | string;
    orientation: string;
}

type inputValueRadarRadialPie = inputValueChart & {
    propertyValue: string[];
}

type inputValueMetric = {
    id?: string;
    title: string;
    subTitle: string;
    unit: string;
    footer: string;
}

const defaultInputValueMetrtic = {
    title: '',
    subTitle: '',
    footer: '',
    unit: '',
}

const defaultInputValueChart: inputValueChart = {
    title: '',
    subTitle: '',
    footer: '',
    labelPosition: 'none',
    legendPosition: 'bottom',
    colorPalete: 'pallete-1'
}

const defaultInputValueLineScatter: inputValueLineScatter = {
    ...defaultInputValueChart,
    xAxisTitle: '',
    yAxisValue: [],
    yAxisLabel: 'false',
    yAxisLabelValue: 'none', // total / count
    yAxisTitle: '',
}

const defaultInputValueBarArea: inputValueBarArea = {
    ...defaultInputValueLineScatter,
    stacked: 'false',
    orientation: 'horizontal',
}

const defaultInputValueRadarRadialPie: inputValueRadarRadialPie = {
    ...defaultInputValueChart,
    propertyValue: []
}

interface ItemDataChart {
    id: string;
    data: {
        type: ChartType;
        input: inputValueBarArea | inputValueMetric | inputValueLineScatter | inputValueRadarRadialPie;
        label: string;
        value?: number;
        chart?: CategoricalChartProps["data"];
        layer?: LayerListItem;
        attrAgg?: SelectedAttribute[];
        aggMetric?: string;
    }
}

interface WrapperChartItemProps {
    children: React.ReactNode;
    onEdit: () => void;
    onRemove: () => void;
}

const WrapperChartItem: React.FC<WrapperChartItemProps> = (props) => {
    const { children, onEdit, onRemove } = props;

    return (
        <div className="relative" style={{...chartColors}}>
            <div className="absolute top-3 right-6">
                <div className="flex items-center gap-2">
                    <Pencil
                        size={20}
                        className="hover:text-primary cursor-pointer"
                        onClick={onEdit}
                    />
                    <MinusCircle
                        size={20}
                        className="hover:text-primary cursor-pointer"
                        onClick={onRemove}
                    />
                </div>
            </div>
            {children}
        </div>
    )
}

export const WidgetContainer = () => {
    const {layers} = useMapData();
    const {extent} = useMapControl();
    const {cqlFilter: cql} = useAttributeData();
    const {filterByExtent} = useWidget();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState<LayerListItem|undefined>();
    const [selectedAttr, setSelectedAttr] = useState<SelectedAttribute[]>([]);
    const [itemsDataChart, setItemsDataChart] = useState<ItemDataChart[]>([]);
    const [selectedLabel, setSelectedLabel] = useState('');
    const [aggMetric, setAggMetric] = useState('')
    const [inputValueMetric, setInputValueMetric] = useState<inputValueMetric>(defaultInputValueMetrtic)
    const [inputValueBarArea, setInputValueBarArea] = useState<inputValueBarArea>(defaultInputValueBarArea)
    const [inputValueLineScatter, setInputValueLineScatter] = useState<inputValueLineScatter>(defaultInputValueLineScatter)
    const [inputValueRadarRadialPie, setInputValueRadarRadialPie] = useState<inputValueRadarRadialPie>(defaultInputValueRadarRadialPie)

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Chart Type', 'Chart Data', 'Customize'];
    const [selectedChartType, setSelectedChartType] = useState<ChartType>();
    const listChart: ChartType[] = ['Bar', 'Area', 'Line', 'Scatter', 'Metric', 'Pie', 'Radar', 'Radial']
    
    const layerName = selectedLayer?.layerName as string;
    const cqlFilter = cql[layerName] ?? '';
    const dataAttr = dataQueryProperty(layerName);
    const hasLayerData = !!selectedLayer && !!dataAttr.data;
    const listAttr = dataAttr?.data?.featureTypes || [];
    const dataChart = dataChartPropertyValue(
        layerName,
        extent,
        filterByExtent,
        cqlFilter,
        [
            {agg: 'count', attr: selectedLabel},
            ...selectedAttr
        ],
        selectedAttr.length > 0 && !!selectedLayer && !!selectedLabel
    );
    const dataChartMetric = dataChartPropertyValueMetric(
        layerName,
        extent,
        filterByExtent,
        cqlFilter,
        [{ agg: aggMetric, attr: selectedLabel }],
        !!selectedLabel && selectedChartType === 'Metric' && !!aggMetric
    );

    const handleOnCreate = () => {
        setIsDrawerOpen(true);
    }

    const handleLayerSelect = (layerId: string) => {
        const layer = layers.find(layer => layer.id == layerId)
        setSelectedLayer(layer);
    };

    const handleSelectLabel = (v: string) => {
        console.log(v);
        
        setSelectedLabel(v);
    }

    useEffect(() => {
        if (!isDrawerOpen) {
            setSelectedLayer(undefined);
            setSelectedLabel('');
            setSelectedAttr([]);
            setAggMetric('')
            setSelectedChartType(undefined);
            setActiveStep(0);
            setInputValueMetric(defaultInputValueMetrtic)
            setInputValueBarArea(defaultInputValueBarArea);
            setInputValueLineScatter(defaultInputValueLineScatter);
            setInputValueRadarRadialPie(defaultInputValueRadarRadialPie);
        }
    }, [isDrawerOpen])

    const renderStep2 = () => (
        <div>
            <div className="grid grid-cols-4 gap-4 mb-2">
                <div>
                    {/* Select Layer */}
                    <LayerSelector layers={layers} selectedLayer={selectedLayer} handleLayerSelect={handleLayerSelect} />

                    {/* Selected Label */}
                    {hasLayerData && (
                        <LabelSelect
                            listAttr={listAttr} 
                            selectedLabel={selectedLabel} 
                            handleSelectLabel={handleSelectLabel}
                            placeholder="Select Label"
                            filter={['int', 'string']}
                        />
                    )}
                </div>
                {hasLayerData && (
                    <>
                        {/* Select Attributes */}
                        <ListAttributes
                            listAttr={listAttr.filter((attr: any) => ['int', 'number'].includes(attr.localType))}
                            selectedLabel={selectedLabel}
                            selectedAttr={selectedAttr}
                            setSelectedAttr={setSelectedAttr}
                        />
                    
                        {/* Selected Attribute */}
                        <SelectedAttributes selectedAttr={selectedAttr} setSelectedAttr={setSelectedAttr} />

                        {/* Data Preview */}
                        <DataPreview data={dataChart?.data} isLoading={dataChart.isLoading} gap={8} />
                    </>
                )}
            </div>

            {/* Skeleton Loader */}
            {!dataAttr.data && !!selectedLayer && (
                <div className="grid grid-cols-4 gap-4">
                    <SkeletonWrapper isLoading={dataAttr.isLoading}>
                        <Card className="w-[25vw] h-[60vh]" />
                    </SkeletonWrapper>
                    <SkeletonWrapper isLoading={dataAttr.isLoading}>
                        <Card className="w-[25vw] h-[60vh]" />
                    </SkeletonWrapper>
                    <SkeletonWrapper isLoading={dataAttr.isLoading}>
                        <Card className="w-full h-[60vh]" />
                    </SkeletonWrapper>
                    <SkeletonWrapper isLoading={dataAttr.isLoading}>
                        <Card className="w-full h-[60vh]" />
                    </SkeletonWrapper>
                </div>
            )}
            {(layers.length === 0 || (layers.length > 0 && !selectedLayer)) && (
                <EmptyState
                    message={layers.length === 0 ? "Please Add Layer First" : "Please Select Layer First"}
                    icon={<InfoCircledIcon />}
                />
            )}

        </div>
    )

    const renderStep2ForMetric = () => (
        <div>
            <div className="grid grid-cols-[1fr_2fr] gap-4 mb-2">
                <div>
                    {/* Select Layer */}
                    <LayerSelector layers={layers} selectedLayer={selectedLayer} handleLayerSelect={handleLayerSelect} />
                    {hasLayerData && (
                        <>
                            <div className="mb-4">
                                <div className="flex flex-col min-w-44 mb-2">
                                    <p className="">Operation</p>
                                </div>
                                <AggSelector
                                    value={aggMetric}
                                    onValueChange={(value) => setAggMetric(value)}
                                    placeholder="Select Operation"
                                />
                            </div>
                        
                            <LabelSelect
                                listAttr={listAttr}
                                selectedLabel={selectedLabel} 
                                handleSelectLabel={handleSelectLabel}
                                placeholder="Select Attribute"
                                filter={['int', 'number']}
                            />
                        </>
                    )}
                </div>

                {/* Data Preview */}
                {hasLayerData && (
                    <>
                        <DataPreview
                            data={dataChartMetric?.data}
                            isLoading={dataChartMetric.isLoading}
                            gap={2}
                        />
                    </>
                )}
            </div>

            {/* Skeleton Loader */}
            {!dataAttr.data && !!selectedLayer && (
                <div className="grid grid-cols-[1fr_2fr] gap-4">
                    <SkeletonWrapper isLoading={dataAttr.isLoading}>
                        <Card className="w-[25vw] h-[60vh]" />
                    </SkeletonWrapper>
                    <SkeletonWrapper isLoading={dataAttr.isLoading}>
                        <Card className="w-[25vw] h-[60vh]" />
                    </SkeletonWrapper>
                </div>
            )}
            {(layers.length === 0 || (layers.length > 0 && !selectedLayer)) && (
                <EmptyState
                    message={layers.length === 0 ? "Please Add Layer First" : "Please Select Layer First"}
                    icon={<InfoCircledIcon />}
                />
            )}

        </div>
    )

    const renderStep3 = () => {
        if (selectedChartType === 'Metric') {
            return (
                <StepCustomMetric
                    chartType={selectedChartType}
                    value={dataChartMetric?.data?.value || 0}
                    inputValue={inputValueMetric}
                    onChange={(x) => setInputValueMetric(x)}
                />
            )
        } else if (selectedChartType === 'Bar' || selectedChartType === 'Area') {
            return (
                <StepCustomBarArea
                    chartType={selectedChartType}
                    dataChart={dataChart?.data}
                    inputValue={inputValueBarArea}
                    onChange={(x) => setInputValueBarArea(x)}
                    label={selectedLabel}
                />
            )
        } else if (selectedChartType === 'Line' || selectedChartType === 'Scatter') {
            return (
                <StepCustomLineScatter
                    chartType={selectedChartType}
                    dataChart={dataChart?.data}
                    inputValue={inputValueLineScatter}
                    onChange={(x) => setInputValueLineScatter(x)}
                    label={selectedLabel}
                />
            )
        } else if (selectedChartType === 'Radar' || selectedChartType === 'Radial' || selectedChartType === 'Pie') {
            return (
                <StepCustomRadarRadialPie
                    chartType={selectedChartType}
                    dataChart={dataChart?.data}
                    inputValue={inputValueRadarRadialPie}
                    onChange={(x) => setInputValueRadarRadialPie(x)}
                    label={selectedLabel}
                />
            )
        }
    }

    const isDisabledNext = () => {
        switch (activeStep) {
            case 0:
                return !selectedChartType;
            case 1: {
                if (selectedChartType === 'Metric') {
                    return !dataChartMetric.data
                } else {
                    return !dataChart.data;
                }
            }
            case 2:
                return false;
            default:
                return false;
        }
    }

    const handleCreateChart = () => {
        const id = itemsDataChart.length === 0 ? 'widget-chart-1' : 'widget-chart-' + (itemsDataChart.length + 1);
        if (selectedChartType === 'Bar' || selectedChartType === 'Area') {
            if (!!inputValueBarArea.id) {
                const updatedIndex = itemsDataChart.findIndex(v => v.id === inputValueBarArea.id);
                const updatedData = itemsDataChart.map((v, idx) => idx === updatedIndex ? {
                    id: inputValueBarArea.id,
                    data: {
                        type: selectedChartType,
                        label: selectedLabel,
                        chart: dataChart?.data,
                        input: {...inputValueBarArea, id: inputValueBarArea.id},
                        attrAgg: selectedAttr,
                        layer: selectedLayer,
                    }
                } as ItemDataChart : v)
                setItemsDataChart(updatedData);
            } else {
                setItemsDataChart((prev) => ([
                    ...prev,
                    {
                        id,
                        data: {
                            type: selectedChartType,
                            label: selectedLabel,
                            chart: dataChart?.data,
                            input: {...inputValueBarArea, id},
                            attrAgg: selectedAttr,
                            layer: selectedLayer,
                        }
                    }
                ]))
            }
        } else if (selectedChartType === 'Line' || selectedChartType === 'Scatter') {
            if (!!inputValueLineScatter.id) {
                const updatedIndex = itemsDataChart.findIndex(v => v.id === inputValueLineScatter.id);
                const updatedData = itemsDataChart.map((v, idx) => idx === updatedIndex ? {
                    id: inputValueLineScatter.id,
                    data: {
                        type: selectedChartType,
                        label: selectedLabel,
                        chart: dataChart?.data,
                        input: {...inputValueLineScatter, id: inputValueLineScatter.id},
                        attrAgg: selectedAttr,
                        layer: selectedLayer,
                    }
                } as ItemDataChart : v)
                setItemsDataChart(updatedData);
            } else {
                setItemsDataChart((prev) => ([
                    ...prev,
                    {
                        id,
                        data: {
                            type: selectedChartType,
                            label: selectedLabel,
                            chart: dataChart?.data,
                            input: {...inputValueLineScatter, id},
                            attrAgg: selectedAttr,
                            layer: selectedLayer,
                        }
                    }
                ]))
            }
        } else if (selectedChartType === 'Radar' || selectedChartType === 'Radial' || selectedChartType === 'Pie') {
            if (!!inputValueRadarRadialPie.id) {
                const updatedIndex = itemsDataChart.findIndex(v => v.id === inputValueRadarRadialPie.id);
                const updatedData = itemsDataChart.map((v, idx) => idx === updatedIndex ? {
                    id: inputValueRadarRadialPie.id,
                    data: {
                        type: selectedChartType,
                        label: selectedLabel,
                        chart: dataChart?.data,
                        input: {...inputValueRadarRadialPie, id: inputValueRadarRadialPie.id},
                        attrAgg: selectedAttr,
                        layer: selectedLayer,
                    }
                } as ItemDataChart : v)
                setItemsDataChart(updatedData);
            } else {
                setItemsDataChart((prev) => ([
                    ...prev,
                    {
                        id,
                        data: {
                            type: selectedChartType,
                            label: selectedLabel,
                            chart: dataChart?.data,
                            input: {...inputValueRadarRadialPie, id},
                            attrAgg: selectedAttr,
                            layer: selectedLayer,
                        }
                    }
                ]))
            }
        } else if (selectedChartType === 'Metric') {
            if (!!inputValueMetric.id) {
                const updatedIndex = itemsDataChart.findIndex(v => v.id === inputValueMetric.id);
                const updatedData = itemsDataChart.map((v, idx) => idx === updatedIndex ? {
                    id: inputValueMetric.id,
                    data: {
                        type: 'Metric',
                        label: selectedLabel,
                        value: dataChartMetric?.data?.value,
                        input: {...inputValueMetric, id: inputValueMetric.id},
                        layer: selectedLayer,
                        aggMetric: aggMetric,
                    }
                } as ItemDataChart : v)
                setItemsDataChart(updatedData);
            } else {
                setItemsDataChart((prev) => ([
                    ...prev,
                    {
                        id,
                        data: {
                            type: 'Metric',
                            label: selectedLabel,
                            value: dataChartMetric?.data?.value,
                            input: {...inputValueMetric, id},
                            layer: selectedLayer,
                            aggMetric: aggMetric,
                        }
                    }
                ]))
            }
        }
        setIsDrawerOpen(false);
    }

    const renderListChartWidget = () => itemsDataChart.map(v => {
        const handleRemoveItem = () => {
            setItemsDataChart((prev) => prev.filter(prevData => prevData.id !== v.id))
        }
        if (v.data.type === 'Bar') {
            return (
                <WrapperChartItem
                    key={v.id}
                    onEdit={() => {
                        setSelectedLayer(v.data.layer)
                        setSelectedChartType(v.data.type)
                        setSelectedLabel(v.data.label)
                        setIsDrawerOpen(true)
                        setActiveStep(1)

                        setInputValueBarArea(v.data.input as inputValueBarArea)
                        setSelectedAttr(v.data.attrAgg as SelectedAttribute[])
                    }}
                    onRemove={handleRemoveItem}
                >
                    <CustomBarChart
                        dataChart={v.data.chart}
                        label={v.data.label}
                        inputValue={v.data.input as inputValueBarArea}
                        withoutTitle
                    />
                </WrapperChartItem>
            )
        } else if (v.data.type === 'Area') {
            return (
                <WrapperChartItem
                    key={v.id}
                    onEdit={() => {
                        setSelectedLayer(v.data.layer)
                        setSelectedChartType(v.data.type)
                        setSelectedLabel(v.data.label)
                        setIsDrawerOpen(true)
                        setActiveStep(1)

                        setInputValueBarArea(v.data.input as inputValueBarArea)
                        setSelectedAttr(v.data.attrAgg as SelectedAttribute[])
                    }}
                    onRemove={handleRemoveItem}
                >
                    <CustomAreaChart
                        dataChart={v.data.chart}
                        label={v.data.label}
                        inputValue={v.data.input as inputValueBarArea}
                        withoutTitle
                    />
                </WrapperChartItem>
            )
        } else if (v.data.type === 'Line') {
            return (
                <WrapperChartItem
                    key={v.id}
                    onEdit={() => {
                        setSelectedLayer(v.data.layer)
                        setSelectedChartType(v.data.type)
                        setSelectedLabel(v.data.label)
                        setIsDrawerOpen(true)
                        setActiveStep(1)

                        setInputValueLineScatter(v.data.input as inputValueLineScatter)
                        setSelectedAttr(v.data.attrAgg as SelectedAttribute[])
                    }}
                    onRemove={handleRemoveItem}
                >
                    <CustomLineChart
                        dataChart={v.data.chart}
                        label={v.data.label}
                        inputValue={v.data.input as inputValueLineScatter}
                        withoutTitle
                    />
                </WrapperChartItem>
            )
        } else if (v.data.type === 'Scatter') {
            return (
                <WrapperChartItem
                    key={v.id}
                    onEdit={() => {
                        setSelectedLayer(v.data.layer)
                        setSelectedChartType(v.data.type)
                        setSelectedLabel(v.data.label)
                        setIsDrawerOpen(true)
                        setActiveStep(1)

                        setInputValueLineScatter(v.data.input as inputValueLineScatter)
                        setSelectedAttr(v.data.attrAgg as SelectedAttribute[])
                    }}
                    onRemove={handleRemoveItem}
                >
                    <CustomScatterChart
                        dataChart={v.data.chart}
                        label={v.data.label}
                        inputValue={v.data.input as inputValueLineScatter}
                        withoutTitle
                    />
                </WrapperChartItem>
            )
        } else if (v.data.type === 'Radar') {
            return (
                <WrapperChartItem
                    key={v.id}
                    onEdit={() => {
                        setSelectedLayer(v.data.layer)
                        setSelectedChartType(v.data.type)
                        setSelectedLabel(v.data.label)
                        setIsDrawerOpen(true)
                        setActiveStep(1)

                        setInputValueRadarRadialPie(v.data.input as inputValueRadarRadialPie)
                        setSelectedAttr(v.data.attrAgg as SelectedAttribute[])
                    }}
                    onRemove={handleRemoveItem}
                >
                    <CustomRadarChart
                        dataChart={v.data.chart}
                        label={v.data.label}
                        inputValue={v.data.input as inputValueRadarRadialPie}
                        withoutTitle
                    />
                </WrapperChartItem>
            )
        } else if (v.data.type === 'Radial') {
            return (
                <WrapperChartItem
                    key={v.id}
                    onEdit={() => {
                        setSelectedLayer(v.data.layer)
                        setSelectedChartType(v.data.type)
                        setSelectedLabel(v.data.label)
                        setIsDrawerOpen(true)
                        setActiveStep(1)

                        setInputValueRadarRadialPie(v.data.input as inputValueRadarRadialPie)
                        setSelectedAttr(v.data.attrAgg as SelectedAttribute[])
                    }}
                    onRemove={handleRemoveItem}
                >
                    <CustomRadialChart
                        dataChart={v.data.chart}
                        label={v.data.label}
                        inputValue={v.data.input as inputValueRadarRadialPie}
                        withoutTitle
                    />
                </WrapperChartItem>
            )
        } else if (v.data.type === 'Pie') {
            return (
                <WrapperChartItem
                    key={v.id}
                    onEdit={() => {
                        setSelectedLayer(v.data.layer)
                        setSelectedChartType(v.data.type)
                        setSelectedLabel(v.data.label)
                        setIsDrawerOpen(true)
                        setActiveStep(1)

                        setInputValueRadarRadialPie(v.data.input as inputValueRadarRadialPie)
                        setSelectedAttr(v.data.attrAgg as SelectedAttribute[])
                    }}
                    onRemove={handleRemoveItem}
                >
                    <CustomPieChart
                        dataChart={v.data.chart}
                        label={v.data.label}
                        inputValue={v.data.input as inputValueRadarRadialPie}
                        withoutTitle
                    />
                </WrapperChartItem>
            )
        } else if (v.data.type === 'Metric') {
            return (
                <WrapperChartItem
                    key={v.id}
                    onEdit={() => {
                        setSelectedLayer(v.data.layer)
                        setSelectedChartType(v.data.type)
                        setSelectedLabel(v.data.label)
                        setIsDrawerOpen(true)
                        setActiveStep(1)

                        setInputValueMetric(v.data.input as inputValueMetric)
                        setAggMetric(v.data.aggMetric as string);
                    }}
                    onRemove={handleRemoveItem}
                >
                    <CustomMetric
                        value={v.data.value}
                        withoutTitle
                        inputValue={v.data.input as inputValueMetric}
                    />
                </WrapperChartItem>
            )
        }
    })

    return (
        <React.Fragment>
            <div className="bg-gray-100 h-screen p-4 gap-4 flex flex-col">
                <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                    <h3 className="text-primary text-xl font-bold">Chart Information</h3>
                    <Button
                        variant={'outline'}
                        className="text-primary bg-secondary rounded hover:bg-primary hover:text-white flex items-center gap-2"
                        size='sm'
                        onClick={handleOnCreate}
                    >
                        Create
                        <PlusCircle size={20} />
                    </Button>
                    {/* <div>Total: {itemsDataChart.length}</div> */}
                </div>
                {itemsDataChart.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 bg-gray-200 overflow-y-auto max-h-[calc(100vh-120px)]">
                        {renderListChartWidget()}
                    </div> 
                ): <Card className="flex p-4 gap-2 justify-center items-center">
                <InfoIcon />
                <p>Please build some chart first</p>
                </Card>}
                </div>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="flex px-6 pb-6 gap-4 min-h-[90vh]">
                    <DrawerTitle>Chart Editor</DrawerTitle>
                    <DrawerDescription />
                    <div className="w-full flex justify-between items-center mb-4">
                        <Stepper steps={steps} activeStep={activeStep} />
                        <div className="flex items-center gap-2">
                            {activeStep > 0 && (
                                <Button
                                    variant={'outline'}
                                    className="min-w-20 px-4 py-2 text-primary bg-secondary rounded hover:bg-primary hover:text-white"
                                    onClick={() => {
                                        setActiveStep(activeStep -1)
                                        if (activeStep === 1) {
                                            setAggMetric('')
                                            setSelectedLabel('')
                                            setSelectedAttr([])
                                        } else if (activeStep === 2 && selectedChartType === 'Metric') {
                                            setInputValueMetric(defaultInputValueMetrtic)
                                        } else if (activeStep === 2 && selectedChartType === 'Bar' || selectedChartType === 'Area') {
                                            setInputValueBarArea(defaultInputValueBarArea);
                                        } else if (activeStep === 2 && selectedChartType === 'Line' || selectedChartType === 'Scatter') {
                                            setInputValueLineScatter(defaultInputValueLineScatter);
                                        } else if (activeStep === 2 && selectedChartType === 'Radar' || selectedChartType === 'Radial' || selectedChartType === 'Pie') {
                                            setInputValueRadarRadialPie(defaultInputValueRadarRadialPie);
                                        }
                                    }}
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                disabled={isDisabledNext()}
                                variant={'outline'}
                                className="min-w-20 px-4 py-2 text-primary bg-secondary rounded hover:bg-primary hover:text-white"
                                onClick={() => {
                                    if (activeStep < steps.length - 1) {
                                        setActiveStep(activeStep + 1)
                                    } else {
                                        handleCreateChart()
                                    }
                                }}
                            >
                                {activeStep < steps.length - 1 ? 'Next' : 'Create'}
                            </Button>
                        </div>
                    </div>
                    {activeStep === 0 && (
                        <StepChartType
                            listChart={listChart}
                            selectedChartType={selectedChartType}
                            setSelectedChartType={setSelectedChartType}
                        />
                    )}
                    {activeStep === 1 && selectedChartType !== 'Metric' && renderStep2()}
                    {activeStep === 1 && selectedChartType === 'Metric' && renderStep2ForMetric()}
                    {activeStep === 2 && renderStep3()}
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    )
}
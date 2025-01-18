'use client'
import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts"
import { Expand, Minimize2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { SystemDynamicInputContainer } from '@/modules/systemdynamic-input/container/SystemDynamicInputContainer'
import { useSystemDynamicControl } from '../../control/hooks'

interface SingleGraphProps {
    param: any,
    data: any
}

export const SingleGraph: React.FC<SingleGraphProps> = ({ param, data }) => {

    const systemDynamicControl = useSystemDynamicControl()

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

    const chartConfig = {
        baseline: {
            label: "Baseline",
            color: "#FF0000",
        },
        simulation: {
            label: "Simulation",
            color: "#60a5fa",
        },
    } satisfies ChartConfig

    // Handle Fullscreen Toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef?.requestFullscreen();
            systemDynamicControl.toolConfig({ key: 'systemDynamicInputControl', config: { active: true } })
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Listen for fullscreen exit
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
            }
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    return (
        <div ref={setContainerRef} className={`relative ${isFullscreen ? "w-screen h-screen bg-white flex flex-row p-4 gap-4" : ""}`}>
            
            <Card key={param.uuid} className={`p-4 h-full ${isFullscreen ? "w-2/3" : ""}`}>
                <CardHeader className="flex justify-between items-center">
                    <div className='w-full flex flex-row justify-between gap-4 items-start'>
                        <CardTitle className="text-primary text-xl">{param.name}</CardTitle>
                        <Button variant="outline" onClick={toggleFullscreen} size="sm" className="text-gray-500 hover:text-gray-700">
                            {isFullscreen ? <Minimize2 size={24} /> : <Expand size={20} />}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className={`h-full ${isFullscreen ? "w-full h-[85vh]" : ""}`}>
                        <LineChart
                            key={JSON.stringify(data)}
                            accessibilityLayer
                            data={data}
                            margin={{
                                left: 10,
                                right: 10,
                                top: 20,
                                bottom: 20,
                            }}
                            width={isFullscreen ? window.innerWidth * 0.65 : undefined} // Adjust width in fullscreen
                            height={isFullscreen ? window.innerHeight - 100 : 400} // Adjust height in fullscreen
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={formatYAxisTick}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                dataKey={"baseline"}
                                type="monotone"
                                stroke={chartConfig.baseline.color}
                                fillOpacity={0.4}
                            />
                            <Line
                                dataKey={"simulation"}
                                type="monotone"
                                stroke={chartConfig.simulation.color}
                                fillOpacity={0.4}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {isFullscreen && (
            <div className="w-1/3 p-4 bg-white rounded shadow-lg">
                <SystemDynamicInputContainer />
            </div>
            )}
        </div>
    )
}

// Custom formatter for Y-axis ticks
function formatYAxisTick(value: number) {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(0)}JT`; // Converts to millions
    }
    return value.toString();
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 shadow-md rounded border flex flex-col">
                <p className="font-semibold text-gray-700 text-center mb-2">Year : {label}</p>
                <hr></hr>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className='w-full'>
                        <div className="m-2 flex flex-row justify-between gap-4">
                            <p style={{ color: entry.color }} className='flex items-start justify-start'>
                                {entry.name}
                            </p>
                            <p style={{ color: entry.color }} className='flex items-end justify-end'>
                                <strong>{formatNumber(entry.value)}</strong>
                            </p>
                        </div>
                        {((index + 1) % 2 === 0) && <hr></hr>}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

function formatNumber(value: number) {
    return new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
    }).format(value);
}

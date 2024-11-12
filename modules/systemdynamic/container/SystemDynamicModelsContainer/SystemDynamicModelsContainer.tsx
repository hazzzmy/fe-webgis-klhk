import { useSystemDynamicData } from "../../data/hooks";
import { useModelsData } from "../../data/hooks/useSystemDynamicData";
// import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

import { InfoIcon, Loader2, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, LineChart,Line, Legend} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useSystemDynamicParameter } from "@/modules/systemdynamic-input/hooks/useSystemDynamicInputData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
export const description = "A stacked area chart"

const LoadingComponent = () => {
	return (
		<div className="flex-col flex items-center justify-center bg-black bg-opacity-60 z-50 gap-4 h-screen">
			<p className="text-white text-wrap">Running System Dynamic Model</p>
			<Loader2 className="w-12 h-12 animate-spin text-secondary" />
		</div>
	)
}

export const SystemDynamicModelsContainer = () => {

  const [firstRender, setFirstRender] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);

  const systemDynamicData = useSystemDynamicData();
  const activeParameters = systemDynamicData.activeParameters();
  const {parameters, grid_layout, setRefetchDataFn} = useSystemDynamicParameter();
  
  const dataQuery = useQuery({
    queryKey: ["systemDynamic"],
    queryFn: async () => {
        const url = `api/py/sd?initial_time=${parameters.initial_time.value}
        &final_time=${parameters.final_time.value}
        &mps_assumption=${parameters.mps_assumption.value}
        &time_to_change_mps_assumption=${parameters.time_to_change_mps_assumption.value}
        &laju_pertumbuhan_populasi_asumsi=${parameters.laju_pertumbuhan_populasi_asumsi.value}
        &time_to_change_laju_pertumbuhan_populasi_asumsi=${parameters.time_to_change_laju_pertumbuhan_populasi_asumsi.value}
        &laju_perubahan_lahan_terbangun_per_kapita_asumsi=${parameters.laju_perubahan_lahan_terbangun_per_kapita_asumsi.value}
        &time_to_change_laju_perubahan_lahan_terbangun_per_kapita=${parameters.time_to_change_laju_perubahan_lahan_terbangun_per_kapita.value}`
        const response = await fetch(url);
        if (!response.ok) {
          console.log(response);
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        return data;
    },
    staleTime: 300000,
    enabled: firstRender || shouldFetch,
  });

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false); // Set to false after first render to prevent automatic fetching
    }
  }, [firstRender]);

  useEffect(() => {
      if (dataQuery.refetch) {
        setRefetchDataFn(dataQuery.refetch);
      }
    }, [dataQuery.refetch, setRefetchDataFn]);
  

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

  if (dataQuery.isLoading) {
    return <LoadingComponent />
  }

  return dataQuery.data && activeParameters.length > 0 ? (
      <div className={`p-6 gap-2 flex overflow-y-auto scrollbar-none max-h-screen grid grid-cols-${grid_layout} w-full`}>
        {activeParameters.length > 0 && activeParameters.map((param: string) => {
          const baseline = filterData(dataQuery.data.baseline, ['time', param]);
          const simulation = filterData(dataQuery.data.result, ['time', param]);

          const data = baseline.map((baseItem:any) => {
            const simItem = simulation.find((simItem:any) => {
              return simItem.time == baseItem.time
            })

            return {
              time: baseItem.time, 
              parameter: param,
              baseline: baseItem[param], 
              simulation: simItem ? simItem[param] : null,
            };
          });

          return (<Card key={param} className="p-4 h-full">
            <CardHeader>
              <CardTitle className="text-primary text-xl">{param}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-full">
                <LineChart
                  accessibilityLayer
                  data={data}
                  margin={{
                    left: 10,
                    right: 10,
                    top: 20,
                    bottom: 20,
                  }}
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
                    // tickMargin={8}
                    tickFormatter={formatYAxisTick}
                  />
                  <ChartTooltip
                    cursor={false}
                  />
                  <Legend/>
                  <Line
                    dataKey={"baseline"}
                    type="monotone"
                    fill="var(--color-baseline)"
                    fillOpacity={0.4}
                    stroke="var(--color-baseline)"
                  />
                  <Line
                    dataKey={"simulation"}
                    type="monotone"
                    fill="var(--color-simulation)"
                    fillOpacity={0.4}
                    stroke="var(--color-simulation)"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          );
        })}
      </div>
      ):(<Card className="flex p-4 gap-2 justify-center items-center m-6">
        <InfoIcon />
        <p>please add first to see model visualization</p>
      </Card>)
};

function filterData(dataArray: any, desiredColumns: any) {
  return dataArray.map((item: any) => {
    return desiredColumns.reduce((obj: any, key: any) => {
      if (item[key] !== undefined) {
        obj[key] = item[key];
      }
      return obj;
    }, {});
  });
}

function formatYAxisTick(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}JT`; // Converts to millions
  }
  return value.toString(); // Returns the number as a string
}

// Custom tooltip formatting function
function formatTooltipValue(value: number) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(0)} JT`;
  }
  return value.toFixed(0);
}


const CustomTooltip = ({ active, payload, label }: { active?: any, payload?: any, label?: any }) => {
  if (active && payload && payload.length) {
    console.log(payload, label)

    return (
      <div className="p-4 rounded bg-white shadow">
        <p className="font-bold text-primary">Year</p>
        <p className="text-primary">{label}</p>
        <p className="font-bold text-primary">{payload[0].name}</p>
        <p className="text-primary">{`${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }

  return null;
};
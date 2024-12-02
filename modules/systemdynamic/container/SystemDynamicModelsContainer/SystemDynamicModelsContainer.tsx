import { useSystemDynamicData } from "../../data/hooks";
// import { useModelsData } from "../../data/hooks/useSystemDynamicData";
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
import { useSystemDynamicInputData, useSystemDynamicParameter } from "@/modules/systemdynamic-input/hooks/useSystemDynamicInputData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
export const description = "A stacked area chart"

const LoadingComponent = (island: {island:string}) => {
	return (
		<div className="flex-col flex items-center justify-center bg-black bg-opacity-60 z-50 gap-4 h-screen">
			<p className="text-white text-wrap">Running System Dynamic Model for {island.island}</p>
			<Loader2 className="w-12 h-12 animate-spin text-secondary" />
		</div>
	)
}

export const SystemDynamicModelsContainer = () => {

  const [firstRender, setFirstRender] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);
  

  const systemDynamicData = useSystemDynamicData();
  const activeParameters = systemDynamicData.activeParameters();
  const {parameters, grid_layout, setRefetchDataFn, setIsFetching} = useSystemDynamicParameter();
  const {island} = useSystemDynamicInputData()
  
  const dataQuery = useQuery({
    queryKey: ["systemDynamic", island],
    queryFn: async () => {
        
        const url = `api/py/sd?${new URLSearchParams({
          initial_time: parameters.initial_time.value.toString(),
          final_time: parameters.final_time.value.toString(),
          mps_assumption: parameters.mps_assumption.value.toString(),
          island: island,
          time_to_change_mps_assumption: parameters.time_to_change_mps_assumption.value.toString(),
          laju_pertumbuhan_populasi_asumsi: parameters.laju_pertumbuhan_populasi_asumsi.value.toString(),
          time_to_change_laju_pertumbuhan_populasi_asumsi: parameters.time_to_change_laju_pertumbuhan_populasi_asumsi.value.toString(),
          laju_perubahan_lahan_terbangun_per_kapita_asumsi: parameters.laju_perubahan_lahan_terbangun_per_kapita_asumsi.value.toString(),
          time_to_change_laju_perubahan_lahan_terbangun_per_kapita: parameters.time_to_change_laju_perubahan_lahan_terbangun_per_kapita.value.toString(),
          elastisitas_lpe_thd_perubahan_teknologi_target: parameters.elastisitas_lpe_thd_perubahan_teknologi_target.value.toString(),
          time_to_change_elastisitas_lpe_thd_perubahan_teknologi: parameters.time_to_change_elastisitas_lpe_thd_perubahan_teknologi.value.toString(),
        }).toString()}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        return data;
    },
    staleTime: 300000,
    // enabled: firstRender || shouldFetch,
    enabled: !!island && (firstRender || shouldFetch),
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

  useEffect(() => {
      if (dataQuery.isFetching) {
        setIsFetching(dataQuery.isFetching);
      }
      return () => {
        setIsFetching(false);
      }
  }, [dataQuery.isFetching, setIsFetching]);

  useEffect(() => {
    if (island) {
      setShouldFetch(true); // Trigger fetch when island changes
    }
  }, [island]);
  

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

  if (!island) {
    return <Card className="flex p-4 gap-2 justify-center items-center">
        <InfoIcon />
        <p>Please select an Island</p>
    </Card>
  }

  if (dataQuery.isLoading) {
    return <LoadingComponent island={island}/>
  }

  return dataQuery.data && activeParameters.length > 0 ? (
      <div className={`p-6 gap-2 flex overflow-y-auto custom-scrollbar grid grid-cols-${grid_layout} w-full bg-white`}>
        { activeParameters.length > 0 && activeParameters.map((param: string) => {
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
                  key={JSON.stringify(data)}
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
      ):(
      <Card className="flex p-4 gap-2 justify-center items-center">
        <InfoIcon />
        <p>Please add the System Dynamic Model to see the results</p>
      </Card>
      )
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
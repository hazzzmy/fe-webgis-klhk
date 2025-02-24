import { useSystemDynamicData } from "../../data/hooks";
import { InfoIcon, Loader2, TrendingUp } from "lucide-react"
import {
  Card,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";
import { useEffect,useState } from "react";
import { SingleGraph } from "../../components/SingleGraph";
import { MultiGraph } from "../../components/MultipleGraph";
import { useSystemDynamicParameter } from "@/modules/systemdynamic-input/hooks/useSystemDynamicParameter";

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
  const activeParameters = systemDynamicData.models;
  const {island, parameters, grid_layout, setRefetchDataFn, setIsFetching} = useSystemDynamicParameter();
  
  const dataQuery = useQuery({
    queryKey: ["systemDynamic", island],
    queryFn: async () => {
        const url = `api/py/sd?${new URLSearchParams({
          initial_time: island && parameters[`${island}`].initial_time.value.toString(),
          final_time: island && island && parameters[`${island}`].final_time.value.toString(),
          mps_assumption: island && parameters[`${island}`].mps_assumption.value.toString(),
          island: island,
          time_to_change_mps_assumption: island && parameters[`${island}`].time_to_change_mps_assumption.value.toString(),
          laju_pertumbuhan_populasi_asumsi: island && parameters[`${island}`].laju_pertumbuhan_populasi_asumsi.value.toString(),
          time_to_change_laju_pertumbuhan_populasi_asumsi: island && parameters[`${island}`].time_to_change_laju_pertumbuhan_populasi_asumsi.value.toString(),
          laju_perubahan_lahan_terbangun_per_kapita_asumsi: island && parameters[`${island}`].laju_perubahan_lahan_terbangun_per_kapita_asumsi.value.toString(),
          time_to_change_laju_perubahan_lahan_terbangun_per_kapita: island && parameters[`${island}`].time_to_change_laju_perubahan_lahan_terbangun_per_kapita.value.toString(),
          elastisitas_lpe_thd_perubahan_teknologi_target: island && parameters[`${island}`].elastisitas_lpe_thd_perubahan_teknologi_target.value.toString(),
          time_to_change_elastisitas_lpe_thd_perubahan_teknologi: island && parameters[`${island}`].time_to_change_elastisitas_lpe_thd_perubahan_teknologi.value.toString(),
          std_kebutuhan_air_per_kapita_sk_146_2023_target: island && parameters[`${island}`].std_kebutuhan_air_per_kapita_sk_146_2023_target.value.toString(),
          waktu_pengubahan_standar_kebutuhan_air_per_kapita: island && parameters[`${island}`].waktu_pengubahan_standar_kebutuhan_air_per_kapita.value.toString(),
          debit_per_detik_pertanian_dasar_sk_146_2023_skenario: island && parameters[`${island}`].debit_per_detik_pertanian_dasar_sk_146_2023_skenario.value.toString(),
          waktu_perubahan_std_debit_per_detik_pertanian: island && parameters[`${island}`].waktu_perubahan_std_debit_per_detik_pertanian.value.toString(),
          lahan_pangan_per_kapita_skenario: island && parameters[`${island}`].lahan_pangan_per_kapita_skenario.value.toString(),
          waktu_perubahan_lahan_pangan_per_kapita: island && parameters[`${island}`].waktu_perubahan_lahan_pangan_per_kapita.value.toString(),
          lahan_built_up_per_kapita_skenario: island && parameters[`${island}`].lahan_built_up_per_kapita_skenario.value.toString(),
          waktu_perubahan_lahan_built_up_per_kapita: island && parameters[`${island}`].waktu_perubahan_lahan_built_up_per_kapita.value.toString()
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
      {activeParameters.length > 0 &&
        activeParameters.map((param: any) => {
          if (param.type === 'single') {
            const baseline = filterData(dataQuery.data.baseline, ['time', param.parameter[0]]);
            const simulation = filterData(dataQuery.data.result, ['time', param.parameter[0]]);
            const data = baseline.map((baseItem: any) => {
              const simItem = simulation.find((simItem: any) => simItem.time === baseItem.time);
              return {
                time: baseItem.time,
                parameter: param.parameter[0],
                baseline: baseItem[param.parameter[0]],
                simulation: simItem ? simItem[param.parameter[0]] : null,
              };
            });
  
            return <SingleGraph key={param.parameter[0]} data={data} param={param} />;
          } else {
              const data = mergeMultiGraphData(dataQuery.data, param.parameter);
              return <MultiGraph key={param.uuid} data={data} param={param} />;
            }
          }
        )}
    </div>
  ) : (
    <Card className="flex p-4 gap-2 justify-center items-center">
      <InfoIcon />
      <p>Please Select an Island to Run the System Dynamic Model</p>
    </Card>
  );
  
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

function mergeMultiGraphData(data: any, parameters: string[]) {
  const baselineData = data.baseline;
  const simulationData = data.result;

  return baselineData.map((baseItem: any) => {
    const simItem = simulationData.find((simItem: any) => simItem.time === baseItem.time);

    // Construct a single row with multiple parameters
    const row: any = { time: baseItem.time };

    parameters.forEach((param) => {
      row[`baseline_${param}`] = baseItem[param] || null;
      row[`simulation_${param}`] = simItem ? simItem[param] : null;
    });

    return row;
  });
}
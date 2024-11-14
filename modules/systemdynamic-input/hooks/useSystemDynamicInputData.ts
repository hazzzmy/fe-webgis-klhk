import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { initialParamterData, initialParameterValue} from './initialState';

// Define the TableData interface
interface TableData {
  id: number;
  year: number;
  value: string;
}

// Define the Store interface that holds the data
interface Store {
  mps: TableData[];
  lajuPertumbuhanPopulasi: TableData[];
  lajuPerubahanLahan: TableData[];
}

// DataStore interface with state and actions
interface DataStore {
  data: Store;                  // The actual data structure
  setData: (newData: Store) => void;  // Action to update the data state
  selectedParameter: string;    // New field for selected parameter
  setSelectedParameter: (param: string) => void;  // Action to set the selected parameter
}

export const useSystemDynamicInputData = create<DataStore>()(
  devtools(
    (set) => ({
      data: initialParamterData,     // Set the initial state with the provided data
      setData: (newData) => set({    // Implement setData to update the entire state
        data: newData,
      }),
      selectedParameter: "",         // Initialize selectedParameter as an empty string
      setSelectedParameter: (param) => set({   // Set only the selectedParameter
        selectedParameter: param
      })
    }),
    { store: 'PARAMETER-DATA', name: 'store' } // DevTools configuration
  )
);


type ParameterType = {
  name: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  baseline: number;
  value: number;
  description:string;
  descriptionOpen:boolean;
};

type InitialParameterValueType = {
  initial_time: ParameterType;
  final_time: ParameterType;
  mps_assumption: ParameterType;
  time_to_change_mps_assumption: ParameterType;
  laju_pertumbuhan_populasi_asumsi: ParameterType;
  time_to_change_laju_pertumbuhan_populasi_asumsi: ParameterType;
  laju_perubahan_lahan_terbangun_per_kapita_asumsi: ParameterType;
  time_to_change_laju_perubahan_lahan_terbangun_per_kapita: ParameterType;
};
// Define the store interface with state and actions
interface ParameterStore {
  grid_layout: number;
  parameters: InitialParameterValueType;  // Holds the parameter data
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
  updateParameterValue: (key: keyof InitialParameterValueType, newValue: number) => void; // Action to update a parameter value
  resetParameters: () => void;
  setGridLayout: (value: number) => void;
  setRefetchDataFn: (fn: any) => void;
  refetchData: any;
  toggleDescriptionOpen: (key: keyof InitialParameterValueType) => void;
}

// Create the Zustand store
export const useSystemDynamicParameter = create<ParameterStore>()(
  devtools(
    (set) => ({
      parameters: initialParameterValue,  // Set initial parameter values
      grid_layout: 2,
      isFetching: false,
      setIsFetching: (value: boolean) => set({ isFetching: value }),
      setGridLayout: (value:number) => set({ grid_layout: value }),
      resetParameters: () => set((state) => {
        const resetState = { parameters: initialParameterValue };
        state.refetchData?.();
        return { ...resetState };
      }),
      refetchData: null,
      setRefetchDataFn: (fn) => set({ refetchData: fn }),
      updateParameterValue: (key, newValue) => set((state) => ({
        parameters: {
          ...state.parameters,
          [key]: {
            ...state.parameters[key],
            value: newValue,
          },
        },
      })),// New action to toggle or set descriptionOpen for a parameter
      toggleDescriptionOpen: (key: keyof InitialParameterValueType) => set((state) => ({
        parameters: {
          ...state.parameters,
          [key]: {
            ...state.parameters[key],
            descriptionOpen: !state.parameters[key].descriptionOpen,  // Toggle the descriptionOpen value
          },
        },
      })),
    }),
    { store: 'PARAMETER-STORE', name: 'Parameter Store' } // DevTools configuration
  )
);
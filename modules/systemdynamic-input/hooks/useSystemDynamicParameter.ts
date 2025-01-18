// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';
// import { initialParameterValue} from './initialState';


// type ParameterType = {
//   name: string;
//   unit: string;
//   min: number;
//   max: number;
//   step: number;
//   baseline: number;
//   value: number;
//   description:string;
//   descriptionOpen:boolean;
// };

// type InitialParameterValueType = {
//   initial_time: ParameterType;
//   final_time: ParameterType;
//   mps_assumption: ParameterType;
//   time_to_change_mps_assumption: ParameterType;
//   laju_pertumbuhan_populasi_asumsi: ParameterType;
//   time_to_change_laju_pertumbuhan_populasi_asumsi: ParameterType;
//   laju_perubahan_lahan_terbangun_per_kapita_asumsi: ParameterType;
//   time_to_change_laju_perubahan_lahan_terbangun_per_kapita: ParameterType;
//   elastisitas_lpe_thd_perubahan_teknologi_target: ParameterType;
//   time_to_change_elastisitas_lpe_thd_perubahan_teknologi: ParameterType;
// };

// type ParameterPulau = {
//   sumatera: InitialParameterValueType;
//   jawa: InitialParameterValueType;
//   kalimantan: InitialParameterValueType;
//   sulawesi: InitialParameterValueType;
//   balinusra: InitialParameterValueType;
//   maluku: InitialParameterValueType;
//   papua: InitialParameterValueType;
// }
// // Define the initial parameters for all islands
// const initialParametersPulau: ParameterPulau = {
//   sumatera: initialParameterValue,
//   jawa: initialParameterValue,
//   kalimantan: initialParameterValue,
//   sulawesi: initialParameterValue,
//   balinusra: initialParameterValue,
//   maluku: initialParameterValue,
//   papua: initialParameterValue,
// };


// // Define the store interface with state and actions
// interface ParameterStore {
//   island: string;
//   setSelectedIsland: (param: string) => void;
//   grid_layout: number;
//   parameters: InitialParameterValueType;  // Holds the parameter data
//   isFetching: boolean;
//   setIsFetching: (value: boolean) => void;
//   updateParameterValue: (key: keyof InitialParameterValueType, newValue: number) => void; // Action to update a parameter value
//   resetParameters: () => void;
//   setGridLayout: (value: number) => void;
//   setRefetchDataFn: (fn: any) => void;
//   refetchData: any;
//   toggleDescriptionOpen: (key: keyof InitialParameterValueType) => void;
// }

// // Create the Zustand store
// export const useSystemDynamicParameter = create<ParameterStore>()(
//   devtools(
//     (set) => ({
//       setSelectedIsland: (param) =>
//         set((state) => {
//           if (state.island !== param) {
//             return { island: param, refetch: true }; // Set refetch true if island changes
//           }
//           return {};
//         }),
//       parameters: initialParameterValue,  // Set initial parameter values
//       grid_layout: 2,
//       isFetching: false,
//       setIsFetching: (value: boolean) => set({ isFetching: value }),
//       setGridLayout: (value:number) => set({ grid_layout: value }),
//       resetParameters: () => set((state) => {
//         const resetState = { parameters: initialParameterValue };
//         state.refetchData?.();
//         return { ...resetState };
//       }),
//       refetchData: null,
//       setRefetchDataFn: (fn) => set({ refetchData: fn }),
//       updateParameterValue: (key, newValue) => set((state) => ({
//         parameters: {
//           ...state.parameters,
//           [key]: {
//             ...state.parameters[key],
//             value: newValue,
//           },
//         },
//       })),// New action to toggle or set descriptionOpen for a parameter
//       toggleDescriptionOpen: (key: keyof InitialParameterValueType) => set((state) => ({
//         parameters: {
//           ...state.parameters,
//           [key]: {
//             ...state.parameters[key],
//             descriptionOpen: !state.parameters[key].descriptionOpen,  // Toggle the descriptionOpen value
//           },
//         },
//       })),
//     }),
//     { store: 'PARAMETER-STORE', name: 'Parameter Store' } // DevTools configuration
//   )
// );

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { initialParameterValue } from './initialState';

type ParameterType = {
  name: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  baseline: number;
  value: number;
  description: string;
  descriptionOpen: boolean;
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
  elastisitas_lpe_thd_perubahan_teknologi_target: ParameterType;
  time_to_change_elastisitas_lpe_thd_perubahan_teknologi: ParameterType;
};

type ParameterPulau = {
  sumatera: InitialParameterValueType;
  jawa: InitialParameterValueType;
  kalimantan: InitialParameterValueType;
  sulawesi: InitialParameterValueType;
  balinusra: InitialParameterValueType;
  maluku: InitialParameterValueType;
  papua: InitialParameterValueType;
}

// Define the store interface with state and actions
interface ParameterStore {
  island: keyof ParameterPulau | ""; // Tracks selected island
  setSelectedIsland: (param: keyof ParameterPulau) => void;
  grid_layout: number;
  parameters: ParameterPulau;  // Holds all island parameters
  isFetching: boolean;
  setIsFetching: (value: boolean) => void;
  updateParameterValue: (key: keyof InitialParameterValueType, newValue: number) => void;
  resetParameters: () => void;
  setGridLayout: (value: number) => void;
  setRefetchDataFn: (fn: any) => void;
  refetchData: () => void;
  toggleDescriptionOpen: (key: keyof InitialParameterValueType) => void;
}

// Define the initial parameters for all islands
const initialParametersPulau: ParameterPulau = {
  sumatera: initialParameterValue.sumatera,
  jawa: initialParameterValue.jawa,
  kalimantan: initialParameterValue.kalimantan,
  sulawesi: initialParameterValue.sulawesi,
  balinusra: initialParameterValue.balinusra,
  maluku: initialParameterValue.maluku,
  papua: initialParameterValue.papua,
};

// Create the Zustand store
export const useSystemDynamicParameter = create<ParameterStore>()(
  devtools(
    (set) => ({
      island: '', // Default selected island
      parameters: initialParametersPulau, // Holds parameters for all islands
      grid_layout: 2,
      isFetching: false,
      setIsFetching: (value: boolean) => set({ isFetching: value }),
      setGridLayout: (value: number) => set({ grid_layout: value }),

      // Action to set selected island and trigger a refresh if the island changes
      setSelectedIsland: (param) =>
        set((state) => {
          if (state.island !== param) {
            state.refetchData(); // Call refetchData after changing island
            return { island: param };
          }
          return {};
        }),
  

      resetParameters: () => set((state) => {
        const resetState = {
          parameters: {
            ...state.parameters,
            [state.island]: initialParameterValue, // Reset only the selected island
          },
        };
        state.refetchData?.();
        return { ...resetState };
      }),

      refetchData: () => {},
      setRefetchDataFn: (fn) => set({ refetchData: fn }),

    
      // Updates a specific parameter value for the selected island
      updateParameterValue: (key, newValue) => set((state) => {
        if (state.island === "") return {}; // Do nothing if no island is selected

        return {
          parameters: {
            ...state.parameters,
            [state.island]: {
              ...state.parameters[state.island],
              [key]: {
                ...state.parameters[state.island][key],
                value: newValue,
              },
            },
          },
        };
      }),

      // Toggles the descriptionOpen property for a parameter in the selected island
      toggleDescriptionOpen: (key) => set((state) => {
        if (state.island === "") return {}; // Do nothing if no island is selected

        return {
          parameters: {
            ...state.parameters,
            [state.island]: {
              ...state.parameters[state.island],
              [key]: {
                ...state.parameters[state.island][key],
                descriptionOpen: !state.parameters[state.island][key].descriptionOpen,
              },
            },
          },
        };
      }),

    }),
    { store: 'PARAMETER-STORE', name: 'Parameter Store' } // DevTools configuration
  )
);

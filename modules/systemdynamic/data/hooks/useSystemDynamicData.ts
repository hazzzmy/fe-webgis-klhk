import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { initialSystemDynamicList} from './initialState';
import { SystemDynamic } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


interface SystemDynamicDataStore {
    models: SystemDynamic[];
    setModels: (models: SystemDynamic[]) => void;
    addModels: (model: SystemDynamic) => void;
    activeParameters: () => string[]; // Make activeParameters a getter function
}

export const useSystemDynamicData = create<SystemDynamicDataStore>()(
    devtools(
        (set, get) => ({
            models: initialSystemDynamicList,
            setModels: (models) => set(() => ({ models }), undefined, 'setModels'),
            addModels: (model) => set((state) => ({ models: [model, ...state.models] })),
            
            // Define activeParameters as a computed getter function
            activeParameters: () =>
                get().models
                    .filter(model => model.active)
                    .flatMap(model => model.parameter),
        }),
        { store: 'SYSTEMDYNAMIC-DATA', name: 'store' }
    )
);

export const useModelsData = () => {
    return useQuery({
        queryKey: ["systemDynamic"],
        queryFn: async () => {
            const url = `api/py/sd`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();

            return data;
        },
        staleTime: 300000,
    });
};
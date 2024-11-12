import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { tools } from './initialState';
import { LayerListItem } from '@/types';

type GenericTools = {
	active: boolean;
	type:
       | 'map'
       | 'systemDynamic'
};

interface MainAppControlStore {
    tools: { [k in GenericTools['type']]: Omit<GenericTools, 'type'> };
    toolConfig: (x: {key: GenericTools['type'], config: Partial<Omit<GenericTools, 'type'>> }) => void;
}

export const useMainAppControl = create<MainAppControlStore>()(
    devtools(
        (set, get) => ({
            tools,
            toolConfig: ({ key, config }) => set(
                (prev) => {
                    if (config.active !== undefined) {
                        prev.tools[key].active = config.active
                    }
                    return {tools: { ...prev.tools }}
                }
            ),
        }),
        { store: 'MAINAPP-CONTROL', name: 'store' }
    )
)
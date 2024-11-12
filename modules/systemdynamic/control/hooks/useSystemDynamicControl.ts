import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { tools } from './initialState';
import { LayerListItem } from '@/types';

type GenericTools = {
	disabled: boolean;
	active: boolean;
    show: boolean;
	type:
       | 'systemDynamicControl'
       | 'systemDynamicInputControl'
};

interface SystemDynamicControlStore {
    tools: { [k in GenericTools['type']]: Omit<GenericTools, 'type'> };
    toolConfig: (x: {key: GenericTools['type'], config: Partial<Omit<GenericTools, 'type'>> }) => void;
}

export const useSystemDynamicControl = create<SystemDynamicControlStore>()(
    devtools(
        (set, get) => ({
            tools,
            toolConfig: ({ key, config }) => set(
                (prev) => {
                    if (config.active !== undefined) {
                        prev.tools[key].active = config.active
                    }
                    if (config.disabled !== undefined) {
                        prev.tools[key].disabled = config.disabled
                    }
                    if (config.show !== undefined) {
                        prev.tools[key].show = config.show
                    }
                    return {tools: { ...prev.tools }}
                }
            ),
        }),
        { store: 'SYSTEMDYNAMIC-CONTROL', name: 'store' }
    )
)
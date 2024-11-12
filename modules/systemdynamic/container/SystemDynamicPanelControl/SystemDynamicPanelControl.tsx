import { ButtonToggleSidebar } from '@/modules/map/control/components/ButtonToggleSidebar'
import React from 'react'
import { useSystemDynamicControl } from '../../control/hooks'

export const SystemDynamicPanelControl = () => {
    const systemDynamicControl = useSystemDynamicControl()

    return (
        <React.Fragment>
            <div
                className='absolute'
                style={{
                    bottom: 32,
                    left: 16,
                }}
            >
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2'>
                        {systemDynamicControl.tools.systemDynamicControl.show && (
                            <ButtonToggleSidebar
                                position='left'
                                isOpen={systemDynamicControl.tools.systemDynamicControl.active}
                                onClick={() => {
                                    systemDynamicControl.toolConfig({ key: 'systemDynamicControl', config: { active: !systemDynamicControl.tools.systemDynamicControl.active } })
                                }}
                                disabled={systemDynamicControl.tools.systemDynamicControl.disabled}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div
                className='absolute'
                style={{
                    bottom: 32,
                    right: 16,
                }}
            >
                <div className='flex flex-col gap-2'>
                    {systemDynamicControl.tools.systemDynamicInputControl.show && (
                            <ButtonToggleSidebar
                                position='right'
                                isOpen={systemDynamicControl.tools.systemDynamicInputControl.active}
                                onClick={() => {
                                    systemDynamicControl.toolConfig({ key: 'systemDynamicInputControl', config: { active: !systemDynamicControl.tools.systemDynamicInputControl.active } })
                                }}
                                disabled={systemDynamicControl.tools.systemDynamicInputControl.disabled}
                            />
                        )}
                </div>
            </div>
        </React.Fragment>
    )
}

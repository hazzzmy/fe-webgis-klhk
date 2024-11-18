import { MapControlLayersContainer } from "@/modules/map/control/container/MapControlLayersContainer"
import { SystemDynamicContainer } from "../../container/SystemDynamicContainer"
import { SystemDynamicControlContainer } from "../../control/container/SystemDynamicControlContainer"
import { SystemDynamicModelsContainer } from "../../container/SystemDynamicModelsContainer"
import { SystemDynamicPanelControl } from "../../container/SystemDynamicPanelControl"
import { Button } from "@/components/ui/button"
import { PanelRight, PanelRightInactiveIcon } from "lucide-react"
import { useSystemDynamicControl } from "../../control/hooks"
import { ButtonToggleSidebar } from "@/modules/map/control/components/ButtonToggleSidebar"


// stara <MapLayout>

export const SystemDynamicLayout:React.FC<{ children?: React.ReactNode }> = (props) => {
    const systemDynamicControl = useSystemDynamicControl()


    return (
        <SystemDynamicContainer>
            {props.children}
            <div className={`${systemDynamicControl.tools.systemDynamicInputControl.active ? "py-4 pl-4 pr-0" : "p-4"} flex flex-col gap-4 max-h-[calc(100vh-60px)] w-full`}>
                <div className='flex flex-row justify-between w-full items-center h-10'>
                    <h3 className="text-primary text-xl font-bold">Modeling Result</h3>
                    {systemDynamicControl.tools.systemDynamicInputControl.show && (
                            <Button size="sm" className="bg-white text-primary hover:bg-gray-200 w-8 h-8 p-0 shadow"
                                onClick={() => {
                                    systemDynamicControl.toolConfig({ key: 'systemDynamicInputControl', config: { active: !systemDynamicControl.tools.systemDynamicInputControl.active } })
                                }}
                                disabled={systemDynamicControl.tools.systemDynamicInputControl.disabled}
                                >
                                {systemDynamicControl.tools.systemDynamicInputControl.active ? <PanelRightInactiveIcon/> : <PanelRight/>}
                            </Button>
                        )}
                </div>
                <SystemDynamicModelsContainer />
            </div>
            {/* <SystemDynamicControlContainer /> */}
            {/* <SystemDynamicPanelControl/> */}
        </SystemDynamicContainer>
    )
}
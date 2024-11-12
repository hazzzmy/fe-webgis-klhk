import { MapControlLayersContainer } from "@/modules/map/control/container/MapControlLayersContainer"
import { SystemDynamicContainer } from "../../container/SystemDynamicContainer"
import { SystemDynamicControlContainer } from "../../control/container/SystemDynamicControlContainer"
import { SystemDynamicModelsContainer } from "../../container/SystemDynamicModelsContainer"
import { SystemDynamicPanelControl } from "../../container/SystemDynamicPanelControl"


// stara <MapLayout>

export const SystemDynamicLayout:React.FC<{ children?: React.ReactNode }> = (props) => {
    return (
        <SystemDynamicContainer>
            {props.children}
            <SystemDynamicModelsContainer />
            <SystemDynamicControlContainer />
            <SystemDynamicPanelControl/>
        </SystemDynamicContainer>
    )
}
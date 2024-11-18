import { Separator } from "@/components/ui/separator"
import { SystemDynamicInputContainer } from "@/modules/systemdynamic-input/container/SystemDynamicInputContainer"
import { SystemDynamicContainer } from "@/modules/systemdynamic/container/SystemDynamicContainer"
import { SystemDynamicLayout } from "@/modules/systemdynamic/layout/SystemDynamicLayout"

export const ToolContainer = () => {
    return (
        // <div className="px-4">Tools Content</div>
        // <SystemDynamicContainer/>
        <div className="flex flex-row bg-gray-100 h-full">
            <SystemDynamicLayout/>
            <SystemDynamicInputContainer/>
        </div>
    )
}
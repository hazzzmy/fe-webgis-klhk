import { SystemDynamicControl } from "../../components/SystemDynamicControl";
import { useSystemDynamicControl } from "../../hooks";
import { useSystemDynamicData } from "@/modules/systemdynamic/data/hooks";
import { SystemDynamicCardModel } from "../../components/SystemDynamicCardModel/SystemDynamicCardModel";



export const SystemDynamicControlContainer = () => {
    const systemDynamicControl = useSystemDynamicControl();
    const systemDynamicData = useSystemDynamicData();
    const allModelsActive = systemDynamicData.models.every(model => model.active);
    const activeParameters = systemDynamicData.activeParameters()

    const handleOnCheck = (uuid: string) => {
        const updatedModels = systemDynamicData.models.map((model) => {
            if (model.uuid === uuid) {
                return {
                    ...model,
                    active: !model.active
                };
            }
            return model;
        });
        systemDynamicData.setModels(updatedModels);
    };

    const handleShowAllModel = () => {
        const updatedModels = systemDynamicData.models.map((model) => ({
            ...model,
            active: allModelsActive ? false:true
        }));
        systemDynamicData.setModels(updatedModels);
    };

    return (
        <SystemDynamicControl
            open={true}
            style={{
                paddingLeft: 60,
                display: systemDynamicControl.tools.systemDynamicControl.active ? '' : 'none'
            }}
            showAll={handleShowAllModel}
        >
            <div className="grid gap-2 p-3 text-primary">
                {systemDynamicData.models.length > 0 && (
                    systemDynamicData.models.map((model) => (
                        <SystemDynamicCardModel 
                            onCheck={handleOnCheck}
                            key={model.uuid}
                            model={model} 
                        />
                    ))
                )}
            </div>
        </SystemDynamicControl>
    );
};

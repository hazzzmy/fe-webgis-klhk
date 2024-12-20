import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSystemDynamicData } from "@/modules/systemdynamic/data/hooks";
import { SharedComponentDrawer } from "@/shared/components/SharedComponentDrawer"
import { CirclePlus, CopyCheckIcon, CopyXIcon, MinusCircleIcon, SlidersHorizontal } from "lucide-react";

const CityPlanSVG = () => {
    return (
        <svg width="85" height="30" viewBox="0 0 51 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.38 15L3.66 8.8V15H0.24V0.96H3.66V7.12L8.34 0.96H12.36L6.92 7.84L12.56 15H8.38ZM17.6053 12.36H22.0853V15H14.1853V0.96H17.6053V12.36ZM35.8766 0.96V15H32.4566V9.22H27.1366V15H23.7166V0.96H27.1366V6.46H32.4566V0.96H35.8766ZM46.4855 15L41.7655 8.8V15H38.3455V0.96H41.7655V7.12L46.4455 0.96H50.4655L45.0255 7.84L50.6655 15H46.4855Z" fill="white" />
        </svg>
    )
}

interface SystemDynamicControlProps {
    open: boolean;
    style?: React.CSSProperties
    children?: React.ReactNode;
    showAll?: () => void;
}

export const SystemDynamicControl: React.FC<SystemDynamicControlProps> = (props) => {
    const { open, style, children, showAll } = props;
    const systemDynamicData = useSystemDynamicData()
    const allModelsActive = systemDynamicData.models.every(model => model.active);


    return (
        <div className="bg-white flex flex-col shadow-md text-primary" style={{ width: 310 }}>
            <div
                className={cn(
                    'flex items-center justify-between',
                    'px-4 py-2',
                    'bg-[#F2F2F2] shadow-md'
                )}
            >
                <div className="flex flex-row gap-2">
                    <SlidersHorizontal />
                    <p>System Dynamic</p>
                </div>
                {!allModelsActive ? <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button variant='ghost' className="p-2" onClick={showAll}>
                                <CopyCheckIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="flex items-center gap-4 h-6" side="left">
                            Show All Models
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                    :
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Button variant='ghost' className="p-2" onClick={showAll}>
                                    <CopyXIcon className="text-red-500 hover:text-primary" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="flex items-center gap-4 h-6" side="left">
                                Close All Models
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
            </div>
            <div style={{ height: 'calc(100% - 90px)' }} className="overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
import Logo from "@/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SharedComponentDrawer } from "@/shared/components/SharedComponentDrawer"
import { UserButton, useUser } from "@clerk/nextjs";
import { CirclePlus, CopyCheckIcon, CopyXIcon, Folder, FolderArchive, FolderCheckIcon, FolderPlus, FolderPlusIcon, LayersIcon, Settings2Icon, SquareCheck } from "lucide-react";
import Image from "next/image";
import { useMapControl } from "../../hooks/useMapControl";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useSystemDynamicData } from "@/modules/systemdynamic/data/hooks";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


const CityPlanSVG = () => {
    return (

        <svg width="85" height="30" viewBox="0 0 51 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.38 15L3.66 8.8V15H0.24V0.96H3.66V7.12L8.34 0.96H12.36L6.92 7.84L12.56 15H8.38ZM17.6053 12.36H22.0853V15H14.1853V0.96H17.6053V12.36ZM35.8766 0.96V15H32.4566V9.22H27.1366V15H23.7166V0.96H27.1366V6.46H32.4566V0.96H35.8766ZM46.4855 15L41.7655 8.8V15H38.3455V0.96H41.7655V7.12L46.4455 0.96H50.4655L45.0255 7.84L50.6655 15H46.4855Z" fill="white" />
        </svg>
    )
}

interface MapControlLayersProps {
    open: boolean;
    style?: React.CSSProperties
    addLayer?: () => void;
    children?: React.ReactNode;
}

export const MapControlLayers: React.FC<MapControlLayersProps> = (props) => {
    const { open, style, children, addLayer } = props;

    const { user } = useUser()

    const mapControl = useMapControl();

    const systemDynamicData = useSystemDynamicData()
    const allModelsActive = systemDynamicData.models.every(model => model.active);



    const handleTabChange = (value: string) => {
        if (value === "layers") {
            mapControl.navControlConfig({ key: "layers", config: { active: true } });
            mapControl.navControlConfig({ key: "systemDynamic", config: { active: false } });
        } else if (value === "system-dynamic") {
            mapControl.navControlConfig({ key: "layers", config: { active: false } });
            mapControl.navControlConfig({ key: "systemDynamic", config: { active: true } });
        }
    };

    return (
        <SharedComponentDrawer open={open} style={style} direction="left">
            <div className="flex flex-col text-primary" style={{ width: 310 }}>
                <div className="flex flex-col rounded-lg bg-white shadow">
                    <div className="flex items-center justify-center rounded-md flex-col">
                        <div className="flex items-center justify-center w-full bg-[#00AD5D] p-3 gap-2 rounded-md rounded-bl-none rounded-br-none">
                            <Image alt="klhk" src="/image/klhklogo.png" width={33} height={45} priority />
                            <CityPlanSVG />
                        </div>
                        <div className="flex items-center justify-center w-full gap-2 rounded-br-lg rounded-bl-lg flex-col h-full">
                            {/* <div className="flex items-center justify-center w-full gap-2 rounded-md rounded-bl-none rounded-br-none p-3 pb-0">
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="All Indonesia Island" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sumatera">Sumatera</SelectItem>
                                        <SelectItem value="Jawa">Jawa</SelectItem>
                                        <SelectItem value="Balinusra">Bali & Nusa Tenggara</SelectItem>
                                        <SelectItem value="Kalimantan">Kalimantan</SelectItem>
                                        <SelectItem value="Sulawesi">Sulawesi</SelectItem>
                                        <SelectItem value="Maluku">Maluku</SelectItem>
                                        <SelectItem value="Papua">Papua</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div> */}
                            {/* <Tabs defaultValue="layers" className="w-full" onValueChange={handleTabChange}>
                                <div className="px-3 pb-1">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="layers">Layers</TabsTrigger>
                                        <TabsTrigger value="system-dynamic">System Dynamic</TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value="layers" className="p-0 bg-white rounded-br-lg rounded-bl-lg max-h-screen"> */}
                                <div className="w-full bg-white rounded-br-lg rounded-bl-lg">
                                    <div className="flex flex-col">
                                        <div
                                            className={cn(
                                                'flex items-center justify-between',
                                                'py-2 px-4',
                                                'bg-[#F2F2F2] shadow-md'
                                            )}
                                        >
                                            <div className="flex flex-row gap-2">
                                                <LayersIcon />
                                                <p>Layers</p>
                                            </div>
                                            <TooltipProvider>
                                                <Tooltip delayDuration={0}>
                                                    <TooltipTrigger asChild>
                                                        <Button variant='ghost' className="p-2" onClick={addLayer}>
                                                            <FolderPlusIcon />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="flex items-center gap-4 h-6" side="left">
                                                        Add Layer
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                        <div className="overflow-y-auto custom-scrollbar max-h-[75vh]">
                                            {children}
                                        </div>
                                        <div
                                            className={"flex w-full gap-2 flex justify-center items-center flex-row p-4 bg-gray-100 shadow rounded-md rounded-tl-none rounded-tr-none"}>
                                            <UserButton afterSignOutUrl="/sign-in" />
                                            {user && (
                                                <p>
                                                    {user.username}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* <TabsContent value="system-dynamic" className="p-0 bg-white rounded-br-lg rounded-bl-lg">
                                    <div className="flex flex-col">
                                        <div className="overflow-y-auto custom-scrollbar">
                                            {children}
                                        </div>
                                        <div
                                            className={"flex w-full gap-2 flex justify-center items-center flex-row p-4 bg-gray-100 shadow rounded-md rounded-tl-none rounded-tr-none"}>
                                            <UserButton afterSignOutUrl="/sign-in" />
                                            {user && (
                                                <p>
                                                    {user.username}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs> */}
                        </div>
                    </div>
                </div>
            </div>
        </SharedComponentDrawer>
    )
}
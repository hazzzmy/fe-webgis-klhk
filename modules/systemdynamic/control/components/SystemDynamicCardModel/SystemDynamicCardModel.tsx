import { Checkbox } from "@/components/ui/checkbox";
import { cn, toTitleCase } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronsDownUp, ChevronsUpDown, CircleMinus, CirclePlusIcon, Filter, Fullscreen, GripVerticalIcon, Info } from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { SystemDynamic } from "@/types";
import { TooltipContentProps } from "@radix-ui/react-tooltip";
import { Card } from "@/components/ui/card";
import SkeletonWrapper from "@/components/SkeletonWrapper";


interface TriggerProps {
    open: boolean;
    active: boolean;
    name: string;
    id: string;
    onCheck: (id: string) => void;
}

const Trigger:React.FC<TriggerProps> = (props) => {
    const {
        name,
        id,
        active,
        onCheck,
    } = props

    return (
        <div className="flex items-center justify-between p-1 w-full" onClick={(e) =>  e.preventDefault()}>
            <div className="flex items-center gap-1">
                <div className="flex items-center space-x-2">
                    <Checkbox id={`${id}-${name}`} defaultChecked={active} onCheckedChange={() => onCheck(id)} checked={active}/>
                    <Label
                        htmlFor={`${id}-${name}`}
                        className="text-primary text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {name}
                    </Label>
                </div>
            </div>
        </div>
    )
}

interface SortableCardLayerProps {
    onCheck: (id: string) => void;
    model: SystemDynamic;
}

export const SystemDynamicCardModel:React.FC<SortableCardLayerProps> = (props) => {
    const { model, onCheck} = props;
    const [isOpen, setIsOpen] = useState(false);
 

    return (
        <Card className="shadow-md rounded-none border-none p-2">
            <TooltipProvider>
                <Trigger
                    open={isOpen}
                    active={model.active}
                    name={model.name}
                    id={model.uuid}
                    onCheck={onCheck}
                />
            </TooltipProvider>
        </Card>
    )
}
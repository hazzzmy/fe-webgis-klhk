import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';



type Option = {
    value: string;
    label: string;
};

type SharedDropdownSelectProps = {
    value: string;
    onValueChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
    formatLabel?: (label: string, value: string) => React.ReactNode; // New prop
};

export const SharedDropdownSelect: React.FC<SharedDropdownSelectProps> = ({
    value,
    onValueChange,
    options,
    placeholder = 'Select...',
    className = 'w-full shadow-md',
    formatLabel, // New prop
}) => {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {formatLabel ? formatLabel(opt.label, opt.value) : opt.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

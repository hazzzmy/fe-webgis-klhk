"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  baseline?: number; // Add a prop for the baseline value
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, value, defaultValue, onValueChange, min = 0, max = 100, baseline, ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState<number[]>(defaultValue || [min]);

  // Update `currentValue` for controlled sliders
  React.useEffect(() => {
    if (value) setCurrentValue(value);
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    setCurrentValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <div className="relative w-full pt-6">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={currentValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-primary">
          <SliderPrimitive.Range className="absolute h-full bg-secondary" />
        </SliderPrimitive.Track>

        {/* Baseline Thumb */}
        {baseline !== undefined && (

          <div
            className="absolute h-3 w-3 -translate-x-1/2 rounded-full bg-red-500 border-2 border-primary"
            style={{ left: `${((baseline - min) / (max - min)) * 100}%` }}
          >
          </div>
        )}

        {/* Main Thumb */}
        <SliderPrimitive.Thumb className="relative z-10 block h-5 w-5 rounded-full border-2 border-secondary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          {/* Thumb label */}
          <div
            className="absolute bottom-6 -translate-x-[40%] text-xs bg-gray-200 text-primary px-2 py-1 rounded"
            style={{ left: `${((currentValue[0] - min) / (max - min)) * 100}%` }}
          >
            {currentValue[0]}
          </div>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>

      {/* Min and Max Labels */}
      <div className="flex justify-between text-xs text-primary mt-2">
        <span className="text-lg">{min}</span>
        <span className="text-lg">{max}</span>
      </div>
    </div>
  );
});

Slider.displayName = "Slider";

export { Slider };

// components/RangeSlider.tsx
"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & RangeSliderProps
>(({ min, max, step = 1, value, onChange, className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    min={min}
    max={max}
    step={step}
    value={value}
    onValueChange={(val) => onChange(val as [number, number])} // Make sure we cast to [number, number]
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-primary cursor-pointer">
      <SliderPrimitive.Range className="absolute h-full bg-secondary cursor-pointer" />
    </SliderPrimitive.Track>
    {/* Start Thumb */}
    <SliderPrimitive.Thumb className="block h-5 w-5 cursor-pointer rounded-full border-2 border-secondary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    {/* End Thumb */}
    <SliderPrimitive.Thumb className="block h-5 w-5 cursor-pointer rounded-full border-2 border-secondary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

RangeSlider.displayName = SliderPrimitive.Root.displayName;

export default RangeSlider;

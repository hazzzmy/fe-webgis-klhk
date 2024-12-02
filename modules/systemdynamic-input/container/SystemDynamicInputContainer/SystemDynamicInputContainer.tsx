import { useState } from 'react';
import { useSystemDynamicParameter } from '../../hooks/useSystemDynamicInputData';
import { Slider } from '@/components/ui/slider';
import RangeSlider from '@/components/ui/range-slider';
import { Card } from '@/components/ui/card';
import { toTitleCase } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronsUpDown, InfoIcon } from 'lucide-react';
import Spinner from '@/components/ui/spinner';
import { useSystemDynamicControl } from '@/modules/systemdynamic/control/hooks';
import { CustomSlider } from '@/components/ui/customSlider';

export const SystemDynamicInputContainer = () => {
  const { parameters, grid_layout, updateParameterValue, resetParameters, setGridLayout, refetchData, toggleDescriptionOpen, isFetching} = useSystemDynamicParameter();
  
  const [rangeValue, setRangeValue] = useState<[number, number]>([
    parameters.initial_time.value,
    parameters.final_time.value,
  ]);

  const handleRangeChange = (value: [number, number] | React.FormEvent<HTMLDivElement>) => {
    setRangeValue(value as [number, number]);
    if (Array.isArray(value) && value.length === 2) {
      updateParameterValue('initial_time', value[0]); // Update initial_time
      updateParameterValue('final_time', value[1]);   // Update final_time
    }
  };

  const handleChange = (key: any, value: any) => {
    updateParameterValue(key, value);
  };

  const handleIncrement = (key: any, value: number, step: number) => {
    const newValue = value + step;
    updateParameterValue(key, newValue);
  };

  const handleDecrement = (key: any, value: number, step: number) => {
    const newValue = value - step;
    updateParameterValue(key, newValue);
  };

  const handleInputChange = (key: any, value: any) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      updateParameterValue(key, numValue);
    }
  };

  const handleResetAndFetch = () => {
    resetParameters();
    if (refetchData) {
      refetchData();
    }
  };

  const handleChangeGrid = (value: any) => {
    setGridLayout(value)
  };

  const handleRun = () => {
    if (refetchData) {
      refetchData();
    }
  }

  const systemDynamicControl = useSystemDynamicControl()

  return systemDynamicControl.tools.systemDynamicInputControl.active && (
    <div className="p-4 flex flex-col gap-4 max-h-[calc(100vh-130px)]">
      <div className='flex flex-row justify-between w-full items-center'>
        <h3 className="text-primary text-xl font-bold">Input Parameter</h3>
      </div>
      <div className='overflow-y overflow-x-hidden flex flex-col h-[85vh] gap-2 p-4 bg-white rounded custom-scrollbar'>
      <Card className="flex flex-col items-center justify-center p-4 rounded gap-4 shadow">
        <div className="text text-primary flex justify-center items-center text-start w-full font-bold">
          <p>Grid Layout</p>
        </div>
        <div className="flex flex-row items-center w-full gap-4">
          <Slider
            min={1}
            max={3}
            step={1}
            value={[grid_layout]}
            onValueChange={(value) => handleChangeGrid(value)}
          />
        </div>
        <div className="flex justify-between w-full items-center gap-2">
          <div className='flex flex-row gap-2 w-full'>
            <Button variant={'outline'} onClick={() => setGridLayout(grid_layout - 1)}>-</Button>
            <Input
              type="number"
              value={grid_layout}
              onChange={(e) => setGridLayout(e.target.value as unknown as number)}
              className="w-full text-center"
            />
            <Button variant={'outline'} onClick={() => setGridLayout(grid_layout + 1)}>+</Button>
          </div>
        </div>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 rounded gap-4 shadow">
        <div className="text text-primary flex justify-center items-center text-start w-full font-bold">
          <p>Time Range ({parameters.initial_time.unit})</p>
        </div>
        <div className="flex flex-row items-center w-full gap-4">
          <p>{parameters.initial_time.min}</p>
          <RangeSlider
            min={parameters.initial_time.min}
            max={parameters.final_time.max}
            value={[parameters.initial_time.value, parameters.final_time.value]}
            step={parameters.initial_time.step}
            onChange={handleRangeChange}
          />
          <p>{parameters.initial_time.max}</p>
        </div>
        <div className="flex justify-between w-full items-center gap-2">
          <Button variant={'outline'} onClick={() => handleDecrement('initial_time', parameters.initial_time.value, parameters.initial_time.step)}>-</Button>
          <Input
            type="number"
            value={parameters.initial_time.value}
            onChange={(e) => handleInputChange('initial_time', e.target.value)}
            className="w-full text-center"
          />
          <Button variant={'outline'} onClick={() => handleIncrement('initial_time', parameters.initial_time.value, parameters.final_time.step)}>+</Button>
          <Separator orientation='vertical' />
          <Button variant={'outline'} onClick={() => handleDecrement('final_time', parameters.final_time.value, parameters.initial_time.step)}>-</Button>
          <Input
            type="number"
            value={parameters.final_time.value}
            onChange={(e) => handleInputChange('final_time', e.target.value)}
            className="w-full text-center"
          />
          <Button variant={'outline'} onClick={() => handleIncrement('final_time', parameters.final_time.value, parameters.final_time.step)}>+</Button>
        </div>
      </Card>

      {Object.entries(parameters).slice(2).map(([key, parameter]) => (
        <Card key={key} className="flex flex-col items-center justify-center p-4 rounded gap-4 shadow">
          <div className="text text-primary flex justify-center items-center text-start w-full font-bold">
            <p>{toTitleCase(key)} ({parameter.unit})</p>
          </div>
          <div className="flex flex-row items-center w-full gap-4">
            <CustomSlider
              min={parameter.min}
              max={parameter.max}
              step={parameter.step}
              value={[parameter.value]}
              onValueChange={(value) => handleChange(key, value[0])}
              baseline={parameter.baseline}
            />
          </div>
          <Collapsible
            open={parameter.descriptionOpen}
            onOpenChange={() => toggleDescriptionOpen(key as any)}
            className="flex w-full flex-col gap-2"
          >
            <div className='flex flex-row justify-between items-center gap-2 w-full'>
              <div className='flex w-full justify-start'>
                Baseline : {parameter.baseline}
              </div>
              <Button variant={'outline'} onClick={() => handleDecrement(key, parameter.value, parameter.step)}>-</Button>
              <Input
                type="number"
                value={parameter.value}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="w-full text-center"
              />
              <Button variant={'outline'} onClick={() => handleIncrement(key, parameter.value, parameter.step)}>+</Button>
              <CollapsibleTrigger asChild>
                  <Button variant="outline">
                    <InfoIcon className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>  
            </div>
            <CollapsibleContent>
              <div className="rounded-md border px-4 py-3 font-mono text-sm max-w-[400px]">
                {parameter.description}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
      </div>
      <div className='flex flex-row justify-between w-full items-center gap-2'>
        <Button className='w-full bg-secondary text-primary hover:bg-primary hover:text-white' variant={'outline'} onClick={handleRun}>{isFetching ? <Spinner width={5} height={5} /> : 'Run'}</Button>
        <Button className='w-full' variant={'outline'} onClick={handleResetAndFetch}>Reset</Button>
      </div>
    </div>
  );
};

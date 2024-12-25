import { Separator } from "@/components/ui/separator";
import { SystemDynamicInputContainer } from "@/modules/systemdynamic-input/container/SystemDynamicInputContainer";
import { SystemDynamicContainer } from "@/modules/systemdynamic/container/SystemDynamicContainer";
import { SystemDynamicLayout } from "@/modules/systemdynamic/layout/SystemDynamicLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSystemDynamicInputData } from "@/modules/systemdynamic-input/hooks";

export const ToolContainer = () => {
  const setSelectedIsland = useSystemDynamicInputData(
    (state) => state.setSelectedIsland
  );

  const handleIslandChange = (value: string) => {
    setSelectedIsland(value); // Update the island in the Zustand store
  };

  return (
    <div className="flex flex-col bg-gray-100 h-full">
      <div className="p-4 pb-1 flex flex-row items-center justify-center w-full rounded-md rounded-bl-none rounded-br-none">
        <Select onValueChange={handleIslandChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an Island" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sumatera">Sumatera</SelectItem>
            <SelectItem value="jawa">Jawa</SelectItem>
            <SelectItem value="balinusra">Bali & Nusa Tenggara</SelectItem>
            <SelectItem value="kalimantan">Kalimantan</SelectItem>
            <SelectItem value="sulawesi">Sulawesi</SelectItem>
            <SelectItem value="maluku">Maluku</SelectItem>
            <SelectItem value="papua">Papua</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row bg-gray-100 h-full">
        <SystemDynamicLayout />
        <SystemDynamicInputContainer />
      </div>
    </div>
  );
};

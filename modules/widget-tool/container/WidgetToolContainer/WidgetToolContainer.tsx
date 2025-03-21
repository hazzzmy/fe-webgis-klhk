import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolContainer } from "../../tool/container/ToolContainer";
import { WidgetContainer } from "../../widget/container/WidgetContainer";
import { useMapControl } from "@/modules/map/control/hooks/useMapControl";
import GeonodeLoginButton from "@/components/GeonodeLoginButton";

export const WidgetToolContainer = () => {
  const mapControl = useMapControl();
  const isActiveSystemDynamic = mapControl.navControl.systemDynamic.active;

  // Manage the initial tab value
  const [tabValue, setTabValue] = useState("system-dynamic");

  // Set the tab to "system-dynamic" if isActiveSystemDynamic is true on the first render
  useEffect(() => {
    if (isActiveSystemDynamic) {
      setTabValue("system-dynamic");
    }
  }, [isActiveSystemDynamic]);

  return (
    <Tabs value={tabValue} onValueChange={setTabValue}>
      <div className="p-4">
      <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="system-dynamic" onClick={() => setTabValue('system-dynamic')}>System Dynamic</TabsTrigger>
          <TabsTrigger value="widget" onClick={() => setTabValue('widget')}>Widgets</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="widget" className="m-0"  forceMount hidden={tabValue !== 'widget'}>
        <WidgetContainer />
      </TabsContent>
      <TabsContent value="system-dynamic" className="m-0" forceMount hidden={tabValue !== 'system-dynamic'}>
        <ToolContainer />
      </TabsContent>
    </Tabs>
  );
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolContainer } from "../../tool/container/ToolContainer";
import { WidgetContainer } from "../../widget/container/WidgetContainer";
import { useState } from "react";

export const WidgetToolContainer = () => {
  const [active, setActive] = useState('widget');

  return (
    <Tabs  defaultValue="widget">
       <div className="py-2 px-4">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="widget" onClick={() => setActive('widget')}>Widgets</TabsTrigger>
          <TabsTrigger value="tool" onClick={() => setActive('tool')}>Planning Tools</TabsTrigger>
        </TabsList>
       </div>
      <TabsContent value="widget" className="m-0" forceMount hidden={active !== 'widget'}>
        <WidgetContainer />
      </TabsContent>
      <TabsContent value="tool" className="m-0" forceMount hidden={active !== 'tool'}>
        <ToolContainer />
      </TabsContent>
    </Tabs>
  )
};
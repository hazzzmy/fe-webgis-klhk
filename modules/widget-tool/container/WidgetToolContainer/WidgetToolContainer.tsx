import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolContainer } from "../../tool/container/ToolContainer";
import { WidgetContainer } from "../../widget/container/WidgetContainer";

export const WidgetToolContainer = () => {
  return (
    <Tabs  defaultValue="widget">
       <div className="py-2 px-4">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="widget">Widgets</TabsTrigger>
          <TabsTrigger value="tool">Planning Tools</TabsTrigger>
        </TabsList>
       </div>
      <TabsContent value="widget" className="m-0">
        <WidgetContainer />
      </TabsContent>
      <TabsContent value="tool" className="m-0">
        <ToolContainer />
      </TabsContent>
    </Tabs>
  )
};
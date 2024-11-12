import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useMapControl } from "@/modules/map/control/hooks/useMapControl";
import { AttributesTableContainer } from "@/modules/attribute-data/container/AttributesTableContainer";
import { WidgetToolContainer } from "@/modules/widget-tool/container/WidgetToolContainer";
import { useState } from "react";
import { useSystemDynamicControl } from "@/modules/systemdynamic/control/hooks";
import { SystemDynamicInputContainer } from "@/modules/systemdynamic-input/container/SystemDynamicInputContainer";

export const MainAppResizableLayout: React.FC<{ children: React.ReactNode, pathname: string }> = (props) => {

  const { children, pathname } = props

  const mapControl = useMapControl();
  const [sizeWidget, setSizeWidget] = useState(0);
  const systemDynamicControl = useSystemDynamicControl();

  if (pathname === "/map") {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel defaultSize={100}>
          <ResizablePanelGroup
            direction="vertical"
            className="h-full max-h-screen items-stretch"
          >
            <ResizablePanel className='w-full h-full bg-white'>
              {children}
            </ResizablePanel>
            <ResizableHandle withHandle={mapControl.tools.attributesTable.active} />
            <ResizablePanel
              defaultSize={42}
              minSize={20}
              maxSize={80}
              style={{ display: mapControl.tools.attributesTable.active ? 'block' : 'none' }}>
              <div className='relative h-full bg-white'>
                <AttributesTableContainer sizeWidgetTools={mapControl.tools.widgetTools.active ? sizeWidget : 0} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle={mapControl.tools.widgetTools.active} />
        <ResizablePanel
          defaultSize={20}
          minSize={20}
          maxSize={60}
          style={{ display: mapControl.tools.widgetTools.active ? 'block' : 'none' }}
          onResize={(size) => {
            const sizeInPX = (size / 100) * ((window.innerWidth || 0) - (!mapControl.tools.layerControl.active ? 60 : 370))
            setSizeWidget(Math.ceil(sizeInPX));
          }}
        >
          <WidgetToolContainer />
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  } else if (pathname === "/systemdynamic") {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel defaultSize={100}>
          <ResizablePanelGroup
            direction="vertical"
            className="h-full max-h-screen items-stretch"
          >
            <ResizablePanel className='w-full h-full bg-white'>
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle={systemDynamicControl.tools.systemDynamicInputControl.active} />
        <ResizablePanel
          defaultSize={20}
          minSize={20}
          maxSize={60}
          style={{ display: systemDynamicControl.tools.systemDynamicInputControl.active ? 'block' : 'none' }}
          onResize={(size) => {
            const sizeInPX = (size / 100) * ((window.innerWidth || 0) - (!systemDynamicControl.tools.systemDynamicInputControl.active ? 60 : 370))
            setSizeWidget(Math.ceil(sizeInPX));
          }}
        >
          {/* <WidgetToolContainer /> */}
          <SystemDynamicInputContainer/>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }
}
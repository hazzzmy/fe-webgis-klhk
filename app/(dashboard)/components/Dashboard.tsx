"use client"

import * as React from "react"
import {
  LayoutDashboardIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Nav } from "./nav"
import { TooltipProvider } from "@/components/ui/tooltip"
import MapComponent from "../map_components/MapComponent"

interface DashboardProps {
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

const Dashboard: React.FC<DashboardProps> = ({
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize
}) => {

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`
          }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                path: "/",
                title: "Dashboard",
                icon: LayoutDashboardIcon,
              }
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={40}>
          <MapComponent />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default Dashboard
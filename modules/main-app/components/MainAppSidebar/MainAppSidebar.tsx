import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { LucideIcon } from "lucide-react"
import { NavSidebar } from "../NavSiebar"

export const MainAppSidebar:React.FC<{ navItems: {path: string, title: string, icon: LucideIcon}[] }> = (props) => {
    return (
      <div
        className="h-full max-h-screen shadow-xl w-[60px] z-50"
      >
          {/* <TooltipProvider>
            <NavSidebar
              isCollapsed={true}
              links={props.navItems}
            />
          </TooltipProvider> */}
      </div>
    )
}
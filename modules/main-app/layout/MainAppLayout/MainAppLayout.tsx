import { LucideIcon } from "lucide-react"
import { MainAppSidebar } from "../../components/MainAppSidebar"
import { useMapControl } from "@/modules/map/control/hooks/useMapControl"
import { useSystemDynamicControl } from "@/modules/systemdynamic/control/hooks";
import { usePathname } from "next/navigation";

export const MainAppLayout:React.FC<{ children?: React.ReactNode, navItems: {path: string, title: string, icon: LucideIcon}[] }> = (props) => {
    const mapControl = useMapControl();
    const systemDynamicControl = useSystemDynamicControl();

    const pathname = usePathname()
    const active = pathname === '/map' ? mapControl.tools.layerControl.active : systemDynamicControl.tools.systemDynamicControl.active

    return (
        <main className="MainAppLayout flex">
            <MainAppSidebar navItems={props.navItems} />
            <div
                className="MainAppLayoutChildren"
                style={{
                    position: 'relative',
                    flexGrow: 1,
                    paddingLeft: active ? 310 : 0,
                }}
            >
                {props.children}
            </div>
        </main>
    )
}
import { cookies } from "next/headers"
import Dashboard from "./components/Dashboard"
export default function Page() {
  const layout = cookies().get("react-resizable-panels:layout:dashboard")
  const collapsed = cookies().get("react-resizable-panels:collapsed")

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
      <div className="flex flex-col md:flex">
        <Dashboard
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
  )
}

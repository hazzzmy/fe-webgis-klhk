"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import Logo, { LogoMobile } from "@/components/Logo"
import { usePathname } from "next/navigation"

interface NavProps {
  isCollapsed: boolean
  links: {
    path: string
    title: string
    icon: LucideIcon
  }[],
}

export function Nav({ links, isCollapsed}: NavProps) {
  
  const {user} = useUser()

  const pathname = usePathname();
  
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-screen"
    >
      <div className="flex flex-col justify-between h-full">
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {isCollapsed ? <LogoMobile /> : <Logo />}
          {links.map((link, index) => {
            const isActive = pathname === link.path;
            return isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={`${link.path}`}
                    className={cn(
                      buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }),
                      "h-9 w-9",
                      isActive &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={`/${link.path}`}
                className={cn(
                  buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }),
                  isActive &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            )
          }
            
          )}
        </nav>
        {/* <div className="flex flex-col items-center gap-2"> */}
          <div className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            {isCollapsed ? (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <div
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "h-12 w-12",
                    )}
                  >
                    <UserButton afterSignOutUrl="/sign-in"/>
                  </div> 
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                {user && (
                  <p style={{ marginLeft: '10px' }}>
                    {user.username}
                  </p>
                )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "h-12 w-full",
                  "justify-start"
                )}
              >
                <UserButton afterSignOutUrl="/sign-in"/>
                {user && (
                  <p className="ml-2">
                    {user.username}
                  </p>
                )}
              </div> 
            )
            }
            
        </div>
      </div>
    </div>
  )
}

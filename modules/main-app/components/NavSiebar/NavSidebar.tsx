"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { buttonVariants } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import Logo from "@/components/Logo"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface NavProps {
  isCollapsed: boolean
  links: {
    path: string
    title: string
    icon: LucideIcon
  }[],
}

export function NavSidebar({ links, isCollapsed}: NavProps) {
  
  const {user} = useUser()

  const pathname = usePathname();
  
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 pb-2 data-[collapsed=true]:pb-2 h-screen w-[60px] bg-100"
    >
      <div className="flex flex-col justify-between h-full">
        <nav className="grid">
          <div className="flex items-center justify-center w-full bg-[#00AD5D] h-[50px]">
            {isCollapsed ? (
              <Image alt="klhk" src="/image/klhklogo.png" width={33} height={45} priority />
            ) : <Logo />}
          </div>
          <div className='flex flex-col items-center justify-center w-full'>
            {links.map((link, index) => {
              const isActive = pathname === link.path;
              return isCollapsed ? (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`${link.path}`}
                      className={cn(
                        buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }),
                        'w-full hover:bg-secondary rounded-none  text-primary',
                        isActive && 'bg-secondary hover:bg-red text-white'
                      )}
                    >
                      <link.icon className="h-5 w-5" />
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
          </div>
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

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

  const pathname = usePathname();
  
  return (
    <div
      className="h-screen"
    >
    </div>
  )
}

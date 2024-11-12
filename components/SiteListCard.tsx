import React from 'react'
import { SiteList, SiteData, CountData } from '@/types'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
}from "@/components/ui/card"
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

export interface siteListProps{
    siteList: SiteData[] | null,
}

const SiteListCard = ({siteList}: siteListProps) => {
  return (
    <>
        {siteList ? (
        siteList.map((site, index) => (
            <Link href={`/colopriming/existing-site/${site.site_id}`} key={index} className="flex flex-col items-center cursor-pointer duration-300 ease-in-out hover:scale-105 p-1">
                <Card className='w-full h-30 hover:bg-white hover:text-black'>
                    <CardContent className='flex flex-col items-center justify-between p-4 h-full'>
                        {/* <Image
                            src={"/next.svg"}
                            alt="next-image"
                            width={100}
                            height={100}
                            layout='responsive'
                            objectFit='cover'
                        /> */}
                        <div className='flex flex-col items-center justify-between w-full gap-2'>
                            <div className='w-full flex flex-col items-center'>
                                <h1>{site.site_id}</h1>
                                <h1>{site.site_name}</h1>
                            </div>
                            <div className='w-full flex flex-row justify-between text-blue-500'>
                                <h1>{site.region}</h1>
                                <h1>{site.region_area}</h1>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
    ))
) : (
    <div className='text-xl font-bold'>No Site Found</div>
)}
    
    </>
  )
}

export default SiteListCard
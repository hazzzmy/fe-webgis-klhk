"use client"

import React, { ReactElement} from 'react'
import Link from 'next/link'
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

interface Menu {
    id: number;
    name: string;
    url: string;
    text: string;
    active: boolean;
}

const MainMenu = () => {
    const pathName = usePathname()
    const pathSegment = `/${pathName.split('/')[2]}`;

    const menus: Menu[] = [
        {
            id: 1,
            name: "existingSite",
            url : "/colopriming/existing-site",
            text : "Existing Site",
            active : true
        },
        // {
        //     id: 2,
        //     name: "bulkAnalysis",
        //     url : "/colopriming/bulk-analysis",
        //     text : "Bulk Analysis",
        //     active : false
        // },
        {
            id: 3,
            name: "buildToSuit",
            url : "/colopriming/build-to-suit",
            text : "Build to Suit",
            active : false
        },
]

    return (
        <div className={`flex grid grid-cols-${menus.length} gap-4`}>
            {menus.map((menu) => (
                <Button variant={"outline"} key={menu.id} className={`/${menu.url.split('/')[2]}` == pathSegment ? "border border-solid border-zinc border-2" : ""}>
                    <Link href={menu.url}>
                        <h2 className={`/${menu.url.split('/')[2]}` == pathSegment ? "card-title font-bold" : "card-title"}>{menu.text}</h2>
                    </Link>
                </Button>
            ))}
        </div>
    );
}

export default MainMenu;

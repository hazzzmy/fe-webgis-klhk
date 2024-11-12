"use client"

import React, { ReactElement } from 'react'
import Wrapper from './Wrapper'
import Beardcrumb from './Beardcrumb'
import Image from 'next/image'
import TowerAnimation from './(animation)/TowerAnimation';
import ComingSoonAnimation from './(animation)/ComingSoonAnimation'
import Link from 'next/link'

interface Menu {
    id: number;
    name: string;
    url: string;
    text: string;
    active: boolean;
    animation: ReactElement;
}

const MainMenu = () => {
    const menus: Menu[] = [
        {
            id: 1,
            name: "colopriming",
            url : "/colopriming",
            text : "Colopriming",
            active : true,
            animation: <TowerAnimation/>
        },
        {
            id: 2,
            name: "marketOverview",
            url : "/market-overview",
            text : "Market Overview",
            active : false,
            animation: <ComingSoonAnimation/>
        },
        {
            id: 3,
            name: "buildtosuite",
            url : "/build-to-suit",
            text : "Build to Suit",
            active : false,
            animation: <ComingSoonAnimation/>
        },
        {
            id: 4,
            name: "relocation-aquisition",
            url : "/relocation-aquisition",
            text : "Relocation and Aquisition",
            active : false,
            animation: <ComingSoonAnimation/>
        },
]

    return (
        <div className='flex grid grid-cols-5 gap-4 mx-auto'>
            {menus.map((menu) => (
                <Link href={menu.url} key={menu.id} className="flex flex-col p-4 items-center bg-white card card-body shadow-xl gap-2 text-blue-900 rounded-md p-0 cursor-pointer duration-300 ease-in-out hover:shadow-xl hover:bg-primary hover:scale-105 hover:text-white ">
                    <figure className="h-[10rem] w-[10rem]">
                        {menu.animation}
                    </figure>
                    <div className="flex flex-col items-center gap-2 justify-between">
                        <h2 className="card-title text-sm">{menu.text}</h2>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default MainMenu;

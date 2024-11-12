import Link from 'next/link'
import React, { ReactElement } from 'react'
import NavbarButton from './NavbarButton'
import Image from 'next/image'

const Navbar = (): ReactElement => {
  return (
    <div className="navbar bg-white">
        <div className="container flex mx-auto justify-between p-4">
            <div className='flex gap-4 items-center'>
              <Image src={"/image/brand_logo_original.png"} alt="TBIG Logo" width={60} height={25}/>
              <Link href={"/"} className="text-xl text-blue-900 font-bold">Radio Network Analytics</Link>
            </div>
            <NavbarButton/>
        </div>
    </div>
  )
}

export default Navbar
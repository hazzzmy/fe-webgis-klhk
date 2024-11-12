"use client"

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { ReactElement } from 'react'

const NavbarButton = ():ReactElement => {
    const {isLoaded, isSignedIn} = useUser()
    if (!isLoaded) return <p>Please wait...</p>;


    return isSignedIn ?(
        <div className='flex gap-10 justify-between'>
            <div className='flex gap-2'>
                {/* <Link href="/admin" className="text-blue-900 mr-2">Admin</Link> */}
                <UserButton afterSignOutUrl='/sign-in' showName={true} />
            </div>
        </div>
    ):( <>
        <Link href="/sign-in" className="text-white">Sign In</Link>
    </>
    )
}

export default NavbarButton
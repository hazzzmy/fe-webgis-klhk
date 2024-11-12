"use client"

import { useSignIn } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'
import Logo from '../Logo'
import { Button } from '../ui/button'

const SignInForm = (): ReactElement => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }
        // Start the sign-in process using the email and password provided
        try {
            const completeSignIn = await signIn.create({
            identifier: email,
            password,
            });
        
            if (completeSignIn.status !== 'complete') {
                // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
                // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
                console.log(JSON.stringify(completeSignIn, null, 2));
            }
        
            if (completeSignIn.status === 'complete') {
                // If complete, user exists and provided password match -- set session active
                await setActive({ session: completeSignIn.createdSessionId });
                // Redirect the user to a post sign-in route
                router.push('/');
            }
            } catch (err: any) {
            // This can return an array of errors.
            // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
            console.error(JSON.stringify(err, null, 2));
            }
        };

    return (
        <>
        <div className='flex flex-row mx-auto justify-center'>
            <div className='relative flex w-full'>
                <Image src={'/image/telco-tower.jpeg'} alt='telco-tower' width={1000} height={1000} className='bg-primary shadow-md rounded-tl rounded-bl w-full'/>
                <Image src={"/image/brand_logo.png"} alt="TBIG Logo" width={150} height={150} className='absolute bottom-5 left-5'/>
            </div>
            <form 
                className="bg-black bg-opacity-50 shadow-md rounded-tr rounded-br px-8 pt-6 pb-8 w-full"
                name="signIn"
                onSubmit={(e) => handleSubmit(e)}
                >
                <div className="mb-4 flex flex-col justify-center items-center gap-4">
                    <Logo/>
                    <h1 className='font-bold text-white'>Radio Network Analytics</h1>
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)} name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
                    id="email" type="text" placeholder="name@tower-bersama.com"/>
                </div>
                <div className="mb-6">
                    <label className="text-white text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input onChange={(e) => setPassword(e.target.value)} name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </div>
                <div className="flex items-center justify-center">
                    <Button variant="outline" className="border-sky-500 bg-sky-950 text-white hover:bg-sky-700 hover:text-white" type="submit">
                        Login
                    </Button>
                </div>
            </form>
        </div>
        <p className="text-center text-white text-xs mt-5">
            &copy;2024 Tower Bersama Infrastructure Group Tbk. All rights reserved.
        </p>
        </>
    )
}

export default SignInForm
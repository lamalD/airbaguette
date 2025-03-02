'use client'

import React, { useState } from 'react'

import GlobalApi from '@/app/_utils/GlobalApi'

import Image from 'next/image'
import Link from 'next/link'

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


function CreateAccount() {

    const router = useRouter()

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loader, setLoader] = useState()

    useEffect(() => {
          const jwt = sessionStorage.getItem('jwt')
            if(jwt) {
              router.push('/')
            }
        }, [])

    const onCreateAccount = () => {
        setLoader(true)
        GlobalApi.registerUser(username, email, password).then((resp) => {
            console.log(resp.data.user)
            console.log(resp.data.jwt)

            sessionStorage.setItem('user', JSON.stringify(resp.data.user))
            sessionStorage.setItem('jwt', resp.data.jwt)
            toast('Account created successfully!')
            router.push('/')
            setLoader(false)
        }, (e) => {
            console.log(e)
            toast(e?.response?.data?.error?.message)
            setLoader(false)
        })
    }

  return (
    <div className='flex items-baseline justify-center my-20'>
        <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200'>
            <Image src='/logo.png' alt='logo' width={200} height={200} />
            <h2 className='font-bold text-3xl'>Create Account</h2>
            <h2 className='text-gray-500'>Enter your Email and Password to create an Account</h2>
            <div className='flex flex-col w-full gap-5 mt-7'>
                <Input 
                    placeholder='Username' 
                    className='bg-white'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input 
                    placeholder='Email' 
                    className='bg-white'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    placeholder='Password' 
                    type='password' 
                    className='bg-white'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    onClick={() => onCreateAccount()}
                    disabled={!(username || email || password)}
                >
                    {loader ? <LoaderIcon className='animate-spin'/> : 'Create an Account'}
                </Button>
                <p>
                    Already have an account?&nbsp;
                    <Link 
                        href={'/sign-in'} 
                        className='text-blue-500 cursor-pointer hover:underline hover:font-bold'
                    >
                        Click here to sign in.
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default CreateAccount
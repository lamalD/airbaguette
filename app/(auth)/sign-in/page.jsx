'use client'

import React, { useEffect, useState } from 'react'

import GlobalApi from '@/app/_utils/GlobalApi'

import Image from 'next/image'
import Link from 'next/link'

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderIcon } from 'lucide-react'

function SignIn() {
    const router = useRouter()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loader, setLoader] = useState()

    useEffect(() => {
      const jwt = sessionStorage.getItem('jwt')
        if(jwt) {
          router.push('/')
        }
    }, [])

    const onSignIn = () => {
      setLoader(true)
        GlobalApi.signInUser(email, password).then((resp) => {
            console.log(resp.data.user)
            console.log(resp.data.jwt)

            sessionStorage.setItem('user', JSON.stringify(resp.data.user))
            sessionStorage.setItem('jwt', resp.data.jwt)
            toast('Sign In successfull!')
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
            <h2 className='font-bold text-3xl'>Sign in</h2>
            <h2 className='text-gray-500'>Enter your Email and Password</h2>
            <div className='flex flex-col w-full gap-5 mt-7'>
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
                    onClick={() => onSignIn()}
                    disabled={!(email || password)}
                >
                    {loader ? <LoaderIcon className='animate-spin'/> : 'Sign In'}
                </Button>
                <p>
                    No Account yet?&nbsp;
                    <Link 
                        href={'/create-account'} 
                        className='text-blue-500 cursor-pointer hover:underline hover:font-bold'
                    >
                        Create one here
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default SignIn
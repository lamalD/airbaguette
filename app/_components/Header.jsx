'use client'

import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
  
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from 'lucide-react'
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import CartItemList from './CartItemList'
import { toast } from 'sonner'
  

function Header() {

    const router = useRouter()

    const [categoryList, setCategoryList] = useState([])
    const [totalCartItem, setTotalCartItem] = useState(0)
    const {updateCart, setUpdateCart} = useContext(UpdateCartContext)
    const [cartItemList, setCartItemList] = useState([])
    const [subtotal, setSubtotal] = useState(0)

    // const isLoggedIn = sessionStorage.getItem('jwt') ? true : false
    // const user = JSON.parse(sessionStorage.getItem('user'))
    // const jwt = sessionStorage.getItem('jwt')

    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [user, setUser ] = useState(null)
    const [jwt, setJwt] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedIsLoggedIn = sessionStorage.getItem('jwt') ? true : false
            const storedUser  = JSON.parse(sessionStorage.getItem('user'));
            const storedJwt = sessionStorage.getItem('jwt');
            setIsLoggedIn(storedIsLoggedIn)
            setUser (storedUser );
            setJwt(storedJwt);
        }
    }, [])

    useEffect(() => {
      getCategoryList()
    }, [])
    
    useEffect(() => {
        console.log('updateCart triggert on Header.jsx')
        getCartItems()    
    }, [updateCart])
    
    useEffect (() => {

        let total = 0
        cartItemList.forEach(element => {
            total = total + element.amount
        });

        setSubtotal(total)

    }, [cartItemList])

    // console.log(cartItemList)

    const getCategoryList = () => {
        GlobalApi.getCategory().then(resp => {
            console.log(resp.data.data)
            setCategoryList(resp.data.data)
        })
    }

    const getCartItems = async () => {

        const storedUser  = JSON.parse(sessionStorage.getItem('user'));
            const storedJwt = sessionStorage.getItem('jwt');
            console.log(`getCartItems triggert for user ${storedUser.username} with id ${storedUser.id}`)
                
                if (storedUser != null) {
                
                const cartItemList_ = await GlobalApi.getCartItems(storedUser.id, storedJwt)
                    
                setTotalCartItem(cartItemList_?.length)
                setCartItemList(cartItemList_)              
        }
    }

    const onSignOut = () => {
        sessionStorage.clear()
        router.push('/sign-in')
    }

    const onDeleteItem = (id) => {

        GlobalApi.deleteCartItem(id, jwt).then(resp => {
            toast.success('Item deleted')
            getCartItems()
        })
    }

    const handleCheckout = async () => {
        if (!jwt) {
            router.push('/sign-in')
        } else {

            const payload = {
                data : {
                    // paymentId: data.paymentId,
                    totalOrderAmount: subtotal,
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    paymentDone: false,
                    orderItemList: cartItemList.map(item => ({
                        product: item.product,
                        amount: item.amount,
                        quantity: item.quantity
                    }))
                }
            }

            GlobalApi.createOrder(payload, jwt).then(resp => {
                console.log('handleCheckout resp: ', resp.data.data)
                // toast.success('Order placed, next step payment')

                const orderId = resp.data.data.documentId

                handlePayment(orderId)
            })
        }
    }

    const handlePayment = (orderId) => {

        console.log('orderId: ', orderId)

        router.push('/checkout')
    }

  return (
    <div className='flex p-5 shadow-md justify-between'>
        <div className='flex items-center gap-8'>
            <Link
                href='/'
                className='flex flex-row items-center space-x-2 cursor-pointer'
            >
                <Image 
                    src='/logo.png' 
                    alt='logo' 
                    className='w-28 sm:w-32 md:w-44 lg:w-52'
                    width={150} 
                    height={100} 
                />
                <div className='hidden sm:flex text-3xl md:text-5xl lg:text-6xl'>
                    <h2 className='text-secondary'>AIR</h2>
                    <h2 className='text-primary'>BAGUETTE</h2>
                </div>
            </Link>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer'>
                            <LayoutGrid className='w-5 h-5'/>
                            Categorieën
                        </h2>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Selecteer Categorie</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {categoryList.map((category, index) => (
                            <DropdownMenuItem 
                                    key={index} 
                                    className='cursor-pointer hover:bg-slate-200'
                                >
                                    <Link href={'/products-category/'+category.name} className='flex gap-4 items-center'>
                                            <Image 
                                                src={category.icon[0]?.url} 
                                                alt='icon' 
                                                width={50} 
                                                height={50} 
                                            />
                                            <h2 className=''>{category.name}</h2>
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

            {/* <div className='md:flex gap-3 items-center border rounded-full p-2 px-2 hidden'>
                <Search />
                <input type="text" placeholder='Search' className='outline-none'/>
            </div>   */}
        </div>
        <div className='flex flex-col md:flex-row gap-5 items-center justify-center md:justify-end'>
            {!isLoggedIn? 
                <Link href={'/sign-in'}>
                    <Button>Login</Button>
                </Link>
                :
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <CircleUserRound className='h-10 w-10 p-0.5 bg-slate-100 text-primary rounded-full border border-primary'/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>My Order</DropdownMenuItem> */}
                        <DropdownMenuItem onClick={() => onSignOut()}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            {isLoggedIn &&
                <Sheet>
                    <SheetTrigger asChild>
                        <div className='flex gap-2 items-center justify-between text-lg bg-secondary rounded-md px-4 py-1.5 cursor-pointer'>
                            <ShoppingBasket className='h-7 w-7 text-white cursor-pointer'/>
                            <span className='bg-white text-secondary px-2 rounded-full'>{totalCartItem}</span>
                        </div>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle className='bg-primary text-white font-bold text-lg p-2'>Mijn Bestelling</SheetTitle>
                        <SheetDescription>
                            <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem} />
                        </SheetDescription>
                        </SheetHeader>
                    <SheetClose asChild>
                        <div className='absolute w-[80%] md:w-[90%] bottom-6 flex flex-col items-stretch'>
                            <h2 className='text-lg font-bold flex justify-between'>Subtotaal <span>€ {subtotal.toFixed(2)}</span></h2>
                            {/* <Button onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}>Checkout</Button> */}
                            <Button onClick={() => handleCheckout()}>Bestellen</Button>
                        </div>
                    </SheetClose>
                    </SheetContent>
                </Sheet>
            }
        </div>
    </div>
  )
}

export default Header
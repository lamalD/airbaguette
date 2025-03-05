'use client'

import { Button } from '@/components/ui/button'
import { LoaderIcon, Minus, Plus, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/UpdateCartContext'

function ProductItemDetail({product, onClose}) {

    console.log(product)

    const router = useRouter()
    // const jwt = sessionStorage.getItem('jwt')
    // const user = JSON.parse(sessionStorage.getItem('user'))

    const [user, setUser ] = useState(null);
    const [jwt, setJwt] = useState(null)

    const {updateCart, setUpdateCart} = useContext(UpdateCartContext)
    const [productTotalPrice, setProductTotalPrice] = useState(product.sellingPrice ? product.sellingPrice : product.mrp)
    const [quantity, setQuantity] = useState(1)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser  = JSON.parse(sessionStorage.getItem('user'));
            const storedJwt = sessionStorage.getItem('jwt');
            setUser (storedUser );
            setJwt(storedJwt);
        }
    }, [])

    const addToCart = () => {
        setLoader(true)
        if (!jwt) {
            router.push('/sign-in')
            setLoader(flase)
            return
        }

        const data = {
            data: {
                Quantity: quantity,
                Amount: productTotalPrice.toFixed(2),
                products: product.documentId,
                user: user.id,
                userId: user.id
            }
        }
        console.log(data)
        GlobalApi.addToCart(data, jwt).then((resp) => {
            console.log(resp)
            toast('Toegevoegd aan winkelmandje')
            setUpdateCart(!updateCart)
            setLoader(false)
        }, (e) => {
            toast('Er is iets misgegaan ...', e)
            setLoader(false)
        })

        onClose()
    }

    // Function to format the description
    const formatDescription = (description) => {
        return description.split('-').map(item => item.trim()).filter(item => item).map((item, index) => (
            <span key={index}>
                - {item}
                {index < description.split('-').length - 1 && <br />} {/* Add a line break except after the last item */}
            </span>
        ));
    };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
        <Image 
            src={product.image?.url}
            alt=''
            width={300}
            height={300}
            className='hidden md:flex bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-md'
        />
        <div className='flex flex-col gap-3'>
            <div>
                <h2 className='text-2xl font-bold'>{product.name}</h2>
                <h2 className='text-sm text-left text-gray-500'>{formatDescription(product.description)}</h2>
            </div>
            <div className='flex gap-6'>
                {product.sellingPrice && <h2 className='font-bold text-3xl'>€ {product.sellingPrice}</h2>}
                <h2 className={`font-bold text-3xl ${product.sellingPrice&&'line-through text-slate-200'}`}>€ {product.mrp}</h2>
            </div>
            <h2 className='font-bold text-lg'>Hoeveelheid ( {product.itemQuantityType} )</h2>
            <div className='flex flex-col items-baseline gap-3'>
                <div className='flex gap-3 items-center'>
                    <div className='my-2 flex gap-5 items-center justify-between'>
                        <Button 
                            variant='outline'
                            size='icon'
                            className='border-2 border-black'
                            disabled={quantity==1} 
                            onClick={() => setQuantity(quantity-1)}
                        >
                            <Minus className='text-black'/>
                        </Button>
                        <h2>{quantity}</h2>
                        <Button
                            variant='outline'
                            size='icon'
                            className='border-2 border-black'
                            onClick={() => setQuantity(quantity+1)}
                        >
                            <Plus className='text-black'/>
                        </Button>
                    </div>
                    <h2 className='text-2xl font-bold'> = € {(quantity*productTotalPrice).toFixed(2)}</h2>
                </div>
                <Button disabled={loader} className='flex gap-3' onClick={() => addToCart()}>
                    <ShoppingBasket />
                    {loader ? <LoaderIcon className='animated-spin'/>: 'Bestellen'}
                </Button>
            </div>
            <div>
                <h2 className='font-bold bg-secondary text-primary rounded-md p-2 w-fit'>
                    {/* <span>Category:</span> */}
                    {product.category.name}
                </h2>
            </div>
        </div>
    </div>
  )
}

export default ProductItemDetail
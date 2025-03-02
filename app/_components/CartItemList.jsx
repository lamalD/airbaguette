'use client'

import React, { useEffect, useState } from 'react'

// import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'

function CartItemList({cartItemList, onDeleteItem}) {

    console.log(cartItemList)

    // const [subtotal, setSubtotal] = useState(0)

    // useEffect (() => {

    //     let total = 0
    //     cartItemList.forEach(element => {
    //         total = total + element.amount
    //     });

    //     setSubtotal(total)

    // }, [cartItemList])

    // console.log(cartItemList)

  return (
    <div>
        <div className='h-[500px] overflow-auto'>
            {cartItemList.map((cart, index) => (
                <div key={index} className='flex justify-between items-center p-2 mb-5'>
                    <div className='flex gap-6 items-center'>
                        <Image 
                            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+cart.image} 
                            alt={cart.name} 
                            width={70} 
                            height={70}
                            className='border p-2'
                        />
                        <div>
                            <h2 className='font-bold'>{cart.name}</h2>
                            <h2>Quantity {cart.quantity}</h2>
                            <h2 className='text-lg font-bold'>€ {cart.amount}</h2>
                        </div>
                    </div>
                    <TrashIcon 
                        className='cursor-pointer'
                        onClick={() => onDeleteItem(cart.id)}
                    />
                </div>
            ))}
        </div>
        {/* <div className='absolute w-[90%] bottom-6 flex flex-col'>
            <h2 className='text-lg font-bold flex justify-between'>Subtotal <span>€ {subtotal.toFixed(2)}</span></h2>
            <Button>Checkout</Button>
        </div> */}
    </div>
  )
}

export default CartItemList
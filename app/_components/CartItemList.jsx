'use client'

import React, { useEffect, useState } from 'react'

import { TrashIcon } from 'lucide-react'
import Image from 'next/image'

function CartItemList({cartItemList, onDeleteItem}) {

    console.log(cartItemList)

  return (
    <div>
        <div className='h-[500px] overflow-auto'>
            {cartItemList.map((cart, index) => (
                <div key={index} className='flex justify-between items-center p-2 mb-5 border border-secondary rounded-md'>
                    <div className='flex gap-6 items-center'>
                        <Image 
                            src={cart.image} 
                            alt={cart.name} 
                            width={70} 
                            height={70}
                            className='border rounded-md p-2'
                        />
                        <div>
                            <h2 className='font-bold'>{cart.name}</h2>
                            <h2>Aantal: {cart.quantity}</h2>
                            <h2 className='text-lg font-bold'>€ {cart.amount}</h2>
                        </div>
                    </div>
                    <TrashIcon 
                        className='cursor-pointer text-primary hover:text-red-600'
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
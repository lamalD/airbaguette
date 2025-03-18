'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProductItemDetail from './ProductItemDetail'
import { Plus, ShoppingBasket } from 'lucide-react'

function ProductItem({product}) {

    console.log('Product: ', product)

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const closeDialog = () => {
        setIsDialogOpen(false);
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
    <div className='p-2 flex flex-row items-start justify-between border rounded-lg min-w-[200px] 
                    md:p-5 md:space-x-8 md:min-w-[400px] 
                    hover:scale-105 hover:shadow-md hover:ml-3 transition-all ease-in-out scrollbar-hide'
    >
        <Image 
            src={product.image?.url} 
            alt='image' 
            className='hidden md:flex object-contain' 
            width={150} 
            height={150}
        />
        <div className='flex flex-col justify-start items-start space-y-2 p-2 w-[75%] md:w-[75%]'>
            <h2 className='font-bold text-sm sm:text-lg md:text-2xl text-start'>
                {product.inStock ? 
                    (
                        <p>{product.name}</p>
                    ) 
                    : 
                    (
                        <p>
                            <span className="line-through text-black">{product.name}</span>
                            <br />
                            <span className="text-red-500">Uitverkocht</span>
                        </p>
                    )
                }
            </h2>
            {product.description ? 
                (
                    <p className='ml-2 text-xs text-slate-300'>{formatDescription(product.description)}</p>
                ) 
                : 
                (
                    // <p className='text-gray-500'>No description available.</p> // Placeholder message
                    <></> // Empty element to avoid warning
                )
            }
        </div>
        <div className='flex flex-col justify-center items-start gap-4 min-w-fit mt-2'>
            <div className='flex flex-row gap-3'>
                {product.sellingPrice && <h2 className='font-bold text-lg md:text-2xl'>€ {product.sellingPrice}</h2>}
                <h2 className={`font-bold text-lg md:text-2xl ${product.sellingPrice&&'line-through text-red-500'}`}>€ {product.mrp}</h2>
            </div>

            {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <div className='flex flex-row items-center justify-center px-1.5 py-0.5 md:p-2 border rounded-lg bg-primary text-white hover:cursor-pointer hover:bg-secondary hover:text-primary ease-in-out'>
                        <Plus 
                            size={24} 
                            strokeWidth={3}
                            className='w-6'
                        />
                        <ShoppingBasket 
                            size={48}
                            className='w-6'
                        />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle></DialogTitle>
                        <DialogDescription>
                            <ProductItemDetail product={product} onClose={closeDialog}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog> */}

            {product.inStock ? (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <div className='flex flex-row items-center justify-center px-1.5 py-0.5 md:p-2 border rounded-lg bg-primary text-white hover:cursor-pointer hover:bg-secondary hover:text-primary ease-in-out'>
                                <Plus 
                                    size={24} 
                                    strokeWidth={3}
                                    className='w-6'
                                />
                                <ShoppingBasket 
                                    size={48}
                                    className='w-6'
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                                <DialogDescription>
                                    <ProductItemDetail product={product} onClose={closeDialog}/>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                ) : (
                    <div className='flex flex-row items-center justify-center px-1.5 py-0.5 md:p-2 border rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed'>
                        <Plus 
                            size={24} 
                            strokeWidth={3}
                            className='w-6'
                        />
                        <ShoppingBasket 
                            size={48}
                            className='w-6'
                        />
                        {/* <span className='ml-2'>Out of Stock</span> */}
                    </div>
                )}
        </div>
    </div>
  )
}

export default ProductItem
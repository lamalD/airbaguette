
import Image from 'next/image'
import React from 'react'

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
    <div className='p-2 md:p-5 flex flex-col md:flex-row md:space-x-8 items-center justify-center md:justify-between border rounded-lg min-w-[200px] md:min-w-[400px] hover:scale-105 hover:shadow-md hover:ml-3 transition-all ease-in-out scrollbar-hide'>
        <Image 
            src={product.image?.url} 
            alt='image' 
            className='object-contain' 
            width={150} 
            height={150}
        />
        <div className='flex flex-col justify-start items-start space-y-2 p-2 w-[50%]'>
            <h2 className='font-bold text-2xl text-start'>{product.name}</h2>
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
        <div className='flex flex-col justify-center items-center gap-4'>
            <div className='flex flex-row gap-3'>
                {product.sellingPrice && <h2 className='font-bold text-lg md:text-2xl'>€ {product.sellingPrice}</h2>}
                <h2 className={`font-bold text-lg md:text-2xl ${product.sellingPrice&&'line-through text-red-500'}`}>€ {product.mrp}</h2>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <div className='flex flex-row items-center justify-center p-2 border rounded-lg bg-blue-500 text-white hover:cursor-pointer hover:bg-slate-200 hover:text-black ease-in-out'>
                        <Plus size={24} strokeWidth={3}/>
                        <ShoppingBasket size={48} />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle></DialogTitle>
                        <DialogDescription>
                            <ProductItemDetail product={product}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default ProductItem
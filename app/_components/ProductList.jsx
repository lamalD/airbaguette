import React from 'react'
import ProductItem from './ProductItem'

function ProductList({productList}) {

  console.log('ProductList: ', productList)

  return (
    <div className='flex flex-col mt-10'>
        {/* <h2 className='text-primary font-bold text-2xl'>Our Popular Products</h2> */}
        <div className='flex flex-col space-y-4 mt-6'>
            {productList.map((product, index) => (
                    <ProductItem key={index} product={product}/>
                ))
            }
        </div>
    </div>
  )
}

export default ProductList
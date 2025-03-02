import React from 'react'

import GlobalApi from '@/app/_utils/GlobalApi'
import TopCategoryList from '../_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'

async function ProductCategory({params}) {

    const { categoryName } = await params
    
    const productList = await GlobalApi.getProductsByCategory(categoryName)
    const categoryList = await GlobalApi.getCategoryList()

  return (
    <div>
      <TopCategoryList categoryList={categoryList} selectedCategory={categoryName}/>
        {/* <h2 className='p-4 bg-primary text-white font-bold text-3xl text-center mt-2'>{categoryName}</h2> */}
        <div className='flex justify-center p-5 md:p-10'>
            <ProductList productList={productList}/>
        </div>
    </div>
  )
}

export default ProductCategory
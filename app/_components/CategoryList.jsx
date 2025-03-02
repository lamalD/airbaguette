
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

function CategoryList({categoryList}) {
  return (
    <div className='mt-2'>
        {/* <h2 className='text-primary font-bold text-2xl'>Shop by Category</h2> */}
        <div className='flex justify-center items-center gap-4 mt-4'>
            {categoryList.map((category, index) => (
                    <Link
                        href={'products-category/'+category.name} 
                        key={index} 
                        className='flex flex-col lg:flex-row gap-4 p-4 items-center border-2 border-slate-200 rounded-md cursor-pointer hover:bg-slate-200 group'
                    >
                        <Image 
                            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category.icon[0]?.url}
                            alt='icon'
                            width={100} 
                            height={100}
                            className='group-hover:scale-125 transition-all ease-in-out'
                        />
                        <h2 className=''>{category.name}</h2>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default CategoryList
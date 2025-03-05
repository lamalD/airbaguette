
import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

function CategoryList({categoryList}) {
    
  return (
    <div className='mt-5'>
        <div className='flex items-end justify-center gap-2 md:gap-6 px-2'>
            {categoryList.map((category, index) => (
                    <Link
                        href={category.name} 
                        key={index} 
                        className={`flex flex-col lg:flex-row gap-4 p-2 items-center border-2 border-primary rounded-md cursor-pointer hover:bg-slate-200 hover:border-secondary hover:text-primary group ${selectedCategory===category.name&&'bg-slate-200 border-secondary text-primary'}`}
                    >
                        <Image 
                            src={category.icon[0]?.url}
                            alt='icon'
                            width={100} 
                            height={100}
                            className='group-hover:scale-110 transition-all ease-in-out'
                        />
                        <h2 className='hidden sm:flex group-hover:scale-110 transition-all ease-in-out'>{category.name}</h2>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default CategoryList
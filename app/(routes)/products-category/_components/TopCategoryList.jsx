import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TopCategoryList({categoryList, selectedCategory}) {

  return (
    <div className='mt-5'>
        
        <div className='flex justify-center gap-4 mt-4'>
            {categoryList.map((category, index) => (
                    <Link
                        href={encodeURIComponent(category.name)} 
                        key={index} 
                        className={`flex flex-col lg:flex-row gap-4 p-4 items-center border-2 border-slate-200 rounded-md cursor-pointer hover:bg-slate-200 group ${selectedCategory===category.name&&'bg-slate-200'}`}
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

export default TopCategoryList
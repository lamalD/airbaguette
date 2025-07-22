'use client'

import React, { useEffect, useRef, useState } from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
  

function PromoSlider({sliderList}) {
  

  return (
    <div>
        <Carousel 
          // plugins={[Autoplay({ delay: 10000 })]}
          // opts={{ loop: true, align: "center" }}
        >
            <CarouselContent>
                {sliderList.map((slider, index) => (
                    <CarouselItem key={index} className="relative">
                        <Image 
                            src={slider.image[0]?.url} 
                            alt='slider' 
                            width={1000} 
                            height={400} 
                            className='w-full h-[350px] md:h-[400px] object-cover rounded-2xl opacity-60'
                        />
                        <div className="absolute top-4 right-2 flex flex-col justify-between items-center h-full
                                        md:left-12
                                        lg:items-start">
                            <h2 className="text-primary text-sm border-2 py-1 px-2 border-primary rounded-lg mb-2
                                            md:text-2xl md:px-2 
                                            lg:text-4xl lg:py-4 lg:px-12 lg:border-4">
                                {slider.name === 'Promo_Broodje' ? 'NIEUW!' : 'Salade van de Maand'}
                            </h2>
                        </div>
                        <div className="absolute top-6 left pl-2 pt-2 flex flex-col justify-between items-center h-full
                                        md:top-16
                                        lg:top-4 lg:right-4">
                            <div className='space-y-2 md:space-y-3 lg:space-y-4'>
                                <div className='flex flex-col items-start justify-center'>
                                    <div className='flex flex-row items-start justify-center space-x-3'>
                                        <img 
                                            className='w-6 lg:w-10'
                                            src='https://beneficial-strength-ca77e606b4.media.strapiapp.com/thumbnail_sandwich_b9b9429bc5.png?updatedAt=2025-03-04T07%3A20%3A31.267Z'
                                            // style={{ width: '35px', height: 'auto' }} 
                                        />
                                        <h3 className='text-sm lg:text-lg font-bold'>
                                            Skylox
                                        </h3>
                                    </div>
                                    <h4 className='text-xs md:text-sm italic'>
                                        Gerookte zalm & roomkaas. Fris, zacht, onweerstaanbaar.
                                    </h4>
                                </div>
                                <div className='flex flex-col items-start justify-center'>
                                    <div className='flex flex-row items-start justify-center space-x-3'>
                                        <img 
                                            className='w-6 lg:w-10'
                                            src='https://beneficial-strength-ca77e606b4.media.strapiapp.com/thumbnail_sandwich_b9b9429bc5.png?updatedAt=2025-03-04T07%3A20%3A31.267Z'
                                            // style={{ width: '35px', height: 'auto' }} 
                                        />
                                        <h3 className='text-sm lg:text-lg font-bold'>
                                            Northern Approach
                                        </h3>
                                    </div>
                                    <h4 className='text-xs md:text-sm italic'>
                                        Zalm met een pittige koers. Mierikswortel aan boord.
                                    </h4>
                                </div>
                                <div className='flex flex-col items-start justify-center'>
                                    <div className='flex flex-row items-start justify-center space-x-3'>
                                        <img
                                            className='w-6 lg:w-10'
                                            src='https://beneficial-strength-ca77e606b4.media.strapiapp.com/thumbnail_sandwich_b9b9429bc5.png?updatedAt=2025-03-04T07%3A20%3A31.267Z'
                                            // style={{ width: '35px', height: 'auto' }} 
                                        />
                                        <h3 className='text-sm lg:text-lg font-bold'>
                                            Nordic Vector
                                        </h3>
                                    </div>
                                    <h4 className='text-xs md:text-sm italic'>
                                        Mosterd-dille en zalm in volle vaart. Koel. Kraakvers.
                                    </h4>
                                </div>
                                <div className='flex flex-col items-start justify-center'>
                                    <div className='flex flex-row items-start justify-center space-x-3'>
                                        <img
                                            className='w-6 lg:w-10' 
                                            src='https://beneficial-strength-ca77e606b4.media.strapiapp.com/thumbnail_salad_2605812f5b.png?updatedAt=2025-05-18T15%3A52%3A16.451Z'
                                            // style={{ width: '35px', height: 'auto' }} 
                                        />
                                        <h3 className='text-sm lg:text-lg font-bold'>
                                            Northern Light
                                        </h3>
                                    </div>
                                    <h4 className='text-xs md:text-sm italic'>
                                        Frisse salade. Koude zalm. Heldere smaken.
                                    </h4>
                                </div>
                                <div className='right pt-5 mx-5 
                                                md:left md:pt-10
                                                lg:pt-5'>
                                    <a href="https://airbaguette.be/products-category/Nieuw" target="_blank" rel="noopener noreferrer">
                                        <button 
                                            className="bg-blue-500 text-white px-8 py-2 mb-8 rounded hover:bg-secondary"
                                        >
                                            Bestel Nu
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                          
                        {/* <div className="absolute bottom-4 left-8">
                          <h2 className="text-white bg-black bg-opacity-50 p-2 rounded mb-2">
                              Broodje van de Maand
                          </h2>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                              Learn More
                          </button>
                        </div> */}
                    </CarouselItem>
                ))}
                
            </CarouselContent>
            {/* <CarouselPrevious className='hidden md:flex md:pl-2' />
            <CarouselNext className='hidden md:flex md:pr-2' /> */}
        </Carousel>

    </div>
  )
}

export default PromoSlider
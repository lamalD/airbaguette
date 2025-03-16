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
                            className='w-full h-[250px] md:h-[400px] object-cover rounded-2xl opacity-60'
                        />
                        <div className="absolute top-4 right-4 flex flex-col justify-between items-center h-full">
                          <h2 className="text-red-600 text-4xl p-4 border-4 border-red-600 rounded-lg mb-2">
                              {slider.name === 'Promo_Broodje' ? 'Broodje van de Maand' : 'Salade van de Maand'}
                          </h2>
                          
                          <button className="bg-blue-500 text-white px-4 py-2 mb-8 rounded hover:bg-secondary">
                              Bestel Nu
                          </button>
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
            <CarouselPrevious className='hidden md:flex md:pl-2' />
            <CarouselNext className='hidden md:flex md:pr-2' />
        </Carousel>

    </div>
  )
}

export default PromoSlider
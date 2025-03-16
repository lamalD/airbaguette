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
  

function Slider({sliderList}) {
  

  return (
    <div>
        <Carousel 
          plugins={[Autoplay({ delay: 10000 })]}
          opts={{ loop: true, align: "center" }}
        >
            <CarouselContent>
                {sliderList.map((slider, index) => (
                    <CarouselItem key={index}>
                        <Image 
                            src={slider.image[0]?.url} 
                            alt='slider' 
                            width={1000} 
                            height={400} 
                            className='w-full h-[250px] md:h-[400px] object-cover rounded-2xl'/>
                    </CarouselItem>
                ))}
                
            </CarouselContent>
            <CarouselPrevious className='hidden md:flex md:pl-2' />
            <CarouselNext className='hidden md:flex md:pr-2' />
        </Carousel>

    </div>
  )
}

export default Slider
import React from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image'
  

function Slider({sliderList}) {
  return (
    <div>
        <Carousel>
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
            <CarouselPrevious className='hidden md:flex' />
            <CarouselNext className='hidden md:flex' />
        </Carousel>

    </div>
  )
}

export default Slider
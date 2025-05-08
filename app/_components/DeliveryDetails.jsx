import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar1Icon, Clock, Globe, MapPin, Truck } from 'lucide-react'

function DeliveryDetails() {
  return (
    <div className="bg-[#E0E0E0] rounded-lg">
        <div className="flex flex-col mx-auto p-2 space-y-2 text-xs
                        sm:px-6
                        md:flex-row md:items-center md:justify-between md:space-x-8 max-w-5xl md:py-8 lg:px-8">
            <div className='hidden'/>
            <div className='flex flex-row justify-start items-center space-x-4 p-4 border-2 border-[#1e88e5] rounded-lg
                            md:flex-col md:items-center md:justify-between md:h-32 md:w-[20%]'>
                <Clock color='#1e88e5' size={48} className='w-[24px] h-[24px] md:w-[48px] md:h-[48px]'/>
                <h2 className='text-center'>Bestel voor <span className=''>09h30</span></h2>
            </div>
            <div className='flex flex-row justify-start items-center space-x-4 p-4 border-2 border-[#1e88e5] rounded-lg
                            md:flex-col md:items-center md:justify-between md:h-32 md:w-[20%]'>
                <Calendar1Icon color='#1e88e5' size={48} className='w-[24px] h-[24px] md:w-[48px] md:h-[48px]'/>
                <h2 className='text-center'><span className=''>Dagelijkse</span> levering om 12h00</h2>
            </div>
            <div className='flex flex-row justify-start items-center space-x-4 p-4 border-2 border-[#1e88e5] rounded-lg
                            md:flex-col md:items-center md:justify-between md:h-32 md:w-[20%]'>
                <Truck color='#1e88e5' size={48} className='w-[24px] h-[24px] md:w-[48px] md:h-[48px]'/>
                <h2 className='text-center'>Enkel <span className=''>levering</span> mogelijk</h2>
            </div>
            <div className='flex flex-row justify-start items-center space-x-4 p-4 border-2 border-[#1e88e5] rounded-lg
                            md:flex-col md:items-center md:justify-between md:h-32 md:w-[20%]'>
                <MapPin color='#1e88e5' size={48} className='w-[24px] h-[24px] md:w-[48px] md:h-[48px]'/>
                <div>
                    <h2 className='text-center'>Leuvensesteenweg 248A</h2>
                    <h2 className='text-center'>1800 Vilvoorde</h2>
                </div>
            </div>
            <div className='flex flex-row justify-start items-center space-x-4 p-4 border-2 border-[#1e88e5] rounded-lg
                            md:flex-col md:items-center md:justify-between md:h-32 md:w-[20%]'>
                <Globe color='#1e88e5' size={48} className='w-[24px] h-[24px] md:w-[48px] md:h-[48px]'/>
                <h2 className='text-center'>Eenvoudig online</h2>
            </div>
        </div>
    </div>
  )
}

export default DeliveryDetails
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar1Icon, Clock, Globe, MapPin, Truck } from 'lucide-react'

function BannerHomepage() {
  return (
    <div className="bg-white rounded-lg border-red-600 border-2">
        <div className="flex flex-col mx-auto p-2 space-y-2
                        sm:px-6
                        md:space-x-8 max-w-5xl lg:px-8">
            {/* <p className='text-center text-sm md:text-2xl text-red-600'>
                Bestellen kan tot 09h30 de dag zelf, ook in het weekend!
            </p> */}
            <p className='text-center text-sm md:text-2xl text-red-600'>
                Tijdelijke gesloten wegens persoonlijke redenen.
            </p>
        </div>
    </div>
  )
}

export default BannerHomepage
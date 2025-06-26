'use client'

import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'

import AdminApi from '../_utils/AdminApi'
import GlobalApi from '../_utils/GlobalApi'

import { PackageIcon, ShoppingCartIcon, UserIcon, Check, Truck, Package, PackageCheck, Mail, MailCheck, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"


function SectionCardsProd(storedJwt) {

  const [isOpen, setIsOpen] = useState(false)

  const [totalProducts, setTotalProducts] = useState([])

  console.log('storedJWT: ', storedJwt)

  useEffect(() => {
    // Function to fetch data
    const fetchData = () => {
            
      getTotalProducts()
      
    };
    // Initial fetch
    fetchData()
    // Set up interval to run fetchData every 5 minutes (300000 milliseconds)
    const intervalId = setInterval(fetchData, 150000)
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, []);

  const getTotalProducts = async () => {
    const products = await GlobalApi.getAllProducts()
    console.log('products = ', products)

    setTotalProducts(products)
  }

  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex flex-col 
                      md:flex-row md:px-6 md:justify-start md:space-x-10'>
        {/* <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription className='flex font-medium text-black'>Totaal Aantal Users</CardDescription>
            <CardTitle className="flex items-center justify-center gap-10 text-primary @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <UserIcon />
              {totalUsers.data}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
          </CardFooter>
        </Card> */}
        {/* <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription className='flex font-medium text-black'>Totaal Aantal Bestellingen</CardDescription>
            <CardTitle className="flex items-center justify-center gap-10 text-primary @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <ShoppingCartIcon />
              {totalProducts.length}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
          </CardFooter>
        </Card> */}
        <Card className="@container/card">
          <CardHeader className="relative">
          <CardDescription className='flex font-medium text-black'>Totaal Aantal Producten</CardDescription>
            <CardTitle className="flex items-center justify-center gap-10 text-primary @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <PackageIcon />
              {totalProducts.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className='px-6'>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardContent className='flex flex-row pt-10'>
              <div className='flex flex-col'>
                { totalProducts.length === 0 ? 
                  (
                    <div>
                      Geen Producten Momenteel
                    </div>
                  ) 
                  : 
                  (
                    totalProducts.map((product) => {
                    console.log("product: ", product)
                    return (
                      <div key={product.documentId} className='flex flex-col p-2 mb-5 border border-primary rounded-md'>
                        <div className='flex justify-between items-center p-2 mb-2 border border-secondary rounded-md'>
                          <div className='flex flex-row gap-6 text-sm w-full'>
                            <div className={`flex font-bold items-center justify-start`}>
                              <img 
                                // src={`${product.category[0].name}.png`} 
                                src={product.image.url}
                                alt={product.category[0].name} 
                                className="w-7 h-7 object-cover rounded"
                              />
                            </div>
                            <div className='flex items-center justify-start space-x-2'>
                              {product.name}
                            </div>
                            <div className='flex items-center justify-end space-x-3'>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className={'bg-white'}
                                // onClick={() => updateOrderReady(order.orderReady, order.documentId)}
                              >
                                <Trash2 className={'text-gray-700 hover:bg-red-700'}/>
                              </Button>
                            </div>
                          </div>
                        </div>
                        {/* <div className='mt-2'>
                          {totalProducts.map((item, itemIndex) => {
                            // console.log('Item Product ID:', item.product.id);
                            return (
                              <div key={item.id} className='flex justify-between items-center p-2 border border-gray-300 rounded-md mb-2 text-sm'>
                                <div className='flex justify-start items-center space-x-4'>
                                  <img 
                                    src={`${item.category[0].name}.png`} 
                                    alt={item.name} 
                                    className="w-7 h-7 object-cover rounded"
                                  />
                                  
                                </div>
                                <div className='mr-5'>
                                  <Checkbox className="border-black data-[state=checked]:bg-green-600 data-[state=checked]:text-primary-foreground"/>
                                </div>
                              </div>
                            );
                          })}
                        </div> */}
                      </div>
                    )
                  })
                  )
                }
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}

export default SectionCardsProd
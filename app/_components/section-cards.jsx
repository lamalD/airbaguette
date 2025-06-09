'use client'

import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'

import AdminApi from '../_utils/AdminApi'
import GlobalApi from '../_utils/GlobalApi'

import { PackageIcon, ShoppingCartIcon, TrendingDownIcon, TrendingUpIcon, UserIcon, Check, Truck, Package, PackageCheck } from "lucide-react"
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


function SectionCards(storedJwt) {

  const [isOpen, setIsOpen] = useState(false)

  const [totalUsers, setTotalUsers] = useState(0)
  const [lastSignedUser, setLastSignedUser] = useState('')
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalCurrentOrders, setTotalCurrentOrders] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

  console.log('storedJWT: ', storedJwt)

  // useEffect(() => {
  //   getTotalUsers()
  //   console.log("users: ", totalUsers)
  //   // console.log("users.count: ", totalUsers?.length)
  //   getLastSignedUpUser()
  //   getOrderCount()
  //   getProductCount()
  //   getAllCurrentOrders()
  // }, [])

  useEffect(() => {
    // Function to fetch data
    const fetchData = () => {
      getTotalUsers()
      console.log("users: ", totalUsers)
      // console.log("users.count: ", totalUsers?.length);
      getLastSignedUpUser ()
      getOrderCount()
      getProductCount()
      getAllCurrentOrders()
    };
    // Initial fetch
    fetchData()
    // Set up interval to run fetchData every 5 minutes (300000 milliseconds)
    const intervalId = setInterval(fetchData, 150000)
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, []);

  const getTotalUsers = async () => {
    const userList = await AdminApi.getUsersCount()
          
    setTotalUsers(userList)
  }

  const getLastSignedUpUser = async () => {
    const lastUser = await AdminApi.getLastUser()

    console.log('lastUser: ', lastUser)

    setLastSignedUser(lastUser.username)
  }

  const getOrderCount = async () => {

    const orders = await AdminApi.getAllOrders()

    setTotalOrders(orders.length)
  }

  const getProductCount = async () => {
    const products = await GlobalApi.getAllProducts()
    console.log('products = ', products)

    setTotalProducts(products.length)
  }

  const getAllCurrentOrders = async () => {
    const currentOrders = await AdminApi.getCurrentOrders()

    console.log("currentOrders: ", currentOrders[0].orderItemList[0].product.category[0].name)

    setTotalCurrentOrders(currentOrders)
  }

  const updateOrderReady = async (orderState, orderId) => {

    try {
      if (orderState) {
        const payload = {
          data : {
            orderReady: false,
          }
        }
        
        await AdminApi.openOrder(orderId, payload, storedJwt)

        getAllCurrentOrders()

      } else {
          const payload = {
            data : {
              orderReady: true,
            }
        }
        
        await AdminApi.completeOrder(orderId, payload, storedJwt)

        getAllCurrentOrders()

      }
    } catch (error) {
      console.error("Failed to update order state:", error);
    }
  }

  const updateOutForDelivery = async (orderState, orderId) => {

    try {
      if (orderState) {
        const payload = {
          data : {
            outForDelivery: false,
          }
        }
        
        await AdminApi.openOrder(orderId, payload, storedJwt)

        getAllCurrentOrders()

      } else {
          const payload = {
            data : {
              outForDelivery: true,
            }
        }
        
        await AdminApi.completeOrder(orderId, payload, storedJwt)

        getAllCurrentOrders()

      }
    } catch (error) {
      console.error("Failed to update order state:", error);
    }
  }

  const updateOrderDelivered = async (orderState, orderId) => {

    try {
      if (orderState) {
        const payload = {
          data : {
            orderDelivered: false,
          }
        }
        
        await AdminApi.openOrder(orderId, payload, storedJwt)

        getAllCurrentOrders()

      } else {
          const payload = {
            data : {
              orderDelivered: true,
            }
        }
        
        await AdminApi.completeOrder(orderId, payload, storedJwt)

        getAllCurrentOrders()

      }
    } catch (error) {
      console.error("Failed to update order state:", error);
    }
  }

  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex flex-col 
                      md:flex-row md:px-6 md:justify-start md:space-x-10'>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription className='flex font-medium text-black'>Totaal Aantal Users</CardDescription>
            <CardTitle className="flex items-center justify-center gap-10 text-primary @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <UserIcon />
              {totalUsers.data}
            </CardTitle>
            {/* <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
                +12.5%
              </Badge>
            </div> */}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            {/* <div className="line-clamp-1 flex gap-2 font-medium">
              Nieuwste User
            </div>
            <div className="text-muted-foreground">
              {lastSignedUser}
            </div> */}
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription className='flex font-medium text-black'>Totaal Aantal Bestellingen</CardDescription>
            <CardTitle className="flex items-center justify-center gap-10 text-primary @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <ShoppingCartIcon />
              {totalOrders}
            </CardTitle>
            {/* <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingDownIcon className="size-3" />
                -20%
              </Badge>
            </div> */}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            {/* <div className="line-clamp-1 flex gap-2 font-medium">
              Down 20% this period
            </div>
            <div className="text-muted-foreground">
              Acquisition needs attention
            </div> */}
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader className="relative">
          <CardDescription className='flex font-medium text-black'>Totaal Aantal Producten</CardDescription>
            <CardTitle className="flex items-center justify-center gap-10 text-primary @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <PackageIcon />
              {totalProducts}
            </CardTitle>
            {/* <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
                +12.5%
              </Badge>
            </div> */}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            {/* <div className="line-clamp-1 flex gap-2 font-medium">
              Strong user retention <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Engagement exceed targets</div> */}
          </CardFooter>
        </Card>
      </div>
      <div className='px-6'>
        <Card className="@container/card">
          <CardHeader className="relative">
            {/* <CardDescription className='flex font-medium text-black'>
              Bestellingen voor dd/MM/yy
            </CardDescription> */}
            <CardTitle className="flex items-center justify-start space-x-20 gap-10 text-primary @[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              <h2>
                Huidige Bestellingen  
              </h2>
              <h2>
                {totalCurrentOrders.length}
              </h2>
            </CardTitle>
            <CardContent className='flex flex-row pt-10'>
              
              <div className='flex flex-col'>
                { totalCurrentOrders.length === 0 ? 
                  (
                    <div>
                      Geen Bestellingen Momenteel
                    </div>
                  ) 
                  : 
                  (
                    totalCurrentOrders.map((order, index) => {
                    // Determine the icon color based on the order properties
                    let iconColor = '';
                    if (!order.paymentDone && (!order.deliveryDate || order.deliveryDate.trim() === '')) {
                      iconColor = 'text-red-600'; // Red color for payment not done and no delivery date
                    } else if (!order.paymentDone && order.deliveryDate) {
                      iconColor = 'text-orange-600'; // Orange color for payment not done and delivery date filled
                    } else if (order.paymentDone && order.deliveryDate) {
                      iconColor = 'text-green-600'; // Green color for payment done and delivery date filled
                    }

                    let orderState = ''
                    if (order.orderReady) {
                      orderState = true
                    } else orderState = false

                    console.log('orderState: ', orderState)

                    let orderOutForDelivery = ''
                    if (order.outForDelivery) {
                      orderOutForDelivery = true
                    } else orderOutForDelivery = false

                    console.log('orderOutForDelivery: ', orderOutForDelivery)

                    let orderIsDelivered = ''
                    if (order.orderDelivered) {
                      orderIsDelivered = true
                    } else orderIsDelivered = false

                    console.log('orderIsDelivered: ', orderIsDelivered)

                    return (
                      <div key={index} className='flex flex-col p-2 mb-5 border border-primary rounded-md'>
                        <div className='flex justify-between items-center p-2 mb-2 border border-secondary rounded-md'>
                          <div className='grid grid-cols-5 gap-4 text-sm w-full'>
                            <div className={`flex font-bold items-center justify-start ${orderState ? 'text-green-600' : 'text-red-600'}`}>
                              #{order.id}
                            </div>
                            <div className='flex font-bold items-center justify-start'>
                              {order.deliveryDate}
                            </div>
                            <div className='flex items-center justify-start space-x-2'>
                              {order.firstName} {order.lastName}
                            </div>
                            <div className={`flex font-bold items-center justify-end ${iconColor}`}>
                              € {order.totalOrderAmount}
                            </div>
                            <div className='flex items-center justify-end space-x-3'>
                              
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className={`${orderState ? 'bg-green-600 hover:bg-green-600 hover:bg-opacity-50' : 'bg-red-600 hover:bg-red-600 hover:bg-opacity-50'}`}
                                onClick={() => updateOrderReady(order.orderReady, order.documentId)}
                              >
                                <Check className={`${orderState ? 'text-white' : 'text-white'}`}/>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="md" 
                                className={`w-[36px] h-[36px] ${orderOutForDelivery ? 'bg-green-600 hover:bg-green-600 hover:bg-opacity-50' : 'bg-red-600 hover:bg-red-600 hover:bg-opacity-50'}`}
                                onClick={() => updateOutForDelivery(order.outForDelivery, order.documentId)}
                              >
                                <Truck className={`${orderOutForDelivery ? 'text-white' : 'text-white'}`} size={48}/>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="md" 
                                className={`w-[36px] h-[36px] ${orderIsDelivered ? 'bg-green-600 hover:bg-green-600 hover:bg-opacity-50' : 'bg-red-600 hover:bg-red-600 hover:bg-opacity-50'}`}
                                onClick={() => updateOrderDelivered(order.orderDelivered, order.documentId)}
                              >
                                { 
                                  orderIsDelivered ? 
                                  (
                                    <PackageCheck className={`${orderOutForDelivery ? 'text-white' : 'text-white'}`} size={48}/>
                                  ) 
                                  : 
                                  (
                                    <Package className={`${orderOutForDelivery ? 'text-white' : 'text-white'}`} size={48}/>
                                  )
                                }
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className='mt-2'>
                          {order.orderItemList.map((item, itemIndex) => (
                            <div className='flex justify-between items-center p-2 border border-gray-300 rounded-md mb-2 text-sm'>
                              <div key={itemIndex} className='flex justify-start items-center space-x-4'>
                                <img 
                                  src={`${item.product.category[0].name}.png`} 
                                  alt={item.product.name} 
                                  className="w-7 h-7 object-cover rounded"
                                />
                                <span>{item.quantity}</span>
                                <span>x</span>
                                <span>{item.product.name}</span>
                              </div>
                              <div className='mr-5'>
                                <Checkbox className="border-black data-[state=checked]:bg-green-600 data-[state=checked]:text-primary-foreground"/>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })
                  )
                }
              </div>
            </CardContent>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            {/* <div className="line-clamp-1 flex gap-2 font-medium">
              Strong user retention <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">Engagement exceed targets</div> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default SectionCards
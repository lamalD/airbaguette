'use client'

import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'

import AdminApi from '../_utils/AdminApi'
import GlobalApi from '../_utils/GlobalApi'

import { PackageIcon, ShoppingCartIcon, TrendingDownIcon, TrendingUpIcon, UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function SectionCards() {

  const [totalUsers, setTotalUsers] = useState(0)
  const [lastSignedUser, setLastSignedUser] = useState('')
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    getTotalUsers()
    console.log("users: ", totalUsers)
    // console.log("users.count: ", totalUsers?.length)
    getLastSignedUpUser()
    getOrderCount()
    getProductCount()
  }, [])

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

  return (
    // <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
    <div className='flex flex-col 
                    md:flex-row md:px-6 md:justify-between'>
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
  )
}

export default SectionCards
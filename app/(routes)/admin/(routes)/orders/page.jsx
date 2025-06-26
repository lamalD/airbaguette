'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import SiteHeader from '@/app/_components/admin_header'
import Admin_Sidebar from '@/app/_components/admin_sidebar'
import AdminApi from '@/app/_utils/AdminApi'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function OrdersAdmin() {
  
  const router = useRouter()
  
  const [user, setUser ] = useState(null);
  const [jwt, setJwt] = useState(null)

  const [orderList, setOrderList] = useState([])
  const [totalCurrentOrders, setTotalCurrentOrders] = useState([])
  const [orderState, setOrderState] = useState("open")

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedUser  = JSON.parse(sessionStorage.getItem('user'));
        const storedJwt = sessionStorage.getItem('jwt');
        
        if (storedUser.username == 'Lamal_D') {

          setUser (storedUser);
          setJwt(storedJwt);
        } else router.push('/')
    }
  }, [])

  useEffect(() => {

    processOrders()
    checkOrderStatus()
    checkAllOrdersStatus(orderList)

  }, [])

  const checkAllOrdersStatus = (orderList) => {
    
    const allReady = orderList.every(order => order.orderReady === true)
    const allUnderway = orderList.every(order => order.outForDelivery === true)
    const allDelivered = orderList.every(order => order.orderDelivered === true)
    
    if (allReady) {
      setOrderState("klaar")
    } 

    if (allUnderway) {
      setOrderState("levering")
    }

    if (allDelivered) {
      setOrderState("geleverd")
    }
  }

  const checkOrderStatus = async (status) => {
    console.log("status = ", status)
    const currentOrders = await AdminApi.getCurrentOrders()
    
    console.log("currentOrders: ", currentOrders)

    setTotalCurrentOrders(currentOrders)
    // console.log("totalCurrentOrders: ", totalCurrentOrders)
    checkAllOrdersStatus(orderList)
  }

  const updateOrderStatus = async (value) => {

    setOrderState(value)
    
    checkOrderStatus(value)

    console.log("orderList[0]: ", orderList[0])
    console.log("orderList[0].orders: ", orderList[0].orders)

    switch (value) {
      case 'open':
        console.log('Order is Open')
        break;
      case 'afgesloten':
        console.log('Order is Afgesloten (09h31)')
        console.log('totalCurrentOrders: ', totalCurrentOrders)
        break;
      case 'klaar':
        console.log('Order is Klaar voor levering')
        console.log('totalCurrentOrders: ', totalCurrentOrders)
        totalCurrentOrders.map(async (order) => {
          console.log("order: ", order)
                  const payload = {
                    data : {
                      orderReady: true,
                    }
                  }
                  
                  await AdminApi.openOrder(order.documentId, payload, jwt)
        })
        break;
      case 'levering':
        console.log('Order is onderweg voor Levering')
        console.log('totalCurrentOrders: ', totalCurrentOrders)
        totalCurrentOrders.map(async (order) => {
          console.log("order: ", order)
                  const payload = {
                    data : {
                      outForDelivery: true,
                    }
                  }
                  
                  await AdminApi.openOrder(order.documentId, payload, jwt)
        })
        break;
      case 'geleverd':
        console.log('Order is Geleverd')
        console.log('totalCurrentOrders: ', totalCurrentOrders)
        totalCurrentOrders.map(async (order) => {
          console.log("order: ", order)
                  const payload = {
                    data : {
                      orderDelivered: true,
                    }
                  }
                  
                  await AdminApi.openOrder(order.documentId, payload, jwt)
        })
        break
    
      default:
        console.log('totalCurrentOrders: ', totalCurrentOrders)
        break;
    }
  }

  const processOrders = async () => {

    try {
      const allOrders = await AdminApi.getAllOrders();
      console.log('allOrders: ', allOrders);
      const groupedOrders = allOrders.reduce((groups, order) => {
        const date = order.deliveryDate || 'No Delivery Date';
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(order);
        return groups;
      }, {});
      // Convert grouped object to an array of entries and sort by date descending
      const reversedGroupedOrders = Object.entries(groupedOrders)
        .sort((a, b) => new Date(b[0]) - new Date(a[0])) // Sort by date descending
        .map(([date, orders]) => ({ date, orders })); // Convert back to an array of objects
      
      setOrderList(reversedGroupedOrders); // Set the reversed grouped orders
      console.log('Grouped orders by deliveryDate:', reversedGroupedOrders);
      
    } catch (error) {
      console.log('Error fetching allOrders ', error);
    }
  }

  return (
    <SidebarProvider>
      <Admin_Sidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Orders" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              <div className="w-full">
                <Table className="table-fixed w-full">
                  {/* <TableCaption>Overzicht recente bestellingen</TableCaption> */}
                  <TableHeader>
                    <TableRow className="bg-secondary">
                      <TableHead className="text-primary">Datum</TableHead>
                      <TableHead className="text-primary text-center w-[50%]">Status</TableHead>
                      <TableHead className="text-primary text-center">#Bestellingen</TableHead>
                      <TableHead className="text-right text-primary pr-5">Totaal (€)</TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
                {/* Scroll container */}
                <div className="w-full max-h-[400px] overflow-y-auto">
                  <Table className="table-fixed w-full">
                    <TableBody>
                      {orderList.map(({ date, orders }, index) => {
                        if (!Array.isArray(orders)) {
                          console.error(`Expected orders to be an array for date ${date}, but got:`, orders);
                          return null;
                        }
                        const totalAmount = orders.reduce((sum, order) => sum + order.totalOrderAmount, 0);
                        const totalOrders = orders.length;
                        return (
                          <TableRow 
                            key={index} 
                            className=""
                          >
                            <TableCell className="font-medium hover:cursor-default">{date}</TableCell>
                            <TableCell className='text-center w-[50%] hover:cursor-pointer'>
                              {index === 0 ? (
                                <Select
                                  className="text-center"
                                  value={orderState} 
                                  onValueChange={(value) => updateOrderStatus(value)}
                                >
                                  <SelectTrigger className="flex justify-between mx-auto w-[50%]">
                                    <SelectValue placeholder="Select a state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Status</SelectLabel>
                                      <SelectItem value="open">Open</SelectItem>
                                      <SelectItem value="afgesloten">Afgesloten</SelectItem>
                                      <SelectItem value="klaar">Klaar</SelectItem>
                                      <SelectItem value="levering">Uit voor Levering</SelectItem>
                                      <SelectItem value="geleverd">Geleverd</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <span className="text-white bg-green-950 px-20 py-2 rounded-md">Geleverd</span> // Of een andere inhoud
                              )}
                            </TableCell>
                            <TableCell className="text-center hover:cursor-default">{totalOrders}</TableCell>
                            <TableCell className="font-bold text-right pr-3 hover:cursor-default">€ {totalAmount.toFixed(2)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default OrdersAdmin
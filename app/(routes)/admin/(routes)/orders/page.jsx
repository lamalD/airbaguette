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

  }, [])

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
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              </div>
              
              <Table>
                <TableCaption>Overzicht recente bestellingen</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-primary">Datum</TableHead>
                    <TableHead className='text-primary'>Status</TableHead>
                    <TableHead className='text-primary'>#Bestellingen</TableHead>
                    <TableHead className="text-right text-primary">Totaal (€)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {orderList.map(({ date, orders }, index) => {
                  // Ensure orders is an array
                  if (!Array.isArray(orders)) {
                    console.error(`Expected orders to be an array for date ${date}, but got:`, orders);
                    return null; // Skip this entry if orders is not an array
                  }
                  // Calculate total amount
                  const totalAmount = orders.reduce((sum, order) => sum + order.totalOrderAmount, 0);
                  const totalOrders = orders.length; // Number of orders for that date
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{date}</TableCell>
                      <TableCell>Paid</TableCell> {/* You can modify this based on your order status */}
                      <TableCell className='text-right'>{totalOrders}</TableCell> {/* Display the total number of orders */}
                      <TableCell className="text-right">€ {totalAmount.toFixed(2)}</TableCell> {/* Format the total amount */}
                    </TableRow>
                  );
                })}
                </TableBody>
              </Table>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default OrdersAdmin
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Admin_Sidebar from '@/app/_components/admin_sidebar'
import SiteHeader from '@/app/_components/admin_header'
import SectionCards from '@/app/_components/section-cards'
import ChartAreaInteractive from '@/app/_components/admin_chart-area-interactive'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

function Dashboard() {

  const router = useRouter()

  const [user, setUser ] = useState(null);
  const [jwt, setJwt] = useState(null)

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
  
    
  return (
    <SidebarProvider>
      <Admin_Sidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Dashboard"/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards storedJwt={jwt}/>
              {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    // <div>Dashboard</div>
  )
}

export default Dashboard
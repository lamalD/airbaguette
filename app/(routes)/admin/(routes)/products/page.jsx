import React from 'react'

import SiteHeader from '@/app/_components/admin_header'
import Admin_Sidebar from '@/app/_components/admin_sidebar'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

function ProductsAdmin() {
  return (
    <SidebarProvider>
      <Admin_Sidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Products" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default ProductsAdmin
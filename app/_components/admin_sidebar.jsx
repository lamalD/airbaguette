'use client'

import React from 'react'
// import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  PackageIcon
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import NavMain from './nav_main'

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboardIcon,
        },
        {
        title: "Orders",
        url: "/admin/orders",
        icon: ShoppingCartIcon,
        },
        {
        title: "Products",
        url: "/admin/products",
        icon: PackageIcon,
        },
        {
        title: "Users",
        url: "/admin/users",
        icon: UsersIcon,
        },
        // {
        // title: "Team",
        // url: "#",
        // icon: UsersIcon,
        // },
    ],
}

function Admin_Sidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <div className='hidden sm:flex text-xl md:text-xl lg:text-xl'>
                    <h2 className='text-secondary'>AIR</h2>
                    <h2 className='text-primary'>BAGUETTE</h2>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain}/>
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}

export default Admin_Sidebar
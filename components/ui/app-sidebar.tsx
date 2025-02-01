"use client"
import { Home, Settings, LogIn, LayoutDashboard, FileInput, Database } from "lucide-react"
import { useRouter } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin/home",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Input",
    url: "#",
    icon: FileInput,
  },
//   {
//     title: "Login",
//     url: "/admin/logIn",
//     icon: LogIn,
//   },
  {
    title: "Data",
    url: "#",
    icon: Database,
  }, 
];
const settings = [
    {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
];

export function AppSidebar() {
    const router = useRouter()
  return (
    <Sidebar>
      <SidebarContent className="m-2">
        <SidebarGroup>
          <SidebarGroupLabel>
            <LogIn></LogIn>
            <div className="ml-2 text-lg">
                Table Share
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-1">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <hr></hr>
                {settings.map((setting) => (
                  <SidebarMenuItem key={setting.title} className="">
                    <SidebarMenuButton asChild>
                      <a href={setting.url}>
                        <setting.icon />
                        <span className="text-lg">{setting.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
      </SidebarContent>

        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => router.push('/logIn')}
            className="align-bottom h-12 mb-1 text-lg text-gray"
          >
            <p>Sign out</p>
          </Button>
        </div>
    </Sidebar>
  )
}

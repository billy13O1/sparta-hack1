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
import Logo from "../../public/logo.svg";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/admin/home",
    icon: LayoutDashboard,
  },
  {
    title: "Input",
    url: "/admin/input",
    icon: FileInput,
  },
//   {
//     title: "Login",
//     url: "/admin/logIn",
//     icon: LogIn,
//   },
  {
    title: "Data",
    url: "/admin/data",
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
    
    <Sidebar >
      <SidebarContent className="p-2 bg-black1D">
        <SidebarGroup > 
          <SidebarGroupLabel >
            <Logo></Logo>
            <div className="ml-2 text-lg text-white">
                Table Share
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="group/item mt-1">
                  <SidebarMenuButton asChild className="group-hover/item:bg-purple1">
                    <a href={item.url}>
                    <div className="text-purple1 group-hover/item:text-white">
                      <item.icon />
                    </div>
                      <span className="text-[14px]  text-purpleLight group-hover/item:text-white">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <hr></hr>
                {settings.map((setting) => (
                  <SidebarMenuItem key={setting.title} className="group/item">
                    <SidebarMenuButton asChild className="hover/item:bg-purple1">
                      <a href={setting.url} className="text-purple1 group-hover/item:text-white">
                        <setting.icon />
                        <span className="text-[14px] text-purpleLight group-hover/item:text-white">{setting.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
      </SidebarContent>

        <div className="flex justify-start bg-black1D">
          <Button
            variant="ghost"
            onClick={() => router.push('/logIn')}
            className="align-bottom h-12 mb-1 text-lg text-gray"
          >
            <p className="text-white">Sign out</p>
          </Button>
        </div>
    </Sidebar>
    
  )
}

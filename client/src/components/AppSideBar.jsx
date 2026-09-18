import { Home, PlusSquare, Menu } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "#components/ui/sidebar"

const mainNavItems = [
    { icon: Home, label: "Feed", url: "/feed" },
    { icon: PlusSquare, label: "Create post", url: "#" }
]

export function AppSidebar({...props}) {
    return (
        <Sidebar collapsible="icon" className="border-r border-zinc-800 bg-black text-white" {...props}>
            <SidebarContent className="flex flex-col justify-between py-6">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-4">
                            {mainNavItems.map(item => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        render={
                                            <a href={item.url} className="flex items-center gap-4">
                                            <item.icon className="h-20 w-20 stroke-2" />
                                            <span className="text-sm font-medium tracking-wide group-data-[collapsible=icon]:hidden">
                                                {item.label}
                                            </span>
                                            </a>
                                        }
                                        tooltip={item.label}
                                        className="text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all py-6 rounded-xl group-data-[collapsible=icon]:justify-center"
                                    />
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
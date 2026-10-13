import { Home, LogOut, PlusSquare } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "#components/ui/avatar";
import { useAuthStore } from "../store/authStore";

const UserAvatar = ({ className = "h-5 w-5" }) => {
  const user = useAuthStore((state) => state.user);
  return (
    <Avatar className={className}>
      <AvatarImage src={user?.avatarUrl} alt={user?.name || "User profile"} />
      <AvatarFallback className="text-xs bg-zinc-800 text-white">
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
};

const mainNavItems = [
  { icon: Home, label: "Feed", url: "/feed" },
  { icon: PlusSquare, label: "Create post", url: "/create-post" },
  { icon: UserAvatar, label: "Profile", url: "/profile", isAvatar: true },
];

export function AppSidebar({ ...props }) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="hidden md:flex border-r border-zinc-800 bg-black text-white"
        {...props}
      >
        <SidebarContent className="flex flex-col justify-between py-6">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        tooltip={item.label}
                        className={`transition-all py-3 px-3 rounded-xl group-data-[collapsible=icon]:justify-center ${
                          isActive
                            ? "bg-zinc-800 text-white font-semibold"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                        }`}
                        render={
                            <Link to={item.url} className="flex items-center gap-3">
                                {item.isAvatar ? (
                                    <Icon className="h-6 w-6 border border-zinc-700 rounded-full" />
                                ) : (
                                    <Icon className="h-5 w-5 shrink-0 stroke-2" />
                                )}
                                <span className="text-sm tracking-wide group-data-[collapsible=icon]:hidden">
                                    {item.label}
                                </span>
                            </Link>
                        }
                      />
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                tooltip="Logout"
                className="text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition-all py-3 px-3 rounded-xl group-data-[collapsible=icon]:justify-center"
              >
                <LogOut className="h-5 w-5 shrink-0 text-red-500" />
                <span className="text-sm font-medium tracking-wide group-data-[collapsible=icon]:hidden">
                  Logout
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around bg-black/95 backdrop-blur-md border-t border-zinc-800 py-2 px-4 text-white">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.url;

          return (
            <Link
              key={item.label}
              to={item.url}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors ${
                isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {item.isAvatar ? (
                <Icon className="h-6 w-6 border border-zinc-700 rounded-full" />
              ) : (
                <Icon className="h-6 w-6 stroke-2" />
              )}
              <span className="text-[10px] font-medium leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-1 p-2 text-zinc-400 hover:text-red-400 transition-colors"
          aria-label="Logout"
        >
          <LogOut className="h-6 w-6 text-red-500" />
          <span className="text-[10px] font-medium leading-none">Logout</span>
        </button>
      </nav>
    </>
  );
};

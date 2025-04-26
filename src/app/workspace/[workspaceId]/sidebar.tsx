import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "@/app/workspace/[workspaceId]/workspace-switcher";
import { SidebarButton } from "@/app/workspace/[workspaceId]/sidebar-button";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    const pathname = usePathname()

    return (
        <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
            <WorkspaceSwitcher/>
            <SidebarButton icon={ Home } label="主页" isActive={ pathname.includes("/workspace") }/>
            <SidebarButton icon={ MessageSquare } label="消息"/>
            <SidebarButton icon={ Bell } label="活动"/>
            <SidebarButton icon={ MoreHorizontal } label="更多"/>
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton/>
            </div>
        </aside>
    )
}
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizontal } from "lucide-react";
import { WorkspaceHeader } from "@/app/workspace/[workspaceId]/workspace-header";
import { SidebarItem } from "@/app/workspace/[workspaceId]/sidebar-item";
import { UseGetChannels } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "@/app/workspace/[workspaceId]/workspace-section";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { UserItem } from "@/app/workspace/[workspaceId]/user-item";

export const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();

    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const { data: channels, isLoading: channelsLoading } = UseGetChannels({ workspaceId });
    const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId });

    if (workspaceLoading || memberLoading) {
        return (
            <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
                <Loader className="size-5 animate-spin text-white"/>
            </div>
        )
    }

    if (!workspace || !member) {
        return (
            <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
                <AlertTriangle className="size-5 text-white"/>
                <p className="text-white text-sm">工作区不存在</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col bg-[#5E2C5F] h-full">
            <WorkspaceHeader workspace={ workspace } isAdmin={ member.role === "admin" }/>
            <div className="flex flex-col px-2 mt-3">
                <SidebarItem label="Threads" icon={ MessageSquareText } id="threads"/>
                <SidebarItem label="Drafts&Sent" icon={ SendHorizontal } id="drafts"/>
            </div>

            <WorkspaceSection label="频道" hint="新频道" onNew={ () => {
            } }>
                { channels?.map((item) => (
                    <SidebarItem icon={ HashIcon } id={ item._id } label={ item.name } key={ item._id }/>
                )) }
            </WorkspaceSection>
            <WorkspaceSection  label="私聊" hint="新私聊" onNew={ () => {
            } }>
                { members?.map(item => (
                    <UserItem key={ item._id } id={ item._id } label={ item.user.name } image={ item.user.image }/>
                )) }
            </WorkspaceSection>
        </div>
    )
}
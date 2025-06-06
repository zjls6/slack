"use client"

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { UseGetChannels } from "@/features/channels/api/use-get-channels";
import { useEffect, useMemo } from "react";
import { Loader, TriangleAlert } from "lucide-react";

const WorkspaceIdPage = () => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const [ open, setOpen ] = useCreateChannelModal();

    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })
    const { data: channels, isLoading: channelsLoading } = UseGetChannels({ workspaceId })

    const channelId = useMemo(() => channels?.[0]?._id, [ channels ])

    useEffect(() => {
        if (workspaceLoading || channelsLoading || !workspace) {
            return
        }

        if (channelId) {
            router.push(`/workspace/${ workspaceId }/channel/${ channelId }`)
        } else if (!open) {
            setOpen(true)
        }
    }, [ channelId, workspace, workspaceId, workspaceLoading, channelsLoading, open, setOpen, router ])

    if (workspaceLoading || channelsLoading) {
        return (
            <div className="h-full flex flex-1 items-center justify-center flex-col gap-2">
                <Loader className="size-6 animate-spin text-muted-foreground"/>
                <span className="text-sm text-muted-foreground">加载工作区...</span>
            </div>
        )
    }

    if (!workspace) {
        return (
            <div className="h-full flex flex-1 items-center justify-center flex-col gap-2">
                <TriangleAlert className="size-6 animate-spin text-muted-foreground"/>
                <span className="text-sm text-muted-foreground">工作区不存在</span>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-1 items-center justify-center flex-col gap-2">
            <Loader className="size-6 animate-spin text-muted-foreground"/>
            <span className="text-sm text-muted-foreground">加载频道...</span>
        </div>
    )
}

export default WorkspaceIdPage
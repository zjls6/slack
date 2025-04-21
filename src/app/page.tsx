"use client"

import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

export default function Home() {
    const [ open, setOpen ] = useCreateWorkspaceModal();

    const { data, isLoading } = useGetWorkspaces();

    const workspaceId = useMemo(() => data?.[0]?._id, [ data ])

    useEffect(() => {
        if (isLoading) return

        if (workspaceId) {
            console.log("重定向至工作区");
        } else if (!open) {
            // console.log("打开创建工作区的对话框");
            setOpen(true)
        }
    }, [ workspaceId, isLoading, open, setOpen ]);

    return (
        <div>
            <UserButton/>
        </div>
    )
}

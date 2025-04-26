import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button, ButtonDiv } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [ _open, setOpen ] = useCreateWorkspaceModal();

    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId })

    const filteredWorkspaces = workspaces?.filter(
        (workspace) => workspace?._id !== workspaceId
    )

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>{/*nest button do not allowed*/}
                    <ButtonDiv
                        className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
                        { workspaceLoading ? (
                            <Loader className="size-5 animate-spin shrink-0"/>
                        ) : (
                            workspace?.name.charAt(0).toUpperCase()
                        ) }
                    </ButtonDiv>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start" className="w-64">
                    <DropdownMenuItem onClick={ () => router.push(`/workspace/${ workspaceId }`) }
                                      className="cursor-pointer flex-col justify-start items-start capitalize">
                        { workspace?.name }
                        <span className="text-xs text-muted-foreground">当前工作区</span>
                    </DropdownMenuItem>
                    { filteredWorkspaces?.map((workspace) => (
                        <DropdownMenuItem key={ workspace._id } className="cursor-pointer capitalize overflow-hidden"
                                          onClick={ () => router.push(`/workspace/${ workspace._id }`) }>
                            <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                                { workspace.name.charAt(0).toUpperCase() }
                            </div>
                            <p className="truncate">{ workspace.name }</p>
                        </DropdownMenuItem>
                    )) }
                    <DropdownMenuItem className="cursor-pointer" onClick={ () => setOpen(true) }>
                        <div
                            className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                            <Plus/>
                        </div>
                        创建新工作区
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
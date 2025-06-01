import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Doc } from "../../../../convex/_generated/dataModel";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import { Hint } from "@/components/hint";
import { PreferencesModal } from "@/app/workspace/[workspaceId]/preferences-modal";
import { useState } from "react";
import { InviteModal } from "@/app/workspace/[workspaceId]/invite-modal";

interface WorkspaceHeaderProps {
    workspace: Doc<"workspaces">
    isAdmin: boolean
}

export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
    const [ inviteOpen, setInviteOpen ] = useState(false)
    const [ preferencesOpen, setPreferencesOpen ] = useState(false)

    return (
        <>
            <InviteModal open={ inviteOpen } setOpen={ setInviteOpen }
                         name={ workspace.name } joinCode={ workspace.joinCode }/>
            <PreferencesModal open={ preferencesOpen } setOpen={ setPreferencesOpen } initialValue={ workspace.name }/>
            <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="flex-1">
                        <Button variant={ "transparent" } className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
                                size={ "sm" }>
                            <span className="truncate">{ workspace.name }</span>
                            <ChevronDown className="size-4 ml-1 shrink-0"></ChevronDown>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side={ "bottom" } align={ "start" } className="w-64">
                        <DropdownMenuItem className="cursor-pointer capitalize mb-1">
                            <div
                                className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
                                { workspace.name.charAt(0).toUpperCase() }
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="font-bold">{ workspace.name }</p>
                                <p className="text-xs text-muted-foreground">当前工作区</p>
                            </div>
                        </DropdownMenuItem>
                        { isAdmin && (
                            <>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem className="cursor-pointer py-2" onClick={ () => {
                                    setInviteOpen(true)
                                } }>
                                    邀请用户至工作区 { workspace.name }
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem className="cursor-pointer py-2" onClick={ () => {
                                    setPreferencesOpen(true)
                                } }>
                                    偏好设置
                                </DropdownMenuItem>
                            </>
                        ) }
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-0.5">
                    <Hint label="筛选聊天" side={ "bottom" }>
                        <Button variant={ "transparent" } size={ "iconSm" }>
                            <ListFilter className="size-4"/>
                        </Button>
                    </Hint>
                    <Hint label="新消息" side={ "bottom" }>
                        <Button variant={ "transparent" } size={ "iconSm" }>
                            <SquarePen className="size-4"/>
                        </Button>
                    </Hint>
                </div>
            </div>
        </>
    )
}
"use client"

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const CreateWorkspaceModal = () => {
    const [ open, setOpen ] = useCreateWorkspaceModal();

    const handelClose = () => {
        setOpen(false);
        //TODO: 清除表单
    }

    return (
        <Dialog open={ open } onOpenChange={ handelClose }>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>创建工作区</DialogTitle>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}
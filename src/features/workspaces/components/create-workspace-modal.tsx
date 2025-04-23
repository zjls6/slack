"use client"

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CreateWorkspaceModal = () => {
    const [ open, setOpen ] = useCreateWorkspaceModal();

    const handelClose = () => {
        setOpen(false);
        //TODO: 清除表单
    }

    return (
        <Dialog open={ open } onOpenChange={ handelClose }>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>创建工作区</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input value="" disabled={ false } required autoFocus minLength={ 3 }
                           placeholder="新工作区的名称"></Input>
                </form>
                <div className="flex justify-end">
                    <Button disabled={false}>
                        创建
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
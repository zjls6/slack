"use client"

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { router } from "next/client";

export const CreateWorkspaceModal = () => {
    const [ open, setOpen ] = useCreateWorkspaceModal();

    const { mutate } = useCreateWorkspace()

    const handleClose = () => {
        setOpen(false);
        //TODO: 清除表单
    }

    const handleSubmit =async () => {
     const data = await   mutate({
            name: "Workspace 1",
        }, {
            onSuccess(data) {
            },
            onError(error) {

            }
        })
    }

    return (
        <Dialog open={ open } onOpenChange={ handleClose }>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>创建工作区</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input value="" onChange={ () => {
                    } } disabled={ false } required autoFocus minLength={ 3 }
                           placeholder="新工作区的名称(例如：工作，学习，家庭等）"></Input>
                </form>
                <div className="flex justify-end">
                    <Button disabled={ false }>
                        创建
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
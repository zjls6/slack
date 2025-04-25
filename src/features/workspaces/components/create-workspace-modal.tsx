"use client"

import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
    const router = useRouter();

    const [ open, setOpen ] = useCreateWorkspaceModal();

    const [ name, setName ] = useState("")

    const { mutate, isPending } = useCreateWorkspace()

    const handleClose = () => {
        setOpen(false);
        setName("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await mutate(
            { name },
            {
                onSuccess(id) {
                    console.log("创建工作区成功:", id);
                    toast.success("创建工作区成功")
                    router.push(`/workspace/${ id }`)
                    handleClose()
                },
                onError(error) {
                    console.error("创建工作区失败:", error);
                }
            }
        );
    };

    return (
        <Dialog open={ open } onOpenChange={ handleClose }>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>创建工作区</DialogTitle>
                </DialogHeader>
                <form onSubmit={ handleSubmit } className="space-y-4">
                    <Input value={ name } onChange={ (e) => setName(e.target.value) }
                           disabled={ isPending } required autoFocus minLength={ 2 }
                           placeholder="新工作区的名称(例如：工作，学习，家庭，个人等）"></Input>
                    <div className="flex justify-end">
                        <Button disabled={ isPending }>创建</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCreateChannel } from "@/features/channels/api/use-create-channel";

export const CreateChannelModal = () => {
    const router = useRouter();

    const [ open, setOpen ] = useCreateChannelModal();

    const [ name, setName ] = useState("")

    const { mutate, isPending } = useCreateChannel()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsedName = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setName(parsedName)
    }

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
                    <DialogTitle>新建频道</DialogTitle>
                </DialogHeader>
                <form onSubmit={ handleSubmit } className="space-y-4">
                    <Input value={ name } onChange={ handleChange }
                           disabled={ isPending } required autoFocus minLength={ 2 } maxLength={ 80 }
                           placeholder="新频道的名称（例如：规则，聊天等）仅小写字母，自动替换空格为-"></Input>
                    <div className="flex justify-end">
                        <Button disabled={ isPending }>创建</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
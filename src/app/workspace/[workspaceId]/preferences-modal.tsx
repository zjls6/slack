import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";

interface PreferencesModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialValue: string
}

export const PreferencesModal = ({ open, setOpen, initialValue }: PreferencesModalProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [ ConfirmDialog, confirm] = useConfirm(
        "你确定吗？",
        "该操作不可逆。"
    );

    const [ value, setValue ] = useState(initialValue)
    const [ editOpen, setEditOpen ] = useState(false)

    const { mutate: updateWorkSpace, isPending: isUpdatingWorkSpace } = useUpdateWorkspace();
    const { mutate: removeWorkSpace, isPending: isRemovingWorkSpace } = useRemoveWorkspace();

    const handleRemove = async () => {
        const ok = await confirm()
        if (!ok) return;

        removeWorkSpace({
            id: workspaceId
        }, {
            onSuccess: () => {
                router.replace("/")
                toast.success("删除工作区成功")
            },
            onError: () => {
                toast.error("删除工作区失败")
            }
        })
    }

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateWorkSpace({
            id: workspaceId,
            name: value
        }, {
            onSuccess: () => {
                toast.success("更新工作区成功")
                setEditOpen(false)
            },
            onError: () => {
                toast.error("更新工作区失败")
            }
        })
    }

    return (
        <>
            <ConfirmDialog/>
            <Dialog open={ open } onOpenChange={ setOpen }>
                <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                    <DialogHeader className="p-4 border-b bg-white">
                        <DialogTitle>
                            { value }
                        </DialogTitle>
                    </DialogHeader>
                    <div className="px-4 pb-4 flex flex-col gap-y-2">
                        <Dialog open={ editOpen } onOpenChange={ setEditOpen }>
                            <DialogTrigger asChild>
                                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold">
                                            工作区名称
                                        </p>
                                        <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                                            编辑
                                        </p>
                                    </div>
                                    <p className="text-sm">
                                        { value }
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>重命名工作区</DialogTitle>
                                </DialogHeader>
                                <form className="space-y-4" onSubmit={ handleEdit }>
                                    <Input value={ value } disabled={ isUpdatingWorkSpace }
                                           onChange={ (e) => setValue(e.target.value) }
                                           required autoFocus minLength={ 2 } maxLength={ 80 }
                                           placeholder="新工作区的名称（例如：工作，学习，家庭，个人等）"></Input>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant={ "outline" } disabled={ isUpdatingWorkSpace }>
                                                取消
                                            </Button>
                                        </DialogClose>
                                        <Button disabled={ isUpdatingWorkSpace }>保存</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <button disabled={ isRemovingWorkSpace } onClick={ handleRemove }
                                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600">
                            <TrashIcon className="size-4"/>
                            <p className="text-sm font-semibold">删除工作区</p>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
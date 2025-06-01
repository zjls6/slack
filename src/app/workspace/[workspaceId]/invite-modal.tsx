import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useConfirm } from "@/hooks/use-confirm";

interface InviteModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    name: string
    joinCode: string
}

export const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {
    const workspaceId = useWorkspaceId();
    const [ ConfirmDialog, confirm ] = useConfirm(
        "你确定吗？",
        <>
            <p>生成新的邀请码后，当前的邀请码将失效</p>
            <p>用户只能使用新的邀请码来加入工作区</p>
        </>
    );

    const { mutate, isPending } = useNewJoinCode();

    const handleNewCode = async () => {
        const ok = await confirm()
        if (!ok) return;

        mutate(
            { workspaceId },
            {
                onSuccess() {
                    toast.success("邀请码已更新")
                },
                onError(error) {
                    toast.error("更新邀请码失败");
                    console.error("更新邀请码失败:", error);
                }
            }
        );
    }

    const handleCopy = () => {
        const inviteLink = `${ window.location.origin }/join/${ workspaceId }`;

        navigator.clipboard.writeText(inviteLink).then(() => toast.success("邀请链接已复制到剪贴板"));
    }

    return (
        <>
            <ConfirmDialog/>
            <Dialog open={ open } onOpenChange={ setOpen }>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>邀请至该工作区 { name }</DialogTitle>
                        <DialogDescription>使用下面的代码来邀请用户到该工作区</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-4 items-center justify-center py-10">
                        <p className="text-4xl font-bold tracking-widest uppercase">
                            { joinCode }
                        </p>
                        <Button variant={ "ghost" } size={ "sm" } onClick={ handleCopy }>
                            复制链接
                            <CopyIcon className="size-4 ml-2"/>
                        </Button>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Button variant={ "outline" } disabled={ isPending } onClick={ handleNewCode }>
                            重置邀请码
                            <RefreshCcw className="size-4 ml-2"/>
                        </Button>
                        <DialogClose asChild>
                            <Button>关闭</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
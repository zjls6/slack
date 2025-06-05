"use client"

import Image from "next/image";
import VerificationInput from "react-verification-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { Loader } from "lucide-react";
import { useJoin } from "@/features/workspaces/api/use-join";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn, getErrorMessage } from "@/lib/utils";
import { useEffect, useMemo } from "react";

const JoinPage = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useJoin();
    const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

    const isMember = useMemo(() => data?.isMember, [ data?.isMember ])

    useEffect(() => {
        if (isMember) {
            toast.info("您已加入该工作区")
            router.push(`/workspace/${ workspaceId }`)
        }
    }, [ isMember, workspaceId, router ]);

    const handleComplete = (value: string) => {
        mutate({ workspaceId, joinCode: value },
            {
                onSuccess: (id) => {
                    router.replace(`/workspace/${ id }`)
                    toast.success("加入成功")
                },
                onError: (error) => {
                    toast.error(`加入失败：${ getErrorMessage(error) }`)
                    // console.log(getErrorMessage(error))
                }
            })
    }

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground"/>
            </div>
        )
    }

    if (isMember) {
        return (
            <div className="h-full flex items-center justify-center flex-col gap-y-4">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">您已加入该工作区</h1>
                    <p className="text-md text-muted-foreground">即将重定向到该工作区</p>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="h-full flex items-center justify-center flex-col gap-y-4">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">工作区不存在</h1>
                    <p className="text-md text-muted-foreground">请检查邀请链接是否正确</p>
                </div>
                <div className="flex gap-x-4">
                    <Button size={ "lg" } variant={ "outline" } asChild>
                        <Link href="/">返回主页</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
            <Image alt="Logo" src="/globe.svg" width={ 60 } height={ 60 }/>
            <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">加入工作区 { data?.name }</h1>
                    <p className="text-md text-muted-foreground">输入邀请码来加入工作区</p>
                </div>
                <VerificationInput length={ 6 } autoFocus onComplete={ handleComplete } classNames={ {
                    container: cn("verification-input-container", isPending && "opacity-50 cursor-not-allowed"),
                    character: "verification-input-character",
                    characterInactive: "verification-input-character-inactive",
                    characterSelected: "verification-input-character-selected",
                    characterFilled: "verification-input-character-filled",
                } }/>
            </div>
            <div className="flex gap-x-4">
                <Button size={ "lg" } variant={ "outline" } asChild>
                    <Link href="/">返回主页</Link>
                </Button>
            </div>
        </div>
    )
}

export default JoinPage;
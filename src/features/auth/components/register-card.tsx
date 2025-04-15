import {LoginType} from "@/features/auth/types";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import React, {useState} from "react";
import {TriangleAlert} from "lucide-react";
import {useAuthActions} from "@convex-dev/auth/react";

interface RegisterCardProps {
    setType: (state: LoginType) => void;
}

export const RegisterCard = ({setType}: RegisterCardProps) => {
    const {signIn} = useAuthActions();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [pending, setPending] = useState(false)

    const onPasswordRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords must match")
            return
        }

        setPending(true)

        signIn("password", {email, password, flow: "signUp"}).catch(() => {
            setError("密码过于简单")
        }).finally(() => {
            setPending(false)
        })
    }

    const onProviderRegister = (value: "github" | "google") => {
        setPending(true)
        signIn(value).finally(() => {
            setPending(false)
        })
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl">创建一个新的账号</CardTitle>
                <CardDescription>使用你的邮箱或其他服务</CardDescription>
            </CardHeader>
            {/*如果有错误*/}
            {!!error && (
                <div
                    className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-2">
                    <TriangleAlert className="size-4"/>
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordRegister} className="space-y-2.5">
                    <Input disabled={pending} value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} placeholder="邮箱" type={"email"} required/>
                    <Input disabled={pending} value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder="密码" type={"password"} required/>
                    <Input disabled={pending} value={confirmPassword} onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }} placeholder="确认密码" type={"password"} required/>
                    <Button type={"submit"} className="w-full" size="lg" disabled={pending}>注册</Button>
                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button disabled={pending} onClick={() => onProviderRegister("google")} variant="outline" size="lg"
                            className="w-full relative">
                        <FcGoogle className="size-5 absolute top-2.5 left-2.5"/>
                        使用 Google 账号注册
                    </Button>
                    <Button disabled={pending} onClick={() => onProviderRegister("github")} variant="outline" size="lg"
                            className="w-full relative">
                        <FaGithub className="size-5 absolute top-2.5 left-2.5"/>
                        使用 Github 账号注册
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">已经注册过了？
                    <span onClick={() => {
                        setType("login")
                    }} className="text-sky-700 hover:underline cursor-pointer">登录账号</span>
                </p>
            </CardContent>
        </Card>
    )
}
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {LoginType} from "@/features/auth/types";
import {useState} from "react";
import {useAuthActions} from "@convex-dev/auth/react";

interface LoginCardProps {
    setType: (state: LoginType) => void;
}

export const LoginCard = ({setType}: LoginCardProps) => {
    const {signIn} = useAuthActions();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleProviderLogin = (value: "github" | "google") => {
        signIn(value)
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl">登录以继续</CardTitle>
                <CardDescription>使用你的邮箱或其他服务</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input disabled={false} value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} placeholder="邮箱" type={"email"} required/>
                    <Input disabled={false} value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder="密码" type={"password"} required/>
                    <Button type={"submit"} className="w-full" size="lg" disabled={false}>登录</Button>
                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button disabled={false} onClick={() => {
                    }} variant="outline" size="lg" className="w-full relative">
                        <FcGoogle className="size-5 absolute top-2.5 left-2.5"/>
                        使用 Google 账号登录
                    </Button>
                    <Button disabled={false} onClick={() => handleProviderLogin("github")}
                            variant="outline" size="lg" className="w-full relative">
                        <FaGithub className="size-5 absolute top-2.5 left-2.5"/>
                        使用 Github 账号登录
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">还没有账户？
                    <span onClick={() => setType("register")}
                          className="text-sky-700 hover:underline cursor-pointer">创建一个账号</span>
                </p>
            </CardContent>
        </Card>
    )
}
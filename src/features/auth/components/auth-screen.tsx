"use client";

import {useState} from "react";
import {LoginType} from "@/features/auth/types";
import {LoginCard} from "@/features/auth/components/login-card";
import {RegisterCard} from "./register-card";

export const AuthScreen = () => {
    const [type, setType] = useState<LoginType>("login")

    return (
        <div className="h-full flex items-center justify-center bg-[#5c3b58]">
            <div className="md:h-auto md:w-[420px]">
                {type === "login" ? <LoginCard setType={setType}/> : <RegisterCard setType={setType}/>}
            </div>
        </div>
    )
}
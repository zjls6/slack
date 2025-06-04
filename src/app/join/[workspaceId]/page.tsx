"use client"

import Image from "next/image";
import VerificationInput from "react-verification-input";

const JoinPage = () => {
    return (
        <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">
            <Image alt="Logo" src="/globe.svg" width={ 60 } height={ 60 }/>
            <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    <h1 className="text-2xl font-bold">加入工作区</h1>
                    <p className="text-md text-muted-foreground">输入邀请码来加入工作区</p>
                </div>
                <VerificationInput length={6} autoFocus classNames={ {
                    container: "flex gap-x-2",
                    character: "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center font-medium text-gray-500 text-sm",
                    characterInactive: "bg-muted",
                    characterSelected: "bg-white text-black",
                    characterFilled: "bg-white text-black",
                } }/>
            </div>
        </div>
    )
}

export default JoinPage;
import React from "react";
import { Button } from "@/components/ui/button";
import { FaCaretDown } from "react-icons/fa";
import { Hint } from "@/components/hint";
import { PlusIcon } from "lucide-react";

interface WorkspaceSectionProps {
    children: React.ReactNode
    label: string
    hint: string
    onNew?: () => void
}

export const WorkspaceSection = ({ children, label, hint, onNew }: WorkspaceSectionProps) => {
    return (
        <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-3.5 group">
                <Button variant={ "transparent" } className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6">
                    <FaCaretDown className="size-4"/>
                </Button>
                <Button variant={ "transparent" } size={ "sm" }
                        className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center">
                    <span className="truncate">{ label }</span>
                </Button>
                { onNew && (
                    <Hint label={ hint } side={ "top" } align={ "center" }>
                        <Button variant={ "transparent" } size={ "iconSm" } onClick={ onNew }
                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0">
                            <PlusIcon className="size-5"/>
                        </Button>
                    </Hint>
                ) }
            </div>
            { children }
        </div>
    )
}
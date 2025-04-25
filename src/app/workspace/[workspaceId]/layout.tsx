"use client"

import { Toolbar } from "@/app/workspace/[workspaceId]/toolbar";

interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
}

const WorkspaceLayout = ({ children }: WorkspaceIdLayoutProps) => {
    return (
        <div className="h-full">
            <Toolbar />
            { children }

        </div>
    )
}
export default WorkspaceLayout;
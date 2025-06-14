import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userItemVariants = cva(
    "flex items-center justify-start gap-1.5 font-normal h-7 px-2 text-sm overflow-hidden",
    {
        variants: {
            variant: {
                default: "text-[#f9edffcc]",
                active: "text-[#481349] bg-white/90 hover:bg-white/90",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

interface UserItemProps {
    id: Id<"members">,
    label?: string,
    image?: string,
    variant?: VariantProps<typeof userItemVariants>["variant"],
}

export const UserItem = ({ id, label = "成员", image, variant }: UserItemProps) => {
    const workspaceId = useWorkspaceId();
    const avatarFallback=label.charAt(0).toUpperCase()
    console.log(variant);

    return (
        <Button variant={ "transparent" } size={ "sm" } asChild
                className={ cn(userItemVariants({ variant: variant })) }>
            <Link href={ `/workspace/${ workspaceId }/member/${ id }` }>
                <Avatar className="size-5 rounded-md mr-1">
                    <AvatarImage className="rounded-md" src={ image }/>
                    <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm truncate">{label}</span>
            </Link>
        </Button>
    )
}
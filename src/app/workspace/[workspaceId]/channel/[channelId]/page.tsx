import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";

const ChannelIdPage = () => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const [ open, setOpen ] = useCreateChannelModal();

    return (
        <div>Channel Id Page</div>
    )
}
export default ChannelIdPage
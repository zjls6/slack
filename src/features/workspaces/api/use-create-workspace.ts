import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces">;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
}

export const useCreateWorkspace = () => {
    const mutation = useMutation(api.workspaces.create);
    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {
            const response = await mutation(values);
            options?.onSuccess?.(response)
            return response
        } catch (error) {
            options?.onError?.(error as Error)

            if (options?.throwError){
                throw error
            }
        } finally {
            options?.onSettled?.()
        }
    }, [ mutation ]);

    return { mutate };
}
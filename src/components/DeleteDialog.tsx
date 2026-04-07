import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TravelPostService } from "@/features/travelPosts/travelPost.service";
import type { User } from "@/features/users/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";

type DeleteDialog = {
    id: string
}

export function DeleteDialog({ id }: DeleteDialog) {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<User>(['user']);

    const mutation = useMutation({
        mutationFn: async () => {
            return TravelPostService.delete(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline"><Trash2Icon /> Elimina</Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Eliminare il post definitivamente?</AlertDialogTitle>
                    <AlertDialogDescription>
                        L'azione è irreversibile
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

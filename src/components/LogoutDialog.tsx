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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/features/auth/auth.service";
import type { User } from "@/features/users/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOutIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";



export function LogoutDialog() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    /* const data = queryClient.getQueryData<User>(['user']); */

    const mutation = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            queryClient.clear();
            navigate('/posts')

            setOpen(false)
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            queryClient.clear();
            navigate('/posts')

            setOpen(false)
        }
    });

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger render={<Button variant="outline" className={'bg-transparent border-0'}><LogOutIcon /></Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Vuoi effettuare il logout?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Dovrai reimmattere le credenziali per effettuare l'accesso
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annulla</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutation.mutate()}>Continua</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

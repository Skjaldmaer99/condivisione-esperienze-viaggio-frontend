
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { AuthService } from "@/features/auth/auth.service"
import { http } from "@/lib/http"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router"

export const loginFormSchema = z.object({
    email: z.string().min(1).min(1).max(100),
    password: z.string().min(1).min(8).max(100),
});

export default function LoginForm({ onClose }: { onClose: () => void }) {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
    });

    const mutation = useMutation({
        mutationFn: AuthService.login,
        onSuccess: async (data) => {
            const user = data.user;
            const token = localStorage.getItem('authToken');
            /* per ora lo lascio perchè: all'accesso, compare il tasto modifica dei miei post/ filtro il feed per post non miei */
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            /* toast.success("Login avvenuto con successo"); */
            form.reset();
            onClose();

            // se l'utente non ha verificato la mail, finisco nella pagina di verifica
            if (!user.email_verified_at) {
                await http.post('/email/verification-notification', null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                window.location.href = '/verify-email';
            }
        },
        onError: () => {
            toast.error("Errore durante l'accesso");
        }
    })

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        mutation.mutate(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 -mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
            <Field>
                <FieldLabel>Email</FieldLabel>
                <Input placeholder="mario@rossi.it"
                    {...form.register("email")} />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input placeholder="********"
                    type="password"
                    {...form.register("password")} />
                <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Button type="submit">Accedi</Button>
            <p>Password dimenticata? <Link to={'/recupero-password'}>Recupera</Link></p>
        </form>
    )
}
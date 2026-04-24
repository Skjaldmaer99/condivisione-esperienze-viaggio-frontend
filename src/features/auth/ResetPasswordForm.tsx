
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useSearchParams } from "react-router"

export const resetPasswordFormSchema = z.object({
    password: z.string().min(1).min(8).max(100),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Le password non coincidono",
    path: ["password_confirmation"],
});;

type ResetPasswordPayload = {
    email: string | null;
    token: string | null;
    password: string;
    password_confirmation: string;
}

export default function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
    });

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data: ResetPasswordPayload) => AuthService.resetPassword(data),
        onSuccess: async () => {
            /* per ora lo lascio perchè: all'accesso, compare il tasto modifica dei miei post/ filtro il feed per post non miei */
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            toast.success("Password modificata con successo");
            form.reset();
            navigate('/success-password')
        },
        onError: () => {
            toast.error("Errore durante l'accesso");
        }
    })

    async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
        mutation.mutate({
            ...values,
            email,
            token
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 -mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input placeholder="********"
                    type="password"
                    {...form.register("password")} />
                <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Field>
                <FieldLabel>Conferma Password</FieldLabel>
                <Input placeholder="********"
                    type="password"
                    {...form.register("password_confirmation")} />
                <FieldError>{form.formState.errors.password_confirmation?.message}</FieldError>
            </Field>
            <Button type="submit">Salva</Button>
        </form>
    )
}
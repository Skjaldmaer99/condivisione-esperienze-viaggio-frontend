
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
import { useNavigate } from "react-router"

export const forgotPasswordFormSchema = z.object({
    email: z.string().min(1).min(1).max(100),
});

export default function ForgotPasswordForm() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
    });

    const mutation = useMutation({
        mutationFn: AuthService.forgotPassword,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
            form.reset();
            navigate('/redirect-password');
        },
        onError: () => {
            toast.error("Errore durante l'invio del form");
        }
    })

    async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
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
            <Button type="submit">Invia</Button>
        </form>
    )
}
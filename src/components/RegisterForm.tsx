
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel
} from "@/components/ui/field"
import { Checkbox } from "./ui/checkbox"

import { AuthService } from "@/features/auth/auth.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const registerFormSchema = z.object({
    name: z.string().min(1).min(1).max(100),
    email: z.string().min(1).min(1).max(100),
    password: z.string().min(1).min(8).max(100),
    password_confirmation: z.string().min(1).min(8).max(100),
    /* img: z.string().min(1).max(100).optional(), */
    img: z.any().optional(), // 👈 FILE
    /* termAndConditions: z.boolean().default(false) */
    termAndConditions: z.boolean().refine(val => val === true, {
        message: "Devi accettare i termini e le condizioni",
    })
});

export default function RegisterForm({ onClose }: { onClose: () => void }) {
    const [preview, setPreview] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            termAndConditions: false,
        }
    });

    const mutation = useMutation({
        mutationFn: AuthService.register,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            })
            toast.success("Registrazione avvenuta con successo");
            form.reset();
            setPreview(null);
            onClose();
        },
        onError: () => {
            toast.error("Errore durante la registrazione");
        }
    })

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        mutation.mutate(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-3xl mx-auto py-10">
            <Field>
                <FieldLabel>Nome</FieldLabel>
                <Input placeholder="Mario Rossi"
                    {...form.register("name")} />
                <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

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

            <Field>
                <FieldLabel>Conferma password</FieldLabel>
                <Input placeholder="********"
                    type="password"
                    {...form.register("password_confirmation")} />
                <FieldError>{form.formState.errors.password_confirmation?.message}</FieldError>
            </Field>

            {/* IMAGE UPLOAD CORRETTO */}
            <Field>
                <FieldLabel>Immagine del profilo</FieldLabel>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            form.setValue("img", file); // 👈 fondamentale
                            setPreview(URL.createObjectURL(file));
                        }
                    }}
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-full"
                    />
                )}
                <FieldDescription>Carica una immagine profilo</FieldDescription>
                <FieldError>{form.formState.errors.img?.message as string}</FieldError>
            </Field>

            <Field className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <Checkbox
                    id="termAndConditions"
                    className={'w-4!'}
                    checked={form.watch("termAndConditions")}
                    onCheckedChange={(val) => form.setValue("termAndConditions", Boolean(val))}
                />
                <div className="space-y-1 leading-none">
                    <FieldLabel htmlFor="termAndConditions">Termini e condizioni</FieldLabel>
                    <FieldDescription>Attivando la checkbox accetti i termini e le condizioni</FieldDescription>
                    <FieldError>{form.formState.errors.termAndConditions?.message}</FieldError>
                </div>
            </Field>

            <Button type="submit">Registrati</Button>
        </form>
    )
}
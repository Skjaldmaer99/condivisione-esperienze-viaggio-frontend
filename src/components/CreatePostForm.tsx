
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { TravelPostService } from "@/features/travelPosts/travelPost.service"
import { Textarea } from "./ui/textarea"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const createPostFormSchema = z.object({
    title: z.string().min(1).min(1).max(100),
    location: z.string().min(1).min(1).max(100),
    country: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    img: z.any().optional(), // 👈 FILE
});

export default function CreatePostForm({ onClose }: { onClose: () => void }) {
    const [preview, setPreview] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: TravelPostService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            })
            toast.success("Creazione post avvenuta con successo");
            form.reset();
            setPreview(null);
            onClose();
        },
        onError: () => {
            toast.error("Errore nella creazione del post")
        }
    });

    const form = useForm<z.infer<typeof createPostFormSchema>>({
        resolver: zodResolver(createPostFormSchema),
    });

    async function onSubmit(values: z.infer<typeof createPostFormSchema>) {
        mutation.mutate(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-3xl mx-auto py-10">

            <Field>
                <FieldLabel>Titolo</FieldLabel>
                <Input placeholder="Inserisci il titolo"
                    {...form.register("title")} />
                <FieldError>{form.formState.errors.title?.message}</FieldError>
            </Field>

            <Field>
                <FieldLabel>Città</FieldLabel>
                <Input placeholder="Inserisci la città"
                    {...form.register("location")} />
                <FieldError>{form.formState.errors.location?.message}</FieldError>
            </Field>

            <Field>
                <FieldLabel>Nazione</FieldLabel>
                <Input placeholder="Inserisci la nazione"
                    {...form.register("country")} />
                <FieldError>{form.formState.errors.country?.message}</FieldError>
            </Field>

            <Field>
                <FieldLabel>Descrizione</FieldLabel>
                <Textarea placeholder="Inserisci la descrizione"
                    {...form.register("description")} />
                <FieldError>{form.formState.errors.description?.message}</FieldError>
            </Field>

            {/* IMAGE UPLOAD CORRETTO */}
            <Field>
                <FieldLabel>Immagine del post</FieldLabel>
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
                <FieldDescription>Sfoglia dalla galleria</FieldDescription>
                <FieldError>{form.formState.errors.img?.message as string}</FieldError>
            </Field>

            <Button type="submit">Crea nuovo post</Button>
        </form>
    )
}
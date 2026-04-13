
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Textarea } from "@/components/ui/textarea"

export const updatePostFormSchema = z.object({
    title: z.string().trim().max(100),
    location: z.string().trim().max(100),
    country: z.string().trim().max(100),
    description: z.string().trim().max(500),
    img: z.any().optional(), // 👈 FILE
});

export default function UpdatePostForm({ id, onClose }: { id: string, onClose: () => void }) {
    const [preview, setPreview] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ values, id }: { values: z.infer<typeof updatePostFormSchema>, id: string }) =>
            TravelPostService.update(values, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            })
            toast.success("Modifica post avvenuta con successo");
            form.reset();
            setPreview(null);
            onClose();
        },
        onError: () => {
            toast.error("Errore nella modifica del post")
        }
    });

    const form = useForm<z.infer<typeof updatePostFormSchema>>({
        resolver: zodResolver(updatePostFormSchema),
    });

    async function onSubmit(values: z.infer<typeof updatePostFormSchema>) {
        if (!id) return;
        mutation.mutate({ values, id });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 -mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4"> {/* space-y-2 max-w-3xl mx-auto py-5 */}

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

            <Button type="submit">Modifica post</Button>
        </form>
    )
}

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
import { CommentService } from "@/features/comments/comment.service"
import { SendIcon } from "lucide-react"

export const commentFormSchema = z.object({
    comment: z.string().min(1).max(500),
});

export default function CommentForm({ postId }: { postId: number }) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof commentFormSchema>) =>
            CommentService.create(postId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            });
            toast.success("Commento inviato con successo");
            form.reset();
        },
        onError: () => {
            toast.error("Errore nell'invio del commento");
        }
    });

    const form = useForm<z.infer<typeof commentFormSchema>>({
        resolver: zodResolver(commentFormSchema),
    });

    async function onSubmit(values: z.infer<typeof commentFormSchema>) {
        mutation.mutate(values);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
            <Field>
                {/* <FieldLabel>Descrizione</FieldLabel> */}
                <Textarea placeholder="Inserisci un commento"
                    {...form.register("comment")} />
                <FieldError>{form.formState.errors.comment?.message}</FieldError>
            </Field>

            <Button type="submit" variant={'default'}><SendIcon className="size-5" /></Button>
        </form>
    )
}
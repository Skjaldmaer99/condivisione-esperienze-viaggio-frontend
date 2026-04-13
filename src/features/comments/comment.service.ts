import type { commentFormSchema } from "@/features/comments/CommentForm";
import { http } from "@/lib/http";
import type z from "zod";

export class CommentService {
    static async create(postId: number, data: z.infer<typeof commentFormSchema>) {
        const token = localStorage.getItem('authToken');

        const res = await http.post(`/posts/${postId}/comments`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res;
    }

}





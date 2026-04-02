import { http } from "@/lib/http";
import type { Comment } from "./comment.type";
import type { commentFormSchema } from "@/components/CommentForm";
import type z from "zod";

export class CommentService {
    /*     static async list(): Promise<Comment[]> {
            const res = await http
        } */
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





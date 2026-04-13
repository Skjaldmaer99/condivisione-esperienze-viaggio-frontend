import type { createPostFormSchema } from "@/features/travelPosts/CreatePostForm";
import { http } from "@/lib/http";
import axios from 'axios';
import type z from "zod";
import type { TravelPost } from "./travelPost.type";
import type { updatePostFormSchema } from "./UpdatePostForm";

const api = axios.create({
    baseURL: 'http://condivisione-esperienze-viaggio.test/api'
});

export type SearchParams = {
    search?: string;
    page?: number;
};

export class TravelPostService {
    static async list({ search = '', page = 1 }: SearchParams): Promise<TravelPost[]> {
        const params = new URLSearchParams();

        if (search) params.append('search', search);
        params.append('page', page.toString());

        try {
            const res = await api.get(`/posts?${params.toString()}`);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Errore generico');
        }
    }

    static async show(id: string): Promise<TravelPost> {
        try {
            const res = await api.get(`/posts/${+id}`);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Errore generico');
        }
    }

    static async topLiked(): Promise<TravelPost[]> {
        try {
            const res = await api.get(`/posts/top-liked`);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Errore generico');
        }
    }

    static async topBookmarked(): Promise<TravelPost[]> {
        try {
            const res = await api.get(`/posts/top-bookmarked`);
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Errore generico');
        }
    }

    static async create(data: z.infer<typeof createPostFormSchema>) {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("location", data.location);
        formData.append("country", data.country);
        formData.append("description", data.description);

        if (data.img) {
            formData.append("img", data.img);
        }

        // Recupera token da AuthService
        const token = localStorage.getItem('authToken');

        return http.post('/posts', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    static async update(data: z.infer<typeof updatePostFormSchema>, id: string) {
        const formData = new FormData();
        formData.append('_method', 'PUT');

        if (data.title) formData.append("title", data.title);
        if (data.location) formData.append("location", data.location);
        if (data.country) formData.append("country", data.country);
        if (data.description) formData.append("description", data.description);

        if (data.img) {
            formData.append("img", data.img);
        }

        const token = localStorage.getItem('authToken');

        return http.post(`/posts/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    static async delete(id: string) {
        const token = localStorage.getItem('authToken');
        try {
            const res = http.delete(`/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const post = (await res).data;
            if (!post.success) {
                throw new Error(post.message);
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Errore generico");
        }
    }
}

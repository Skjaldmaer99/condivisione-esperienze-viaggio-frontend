import myEnv from "@/lib/env";
import type { TravelPost } from "./travelPost.type";
import axios from 'axios';
import type z from "zod";
import type { createPostFormSchema } from "@/components/CreatePostForm";
import { http } from "@/lib/http";

const api = axios.create({
    baseURL: 'http://condivisione-esperienze-viaggio.test/api'
});

export class TravelPostService {


    static async list(): Promise<TravelPost[]> {
        try {
            const res = await api.get(`/posts`);
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
} 
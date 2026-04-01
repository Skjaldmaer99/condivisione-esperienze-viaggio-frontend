import myEnv from "@/lib/env";
import type { TravelPost } from "./travelPost.type";
import axios from 'axios';

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

    /*  static async list(): Promise<TravelPost[]> {
         try {
             const res = await fetch(`${myEnv.backendApiUrl}/posts`);
             const posts = await res.json();
             if (!posts.success) {
                 throw new Error(posts.message);
             }
             return posts.data;
         } catch (error) {
             throw new Error(error instanceof Error ? error.message : 'Errore generico');
         }
     } */
} 
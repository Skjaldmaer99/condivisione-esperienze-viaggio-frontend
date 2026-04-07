import { http } from "@/lib/http";
import type { TravelPost } from "../travelPosts/travelPost.type";

export class BookmarkService {
    static async list(): Promise<TravelPost[]> {
        try {
            const res = await http.get('/posts/bookmarks');
            return res.data.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Errore generico');
        }
    }

    static async toggle(postId: number) {
        const res = http.post(`/posts/${postId}/bookmarks/toggle`)

        return res;
    }
}
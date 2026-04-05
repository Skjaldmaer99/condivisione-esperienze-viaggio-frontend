import { http } from "@/lib/http";
import type z from "zod";

export class LikeService {
    /*     static async create(postId: number) {
            const res = await http.post(`/posts/${postId}/likes`)
    
            return res;
        } */

    /*     static async delete(postId: number, likeId: number) {
            const res = http.delete(`/posts/${postId}/likes/${likeId}`)
    
            return res;
        } */

    static async toggle(postId: number) {
        const res = http.post(`/posts/${postId}/likes/toggle`)

        return res;
    }
}
import { http } from "@/lib/http";

export class LikeService {

    static async toggle(postId: number) {
        const res = http.post(`/posts/${postId}/likes/toggle`)

        return res;
    }
}
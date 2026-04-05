import type { Comment } from "../comments/comment.type"
import type { TravelPost } from "../travelPosts/travelPost.type"

export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    /* comments: Comment[],
    posts: TravelPost[], */
    img: string | null,
}
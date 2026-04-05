import type { Comment } from "../comments/comment.type"
import type { Like } from "../likes/like.type";
import type { User } from "../users/user.type"

export type TravelPost = {
    id: number,
    title: string,
    location: string,
    country: string,
    description: string,
    img: string | null,
    user_id: number,
    user: User,
    comments: Comment[],
    likes: Like[];
}
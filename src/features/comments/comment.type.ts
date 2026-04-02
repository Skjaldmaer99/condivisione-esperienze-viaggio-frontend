import type { User } from "../users/user.type"

export type Comment = {
    id: number,
    user_id: number,
    travel_post_id: number,
    comment: string,
    user: User
}
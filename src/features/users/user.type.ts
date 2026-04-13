import type { TravelPost } from "../travelPosts/travelPost.type"

export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    /* comments: Comment[], */
    travelPosts: TravelPost[],
    img: string | null,
}
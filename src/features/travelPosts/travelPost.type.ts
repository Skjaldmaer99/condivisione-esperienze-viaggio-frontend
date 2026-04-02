import type { User } from "../users/user.type"

export type TravelPost = {
    id: number,
    title: string,
    location: string,
    country: string,
    description: string,
    img: string | null,
    user_id: number,
    user: User
}
import { TravelPostService } from "@/features/travelPosts/travelPost.service";
import type { User } from "@/features/users/user.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

const ProfilePage = () => {
    const queryClient = useQueryClient();

    const user = queryClient.getQueryData<User>(['user']);
    //const posts = queryClient.getQueryData<TravelPost>(['posts']);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => TravelPostService.list({})
    });

    const posts = data?.filter(post => post.user_id === user?.id) || [];

    return (
        <div className="h-screen mx-auto max-w-md bg-gray-100 p-3 pt-20">
            <div className="flex gap-5">
                <div className="w-15 h-15 overflow-hidden rounded-full">
                    <img src={user?.img || "https://placehold.co/40x40/000000/FFFFFF/png?text=FE"} alt="Profile image" className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="font-bold text-xl">{user?.name}</p>
                    <p className="">{user?.email}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1 justify-between">
                {/* {data?.posts?.map((post) => {
                    return (<Link to="#">
                        <img src={post.img || 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image'} alt={post.title} />
                    </Link>)
                }
                )} */}
                {posts?.map((post) => {
                    return (
                        <div className="w-full h-[200px] overflow-hidden mt-5">
                            <Link to="#">
                                <img src={post.img || 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image'}
                                    alt={post.title}
                                    className="w-full h-full object-cover" />
                            </Link>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default ProfilePage

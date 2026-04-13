import { TravelPostService } from "@/features/travelPosts/travelPost.service";
import { UserService } from "@/features/users/user.service";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const DashboardPage = () => {
    const { data: topLiked } = useQuery({
        queryKey: ['top-liked'],
        queryFn: TravelPostService.topLiked
    })
    const { data: topBookmarked } = useQuery({
        queryKey: ['top-bookmarked'],
        queryFn: TravelPostService.topBookmarked
    })
    const { data: topUsers } = useQuery({
        queryKey: ['top-users'],
        queryFn: UserService.topUsers
    })

    return (
        <div className="mx-auto h-full min-h-screen max-w-md py-20 bg-gray-100">
            <h1 className="text-xl font-bold px-3">Post più popolari</h1> {/* con più likes */}
            <div className="grid grid-cols-3 gap-1 justify-between">
                {topLiked?.map((post) => {
                    return (
                        <div key={post.id} className="w-full h-[200px] overflow-hidden mt-5">
                            <Link to={`/posts/${post.id}`}>
                                <img src={post.img || 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image'}
                                    alt={post.title}
                                    className="w-full h-full object-cover" />
                            </Link>
                        </div>
                    )
                }
                )}
            </div>

            <h1 className="text-xl font-bold px-3 mt-10">Utenti più attivi</h1>
            <div className="grid grid-cols-4 gap-1 justify-between mt-5">
                {topUsers?.map((user) => {
                    return (
                        <div key={user.id} className="w-20 h-20 rounded-full overflow-hidden m-auto">
                            <Link to={`/users/${user.id}`}>
                                <img src={user.img || 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image'}
                                    alt={`immagine profilo ${user.name}`}
                                    className="w-full h-full object-cover" />
                            </Link>
                        </div>
                    )
                }
                )}
            </div>

            <h1 className="text-xl font-bold px-3 mt-10">Salvati dagli utenti</h1>
            <div className="grid grid-cols-3 gap-1 justify-between">
                {topBookmarked?.map((post) => {
                    return (
                        <div key={post.id} className="w-full h-[200px] overflow-hidden mt-5">
                            <Link to={`/posts/${post.id}`}>
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

export default DashboardPage

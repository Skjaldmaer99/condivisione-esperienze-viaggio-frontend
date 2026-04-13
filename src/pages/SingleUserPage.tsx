import { UserService } from "@/features/users/user.service";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import { useSwipeable } from 'react-swipeable';

const SingleUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: user } = useQuery({
        queryKey: ['singleuser', id],
        queryFn: () => UserService.show(id!),
    })

    // ho fatto npm install react-swipeable per tornare indietro con la gesture invece che con il bottone
    const handlers = useSwipeable({
        onSwipedRight: () => navigate(-1), // 👉 swipe da sinistra a destra
        preventScrollOnSwipe: true,
        trackMouse: true, // utile anche su desktop
    });

    return (
        <div {...handlers} className="h-full min-h-screen mx-auto max-w-md bg-gray-100 p-3 py-20">
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
                {user?.travelPosts?.map((post) => {
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

export default SingleUserPage

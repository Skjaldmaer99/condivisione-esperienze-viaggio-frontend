
import Post from '@/components/post';
import { TravelPostService } from '@/features/travelPosts/travelPost.service';
import { useQuery } from '@tanstack/react-query';



const PostsPage = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => TravelPostService.list()
    });


    return (
        <div className="mx-auto max-w-md pt-20 bg-gray-100">
            {data?.map(((post, index) => {
                return <Post key={index + 1}
                    id={post.id}
                    title={post.title}
                    location={post.location}
                    country={post.country}
                    description={post.description}
                    user_id={post.user_id}
                    user={post.user}
                    img={post.img}
                    comments={post.comments}
                    /* isLiked={post.isLiked} */
                    likes={post.likes}
                />
            }))}
        </div>
    )
}

export default PostsPage

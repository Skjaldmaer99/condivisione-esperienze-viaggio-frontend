import Post from '@/components/post';
import { TravelPostService } from '@/features/travelPosts/travelPost.service';
import { useQuery } from '@tanstack/react-query';



const PostsPage = () => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => TravelPostService.list()
    });

    console.log(data);
    return (
        <div className="mx-auto mt-20">
            {data?.map(((post) => {
                return <Post key={post.id}
                    id={post.id}
                    title={post.title}
                    location={post.location}
                    country={post.country}
                    description={post.description}
                    user_id={post.user_id} />
            }))}
        </div>
    )
}

export default PostsPage

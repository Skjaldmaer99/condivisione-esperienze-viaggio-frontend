import Post from "@/components/Post";
import { BookmarkService } from "@/features/bookmarks/bookmark.service";
import { useQuery, useQueryClient } from "@tanstack/react-query"

const SavedPage = () => {
    const queryClient = useQueryClient();
    //const data = queryClient.getQueryData(['posts'])

    const { data, isLoading, isError } = useQuery({
        queryKey: ['bookmarks'],
        queryFn: BookmarkService.list,
    })
    console.log(data)

    return (
        <div className="h-full min-h-screen mx-auto max-w-md py-20 bg-gray-100">
            {data?.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </div>
    )
}

export default SavedPage

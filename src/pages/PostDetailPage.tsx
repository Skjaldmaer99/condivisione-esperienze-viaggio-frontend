import CommentForm from '@/features/comments/CommentForm';
import { LikeService } from "@/features/likes/like.service";
import { TravelPostService } from '@/features/travelPosts/travelPost.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BookmarkIcon, HeartIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { BookmarkService } from "@/features/bookmarks/bookmark.service";
import { PostActionsPopover } from '@/features/travelPosts/PostPopover';
import type { User } from '@/features/users/user.type';
import { useSwipeable } from 'react-swipeable';

const PostDetailPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();

    const user = queryClient.getQueryData<User>(['user']);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['post', id],   // chiave unica per questo post
        queryFn: () => TravelPostService.show(id!),
        enabled: !!id             // esegue solo se id esiste
    });

    const handlers = useSwipeable({
        onSwipedRight: () => navigate(-1), // 👉 swipe da sinistra a destra
        preventScrollOnSwipe: true,
        trackMouse: true, // utile anche su desktop
    });

    console.log(data)

    const mutation = useMutation({
        mutationFn: async () => {
            return LikeService.toggle(data!.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['post'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
        }
    });
    const mutation2 = useMutation({
        mutationFn: async () => {
            return BookmarkService.toggle(data!.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['post'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
        }
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Errore nel caricamento del post</p>;

    return (
        <div {...handlers} className="mx-auto h-full min-h-screen max-w-md bg-gray-100">
            <img src={data?.img || 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image'}
                alt="Immagine di dettaglio del post"
            />
            <div className='px-2 py-4'>
                <div className='flex justify-between'>
                    <h1 className='font-bold text-2xl'>{data?.title}</h1>
                    <div className='flex gap-3'>
                        <div className="flex gap-1">
                            <Button variant={'outline'}
                                className="border-0 p-0 bg-transparent"
                                onClick={() => mutation.mutate()}
                            >
                                {data?.likes && data?.likes.find((like) =>
                                    like.travel_post_id === data?.id &&
                                    like.user_id === user?.id)
                                    ? <HeartIcon className="size-5 fill-black" />
                                    : <HeartIcon className="size-5 fill-none" />
                                }
                            </Button>
                            <p className="pt-2">{data?.likes?.length}</p>
                        </div>
                        <Button variant={'outline'}
                            className="border-0 p-0 bg-transparent"
                            onClick={() => mutation2.mutate()}
                        >
                            {data?.bookmarks && data?.bookmarks.find((like) =>
                                like.travel_post_id === data?.id &&
                                like.user_id === user?.id)
                                ? <BookmarkIcon className="size-5 fill-black" />
                                : <BookmarkIcon className="size-5 fill-none" />
                            }
                        </Button>
                        {data.user_id === user?.id && <div className="flex justify-end pt-1">
                            <PostActionsPopover
                                postId={data.id.toString()}
                                onDelete={(id) => console.log("Elimina post", id)}
                            />
                        </div>}
                    </div>
                </div>
                <p>{data?.description}</p>
            </div>
            <div className='px-2 w-full max-w-md fixed bottom-0 pb-4'>
                <h2 className='py-3 font-bold text-xl pt-4'>Commenti</h2>
                {data?.comments.map((comment, index) => (
                    <div key={index} className="flex gap-3 pb-2 border-b border-black/10" >
                        <div className="w-[40px] h-[40px]">
                            <img
                                src={comment.user.img || "https://placehold.co/40x40/000000/FFFFFF/png?text=FE"}
                                alt="foto profiloavatar"
                                className="rounded-full"
                                height="30"
                                style={{
                                    aspectRatio: "30/30",
                                    objectFit: "cover",
                                }}
                                width="30"
                            />
                        </div>
                        <div className="w-full">
                            <div className="font-bold">{comment.user.name}</div>
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                ))}
                <div className='pt-4'><CommentForm postId={data!.id} /></div>
            </div>
        </div>
    )
}

export default PostDetailPage

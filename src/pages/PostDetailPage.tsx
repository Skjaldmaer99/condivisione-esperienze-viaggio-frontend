import CommentForm from '@/components/CommentForm';
import { type TravelPost } from '@/features/travelPosts/travelPost.type';
import { Button } from '@base-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeftIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

const PostDetailPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const queryClient = useQueryClient();
    const posts = queryClient.getQueryData<TravelPost[]>(['posts']);
    const post = posts?.find(post => post.id === Number(id));

    return (
        <div className="mx-auto h-screen max-w-md bg-gray-100">
            <div className='relative'>
                <Button onClick={() => navigate(-1)}
                    className='absolute top-2 left-2 rounded-full bg-white/50 p-1'
                >
                    <ChevronLeftIcon />
                </Button>
                <img src={post?.img || 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image'}
                    alt="Immagine di dettaglio del post"
                />
            </div>

            <div className='px-2 py-4'>
                <h1 className='font-bold text-2xl'>{post?.title}</h1>
                {post?.description}
            </div>
            <div className='px-2'>
                <h2 className='py-3 font-bold text-xl pt-4'>Commenti</h2>
                {post?.comments.map((comment, index) => (
                    <div key={index} className="flex gap-3 pb-2 border-b border-black/10" >
                        <div className="w-[40px]">
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
                <div className='pt-4'><CommentForm postId={post!.id} /></div>
            </div>
        </div>
    )
}

export default PostDetailPage

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card-2";
import { LikeService } from "@/features/likes/like.service";
import type { TravelPost } from "@/features/travelPosts/travelPost.type";
import type { User } from "@/features/users/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import { Link } from "react-router";
import { CommentDrawer } from "./CommentDrawer";
import { Button } from "./ui/button";

import { PostActionsPopover } from "./PostPopover";
import { BookmarkService } from "@/features/bookmarks/bookmark.service";

export default function Post(props: TravelPost) {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData<User>(['user']);

    const mutation = useMutation({
        mutationFn: async () => {
            return LikeService.toggle(props.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
        }
    });
    const mutation2 = useMutation({
        mutationFn: async () => {
            return BookmarkService.toggle(props.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
        }
    });

    return (
        <div className="w-full max-w-sm mx-auto p-4">
            <Card>
                <CardHeader>
                    <div className="w-full flex justify-between">
                        <div className="flex items-start space-x-4">
                            <img
                                alt="Avatar"
                                className="rounded-full"
                                height="40"
                                src={props.user?.img || "https://placehold.co/40x40/000000/FFFFFF/png?text=FE"}
                                style={{
                                    aspectRatio: "40/40",
                                    objectFit: "cover",
                                }}
                                width="40"
                            />
                            <div className="flex-1">
                                <CardTitle>{props.title}</CardTitle>
                                <CardDescription>{props.location} - {props.country}</CardDescription>
                            </div>
                        </div>
                        {props.user_id === data?.id && <div className="flex justify-end">
                            <PostActionsPopover
                                postId={props.id.toString()}
                                onDelete={(id) => console.log("Elimina post", id)}
                            />
                        </div>}
                    </div>
                </CardHeader>
                <CardContent>
                    <Link to={`/posts/${props.id}`}>
                        <img
                            alt="Card content"
                            className="w-full h-auto"
                            src={props.img || 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image'}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // prevent infinite loop
                                target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image';
                            }}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                        />
                    </Link>
                    <div className="p-4 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <div className="flex gap-1">
                                    <Button variant={'outline'}
                                        className="border-0 p-0 bg-transparent"
                                        onClick={() => mutation.mutate()}
                                    >
                                        {props.likes ? data && props.likes.find((like) =>
                                            like.travel_post_id === props.id &&
                                            like.user_id === data.id)
                                            ? <HeartIcon className="size-5 fill-black" />
                                            : <HeartIcon className="size-5 fill-none" />
                                            : []
                                        }
                                    </Button>
                                    <p className="my-auto">{props.likes?.length}</p>
                                </div>
                                <CommentDrawer comments={props.comments} postId={props.id} />
                            </div>
                            <Button variant={'outline'}
                                className="border-0 p-0 bg-transparent"
                                onClick={() => mutation2.mutate()}
                            >
                                {props.bookmarks ? data && props.bookmarks.find((like) =>
                                    like.travel_post_id === props.id &&
                                    like.user_id === data.id)
                                    ? <BookmarkIcon className="size-5 fill-black" />
                                    : <BookmarkIcon className="size-5 fill-none" />
                                    : []
                                }
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <CardDescription className="mt-auto">
                                <p><span className="font-bold">{props.user?.name}</span> {props.description}</p>
                            </CardDescription>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

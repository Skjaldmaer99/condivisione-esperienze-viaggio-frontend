import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card-2";
import type { TravelPost } from "@/features/travelPosts/travelPost.type";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { CommentDrawer } from "./CommentDrawer";
import { Button } from "./ui/button";

export default function Post(props: TravelPost) {

    return (
        <div className="w-full max-w-sm mx-auto p-4">
            <Card>
                <CardHeader>
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
                            <CardDescription>{props.location}</CardDescription>
                            <CardDescription>{props.country}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <img
                        alt="Card content"
                        className="w-full h-auto"
                        src={props.img || 'https://placehold.co/600x400/cccccc/ffffff?text=Error+Loading+Image'}
                        /* src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&auto=format&fit=crop" */
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
                    <div className="p-4 flex flex-col gap-2">
                        <div className="flex gap-3">
                            <Button variant={'outline'} className="border-0 p-0"><HeartIcon className="size-5" /></Button>
                            <CommentDrawer comments={props.comments} postId={props.id} />
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">{props.user.name}</p>
                            <CardDescription className="mt-auto">
                                <p>{props.description}</p>
                            </CardDescription>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

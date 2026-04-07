import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger
} from "@/components/ui/drawer";
import type { Comment } from "@/features/comments/comment.type";
import { MessageCircleIcon, XIcon } from "lucide-react";
import CommentForm from "./CommentForm";

//type CommentDrawerProps = Pick<TravelPost, "comments" | "id" | "user">;

type CommentDrawerProps = {
    comments: Comment[];
    postId: number;
};

export function CommentDrawer({ comments, postId }: CommentDrawerProps) {
    /* const queryClient = useQueryClient(['posts']); */

    return (
        <Drawer direction="bottom">
            <DrawerTrigger asChild>
                <Button variant={'outline'} className="bg-transparent border-0 p-0"><MessageCircleIcon className="size-5" /></Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    {/* close drawer */}
                    <DrawerClose asChild>
                        <Button variant="outline" className={'border-0 ms-auto'}><XIcon className="size-5" /></Button>
                    </DrawerClose>

                </DrawerHeader>
                <div className="no-scrollbar overflow-y-auto px-4">
                    {comments
                        ? comments.map((comment, index) => (

                            <div key={index} className="flex gap-3 py-2 border-b-1 border-black/10" >
                                <div className="w-[40px]">
                                    <img
                                        src={comment.user.img || "https://placehold.co/40x40/000000/FFFFFF/png?text=FE"}
                                        alt="foto profiloavatar"
                                        className="rounded-full w-full h-full object-cover"
                                        style={{
                                            aspectRatio: "30/30",
                                            objectFit: "cover",
                                        }}
                                    />
                                    {/* <img
                                        src={comment.user.img || "https://placehold.co/40x40/000000/FFFFFF/png?text=FE"}
                                        alt="foto profiloavatar"
                                        className="rounded-full"
                                        height="30"
                                        style={{
                                            aspectRatio: "30/30",
                                            objectFit: "cover",
                                        }}
                                        width="30"
                                    /> */}
                                </div>
                                <div className="w-full">
                                    <div className="font-bold">{comment.user.name}</div>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))
                        : <DrawerDescription className="text-center">Sii il primo a commentare</DrawerDescription>
                    }
                </div>
                <DrawerFooter>
                    <CommentForm postId={postId} />

                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    )
}

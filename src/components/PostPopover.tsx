"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import UpdatePostForm from "./UpdatePostForm"
import { FormDialog } from "./FormDialog"
import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DeleteDialog } from "./DeleteDialog"

type PostActionsPopoverProps = {
    postId: string
    onDelete?: (id: string) => void
}

export function PostActionsPopover({ postId, onDelete }: PostActionsPopoverProps) {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    return <>
        <Popover>
            <PopoverTrigger>
                <Button variant="outline" size="default" className="p-0 pb-2 border-0 bg-transparent hover:bg-transparent">
                    <EllipsisVerticalIcon />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="flex flex-col p-2 gap-1 min-w-[150px]">
                <FormDialog
                    button={<Button
                        variant="ghost"
                        size="default"
                        className="flex items-center gap-2"
                        onClick={() => setIsUpdateOpen(true)}
                    >
                        <PencilIcon size={16} /> Modifica
                    </Button>}
                    title="Modifica post"
                    description="Modifica i dettagli del tuo viaggio"
                    form={(onClose) => <UpdatePostForm id={postId} onClose={onClose} />}
                    isOpen={isUpdateOpen}
                    onOpenChange={setIsUpdateOpen}
                />

                <DeleteDialog id={postId} />

                {/* <Button
                    variant="destructive"
                    size="default"
                    className="flex items-center gap-2"
                    onClick={() => onDelete?.(postId)}
                >
                    <Trash2Icon size={16} /> Elimina
                </Button> */}
            </PopoverContent>
        </Popover>
    </>
}
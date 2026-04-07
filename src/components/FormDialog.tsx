import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import type React from "react";
import { useState } from "react";

type DialogFormProps = {
    button?: React.ReactNode;
    title: string;
    description: string;
    isOpen?: boolean;
    onOpenChange?: any;
    form: (onClose: () => void) => React.ReactNode;
}

export function FormDialog({ button, title, description, form }: DialogFormProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline" className={'border-0 bg-transparent'}>{button}</Button>} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className={'-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4'}>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {/* Passiamo una funzione per chiudere la modal al form */}
                {form(() => setOpen(false))}
            </DialogContent>
        </Dialog>
    )
}

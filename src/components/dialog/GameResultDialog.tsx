import React, {useEffect, useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";


interface Props {
    closeDialog: () => void,
    showDialog?: boolean,
}

export default function GameResultDialog({showDialog, closeDialog}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(showDialog ?? false);

    function handleClose(event: object, reason: string) {
        if (reason && reason === "backdropClick" && "escapeKeyDown") {
            return;
        }
        closeDialog();
        setIsOpen(false);
    }

    useEffect(() => {
        setIsOpen(showDialog ?? false);
    }, [showDialog]);

    return (
        <Dialog open={isOpen} onClose={handleClose} size="md" fullWidth maxWidth={false} disableEscapeKeyDown
                className="Dialog-Container bg-white dark:bg-gray-800 bg-opacity-20 dark:bg-opacity-30 backdrop-blur-xl p-1">
            <DialogHeader className="bg-blue-400 dark:bg-blue-600 rounded-t-md w-full pb-0">
                <h1 className="text-center text-2xl font-bold text-black dark:text-white">KONIEC</h1>
            </DialogHeader>
            <DialogBody className="bg-blue-400 dark:bg-blue-600">

            </DialogBody>
            <DialogFooter className="bg-blue-500 dark:bg-blue-700 rounded-b-md flex justify-center">
                <Button className="w-52" >GG</Button>
            </DialogFooter>
        </Dialog>
    );
}

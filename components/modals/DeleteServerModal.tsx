'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/hooks/useModalStore'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const DeleteServerModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const router = useRouter()
    
    const isModalOpen = isOpen && type == 'deleteServer'
    const { server } = data

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleConfirmAction = async () => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/servers/${server?.id}`)

            onClose()
            router.refresh()
            router.push('/')
        } catch (error) {
            
        }finally{
            setIsLoading(false)
        }
    }


    return (
        <Dialog 
            open={isModalOpen} 
            onOpenChange={onClose}
        >
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">
                        Delete server
                    </DialogTitle>
                    <DialogDescription 
                        className="text-center text-zinc-500"
                    >
                        Are you sure you want to do this ?  
                        <span className="font-semibold text-indigo-500">{server?.name}</span> will be permanently deleted .
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter
                    className="bg-gray-100 px-6 py-4"
                >
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant={'ghost'}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={handleConfirmAction}
                            variant={'primary'}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteServerModal
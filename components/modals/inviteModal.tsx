'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/hooks/useModalStore'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import UseOrigin from "@/hooks/useOrigin";
import { useState } from "react";
import axios from "axios";


const InviteModal = () => {
    const origin = UseOrigin()
    const { isOpen, onClose, type, data, onOpen } = useModal()
    
    const isModalOpen = isOpen && type == 'invite'
    const { server } = data

    const [copied, setCopied] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    const onNew = async () => {
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen('invite', { server : response.data})
        } catch (error) {
            console.log(error)
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
                    <DialogTitle className="text-2xl font-bold text-center">Invite Friends</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server Invite Link</Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button disabled={isLoading} size={'icon'} onClick={handleCopy}>
                            {
                                copied ? <Check className="h-4 w-4" /> : <Copy className="w-4 h-4"/>
                            }
                        </Button>
                    </div>
                    <Button
                        variant={'link'}
                        size='sm'
                        className="text-xs text-zinc-500 mt-4"
                        disabled={isLoading}
                        onClick={onNew}
                    >
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal
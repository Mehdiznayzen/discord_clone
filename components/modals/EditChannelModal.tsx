'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/useModalStore'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChannelType } from '@prisma/client'
import qs from 'query-string'
import { useEffect } from 'react'


const formSchema = z.object({
    name : z.string().min(1, {
        message : 'Channel name is required .'
    }).refine(
        name => name !== 'general',
        {
            message : "Channel name cannot be 'general'"
        }
    ),
    type : z.nativeEnum(ChannelType)
})

const EditChannelModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const { channel, server } = data
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type : ChannelType.Text || channel?.type
        },
    })

    useEffect(() => {
        if(channel) {
            form.setValue('name', channel.name)
            form.setValue('type', channel.type)
        }
    }, [form, channel])

    const isLoading = form.formState.isSubmitting
    const router = useRouter()
    const isModalOpen = isOpen && type == 'editChannel'

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query : {
                    serverId : server?.id
                }
            })
            await axios.patch(url, values)
            form.reset()
            router.refresh()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseModal = () => {
        form.reset()
        onClose()
    }

    return (
        <Dialog 
            open={isModalOpen} 
            onOpenChange={handleCloseModal}
        >
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">Edit Channel</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="space-y-8"
                    >
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Channel name </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                placeholder="Enter channel name" 
                                                disabled={isLoading}
                                                className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>Channel type </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className='bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none'
                                                >
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                { 
                                                    Object.values(ChannelType).map((channel) => (
                                                        <SelectItem 
                                                            key={channel} 
                                                            value={channel}
                                                            className='capitalize'
                                                        >
                                                            {
                                                                channel.toLowerCase()
                                                            }
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button 
                                variant={'primary'} 
                                disabled={isLoading}
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditChannelModal
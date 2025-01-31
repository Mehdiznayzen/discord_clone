'use client';

import { ServerWithMembersWithProfiles } from "@/type"
import { MemberRole } from "@prisma/client"
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles,
    role?: MemberRole
}

const ServerHeader = ({ server, role } : ServerHeaderProps) => {
    const { onOpen } = useModal()
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild
            >
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    { server.name }
                    <ChevronDownIcon className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
            >
                {
                    isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen('invite', { server : server })}
                            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                        >
                            Invite People
                            <UserPlus className="w-4 h-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isAdmin && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer"
                            onClick={() => onOpen('editServer', { server : server })}
                        >
                            Server Settings
                            <Settings className="w-4 h-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isAdmin && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer"
                            onClick={() => onOpen('members', { server : server })}
                        >
                            Manage Members
                            <Users className="w-4 h-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isModerator && (
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer"
                            onClick={() => onOpen('createChannel')}
                        >
                            Create Channel
                            <PlusCircle className="w-4 h-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    isModerator && (
                        <DropdownMenuSeparator />
                    )
                }
                {
                    isAdmin && (
                        <DropdownMenuItem
                            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                            onClick={() => onOpen('deleteServer', { server: server})}
                        >
                            Delete Server
                            <Trash className="w-4 h-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
                {
                    !isAdmin && (
                        <DropdownMenuItem
                            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                            onClick={() => onOpen('leaveServer', { server : server })}
                        >
                            Leave Server
                            <LogOut className="w-4 h-4 ml-auto"/>
                        </DropdownMenuItem>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader
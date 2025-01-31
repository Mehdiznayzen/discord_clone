'use client';

import { ServerWithMembersWithProfiles } from "@/type";
import { ChannelType, MemberRole } from "@prisma/client";
import ActionTooltip from "@/components/ActionTooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";

interface ServerSectionProps {
    label : string,
    role?: MemberRole,
    sectionType : 'channels' | 'members',
    channelType ?: ChannelType,
    server?: ServerWithMembersWithProfiles
}

const ServerSection = ({ label, sectionType, channelType, role, server } : ServerSectionProps) => {
    const { onOpen } = useModal()

    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
            {
                role !== MemberRole.GUEST && sectionType === 'channels' && (
                    <ActionTooltip
                        label="Create channel"
                        side={'top'}
                    >
                        <button 
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all"
                            onClick={() => onOpen('createChannel', { channelType: channelType })}
                        >
                            <Plus className="w-4 h-4"/>
                        </button>
                    </ActionTooltip>
                )
            }
            {
                role === MemberRole.ADMIN  && sectionType === 'members' && (
                    <ActionTooltip
                        label="Manage members"
                        side={'top'}
                    >
                        <button 
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition-all"
                            onClick={() => onOpen('members', { server : server })}
                        >
                            <Settings className="w-4 h-4"/>
                        </button>
                    </ActionTooltip>
                )
            }
        </div>
    )
}

export default ServerSection
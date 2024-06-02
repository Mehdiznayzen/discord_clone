
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
    src?: string,
    className?: string 
}

const UserAvatar = ({ className, src } : UserAvatarProps) => {
    return (
        <Avatar className={cn(className, 'h-7 w-7 md:h-10 md:w-10 ')}>
            <AvatarImage src={src} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar
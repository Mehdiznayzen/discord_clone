import { Menu } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import NavigationSidebar from "@/components/navigation/NavigationSidebar"
import ServerSidebar from "@/components/server/ServerSidebar"


const MobileToggle = ({ serverId }: { serverId : string }) => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button 
                    variant={'ghost'} 
                    size={'icon'} 
                    className="md:hidden"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent
                side={'left'}
                className="p-0 flex gap-0"
            >
                <div className="w-[72px]">
                    <NavigationSidebar />
                </div>
                <ServerSidebar 
                    serverId={serverId}
                />
            </SheetContent>
        </Sheet>
    )
}

export default MobileToggle
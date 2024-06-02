import InitialModal from "@/components/modals/InitialModal"
import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"


const SetupPage = async () => {
    const profile = await initialProfile()

    if (profile instanceof NextResponse) {
        return profile
    }

    const server = await db.server.findFirst({
        where : {
            members : {
                some: {
                    profileId : profile.id
                }
            }
        }
    })

    if(server) {
        return redirect(`/servers/${server.id}`)
    }

    return (
        <InitialModal />
    )
}

export default SetupPage
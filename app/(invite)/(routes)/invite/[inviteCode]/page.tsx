import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

interface InvitePageProps {
    params : {
        inviteCode : string
    }
}

const InviteCodepage = async ({ params }: InvitePageProps) => {
    const profile = await currentProfile()
    if(!profile) return redirect('/sign-in')

    if(!params.inviteCode) return redirect('/')

    const existingServer = await db.server.findFirst({
        where : {
            inviteCode : params.inviteCode,
            members : {
                some : {
                    profileId: profile.id
                }
            }
        }
    });

    if(existingServer) return redirect(`/servers/${existingServer.id}`)

    const server = await db.server.update({
        where : {
            inviteCode: params.inviteCode
        },
        data : {
            members : {
                create : [
                    {
                        profileId : profile.id
                    }
                ]
            }
        }
    })

    if(server) return redirect(`/servers/${server.id}`)

    return null;
}

export default InviteCodepage
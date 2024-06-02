import { useAuth } from '@clerk/nextjs'
import React from 'react';
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const useHandleAuth = () => {
    const { userId } = useAuth();
    if (!userId) throw new Error('Unauthorized');
    return { userId };
};

const handleAuth = () => {
    const authData = { userId: '' };
    const WrapperComponent = () => {
        authData.userId = useHandleAuth().userId;
        return null;
    };

    return React.createElement(WrapperComponent), authData;
}

export const ourFileRouter = {
    serverImage: f({ image : { maxFileSize : '4MB', maxFileCount : 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {

    }),

    messageFile: f(['image', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {

    })
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
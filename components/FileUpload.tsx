'use client';

import { X } from 'lucide-react';
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import Image from 'next/image';
import { Button } from './ui/button';

interface FileUploadProps {
    onChange : (url?: string) => void,
    value : string,
    endpoint : "messageFile" | "serverImage",
}

const FileUpload = ({ endpoint, onChange, value } : FileUploadProps) => {
    const fileType = value?.split('.').pop()

    if(value && fileType !== 'pdf'){
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="image-uploaded"
                    className='rounded-full'
                />
                <Button
                    onClick={() => onChange('')} 
                    className='bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm h-5 w-5' 
                    type='button'
                >
                    <X />
                </Button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(response) => {
                onChange(response?.[0].url)
            }}
            onUploadError={(error : Error) => {
                console.log(error)
            }}
        />
    )
}

export default FileUpload
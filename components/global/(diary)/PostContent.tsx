import { IDiary } from '@/utils/supabase';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

const PostContent = ({ 
        id,
        avatar, 
        content, 
        username, 
        email 
    }: IDiary): ReactElement => {

    const deleteDiary = (id:number)=>{
        console.log(id)
    }


    return(
        <Link href={`/diary/${id}`} className="card card-body card-bordered shadow-lg bg-base-300 cursor-pointer duration-300 ease-in-out hover:shadow-xl hover:bg-secondary hover:scale-105 h-72">
            <div className="flex items-center gap-2 justify-between">
                <Image
                    src={avatar as string}
                    alt={avatar as string}
                    width={50}
                    height={50}
                    className="rounded-full bg-primary"
                />
                <p className="font-semibold text-lg">{username || email}</p>
                <button className='btn btn-sm'>Delete</button>
            </div>
            <p className="overflow-y-auto text-md">
                {content}
            </p>
        </Link>
    )
}

export default PostContent;
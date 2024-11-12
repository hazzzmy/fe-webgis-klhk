import { IComments, supabase } from '@/utils/supabase'
import Image from 'next/image'
import React from 'react'

type ParamProps={
    id:string
}

const CommentList = async({id}:ParamProps)=> {

    console.log("🚀 ~ CommentList ~ id:", id)
    // const diary_id = formData.get("id") as string;
    const {data, error} = await supabase.from('diary').select("comments").eq("id", id).single()
    console.log("🚀 ~ CommentList ~ data:", data)
    return (
        <div className='flex flex-col gap-4'>
            {data?.comments?.map((comment:IComments)=>{
                return (<div className="card card-body flex flex-col gap-4 bg-white text-black" key={comment.id}>
                    <p>{comment.content}</p>
                    <div className='flex flex-row items-center gap-4'>
                        <Image
                            src={comment.avatar as string}
                            alt={comment.avatar as string}
                            width={30}
                            height={30}
                            className="rounded-full bg-primary"
                            />
                        <p>{comment.email}</p>
                    </div>
                </div>)
            })}
        </div>
    )
}

export default CommentList
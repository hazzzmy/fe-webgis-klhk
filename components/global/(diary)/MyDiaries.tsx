import React from 'react';
import { supabase } from '@/utils/supabase';
import PostContent from './PostContent';
import { getUserData } from '@/utils/clerk';

const MyDiaries = async (): Promise<React.ReactElement> => {
    const { email} = await getUserData()
    const {data, error} = await supabase.from('diary').select().order("created_at",{ascending:false}).eq('email',email);
    if (error) return <p>please reload the page...</p>
    
    return (
        <div className="grid grid-cols-3 gap-4 grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {data.map((diary:any)=>{
                return(<PostContent
                    id = {diary.id}
                    key = {diary.id}
                    avatar = {diary.avatar}
                    content = {diary.content}
                    username = {diary.username}
                    email = {diary.content}
                />)
            })}
        </div>
    )
}

export default MyDiaries;
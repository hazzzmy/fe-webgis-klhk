"use client"

import { createCommentAction } from '@/actions/createCommentAction'
import React, { ReactElement, RefObject, useRef } from 'react'

type ParamsProps = {
  id: string
}

const CreateCommentForm = ({id}:ParamsProps): ReactElement => {
  const formRef:RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);
  const resetForm = ():void =>{
    setTimeout(()=>{
      formRef.current?.reset();
    }, 1000)
  }


  return (
    <form 
      action={createCommentAction} 
      className='flex flex-col gap-4 item-center mx-auto w-full' 
      name="content"
      onSubmit = {resetForm}
    >
        <textarea className='h-52 text-area p-4' name="content" placeholder='Enter your comment...'/>
        <input type="hidden" value={id} name="id"/>
        <button className='btn btn-primary max-w-sm mx-auto' type="submit">Sumbit Comment</button>
    </form>
  )
}

export default CreateCommentForm
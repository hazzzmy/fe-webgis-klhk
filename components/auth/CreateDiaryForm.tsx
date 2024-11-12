import { createDiaryAction } from '@/actions/createDiaryAction'
import React, { ReactElement } from 'react'

const CreateDiaryForm = (): ReactElement => {

    return (
        <form className='flex flex-col gap-4 item-center max-w-xl mx-auto' name="content" action={createDiaryAction}>
            <textarea className='h-52 text-area p-4' name="content"/>
            <button className='btn btn-primary' type="submit">Create Diary</button>
        </form>
    )
}

export default CreateDiaryForm
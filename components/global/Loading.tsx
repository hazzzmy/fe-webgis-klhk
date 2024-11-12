import React from 'react'
import Wrapper from './Wrapper'

const Loading = () => {
  return (
    <Wrapper title="Loading...">
        <div className='flex justify-center items-center'>
            <span className="loading loading-spinner text-primary text-center loading-lg"></span>
        </div>
    </Wrapper>
  )
}

export default Loading
import React from 'react'
import Moment from 'react-moment'

export const CommentItem = ({ comment }) => {
  return (
    <li className='flex flex-col bg-gray-600/50 rounded-xl p-3'>
      <span className='text-gray text-md mb-5'>{comment.username}</span>
      <p className="text-white text-md mb-3">{comment.text}</p>
      <span className='text-xs text-gray-300'>
        <Moment date={comment.created} format='DD MMM YYYY' />
      </span>
    </li>
  )
}

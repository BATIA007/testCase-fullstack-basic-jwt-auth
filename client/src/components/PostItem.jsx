import React from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'

export const PostItem = ({ post }) => {
  const { user } = useSelector(state => state.auth)

  return (
    <Link to={`/${post.id}`}>
      <div className="flex flex-col gap-5">
        <div className='flex rounded-sm'>
          {post.imgUrl && (
            <img className='object-contain w-full h-[400px]' src={'http://localhost:5000/' + post.imgUrl} alt={post.imgUrl} />
          )}
        </div>
        <div className="flex justify-between">
          <span className={`text-md text-gray-400 ${user === post.userId && 'text-red-700/70'}`}>{user === post.userId ? 'Вы' : post.username}</span>
          <span className="text-xs text-gray-400"><Moment date={post.created} format='DD MMM YYYY'></Moment></span>
        </div>
        <h3 className='text-xl text-white font-medium'>{post.title}</h3>
        <p className="text-md text-gray-200">{post.text}</p>
        <div className="flex gap-4 items-center">
          <button className='flex items-center justify-center gap-2 opacity-50 text-md text-white'>
            <IconContext.Provider value={{ size: 20 }}>
              <AiFillEye />
            </IconContext.Provider>
            <span>{post.views}</span>
          </button>
          <button className='flex items-center justify-center gap-2 opacity-50 text-md text-white'>
            <IconContext.Provider value={{ size: 20 }}>
              <AiOutlineMessage />
            </IconContext.Provider>
            <span>{post.comments}</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
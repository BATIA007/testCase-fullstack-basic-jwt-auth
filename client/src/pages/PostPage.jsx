import React, { useCallback, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiFillEye, AiOutlineMessage, AiFillDelete, AiFillEdit } from 'react-icons/ai'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { removePost } from '../redux/features/post/postSlice'
import axios from '../utils/axios'
import { CommentItem } from '../components/CommentItem'
import { createComment, getComments } from '../redux/features/comments/comments'
import { toast } from 'react-toastify'

export const PostPage = () => {
  const [post, setPost] = useState({})
  const [text, setText] = useState('')
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.post)
  const { user } = useSelector((state) => state.auth)
  const { comments, status } = useSelector((state) => state.comment)

  const handleRemove = () => {
    try {
      dispatch(removePost(params.id))
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  }

  const handleComment = () => {
    try {
      const postId = params.id
      setText('')
      dispatch(createComment({ text, postId }))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data.post)
  }, [params.id])

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  useEffect(() => {
    toast(status)
  }, [status])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (loading) {
    return (
      <h2 className='text-2xl text-white text-center'>Загрузка...</h2>
    )
  }

  if (!post && loading === false) {
    return (
      <h1 className='text-4xl font-bold text-white text-center mt-10'>Поста не существует</h1>
    )
  }

  return (
    <div className="flex flex-col items-start justify-start gap-10">
      <button onClick={() => navigate(-1)} className='px-5 py-2 bg-gray-600 rounded-sm text-xl text-white'>
        Назад
      </button>
      <div className="flex flex-col gap-5 w-full">
        <div className='flex rounded-sm'>
          {post.imgUrl && (
            <img className='object-contain w-full h-[400px]' src={'http://localhost:5000/' + post.imgUrl} alt={post.imgUrl} />
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-md text-gray-400">{post.username}</span>
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
      {user === post.userId && (
        <div className="flex flex-col gap-10">
          <button onClick={handleRemove} className='px-5 py-2 bg-red-600/80 rounded-sm text-xl text-white flex gap-2 items-center justify-center'>
            <AiFillDelete />
            Удалить
          </button>
          <Link to={`/${params.id}/edit`} className='px-5 py-2 bg-blue-600/80 rounded-sm text-xl text-white flex gap-2 items-center justify-center'>
            <AiFillEdit />
            Изменить
          </Link>
        </div>
      )}
      {Boolean(user) && (
        <form className='w-full border-2 border-gray-600/60 p-10 rounded-md' onSubmit={e => e.preventDefault()}>
          <h3 className='text-white text-xl mb-5'>Добавьте свой комментарий</h3>
          <textarea onChange={(e) => setText(e.target.value)} value={text} className='bg-gray-600 border-1 mb-5 border-gray-700 mt-2 p-2 text-white rounded-md w-full resize-none h-[200px] outline-none opacity-70' placeholder='Текст комментария'></textarea>
          <button type='submit' onClick={handleComment} className='bg-gray-600/80 roundex-sm px-5 py-2 text-md text-white'>Добавить</button>
        </form>
      )}
      {comments.length ? (
        <ul className='w-full flex flex-col gap-5 bg-gray-600/30 rounded-md mt-10 p-5 mb-20'>
          {comments?.map((comment, idx) => (
            <CommentItem key={idx} comment={comment} />
          ))}
        </ul>
      ) : (
        <h2 className='text-xl w-full text-white font-medium text-center mb-20'>Нет комментариев</h2>
      )
      }
    </div>
  )
}

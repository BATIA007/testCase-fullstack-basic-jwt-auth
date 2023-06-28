import React, { useEffect } from 'react'
import { PostItem } from '../components/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../redux/features/post/postSlice'

export const MainPage = () => {
  const { isLoading, posts } = useSelector(state => state.post)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  if (isLoading) {
    return (
      <h2 className='text-2xl text-white text-center'>Загрузка...</h2>
    )
  }

  if (!posts.length && isLoading === false) {
    return (
      <h1 className='text-4xl font-bold text-white text-center mt-10'>Нет постов</h1>
    )
  }


  return (
    <>
      <h1 className='text-4xl font-bold text-white text-center mt-10'>Посты</h1>
      <div className='flex justify-between gap-20 mt-20'>
        <div className="flex flex-col gap-10 basis-1/2">
          <h2 className='text-2xl font-semibold text-white'>Недвание</h2>
          {posts?.map((post, idx) => (
            <PostItem post={post} key={idx} />
          ))}
        </div>
        <div className="flex flex-col gap-10 basis-1/2">
          <h2 className='text-2xl font-semibold text-white'>Популярные</h2>
          {posts?.concat().sort((a, b) => b.views - a.views).map((post, idx) => (
            <PostItem post={post} key={idx} />
          ))}
        </div>
      </div>
    </>
  )
}

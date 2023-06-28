import React, { useCallback, useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useSelector } from 'react-redux'
import { PostItem } from '../components/PostItem'

export const PostsPage = () => {
  const [posts, setPosts] = useState({})
  const { isLoading } = useSelector(state => state.post)

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('/posts/user/me')
      setPosts(data.posts)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchMyPosts()
  }, [fetchMyPosts])

  if (isLoading) {
    return (
      <h2 className='text-2xl text-white text-center'>Загрузка...</h2>
    )
  }

  if (!posts.length) {
    return (
      <h1 className='text-4xl font-bold text-white text-center mt-10'>У вас нет постов</h1>
    )
  }

  return (
    <>
      <h1 className='text-4xl font-bold text-white text-center mt-10'>Мои Посты</h1>
      <div className='flex justify-between gap-20 mt-20'>
        <div className="flex flex-col gap-10 basis-1/2">
          <h2 className='text-2xl font-semibold text-white'>Недвание</h2>
          {posts.length && posts?.map((post, idx) => (
            <PostItem post={post} key={idx} />
          ))}
        </div>
        <div className="flex flex-col gap-10 basis-1/2">
          <h2 className='text-2xl font-semibold text-white'>Популярные</h2>
          {posts.length && posts?.concat().sort((a, b) => b.views - a.views).map((post, idx) => (
            <PostItem post={post} key={idx} />
          ))}
        </div>
      </div>
    </>
  )
}

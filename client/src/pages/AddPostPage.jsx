import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const dispatch = useDispatch()
  const { status } = useSelector(state => state.post)

  const handleSubmit = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      toast(status)
      clearForm()
    } catch (error) {
      toast(error)
    }
  }

  useEffect(() => {
    toast(status)
  }, [status])

  const clearForm = () => {
    setTitle('')
    setText('')
    setImage('')
  }

  return (
    <form className='w-1/3 mx-auto py-20' onSubmit={e => e.preventDefault()}>
      <label className='flex justify-center items-center select-none bg-gray-600/50 border-2 border-dotted border-gray-400 cursor-pointer text-gray-300 py-2'>
        Прикрепить изображение
        <input type="file" onChange={e => setImage(e.target.files[0])} className='hidden' />
      </label>
      <div className="object-cover">
        {image && (
          <img className='mt-4' src={URL.createObjectURL(image)} alt={image.name} />
        )}
      </div>
      <label className='text-white opacity-70 mt-10 flex flex-col'>
        Заголовок поста
        <input value={title} onChange={e => setTitle(e.target.value)} type="text" className='mt-2 bg-gray-600 w-full text-white rounded-md p-2 outline-none' placeholder='Заголовок' />
      </label>
      <label className='text-white opacity-70 mt-5 flex flex-col'>
        Текст поста
        <textarea value={text} onChange={e => setText(e.target.value)} className='bg-gray-600 mt-2 p-2 text-white rounded-md resize-none h-[200px] outline-none opacity-70' placeholder='Текст'></textarea>
      </label>
      <div className="flex justify-center mt-10 gap-5">
        <button onClick={handleSubmit} type='submit' className="bg-gray-700 py-2 px-4 text-white rounded-sm hover:bg-gray-800 transition-colors">Добавить</button>
        <button onClick={clearForm} className="bg-red-700/50 py-2 px-4 text-white roudned-sm hover:bg-red-700/70 transition-colors">Отменить</button>
      </div>
    </form>
  )
}

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')

  }, [status, isAuth, navigate])

  return (
    <form className='w-[250px] md:w-[480px] min-h-[60vh] flex justify-center items-center flex-col mx-auto select-none' onSubmit={(e) => e.preventDefault()}>
      <h1 className="text-2xl font-bold text-center mb-10">Войти</h1>
      <input onChange={e => setUsername(e.target.value)} value={username} className='bg-gray-500 w-full mb-5 px-5 py-2 rounded-md focus:bg-gray-600 transition-colors outline-none border text-gray-200 placeholder:text-gray-300' placeholder='Логин' type="text" />
      <input onChange={e => setPassword(e.target.value)} value={password} className='bg-gray-500 w-full mb-7 px-5 py-2 rounded-md focus:bg-gray-600 transition-colors outline-none border text-gray-200 placeholder:text-gray-300' placeholder='Пароль' type="password" />
      <button onClick={handleSubmit} type='submit' className='flex justify-center items-center bg-gray-700 hover:bg-gray-800 transition-all active:opacity-90 text-gray-200 px-7 py-2 rounded-md'>Подтвердить</button>
    </form>
  )
}

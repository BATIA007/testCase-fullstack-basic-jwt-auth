import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'


export const Navbar = () => {
  const activeStyle = {
    color: '#000000'
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
    navigate('/')
  }

  const isAuth = useSelector(checkIsAuth)

  return (
    <nav className='select-none flex justify-between items-center py-2 md:py-4'>
      <Link to={'/'} className='flex justify-center items-center text-lg bg-gray-800 px-6 py-2 rounded-lg select-none'>Logo</Link>
      {
        isAuth ? (
          <>
            <ul className='flex items-center gap-7 select-none'>
              <li>
                <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='text-gray-600 hover:text-gray-200 transition-colors' to={'/'}>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='text-gray-600 hover:text-gray-200 transition-colors' to={'/posts'}>
                  Мои Посты
                </NavLink>
              </li>
              <li>
                <NavLink style={({ isActive }) => isActive ? activeStyle : undefined} className='text-gray-600 hover:text-gray-200 transition-colors' to={'/new'}>
                  Добавить пост
                </NavLink>
              </li>
            </ul>
            <button onClick={handleLogout} className='flex justify-center items-center px-4 py-2 bg-gray-800 text-md rounded-md text-md hover:bg-gray-700 transition-colors' to={'/login'}>Выйти</button>
          </>
        ) : (
          <div className="flex gap-5">
            <Link className='flex justify-center items-center px-4 py-2 bg-gray-800 text-md rounded-md text-md hover:bg-gray-700 transition-colors' to={'/login'}>Войти</Link>
            <Link className='flex justify-center items-center px-4 py-2 bg-gray-800 text-md rounded-md text-md hover:bg-gray-700 transition-colors' to={'/register'}>Регистрация</Link>
          </div>
        )
      }

    </nav>
  )
}

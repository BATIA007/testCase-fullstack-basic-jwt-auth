import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postSlice from './features/post/postSlice'
import commnetSlice from './features/comments/comments'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commnetSlice
  }
})

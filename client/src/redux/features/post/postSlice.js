import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../utils/axios'

const initialState = {
  posts: [],
  loading: false,
  status: null
}

export const createPost = createAsyncThunk('post/createPost', async (params) => {
  try {
    const { data } = await axios.post('/posts', params)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getPosts = createAsyncThunk('post/getAll', async () => {
  try {
    const { data } = await axios.get('/posts')
    return data
  } catch (error) {
    console.log(error)
  }
})

export const removePost = createAsyncThunk('post/delete', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const updatePost = createAsyncThunk('post/update', async (params) => {
  try {
    const { data } = await axios.put(`/posts/${params.id}`, params)
    return data
  } catch (error) {
    console.log(error)
  }
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // CREATE POST
    [createPost.pending]: (state) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
    // GET ALL POSTS
    [getPosts.pending]: (state) => {
      state.loading = true
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false
      state.posts = action.payload.posts
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
    // REMOVE POST
    [removePost.pending]: (state) => {
      state.loading = true
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
      state.posts = state.posts.filter(post => post.id !== action.payload.post.id)
    },
    [removePost.rejected]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
    // UPDATE POST
    [updatePost.pending]: (state) => {
      state.loading = true
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
      const index = state.posts.findIndex(post => post.id === action.payload.post.id)
      state.posts[index] = action.payload.post
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
  }
})

export default postSlice.reducer
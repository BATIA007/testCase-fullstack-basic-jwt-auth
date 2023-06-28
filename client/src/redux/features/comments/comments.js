import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../utils/axios"


const initialState = {
  loading: false,
  comments: [],
  status: null
}

export const createComment = createAsyncThunk(('comments/create'), async ({ text, postId }) => {
  try {
    const { data } = await axios.post(`/comments/${postId}`, { text, postId })
    return data
  } catch (error) {
    console.log(error)
  }
})

export const getComments = createAsyncThunk('comments/get', async (postId) => {
  try {
    const { data } = await axios.get(`/comments/${postId}`)
    return data
  } catch (error) {
    console.log(error)
  }
})


const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: [],
  extraReducers: {
    // CREATE COMMENT
    [createComment.pending]: (state) => {
      state.loading = true
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
      state.comments.unshift(action.payload.comment)
    },
    [createComment.rejected]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
    // GET COMMENTS
    [getComments.pending]: (state) => {
      state.loading = true
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false
      state.status = null
      state.comments = action.payload.comments.concat().sort((a, b) => new Date(a.created) < new Date(b.created) ? 1 : -1)
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false
      state.status = action.payload.message
    },
  }
})

export default commentSlice.reducer
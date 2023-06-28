import { Layout } from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage'
import { EditPostPage } from './pages/EditPostPage'
import { AddPostPage } from './pages/AddPostPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { PostPage } from './pages/PostPage'
import { PostsPage } from './pages/PostsPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMe } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path=":id/edit" element={<EditPostPage />} />
        <Route path="new" element={<AddPostPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path=":id" element={<PostPage />} />
        <Route path="posts" element={<PostsPage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Layout>
  )
}

export default App;

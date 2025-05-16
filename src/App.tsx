import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Blog from './components/Blog'
import Profile from './components/Profile'
import Home from './components/Home'
import BlogPost from './components/BlogPost'
import { AuthProvider } from './context'
import AuthPage from './pages/AuthPage'
import PrivateRoute from './components/PrivateRoute'
import BlogEditPost from './components/BlogEditPost'

function App() {

  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />}>
              <Route path=":slug" element={<BlogPost />} />
              <Route path=":slug/edit" element={<BlogEditPost />} />
            </Route>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/logout" element={<AuthPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App

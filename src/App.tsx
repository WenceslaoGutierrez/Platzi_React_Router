import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Blog from './components/Blog'
import Profile from './components/Profile'
import Home from './components/Home'
import BlogPost from './components/BlogPost'
import { AuthProvider } from './context'
import AccountForm from './components/AccountForm'
import LoginForm from './components/Login'
import LogoutButton from './components/Logout'

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
            </Route>
            <Route path="/login" element={<LoginForm onSubmit={() => {}}/>} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<AccountForm buttonLabel="Create account" onSubmit={() => {}} />} />
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App

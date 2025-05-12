import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Blog from './components/Blog'
import Profile from './components/Profile'
import Home from './components/Home'

function App() {

  return (
    <>
      <HashRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App

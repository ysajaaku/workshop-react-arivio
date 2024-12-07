import './styles/global.css'
import './styles/profile.css'
import React from 'react'
import LoginForm from './components/loginForm'
import RegisterForm from './components/RegisterForm'
import Profile from './components/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />}/>
        <Route path='/profile' element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import UpdateEmailPasword from './UpdateEmailPasword'
import ForgotPassword from './ForgotPassword'

function AuthenticationRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/updateEmailPassword' element={<UpdateEmailPasword/>}/>
            <Route path='/forgot' element={<ForgotPassword/>}/>
        </Routes>
    </>
  )
}

export default AuthenticationRoutes
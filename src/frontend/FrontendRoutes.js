import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../frontend/Home';
// import Home from './Home';
// import Home from ''

function FrontendRoutes() {
  return (
    <Routes>
        <Route path='/Home' element={<Home/>}/>
    </Routes>
  )
}

export default FrontendRoutes;
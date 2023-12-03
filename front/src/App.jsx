import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, ProductFormPage, Products, ProfilePage, RegisterPage } from './screens'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar/Navbar'



function App() {
  
  return (
    <>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>

          <Route element={<ProtectedRoute/>}>
            <Route path='/products' element={<Products/>}/>
            <Route path='/add-product' element={<ProductFormPage/>}/>
            <Route path='/products/:pid' element={<ProductFormPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App

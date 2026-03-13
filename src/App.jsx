import React from 'react'
import Navbar from './components/layout/NavBar'
import Hero from './features/public/Hero'
import GuestForm from './features/public/GuestForm'
import ProjectForm from './features/public/ProjectForm'
import ProjectGallery from './features/public/ProjectGallerg'
import Footer from './features/public/Footer'
import PublicLandingPage from './features/public/PublicLandingPage' 
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayou'
import AdminDashboard from './features/admin/AdminDashBoard'
import GuestManager from './features/admin/GuestManager'
import ProjectManager from './features/admin/ProjectManager'
// import { Reveal } from './components/animation/Reveal.jsx'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLandingPage />} />
        <Route path='/admin' element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path='guests' element={<GuestManager/>}/>
          <Route path='projects' element={<ProjectManager/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    
  )
}

import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import Contact from './components/contact';
import CreateBlog from './components/CreateBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
import Home from './Pages/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import PrivateRoute from './Auth/PrivateRoute';
import Navbar from './Pages/Navbar';
import Dashboard from './Pages/DashBoard';

function App() {

  return (
    <>
      {/* <div className='bg-dark text-center py-2 shadow-lg'>
        <h1 className='text-white'>Blog App</h1>
      </div> */}

 <Navbar/>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <Blogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* <Route path='/blog' element={ <Blogs /> } /> */}
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/posts/:id' element={<BlogDetail />} />
        <Route path='posts/edit/:id' element={<EditBlog />} />

        {/* <Route path='/contact' element={ <Contact /> } /> */}
      </Routes>
      <ToastContainer />

    </>
  )
}

export default App

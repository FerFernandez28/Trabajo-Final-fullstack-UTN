import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth()
  return (
    <nav className='navBar'>
        <Link className='link' to={
            isAuthenticated ? "/products" : "/"
        }>
            <h1>Products Manager</h1>
        </Link>
        <div className='navbarContainer1'>
            {isAuthenticated ? (
                <>
                    <div className='welcomeUser'>
                        Welcome {user.username}
                    </div>
                    <div>
                        <Link className='link' to='/add-product'>Add Product</Link>
                    </div>
                    <div>
                        <Link className='link' to='/' onClick={() => { logout() }}>Logout</Link>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <Link className='link' to='/login'>Login</Link>
                    </div>
                    <div>
                        <Link className='link' to='/register'>Register</Link>
                    </div>
                </>
            )}
        </div>
    </nav>

  )
}

export default Navbar
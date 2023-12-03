import React, { useEffect, useState } from 'react'
import './LoginPage.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import {Link, useNavigate} from 'react-router-dom'

const LoginPage = () => {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const { signin, errors: signinErrors, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data)=>{
        signin(data)
    })
    useEffect(()=>{
        if(isAuthenticated) navigate("/products")
    }, [isAuthenticated])
    const totalErrors = signinErrors.length + (errors.email ? 1 : 0) + (errors.password ? 1 : 0);
    const formContentHeight = `${47 + totalErrors * 3}vh`;
  
    return (    
        <div className='form-content' style={{ height: formContentHeight }}>       
            {
                signinErrors.map((error, i)=>(
                    <div className='errorsRegister' key={i}>
                        {error}
                    </div>
                ))
            }
            <h2>Login</h2>
            <form onSubmit={onSubmit} autoComplete="off">
                <div className='input-group'>
                    <div className='input-field'>
                        <i className="bi bi-envelope-fill"></i>
                        <input type="email" placeholder='email'  {...register("email", {required: true})}/>                    
                    </div>
                    {errors.email && (
                        <p className='errors'>Email is required</p>
                    )}
                    <div className='input-field'>
                        <i className="bi bi-lock-fill"></i>
                        <input type="password" placeholder='password' {...register("password", {required: true})}/>                    
                    </div>
                    {errors.password && (
                        <p className='errors'>Password is required</p>
                    )}
                    <div className="links">   
                        <span>Don't have an account? </span> 
                        <Link to="/register">Sign up</Link>
                    </div>
                </div>
                <button className='btn-login' type='submit'>
                    login
                </button>
                {/* <input type="submit" value="Registrar"/> */}
            </form>
        </div>
    
)
}

export default LoginPage
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import './RegisterPage.css'


const RegisterPage = () => {
    const { register, handleSubmit, formState: {errors}, } = useForm()
    const { signup, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()
    
    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });
    useEffect(() => {
        if (isAuthenticated) navigate("/products");
        
    }, [isAuthenticated]);
    
    const totalErrors = registerErrors.length + (errors.email ? 1 : 0) + (errors.password ? 1 : 0);
    const formContentHeight = `${54 + totalErrors * 3.5}vh`;
    return (
        <div className='form-content-register' style={{ height: formContentHeight }}>      
            {
                registerErrors.map((error, i)=>(
                    <div className='errorsRegister' key={i}>
                        {error}
                    </div>
                ))
            }
            <h2>Register</h2>
            <form onSubmit={onSubmit} autoComplete="off">
                <div className='input-group'>
                    <div className='input-field'>
                        <i className="bi bi-person-circle"></i>
                        <input type="text" placeholder='Username'{...register("username", {required: true})}/>
                    </div>
                    {errors.username && (
                        <p className='errors'>Username is required</p>
                    )}
                    <div className='input-field'>
                        <i className="bi bi-envelope-fill"></i>
                        <input type="email" placeholder='Email'  {...register("email", {required: true})}/>
                    </div>
                    {errors.email && (
                        <p className='errors'>Email is required</p>
                    )}
                    <div className='input-field'>
                        <i className="bi bi-lock-fill"></i>
                        <input type="password" placeholder='Password' {...register("password", {required: true})}/> 
                    </div>
                    {errors.password && (
                        <p className='errors'>Password is required</p>
                    )}
                    <div className="links">   
                        <span className="links">Already have an account</span> 
                        <Link to="/login">Login</Link>
                    </div>
                </div>
                <button className='btn-login' type='submit'>
                    register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
import {instance} from './axios'

const registerRequest = user => instance.post('/register', user)

const loginRequest = user => instance.post('/login', user)

const verifyTokenRequest = () => instance.get('/verify')


export {registerRequest, loginRequest, verifyTokenRequest}
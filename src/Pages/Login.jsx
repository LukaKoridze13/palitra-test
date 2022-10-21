import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Components/Button'
import Form from '../Components/Form'
import Input from '../Components/Input'
import { checkLogin, checkUser, logIn } from '../LocalStorage'

export default function Login() {
    let form = useRef()
    let navigate = useNavigate()
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    function submit() {
        let email = form.current.children[1].children[1].value
        let password = form.current.children[2].children[1].value
        if (email.length === 0) {
            setEmailError('Please enter email')
            setPasswordError('')
            return false;
        }
        if (password.length === 0) {      
            setPasswordError('Please enter password')
            setEmailError('')
            return false;
        }
        if (!checkUser(email)) {
            
            setEmailError('Email not registered')
            setPasswordError('')
            return false;
        }
        if (checkLogin(email, password)) {
            navigate('/palitra-test/home')
            logIn(email);
        } else {
            
            setPasswordError('Password incorrect')
            setEmailError('')
            return false;
        }
    }
    return (
        <Form title='Login' form={form} onSubmit={submit} novalidate>
            <Input id='email' error={emailError} label='E-Mail:' type='email' placeholder='Enter your E-Mail'  />
            <Input id='password' error={passwordError} label='Password:' type='password' placeholder='Enter your Password'  />
            <Button text='Login' />
            <div>
                <p >Don't have an account? <span onClick={() => { navigate("/palitra-test/register")}}>Register</span></p>
                <span onClick={() => {navigate('/palitra-test/forgotpassword')}}>Forgot Password?</span>
            </div>
        </Form>
    )
}

import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../Components/Form'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { checkUser, createUser } from '../LocalStorage'
export default function Register() {
    let form = useRef()
    let navigate = useNavigate()
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')
    const [nameError, setNameError] = useState('')
    const [surnameError, setSurnameError] = useState('')
    function submit() {
        let valid = 0;
        let name = form.current.children[1].children[1].value
        let surname = form.current.children[2].children[1].value
        let email = form.current.children[3].children[1].value
        let password = form.current.children[4].children[1].value
        let repeatPassword = form.current.children[5].children[1].value
        setEmailError(''); setPasswordError(''); setRepeatPasswordError(''); setSurnameError(''); setNameError('')
        if(name.length === 0){
            setNameError('Please enter a name')
        }else if(name.length < 2){
            setNameError('Name must be at least 2 characters')
        } else if (!/^[a-zA-Z]+$/.test(name)){
            setNameError('Name must contain only letters')
        }else{
            valid ++
        }
        if (surname.length === 0) {
            setSurnameError('Please enter a surname')
        } else if (surname.length < 2) {
            setSurnameError('Surname must be at least 2 characters')
        } else if (!/^[a-zA-Z]+$/.test(surname)) {
            setNameError('Surname must contain only letters')
        } else {
            valid++
        }
        if (email.length === 0) {
            setEmailError('Please enter an E-Mail')
        } else if (!email.includes('@')) {
            setEmailError('Email must include "@"')
        }else if(checkUser(email)){
            setEmailError('Email is already registered')
        } else {
            valid++
        }
        if (password.length === 0) {
            setPasswordError('Please enter a password')
        } else if (password.length < 4) {
            setPasswordError('Password must be at least 4 characters')
        } else {
            valid++
        }
        if(repeatPassword.length === 0){
            setRepeatPasswordError('Please repeat the password')
        }else if(repeatPassword!==password){
            setRepeatPasswordError('Passwords do not match')
        }else{
            valid++
        }
        if(valid === 5){
            createUser(name,surname,email,password)
            navigate('/palitra-test/home')
        }
    }
    return (
        <Form title='Register' form={form} onSubmit={submit} novalidate>
            <Input id='name' error={nameError} label='Name:' type='text' placeholder='Enter your name' />
            <Input id='surname' error={surnameError} label='Surname:' type='text' placeholder='Enter your surname' />
            <Input id='email' error={emailError} label='E-Mail:' type='email' placeholder='Enter your E-Mail' />
            <Input id='password' error={passwordError} label='Password:' type='password' placeholder='Enter your Password' />
            <Input id='repeatpassword' error={repeatPasswordError} label='Repeat Password:' type='password' placeholder='Repeat your Password' />
            <Button text='Register' />
            <div>
                <p >Already have an account? <span onClick={() => { navigate("/palitra-test/login") }}>Login</span></p>
            </div>
        </Form>
    )
}

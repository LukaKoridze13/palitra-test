import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../Components/Form'
import Input from '../Components/Input'
import Button from '../Components/Button'
import { changePassword,  getUser } from '../LocalStorage'
export default function ForgotPassword() {
  let form = useRef()
  let navigate = useNavigate()
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [nameError, setNameError] = useState('')
  const [surnameError, setSurnameError] = useState('')
  function submit() {
    let valid = 0;
    let name = form.current.children[1].children[1].value
    let surname = form.current.children[2].children[1].value
    let email = form.current.children[3].children[1].value
    let password = form.current.children[4].children[1].value
    setEmailError(''); setPasswordError(''); setSurnameError(''); setNameError('')
    let user = getUser(email)
    if (user === 'Not Found') {
      setEmailError('User not found')
    } else {
      valid++;
    }
    if (name !== user.name) {
      setNameError('Name does not match user email')
    } else {
      valid++;
    }
    if (surname !== user.surname) {
      setSurnameError('Surname does not match user email')
    } else {
      valid++;
    }
    if (password.length === 0) {
      setPasswordError('Please enter a new password')
    } else if (password.length < 4) {
      setPasswordError('New Password must be at least 4 characters')
    } else {
      valid++
    }
    console.log(valid)
    if (valid === 4) {
      changePassword(email,password)
      navigate('/palitra-test/login')
    }
  }
  return (
    <Form title='Reset Password' form={form} onSubmit={submit} novalidate>
      <Input id='name' error={nameError} label='Name:' type='text' placeholder='Enter your name' />
      <Input id='surname' error={surnameError} label='Surname:' type='text' placeholder='Enter your surname' />
      <Input id='email' error={emailError} label='E-Mail:' type='email' placeholder='Enter your E-Mail' />
      <Input id='password' error={passwordError} label='New Password:' type='text' placeholder='Enter your New Password' />
      <Button text='Reset' />
    </Form>
  )
}
